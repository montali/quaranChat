import React from "react";
////import "../App.css";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Snackbar from "@material-ui/core/Snackbar";
import ReactCardFlip from "react-card-flip";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  margin: {
    margin: theme.spacing.unit * 2
  },
  padding: {
    padding: theme.spacing.unit * 2
  }
}));

class Login extends React.Component {
  render() {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={12} m={3}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Paper className={this.props.classes.padding}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Grid item xs={12}>
                  <span
                    role="img"
                    aria-label="house"
                    style={{
                      fontSize: "5rem"
                    }}
                  >
                    🏠
                  </span>
                </Grid>
                <Grid item xs={12}>
                  <Typography component="h1" variant="h5">
                    quaranChat.
                  </Typography>
                </Grid>
              </Grid>
              <form
                className={this.props.classes.form}
                noValidate
                onSubmit={this.props.handleLogin}
              >
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="signinUsername"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  onChange={this.props.handleFormChange}
                  defaultValue={this.props.oldUsername}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="signinPassword"
                  autoComplete="current-password"
                  onChange={this.props.handleFormChange}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={this.props.classes.submit}
                >
                  Sign In
                </Button>
                <Grid container justify="center" alignItems="center">
                  <Grid item>
                    <Link
                      href="#"
                      variant="body2"
                      onClick={this.props.handleFlip}
                    >
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Container>
        </Grid>
        <Grid item xs={12}>
          <Typography
            className={this.props.classes.padding}
            component="h6"
            style={{ color: "white" }}
          >
            Just stay ~.
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

class LoginCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { signingUp: false };
    this.flipCard = this.flipCard.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  flipCard(event) {
    event.preventDefault();
    this.setState(prevState => ({ signingUp: !prevState.signingUp }));
  }

  handleSignUp(event) {
    event.preventDefault();
    this.props.handleSignUp();
    this.flipCard(event);
  }

  render() {
    return (
      <ReactCardFlip isFlipped={this.state.signingUp} flipDirection="vertical">
        <Login {...this.props} handleFlip={this.flipCard}></Login>
        <SignUp
          {...this.props}
          handleFlip={this.flipCard}
          handleSignUp={this.handleSignUp}
        ></SignUp>
      </ReactCardFlip>
    );
  }
}

class SignUp extends React.Component {
  render() {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={12} m={3}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Paper className={this.props.classes.padding}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Grid item xs={12}>
                  <span
                    role="img"
                    aria-label="house"
                    style={{
                      fontSize: "5rem"
                    }}
                  >
                    🏠
                  </span>
                </Grid>
                <Grid item xs={12}>
                  <Typography component="h1" variant="h5">
                    Register to quaranChat.
                  </Typography>
                </Grid>
              </Grid>
              <form
                className={this.props.classes.form}
                noValidate
                onSubmit={this.props.handleSignUp}
              >
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  onChange={this.props.handleFormChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={this.props.handleFormChange}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={this.props.classes.submit}
                >
                  Sign Up
                </Button>
                <Grid container justify="center" alignItems="center">
                  <Grid item>
                    <Link
                      href="#"
                      variant="body2"
                      onClick={this.props.handleFlip}
                    >
                      {"Switch to login instead."}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Container>
        </Grid>
      </Grid>
    );
  }
}

export default function SignInPage(props) {
  const classes = useStyles();
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        background: "#0E4D81"
      }}
    >
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        open={props.loginSnackbar}
        autoHideDuration={4000}
        onClose={props.handleSnackbarClose}
        message={props.snackbarMessage}
      />
      <LoginCard {...props} classes={classes} />
    </div>
  );
}
