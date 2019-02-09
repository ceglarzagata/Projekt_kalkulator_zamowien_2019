import React, { Component } from 'react';
import Order from './Order';

class ParametersFormStandard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lengthValue: "",
      parametersObject: {},
      paramsToOrder: {},
      selectedOption: "kotwica",
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
   for (const [key, value] of Object.entries(parameters)){
    for (const [ , elem] of Object.entries(value)){
      if(elem.name === e.target.value){
        this.setState(prevState => ({
          paramsToOrder: {...prevState.paramsToOrder, [key]: elem.name},
          parametersObject: {...prevState.parametersObject, [key]: elem.price}
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
                return (
                  <div key = {key} className = "parameter">
                    <label>Wybierz {key}: </label>                
                    {
                      params.map(param => {
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
                    <label htmlFor = {key}>Wybierz {key}: </label>
                    <select 
                      id = {key} 
                      name = {key} 
                      onChange = {this.change}
                    >
                    {
                      params.map(param => {
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
                params.map((param, index) => { 
                  if (this.state[key] === param.name || this.state.selectedOption === param.name){
                    return (
                      <img key = {param.name} src = {param.image} alt = {param.name}/>
                    )
                  } else if (index === 0 && this.state[key] === "") {
                    return (
                      <img key = {param.name} src = {param.image} alt = {param.name}/>
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

class Calculator extends Component {
  constructor(props){
    super(props);
    this.state = {
      products: [],
      choosen: null,
      sum: null,
      parametersObject: {},
      display: "block",
      key: 0
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
    for (const [key, value] of Object.entries(parameters)){
      for (const [ i, elem] of Object.entries(value)){
        // eslint-disable-next-line
        if (i == 0){
          this.setState(prevState => ({
            parametersObject: {...prevState.parametersObject, [key]: elem.name},
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
  orderButton = () => {
    this.setState({
      // display:"none"
    })
  }

  initial = () => {
    const { parameters } = this.state.choosen;
    for (const [key, value] of Object.entries(parameters)){
      for (const [ i, elem] of Object.entries(value)){
        // eslint-disable-next-line
        if(i == 0){
          this.setState(prevState => ({
            parametersObject: {...prevState.parametersObject, [key]: elem.name},
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
          <div className = "sumUp">
            <h3>Cena końcowa to {this.state.sum}zł</h3>
            <button 
              onClick = {this.orderButton}
              className = "button"
            >
              Złóż zamówienie
            </button>
          </div>
        </form>
          
        {/* <main style = {{display: this.state.display === "block" ? "none" : "block"}}> */}
        <div style = {{display: "block"}}>              
              
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