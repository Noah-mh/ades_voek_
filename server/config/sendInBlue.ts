import Sib from "sib-api-v3-sdk";
import config from "./config.js";

const client = Sib.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = config.sendInBlueAPIKey;

export default Sib;
