import { io } from 'socket.io-client';
import { baseUrl } from './utility/base-url';

const socket = io(baseUrl)

export default socket;