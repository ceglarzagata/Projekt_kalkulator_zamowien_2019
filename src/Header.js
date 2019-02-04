import React, { Component } from 'react';


class Slider extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }
  render () {
    return (
      <div className = "slider">
      
      </div>
    )
  }
}



//ajbdkabckaudbvukadbvkdjjdddddddddddddddddddddddddddddddddddddddddddddddd


class Rodzic extends React.Component {
  constructor() {
    super();
    this.handleData = this.handleData.bind(this);
    this.state = {
      fromChild: ''
    };
  }
  
  handleData(data) {
    this.setState({
      fromChild: data
    });
  }
  
  render() {
    return (
      <div>
        <InputFoo handlerFromParant={this.handleData} /> 
        <h5>Received by parent:<br />{this.state.fromChild}</h5>
      </div>
    );
  }
}


class InputFoo extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.state = {
      inputField: ''
    };
  }
  
  submitHandler(evt) {
    evt.preventDefault();
    // pass the input field value to the event handler passed
    // as a prop by the parent (App)
    this.props.handlerFromParant(this.state.inputField);
    
    this.setState({
      inputField: ''
    });
  }
  
  handleChange(event) {
    event.preventDefault();
    this.setState({
      inputField: event.target.value
    });
    this.props.handlerFromParant(this.state.inputField);
  }

  render() {
    return (
      <div>
          <input type="text" 
                 id="theInput" 
                 value={this.state.inputField} 
                 onChange={this.handleChange} />
        <h5>Visible in child:<br />{this.state.inputField}</h5>
      </div>
    );
  }
}

/////////////cddddddddddddddddddddddd
class Agata extends Component {
  constructor(props){
    super(props);
    this.state = {
      teksty: "brak wpisu"
    }
  }
  someFn = (e) => {
    e.preventDefault();
    this.setState ({
      teksty: e.target.value
    })
    this.props.callbackFromParent(this.state.teksty)
  }
  
  render() {
    return (
      <div>
        <p>{this.state.teksty}</p>
        <input 
          type = "text"  
          value = {this.state.teksty}
          onChange =  {this.someFn}
        ></input>
      </div>
    );
  }
}

class Marek extends Component {
  constructor(props){
    super(props);
    this.state = {
      listDataFromChild: null
    }
  }
  myCallback = (dataFromChild) => {
    this.setState({
      listDataFromChild: dataFromChild
    })
  }
  render() {
    return (
      <div>
        <Agata callbackFromParent={ this.myCallback}/>
        <div>Wpisane zostało: {this.state.listDataFromChild}</div>
      </div>
    );
  }
}

class Header extends Component {
  render() {
    return (
      <>
      <Rodzic/>
      <Marek/>
        <h1>PunchLine LetherCraft</h1>
        <p>Masz pytania?</p>
        <p>Napisz do nas!</p>
        <a href = "mail: PunchLineLetherCraft@gmail.com">PunchLineLetherCraft@gmail.com</a>
        <Slider/>
      </>
    );
  }
}

export default Header;