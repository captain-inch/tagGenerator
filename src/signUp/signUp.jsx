import React, { Component } from "react";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      passwordCopy: "",
      isValidEmail: true,
      passwordMatch: true,
    };
  }
  onSubmitRegister = () => {
    if (!this.state.passwordMatch) {
      console.warn("Passwords does not match !");
      return false;
    }
    fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
      }),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp === "Success") {
          this.props.routeChange("/");
        } else {
          console.warn(resp);
        }
      });
  };
  onEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };
  onPasswordChange = (e) => {
    console.log(this.state);
    if (this.state.passwordCopy === e.target.value) {
      this.setState({ passwordMatch: true });
    } else {
      this.setState({ passwordMatch: false });
    }
    this.setState({ password: e.target.value });
  };
  onPasswordCopyChange = (e) => {
    console.log(this.state);

    if (this.state.password === e.target.value) {
      this.setState({ passwordMatch: true });
    } else {
      this.setState({ passwordMatch: false });
    }
    this.setState({ passwordCopy: e.target.value });
  };
  onUsernameChange = (e) => {
    this.setState({ username: e.target.value });
  };
  checkEmail = (e) => {
    function validateEmail(email) {
      const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      return re.test(String(email).toLowerCase());
    }
    this.setState({
      isValidEmail: validateEmail(e.target.value),
    });
  };
  checkUsername = (e) => {};
  render() {
    return (
      <article className="br2 ba white bg-black-80 b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
        <main className="pa4 flex justify-center tc">
          <div>
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f4 fw6 ph0 mh0">Sign up</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6">Username</label>
                <input
                  className="pa2 input-reset ba bg-transparent white-70 hover-bg-white-20 hover-white w-100"
                  type="text"
                  name="username"
                  id="username"
                  onChange={this.onUsernameChange}
                  onBlur={this.checkUsername}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent white-70 hover-bg-white-20 hover-white w-100"
                  type="email"
                  name="email"
                  id="email"
                  onChange={this.onEmailChange}
                  onBlur={this.checkEmail}
                />
                {!this.state.isValidEmail ? (
                  <label className="db fw6 lh-copy dark-red f6">
                    Invalid email
                  </label>
                ) : null}
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6">Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent white-70 hover-bg-white-20 hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6">Repeat password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent white-70 hover-bg-white-20 hover-white w-100"
                  type="password"
                  name="password"
                  id="passwordCopy"
                  onChange={this.onPasswordCopyChange}
                />
                {!this.state.passwordMatch ? (
                  <label className="db fw6 lh-copy dark-red f6">
                    Password does not match
                  </label>
                ) : null}
              </div>
            </fieldset>
            <div className="">
              <input
                className="b ph3 white pv2 input-reset ba b--white bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
                onClick={this.onSubmitRegister}
              />
            </div>
          </div>
        </main>
      </article>
    );
  }
}
