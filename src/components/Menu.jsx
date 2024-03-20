import './Menu.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

function Menu() {
    const [isShrink, setIsShrink] = useState(false);
    const hideMenu = () => {

    }

    return (
        <>
            <div className={`menu-container ${isShrink && "shrink"}`}>
                <Link to="/bio">
                    <button>Bio</button>
                </Link>
                <Link to="/career">
                    <button>Career</button>
                </Link>
                <Link to="/stack">
                    <button>Stack</button>
                </Link>
                <Link to="/projects">
                    <button>Projects</button>
                </Link>
                <Link to="/contact">
                    <button>Contact</button>
                </Link>
            </div>
        </>
    );
}

export default Menu;