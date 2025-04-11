import Card from '../components/Card';

function Home({
    items,
    cartItems,
    searchValue,
    setSearchValue,
    onChangeSearchInput,
    onAddToFavorite,
    onAddToCart,
    isLoading
    // cartItems = []
}) {

    const renderItems = () => {
        const filtredItems = items.filter((item) =>
        item.title.toLowerCase().includes(searchValue.toLowerCase()),
        );
        return (isLoading ? [...Array(8)] : filtredItems).map((item, index) => (
        <Card
            key={index}
            onFavorite={(obj) => onAddToFavorite(obj)}
            onPlus={(obj) => onAddToCart(obj)}
            loading={isLoading}
            {...item}
        />
        ));
    };

    return (
        <div className="content p-40">
          <div className="d-flex align-center mb-40 justify-between">
            <h1>{searchValue ? `Пошук по запиту: "${searchValue}"` : 'Усі кросівки'}</h1>
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

            {/* {items.filter((item) => item.title.toLowerCase().includes(searchValue.toLocaleLowerCase())).map((item, index) => (
               <Card
                    key={index} // Додайте унікальний key для кожного елемента
                    id={item.id}
                    title={item.title}
                    price={item.price}
                    imageUrl={item.imageUrl}
                    onClickFavorite={(obj) => onAddToFavorite (obj)}
                    onClickPlus={(obj, isAdded) => onAddToCart(obj, isAdded)}
                    added={cartItems.some((obj) => Number(obj.id) === Number(item.id))}
                    loading={false}
                // added
                    {...items}
                    />
            ))} */}
            

          </div>

        </div>
    )
}

export default Home;

// import Card from '../components/Card';
// import { useMemo } from 'react';

// function Home({
//     items = [],
//     searchValue,
//     setSearchValue,
//     onChangeSearchInput,
//     onAddToFavorite,
//     onAddToCart, 
//     cartItems = []
// }) {
//     // Оптимізуємо фільтрацію товарів
//     const filteredItems = useMemo(() => {
//         return items.filter(item => 
//             item.title.toLowerCase().includes(searchValue.toLowerCase())
//         );
//     }, [items, searchValue]);

//     return (
//         <div className="content p-40">
//           <div className="d-flex align-center mb-40 justify-between">
//             <h1>{searchValue ? `Пошук по запиту: "${searchValue}"` : 'Усі кросівки'}</h1> 
//             <div className="search-block">
//               <img src="/img/search.svg" alt="search" /> 
//               {searchValue && (
//                 <img 
//                   onClick={() => setSearchValue('')}
//                   className="clear cart-item-remove-btn" 
//                   src="/img/btn-remove.svg" 
//                   alt="clear" 
//                 />
//               )}
//               <input onChange={onChangeSearchInput} value={searchValue} placeholder="Пошук..." />
//             </div>
//           </div>

//           <div className='goods'>
//             {filteredItems.map(item => (
//                 <Card 
//                   key={item.id}
//                   id={item.id}
//                   title={item.title} 
//                   price={item.price} 
//                   imageUrl={item.imageUrl}   
//                   onClickFavorite={onAddToFavorite} 
//                   onClickPlus={onAddToCart}
//                   added={cartItems.some(cartItem => cartItem.id === item.id)}
//                   {...item}
//                 />
//             ))}
//           </div>
//         </div>
//     )
// }

// export default Home;