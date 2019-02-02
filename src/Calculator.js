import React, { Component } from 'react';

class ParametersFormStandard extends Component {
  render() {
    return (
      <>
      {/* //taki dla wizytownika lub portfela */}
        <label>
            Wybierz grubość skóry:          
            <select>
              {/* //mapa           */}
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </label>

          <label>
            Wybierz kolor skóry:          
            <select>    
              {/* //mapa           */}      
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </label>

          <label>
            Wybierz liczbę kieszeni:          
            <select>
              {/* //mapa           */}         
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </label>

          <p>Wybierz wzór stempla:</p>
          <label>
            {/* //mapa           */}
            <input
              type="radio"
              value="option2"
            />
            Option 1
          </label>
          <label>
            <input
              type="radio"
              value="option2"
            />
            Option 2
          </label>
          <label>
            <input
              type="radio"
              value="option2"
            />
            Option 3
          </label>

          {/* //lub taki dla paska */}

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
  }
}

class Calculator extends Component {
  render() {
    return (
      <>
        <h2>Sprawdź ile będzie kosztował Twój ...</h2>
        <form>
          <select>
            <option>Portfel</option>
            <option>Wizytownik</option>
            <option>Pasek</option>
          </select>

          {/* dla portfela i wizytownika*/}
          
          <ParametersFormStandard product = "portfel"/>
          <ParametersFormStandard product = "wizytownik"/>
          <ParametersFormStandard product = "pasek"/>
          

        </form>
        
        <h2>Cena końcowa</h2>
      </>
    );
  }
}

export default Calculator;