import firebase from 'firebase';

export const appName = 'advreact-fc8e9';
export const firebaseConfig = {
    apiKey: "AIzaSyAEATVKJpKzUaNH2URSBA2xwVaICiHL-5c",
    authDomain: `${appName}.firebaseapp.com`,
    databaseURL: `https://${appName}.firebaseio.com`,
    projectId: appName,
    storageBucket: "",
    messagingSenderId: "627509198740"
};

firebase.initializeApp(firebaseConfig);