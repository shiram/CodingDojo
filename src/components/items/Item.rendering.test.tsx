import { render, screen, prettyDOM } from "@testing-library/react";
import { ItemInterface } from "../../models/items/items.interface";
import { ItemComponent } from "./Item.Component";

describe('Item.component: rendering', () => {
    it('renders an Item correctly', () => {
        const testid = "unit-test-item"
        const modal: ItemInterface = {
            id: 1,
            name: 'Unit test item 1',
            selected: false
        }

        render(<ItemComponent id={1} testid={testid} model={modal} onItemSelect={() => {}} />)
        const liElement = screen.getByTestId(testid)
        expect(liElement).not.toBeNull()
        const children = liElement.children
        expect(children).toHaveLength(2)
        expect(children.item(1)?.innerHTML).toContain('Unit test item 1')
    })

    it('renders an Item indicator correctly', () => {
        const testid = "unit-test-item"
        const modal: ItemInterface = {
            id: 2,
            name: 'Unit test item 2',
            selected: true
        }

        render(<ItemComponent id={modal.id} testid={testid} model={modal} onItemSelect={() => {}} />)
        const liElement = screen.getByTestId(testid)
        expect(liElement).not.toBeNull()
        const children = liElement.children
        expect(children).toHaveLength(2)
        expect(children.item(0)?.innerHTML).toContain('*')
    })

    it('has expected css class when selected is true', () => {
        const testid = "unit-test-item"
        const modal: ItemInterface = {
            id: 3,
            name: 'Unit test item 3',
            selected: true
        }

        render(<ItemComponent id={modal.id} testid={testid} model={modal} onItemSelect={() => {}} />)
        const liElement = screen.getByTestId(testid)
        expect(liElement).not.toBeNull()
        expect(liElement.className).toContain('selected')
    })

    it('has expected css class when selected is false', () => {
        const testid = "unit-test-item"
        const modal: ItemInterface = {
            id: 4,
            name: 'Unit test item 4',
            selected: false
        }

        render(<ItemComponent id={modal.id} testid={testid} model={modal} onItemSelect={() => {}} />)
        const liElement = screen.getByTestId(testid)
        expect(liElement).not.toBeNull()
        expect(liElement.className).not.toContain('selected')
    })
})