import { render, fireEvent, prettyDOM } from "@testing-library/react";
import { ItemInterface } from "@/models/items/items.interface";
import { ItemComponent } from "./Item.Component";
import {vitest } from "vitest";

describe('Item.component: behavior', () => {
    
    it('invokes onItemSelect handler when clicked', () => {
        const testid = "unit-test-item"
        const modal: ItemInterface = {
            id: 1,
            name: 'Unit test item 1',
            selected: false
        }
        //spy function
        const onItemSelect = vitest.fn()

        const { container } = render(<ItemComponent id={1} testid={testid} model={modal} onItemSelect={onItemSelect} />)
        const liElement = container.firstChild as HTMLElement
        expect(liElement).not.toBeNull()
        fireEvent.click(liElement)
        expect(onItemSelect).toHaveBeenCalledTimes(1)
        expect(onItemSelect).toHaveBeenCalledWith(modal)
    })
})