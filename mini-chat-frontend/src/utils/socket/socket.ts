import { io } from "socket.io-client";

const socket = io("http://125c-188-186-140-107.ngrok.io", {
  path: "/ws/socket.io",
}); 


// const socket = io("http://127.0.0.1:8000", {
//   path: "/ws/socket.io"
// });

export default socket;
