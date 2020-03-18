import React from "react";
//import "../App.css";

// Material UI
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import SendIcon from "@material-ui/icons/Send";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";

class MessageInput extends React.Component {
  render() {
    return (
      <Paper component="form" className={this.props.classes.message_input}>
        <InputBase
          id="outlined-textarea"
          className={this.props.classes.input}
          multiline
          placeholder="Send a message"
          inputProps={{ "aria-label": "Send a message" }}
          value={this.props.inputText}
          onChange={this.props.onTextChange}
          onKeyPress={ev => {
            if (ev.key === "Enter") {
              ev.preventDefault();
              this.props.onSend();
            }
          }}
        />
        <Divider
          className={this.props.classes.divider}
          orientation="vertical"
        />
        <IconButton
          color="primary"
          className={this.props.classes.iconButton}
          aria-label="directions"
          onClick={this.props.onSend}
        >
          <SendIcon />
        </IconButton>
      </Paper>
    );
  }
}

export default MessageInput;
