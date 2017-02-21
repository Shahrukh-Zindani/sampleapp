var React = require('react');
import * as Redux from 'react-redux';

import * as actions from 'actions';


export var Login = React.createClass({
	handleLogin: function(e) {
		e.preventDefault();
    	var {dispatch} = this.props;
    	var email = this.refs.email.value;
    	var password = this.refs.password.value;

    	if (email.length > 0 || password.length>0) {
    		console.log('dispatched')
      		dispatch(actions.startLogin(email, password));
    	} else {
      		this.refs.todoText.focus();
    	}
  	},
	render: function() {
		return (
			<div >
				<img src = "asset.png" style = "width:300px%; height: 300px"></img>
				<div className = "row">
					<div className = "columns small-centered small-10 medium-6 large-4">
						<div className = "callout callout-auth">
							<h3>Login</h3>
							<form onSubmit={this.handleLogin}>
          						<input type="Email" ref="email" placeholder="Email"/>
          						<input type="password" ref="password" placeholder="password"/>
          						<button className="button expanded">Submit</button>
        					</form>

						</div>
					</div>
				</div>
			</div>

		)
	}
})
export default Redux.connect()(Login);