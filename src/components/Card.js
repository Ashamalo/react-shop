import React from 'react';
import ContentLoader from "react-content-loader";
import AppContext from '../context';

function Card({
    id,
    title,
    imageUrl,
    price,
    onClickFavorite,
    onClickPlus,
    favorited = false,
    loading = false
}) {
    // const [isAdded, setIsAdded] = React.useState(added);
    const { isItemAdded } = React.useContext(AppContext);
    const [isFavorite, setIsFavorite] = React.useState(favorited);
    const obj = { id, parentId: id, title, imageUrl, price };

    console.log(title, isItemAdded(id));
    
    const handleClick = () => {
        onClickPlus(obj);
        // setIsAdded(!isAdded);
    };

    const HandleFavoriteClick = () => {
        onClickFavorite(obj);
        setIsFavorite(!isFavorite);
    }

    return (
        <div className="card">
            {loading ? (
                <ContentLoader
                    speed={2}
                    width={155}
                    height={250}
                    viewBox="0 0 155 265"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb">
                    <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
                    <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
                    <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
                    <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
                    <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
                </ContentLoader>
            ) : (
                <>
                    {onClickFavorite && (<div className="favorite" onClick={HandleFavoriteClick}>
                        <img src={isFavorite ? "/img/isFavorite.svg" : "/img/heart-unlike.svg"} alt="favorite" />
                    </div>)}

                    <img width="100%" height={135} src={imageUrl} alt="sneakers" />
                    <h5>{title}</h5>
                    <div className='d-flex justify-between align-center'>
                        <div className='d-flex flex-column'>
                            <span>Ціна: </span>
                            <b>{price} грн.</b>
                            </div>
                            {onClickPlus && (
                                <img
                                    className="plus"
                                    onClick={handleClick}
                                    src={isItemAdded(id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}
                                    alt="add to cart"
                                />)}
                    </div>
                </>
            )}
        </div>
    );
}

export default Card;