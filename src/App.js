// import logo from './logo.svg';
import React from 'react';

import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Header from './components/Header';
import Drawer from './components/Drawer/index';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import AppContext from './context';
import Orders from './pages/Orders';
import Footer from './components/Footer';
import Contacts from './pages/Contacts';
import PrivacyPolicy from './pages/PrivacyPolicy';

function App() {
  const [items, setItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartItems, setCartItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [favorites, setFavorites] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);


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
        alert('Помилка при запиті даних ;(');
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
      if (findItem) {
        setCartItems(prev => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`https://67c1c9a361d8935867e44681.mockapi.io/cart/${findItem.id}`);
        
      } else {
        const { data } = await axios.post('https://67c1c9a361d8935867e44681.mockapi.io/cart', obj);
        setCartItems((prev) => [...prev, data]);
        
        setCartItems((prev) => prev.map(item => {
          if (item.parentId === data.parentId) {
            return {
              ...item,
              id: data.id
            };
          }
          return item;
        }));
        
      }
    }
    catch (error) {
      alert('Не вдалося додати товар у кошик')
      console.error(error);
    }
  }

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://67c1c9a361d8935867e44681.mockapi.io/cart/${id}`);
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
    } catch (error) {
      alert('Помилка при видаленні з кошику');
      console.error(error);
    }

};
 
  const onAddToFavorite = async (obj) => {
    try {
          if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
            axios.delete(`https://67c1c9a361d8935867e44681.mockapi.io/favorites/${obj.id}`);
            setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
          } else {
            const { data } = await axios.post('https://67c1c9a361d8935867e44681.mockapi.io/favorites', obj);
              setFavorites((prev) => [...prev, data]);
          } 
    }
    catch (error) {
      alert('Не вдалось додати у закладинки')
      console.error(error);
    }

  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  }
  
  return (
    <AppContext.Provider value={{
      items,
      cartItems,
      favorites,
      isItemAdded,
      onAddToFavorite,
      onAddToCart,
      setCartOpened,
      setCartItems
    }}>
      <div className="wrapper clear">
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
          opened={cartOpened} />
        
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
        
        <Routes>
        <Route 
          path="/orders" 
          element={
            <Orders />
          } 
        />
        </Routes>

        <Routes>
        <Route 
            path="/contacts"
            element={<Contacts />} />
          <Route
            path="/privacy-policy"
            element={<PrivacyPolicy />} />  

        </Routes>
        
      <Footer />
      </div>
      
    </AppContext.Provider>
    
  );
}

export default App;