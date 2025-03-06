function Card() {
    return (
        <div className="card">
            <div className="favorite">
                <img src="/img/heart-unlike.svg" alt="unliked" />
            </div>

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
    );
}

export default Card;