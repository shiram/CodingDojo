import { ItemInterface } from "@/models/items/items.interface";

/**
 * @name ItemsStateInterface
 * @description Interface reprsents our Items Store
 */

export interface ItemsStateInterface {
    loading: boolean
    items: ItemInterface[]
}