import path from 'path';
import { json } from 'body-parser';
import express, { Request, Response, NextFunction } from 'express';
import multer, { FileFilterCallback } from 'multer';
import { currentUser } from './src/middlewares/current-user';

import { LoginRouter } from './src/routes/auth/login';
import { SignupRouter } from './src/routes/auth/signup';
import { GalleryIndexRouter } from './src/routes/gallery';
import { GalleryCreateRouter } from './src/routes/gallery/create';
import { GalleryDeleteRouter } from './src/routes/gallery/delete';
import { GalleryShowRouter } from './src/routes/gallery/show';
import { GalleryUpdateRouter } from './src/routes/gallery/update';
import { StoryIndexRouter } from './src/routes/story';
import { StoryCreateRouter } from './src/routes/story/create';
import { StoryShowRouter } from './src/routes/story/show';
import { StoryUpdateRouter } from './src/routes/story/update';
import { UserIndexRouter } from './src/routes/user';
import { UserDeleteRouter } from './src/routes/user/delete';
import { UserShowRouter } from './src/routes/user/show';
import { UserUpdateRouter } from './src/routes/user/update';

const app = express();

app.use(currentUser);

const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb) => {
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
            cb(null, 'images');
        } else if(file.mimetype === 'video/mp4' || file.mimetype === 'video/x-flv') {
            cb(null, 'videos');
        }
    },
    filename: (req: Request, file: Express.Multer.File, cb) => {
        cb(null, new Date().toISOString()+'-'+file.originalname);
    },
});


const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'video/mp4' || file.mimetype === 'video/x-flv') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

app.use(multer({storage: storage, fileFilter: fileFilter}).any());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/videos', express.static(path.join(__dirname, 'videos')));

app.use(json());
app.set('trust proxy', true);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(LoginRouter);
app.use(SignupRouter);
app.use(StoryCreateRouter);
app.use(StoryUpdateRouter);
app.use(StoryIndexRouter);
app.use(StoryShowRouter);
app.use(StoryUpdateRouter);
app.use(UserIndexRouter);
app.use(UserShowRouter);
app.use(UserUpdateRouter);
app.use(UserDeleteRouter);
app.use(GalleryCreateRouter);
app.use(GalleryIndexRouter);
app.use(GalleryShowRouter);
app.use(GalleryUpdateRouter);
app.use(GalleryDeleteRouter);

app.all('*', (req: Request, res: Response) => {
    throw new Error('API route not found!');
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err) {
        return res.status(400).send({
            message: err.message,
        });
    }

    res.status(400).send({
        message: 'Something went wrong!',
    });
});

export { app };