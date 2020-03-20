import React from "react";
//import "../App.css";

// React Chat Elements
import "react-chat-elements/dist/main.css";
import { ChatList } from "react-chat-elements";

// Images
import onlineUser from "../res/online_user.png";
import offlineUser from "../res/offline_user.png";

class AccountList extends React.Component {
  render() {
    var chatDataSource = [];
    for (var chat in this.props.chats) {
      const messageLength = this.props.chats[chat].messages.length;
      let date = new Date();
      if (messageLength > 0) {
        date =
          this.props.chats[chat].messages[messageLength - 1].date instanceof
          Date
            ? this.props.chats[chat].messages[messageLength - 1].date
            : new Date(this.props.chats[chat].messages[messageLength - 1].date);
      }
      const subtitle =
        messageLength > 0
          ? this.props.chats[chat].messages[messageLength - 1].text
          : "";
      const onlineString = this.props.chats[chat].online
        ? " (Online)"
        : "(Offline)";
      if (this.props.chats.hasOwnProperty(chat)) {
        chatDataSource.push({
          avatar: this.props.chats[chat].online ? onlineUser : offlineUser,
          peerID: chat,
          alt: "User avatar",
          title: this.props.chats[chat].username + onlineString,
          subtitle: subtitle,
          date: date,
          // The following line is kinda esoteric but we need that in order to display 2 digits
          dateString:
            ("0" + date.getHours()).slice(-2) +
            ":" +
            ("0" + date.getMinutes()).slice(-2),
          unread: this.props.chats[chat].unread
        });
      }
    }
    chatDataSource.sort((a, b) => (a.date < b.date ? 1 : -1));
    return (
      <ChatList
        className="chat-list"
        dataSource={chatDataSource}
        onClick={this.props.onClick}
      />
    );
  }
}

export default AccountList;
