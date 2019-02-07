import React, { Component } from 'react';
import Order from './Order';

// class BeltLength extends Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       lengthValue: ""
//     }
//   }
//   changeBeltLength = (e) => {
//     let value = e.target.value;
//     let lengthPrice = 0;
//     if (value < 90){
//       lengthPrice = this.props.lengthProperties[0].price
//     } else if (value >=90 && value < 120){
//       lengthPrice = this.props.lengthProperties[1].price
//     } else if (value >= 120) {
//       lengthPrice = this.props.lengthProperties[2].price
//     }
//     this.setState ({
//       lengthValue: value
//     })
//     this.props.changeBeltLength(lengthPrice, {[this.props.keyValue]: lengthPrice})
//   }
//   render(){
//     return (
//       <div>
//         <label htmlFor = {this.props.keyValue}>Podaj obwód w pasie (w cm):</label>
//         <input
//           type = "number"                
//           id = {this.props.keyValue}
//           value = {this.state.lengthValue} 
//           onChange = {this.changeBeltLength}             
//         />
//         <hr />
//       </div>
//     )
//   }
// }

class ParametersFormStandard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lengthValue: "",
      parametersObject: {},
      paramsToOrder: {},
      selectedOption: "kotwica"
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
    // console.log(sumUp);
    // console.log("objeeeeeeekt", this.state.parametersObject);

    this.props.changePrice(
      sumUp,
      this.state.paramsToOrder
    );
  }
  // changeBelt = (dataFromChild, objectFromChild) => {
  //   this.setState({
  //     lengthValue: dataFromChild,
  //     aaaaaa: objectFromChild
  //   })
  // };

  render() {
    const { parameters } = this.props.choosen;
    return (
      <div className = "formContent">
        {
          Object.entries(parameters).map(([key, params]) => {
            if(key === "pattern"){
              return (
                <div key = {key}>
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
            } 
            // else if (key === "length") {
            //   return (
            //     <BeltLength 
            //       key = {key} 
            //       keyValue = {key}
            //       lengthProperties = {params}
            //       changeBeltLength = {this.changeBelt}
            //     />
            //   )
            // } 
            else {
              return (
                <div key = {key}>
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
                  <hr />
                </div>
              )
            }
          })
        }
        {/* <p>{this.state.lengthValue}</p> */}
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
      display: "block"
    }
  }
  choose = (e) => {
    this.setState({
      // eslint-disable-next-line
      choosen: this.state.products.find(row => row.id == e.target.value),
      parametersObject: 0
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
        if(i == 0){
          this.setState(prevState => ({
            parametersObject: {...prevState.parametersObject, [key]: elem.name},
          }), 
          );  
        }
      }
    }    
  }
  changePrice = (priceFromChild, parametersObjectFromChild) => {
    console.log(parametersObjectFromChild)
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
          <ParametersFormStandard choosen = {this.state.choosen} changePrice = {this.changePrice}/>
          <h2>Cena końcowa to {this.state.sum}zł</h2>
          <button 
            onClick = {this.orderButton}
            className = "button"
          >
            Złóż zamówienie
          </button> 
        </form>
          
        {/* <m style = {{display: this.state.display === "block" ? "none" : "block"}}> */}
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