import { body } from 'express-validator';

const validator = [
    body('title')
        .isEmpty()
        .withMessage('Title should not be empty'),
];

export { validator as StoryValidator }