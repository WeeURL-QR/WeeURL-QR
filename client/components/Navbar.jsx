import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from './assets/finalLogo.png'




class Navbar extends Component {
	render() {
		return(
		<header className="navbar">
			<Link to="/" className="logo"><img id="logo" src={logo} alt="Logo2"/></Link>
			{/* <img src={weelad}></img> */}
			{/* <img src="./assets/weelad.png" alt="Logo"></img> */}
			{/* <img src={logo} alt="Logo2"/> */}

			<nav>
				{/* could add link to Site Visits here */}
			</nav>
		</header>
		)
	}
}
export default Navbar;