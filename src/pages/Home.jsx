import React from 'react';
import Card from '../components/Card';
// import AppContext from '../context';

function Home({
    items,
    searchValue,
    setSearchValue,
    onChangeSearchInput,
    onAddToFavorite,
    onAddToCart,
    isLoading
}) {
    const renderItems = () => {
        const filtredItems = items.filter((item) =>
        item.title.toLowerCase().includes(searchValue.toLowerCase()),
        );
        return (isLoading ? [...Array(8)] : filtredItems).map((item, index) => (
        <Card
            key={index}
            onClickFavorite={(obj) => onAddToFavorite(obj)}
            onClickPlus={(obj) => onAddToCart(obj)}
            loading={isLoading}
            {...item}
        />
        ));
    };

    return (
        <div className="content p-40">
          <div className="d-flex align-center mb-40 justify-between">
            <h1>{searchValue ? `Пошук по запиту: "${searchValue}"` : 'Усі годинники'}</h1>
            {/* //реалізація поля пошуку товару */}
            <div className="search-block">
              <img src="/img/search.svg" alt="search" />
              {searchValue && (
                <img
                onClick={() => setSearchValue('')}
                className="clear cart-item-remove-btn"
                src="/img/btn-remove.svg"
                alt="clear"
                />
                )}
              <input onChange={onChangeSearchInput} value={searchValue} placeholder="Пошук..." />
            </div>
          </div>

            <div className='goods'>
                {renderItems()}
          </div>

        </div>
    )
}

export default Home;
