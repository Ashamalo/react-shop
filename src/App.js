// import logo from './logo.svg';
import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';
import './App.css';

const arr = [
  { title: 'Чоловічі кросівки Nike Blazer Mid Suede', price: 4999, imageUrl: '/img/goods/1.jpg' },
  { title: 'Чоловічі кросівки Nike Air Max 270', price: 6499, imageUrl: '/img/goods/2.jpg' },
  { title: 'Чоловічі кросівки Nike Blazer Classic', price: 4599, imageUrl: '/img/goods/3.jpg' },
  { title: 'Чоловічі кросівки Puma X Aka Boku Future Rider', price: 7299, imageUrl: '/img/goods/4.jpg' },
];

function App() {
  return (
    // кошик з боку
    <div className="wrapper clear">

      <Drawer />
      <Header />

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

            {arr.map((obj) => (
              <Card title={obj.title} price={obj.price} imageUrl={obj.imageUrl} />
            ))}

          </div>

        </div>
      </main>

    </div>
  );
}

export default App;
