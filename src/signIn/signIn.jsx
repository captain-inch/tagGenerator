import React, { Component } from "react";

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", validSignIn: true };
  }
  onEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };
  onPasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };
  onSubmitSignIn = () => {
    fetch("https://limitless-depths-84747.herokuapp.com/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    }).then((resp) => {
      if (resp.status === 200) {
        this.setState({ validSignIn: true });
        resp.json().then((resp) => this.props.onSignIn(resp));
      } else {
        this.setState({ validSignIn: false });
        console.warn(resp.status);
      }
    });
  };

  render() {
    return (
      <article className="br2 ba white bg-black-80 b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
        <main className="pa4 flex justify-center tc">
          <div>
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f4 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent white-70 hover-bg-white-20 hover-white w-100"
                  type="text"
                  name="username"
                  id="username"
                  onChange={this.onEmailChange}
                />
              </div>
              {!this.state.validSignIn ? (
                <label className="db fw6 lh-copy dark-red f6">
                  Invalid email or password
                </label>
              ) : null}
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
              {/* <label className="pa0 ma0 lh-copy f6 pointer">
                <input type="checkbox" /> Remember me
              </label> */}
            </fieldset>
            <div className="">
              <input
                className="b ph3 white pv2 input-reset ba b--white bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
                onClick={this.onSubmitSignIn}
              />
            </div>
            <div className="lh-copy mt3">
              <p
                href="#0"
                className="f6 link dim white db pointer"
                onClick={() => this.routeChange("signUp")}
              >
                Sign up
              </p>
              {/* <p
                href="#0"
                className="f6 link dim white db pointer"
                onClick={() => this.routeChange("forgottenPassword")}
              >
                Forgot your password?
              </p> */}
            </div>
          </div>
        </main>
      </article>
    );
  }
}
