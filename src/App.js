// import logo from './logo.svg';
import React from 'react';
import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';
import './App.css';

function App() {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [cartOpened, setCartOpened] = React.useState(false);

  //запит на отримання items на бекенді 
  React.useEffect(() => {
    fetch('https://67c1c9a361d8935867e44681.mockapi.io/items').then(res => {
      return res.json();
    })
    .then((json) => {
      setItems(json);
    })
  })


  return (
    // кошик з боку 
    <div className="wrapper clear">

      {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} />}
      <Header onClickCart={() => setCartOpened(true)} />

      <main>
        <div className="content p-40">
          <div className="d-flex align-center mb-40 justify-between">
            <h1>Усі кросівки</h1>
            <div className="search-block">
              <img src="/img/search.svg" alt="search" />
              <input placeholder="Пошук..." />
            </div>
          </div>

          <div className='goods'>

            {items.map((obj) => (
              <Card 
                title={obj.title} 
                price={obj.price} 
                imageUrl={obj.imageUrl} 
                onClickPlus={() => console.log('Додали до кошика')} 
                onClickFavorite={() => console.log('Додали до улюбленого')} 
              />
            ))}

          </div>

        </div>
      </main>

    </div>
  );
}

export default App;
