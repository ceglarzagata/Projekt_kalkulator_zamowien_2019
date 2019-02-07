import React, { Component } from 'react';

class SocialMedia extends Component {
  render() {
    return (
      <>
        <h1>SocialMedia</h1>
        <ul>
          <li>fb</li>
          <li>yt</li>
          <li>insta</li>
        </ul>
      </>
    )
  }
}

class InfoContact extends Component {
  render() {
    return (
      <>
        <h1>PunchLine LetherCraft</h1>
        <p>info kontakt</p>
        <ul>
          <li>nazwa</li>
          <li>telefon</li>
          <li>mail</li>
        </ul>
      </>
    )
  }
}

class Footer extends Component {
  render() {
    return (
      <>
        <InfoContact/>
        <SocialMedia/>
      </>
    );
  }
}

export default Footer;