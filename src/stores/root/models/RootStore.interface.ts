import { ItemsStoreInterface } from "@/stores/items";

/**
 * @name RootStoreInterface
 * @description Interface represents our root state manager (store)
 */

export interface RootStoreInterface {
    itemsStore: ItemsStoreInterface
}