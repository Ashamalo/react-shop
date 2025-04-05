// import logo from './logo.svg';
import React from 'react';
import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';
import './App.css';

function App() {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([ 
  //   {
  //   "title": "Чоловічі кросівки Nike Blazer Mid Suede",
  //   "price": 4999,
  //   "imageUrl": "/img/goods/1.jpg"
  // },
  // {
  //   "title": "Чоловічі кросівки Nike Air Max 270",
  //   "price": 6499,
  //   "imageUrl": "/img/goods/2.jpg"
  // }
])
  const [cartOpened, setCartOpened] = React.useState(false);

  //запит на отримання items на бекенді 
  // React.useEffect(() => {
  //   fetch('https://67c1c9a361d8935867e44681.mockapi.io/items').then(res => {
  //     return res.json();
  //   })
  //   .then((json) => {
  //     setItems(json);
  //   })
  // })

  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  React.useEffect(() => {
    let isMounted = true; // Прапорець для запобігання стану "memory leak"
    
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Додаємо невелику затримку для запобігання spam-запитам
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const response = await fetch('https://67c1c9a361d8935867e44681.mockapi.io/items');
        
        if (!response.ok) {
          throw new Error(`HTTP помилка! Статус: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (isMounted) {
          setItems(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          console.error('Помилка при завантаженні даних:', err);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();
        // Функція очищення ефекту
        return () => {
          isMounted = false;
        };
      }, []); // Порожній масив залежностей - запит тільки при монтажі
    
      // Відображення стану завантаження
      if (isLoading) {
        return (
          <div className="loading">
            <p>Завантаження даних...</p>
            {/* Можна додати спінер або анімацію */}
          </div>
        );
      }
    
      // Відображення помилки
      if (error) {
        return (
          <div className="error">
            <p>Не вдалося завантажити дані: {error}</p>
            <button onClick={() => window.location.reload()}>Спробувати знову</button>
          </div>
        );
      }




  // const onAddToCart = (obj) => {
  //   setCartItems(prev => [...prev, obj]);
  // }
  // console.log(cartItems);
    const onAddToCart = (obj, isAdded) => {
    if (isAdded) {
      // Видаляємо елемент з корзини, якщо він уже там є
      setCartItems(prev => prev.filter(item => item.title !== obj.title));
    } else {
      // Додаємо елемент до корзини, якщо його там ще немає
      setCartItems(prev => [...prev, obj]);
    }
  }


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

            {items.map((item) => (
               <Card 
               key={item.id} // Додайте унікальний key для кожного елемента
               title={item.title} 
               price={item.price} 
               imageUrl={item.imageUrl} 
               onClickFavorite={() => console.log('Додали до улюбленого')} 
               onClickPlus={(obj, isAdded) => onAddToCart(obj, isAdded)}
             />
            ))}

          </div>

        </div>
      </main>

    </div>
  );
}

export default App;
