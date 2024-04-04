import { HttpRequestType } from "./Constants";

/**
 * @name HttpRequestParamsInterface
 * @description
 * Interface represents an object we'll use to pass arguments into our HttpClient request method.
 * This allows us to pass in the URL, request type, and any other options we may need.
 */

export interface HttpRequestParamsInterface<P = Object> {
    requestType: HttpRequestType
    endpoint: string
    requiresToken: boolean
    headers?: { [key: string]: string }
    payload?: P
    mockDelay?: number
}