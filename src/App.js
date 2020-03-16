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
  render() {
    const { container } = this.props;
    let newChatDialogOpen = false;

    const handleDrawerToggle = () => {
      this.props.setMobileOpen(!this.props.mobileOpen);
    };

    const handleNewChat = () => {
      newChatDialogOpen = newChatDialogOpen ? false : true;
      console.log("ok");
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
            {["Chats", "Friends"].map((text, index) => (
              <ListItem button key={text}>
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
        <Chat classes={this.props.classes} />
        <AccountList classes={this.props.classes} />
        <NewChatDialog open={newChatDialogOpen} handleClose={handleNewChat} />
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
    const axios = require("axios");
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
    const axios = require("axios");
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
    const axios = require("axios");
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
  render() {
    return (
      <main height="100vh" className={this.props.classes.content}>
        <div />
        <Grid container direction="row" alignItems="stretch">
          <Grid item className={this.props.classes.component_with_margin}>
            <Avatar>S</Avatar>
          </Grid>
          <Grid item>
            <Typography
              variant="h5"
              className={this.props.classes.component_with_margin}
            >
              Simone
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
            dataSource={[
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
            ]}
          />
        </GridList>
        <Grid container direction="column" alignItems="stretch">
          <Grid item className={this.props.classes.component_with_margin}>
            <Grid container direction="row" alignItems="stretch">
              <MessageInput classes={this.props.classes} />
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
            />
          </Grid>
          <Grid item xs={1}>
            <IconButton color="primary" aria-label="add to shopping cart">
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
    return (
      <Drawer
        className={this.props.classes.rightDrawer}
        variant="permanent"
        anchor="right"
      >
        <div className={this.props.classes.toolbar} />
        <ChatList
          className="chat-list"
          dataSource={[
            {
              avatar: "https://facebook.github.io/react/img/logo.svg",
              alt: "Reactjs",
              title: "Marco",
              subtitle: "What are you doing?",
              date: new Date(),
              unread: 0
            },
            {
              avatar: "https://facebook.github.io/react/img/logo.svg",
              alt: "Reactjs",
              title: "Giovanni",
              subtitle: "What are you doing?",
              date: new Date(),
              unread: 0
            },
            {
              avatar: "https://facebook.github.io/react/img/logo.svg",
              alt: "Reactjs",
              title: "Paolo",
              subtitle: "What are you doing?",
              date: new Date(),
              unread: 0
            }
          ]}
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
function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

class NewChatDialog extends React.Component {
  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.props.handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default App;
