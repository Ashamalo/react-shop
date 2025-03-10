function Card(props) {

    const onClickButton = () => {
        alert("нажали на плюс");
    }

    return (
        <div className="card">
            <div className="favorite">
                <img src="/img/heart-unlike.svg" alt="unliked" />
            </div>

            <img width={133} height={112} src={props.imageUrl} alt="sneakers" />
            <h5>{props.title}</h5>
            <div className='d-flex justify-between align-center'>
                <div className='d-flex flex-column'>
                    <span>Ціна: </span>
                    <b>{props.price} грн.</b>
                </div>
                <button className='button' onClick={onClickButton}>
                    <img width={11} height={11} src="/img/add-to-cart.svg" alt='plus' />
                </button>
            </div>
        </div>
    );
}

export default Card;