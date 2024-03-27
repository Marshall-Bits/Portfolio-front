import './SoundBtn.css';

import { useContext } from "react";
import { soundContext } from "../context/sound.context";
import { useNavigate } from 'react-router-dom';

import soundOnIcon from '../assets/sound-on.webp';
import soundOffIcon from '../assets/sound-off.webp';

const SoundBtn = () => {
    const { isMuted, setIsMuted } = useContext(soundContext);
    const navigate = useNavigate();
    
    
    const handleClick = () => {
        setIsMuted((prev) => !prev);
        navigate('/');
    };

    return (
        <button className='sound-button' onClick={handleClick}>
            <img src={isMuted ? soundOffIcon : soundOnIcon} alt="sound icon" />
        </button>
    );
};

export default SoundBtn;