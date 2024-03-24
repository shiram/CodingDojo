import React from "react";
import { ItemInterface } from "../../models/items/items.interface";
import { ItemComponent } from "./Item.Component";
import { Loader } from "../shared/Loader.component";


type Props = {
    loading: boolean,
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
        const { loading, items } = this.props
        let element
        if(loading)
        {
            element = <Loader/>
        } 
        else
        {
            element = <ul>
                {
                    items.map((item, index) => <ItemComponent key={item.id} id={index} testid={`item-${item.id}`} model={item} onItemSelect={this.props.onItemSelect}/>)
                }
            </ul>
        }
        return element
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