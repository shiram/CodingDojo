import React from "react";
import { ItemInterface } from "../../models/items/items.interface";
import { ItemComponent } from "./Item.Component";


type Props = {
    items: ItemInterface[],
    onItemSelect: (item: ItemInterface) => void
}

/*Using a class to define component */
export class ItemsListComponent extends React.Component<Props> {

    constructor(props : Props){
        super(props)
    }

    handleItemClick(item : ItemInterface) {
        //item.selected = !item.selected
        //console.log('itemsList handleItemClick', item.id, item.name, item.selected)
        this.props.onItemSelect(item)
    }

    render() {
        return (
            <div>
                <h3>Items:</h3>
                <ul>
                    {
                        //this.props.items.map((item, index) => <li key={index} onClick={() => this.handleItemClick(item)}>{item.name} [{ String(item.selected) }]</li>)
                        this.props.items.map((item, index) => <ItemComponent key={item.id} id={index} testid="mode-one" model={item} onItemSelect={this.props.onItemSelect}/>)
                    }
                </ul>
            </div>
        );
    }
}

/*
/* Using React.FC to define a functional component
export const ItemsListComponent : React.FC<{
    items: any[]
}> = (props) => {
    return (
        <div>
            <h3>Items:</h3>
            <ul>
                {
                    props.items.map((item, index) => <li key={index}>{item.name}</li>)
                }
            </ul>
        </div>
    );
}
*/