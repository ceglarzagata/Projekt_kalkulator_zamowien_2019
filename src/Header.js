import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <>
        <header className = "container">
          <h1 className = "logo">PunchLine LetherCraft</h1>
          <div className = "contact">
            <p>Masz pytania? <strong>Napisz do nas!</strong></p>
            <a href = "mail: PunchLineLetherCraft@gmail.com">PunchLineLetherCraft@gmail.com</a>
          </div>
        </header>
        <img src = "images/baner.jpg" alt = "leather"/>   
      </>
    );
  }
}

export default Header;