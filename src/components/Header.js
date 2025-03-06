function Header() {
    return (
        <header className="d-flex justify-between align-center">

            <div className="d-flex align-center">
                <img width={40} height={40} src="/img/logo.svg" alt='logo' />
                <div>
                    <h3>Airfit sneakers</h3>
                    <p className='header-title'>Магазин найкращіх кросівок</p>
                </div>
            </div>

            <ul className="d-flex">
                <li>
                    <img width={18} height={18} src="/img/cart.svg" alt='cart' />
                    <span>1205 грн.</span>
                </li>
                <li>
                    <img width={18} height={18} src="/img/user.svg" alt='user' />
                </li>
            </ul>

        </header>
    );
}

export default Header;