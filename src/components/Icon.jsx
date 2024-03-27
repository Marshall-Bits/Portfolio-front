import { useNavigate } from 'react-router-dom';
import audioSelect from '../assets/select.mp3';

const Icon = ({ image, url, page, setIsFading }) => {
    const navigate = useNavigate();

    const playAudio = () => {
        const audio = new Audio(audioSelect);
        audio.play();
    };

    const handleClick = () => {
        playAudio();
        setIsFading(true);
        setTimeout(() => {
            url ? window.open(url) : navigate(page);
        }, 300);
    };

    return (
        <button className='menu-button' onClick={handleClick}>
            <img src={image} alt="icon" />
        </button>
    );
};

export default Icon;