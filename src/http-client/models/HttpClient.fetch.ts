import { HttpRequestParamsInterface } from "./HtppRequestParams.interface";
import { HttpClientInterface, HttpClientConfigInterface } from "./HttpClient.interface";
import { HttpRequestType, HttpRequestmethods, HttpContentTypes } from "./Constants";
import { UrlUtils } from "./UrlUtils";

/**
 * @name HttpClientFetch
 * @description
 * wraps the http client functionality to avoid directly using fetch
 * and simplify replacement in the future if such npm package would stop being used
 */
export class HttpClientFetch implements HttpClientInterface {

    constructor() {
        //Optional: add request interceptor to handle errors or other things for each request in one place
    }
    /**
     * @name request
     * @description
     * A method that executes different types of http requests(i.e GET/POST)
     * based on parameters arguments
     * The type R specify the return type of results
     * The type P specify the type of payload if any
     * @returns A promise <R> as the implementation of this method will be async
     */

    async request<R, P = void>(parameters: HttpRequestParamsInterface<P>): Promise<R> {
        const { requestType, endpoint, requiresToken, payload, headers, mockDelay } = parameters

        const fullUrl = UrlUtils.getFullUrlwithParams(endpoint, payload as any)
        console.log('HttpClientFecth: fullUrl:', fullUrl, payload)

        //set fetch options
        const options: RequestInit = {
            credentials: 'include',
            redirect: 'follow',
            headers: {}
        }

        if (headers) {
            options.headers = {
                ...headers
            }
        }

        if (!options.headers?.hasOwnProperty('Content-Type')) {
            //default to content - type json
            options.headers = {
                ...headers,
                'Content-Type': HttpContentTypes.applicationJson
            }
        }

        //set authorization headers
        if (requiresToken && options.headers) {
            //optional: you could add here to set the AUthorization header with a bearer token.
            //options.headers.Authorization = `bearer ${JwtHelpers.getJwtToken() }`
        }
        
        let result!: R

        //helpre for checking if response is being redirected(302) in fetch
        const checkRedirect = async (resp: any) => {
            if(resp.redirected) {
                //if so redirect to the response url
                document.location = resp.url
                return true
            }
            return false
        }

        try {
            switch(requestType) {
                //implemet a case statement for each request type
                case HttpRequestType.get: {
                    options.method = HttpRequestmethods.get
                    const response = (await fetch(fullUrl, options)) as any
                    const redirected = await checkRedirect(response)
                    if (!redirected){
                        result = (await response.json()) as R
                    }
                    break
                }
                case HttpRequestType.post: {
                    options.method = HttpRequestmethods.post
                    options.body = typeof payload === 'string' ? payload : JSON.stringify(payload)
                    const response = (await fetch(fullUrl, options)) as any
                    const redirected = await checkRedirect(response)
                    if(!redirected) {
                        result = (await response.json()) as R
                    }
                    break
                }
                case HttpRequestType.put: {
                    options.method = HttpRequestmethods.put
                    options.body = typeof payload === 'string' ? payload : JSON.stringify(payload)
                    const response = (await fetch(fullUrl, options)) as any
                    const redirected = await checkRedirect(response)
                    if(!redirected) {
                        result = (await response.json()) as R
                    }
                    break
                }
                case HttpRequestType.delete: {
                    options.method = HttpRequestmethods.delete
                    const response = (await fetch(fullUrl, options)) as any
                    const redirected = await checkRedirect(response)
                    if(!redirected) {
                        result = (await response.json()) as R
                    }
                    break
                }
                case HttpRequestType.patch: {
                    options.method = HttpRequestmethods.patch
                    options.body = typeof payload === 'string' ? payload : JSON.stringify(payload)
                    const response = (await fetch(fullUrl, options)) as any
                    const redirected = await checkRedirect(response)
                    if(!redirected) {
                        result = (await response.json()) as R
                    }
                    break
                }
                default: {
                    console.warn('HttpClientFetch: invalid requestType argument or request type not implemented')
                }
            }
        }catch(e) {
            throw Error('HttpClientFetch: exception')
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