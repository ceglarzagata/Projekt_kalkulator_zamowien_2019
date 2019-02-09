import React, { Component } from 'react';

class Order extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      surname: "",
      mail: "",
      phone: "",
      info: "",
      display: "none",
      disabled: false,
      buttonClass: "button",
      validationInfo: ""
    }
  }
  changeOrder = (e) => {
    this.setState({
      [e.target.name]: e.target.value
   })
  }
  handleSubmit = (event) => { 
    event.preventDefault();
    if (this.state.name === "" || this.state.name.length < 2){
      this.setState({
        validationInfo: "Podaj imię"
      })
    } else if (this.state.surname === "" || this.state.surname.length < 2) {
      this.setState({
        validationInfo: "Podaj nazwisko"
      })
    } else if (this.state.phone === "") {
      this.setState({
        validationInfo: "Podaj numer telefonu"
      })
    } else if (this.state.phone.length !== 9) {
      this.setState({
        validationInfo: "Sprawdź czy wpisałaś/eś poprawny numer telefonu"
      })
    } else if (this.state.mail === "") {
      this.setState({
        validationInfo: "Podaj adres e-mail"
      })
    } else {
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
      }
   };
  render() {
    return (
      <div className = "orderSection">
        <h2>Formularz złożenia zamówienia</h2>
        <form onSubmit = {this.handleSubmit} className = "orderForm">
          <div className = "formContent">
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
            <label>Numer telefonu (np. 123456789)
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
            <p>Dodatkowe info:</p>
            <textarea 
              name = "info" 
              value = {this.state.info}
              onChange = {this.changeOrder}
            />
          </div>
          <div className = "sumUp">
            <h3>Podsumowanie zamówienia</h3>
            <h4>Wybrałaś/eś: <strong>{this.props.product}</strong></h4>
            <ul>
              {
                Object.entries(this.props.parameters).map(([key, params]) => {
                  return (
                    <li key = {key}>
                      {key}: <strong>{params}</strong>
                    </li>
                  )
                })
              }
            </ul>
            <h3>Cena zamówienia: {this.props.finalSum}zł</h3>
            <button 
              type = "submit" 
              disabled = {this.state.disabled}
              className = {this.state.buttonClass}
            >
              Zamów
            </button>
          </div>          
        </form>
        <div className = "validationInfo">{this.state.validationInfo}</div>
        <div className = "orderConfirmationPopUp" style = {{display: this.state.display}}></div>
      </div>
    );
  }
}

export default Order;