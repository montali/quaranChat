import React from "react";
//import "../App.css";

// React Chat Elements
import "react-chat-elements/dist/main.css";
import { ChatList } from "react-chat-elements";

// Material UI
import Drawer from "@material-ui/core/Drawer";

class AccountList extends React.Component {
  render() {
    var chatDataSource = [];
    for (var chat in this.props.chats) {
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

export default AccountList;
