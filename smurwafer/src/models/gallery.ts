import mongoose from 'mongoose';
import { GalleryType } from '../utility/gallery-type';

interface GalleryAttr {
    imageUrl: string;
    videoUrl: string;
    caption: string;
    type: GalleryType;
};

interface GalleryModel extends mongoose.Model<GalleryDoc> {
    build(attr: GalleryAttr): GalleryDoc;
};

interface GalleryDoc extends mongoose.Document {
    imageUrl: string;
    videoUrl: string;
    caption: string;
    type: GalleryType;
}

const gallerySchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: false,
    },
    videoUrl: {
        type: String,
        required: false,
    },
    caption: {
        type: String,
        required: false,
    },
    type: {
        type: GalleryType,
        default: GalleryType.Image,
        required: true,
    },
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});

gallerySchema.statics.build = (attrs: GalleryAttr) => {
    return new Gallery(attrs);
}

const Gallery = mongoose.model<GalleryDoc, GalleryModel>('Gallery', gallerySchema);

export { Gallery };