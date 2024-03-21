import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Bio.css';
import { talkingContext } from '../context/talking.context';
import { useContext } from 'react';

function Bio() {
    const { setIsTalking } = useContext(talkingContext);
    const [isFading, setIsFading] = useState(false);
    const navigate = useNavigate();
    const [typedText, setTypedText] = useState('');
    const text = "Ass a musician and creator, I'm passionate about exploring and building new concepts from the ground, integrating creativity into my daily life. My approach is rooted in humility, thriving within supportive teams that value inclusivity and respect.";
    const i = useRef(0);
    const intervalId = useRef(null);

    const handleGoBack = () => {
        setIsFading(true);
        setIsTalking(false);
        setTimeout(() => {
            navigate("/");
        }, 300);
    };

    const handleContainerClick = () => {
        clearInterval(intervalId.current);
        setTypedText(text);
        setIsTalking(false);
    };

    useEffect(() => {

        intervalId.current = setInterval(() => {
            if (i.current < text.length) {
                setIsTalking(true);
                setTypedText((typedText) => typedText + text.charAt(i.current));
                i.current++;
            } else {
                setIsTalking(false);
                clearInterval(intervalId.current);
            }
        }, 50);

        return () => {
            setIsTalking(false);
            clearInterval(intervalId.current);
        }
    }, []);

    return (
        <div className={`bio-container ${isFading && "slide-out"}`} onClick={handleContainerClick}>
            <h2>Bio</h2>
            <p>{typedText}</p>
            <button onClick={handleGoBack}>Back</button>
        </div>
    )
}

export default Bio;