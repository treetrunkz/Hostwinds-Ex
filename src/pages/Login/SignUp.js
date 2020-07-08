import React, { Component } from 'react';
import './Login.css';
import './SignUp.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import openModal from '../../actions/openModal';
import Login from './Login';
import axios from 'axios';

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      lowerPartOfForm: (
        <button
          type='button'
          onClick={this.showInputs}
          className='sign-up-button'
        >
          Sign up with email
        </button>
      ),
    };
  }

  changeEmail = (e) => this.setState({ email: e.target.value });
  changePassword = (e) => this.setState({ password: e.target.value });

  showInputs = () => {
    this.setState({
      lowerPartOfForm: (
        <SignUpInputFields
          changeEmail={this.changeEmail}
          changePassword={this.changePassword}
        />
      ),
    });
  };

  submitLogin = async (e) => {
    e.preventDefault();
    const url = `${window.apiHost}/users/signup`;
    const data = {
      email: this.state.email,
      password: this.state.password,
    };
    const resp = await axios.post(url, data);
  };

  render() {
    return (
      <div className='login-form'>
        <form className='search-box-form' onSubmit={this.submitLogin}>
          <div className='login-or center'>
            <div className='or-divider'></div>
          </div>
          <div className='home-search-box col m4'>
            <div className='col m12'>
              <div className='input-field' id='where'>
                {this.state.lowerPartOfForm}
                <div className='divider'></div>
              </div>
            </div>
          </div>
          <div>
            Already have an account?{' '}
            <span
              className='pointer'
              onClick={() => {
                this.props.openModal('open', <Login />);
              }}
            >
              Log in
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

export default connect(null, mapDispatchToProps)(SignUp);

const SignUpInputFields = (props) => {
  return (
    <div className='login-form'>
      <div className='sign-up-wrapper'>
        <div className='col m12'>
          <div className='form-label'>Email</div>
          <div className='input-field' id='email'>
            <input
              type='text'
              placeholder='Email Address'
              onChange={props.changeEmail}
            />
          </div>
        </div>
        <div className='col m6'>
          <div className='form-label'>Password</div>
          <div className='input-field' id='password'>
            <input
              type='password'
              placeholder='Password'
              onChange={props.changePassword}
            />
          </div>
        </div>
      </div>
      <div className='col m12'>
        <button type='submit' className='btn red accent-2'>
          Sign Up!
        </button>
      </div>
    </div>
  );
};
