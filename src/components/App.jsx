import { Component } from "react";
// import logo from "./logo.svg";
import Navigation from "./navigation.jsx";
import ImageLinkForm from "./imageLinkForm.jsx";
import Clarifai from "clarifai";
import Rank from "./Rank.jsx";
import SignIn from "../signIn/signIn.jsx";
import SignUp from "./../signUp/signUp.jsx";
import TopData from "./topData.jsx";
import Particles from "react-particles-js";
import ImageDisplay from "./imageDisplay.jsx";
import "tachyons";

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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      concepts: null,
      route: "signIn",
      signedIn: false,
      topData: null,
      maxTopData: 5,
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
    fetch("https://limitless-depths-84747.herokuapp.com/imageurl", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: this.state.url }),
    })
      .then((resp) => resp.json())
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
        fetch("https://limitless-depths-84747.herokuapp.com/submitresults", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            this.state.concepts.reduce((acc, data) => {
              acc.push(data.name);
              return acc;
            }, [])
          ),
        });

        if (this.state.concepts) {
          fetch("https://limitless-depths-84747.herokuapp.com/image", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((r) => r.json())
            .then((count) => {
              this.setState(Object.assign(this.state.user, { entries: count }));
              this.getTopData();
            });
        }
      })
      .catch((err) => console.log("Error fetching results with API"));
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

    this.routeChange("home");
  };
  getTopData = () => {
    fetch("https://limitless-depths-84747.herokuapp.com/gettop", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        max: this.state.maxTopData,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        this.setState({
          topData: data,
        });
      });
  };
  componentDidMount() {
    this.getTopData();
  }
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
        {this.state.route === "home" ? (
          <div>
            <TopData topData={this.state.topData} />
            {this.state.signedIn ? (
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onSubmit={this.onSubmit}
              />
            ) : (
              <p className="p tc f2 b mt5">
                Sign in to generate your own tags !
              </p>
            )}
            {this.state.signedIn ? (
              <ImageDisplay
                url={this.state.url}
                concepts={this.state.concepts}
              />
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
}

export default App;
