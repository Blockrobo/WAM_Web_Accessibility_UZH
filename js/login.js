function setControlState(element, state, message) {
    var feedback = element.parentNode.querySelector('.invalid-feedback, .valid-feedback');

    element.classList.remove('is-valid');
    element.classList.remove('is-invalid');
    element.removeAttribute('aria-invalid');

    if (!feedback) {
        return;
    }

    if (state === 'invalid') {
        element.classList.add('is-invalid');
        element.setAttribute('aria-invalid', 'true');
        feedback.className = 'invalid-feedback';
        feedback.textContent = message;
    } else if (state === 'valid') {
        element.classList.add('is-valid');
        feedback.className = 'valid-feedback';
        feedback.textContent = message || 'Looks good.';
    } else {
        feedback.className = 'invalid-feedback';
        feedback.textContent = '';
    }
}

function showErrorSummary(summaryId, listId, messages) {
    var summary = document.getElementById(summaryId);
    var list = document.getElementById(listId);

    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }

    if (!messages.length) {
        summary.classList.add('d-none');
        return;
    }

    for (var i = 0; i < messages.length; i++) {
        var item = document.createElement('li');
        item.textContent = messages[i];
        list.appendChild(item);
    }

    summary.classList.remove('d-none');
    summary.focus();
}

function validateRequiredText(element, label, errors) {
    if (element.value.trim().length === 0) {
        setControlState(element, 'invalid', label + ' is required.');
        errors.push(label + ' is required.');
        return false;
    }

    setControlState(element, 'valid', '');
    return true;
}

function validateEmail(element, label, errors) {
    if (element.validity.valueMissing) {
        setControlState(element, 'invalid', label + ' is required.');
        errors.push(label + ' is required.');
        return false;
    }

    if (element.validity.typeMismatch) {
        setControlState(element, 'invalid', 'Enter a valid email address.');
        errors.push('Enter a valid email address.');
        return false;
    }

    setControlState(element, 'valid', '');
    return true;
}

function validatePassword(element, errors) {
    var value = element.value.trim();

    if (value.length < 8 || value.length > 16) {
        setControlState(
            element,
            'invalid',
            'Password must be 8 to 16 characters long.'
        );
        errors.push('Password must be 8 to 16 characters long.');
        return false;
    }

    if (value.match(/[a-zA-Z]+/) === null || value.match(/[0-9]+/) === null) {
        setControlState(
            element,
            'invalid',
            'Password must include both letters and numbers.'
        );
        errors.push('Password must include both letters and numbers.');
        return false;
    }

    setControlState(element, 'valid', '');
    return true;
}

function validateProgramme(element, errors) {
    if (element.validity.valueMissing) {
        setControlState(element, 'invalid', 'Select a programme.');
        errors.push('Select a programme.');
        return false;
    }

    setControlState(element, 'valid', '');
    return true;
}

function login(event) {
    event.preventDefault();

    var errors = [];
    var email = document.getElementById('login-email-control');
    var password = document.getElementById('login-password-control');

    validateEmail(email, 'Email address', errors);
    validateRequiredText(password, 'Password', errors);

    showErrorSummary('login-error', 'login-error-list', errors);
}

function forgot(event) {
    event.preventDefault();

    var errors = [];
    var email = document.getElementById('login-email-control');
    var password = document.getElementById('login-password-control');

    validateEmail(email, 'Email address', errors);
    setControlState(password, 'default', '');

    showErrorSummary('login-error', 'login-error-list', errors);
}

function register(event) {
    event.preventDefault();

    var errors = [];

    validateRequiredText(
        document.getElementById('register-first-name-control'),
        'First name',
        errors
    );
    validateRequiredText(
        document.getElementById('register-last-name-control'),
        'Last name',
        errors
    );
    validateEmail(
        document.getElementById('register-email-control'),
        'Email address',
        errors
    );
    validatePassword(
        document.getElementById('register-password-control'),
        errors
    );
    validateProgramme(
        document.getElementById('register-programme-control'),
        errors
    );

    showErrorSummary('register-error', 'register-error-list', errors);
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('login-form').addEventListener('submit', login, false);
    document.getElementById('login-forgot-button').addEventListener('click', forgot, false);
    document.getElementById('register-form').addEventListener('submit', register, false);
}, false);
