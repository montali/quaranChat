import React from "react";
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
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ChatIcon from "@material-ui/icons/Chat";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PeopleIcon from "@material-ui/icons/People";

// Local imports
import clsx from "clsx";
import axios from "axios";

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
      newChatDialogOpen: false
    };
    this.handleNewChat = this.handleNewChat.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleNewConnection = this.handleNewConnection.bind(this);
    this.handleSendMessage = this.handleSendMessage.bind(this);
    this.handleChatChange = this.handleChatChange.bind(this);
  }

  handleChatChange(chat) {
    console.log(chat);
    console.log(this.state);
    this.setState({ openChatID: chat.peerID });
  }

  handleDataReceived(message, connection) {
    message.position = "left";
    console.log(message);
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
    // TODO: Get username by ID from server
    var username = "mario";
    var chats = this.state.chats;
    chats[connection.peer] = {
      connection: connection,
      messages: [],
      username: username
    };
    this.setState({ chats: chats });
    connection.on("open", () => {
      connection.on("data", data => {
        this.handleDataReceived(data, connection);
      });
    });
    // TODO: add the chat to our menu
  }

  // Funzione per generare lista messaggi come vuole la libreria prendendo in input lo state?

  componentDidMount() {
    this.props.peer.on("connection", this.handleNewConnection);
  }

  handleChange(event) {
    this.setState({ query: event.target.value });
  }

  handleNewChat(target) {
    console.log(this.state.query);

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
        console.log(error);
      });
  }

  render() {
    console.log(this.state);
    const chatData = this.state.chats[this.state.openChatID];

    const handleDrawerToggle = () => {
      this.props.setMobileOpen(!this.props.mobileOpen);
    };

    return (
      <div className={this.props.classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(this.props.classes.appBar, {
            [this.props.classes.appBarShift]: this.props.mobileOpen
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              edge="start"
              className={clsx(this.props.classes.menuButton, {
                [this.props.classes.hide]: this.props.mobileOpen
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" noWrap>
              Chat P2P
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(this.props.classes.drawer, {
            [this.props.classes.drawerOpen]: this.props.mobileOpen,
            [this.props.classes.drawerClose]: !this.props.mobileOpen
          })}
          classes={{
            paper: clsx({
              [this.props.classes.drawerOpen]: this.props.mobileOpen,
              [this.props.classes.drawerClose]: !this.props.mobileOpen
            })
          }}
        >
          <div className={this.props.classes.toolbar}>
            <IconButton onClick={handleDrawerToggle}>
              {this.props.theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            {["Search user", "Friends"].map((text, index) => (
              <ListItem
                button
                key={text}
                onClick={() => this.setState({ newChatDialogOpen: true })}
              >
                <ListItemIcon>
                  {index % 2 === 0 ? <ChatIcon /> : <PeopleIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {["Settings", "Logout"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <SettingsIcon /> : <ExitToAppIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Chat
          classes={this.props.classes}
          chatData={chatData}
          onSendHandler={this.handleSendMessage}
        />
        <AccountList
          classes={this.props.classes}
          chats={this.state.chats}
          onClick={this.handleChatChange}
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