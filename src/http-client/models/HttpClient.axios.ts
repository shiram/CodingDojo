import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { HttpRequestParamsInterface } from './HtppRequestParams.interface'
import { HttpClientInterface, HttpClientConfigInterface } from './HttpClient.interface'
import { HttpRequestType, HttpRequestmethods } from './Constants'
import { UrlUtils } from './UrlUtils'

/**
 * @name HttpClientAxios
 * @description
 * Wraps http client functionality to avoid directly using a third party npm package
 * like axios, and simplify replacement in the future if such package would stop being used.
 */
export class HttpClientAxios implements HttpClientInterface {

    constructor () {
        //OPTIONAL for now: Add request interceptor to handle errors or other things for each request in one place
    }

    /**
     * @name request
     * @description 
     * A method that executes different types of http requests(ie GET,POST etc)
     * based on the parameters argument.
     * The type R specify the type of the result resturned
     * The type P specify the type of payload if any
     * @returns A promise<R> as the implementation of this method will be async
     */

    async request<R, P = void>(parameters: HttpRequestParamsInterface<P>): Promise<R> {
        const { requestType, endpoint, requiresToken, payload, headers, mockDelay } = parameters

        //use helper to build the full url with request parameters derived from the payload
        const fullUrl = UrlUtils.getFullUrlwithParams(endpoint, payload as any)
        console.log('HttpClientAxios: fullUrl: ', fullUrl, payload)

        //set axios options
        const options: AxiosRequestConfig = {
            headers: {},
            maxRedirects: 0
        }

        if (headers) {
            options.headers = {
                //optional headers here
                ...headers
            }
        }

        //set headers Authorization
        if (requiresToken && options.headers) {
            options.withCredentials = true
            //optional: you could add here to set the AUthorization header with a bearer token.
            //options.headers.Authorization = `bearer ${JwtHelpers.getJwtToken() }`
        }

        let result!: R

        try {
            switch(requestType){
                //implement case statement for each request type
                case HttpRequestType.get: {
                    const response = await axios.get(fullUrl, options)
                    result = response?.data as R
                    break
                }
                case HttpRequestType.post: {
                    const response = await axios.post(fullUrl, payload, options)
                    result = response?.data as R
                    break
                }
                case HttpRequestType.put: {
                    const response = await axios.put(fullUrl, payload, options)
                    result = response?.data as R
                    break
                }
                case HttpRequestType.delete: {
                    const response = await axios.delete(fullUrl, options)
                    result = response?.data as R
                    break
                }
                case HttpRequestType.patch: {
                    const response = await axios.patch(fullUrl, payload, options)
                    result = response?.data as R
                    break
                }
                default: {
                    console.warn('HttpClientAxios: invalid requestType argument or request type not implemented')
                }
            }
        } catch (e) {
            console.error('HttpClientAxios: exception', e)
            throw Error('HttpClientAxios: exception')
        }

        if ((mockDelay || 0) > 0) {
            return new Promise<R>((resolve) => {
                setTimeout(() => {
                    resolve(result)
                }, mockDelay)
            })
        }

        return result
    }
}