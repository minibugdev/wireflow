import firebase from 'firebase/app';
import 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyCaKWFZTbk9gUY6OWau3npgCQHzF_h0TgQ',
  authDomain: 'wireflow-project.firebase.com',
  databaseURL: 'https://wireflow-project-default-rtdb.firebaseio.com',
  projectId: 'wireflow-project',
  storageBucket: 'wireflow-project.appspot.com',
  messagingSenderId: '322553856659',
  appId: '1:322553856659:web:631e3385141e061e834366',
  measurementId: 'G-Z8YNWZMWBW',
};

firebase.initializeApp(firebaseConfig);
