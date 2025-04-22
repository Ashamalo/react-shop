import React from "react";
import axios from "axios";
import AppContext from "../context";
import Info from "./Info";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onClose, onRemove, items = [] }) {
    const { cartItems, setCartItems } = React.useContext(AppContext);
    const [orderId, setOrderId] = React.useState(null);
    const [isOrderComplete, setIsOrderComplete] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const onClickOrder = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.post('https://67c1c9a361d8935867e44681.mockapi.io/orders', {
                items: cartItems,
            });
            
            setOrderId(data.id);
            setIsOrderComplete(true);
            setCartItems([]);
           
            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete('https://67c1c9a361d8935867e44681.mockapi.io/cart' + item.id);
                await delay(1000);
            }

        } catch (error) {
            alert('Не вдалося створити замовлення :(');
        }
        setIsLoading(false);
    };


    return (
        <div className='overlay'>
            <div className='drawer'>
                <h2 className="d-flex justify-between">Кошик 
                    <img onClick={onClose} className="cart-item-remove-btn" src="/img/btn-remove.svg" alt="remove" />
                </h2>

                {items.length > 0 ? (
                    <div className="drawer-container">
                        <div className="items"> 
                            {items.map((obj) => (
                                <div key={obj.id} className="cart-item"> {/* Використовуємо obj.id замість index */}
                                    <div 
                                        style={{ backgroundImage: `url(${obj.imageUrl})` }} 
                                        className="cart-img">
                                    </div>

                                    <div className="cart-alias-block">
                                        <p className="cart-alias-goods">{obj.title}</p>
                                        <b>{obj.price} грн.</b>
                                    </div>

                                    <img 
                                        onClick={() => {
                                            if (obj.id) {
                                                onRemove(obj.id);
                                            } else {
                                                console.error('Cannot remove: item has no id', obj);
                                            }
                                        }} 
                                        className="cart-item-remove-btn" 
                                        src="/img/btn-remove.svg" 
                                        alt="remove" 
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="cart-total-block">
                            <ul>
                                <li>
                                    <span>Разом:</span>
                                    <div></div>
                                    <b>4999 грн.</b>
                                </li>
                                <li>
                                    <span>Податок 20%:</span>
                                    <div></div>
                                    <b>999,8 грн.</b>
                                </li>
                            </ul>
                            <button disabled={isLoading} onClick={onClickOrder} className="green-button">Оформити замовлення<img src="/img/arrow.svg" alt='arrow' /></button>
                        </div>
                    </div>
                ) : (
                    <Info
                    title={isOrderComplete ? "Замовлення оформлене" : "Корзина порожня"}  
                        description={isOrderComplete ? `Ваше замовлення #${orderId} незабаром буде опрацьовано` : "Додайте хоча б одну одиницю товару, щоб зробити замовлення"}
                        image={isOrderComplete ? "/img/complete-order.svg" : "/img/empty-cart-image.svg"}    
                    />
                )}
            </div>
        </div>
    );
}

export default Drawer;