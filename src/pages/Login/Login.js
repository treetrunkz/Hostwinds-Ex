import React, { Component } from 'react';
import './Login.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import openModal from '../../actions/openModal';
import SignUp from './SignUp';
import axios from 'axios';

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  changeEmail = (e) => this.setState({ email: e.target.value });
  changePassword = (e) => this.setState({ password: e.target.value });

  submitLogin = async (e) => {
    e.preventDefault();
    const url = `${window.apiHost}/users/signup`;
    const data = {
      email: this.state.email,
      password: this.state.password,
    };
    const resp = await axios.post(url, data);
    console.log(resp.data);
  };

  render() {
    return (
      <div className='login-form'>
        <form className='search-box-form' onSubmit={this.submitLogin}>
          <div className='login-or center'>
            <div className='or-divider'></div>
          </div>

          <div className='col m12'>
            <div className='form-label'>Login (Email / Username)</div>
            <div className='input-field' id='where'>
              <input
                onChange={this.changeEmail}
                value={this.state.email}
                type='text'
                className='browser-default'
                placeholder='Email address'
              />
            </div>
          </div>
          <div className='col m6'>
            <div className='form-label'>Password</div>
            <div className='input-field' id='where'></div>
            <input
              onChange={this.changePassword}
              value={this.state.password}
              type='password'
              className='browser-default'
              placeholder='Password'
            />
          </div>
          <button className='sign-up-button'>Login</button>
          <div className='divider'></div>
          <div>
            Don't have an account?{' '}
            <span
              className='pointer'
              onClick={() => {
                this.props.openModal('open', <SignUp />);
              }}
            >
              Sign up
            </span>
          </div>
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatcher) {
  return bindActionCreators(
    {
      openModal: openModal,
    },
    dispatcher
  );
}

export default connect(null, mapDispatchToProps)(Login);
