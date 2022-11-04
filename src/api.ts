import axios from "axios";

export default axios.create({
  baseURL: "https://api.spacexdata.com/latest",
  headers: {
    "Content-type": "application/json",
  },
});
