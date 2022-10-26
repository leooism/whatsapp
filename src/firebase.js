const firebase = require("firebase");
const firebaseConfig = {
	apiKey: "AIzaSyBjqfYfuZfEs2JeDOx2qEIe12AgyZ_cfcA",
	authDomain: "whatsapp-dea2f.firebaseapp.com",
	databaseURL: "https://whatsapp-dea2f.firebaseio.com",
	projectId: "whatsapp-dea2f",
	storageBucket: "whatsapp-dea2f.appspot.com",
	messagingSenderId: "101236737832",
	appId: "1:101236737832:web:c32ddae6b3e9fcb289321d",
	measurementId: "G-FS6QRYSKGF",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
