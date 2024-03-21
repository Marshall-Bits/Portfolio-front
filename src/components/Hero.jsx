import './Hero.css';
import { talkingContext } from '../context/talking.context';
import { useContext } from 'react';
import staticImage from '../assets/profile-pic-static.gif';
import talkingImage from '../assets/profile-pic.gif';

function Header() {
    const { isTalking } = useContext(talkingContext);

    return (
        <header className='header-container'>
            <img className="header-img" src={isTalking ? talkingImage : staticImage} alt="profile-picture" />
        </header>
    )
};

export default Header;