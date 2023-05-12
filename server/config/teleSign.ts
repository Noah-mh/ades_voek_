import TeleSignSDK from "telesignsdk";
import config from "./config.js";

const rest_endpoint = "https://rest-api.telesign.com";
const timeout = 10 * 1000; // 10 secs
const client = new TeleSignSDK(
  config.telesignCustomerId,
  config.telesignAPIKey,
  rest_endpoint,
  timeout
);

export default client;
//
