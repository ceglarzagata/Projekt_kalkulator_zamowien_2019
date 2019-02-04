import React, { Component } from 'react';


class ParametersFormStandard extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }
  render() {
    console.log(this.props.parametersValue);
    // if (this.props.choosen === "portfel" || this.props.choosen === "wizytownik"){
    //   return(
    //     <>
    //       {
    //         this.props.parametersValue.map((el) => {
    //           return (
    //             <>
    //               <label>
    //         Wybierz grubość skóry:          
    //         <select>
    //         {              
    //           el.map((elm) => {
    //             return (
    //             <option 
    //             key = {elm.name} 
    //             value = {elm.name}>
    //               {elm.name}
    //             </option>
    //             )
    //           })
    //         }
    //       </select>          
    //       </label>
    //             </>
    //           )
    //         })
    //       }
    //     WZÓR
    //       <label>
    //         Wybierz grubość skóry:          
    //         <select>    
    //           {/* //mapa           */}      
    //           <option>1</option>
    //           <option>2</option>
    //           <option>3</option>
    //         </select>
    //       </label>

    //       <label>
    //         Wybierz kolor skóry:          
    //         <select>    
    //           {/* //mapa           */}      
    //           <option>1</option>
    //           <option>2</option>
    //           <option>3</option>
    //         </select>
    //       </label>

    //       <label>
    //         Wybierz liczbę kieszeni:          
    //         <select>
    //           {/* //mapa           */}         
    //           <option>1</option>
    //           <option>2</option>
    //           <option>3</option>
    //         </select>
    //       </label>

    //       <p>Wybierz wzór stempla:</p>
    //       <label>
    //         {/* //mapa           */}
    //         <input
    //           type="radio"
    //           value="option2"
    //         />
    //         Option 1
    //       </label>
    //       <label>
    //         <input
    //           type="radio"
    //           value="option2"
    //         />
    //         Option 2
    //       </label>
    //       <label>
    //         <input
    //           type="radio"
    //           value="option2"
    //         />
    //         Option 3
    //       </label>

    //     </>
    //   )
    // } else {
      return (
        <>  
        {/* inna próba niezależna */}
          {/* <label>
              Wybierz kolor skóry:          
              <select>  
                 {
                   this.props.parametersValue.thickness.map((el) => {
                     return (
                       <option 
                        key = {el.name}
                        value = {el.name}>
                          {el.name}
                        </option>
                     )
                   })
                 }       
              </select>
            </label> */}            
        
            <label>
              Wybierz grubość skóry:          
              <select>          
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </label>
  
            <label>
              Podaj obwód w pasie (w cm):          
              <input type = "number"/>
            </label>
  
            <label>
              Wybierz kolor skóry:          
              <select>          
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </label> 
        </>
      )
    // }
 
  }
}

class Calculator extends Component {
  constructor(props){
    super(props);
    this.state = {
      url: 'http://localhost:3000/products',
      products: [],
      choosen: "portfel",
      wallet: [],
      businessCardHolder: [],
      belt: [],
      parametersValue: []
    }
  }
  choose = (e) => {
    this.setState({
      choosen: e.target.value
    })
    if(this.state.choosen === "portfel"){
      this.setState({
        parametersValue: this.state.wallet
      })
    } else if(this.state.choosen === "wizytownik"){
      this.setState({
        parametersValue: this.state.businessCardHolder
      })
    } else if(this.state.choosen === "pasek"){
      this.setState({
        parametersValue: this.state.belt
      })
    }
  }
  componentDidMount() {
    fetch(this.state.url)
      .then(response => {
        console.log(response);
        return response.json()
      })
      .then(data => {        
        this.setState({
          products: data,
          wallet: data[0].parameters,
          businessCardHolder: data[1].parameters,
          belt: data[2].parameters,
          parametersValue: data[0].parameters
        })
      })
      .catch(() => {
        console.log("nie działa");
      })
  }
  render() {
    return (
      <>
        <h2>Sprawdź ile będzie kosztował Twój {this.state.choosen}</h2>
        <form>
          <select onChange = {this.choose}>
            {
              this.state.products.map((el) => {
                return (
                <option 
                key = {el.id} 
                value = {el.name}>
                  {el.name}
                </option>
                )
              })
            }
          </select>          
          <ParametersFormStandard 
            products = {this.state.products} 
            choosen = {this.state.choosen}
            parametersValue = {this.state.parametersValue}          
          />
        </form>
        
        <h2>Cena końcowa</h2>

        <button>Złóż zamówienie</button>
      </>
    );
  }
}

export default Calculator;