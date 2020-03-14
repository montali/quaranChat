import React from 'react';
import logo from './logo.svg';
import './App.css';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import SendIcon from '@material-ui/icons/Send';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { sizing } from '@material-ui/system';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Face, Fingerprint } from '@material-ui/icons'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Peer from 'peerjs';

// TODO REFACTOR THIS SHIT PLS

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'flex-end',
    height: '100vh',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    width:"100%",
    padding: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1),
  },
  margin: {
    margin: theme.spacing.unit * 2,
  },
  padding: {
      padding: theme.spacing.unit
  }
}));

class MainView extends React.Component {
    constructor(props){
        super(props);
    }
    render () {
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
                {['Persona1', 'Persona2', 'Persona3', 'Persona4'].map((text, index) => (
                <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['Nuova chat', 'Logout'].map((text, index) => (
                <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                </ListItem>
                ))}
                <ListItem button key="Nuova chattina" onClick={handleNewChat}>
                    <ListItemIcon><InboxIcon /></ListItemIcon>
                    <ListItemText primary="Nuova chattina"/>
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
                    anchor={this.props.theme.direction === 'rtl' ? 'right' : 'left'}
                    open={this.props.mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                    paper: this.props.classes.drawerPaper,
                    }}
                    ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    {drawer}
                </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                <Drawer
                    classes={{
                    paper: this.props.classes.drawerPaper,
                    }}
                    variant="permanent"
                    open
                >
                    {drawer}
                </Drawer>
                </Hidden>
            </nav>
            <Chat classes={this.props.classes}/>
            <NewChatDialog open={newChatDialogOpen} handleClose={handleNewChat} />
            </div>
        );
        }
}

class MainApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {loggedIn: false};
        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handleLoginRequest = this.handleLoginRequest.bind(this);

    }

    handleLoginChange (event) {
        const target = event.target;
        const name = target.name;
        const value = event.target.value;
        this.setState({[name]: value});
    }

    handleLoginRequest () {
        const axios = require('axios')
        // Request an ID to the PeerJS server
        const peer = new Peer();
        this.setState({peer: peer});
        const username = this.state.username;
        const password = this.state.password;

        peer.on('open', function(id) {
            // Connect to our login server and update the ID with a POST
            axios.post('http://localhost:3000/id/'+username, {
                password: password,
                connectionID: id,
                crossDomain: true
              })
              .then((res) => {
                console.log(`statusCode: ${res.statusCode}`)
                console.log(res)
              })
              .catch((error) => {
                console.error(error)
              })
        });
    }

    render (){
        if (!this.state.loggedIn) {
            return (<LoginTab classes={this.props.classes} handleFormChange={this.handleLoginChange} handleLogin={this.handleLoginRequest}></LoginTab>);
        } else {
            return (<MainView classes={this.props.classes} theme={this.props.theme}/>)
        }
    }
}

function App (props){
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    return <MainApp classes={classes} theme={theme} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}/>;
}

class Chat extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
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
      <MessageRow isReceived senderName="Gianni" message="Ciao come va? Tutto ok?"/>

      <MessageRow senderName="Simone" message="Ma si dai, tutto bene. Tu?"/>
      <MessageInput classes={this.props.classes}/>
    </Grid>
  </main>
  );
  }
}

class MessageInput extends React.Component {
  constructor(props){
    super(props);
  }

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
  constructor(props) {
    super(props);
  }

  render(){
    let direction;
    if(this.props.isReceived) {
      direction = "row-reverse";
    } else {
      direction = "row";
    }
    return (
      <Grid item xs={12}>
            <Grid 
            container
            direction= {direction}
            justify= "flex-start"
            alignItems="center"
            >
          <Card>
          <CardContent>
              <Grid item xs={4}>
                <Avatar>{this.props.senderName.charAt(0)}</Avatar>
                <h3>
                  {this.props.senderName}
                </h3>
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
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
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
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <Dialog open={this.props.open} onClose={this.props.handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We will send updates
          occasionally.
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

class LoginTab extends React.Component {
    render() {
      const { classes } = this.props;
      return (
        <div
        style={{
            height: '100vh',
            width: '100vw',
            background: '#0E4D81'      
        }}
        >
        <div
        style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'
        }}
        >
          <Paper className={classes.padding}>
              <div className={classes.margin}>
                  <h2>Welcome to quaranChat.</h2>
                  <Grid container spacing={8} alignItems="flex-end">
                      <Grid item>
                          <Face />
                      </Grid>
                      <Grid item md={true} sm={true} xs={true}>
                          <TextField id="username" name="username" label="Username" type="email" fullWidth autoFocus required onChange={this.props.handleFormChange}/>
                      </Grid>
                  </Grid>
                  <Grid container spacing={8} alignItems="flex-end">
                      <Grid item>
                          <Fingerprint />
                      </Grid>
                      <Grid item md={true} sm={true} xs={true}>
                          <TextField name="password" id="password" label="Password" type="password" fullWidth required onChange={this.props.handleFormChange}/>
                      </Grid>
                  </Grid>
                  <Grid container alignItems="center" justify="space-between">
                      <Grid item>
                          <FormControlLabel control={
                              <Checkbox
                                  color="primary"
                              />
                          } label="Remember me" />
                      </Grid>
                      <Grid item>
                          <Button disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" color="primary">Forgot password?</Button>
                      </Grid>
                  </Grid>
                  <Grid container justify="center" style={{ marginTop: '10px' }}>
                      <Button variant="outlined" color="primary" style={{ textTransform: "none" }} onClick={this.props.handleLogin}>Login</Button>
                  </Grid>
              </div>
          </Paper>
          </div>
          </div>

      );
  }
}

export default App;
