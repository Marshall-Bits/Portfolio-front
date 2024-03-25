import audioSelect from '../assets/select.mp3';
import { useNavigate } from 'react-router-dom';

const Icon = ({ image, url, page }) => {
    const navigate = useNavigate();

    const playAudio = () => {
        const audio = new Audio(audioSelect);
        audio.play();
    };

    const handleClick = () => {
        playAudio();
        url ? window.open(url) : navigate(page);
    };

    return (
        <button className='menu-button' onClick={handleClick}>
            <img src={image} alt="icon" />
        </button>
    );
};

export default Icon;