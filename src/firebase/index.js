import {initializeApp} from 'firebase/app';
const firebaseConfig = {
  apiKey: 'AIzaSyCIcyfvlmMVSAxxvPTASWasIN8ncskIj0w',
  authDomain: 'bunch-of-deals.firebaseapp.com',
  databaseURL: 'https://bunch-of-deals.firebaseio.com',
  projectId: 'bunch-of-deals',
  storageBucket: 'bunch-of-deals.appspot.com',
  messagingSenderId: '719363581249',
  appId: '1:719363581249:web:816ead6eec9abdb863adc0',
  measurementId: 'G-SYLB7LXCZQ',
};

export const firebaseApp = await initializeApp(firebaseConfig);
