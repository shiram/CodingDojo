import { useEffect } from "react";
import { ItemInterface } from "@/models/items/items.interface";
import { ItemsListComponent } from "../components/items/ItemsList.component";
import { useAppStore } from "../stores";

function ItemsView() {
    const {
        itemsStore
    } = useAppStore();

    const {
        loading,
        items
    } = itemsStore.getters

    const onItemSelect = (item: ItemInterface) => {
        itemsStore.actions.toggleItemSelected(item)
    }

    //use React useEffects to invoke our itemsStore loadItems action only once after it has components rendered
    useEffect(() => {
        itemsStore.actions.loadItems()
    }, [])

    return (
        <div>
            <ItemsListComponent loading={loading} items={items} onItemSelect={onItemSelect} />
        </div>
    )
}

export default ItemsView