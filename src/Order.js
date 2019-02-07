import React, { Component } from 'react';

class Order extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      surname: "",
      mail: "",
      phone: "",
      info: "Wpisz dodatkowe informacje",
      display: "none",
      disabled: false,
      buttonClass: "button"
    }
  }
  changeOrder = (e) => {
    this.setState({
      [e.target.name]: e.target.value
   })
  }
  handleSubmit = (event) => { 
    event.preventDefault();
    fetch('http://localhost:3008/orders', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "name": this.state.name,
        "surname": this.state.surname,
        "phone": this.state.phone,
        "mail": this.state.mail,
        "info": this.state.info,
        "product": this.props.product,
        "parameters": this.props.parameters,
        "price": this.props.finalSum
      })
      });
      this.setState({
        disabled: true,
        buttonClass: "button disabled"
      })
   };
  render() {
    return (
      <>
        <h2>Formularz złożenia zamówienia</h2>
        <form onSubmit = {this.handleSubmit}>
          <h3>Dane kontaktowe</h3>
          <label>Imię
            <input 
              type = "text" 
              name = "name" 
              value = {this.state.name}
              onChange = {this.changeOrder}
            />
          </label>
          <label>Nazwisko
            <input 
              type = "text" 
              name = "surname" 
              value = {this.state.surname}
              onChange = {this.changeOrder}
            />
          </label>
          <label>Numer telefonu
            <input 
              type = "number" 
              name = "phone" 
              value = {this.state.phone}
              onChange = {this.changeOrder}
            />
          </label>
          <label>E-mail
            <input 
              type = "email" 
              name = "mail" 
              value = {this.state.mail}
              onChange = {this.changeOrder}
            />
          </label>

          <h3>Podsumowanie zamówienia</h3>
          <p>{this.props.product}</p>
          <ul>
            {
              Object.entries(this.props.parameters).map(([key, params]) => {
                return (
                  <li key = {key}>
                    {key}: {params}
                  </li>
                )
              })
            }
          </ul>
          <h3>Cena {this.props.finalSum}zł</h3>

          <p>Dodatkowe info:</p>
          <textarea 
            name = "info" 
            value = {this.state.info}
            onChange = {this.changeOrder}
          />
          <button 
            type = "submit" 
            disabled = {this.state.disabled}
            className = {this.state.buttonClass}
          >
            Zamów
          </button>
        </form>
        <div className = "orderConfirmationPopUp" style = {{display: this.state.display}}></div>
      </>
    );
  }
}

export default Order;