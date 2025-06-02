import React from 'react';
import Card from '../components/Card';
import AppContext from '../context';

function Favorites({ onAddToFavorite }) {
  const {favorites} = React.useContext(AppContext);

    return (
        <div className="content p-40">
          <div className="d-flex align-center mb-40 justify-between">
            <h1>Мої закладки</h1>
          </div>

          <div className='goods'>

             {favorites.map((item, index) => (
               <Card 
               key={index} 
               favorited={true}
               onFavorite={onAddToFavorite}
                 onClickFavorite={(obj) => onAddToFavorite(obj)} 
                 {...item}
             />
            ))}
          </div>
        </div>
    )
}

export default Favorites;