import React from "react";
import AppContext from "../context";

const Info = ({ title, image, description }) => {
    const { setCartOpened } = React.useContext(AppContext);

    return (
        <div className="cartEmpty d-flex align-center justify-center flex-column flex">
            <img className="mb-20" width="120px" height="120px" src={image} alt="status cart"></img>
            <h2>{title}</h2>
            <p className="opacity-6 empty-cart-text">{description}</p>
            <button onClick={() => setCartOpened(false)} className="green-button greenButtonEmpty">
                <img className="mr-10" src="/img/arrow-back.svg" alt="arrow back"></img>
                    Повернутися до вибору 
            </button>
        </div>
    )
}

export default Info;