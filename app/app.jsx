var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');
import firebase from 'app/firebase';
var actions = require('actions');
var store = require('configureStore').configure();
var TodoAPI = require('TodoAPI');
import Login from 'Login';
import TodoApp from 'TodoApp';
import {firebaseRef} from  'app/firebase/'

firebase.auth().onAuthStateChanged((user) => {
	if(user) {
		//console.log(user.uid)
		// store.dispatch(actions.login(user.uid));
		var todosRef = firebaseRef.child(`program` + user.uid);
		todosRef.once('value').then((snapshot) => {
      		var programs = snapshot.val();
      		console.log(Object.keys(programs)[0]);
 			store.dispatch(actions.startAddTodos(Object.keys(programs)[0]));
			hashHistory.push('/students')
    	});
	} else {
		store.dispatch(actions.logout());
		hashHistory.push('/')
	}
})




// Load foundation
$(document).foundation();

// App css
require('style!css!sass!applicationStyles')

var requireLogin = (nextState, replace, next) => {
	if(!firebase.auth().currentUser) {
		replace('/')
	}
	next();
};

var redirectIfLoggedIn = (nextState, replace, next) => {
	if(firebase.auth().currentUser) {
		replace('/students')
	}
	next();
}

ReactDOM.render(
  <Provider store={store}>
  	<Router history = {hashHistory}>
  	<Route path= '/'>
  		<Route path= '/students' component = {TodoApp} onEnter = {requireLogin}/>
  		<IndexRoute component = {Login} onEnter = {redirectIfLoggedIn}/>
  	</Route>
  	</Router>
  </Provider>,
  document.getElementById('app')
);
