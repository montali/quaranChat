import React from "react";
//import "../App.css";

// Material UI
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";

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
              aria-label="Send message"
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

export default MessageInput;
