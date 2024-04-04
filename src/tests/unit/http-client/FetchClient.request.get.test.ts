import { vitest } from "vitest";
import { HttpClientFetch, HttpRequestType, HttpRequestParamsInterface, HttpRequestmethods } from "../../../http-client";

let mockRequestParams: HttpRequestParamsInterface = {
    requestType: HttpRequestType.get,
    endpoint: '/static/mock-data/items/items.json',
    requiresToken: false
}

describe('Httpclient: fetch-client: request: get', () => {
    const httpClient = new HttpClientFetch()

    it('should execute get request successfully', async () => {
        //research on wasy way of using SpyOn for fetch so overriding global.fetch
        //save original fetch
        const unmockedFetch = global.fetch || (() => {})
        global.fetch = unmockedFetch

        const expectedResult = {
            result: `request completed: ${mockRequestParams.endpoint}`
        }

        vitest.spyOn(global, 'fetch').mockImplementation(async () => Promise.resolve({
            redirected: false,
            json: () => Promise.resolve(JSON.stringify(expectedResult))
        } as any))

        try{
            const response = await httpClient.request(mockRequestParams)
            expect(response).not.toBeNull()
            expect(response).toEqual(expectedResult)
        } catch(error) {
            console.info('FetchClient.request.get.test.ts: error', error)
        }

        //restore global.fetch
        global.fetch = unmockedFetch
    })

    it('get request should throw error on rejection', () => {
        const unmockedFetch = global.fetch || (() => {})
        global.fetch = unmockedFetch

        vitest.spyOn(global, 'fetch').mockImplementation(async () => Promise.reject())

        httpClient.request(mockRequestParams).catch((error) => {
            expect(error).toBeDefined()
            expect(error.toString()).toEqual('Error: HttpClientFetch: exception')
        })
    })
})