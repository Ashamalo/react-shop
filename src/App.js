// import logo from './logo.svg';
import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';
import './App.css';

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
            <Card />
            <Card />
            <Card />
            <Card />
          </div>

        </div>
      </main>

    </div>
  );
}

export default App;
