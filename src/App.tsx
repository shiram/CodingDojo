import { useState } from 'react'
import './App.css'
import { ItemsListComponent } from './components/items/ItemsList.component'
import { ItemInterface } from './models/items/items.interface'

function App() {
  const [count, setCount] = useState(0)

  const [items, setItems] = useState<ItemInterface[]>([
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
  ])

  const onItemSelect = (item: ItemInterface) => {
    const updatedItems = items.map(i => {
      if (i.id === item.id) {
        console.log(i)
        return {...i, selected: !i.selected}
      }
      return i
    
    })
    setItems(updatedItems)
    console.log('App tsx: onItemSelect', item.id, item.name, item.selected, updatedItems)
  }

  return (
    <>
      <div>
        <ItemsListComponent items={items} onItemSelect={onItemSelect}/>
      </div>
    </>
  )
}

export default App
