import { io } from "socket.io-client";

const socket =
  io(
    "https://mandal-website-production.up.railway.app"
  );

export default socket;