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
            className="message-list"
            className={this.props.classes.message}
            lockable={true}
            toBottomHeight={"100%"}
            dataSource={this.props.chatData.messages}
          />
        </GridList>

        <Paper className={this.props.classes.paper} variant="outlined">
          <MessageInput
            onSend={this.sendHandler}
            classes={this.props.classes}
            onTextChange={this.textChangeHandler}
            inputText={this.state.inputText}
          />
        </Paper>
      </Container>
    );
  }
}

export default Chat;
