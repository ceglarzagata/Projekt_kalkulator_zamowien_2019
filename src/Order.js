import React, { Component } from 'react';

class Order extends Component {
  componentDidMount() {

  }
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
        <p>{this.props.product}</p>
        <ul>
          {
            Object.entries(this.props.parameters).map(([key, params]) => {
              return (
                <div key = {key}>
                  <p>{key}: {params}</p>
                </div>
              )
            })
          }
          <li>Paramatry z formularza</li>
          <li>Paramatry z formularza</li>
          <li>Paramatry z formularza</li>
        </ul>
        <h3>Cena {this.props.finalSum}zł</h3>

        <p>Dodatkowe info:</p>
        <textarea value = "Dodatkowe info"></textarea>
      </>
    );
  }
}

export default Order;