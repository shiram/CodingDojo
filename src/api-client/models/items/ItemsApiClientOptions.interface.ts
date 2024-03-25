/**
 * @name ItemsApiClientEndpoints
 * @description 
 * Interface for the Items urls used to avoid hard-coded strings
 */
export interface ItemsApiClientEndpoints {
    fetchItems: string
}

/**
 * @name ItemsApiClientOptions
 * @description
 * Iterface for the Items api client options (includes endpoints used to avoid hard-coded strings)
 */
export interface ItemsApiClientOptions {
    mockDelay?: number
    endpoints: ItemsApiClientEndpoints
}