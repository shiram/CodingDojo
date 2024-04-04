import axios from "axios";
import { HttpClientAxios, HttpRequestType, HttpRequestParamsInterface } from "../../../http-client";
import { vitest } from "vitest";

let postMockRequestParams : HttpRequestParamsInterface = {
    requestType: HttpRequestType.post,
    endpoint: '/static/mock-data/items/items.json',
    requiresToken: false,
    payload: {}
}

//testing successful post request
describe('HttpClient: axios-client: request: post', () => {
    const httpClient = new HttpClientAxios()

    type P= typeof postMockRequestParams.payload

    it('should execute post request successfully', () => {
        vitest.spyOn(axios, 'post').mockImplementation(async () => Promise.resolve({data: `request completed: ${postMockRequestParams.endpoint}`}))

        httpClient.request<string, P>(postMockRequestParams).then((response) => {
            expect(response).toEqual(`request completed: ${postMockRequestParams.endpoint}`)
        }).catch((error) => {
            console.error('HttpClient: AxiosClient: Post: error: Error fetching items', error)
        })
    })


})