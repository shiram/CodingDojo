import { HttpRequestParamsInterface } from "./HtppRequestParams.interface";

/**
 * @name HttpClientConfigInterface
 * @description
 * We'll drive the HttpClient class with this configuration object.
 */
export interface HttpClientConfigInterface {
    tokenKey: string
    clientType: string
}

/**
 * @name HttpClientInterface
 * @description
 * Represents our HttpClient class interface.
 */
export interface HttpClientInterface {
    /**
     * @name request
     * @description 
     * A method that executes different types of http requests (i.e GET/POST/ect)
     * based on the parameters argument.
     * The type R specify the type of the response data.
     * The type P specify the type of payload if any
     * @returns A Promise<R> as the implementation of this method is async
     */
    request<R, P = Object>(parameters: HttpRequestParamsInterface<P>): Promise<R>
}