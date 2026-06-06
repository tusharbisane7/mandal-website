import { io } from "socket.io-client";

const socket =
  io(
    "https://mandal-website.onrender.com"
  );

export default socket;