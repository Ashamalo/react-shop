// import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="wrapper clear">

      <header className="d-flex justify-between align-center">

        <div className="d-flex align-center">
          <img width={40} height={40} src="/img/logo.svg" alt='logo' />
          <div>
            <h3>Airfit sneakers</h3>
            <p className='header-title'>Магазин найкращіх кросівок</p>
          </div>
        </div>

        <ul className="d-flex">
          <li>
            <img width={18} height={18} src="/img/cart.svg" alt='cart' />
            <span>1205 грн.</span>
          </li>
          <li>
            <img width={18} height={18} src="/img/user.svg" alt='user' />
          </li>
        </ul>

      </header>

      <main>
        <div className="content">
          <h1>Усі кросівки</h1>

          <div className='goods'>

            <div className="card">
              <img width={133} height={112} src="/img/goods/1.jpg" alt="sneakers" />
              <h5>Чоловічі кросівки Nike Blazer Mid Suede</h5>
              <div className='d-flex justify-between align-center'>
                <div className='d-flex flex-column'>
                  <span>Ціна: </span>
                  <b>4999 грн.</b>
                </div>
                <button className='button'><img width={11} height={11} src="/img/add-to-cart.svg" alt='plus' /></button>
              </div>
            </div>

            <div className="card">
              <img width={133} height={112} src="/img/goods/2.jpg" alt="sneakers" />
              <h5>Чоловічі кросівки Nike Blazer Mid Suede</h5>
              <div className='d-flex justify-between align-center'>
                <div className='d-flex flex-column'>
                  <span>Ціна: </span>
                  <b>4999 грн.</b>
                </div>
                <button className='button'><img width={11} height={11} src="/img/add-to-cart.svg" alt='plus' /></button>
              </div>
            </div>

            <div className="card">
              <img width={133} height={112} src="/img/goods/3.jpg" alt="sneakers" />
              <h5>Чоловічі кросівки Nike Blazer Mid Suede</h5>
              <div className='d-flex justify-between align-center'>
                <div className='d-flex flex-column'>
                  <span>Ціна: </span>
                  <b>4999 грн.</b>
                </div>
                <button className='button'><img width={11} height={11} src="/img/add-to-cart.svg" alt='plus' /></button>
              </div>
            </div>

            <div className="card">
              <img width={133} height={112} src="/img/goods/4.jpg" alt="sneakers" />
              <h5>Чоловічі кросівки Nike Blazer Mid Suede</h5>
              <div className='d-flex justify-between align-center'>
                <div className='d-flex flex-column'>
                  <span>Ціна: </span>
                  <b>4999 грн.</b>
                </div>
                <button className='button'><img width={11} height={11} src="/img/add-to-cart.svg" alt='plus' /></button>
              </div>
            </div>

            <div className="card">
              <img width={133} height={112} src="/img/goods/5.jpg" alt="sneakers" />
              <h5>Чоловічі кросівки Nike Blazer Mid Suede</h5>
              <div className='d-flex justify-between align-center'>
                <div className='d-flex flex-column'>
                  <span>Ціна: </span>
                  <b>4999 грн.</b>
                </div>
                <button className='button'><img width={11} height={11} src="/img/add-to-cart.svg" alt='plus' /></button>
              </div>
            </div>

            <div className="card">
              <img width={133} height={112} src="/img/goods/6.jpg" alt="sneakers" />
              <h5>Чоловічі кросівки Nike Blazer Mid Suede</h5>
              <div className='d-flex justify-between align-center'>
                <div className='d-flex flex-column'>
                  <span>Ціна: </span>
                  <b>4999 грн.</b>
                </div>
                <button className='button'><img width={11} height={11} src="/img/add-to-cart.svg" alt='plus' /></button>
              </div>
            </div>

            <div className="card">
              <img width={133} height={112} src="/img/goods/7.jpg" alt="sneakers" />
              <h5>Чоловічі кросівки Nike Blazer Mid Suede</h5>
              <div className='d-flex justify-between align-center'>
                <div className='d-flex flex-column'>
                  <span>Ціна: </span>
                  <b>4999 грн.</b>
                </div>
                <button className='button'><img width={11} height={11} src="/img/add-to-cart.svg" alt='plus' /></button>
              </div>
            </div>

            <div className="card">
              <img width={133} height={112} src="/img/goods/8.jpg" alt="sneakers" />
              <h5>Чоловічі кросівки Nike Blazer Mid Suede</h5>
              <div className='d-flex justify-between align-center'>
                <div className='d-flex flex-column'>
                  <span>Ціна: </span>
                  <b>4999 грн.</b>
                </div>
                <button className='button'><img width={11} height={11} src="/img/add-to-cart.svg" alt='plus' /></button>
              </div>
            </div>
          </div>

        </div>
      </main>

    </div>
  );
}

export default App;
