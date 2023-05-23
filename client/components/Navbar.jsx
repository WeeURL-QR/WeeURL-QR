import React, { Component } from 'react';
import { Link } from 'react-router-dom';



class Navbar extends Component {
	render() {
		return(
		<header className="navbar">
			<Link to="/" className="logo">Wee-URL-QR</Link>
			{/* <img src={weelad}></img> */}
			<img src="./assets/weelad.png" alt="Logo" />

			<nav>
				{/* could add link to Site Visits here */}
			</nav>
		</header>
		)
	}
}
export default Navbar;