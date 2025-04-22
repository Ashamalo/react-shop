// import logo from './logo.svg';
import React from 'react';

import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
// import './App.css';
import AppContext from './context';
// export const AppContext = React.createContext({});

function App() {
  const [items, setItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartItems, setCartItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [favorites, setFavorites] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

//   React.useEffect(() => {
//     async function fetchData() {
//       setIsLoading(true);
//       const cartResponse = await axios.get('https://67c1c9a361d8935867e44681.mockapi.io/cart');
//       const favoritesResponse = await axios.get('https://67c1c9a361d8935867e44681.mockapi.io/favorites');
//       const itemsResponse = await axios.get('https://67c1c9a361d8935867e44681.mockapi.io/items');

//       setIsLoading(false);
    
//       setCartItems(cartResponse.data);
//       setFavorites(favoritesResponse.data);
//       setItems(itemsResponse.data); // Виправлено - передаємо тільки дані
//     }

//   fetchData(); // Викликаємо функцію один раз при монтуванні
// }, []);
  React.useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
          axios.get('https://67c1c9a361d8935867e44681.mockapi.io/cart'),
          axios.get('https://67c1c9a361d8935867e44681.mockapi.io/favorites'),
          axios.get('https://67c1c9a361d8935867e44681.mockapi.io/items'),
        ]);

        setIsLoading(false);
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert('Ошибка при запросе данных ;(');
        console.error(error);
      }
    }

    fetchData();
  }, []);
  //запит на отримання items на бекенді 

  // const onAddToCart = (obj) => {
  // // Додаємо timestamp як тимчасовий id, якщо його немає
  // const itemToAdd = obj.id ? obj : {...obj, id: Date.now()};
  
  // axios.post('https://67c1c9a361d8935867e44681.mockapi.io/cart', itemToAdd)
  //   .then(res => {
  //     setCartItems(prev => [...prev, res.data]); // Використовуємо об'єкт з сервера (де вже буде id)
  //   });
  // };
  function onAddToCart(obj) {
    if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
      axios.delete(`https://67c1c9a361d8935867e44681.mockapi.io/cart/${obj.id}`);
      setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
    } else {
      axios.post('https://67c1c9a361d8935867e44681.mockapi.io/cart', obj);
      setCartItems((prev) => [...prev, obj]);
    }
  }

  const onRemoveItem = (id) => {
  if (!id) {
    console.error('Cannot remove item: id is undefined');
    return;
  }
  axios.delete(`https://67c1c9a361d8935867e44681.mockapi.io/cart/${id}`)
    .then(() => {
      setCartItems((prev) => prev.filter(item => item.id !== id));
    })
    .catch(error => {
      console.error('Error removing item:', error);
    });
};
 
  const onAddToFavorite = async (obj) => {
    try {
          if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
            axios.delete(`https://67c1c9a361d8935867e44681.mockapi.io/favorites/${obj.id}`);
            setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
          } else {
            const { data } = await axios.post('https://67c1c9a361d8935867e44681.mockapi.io/favorites', obj);
              setFavorites((prev) => [...prev, data]);
          } 
    }
    catch (error) {
      alert('Не вдалось додати у закладинки')
    }

  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id));
  }
  
  return (
    <AppContext.Provider value={{items, cartItems, favorites, isItemAdded, onAddToFavorite, setCartOpened, setCartItems}}>
      <div className="wrapper clear">

      {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />}
      <Header onClickCart={() => setCartOpened(true)} />
      
      <Routes>
        <Route 
          path="/" 
          element={
            <Home
              items={items}
              cartItems={cartItems}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
              isLoading={isLoading}
            />
          } 
        />
      </Routes>
      
      <Routes>
        <Route 
          path="/favorites" 
          element={
            <Favorites onAddToFavorite={onAddToFavorite} />
          } 
        />
      </Routes>

    </div>
    </AppContext.Provider>
    
  );
}

export default App;

