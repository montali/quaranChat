import React from "react";
import "./App.css";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import axios from "axios";

// Local components
import SignInPage from "./components/SignInPage";
import Peer from "peerjs";
import MainView from "./components/MainView";

// Local styles
import { useStyles } from "./styles.js";

class MainApp extends React.Component {
  constructor(props) {
    super(props);
    this.ls = require("local-storage");
    this.state = { loggedIn: false, loginError: false };
    this.prevLoggedIn = this.ls("prevLoggedIn");
    if (this.prevLoggedIn) {
      this.state.oldUsername = this.ls("username");
    }
    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handleLoginRequest = this.handleLoginRequest.bind(this);
    this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleSignUpRequest = this.handleSignUpRequest.bind(this);
  }

  handleLoginChange(event) {
    const target = event.target;
    const name = target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  }

  handleSnackbarClose(event, reason) {
    this.setState({ loginSnackbar: false });
  }

  handleLoginRequest(event) {
    if (event !== undefined) event.preventDefault();
    // Request an ID to the PeerJS server
    const peer = new Peer();
    this.setState({ peer: peer }, () => {
      // If the username is already set, let's use that
      const username =
        this.state.username == null && this.prevLoggedIn
          ? this.state.oldUsername
          : this.state.username;
      const password = this.state.password;
      const setState = this.setState.bind(this);
      // If the user is changing account, delete the messages
      if (this.prevLoggedIn && this.state.oldUsername != username) {
        this.ls.remove("chats");
      }
      peer.on("open", id => {
        // Connect to our login server and update the ID with a POST
        axios
          .post("http://40ena.monta.li:40015/id/" + username, {
            password: password,
            connectionID: id,
            crossDomain: true
          })
          .then(res => {
            console.log(this.state);
            setState({
              loggedIn: true,
              username: username,
              password: password
            });
            this.ls("prevLoggedIn", true);
            this.ls("username", username);
          })
          .catch(error => {
            setState({
              loginSnackbar: true,
              snackbarMessage: "Wrong login inserted!"
            });
          });
      });
    });
  }
  handleSignUpRequest() {
    const username = this.state.username;
    const password = this.state.password;
    const setState = this.setState.bind(this);
    // Connect to our login server and register the user
    axios
      .post("http://40ena.monta.li:40015/signup/", {
        username: username,
        password: password,
        crossDomain: true
      })
      .then(res => {
        setState({
          loginSnackbar: true,
          snackbarMessage: "Succesfully registered! You can now login."
        });
      })
      .catch(error => {
        setState({
          loginSnackbar: true,
          snackbarMessage: "Already existing username!"
        });
      });
  }

  handleLogout() {
    this.state.peer.destroy();
    const username = this.state.username;
    const password = this.state.password;
    const setState = this.setState.bind(this);
    axios
      .delete("http://40ena.monta.li:40015/id/" + username, {
        data: {
          password: password,
          crossDomain: true
        }
      })
      .then(res => {
        setState({
          loggedIn: false,
          username: undefined,
          password: undefined,
          loginSnackbar: true,
          snackbarMessage: "Sad to see you go!"
        });
      })
      .catch(error => {
        console.log(this.state);
      });
  }

  render() {
    if (!this.state.loggedIn) {
      return (
        <SignInPage
          classes={this.props.classes}
          handleFormChange={this.handleLoginChange}
          handleLogin={this.handleLoginRequest}
          loginSnackbar={this.state.loginSnackbar}
          handleSnackbarClose={this.handleSnackbarClose}
          snackbarMessage={this.state.snackbarMessage}
          handleSignUp={this.handleSignUpRequest}
          oldUsername={this.state.oldUsername}
        ></SignInPage>
      );
    } else {
      return (
        <MainView
          classes={this.props.classes}
          theme={this.props.theme}
          handleLogout={this.handleLogout}
          mobileOpen={this.props.mobileOpen}
          setMobileOpen={this.props.setMobileOpen}
          peer={this.state.peer}
          matches={this.props.matches}
        />
      );
    }
  }
}

function App(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const matches = useMediaQuery("(min-width:1024px)");
  return (
    <MainApp
      classes={classes}
      theme={theme}
      mobileOpen={mobileOpen}
      setMobileOpen={setMobileOpen}
      matches={matches}
    />
  );
}

export default App;
