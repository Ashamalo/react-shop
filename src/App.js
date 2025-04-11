// import logo from './logo.svg';
import React from 'react';
// eslint-disable-next-line no-unused-vars
import { Routes, Route, data } from 'react-router-dom';
import axios from 'axios';

import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import './App.css';

function App() {
  const [items, setItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState(''); //реалізація поля пошуку товару
  const [cartItems, setCartItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [favorites, setFavorites] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const cartResponse = await axios.get('https://67c1c9a361d8935867e44681.mockapi.io/cart');
      const favoritesResponse = await axios.get('https://67c1c9a361d8935867e44681.mockapi.io/favorites');
      const itemsResponse = await axios.get('https://67c1c9a361d8935867e44681.mockapi.io/items');

      setIsLoading(false);
    
      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data); // Виправлено - передаємо тільки дані
    }

  fetchData(); // Викликаємо функцію один раз при монтуванні
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
          if (favorites.find((favObj) => favObj.id === obj.id)) {
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
  
  return (
    // кошик з боку 
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
            <Favorites items={favorites} onAddToFavorite={onAddToFavorite} />
          } 
        />
      </Routes>

      <main>
        {/* <div className="content p-40">
          <div className="d-flex align-center mb-40 justify-between">
            <h1>{searchValue ? `Пошук по запиту: "${searchValue}"` : 'Усі кросівки'}</h1> 
            
            <div className="search-block">
              <img src="/img/search.svg" alt="search" /> 
              {searchValue && (
                <img 
                onClick={() => setSearchValue('')}
                className="clear cart-item-remove-btn" 
                src="/img/btn-remove.svg" 
                alt="clear" 
                />
                )}
              <input onChange={onChangeSearchInput} value={searchValue} placeholder="Пошук..." />
            </div>
          </div>

          <div className='goods'>

            {items.filter((item) => item.title.toLowerCase().includes(searchValue.toLocaleLowerCase())).map((item, index) => (
               <Card 
               key={index} // Додайте унікальний key для кожного елемента
               id={item.id}
               title={item.title} 
               price={item.price} 
               imageUrl={item.imageUrl}   
               onClickFavorite={(obj) => onAddToFavorite (obj)} 
               onClickPlus={(obj, isAdded) => onAddToCart(obj, isAdded)}
             />
            ))}
            

          </div>

        </div> */}
      </main>

    </div>
  );
}

export default App;

