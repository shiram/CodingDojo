

/**
 * @name UrlUtilsInterface
 * @description
 * Interface to be implemented
 */
export interface UrlUtilsInterface {
    getFullUrlwithParams(baseUrl: string, params: { [key: string]: number | string }): string
}

export const UrlUtils: UrlUtilsInterface = {
    /**
     * 
     * @name getFullUrlwithParams
     * @description Returns the full formated url for an API end-point
     * by replacing parameters placeholder with actual values
     * @param baseUrl The base API endpoint with the params like {projectId}
     * @param params The object containing the actual values for the params
     * @returns The fully formatted API end-point url with the actual parameter values
     */
    getFullUrlwithParams: function (baseUrl: string, params: { [key: string]: string | number }): string
    {
        const keys: string[] = Object.keys(params || {})
        if ((baseUrl || '').indexOf('[') === -1 || keys.length === 0) {
            return baseUrl
        }
        let fullUrl = baseUrl
        keys.forEach((key) => {
            fullUrl = fullUrl.replace(`[${key}]`, params[key] as string)
        })
        return fullUrl
    }
}