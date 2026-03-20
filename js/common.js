var FONT_SIZE_KEY = 'wai-font-size';
var FONT_MIN = 100;
var FONT_MAX = 125;
var FONT_STEP = 6.25;

function getAnnouncementRegion() {
    var region = document.getElementById('font-size-status');

    if (!region) {
        region = document.createElement('div');
        region.id = 'font-size-status';
        region.className = 'sr-announcement';
        region.setAttribute('aria-live', 'polite');
        region.setAttribute('aria-atomic', 'true');
        document.body.appendChild(region);
    }

    return region;
}

function clampFontSize(value) {
    return Math.min(FONT_MAX, Math.max(FONT_MIN, value));
}

function applyFontSize(size, announce) {
    var safeSize = clampFontSize(size);
    document.documentElement.style.fontSize = safeSize + '%';
    try {
        localStorage.setItem(FONT_SIZE_KEY, String(safeSize));
    } catch (error) {
        // Ignore storage failures so text resizing still works for the session.
    }

    if (announce) {
        getAnnouncementRegion().textContent =
            'Text size set to ' + Math.round(safeSize) + ' percent.';
    }
}

function readStoredFontSize() {
    var rawValue;

    try {
        rawValue = parseFloat(localStorage.getItem(FONT_SIZE_KEY));
    } catch (error) {
        rawValue = FONT_MIN;
    }

    if (isNaN(rawValue)) {
        return FONT_MIN;
    }

    return clampFontSize(rawValue);
}

function updateMenuState(button, expanded) {
    var menuId = button.getAttribute('aria-controls');
    var menu = document.getElementById(menuId);

    button.setAttribute('aria-expanded', expanded ? 'true' : 'false');

    if (menu) {
        menu.classList.toggle('show', expanded);
        menu.hidden = !expanded;
    }
}

function closeMenus(exceptButton) {
    var buttons = document.querySelectorAll('.dropdown-toggle[aria-controls]');

    for (var i = 0; i < buttons.length; i++) {
        if (exceptButton && buttons[i] === exceptButton) {
            continue;
        }

        updateMenuState(buttons[i], false);
    }
}

function toggleMenu(event) {
    event.preventDefault();

    var button = event.currentTarget;
    var isExpanded = button.getAttribute('aria-expanded') === 'true';

    closeMenus(button);
    updateMenuState(button, !isExpanded);
}

function onMenuKeydown(event) {
    if (event.key === 'Escape') {
        closeMenus();
        event.currentTarget.focus();
    }
}

function setupNavigation() {
    var navToggle = document.querySelector('.navbar-toggler');
    var navContent = document.getElementById('nav-bar-content');
    var menuButtons = document.querySelectorAll('.dropdown-toggle[aria-controls]');

    if (navToggle && navContent) {
        navToggle.addEventListener('click', function() {
            var expanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', expanded ? 'false' : 'true');
            navContent.classList.toggle('collapse');
        }, false);
    }

    for (var i = 0; i < menuButtons.length; i++) {
        updateMenuState(menuButtons[i], false);
        menuButtons[i].addEventListener('click', toggleMenu, false);
        menuButtons[i].addEventListener('keydown', onMenuKeydown, false);
    }

    document.addEventListener('click', function(event) {
        if (!event.target.closest('.dropdown')) {
            closeMenus();
        }
    }, false);

    if (navContent) {
        navContent.addEventListener('focusout', function() {
            window.setTimeout(function() {
                var active = document.activeElement;

                if (!active || !active.closest('#nav-bar-content .dropdown')) {
                    closeMenus();
                }
            }, 0);
        }, false);
    }

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeMenus();
        }
    }, false);
}

function setupFontControls() {
    var increaseButtons = document.querySelectorAll('.font-increase-button');
    var decreaseButtons = document.querySelectorAll('.font-decrease-button');

    applyFontSize(readStoredFontSize(), false);

    for (var i = 0; i < increaseButtons.length; i++) {
        increaseButtons[i].addEventListener('click', function() {
            applyFontSize(readStoredFontSize() + FONT_STEP, true);
        }, false);
    }

    for (var j = 0; j < decreaseButtons.length; j++) {
        decreaseButtons[j].addEventListener('click', function() {
            applyFontSize(readStoredFontSize() - FONT_STEP, true);
        }, false);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupNavigation();
    setupFontControls();
}, false);
