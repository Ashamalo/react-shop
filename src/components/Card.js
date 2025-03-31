import React from 'react';
function Card({title, imageUrl, price, onClickFavorite, onClickPlus}) {
    const [isAdded, setIsAdded] = React.useState(false);
    //змінюємо картинку кнопки додати у кошик при кліку. Використовуємо хук useState
    const handleClick = () => {
        onClickPlus()
        setIsAdded(!isAdded);
    };

    //Хук useEffect використовується для відстеження змін у різних змінних і т. д.
    // React.useEffect(() => {
    //     console.log('Variables is changed');
    // });

    return (
        <div className="card">
            <div className="favorite" onClick={onClickFavorite}>
                <img src="/img/heart-unlike.svg" alt="unliked" />
            </div>

            <img width={133} height={112} src={imageUrl} alt="sneakers" />
            <h5>{title}</h5>
            <div className='d-flex justify-between align-center'>
                <div className='d-flex flex-column'>
                    <span>Ціна: </span>
                    <b>{price} грн.</b>
                </div>
                {/* <button className='button' onClick={props.onClickPlus}>
                    <img width={11} height={11} src="/img/add-to-cart.svg" alt='plus' />
                </button> */}
                <img className="plus" onClick={handleClick} src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} alt="add to cart"/>
            </div>
        </div>
    );
}

export default Card;