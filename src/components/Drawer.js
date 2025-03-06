function Drawer() {
    return (
        <div style={{ display: 'none' }} className='overlay'>
            <div className='drawer'>
                <h2 className="d-flex justify-between">Кошик <img className="cart-item-remove-btn" src="/img/btn-remove.svg" alt="remove" /></h2>
                <div className="items">

                    <div className="cart-item">
                        <img className="cart-img" width={70} height={70} src="/img/goods/1.jpg" alt="sneakers" />
                        {/* <div style={{ backgroundImage: 'url(/img/goods/1.jpg)' }} className="cart-img"></div> */}
                        <div className="cart-alias-block">
                            <p className="cart-alias-goods">Чоловічі кросівки Nike Blazer Mid Suede</p>
                            <b>4999 грн.</b>
                        </div>
                        <img className="cart-item-remove-btn" src="/img/btn-remove.svg" alt="remove" />
                    </div>

                    <div className="cart-item">
                        <img className="cart-img" width={70} height={70} src="/img/goods/1.jpg" alt="sneakers" />
                        <div className="cart-alias-block">
                            <p className="cart-alias-goods">Чоловічі кросівки Nike Blazer Mid Suede</p>
                            <b>4999 грн.</b>
                        </div>
                        <img className="cart-item-remove-btn" src="/img/btn-remove.svg" alt="remove" />
                    </div>

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
        </div>
    );
}

export default Drawer;