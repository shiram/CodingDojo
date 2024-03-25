import { useState } from 'react'
import { Provider } from 'react-redux'
import { rootStore } from './stores'
import './App.css'
import { ItemInterface } from './models/items/items.interface'
import ItemsView from './views/Items.view'

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
      <Provider store={rootStore}>
        <div className='App'>
          <ItemsView />
        </div>
      </Provider>
    </>
  )
}

export default App
