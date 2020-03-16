import React from "react";
import "./App.css";
// React Chat Elements
import "react-chat-elements/dist/main.css";
import { ChatList } from "react-chat-elements";
import { MessageList } from "react-chat-elements";
// Material UI
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import Hidden from "@material-ui/core/Hidden";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import SendIcon from "@material-ui/icons/Send";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import GridList from "@material-ui/core/GridList";
import ChatIcon from "@material-ui/icons/Chat";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PeopleIcon from "@material-ui/icons/People";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import clsx from "clsx";
import axios from "axios";

// Local components
import SignInPage from "./components/SignInPage";
import Peer from "peerjs";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "flex-end",
    height: "100vh"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4),
    paddingTop: 90
  },
  button: {
    margin: theme.spacing(1)
  },
  margin: {
    margin: theme.spacing.unit * 2
  },
  padding: {
    padding: theme.spacing.unit
  },
  component_with_margin: {
    margin: theme.spacing(1)
  },
  gridList: {
    width: "100%",
    height: 670,
    backgroundColor: "#3f51b5"
  },
  message: {
    minWidth: "100%"
  },
  rightDrawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  }
}));

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
              date: new Date()
            },
            {
              position: "left",
              type: "text",
              text: "Si tutto bene, te come va la quarantena?",
              date: new Date()
            },
            {
              position: "right",
              type: "text",
              text: "Potrebbe andar meglio, sto cazz di virus",
              date: new Date()
            },
            {
              position: "left",
              type: "text",
              text: "Eh gia, bella merda",
              date: new Date()
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
      date: new Date()
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
    const { container } = this.props;
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

class MainApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false, loginError: false };
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
    event.preventDefault();
    // Request an ID to the PeerJS server
    const peer = new Peer();
    this.setState({ peer: peer });
    const username = this.state.username;
    const password = this.state.password;
    const setState = this.setState.bind(this);
    peer.on("open", id => {
      // Connect to our login server and update the ID with a POST
      axios
        .post("http://40ena.monta.li:40015/id/" + username, {
          password: password,
          connectionID: id,
          crossDomain: true
        })
        .then(res => {
          setState({
            loggedIn: true,
            username: username,
            password: password
          });
        })
        .catch(error => {
          setState({
            loginSnackbar: true,
            snackbarMessage: "Wrong login inserted!"
          });
          console.log(this.state);
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
        />
      );
    }
  }
}

function App(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  return (
    <MainApp
      classes={classes}
      theme={theme}
      mobileOpen={mobileOpen}
      setMobileOpen={setMobileOpen}
    />
  );
}

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.textChangeHandler = this.textChangeHandler.bind(this);
    this.sendHandler = this.sendHandler.bind(this);
    this.state = { inputText: "" };
  }

  sendHandler() {
    this.props.onSendHandler(
      this.state.inputText,
      this.props.chatData.connection.peer
    );
    this.setState({ inputText: "" });
  }

  textChangeHandler(event) {
    this.setState({ inputText: event.target.value });
  }

  render() {
    /*const messageRows = this.props.chatData.messages.map(message => (
      <MessageRow senderName={message.sender} message={message.text} />
    ));*/
    return (
      <main height="100vh" className={this.props.classes.content}>
        <div />
        <Grid container direction="row" alignItems="stretch">
          <Grid item className={this.props.classes.component_with_margin}>
            <Avatar>{this.props.chatData.username.charAt(0)}</Avatar>
          </Grid>
          <Grid item>
            <Typography
              variant="h5"
              className={this.props.classes.component_with_margin}
            >
              {this.props.chatData.username}
            </Typography>
          </Grid>
        </Grid>
        <Divider />
        <GridList className={this.props.classes.gridList} cols={1}>
          <MessageList
            className="message-list"
            className={this.props.classes.message}
            lockable={true}
            toBottomHeight={"100%"}
            dataSource={this.props.chatData.messages}
          />
        </GridList>
        <Grid container direction="column" alignItems="stretch">
          <Grid item className={this.props.classes.component_with_margin}>
            <Grid container direction="row" alignItems="stretch">
              <MessageInput
                classes={this.props.classes}
                onSend={this.sendHandler}
                onTextChange={this.textChangeHandler}
                inputText={this.state.inputText}
              />
            </Grid>
          </Grid>
        </Grid>
      </main>
    );
  }
}

class MessageInput extends React.Component {
  render() {
    return (
      <Grid item xs={12}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <Grid item xs={11}>
            <TextField
              id="outlined-textarea"
              label="Invia un messaggio"
              placeholder="Messaggio"
              multiline
              fullWidth
              variant="outlined"
              value={this.props.inputText}
              onChange={this.props.onTextChange}
              onKeyPress={ev => {
                if (ev.key === "Enter") {
                  ev.preventDefault();
                  this.props.onSend();
                }
              }}
            />
          </Grid>
          <Grid item xs={1}>
            <IconButton
              color="primary"
              aria-label="add to shopping cart"
              onClick={this.props.onSend}
            >
              <SendIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

class AccountList extends React.Component {
  render() {
    var chatDataSource = [];
    for (var chat in this.props.chats) {
      console.log(this.props.chats);
      console.log(chat);
      const messageLength = this.props.chats[chat].messages.length;
      const date =
        messageLength > 0
          ? this.props.chats[chat].messages[messageLength - 1].date
          : new Date();
      const subtitle =
        messageLength > 0
          ? this.props.chats[chat].messages[messageLength - 1].text
          : "";
      if (this.props.chats.hasOwnProperty(chat)) {
        chatDataSource.push({
          avatar: "https://facebook.github.io/react/img/logo.svg",
          peerID: chat,
          alt: "Reactjs",
          title: this.props.chats[chat].username,
          subtitle: subtitle,
          date: date,
          unread: 0
        });
      }
    }
    return (
      <Drawer
        className={this.props.classes.rightDrawer}
        variant="permanent"
        anchor="right"
      >
        <div className={this.props.classes.toolbar} />
        <ChatList
          className="chat-list"
          dataSource={chatDataSource}
          onClick={this.props.onClick}
        />
      </Drawer>
    );
  }
}

class MessageRow extends React.Component {
  render() {
    let direction;
    if (this.props.isReceived) {
      direction = "row-reverse";
    } else {
      direction = "row";
    }
    return (
      <Grid item xs={12}>
        <Grid
          container
          direction={direction}
          justify="flex-start"
          alignItems="center"
        >
          <Card>
            <CardContent>
              <Grid item xs={4}>
                <Avatar>{this.props.senderName.charAt(0)}</Avatar>
                <h3>{this.props.senderName}</h3>
              </Grid>
              <Grid item xs={8}>
                {this.props.message}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

class NewChatDialog extends React.Component {
  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New message</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please, insert your recipient username.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="Username"
            type="text"
            onChange={this.props.handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.props.handleClose} color="primary">
            Search
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default App;
