import moment from 'moment'
import firebase, {firebaseRef} from  'app/firebase/'
// var email = "shahrukh.zindani@gmail.com";
// var password = "utdallas";
export var setSearchText = (searchText) => {
  return {
    type: 'SET_SEARCH_TEXT',
    searchText
  };
};

export var toggleShowCompleted = () => {
  return {
    type: 'TOGGLE_SHOW_COMPLETED'
  };
};

export var addTodo = (todo) => {
  return {
    type: 'ADD_TODO',
    todo
  };
};

export var startAddTodo = (text) => {
  return (dispatch, getState) => {
    var todo = {
        text: text,
        completed: false,
        createdAt: moment().unix(),
        completedAt: null
    }
    var uid = getState().auth.uid;
    var todoRef = firebaseRef.child(`users/${uid}/todos`).push(todo);
    todoRef.then(() => {
      dispatch(addTodo({
        ...todo,
        id: todoRef.key
      }));  
    })
  };
};


export var addTodos = (todos) => {
  return {
    type: 'ADD_TODOS',
    todos
  };
};

export var startAddTodos = (programId) => {
  return (dispatch, getState) => {
  var uid = firebase.auth().currentUser.uid;
  console.log(uid)
  var todosRef = firebaseRef.child(`${programId}/students`);
    return todosRef.once('value').then((snapshot) => {
      var todos = snapshot.val() || {};
      var parsedTodos = []

      Object.keys(todos).forEach((todoId) => {
        // console.log(...todos[todoId])
        parsedTodos.push({
          id: todoId,
          ...todos[todoId]

        });
        console.log(parsedTodos[0])

      });
      dispatch(addTodos(parsedTodos));
    })
  }
}

export var startLogin = (email, password) => {
  return(dispatch, getState) => {
    return firebase.auth().signInWithEmailAndPassword("shahrukh.zindani@gmail.com", "utdallas").catch(function(error) {
      console.log('this is all wrong', error)
    });
  }
};

export var startLogout = () => {
  return(dispatch, getState) => {
    return firebase.auth().signOut().then(function() {
      console.log('sign out successful')
    }, function(error) {
      console.log('could not log out because of this ', error)
    });
  }
};

export var login = (uid) => {
  return {
    type: 'LOGIN',
    uid
  };
};

export var logout = () => {
  return {
    type: 'LOGOUT'
  }
}
export var toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id
  };
};
