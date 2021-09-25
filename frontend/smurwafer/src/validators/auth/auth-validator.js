export const userNameValidator = (value) => {
    if (value.trim().length < 2 || value.trim().length > 20) {
        return "Username must be between 2 and 20 characters length!";
    }
    return null;
}

export const emailValidator = (value) => {
    if (value.trim().length === 0) {
        return "Email address must be provided!";
    }

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(value).toLowerCase())) {
        return "Please enter a valid email address!";
    }

    return null;
}

export const passwordValidator = (value) => {
    if (value.trim().length < 8) {
        return "Password length must be greater than 7 characters";
    }
    return null;
}

export const passwordConfirmValidator = (value, passwordValue) => {
    if (value !== passwordValue) {
        return "Please confirm your password!";
    }
    return null;
}

export const nameValidator = (value) => {
    return null;
}

export const ageValidator = (value) => {
    if (value < 0 || value > 150) {
        return "Please enter a valid age.";
    }
    return null;
}