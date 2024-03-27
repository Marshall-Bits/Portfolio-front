import './TalkingContainer.css';
import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { talkingContext } from '../context/talking.context';
import { soundContext } from '../context/sound.context';

import canvasButton from '../assets/canvas-button.webp';

import back from '../assets/back.mp3';
import talk01 from '../assets/talk01.mp3';
import talk02 from '../assets/talk02.mp3';

function TalkingContainer({ text }) {
    const { setIsTalking } = useContext(talkingContext);
    const { isMuted } = useContext(soundContext);
    const [isFading, setIsFading] = useState(false);
    const navigate = useNavigate();
    const [typedText, setTypedText] = useState('');
    const i = useRef(-2);
    const intervalId = useRef(null);

    const handleGoBack = () => {
        setIsFading(true);
        setIsTalking(false);
        const audio = new Audio(back);
        !isMuted && audio.play();
        setTimeout(() => {
            navigate("/");
        }, 300);
    };

    const handleContainerClick = () => {
        clearInterval(intervalId.current);
        setTypedText(text);
        setIsTalking(false);
    };

    const talk = () => {
        intervalId.current = setInterval(() => {
            if (i.current < text.length) {
                setIsTalking(true);
                setTypedText((typedText) => typedText + text.charAt(i.current));
                const audio = new Audio(Math.random() < 0.5 ? talk01 : talk02);
                if (text.charAt(i.current) !== " ") {
                    !isMuted && audio.play();
                } else {
                    audio.pause();
                }
                i.current++;
            } else {
                setIsTalking(false);
                clearInterval(intervalId.current);
            }
        }, 70);
    }

    useEffect(() => {
        talk();
        return () => {
            setIsTalking(false);
            clearInterval(intervalId.current);
        }
    }, []);

    return (
        <>
            <div className={`container ${isFading && "slide-out"}`} onClick={handleContainerClick}>
                <p className='typed-text'>{typedText}</p>
                <img src={canvasButton} alt="canvas" className="canvas-button" onClick={handleGoBack} />
            </div>
        </>
    )
}

export default TalkingContainer;