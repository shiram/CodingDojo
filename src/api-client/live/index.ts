import { ApiClientInterface } from "../models/ApiClient.interface";
import { itemsApiClient } from "./items";

//create an instance of our main ApiClient that wraps the live child clients
const apiLiveClient: ApiClientInterface = {
    items: itemsApiClient
}

//export our instances
export {
    apiLiveClient
}