import React, { Component } from 'react';
import {baseServerURL} from './constants'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';



export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username : '',
      psswd: '',
      user: {}
    };
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    fetch(baseServerURL + '/main/login', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      if (res.status === 200) {
        // this.props.history.push('/');
        res.text().then((text)=> {
          this.setState({
            user: JSON.parse(text)
          });
          localStorage.setItem('user', JSON.stringify(this.state.user['data']));
          this.props.history.push('/')
        });
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch((err) => {
      console.error(err);
      alert('Error logging in please try again ' + err);
    })
  }
  render() {
    return (
      <div style = {{'text-align' : 'center'}}>
      <AppBar position="static" style = {{width : '100%', background : '#01579b'}}>
        <Toolbar>
            <h2>Prism</h2>
        </Toolbar>
      </AppBar>
      <form style = {{'text-align' : 'center'}}>
        <h1>Login</h1>
        <TextField
          variant="outlined"
          type = "text"
          name = "username"
          label = "Username"
          placeholder = "Enter username"
          value = {this.state.username}
          onChange = {this.handleInputChange}
          required
        />
        <br/>
        <br/>
        <TextField
          variant="outlined"
          type = "password"
          name = "psswd"
          label = "Password"
          placeholder = "Enter password"
          value = {this.state.psswd}
          onChange = {this.handleInputChange}
          required
        />
        <br/>
        <br/>
       <Button type = 'submit' variant="contained" onClick = {this.onSubmit} style = {{"backgroundColor" : "#01579b", "color": "#FFFFFF"}}>Submit</Button>
       <p>Or Register <a href= '/register'>here</a></p>
      </form>
      </div>
    );
  }
}
