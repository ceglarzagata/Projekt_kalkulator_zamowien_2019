import React, { Component } from 'react';
import Order from './Order';

class ParametersFormStandard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lengthValue: "",
      parametersObject: {},
      paramsToOrder: {},
      selectedOption: "lilijka",
      thickness: "",
      color: "",
      pocketsNO: "",
      length: ""
    };
  }
  change = (e) => {
   this.setState({
      [e.target.name]: e.target.value
   })
   const { parameters } = this.props.choosen;
   for (const [, value] of Object.entries(parameters)){
    for (const [ , elem] of Object.entries(value[1])){
      if(elem.name === e.target.value){
        this.setState(prevState => ({
          paramsToOrder: {...prevState.paramsToOrder, [value[0]]: elem.name},
          parametersObject: {...prevState.parametersObject, [value[0]]: elem.price}
        }), this.updateSumInParent);  
      }
    }
   }   
  };
  updateSumInParent = () => {
    let parametersObjectValue = Object.values(this.state.parametersObject);
    let sumUp;
    if(parametersObjectValue.length > 0){
      sumUp = parametersObjectValue.reduce((prev, curr) => {
        return prev + curr;
      })
    }
    this.props.changePrice(
      sumUp,
      this.state.paramsToOrder
    );
  }
  render() {
    const { parameters } = this.props.choosen;
    return (
      <div className = "formCalculator">
        <div className = "formContent">
          {
            Object.entries(parameters).map(([key, params]) => {
              if(key === "pattern"){
                // let paramName = "wzór";
                return (
                  <div key = {key} className = "parameter">
                    <label className = "radioLabel">Wybierz {params[0]}: </label>                
                    {
                      params[1].map(param => {
                        return (
                          <div key = {param.name} className = "radio">
                            <input
                              type = "radio"
                              name = "selectedOption"
                              id = {key}
                              value = {param.name}
                              checked = {this.state.selectedOption === param.name}
                              onChange = {this.change}
                            />
                            <label htmlFor = {key}>{param.name}</label>
                          </div>
                        )                  
                      })
                    }                
                  </div>
                )
              } else {
                return (
                  <div key = {key} className = "parameter">
                    <label htmlFor = {key}>Wybierz {params[0]}: </label>
                    <select 
                      id = {key} 
                      name = {key} 
                      onChange = {this.change}
                    >
                    {
                      params[1].map(param => {
                        return (
                          <option
                            key = {param.name}
                            value = {param.name}
                          >
                            {param.name}
                          </option>
                        )}
                      )
                    }
                    </select>
                  </div>
                )
              }
            })
          }
        </div>
        <div className = "images">
          {
            Object.entries(parameters).map(([key, params]) => {
              return (
                params[1].map((param, index) => { 
                  if (this.state[key] === param.name || this.state.selectedOption === param.name){
                    return (
                      <div className = "image" key = {param.name} style = {{backgroundImage: `url(${param.image})`}}></div>
                    )
                  } else if (index === 0 && this.state[key] === "") {
                    return (
                      <div className = "image" key = {param.name} style = {{backgroundImage: `url(${param.image})`}}></div>
                    )
                  } else {
                    return null
                  }
                })
              ) 
            })
          }
        </div>
      </div>
    )
  }
}
class SumUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "block"
    }
  }
  orderButton = (e) => {
    e.preventDefault();
    this.setState({
      display: "none"
    }, () => this.props.orderButton(this.state.display))    
  }
  render () {
    return (
      <div className = "sumUp">
        <h3>Cena końcowa to {this.props.sum}zł</h3>
        <button 
          onClick = {this.orderButton}
          className = "button"
        >
          Złóż zamówienie
        </button>
      </div>
    )
  }
}
class Calculator extends Component {
  constructor(props){
    super(props);
    this.state = {
      products: [],
      choosen: null,
      sum: null,
      parametersObject: {},
      display: "block",
      key: 0,
      keyProduct: 0
    }
  }
  choose = (e) => {
    this.setState({
      // eslint-disable-next-line
      choosen: this.state.products.find(row => row.id == e.target.value),
      parametersObject: 0,
      key: this.state.key + 1
    }, this.updatePrice);  
  };
  updatePrice = () => {
    this.setState({
      sum: this.state.choosen.standardPrice
    })
    const { parameters } = this.state.choosen;
    for (const [, value] of Object.entries(parameters)){
      for (const [ i, elem] of Object.entries(value[1])){
        // eslint-disable-next-line
        if (i == 0){
          this.setState(prevState => ({
            parametersObject: {...prevState.parametersObject, [value[0]]: elem.name},
          }), 
          );  
        }
      }
    }    
  }
  changePrice = (priceFromChild, parametersObjectFromChild) => {
    this.setState(prevState => ({
      sum: this.state.choosen.standardPrice + priceFromChild,
      parametersObject: Object.assign({...prevState.parametersObject}, parametersObjectFromChild)
    }))
  }
  orderButton = (data) => {    
    this.setState({
      display: data
    })
  }
  initial = () => {
    const { parameters } = this.state.choosen;
    for (const [, value] of Object.entries(parameters)){
      for (const [ i, elem] of Object.entries(value[1])){
        // eslint-disable-next-line
        if(i == 0){
          this.setState(prevState => ({
            parametersObject: {...prevState.parametersObject, [value[0]]: elem.name},
          }), 
          );  
        }
      }
    }
  }
  componentDidMount() {
    fetch('http://localhost:3000/products')
      .then(response => {
        return response.json()
      })
      .then(data => {
        this.setState({
          products: data,
          choosen: data[0],
          sum: data[0].standardPrice
        }, this.initial)
      })
      .catch(() => {
        console.log("nie działa");
      })
  }
  render() {
    if (!this.state.choosen) {
      return "Trwa ładowanie"
    }
    return (
      <main className = "container">        
        <form style = {{display: this.state.display}}>
          <label className = "mainLabel">Sprawdź ile będzie kosztował Twój: </label>
          <select className = "mainSelect" onChange = {this.choose}>
            {
              this.state.products.map((el) => {
                return (
                <option 
                  key = {el.id} 
                  value = {el.id}
                >
                  {el.name}
                </option>
                )
              })
            }              
          </select>  
          <ParametersFormStandard
            key = {this.state.key}
            choosen = {this.state.choosen}
            changePrice = {this.changePrice}
          />
          <SumUp 
            sum = {this.state.sum} 
            orderButton = {this.orderButton}
          />
        </form>          
        <div style = {{display: this.state.display === "block" ? "none" : "block"}}>
          <Order 
            product = {this.state.choosen.name} 
            parameters = {this.state.parametersObject}
            finalSum = {this.state.sum}
          />
        </div>   
      </main>
    );
  }
}

export default Calculator;