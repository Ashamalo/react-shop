function Drawer({ onClose, onRemove, items = [] }) {
    return (
        <div className='overlay'>
            <div className='drawer'>
                <h2 className="d-flex justify-between">Кошик 
                    <img onClick={onClose} className="cart-item-remove-btn" src="/img/btn-remove.svg" alt="remove" />
                </h2>

                {items.length > 0 ? (
                    <div>
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
                            <button className="green-button">Оформити замовлення<img src="/img/arrow.svg" alt='arrow' /></button>
                        </div>
                    </div>
                ) : (
                    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
                        <img className="mb-20" width="120px" height="120px" src="/img/empty-cart-image.svg" alt="empty-cart"></img>
                        <h2>Корзина порожня</h2>
                        <p className="opacity-6 empty-cart-text">Додайте хоча б одну одиницю товару, щоб зробити замовлення</p>
                        <button onClick={onClose} className="green-button greenButtonEmpty">
                            <img className="mr-10" src="/img/arrow-back.svg" alt="arrow back"></img>
                            Повернутися до вибору 
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Drawer;