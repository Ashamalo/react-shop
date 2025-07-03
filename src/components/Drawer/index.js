import React from "react";
import axios from "axios";

import styles from './Drawer.module.scss';
import Info from "../Info";
import { useCart } from "../../hooks/useCart";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onClose, onRemove, items = [], opened }) {

    const { cartItems, setCartItems, totalPrice } = useCart();
    const [orderId, setOrderId] = React.useState(null);
    const [isOrderComplete, setIsOrderComplete] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const onClickOrder = async () => {
        try {
            setIsLoading(true);
            
            // Зберігаємо копію товарів ДО очищення кошика
            const itemsToDelete = [...cartItems];
            
            // 1. Створюємо замовлення
            const { data } = await axios.post('https://67c1c9a361d8935867e44681.mockapi.io/orders', {
                items: cartItems,
            });
            
            // 2. Оновлюємо стан (очищаємо кошик)
            setOrderId(data.id);
            setIsOrderComplete(true);
            setCartItems([]);
            await delay(10000);
            // 3. Видаляємо товари з серверного кошика (використовуючи ЗБЕРЕЖЕНУ копію)
                await Promise.all(
                itemsToDelete.map(item => 
                    axios.delete(`https://67c1c9a361d8935867e44681.mockapi.io/cart/${item.id}`)
                )
            );
            
        } catch (error) {
            alert('Не вдалося створити замовлення :(');
        }
        setIsLoading(false);
    };

    return (
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
            <div className={styles.drawer}>
                <h2 className="d-flex justify-between">Кошик 
                    <img onClick={onClose} className="cart-item-remove-btn" src="/img/btn-remove.svg" alt="remove" />
                </h2>

                {items.length > 0 ? (
                    <div className="drawer-container">
                        <div className="items"> 
                            {items.map((obj) => (
                                <div key={obj.id} className="cart-item">
                                    <div 
                                        style={{ backgroundImage: `url(${obj.imageUrl})` }} 
                                        className="cart-img">
                                    </div>

                                    <div className="cart-alias-block">
                                        <p className="cart-alias-goods">{obj.title}</p>
                                        <b>{obj.price} грн.</b>
                                    </div>

                                    <img 
                                        onClick={() => onRemove(obj.id)}
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
                                    <b>{totalPrice} грн.</b>
                                </li>
                                <li>
                                    <span>Податок 20%:</span>
                                    <div></div>
                                    <b>{(totalPrice * 0.2).toFixed(2)} грн.</b>
                                </li>
                            </ul>
                            <button disabled={isLoading} onClick={onClickOrder} className="green-button">Оформити замовлення<img src="/img/arrow.svg" alt='arrow' /></button>
                        </div>
                    </div>
                ) : (
                    <Info
                    title={isOrderComplete ? "Замовлення оформлене" : "Кошик порожній"}  
                    description={isOrderComplete ? `Ваше замовлення #${orderId} незабаром буде опрацьовано` : "Додайте хоча б одну одиницю товару, щоб зробити замовлення"}
                    image={isOrderComplete ? "/img/complete-order.svg" : "/img/empty-cart-image.svg"}    
                    />
                )}
            </div>
        </div>
    );
}

export default Drawer;