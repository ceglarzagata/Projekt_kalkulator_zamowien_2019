import React, { Component } from 'react';

class SocialMedia extends Component {
  render() {
    return (
      <div  className = "socialMedia">
        <p>Polub nas na:</p>
        <ul>
          <li>
            <a href = "https://www.facebook.com/">
              <i className = "fab fa-facebook-square"></i>
            </a>
          </li>
          <li>
            <a href = "https://www.youtube.com/?gl=PL&hl=pl">
              <i className = "fab fa-youtube"></i>
            </a>
          </li>
          <li>
            <a href = "https://www.instagram.com/">
              <i className = "fab fa-instagram"></i>
            </a>
          </li>
        </ul>
      </div>
    )
  }
}

class InfoContact extends Component {
  render() {
    return (
      <>
        <ul className = "contactInfo">
          <li>
            <a href = "tel:987654321">
              <i className = "fas fa-mobile-alt"></i>
              987 - 654 - 321
              </a>
            </li>
          <li>
            <a href = "mailto:PunchLineLetherCraft@gmail.com">
              <i className = "far fa-envelope"></i>            
              PunchLineLetherCraft@gmail.com
            </a>
          </li>
        </ul>
      </>
    )
  }
}

class Footer extends Component {
  render() {
    return (
      <footer>
        <div className = "container">
        <h1>PunchLine LetherCraft</h1>
          <div className = "contactSection">
            <InfoContact/>
            <SocialMedia/>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;