import React, { Component } from 'react';


// class Slider extends Component {
//   constructor(props){
//     super(props);
//     this.state = {

//     }
//   }
//   render () {
//     return (
//       <div className = "slider">
      
//       </div>
//     )
//   }
// }

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
          {/* <Slider/> */}
        </header>
        <img src = "https://picsum.photos/2000/600" alt = "leather"/>   
      </>
    );
  }
}

export default Header;