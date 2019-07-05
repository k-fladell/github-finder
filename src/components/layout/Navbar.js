import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

//functional components don't need the render() method, whearas class components do
//here we destructured the props argument for icon and title, so below we don't have to use props.icon and props.tile
const Navbar = ({icon, title}) => {
    
    //dont use a tags for routes! You will lose the state!
    return (
        <nav className="navbar bg-primary">
            <h1>
                <i className={icon}/>
                {title} 
            </h1>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/about'>About</Link>
                </li>
            </ul>
        </nav>
    )
}

//defining the defaultProps
//with functional components this is defined as function.defaultProps
//with class components this is defined as static defaultProps above the render method
Navbar.defaultProps = {
    title: 'Github Finder',
    icon: 'fab fa-github'
};

//defining propTypes
//with functional components this is defined as function.propTypes
//with class components this is defined as static propTypes above the render method
Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
};

export default Navbar
