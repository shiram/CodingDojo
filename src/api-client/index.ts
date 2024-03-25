import { ApiClientInterface } from "./models/ApiClient.interface";
import { apiMockClient } from "./mock";
import { apiLiveClient } from "./live";

let env: string = 'mock'

if (import.meta.env.VITE_API_CLIENT) {
    env = import.meta.env.VITE_API_CLIENT.trim()
}

let apiClient: ApiClientInterface
if (env === 'live'){
    apiClient = apiLiveClient
} else{
    apiClient = apiMockClient
}

export {
    apiClient
}