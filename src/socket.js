import io from "socket.io-client";
import { config } from "./Constant";
var url = config.url.API_URL;

// export const socket = io(`http://localhost:3001`);
export const socket = io(`${url}`);