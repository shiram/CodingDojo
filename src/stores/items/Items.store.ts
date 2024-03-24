import { UseSelector, useSelector } from "react-redux";
import { Dispatch } from "react";
import { ItemInterface } from "@/models/items/items.interface";
import { itemsStoreSlice } from "./items.slice";
import { RootStateInterfade } from "../root/Root.store";

/**
 *  @name useItemsActions
 *  @description 
 *  Actions hook that allows us to invoke the Items store actions from our components
 */

export function useItemsActions(commit: Dispatch<any>) {
    //get a reference to our slice actions (which are really our mutations/commits)
    const mutations = itemsStoreSlice.actions
    //our items store actions implementation
    const actions = {
        loadItems: async () => {
            //set loading to true
            commit(mutations.setLoading(true))

            //mock some data
            const mockItems: ItemInterface[] = [
                {
                    id: 1,
                    name: 'Item one',
                    selected: true
                  },
                  {
                    id: 2,
                    name: 'Item 2',
                    selected: false
                  },
                  {
                    id: 3,
                    name: 'Item 3',
                    selected: false
                  },
                  {
                    id: 4,
                    name: 'Item 4',
                    selected: false
                  },
                  {
                    id: 5,
                    name: 'Item 5',
                    selected: false
                  },
                  {
                    id: 6,
                    name: 'Item 6',
                    selected: false
                  }
            ]

            //lets say we called an API end-point
            //takes 3 seconds to return data
            //using javascript setTimeout with 3000 for millisecond option
            setTimeout(() => {
                commit(mutations.setItems(mockItems))
            }, 3000)
        },
        toggleItemSelected: async (item: ItemInterface) => {
            console.log('ItemsStore: action: toggleItemSelected', item)
            commit(mutations.setItemSelected(item))
        }
    }

    return actions
}

//hook allows us to consume read-only state propertoes from our components
export function useItemsGetters() {
    //return our store getters
    return {
        loading: useSelector((s: RootStateInterfade) => s.itemsState.loading),
        items: useSelector((s: RootStateInterfade) => s.itemsState.items)
    }
}

/**
 *  @name ItemsStoreInterface
 *  @description Interface reprsents our Items store module
 */
export interface ItemsStoreInterface {
    actions: ReturnType<typeof useItemsActions> //use TS type inference
    getters: ReturnType<typeof useItemsGetters> //use TS type inference
}