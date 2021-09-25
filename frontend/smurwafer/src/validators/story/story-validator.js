export const titleValidator = (value) => {
    if (value.trim().length === 0) {
        return "Title must be provided!";
    }
    return null;
}

export const textValidator = (value) => {
    return null;
}