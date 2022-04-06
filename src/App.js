import { useState, useEffect } from 'react';
import axios from 'axios'
import Header from './components/Header';
import Drawer from './components/Drawer/Drawer';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import AppContext from './context.js';
import Orders from './pages/Orders';

function App() {

  const [items, setItems] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [cartItems, setCartItems] = useState([])
  const [cartOpened, setCartOpened] = useState(false)
  const [favorites, setFavorites] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
          axios.get('https://6249a8a6852fe6ebf87e0a0f.mockapi.io/cart'),
          axios.get('https://6249a8a6852fe6ebf87e0a0f.mockapi.io/favorites'),
          axios.get('https://6249a8a6852fe6ebf87e0a0f.mockapi.io/items')
        ])

        setIsLoading(false)

        setCartItems(cartResponse.data)
        setFavorites(favoritesResponse.data)
        setItems(itemsResponse.data)

      } catch (error) {
        alert('Ошибка при запросе данных ;(')
        console.error(error)
      }
    }
    fetchData()
  }, [])

  const handleOnClickBasket = () => {
    setCartOpened(!cartOpened)
  }

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id))
      if (findItem) {
        setCartItems((prev) => prev.filter(item => Number(item.parentId) !== Number(obj.id)))
        await axios.delete(`https://6249a8a6852fe6ebf87e0a0f.mockapi.io/cart/${findItem.id}`)
      } else {
        setCartItems((prev) => [...prev, obj])
        const { data } = await axios.post('https://6249a8a6852fe6ebf87e0a0f.mockapi.io/cart', obj)
        setCartItems((prev) => prev.map((item) => {
          if (item.parentId === data.parentId) {
            return {
              ...item,
              id: data.id
            }
          }
          return item
        }))
      }
    } catch (error) {
      alert("Ошибка при добавлении в корзину!")
      console.error(error)
    }

  }

  const onRemoveToCart = (id) => {
    try {
      axios.delete(`https://6249a8a6852fe6ebf87e0a0f.mockapi.io/cart/${id}`)
      setCartItems((prev) => prev.filter(item => Number(item.id) !== Number(id)))
    } catch (error) {
      alert("Ошибка при удалении из корзины!")
      console.error(error)
    }
  }

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://6249a8a6852fe6ebf87e0a0f.mockapi.io/favorites/${obj.id}`)
        setFavorites((prev) => prev.filter(item => Number(item.id) !== Number(obj.id)))
      } else {
        const { data } = await axios.post('https://6249a8a6852fe6ebf87e0a0f.mockapi.io/favorites', obj)
        setFavorites((prev) => [...prev, data])
      }
    } catch (error) {
      alert('Не удалось добавить в избранное!!')
    }
  }

  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value)
  }

  const onClearSearchValue = () => {
    setSearchValue('')
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id))
  }

  return (
    <AppContext.Provider value={{
      items,
      cartItems,
      favorites,
      isItemAdded,
      onAddToFavorite,
      setCartOpened,
      setCartItems,
      onAddToCart
    }}>
      <div className="wrapper clear">
        {cartOpened &&
          <Drawer
            items={cartItems}
            onClickClose={handleOnClickBasket}
            onRemove={onRemoveToCart}
            opened={cartOpened} 
          />}
        <Header onClickBasket={handleOnClickBasket} />
        <Routes>
          <Route path="/" element={<Home
            items={items}
            cartItems={cartItems}
            searchValue={searchValue}
            onClearSearchValue={onClearSearchValue}
            onChangeSearchInput={onChangeSearchInput}
            onAddToCart={onAddToCart}
            onAddToFavorite={onAddToFavorite}
            isLoading={isLoading}
          />}
          />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/orders" element={<Orders />}
          />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
