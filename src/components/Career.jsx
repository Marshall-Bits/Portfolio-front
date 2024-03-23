import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Bio.css';
import { talkingContext } from '../context/talking.context';
import { useContext } from 'react';
import talk01 from '../assets/talk01.mp3';
import talk02 from '../assets/talk02.mp3';
import back from '../assets/back.mp3';

function Career() {
    const { setIsTalking } = useContext(talkingContext);
    const [isFading, setIsFading] = useState(false);
    const navigate = useNavigate();
    const [typedText, setTypedText] = useState('');
    const text = "I made my first website at the age of 15, then I started using tools like Flash or Dreamweaver, I've worked on a variety of projects, from alexa apps to the Volkswagen Spain website. After that I started teaching at Ironhack, fostering the next generation of developers. ";
    const i = useRef(0);
    const intervalId = useRef(null);
    
    const handleGoBack = () => {
        setIsFading(true);
        setIsTalking(false);
        const audio = new Audio(back);
        audio.play();
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
                const audio = new Audio(Math.random() < 0.5 ? talk01 : talk02);
                if(text.charAt(i.current) !== " "){
                    audio.play();
                    
                }else{
                    audio.pause();
                }
                
                i.current++;
            } else {
                setIsTalking(false);
                clearInterval(intervalId.current);
            }
        }, 70);

        return () => {
            setIsTalking(false);
            clearInterval(intervalId.current);
        }
    }, []);

    return (
        <div className={`container ${isFading && "slide-out"}`} onClick={handleContainerClick}>
            <h2>Career</h2>
            <p>{typedText}</p>
            <button className='btn' onClick={handleGoBack}>Back</button>
        </div>
    )
}

export default Career;