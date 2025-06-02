
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Contacts() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  
  useEffect(() => {
    
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      // Видаляємо всі нецифрові символи
      let cleanedValue = value.replace(/\D/g, '');
      
      // Обмежуємо довжину до 10 символів (без префікса +38)
      if (cleanedValue.length > 10) {
        cleanedValue = cleanedValue.substring(0, 10);
      }
      
      // Форматуємо номер для відображення
      let formattedValue = '';
      if (cleanedValue.length > 0) {
        if (cleanedValue.length > 0) formattedValue = `(${cleanedValue.substring(0, 3)}`;
        if (cleanedValue.length > 3) formattedValue += `) ${cleanedValue.substring(3, 6)}`;
        if (cleanedValue.length > 6) formattedValue += `-${cleanedValue.substring(6, 8)}`;
        if (cleanedValue.length > 8) formattedValue += `-${cleanedValue.substring(8)}`;
      }
      
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
      return;
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Форматуємо телефон для відправки: видаляємо всі нецифрові символи і додаємо +38
      const phoneForSubmit = `+38${formData.phone.replace(/\D/g, '')}`;
      
      // Відправляємо дані на сервер
      await axios.post(
        'https://67c1c9a361d8935867e44681.mockapi.io/feedback',
        {
          ...formData,
          phone: phoneForSubmit,
          timestamp: new Date().toISOString()
        }
      );
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      console.error('Помилка при відправці форми:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Контакти</h1>
      </div>
      
      <div className="contact-info">
        <p><strong>Телефон:</strong> <a href="tel:+380123456789">+380 (12) 345-67-89</a></p>
        <p><strong>Email:</strong> <a href="mailto:info@thewatch.com">info@thewatch.com</a></p>
        <p><strong>Адреса:</strong> м. Київ, вул. Шовковична, 42-44</p>
        <p><strong>Години роботи:</strong> Пн-Пт: 10:00-20:00, Сб-Нд: 11:00-18:00</p>
      </div>
           
      <div className="feedback-form-container">
        <div className="feedback-header">
          <h3>Форма зворотного зв'язку</h3>
          <p className="feedback-subtitle">
            Маєте питання чи пропозиції? Напишіть нам і ми обов'язково відповімо!
          </p>
        </div>
        
        {submitStatus === 'success' && (
          <div className="success-message">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#3c763d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div>
              <strong>Повідомлення успішно надіслано!</strong>
              <p>Дякуємо за звернення. Ми зв'яжемося з вами найближчим часом.</p>
            </div>
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div className="error-message">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#a94442" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div>
              <strong>Помилка при відправці!</strong>
              <p>Будь ласка, спробуйте ще раз пізніше.</p>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="feedback-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Ваше ім'я</label>
              <div className="input-with-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#777" strokeWidth="2"/>
                  <path d="M3 19C3 16.7909 4.79086 15 7 15H17C19.2091 15 21 16.7909 21 19V21H3V19Z" stroke="#777" strokeWidth="2"/>
                </svg>
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  placeholder="Введіть ваше ім'я" 
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Ваш email</label>
              <div className="input-with-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 8L10.8906 13.2604C11.5624 13.7083 12.4376 13.7083 13.1094 13.2604L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z" stroke="#777" strokeWidth="2"/>
                </svg>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  placeholder="Введіть ваш email" 
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">Ваш телефон</label>
            <div className="phone-input-container">
              <div className="phone-prefix">+38</div>
              <input 
                type="tel"
                id="phone"
                name="phone"
                placeholder="0XX XXX XX XX" 
                className="phone-input"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="phone-example">Наприклад: 099 399 09 09</div>
          </div>
          
          <div className="form-group">
            <label htmlFor="message">Ваше повідомлення</label>
            <div className="textarea-with-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 10H8.01M12 10H12.01M16 10H16.01M8 14H16M3 6V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V6C21 4.89543 20.1046 4 19 4H5C3.89543 4 3 4.89543 3 6Z" stroke="#777" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <textarea 
                id="message"
                name="message"
                placeholder="Введіть ваше повідомлення" 
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
          </div>
          
          <button 
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg className="spinner" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"/>
                  <path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z">
                    <animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite"/>
                  </path>
                </svg>
                Відправка...
              </>
            ) : (
              <>
                Надіслати повідомлення
                {/* <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.3009 13.6949L20.819 3.17682M10.5795 14.1355L13.1658 19.5804C13.4538 20.1847 13.5978 20.4869 13.7628 20.5357C13.9061 20.5782 14.0642 20.5534 14.1882 20.4697C14.3301 20.374 14.3836 20.0886 14.4908 19.5177L17.5 5.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg> */}
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contacts;