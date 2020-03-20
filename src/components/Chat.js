import React from "react";
//import "../App.css";

// React Chat Elements
import "react-chat-elements/dist/main.css";
import { MessageList } from "react-chat-elements";

// Material UI
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import VideocamIcon from "@material-ui/icons/Videocam";
import GridList from "@material-ui/core/GridList";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";

// Local components
import MessageInput from "./MessageInput";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.textChangeHandler = this.textChangeHandler.bind(this);
    this.sendHandler = this.sendHandler.bind(this);
    this.state = { inputText: "" };
  }

  sendHandler() {
    if (this.props.chatData.online) {
      this.props.onSendHandler(
        this.state.inputText,
        this.props.chatData.connection.peer
      );
      this.setState({ inputText: "" });
    } else {
      this.props.snackbarCreator("You can't text offline users.");
    }
  }

  textChangeHandler(event) {
    this.setState({ inputText: event.target.value });
  }
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };
  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }
  render() {
    if (this.props.matches) {
      return (
        <Container className={this.props.classes.content}>
          <div className={this.props.classes.space_under_toolbar} />
          <Paper className={this.props.classes.paper} variant="outlined">
            <Grid container direction="row" alignItems="stretch">
              <Grid item className={this.props.classes.component_with_margin}>
                <Avatar>
                  {this.props.chatData.username.toUpperCase().charAt(0)}
                </Avatar>
              </Grid>
              <Grid item>
                <Typography
                  variant="h6"
                  className={this.props.classes.component_with_margin}
                >
                  {this.props.chatData.username}
                </Typography>
              </Grid>
              <Grid item>
                {" "}
                <IconButton
                  color="primary"
                  aria-label="Videocall"
                  onClick={this.props.callHandler}
                >
                  <VideocamIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Paper>
          <GridList className={this.props.classes.gridList} cols={1}>
            <MessageList
              className={this.props.classes.message}
              lockable={true}
              toBottomHeight={"100%"}
              dataSource={this.props.chatData.messages}
            />
            <div
              style={{ float: "left", clear: "both", height: "1px" }}
              ref={el => {
                this.messagesEnd = el;
              }}
            ></div>
          </GridList>
          <MessageInput
            onSend={this.sendHandler}
            classes={this.props.classes}
            onTextChange={this.textChangeHandler}
            inputText={this.state.inputText}
          />
        </Container>
      );
    } else {
      return (
        <Container className={this.props.classes.mobile_content}>
          <div className={this.props.classes.toolbar} />
          <Paper className={this.props.classes.paper} variant="outlined">
            <Grid container direction="row" alignItems="stretch">
              <Grid item className={this.props.classes.component_with_margin}>
                <Avatar>
                  {this.props.chatData.username.toUpperCase().charAt(0)}
                </Avatar>
              </Grid>
              <Grid item>
                <Typography
                  variant="h6"
                  className={this.props.classes.component_with_margin}
                >
                  {this.props.chatData.username}
                </Typography>
              </Grid>
              <Grid item>
                {" "}
                <IconButton
                  color="primary"
                  aria-label="Videocall"
                  onClick={this.props.callHandler}
                >
                  <VideocamIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Paper>
          <GridList className={this.props.classes.gridList} cols={1}>
            <MessageList
              className={this.props.classes.message}
              lockable={true}
              toBottomHeight={"100%"}
              dataSource={this.props.chatData.messages}
            />
            <div
              style={{ float: "left", clear: "both", height: "1px" }}
              ref={el => {
                this.messagesEnd = el;
              }}
            ></div>
          </GridList>
          <MessageInput
            onSend={this.sendHandler}
            classes={this.props.classes}
            onTextChange={this.textChangeHandler}
            inputText={this.state.inputText}
          />
        </Container>
      );
    }
  }
}

export default Chat;
