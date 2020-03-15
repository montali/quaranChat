import React from "react";
import "./App.css";
// React Chat Elements
import "react-chat-elements/dist/main.css";
import { MessageBox } from "react-chat-elements";
// Material UI
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
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
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    width: "100%",
    padding: theme.spacing(3)
  },
  button: {
    margin: theme.spacing(1)
  },
  margin: {
    margin: theme.spacing.unit * 2
  },
  padding: {
    padding: theme.spacing.unit
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

    const drawer = (
      <div>
        <div className={this.props.classes.toolbar} />
        <Divider />
        <List>
          {["Persona1", "Persona2", "Persona3", "Persona4"].map(
            (text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            )
          )}
        </List>
        <Divider />
        <List>
          {["Nuova chat", "Logout"].map((text, index) => (
            <ListItem button key={text} onClick={this.props.handleLogout}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
          <ListItem button key="Nuova chattina" onClick={handleNewChat}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Nuova chattina" />
          </ListItem>
        </List>
      </div>
    );

    return (
      <div className={this.props.classes.root}>
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
              Responsive drawer
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={this.props.classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
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
        <Chat classes={this.props.classes} />
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
        <div className={this.props.classes.toolbar} />
        <Grid
          container
          direction="column"
          justify="space-between"
          alignItems="stretch"
          spacing={2}
        >
          <MessageRow
            isReceived
            senderName="Gianni"
            message="Ciao come va? Tutto ok?"
          />
          <MessageBox
            position={"left"}
            type={"photo"}
            text={"react.svg"}
            data={{
              uri: "https://facebook.github.io/react/img/logo.svg",
              status: {
                click: false,
                loading: 0
              }
            }}
          />
          <MessageRow
            senderName="Simone"
            message="Ma si dai, tutto bene. Tu?"
          />
          <MessageInput classes={this.props.classes} />
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
