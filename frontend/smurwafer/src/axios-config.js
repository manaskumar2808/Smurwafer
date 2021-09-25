import axios from 'axios';
import { baseUrl } from './utility/base-url';

const instance = axios.create({
    baseURL: baseUrl,
});

export default instance;