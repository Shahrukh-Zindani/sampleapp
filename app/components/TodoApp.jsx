import React from 'react';
import * as Redux from 'react-redux';

var uuid = require('node-uuid');
var moment = require('moment');
import TodoList from 'TodoList'
import AddTodo from 'AddTodo';
import TodoSearch from 'TodoSearch';
import * as actions from 'actions';

export var TodoApp = React.createClass({
  onLogout(e) {
    var {dispatch} = this.props;
    e.preventDefault();

    dispatch(actions.startLogout());
  },
  render: function () {
    return (
      <div>
        <div className = "page-actions">
          <a href = "#" onClick = {this.onLogout}>Logout</a>
         </div>
        <h1 className="page-title">Student Manager</h1>

        <div className="row">
          <div className="column small-centered small-11 medium-6 large-5">
            <div className="container">
              <TodoSearch/>
              <TodoList/>
            
              
            </div>
          </div>
        </div>
      </div>
    )
  }
});

export default Redux.connect()(TodoApp)
