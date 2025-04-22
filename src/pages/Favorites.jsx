import React from 'react';
import Card from '../components/Card';
import AppContext from '../context';

function Favorites({ onAddToFavorite }) {
  const {favorites} = React.useContext(AppContext);

  // console.log(state);
    return (
        <div className="content p-40">
          <div className="d-flex align-center mb-40 justify-between">
            <h1>Мої закладки</h1>
          </div>

          <div className='goods'>

             {favorites.map((item, index) => (
               <Card 
               key={index} // Додайте унікальний key для кожного елемента
              //  id={item.id}
              //  title={item.title} 
              //  price={item.price} 
              //  imageUrl={item.imageUrl}   
               favorited={true}
               onFavorite={onAddToFavorite}
                 onClickFavorite={(obj) => onAddToFavorite(obj)} 
                 {...item}
              //  onClickPlus={(obj, isAdded) => onAddToCart(obj, isAdded)}
             />
            ))}
          </div>
        </div>
    )
}

export default Favorites;