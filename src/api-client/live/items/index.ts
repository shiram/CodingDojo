import { ItemsApiClientOptions, ItemsApiClientInterface, ItemsApiClientModel } from "../../models/items";

const options: ItemsApiClientOptions = {
    endpoints: {
        fetchItems: '/static/mock-data/items/items.prod.json' //replace with real api endpoint
    }
}

const itemsApiClient: ItemsApiClientInterface = new ItemsApiClientModel(options)

export {
    itemsApiClient
}