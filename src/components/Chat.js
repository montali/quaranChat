import React from "react";
//import "../App.css";

// React Chat Elements
import "react-chat-elements/dist/main.css";
import { MessageList } from "react-chat-elements";

// Material UI
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import GridList from "@material-ui/core/GridList";

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

export default Chat;
