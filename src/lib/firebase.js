import firebase from 'firebase';

firebase.initializeApp({
  apiKey: 'AIzaSyCapY_JslCF4wdJnZ3RsnYwrHTL_4WMkww',
  authDomain: 'project-3484040432795963818.firebaseapp.com',
  databaseURL: 'https://project-3484040432795963818.firebaseio.com',
  storageBucket: 'project-3484040432795963818.appspot.com'
});

export const auth = firebase.auth();
export const twitter = new firebase.auth.TwitterAuthProvider();

export default firebase.database().ref();
