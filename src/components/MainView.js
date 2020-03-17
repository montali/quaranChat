import React, { useState } from "react";
//import "../App.css";

// Material UI
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Fab from "@material-ui/core/Fab";
import CallEndIcon from "@material-ui/icons/CallEnd";
import ChatIcon from "@material-ui/icons/Chat";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PeopleIcon from "@material-ui/icons/People";
import SearchIcon from "@material-ui/icons/Search";
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import TextField from "@material-ui/core/TextField";

// Local imports
import clsx from "clsx";
import axios from "axios";
import FsLightbox from "fslightbox-react";

// Local components
import Chat from "./Chat";
import AccountList from "./AccountList";
import NewChatDialog from "./NewChatDialog";

class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: {
        "1234": {
          username: "marcolone",
          messages: [
            {
              position: "right",
              type: "text",
              text: "Ciao bello come va?",
              date: new Date(),
              dateString:
                new Date().getHours().toString() +
                ":" +
                new Date().getMinutes().toString()
            },
            {
              position: "left",
              type: "text",
              text: "Si tutto bene, te come va la quarantena?",
              date: new Date(),
              dateString:
                new Date().getHours().toString() +
                ":" +
                new Date().getMinutes().toString()
            },
            {
              position: "right",
              type: "text",
              text: "Potrebbe andar meglio, sto cazz di virus",
              date: new Date(),
              dateString:
                new Date().getHours().toString() +
                ":" +
                new Date().getMinutes().toString()
            },
            {
              position: "left",
              type: "text",
              text: "Eh gia, bella merda",
              date: new Date(),
              dateString:
                new Date().getHours().toString() +
                ":" +
                new Date().getMinutes().toString()
            }
          ]
        }
      },
      openChatID: "1234",
      newChatDialogOpen: false,
      inCall: false
    };
    this.streamRef = React.createRef();
    this.handleNewChat = this.handleNewChat.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleNewConnection = this.handleNewConnection.bind(this);
    this.handleSendMessage = this.handleSendMessage.bind(this);
    this.handleChatChange = this.handleChatChange.bind(this);
    this.handleCallRequest = this.handleCallRequest.bind(this);
    this.handleIncomingCall = this.handleIncomingCall.bind(this);
  }

  componentDidMount() {
    this.props.peer.on("connection", this.handleNewConnection);
    this.props.peer.on("call", this.handleIncomingCall);
  }

  handleChatChange(chat) {
    this.setState({ openChatID: chat.peerID });
  }

  handleDataReceived(message, connection) {
    message.position = "left";
    message.date = new Date();
    message.dateString =
      new Date().getHours().toString() +
      ":" +
      new Date().getMinutes().toString();

    this.state.chats[connection.peer].messages.push(message);
    this.forceUpdate();
  }

  handleSendMessage(text, recipientID) {
    let message = {
      type: "text",
      text: text,
      date: new Date(),
      dateString:
        new Date().getHours().toString() +
        ":" +
        new Date().getMinutes().toString()
    };
    this.state.chats[recipientID].connection.send(message);
    message.position = "right";
    this.state.chats[recipientID].messages.push(message);
    this.forceUpdate();
  }

  handleNewConnection(connection) {
    var username = "";
    // Get username by ID from server
    axios
      .get("http://40ena.monta.li:40015/username/" + connection.peer, {
        crossDomain: true
      })
      .then(res => {
        username = res.data;
        var chats = this.state.chats;
        chats[connection.peer] = {
          connection: connection,
          messages: [],
          username: username
        };
        this.setState({ chats: chats });
      })
      .catch(error => {
        username = "anonymous";
      });
    connection.on("open", () => {
      connection.on("data", data => {
        this.handleDataReceived(data, connection);
      });
    });
  }

  handleChange(event) {
    this.setState({ query: event.target.value });
  }

  handleNewChat(target) {
    // Request the ID to the server
    axios
      .get("http://40ena.monta.li:40015/id/" + this.state.query, {
        crossDomain: true
      })
      .then(res => {
        // Connect our peer to the id and save the connection in chats
        var connection = this.props.peer.connect(res.data);
        var chats = this.state.chats;
        chats[res.data] = {
          connection: connection,
          username: this.state.query,
          messages: []
        };
        connection.on("open", () => {
          console.log("connection open");
          connection.on("data", data => {
            this.handleDataReceived(data, connection);
          });
        });
        this.setState({ chats: chats });
        // Set openChatID to the new one
        this.setState({ newChatDialogOpen: false, openChatID: res.data });
      })
      .catch(error => {
        // Snackbar to report error
        /*setState({
          loginSnackbar: true,
          snackbarMessage: "Wrong login inserted!"
        });*/
      });
  }

  handleCallRequest() {
    // Open popup lightbox
    this.setState({ videoCallOpen: true });
    // Instantiate peerjs call
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: true })
        .then(myStream => {
          var call = this.props.peer.call(this.state.openChatID, myStream);
          call.on("stream", stream => {
            this.streamRef.current.srcObject = stream;
            this.setState({ inCall: true, call: call });
          });
          call.on("close", () => {
            this.setState({ inCall: false });
            myStream.getTracks().forEach(function(track) {
              track.stop();
            });
          });
        })
        .catch(function(err0r) {
          console.log(err0r);
        });
    }
  }

  handleIncomingCall(call) {
    // Instantiate peerjs call
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: true })
        .then(myStream => {
          call.answer(myStream);
          call.on("stream", stream => {
            // Open popup lightbox
            this.streamRef.current.srcObject = stream;
            this.setState({ inCall: true, call: call });
          });
          call.on("close", () => {
            this.setState({ inCall: false });
            myStream.getTracks().forEach(function(track) {
              track.stop();
            });
          });
        })
        .catch(function(err0r) {
          console.log(err0r);
        });
    }
  }

  render() {
    const chatData = this.state.chats[this.state.openChatID];

    const handleDrawerToggle = () => {
      this.props.setMobileOpen(!this.props.mobileOpen);
    };

    let callLightBox;
    if (this.state.inCall) {
      callLightBox = (
        <div className={this.props.classes.videoCallDiv}>
          <video
            className={this.props.classes.videoStream}
            ref={this.streamRef}
            autoPlay
          />
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => this.state.call.close()}
          >
            <CallEndIcon />
          </Fab>
        </div>
      );
    } else {
      callLightBox = (
        <div className={this.props.classes.videoCallDiv} hidden>
          <video
            className={this.props.classes.videoStream}
            ref={this.streamRef}
            autoPlay
          />
        </div>
      );
    }
    const drawer = (
      <div>
        <div
          className={this.props.classes.toolbar}
          style={{ backgroundColor: "#3f51b5" }}
        />
        <div className={this.props.classes.component_with_margin}>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item className={this.props.classes.component_with_margin}>
              <SearchIcon />
            </Grid>
            <TextField
              className={this.props.classes.component_with_margin}
              label="Search User"
              id="outlined-size-small"
              variant="outlined"
              size="small"
            />
          </Grid>
        </div>
        <Divider />
        <AccountList
          classes={this.props.classes}
          chats={this.state.chats}
          onClick={this.handleChatChange}
        />
      </div>
    );

    return (
      <div className={this.props.classes.root}>
        {callLightBox}
        <CssBaseline />
        <AppBar position="fixed" className={this.props.classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={this.props.classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              QuaranChat
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={this.props.classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={this.props.theme.direction === "rtl" ? "right" : "left"}
              open={this.props.mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: this.props.classes.drawerPaper
              }}
              ModalProps={{
                keepMounted: true // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: this.props.classes.drawerPaper
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <Chat
          classes={this.props.classes}
          chatData={chatData}
          onSendHandler={this.handleSendMessage}
          callHandler={this.handleCallRequest}
        />
        <NewChatDialog
          open={this.state.newChatDialogOpen}
          handleClose={this.handleNewChat}
          handleChange={this.handleChange}
        />
      </div>
    );
  }
}

export default MainView;
