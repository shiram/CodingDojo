import React from "react";

import { ItemInterface } from "../../models/items/items.interface";

type Props = {
    id: number
    testid: string
    model: ItemInterface
    onItemSelect: (item: ItemInterface) => void
}

export class ItemComponent extends React.Component<Props> {

    constructor(props : Props){
        super(props)
    }

    get cssClass() {
        let css = 'item'
        if (this.props.model?.selected) {
            css += ' selected'
        }
        return css.trim()
    }

    handleItemClick(item : ItemInterface) {
        this.props.onItemSelect(item)
    }

    render(): React.ReactNode {
        const { model } = this.props
        const testid = this.props.testid || 'not-set'
        const ItemId = this.props.id

        return (
            <li key={ItemId} data-testid={testid} className={this.cssClass} onClick={() => this.handleItemClick(model)}>
                <div className="selected-indicator">*</div>
                <div className="name">{model.name}</div>
            </li>
        );
    }
}