import axios from "axios";

const API = axios.create({
  baseURL: "https://mandal-website.onrender.com/api",
});

export default API;