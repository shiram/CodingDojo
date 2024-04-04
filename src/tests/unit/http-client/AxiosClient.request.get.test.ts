import axios from "axios";
import { HttpClientAxios, HttpRequestType, HttpRequestParamsInterface } from "../../../http-client";
import { vitest } from "vitest";

let mockRequestParams: HttpRequestParamsInterface = {
    requestType: HttpRequestType.get,
    endpoint: '/static/mock-data/items/items.json',
    requiresToken: false
}

describe('HttpClient: axios-client: request: get', () => {
    const httpClient = new HttpClientAxios()

    //testing successful get request
    it('should execute get request successfully', () => {
        vitest.spyOn(axios, 'get').mockImplementation(async () => Promise.resolve({data: `request completed: ${mockRequestParams.endpoint}`}))

        httpClient.request(mockRequestParams).then((response) => {
            expect(response).toEqual(`request completed: ${mockRequestParams.endpoint}`)
        }).catch((error) => {
            console.error('HttpClient: AxiosClient: Get: error: Error fetching items', error)
        })
    })

    //testing failed get request 
    it('get request should throw error on rejection', () => {
        vitest.spyOn(axios, 'get').mockImplementation(async () => Promise.reject({data: `request completed: ${mockRequestParams.endpoint}`}))

        httpClient.request(mockRequestParams).catch((error) => {
            expect(error).toBeDefined()
            expect(error.toString()).toEqual('Error: HttpClientAxios: exception')
        })
    })

})