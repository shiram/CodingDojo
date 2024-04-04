import { HttpClientInterface } from "./models/HttpClient.interface";
import { HttpClientAxios } from "./models/HttpClient.axios";
import { HttpClientFetch } from "./models/HttpClient.fetch";

//export all our interfaces
export * from './models'

let _httpClient: HttpClientInterface | undefined = undefined

//export our hook
export const useHttpClient = () => {
    if(!_httpClient){
        //export instance of HttpClientInterface
        //const clientType = config.httpClient.ClientType //later
        const clientType = 'fetch'
        if(clientType === 'fetch') {
            _httpClient = new HttpClientFetch()
        } else if (clientType == 'axios'){
            _httpClient = new HttpClientAxios()
        }
    }

    return _httpClient as HttpClientInterface
}