import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content d-flex justify-between align-center">
        <div className="footer-logo">
          <Link to="/">
            <div className="d-flex align-center">
              <img width={50} height={50} src="/img/logo-2.png" alt='Логотип' />
              <div>
                <h3>The watch</h3>
                <p className='footer-title'>Магазин лімітованих версій годинників</p>
              </div>
            </div>
          </Link>
        </div>
        
        <div className="footer-links d-flex">
          <ul>
            <li><Link to="/">Головна</Link></li>
            <li><Link to="/favorites">Закладки</Link></li>
            <li><Link to="/orders">Замовлення</Link></li>
          </ul>
          
          <ul>
            <li><Link to="/privacy-policy">Політика конфіденційності</Link></li>
            <li><Link to="/contacts">Контакти</Link></li>
            <li><Link to="/privacy-policy">Умови використання</Link></li>
          </ul>
        </div>
        
        <div className="footer-social">
          <h4>Соціальні мережі</h4>
          <div className="social-icons">
            <a href="istagram.com"><img width={24} height={24} src="/img/instagram.svg" alt="Instagram" /></a>
            <a href="facebook.com"><img width={24} height={24} src="/img/facebook.svg" alt="Facebook" /></a>
            <a href="x.com"><img width={24} height={24} src="/img/x.svg" alt="The X" /></a>
          </div>
        </div>
      </div>
      
      <div className="footer-copyright">
        <p>© {new Date().getFullYear()} The Watch. Всі права захищені.</p>
      </div>
    </footer>
  );
}

export default Footer;