import { baseUrl } from './base-url';

export const mediaUrl = (url, isResourceUrl = false) => {
    return isResourceUrl ? url : baseUrl + url;
}

export const galleryUrl = (gallery) => {
    const { imageUrl, videoUrl, type, isResourceUrl } = gallery;

    if (isResourceUrl) {
        if (type === 'image') {
            return imageUrl;
        } else {
            return videoUrl;
        }
    }

    if (type === 'image') {
        return baseUrl + imageUrl;
    } else {
        return baseUrl + videoUrl;
    }
}