import { configureStore } from "@reduxjs/toolkit";
import { UseDispatch, useDispatch } from "react-redux";
import { RootStoreInterface } from "./models";
import { itemsStoreSlice, useItemsActions, useItemsGetters } from "../items";

//configure root redux store for the whole App
//this will be consumed by App.tsx
export const rootStore = configureStore({
    reducer: {
        itemsState: itemsStoreSlice.reducer
    }
})

//infer the RootStateInterfade type from the store itself (rootStore.getState)
//thus avoiding to explicitly having to create an additiona interface for the
export type RootStateInterfade = ReturnType<typeof rootStore.getState>

export function useAppStore(): RootStoreInterface {
    const commit = useDispatch()
    return {
        itemsStore: {
            actions: useItemsActions(commit),
            getters: useItemsGetters()
        },
        //other store modules will be added here
    }
}

type IAppState = ReturnType<typeof rootStore.getState>

/**
 * @name getAppState
 * @description
 * Returns a snapshot of the current app state (not-relative)
 * This will be usedmainly across store modules
 * In components we'll use getters, not this
 * @returns
 */
export function getAppState(): IAppState {
    const appState = rootStore.getState()
    return {
        ...appState
    }
}