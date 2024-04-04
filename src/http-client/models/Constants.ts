/**
 * @name HttpRequestType
 * @description Enum for HTTP request types
 */

export const enum HttpRequestType {
    get,
    post,
    put,
    delete,
    patch
}

/**
 * @name HttpContentTypes
 * @description
 * http content types
 */
export const HttpContentTypes = Object.freeze({
    applicationJson: 'application/json',
    formUrlEncoded: 'application/x-www-form-urlencoded;charset=UTF-8'
})

export const HttpRequestmethods = Object.freeze({
    get: 'GET',
    post: 'POST',
    put: 'PUT',
    delete: 'DELETE',
    patch: 'PATCH'
})