import { io } from "socket.io-client";

const socket = io("https://s71hn7.deta.dev", {
  path: "/ws/socket.io",
}); 


// const socket = io("http://127.0.0.1:8000", {
//   path: "/ws/socket.io"
// });

export default socket;
