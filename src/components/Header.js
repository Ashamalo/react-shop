import React from 'react';
import { Link } from 'react-router-dom';
// import AppContext from '../context';
import { useCart } from '../hooks/useCart';

function Header(props) {
    const { totalPrice } = useCart();
    // const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);

    return (
        <header className="d-flex justify-between align-center">
            <Link to="/">
                <div className="d-flex align-center">
                
                <img width={40} height={40} src="/img/logo.svg" alt='logo' />
                <div>
                    <h3>Airfit sneakers</h3>
                    <p className='header-title'>Магазин найкращіх кросівок</p>
                </div>
            </div>
            </Link>
            

            <ul className="d-flex">
                <li onClick={props.onClickCart} className="cart-img">
                    <img width={18} height={18} src="/img/cart.svg" alt='Кошик' />
                    <span>{totalPrice} грн.</span>
                </li>
                <li className="cart-img"> 
                    <Link to ="/favorites">
                        <img width={18} height={18} src="/img/heart.svg" alt='Закладки' />
                    </Link>
                </li>
                <li className="cart-img"> 
                    <Link to ="/orders">
                        <img width={18} height={18} src="/img/user.svg" alt='Користувач' />
                    </Link>
                </li>
            </ul>

        </header>
    );
}

export default Header;