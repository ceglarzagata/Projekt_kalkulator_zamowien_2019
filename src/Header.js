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

class Header extends Component {
  render() {
    return (
      <>
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