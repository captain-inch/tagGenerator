import { Component } from "react";
// import logo from "./logo.svg";
import Navigation from "./navigation.jsx";
import ImageLinkForm from "./imageLinkForm.jsx";
import Clarifai from "clarifai";
import Rank from "./Rank.jsx";
import SignIn from "../signIn/signIn.jsx";
import SignUp from "./../signUp/signUp.jsx";
import Particles from "react-particles-js";
import ImageDisplay from "./imageDisplay.jsx";
import "tachyons";
import {
  isConstructorDeclaration,
  parseConfigFileTextToJson,
} from "typescript";

const particlesParams = {
  particles: {
    number: {
      value: (window.innerHeight * window.innerWidth) / 12000,
    },
    size: {
      value: 3,
    },
  },
};
//,interactivity: {events: {onclick: {enable: true,mode: "repulse",  },}},

const app = new Clarifai.App({ apiKey: "e0c918f4d9e144a0b85687eedd9a4375" });

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      concepts: null,
      route: "home",
      signedIn: false,
      user: {
        id: "",
        name: "",
        email: "",
        password: "",
        entries: 0,
        joined: null,
      },
    };
  }
  onInputChange = (e) => {
    try {
      this.setState({ url: e.target.value, concepts: null });
    } catch {}
  };
  onSubmit = () => {
    let resp = null;
    app.models
      .predict(Clarifai.GENERAL_MODEL, this.state.url)
      .then(
        function (response) {
          resp = response.outputs[0].data.concepts;
        },
        function (err) {
          console.warn(err);
        }
      )
      .then(() => {
        this.setState({ concepts: resp });
        if (resp) {
          fetch("http://localhost:3000/image", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((r) => r.json())
            .then((count) =>
              this.setState(Object.assign(this.state.user, { entries: count }))
            );
          // fetch("http://localhost:3000/image", {
          //   method: "put",
          //   headers: { "Content-Type": "application/json" },
          //   body: JSON.stringify({
          //     id: this.state.user.id,
          //   }),
          // })
          //   .then((response) => {console.log(response);response.json();})
          //   .then((count) => {
          //     this.setState(Object.assign(this.state.user, { entries: count }));
          //   });
        }
      });
  };
  routeChange = (newRoute) => {
    this.setState({ route: newRoute });
  };
  onSignUp = () => {
    this.routeChange("home");
  };
  onSignOut = () => {
    this.routeChange("home");
    this.setState({
      user: {
        id: "",
        name: "",
        email: "",
        password: "",
        entries: 0,
        joined: null,
      },
      signedIn: false,
    });
  };
  onSignIn = (userData) => {
    this.setState({
      user: {
        id: userData.id,
        username: userData.username,
        email: userData.email,
        password: userData.password,
        entries: userData.entries,
        joined: userData.joined,
      },
      signedIn: true,
    });
    console.log(userData);

    this.routeChange("/");
  };
  render() {
    return (
      <div className="App">
        <Particles className="background animatedBg" params={particlesParams} />
        <nav className="flex ">
          <Navigation
            onSignOut={this.onSignOut}
            routeChange={this.routeChange}
            signedIn={this.state.signedIn}
          />
        </nav>
        {this.state.signedIn ? (
          <Rank
            username={this.state.user.username}
            entries={this.state.user.entries}
          />
        ) : null}

        {this.state.route === "signIn" ? (
          <SignIn routeChange={this.routeChange} onSignIn={this.onSignIn} />
        ) : null}
        {this.state.route === "signUp" ? (
          <SignUp onSignUp={this.onSignUp} routeChange={this.routeChange} />
        ) : null}
        {this.state.signedIn ? (
          <div>
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onSubmit={this.onSubmit}
            />
            <ImageDisplay url={this.state.url} concepts={this.state.concepts} />
          </div>
        ) : null}
      </div>
    );
  }
}

export default App;
