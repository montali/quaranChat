# 🏠🏠quaranChat🏠🏠
### Chat with friends when staying at ~.
This project is currently being developed for the **Tecnologie Internet** course [@Università di Parma](https://www.unipr.it). We're using **PeerJS** and **React** to build a P2P chat app based on WebRTC. 

## Main features

We developed the web app with **performance**, **security** and **responsiveness** in mind. It is strictly tied to the PeerJS APIs, which we use to make videocalls, send text messages, and ping the peers. Let's have a quick overview over the components that were required to build the app.

### PeerJS

When a user logs in, we generate a peer through the official PeerServer. We then tie its ID to a username in our [login server](#Username-server), so that other users can search him **by his username, not his Peer ID**. This enables us to establish **multi-session chats**: once a user has a chat open with a friend, the ID is **automatically updated** by the login server. 

### User interface

We used the beautiful [Material-UI](https://material-ui.com/) components to **build our UI**. The library contains most of the UI components a developer will ever need, including **grids**, **TextFields**, **themes**, **buttons**. Not to mention it is also **blazingly fast!**

### react-chat-elements

Some components of the UI were obviously missing from Material-UI. [react-chat-elements](https://github.com/Detaysoft/react-chat-elements) contains what we needed. We used this library to get **message boxes and chat lists**. 

### Requests to the REST API

We used [Axios](https://www.npmjs.com/package/axios) to execute **async requests** to the APIs. 

### Password hashing

Saving passwords in plain text is **so 1990**. We decided to use **bcrypt**, a universally trusted hashing algorithm, available through a [lightweight npm module](https://www.npmjs.com/package/bcrypt).

### Persistency

No one wants to lose its chats when closing a web app. We decided to save chats data in the local storage, enabling a user to just enter the password and login. Beware: the chats are **not encrypted**, so use **Incognito Mode** if you're working on a public workstation. 

## Username server
We built a login server using **Node.js** and **Express** which tracks associations between peer.js IDs and our usernames. You can find it [here](https://github.com/simmontali/usernameServer). 

## Course notes

You can find the course notes [here.](https://github.com/simmontali/internetnotes)

## How to run

Clone the repository, and install the npm modules like you always do:

### `npm install`

You can then run

### `npm start`

To run the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the GPL License. See `LICENSE` for more information.



