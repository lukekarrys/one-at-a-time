import Firebase from 'firebase';
import config from 'config';

export default new Firebase(config.FIREBASE_ROOT);
