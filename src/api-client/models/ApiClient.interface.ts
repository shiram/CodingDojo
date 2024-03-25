import { ItemsApiClientInterface } from './items'

/**
 * @name ApiClientInterface
 * @description
 * Interface wraps all api client modules into one place for keeping code organised
 */

export interface ApiClientInterface {
    items: ItemsApiClientInterface
}