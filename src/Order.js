import React, { Component } from 'react';

class Order extends Component {
  render() {
    return (
      <>
        <h2>Formularz złożenia zamówienia</h2>

        <h3>Dane kontaktowe</h3>
        <label>Imię
          <input type = "text"/>
        </label>
        <label>Nazwisko
          <input type = "text"/>
        </label>
        <label>Numer telefonu
          <input type = "number"/>
        </label>
        <label>E-mail
          <input type = "email"/>
        </label>

        <h3>Podsumowanie zamówienia</h3>
        <p>Produkt z formularza</p>
        <ul>
          {/* //map */}
          <li>Paramatry z formularza</li>
          <li>Paramatry z formularza</li>
          <li>Paramatry z formularza</li>
        </ul>
        <h3>Cena</h3>

        <p>Dodatkowe info:</p>
        <textarea value = "Dodatkowe info"></textarea>
      </>
    );
  }
}

export default Order;