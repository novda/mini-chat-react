import { io } from "socket.io-client";

// https://s71hn7.deta.dev/ 

const socket = io("http://127.0.0.1:8000", {
  path: "/ws/socket.io"
});

export default socket;
