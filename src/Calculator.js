import React, { Component } from 'react';

class BeltLength extends Component {
  constructor(props){
    super(props);
    this.state = {
      lengthValue: ""
    }
  }
  changeBeltLength = (e) => {
    let value = e.target.value
    this.setState ({
      lengthValue: value
    })
    this.props.changeBeltLength(value)
  }
  render(){
    return (
      <div>
        <label htmlFor = {this.props.keyValue}>Podaj obwód w pasie:</label>
        <input
          type = "number"                
          id = {this.props.keyValue}
          value = {this.state.lengthValue} 
          onChange = {this.changeBeltLength}             
        />
        <hr />
      </div>
    )
  }
}

class ParametersFormStandard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lengthValue: ""
    };
  }
  change = (e) => {
   this.setState({
      [e.target.name]: e.target.value      
   })
  };
  changeBelt = (dataFromChild) => {
    this.setState({
     lengthValue: dataFromChild
    })
   };
  render() {
    const { parameters } = this.props.choosen;
    return (
      <>
        {
          Object.entries(parameters).map(([key, params]) => {
            if(key === "pattern"){
              return (
                <div key = {key}>
                  <label>Wybierz {key}: </label>                
                  {
                    params.map(param => {
                      return (
                        <div key = {param.name}>
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
            } else if (key === "length") {
              return (
                <BeltLength 
                  key = {key} 
                  keyValue = {key} 
                  changeBeltLength = {this.changeBelt}
                />
              )
            } else {
              return (
                <div key = {key}>
                  <label htmlFor = {key}>Wybierz {key}: </label>
                  <select 
                    id = {key} 
                    name = {key} 
                    onChange = {this.change}
                  >
                  {
                    params.map(param => (
                      <option
                        key = {param.name}
                        value = {param.name}
                      >
                        {param.name}
                      </option>
                    ))
                  }
                  </select>
                  <hr />
                </div>
              )
            }
          })
        }

        <p>{this.state.selectedOption}</p>
        <p>{this.state.thickness}</p>
        <p>{this.state.color}</p>
        <p>{this.state.pocketsNO}</p>
        <p>{this.state.lengthValue}</p>
      </>
    )
  }
}

class Calculator extends Component {
  constructor(props){
    super(props);
    this.state = {
      products: [],
      choosen: null
    }
  }
  choose = (e) => {
    this.setState({
      // eslint-disable-next-line
      choosen: this.state.products.find(row => row.id == e.target.value)
    });    
  };
  componentDidMount() {
    fetch('http://localhost:3000/products')
      .then(response => {
        return response.json()
      })
      .then(data => {
        this.setState({
          products: data,
          choosen: data[0]
        })
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
      <>
        <h2>Sprawdź ile będzie kosztował Twój {this.state.choosen.name}</h2>
        <form>
          <select onChange = {this.choose}>
            {
              this.state.products.map((el) => {
                return (
                <option 
                key = {el.id} 
                value = {el.id}>
                  {el.name}
                </option>
                )
              })
            }
          </select>          
          <ParametersFormStandard
            choosen = {this.state.choosen}
          />
        </form>
        <h2>Cena końcowa</h2>

        <button>Złóż zamówienie</button>
      </>
    );
  }
}

export default Calculator;