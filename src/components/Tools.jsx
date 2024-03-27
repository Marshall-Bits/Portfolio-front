import './Tools.css';
import { useEffect, useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import useImageLoader from '../hooks/useImageLoader';
import { soundContext } from '../context/sound.context';

import back from '../assets/back.mp3';
import win from '../assets/win.mp3';
import canvasButton from '../assets/canvas-button.webp';
import playerImage from '../assets/player.webp';
import playerWin from '../assets/player-win.webp';
import buttonL from '../assets/button-L.webp';
import buttonR from '../assets/button-R.webp';
import nodeLogo from '../assets/node-logo.webp';
import vueLogo from '../assets/vue-logo.webp';
import piniaLogo from '../assets/pinia-logo.webp';
import reactLogo from '../assets/react-logo.webp';
import reduxLogo from '../assets/redux-logo.webp';
import expressLogo from '../assets/express-logo.webp';
import csharpLogo from '../assets/csharp-logo.webp';
import unityLogo from '../assets/unity-logo.webp';

function Tools() {
    const [isFading, setIsFading] = useState(false);
    const [playerSprite, setPlayerSprite] = useState(playerImage);
    const [rewards, setRewards] = useState([]);
    const [playerStyle, setPlayerStyle] = useState({ bottom: 0, left: 0 });
    const [logoIndex, setLogoIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [displayedTechs, setDisplayedTechs] = useState([]);
    const [title, setTitle] = useState('Catch all the techs I know!');

    const { isMuted } = useContext(soundContext);

    const navigate = useNavigate();

    // use ref to keep track of the current states in the checkCollision function (inside a setInterval)
    const logoIndexRef = useRef(logoIndex);
    const displayedTechsRef = useRef(displayedTechs);
    const playerRef = useRef(null);
    const rewardRef = useRef(null);
    const gameCanvasRef = useRef(null);

    const logos = [nodeLogo, expressLogo, vueLogo, piniaLogo, reactLogo, reduxLogo, csharpLogo, unityLogo];
    const techs = ['Node.js', 'Express.js', 'Vue.js', 'Pinia', 'React.js', 'Redux', 'C#', 'Unity'];

    const loading = useImageLoader([...logos, playerImage, playerWin, canvasButton, buttonL, buttonR]);

    const handelWin = () => {
        setPlayerSprite(playerWin);
        const audio = new Audio(win);
        !isMuted && audio.play();
        setTimeout(() => {
            setPlayerSprite(playerImage);
        }, 300);
    };

    const checkCollision = () => {
        const player = playerRef.current.getBoundingClientRect();
        const rewardsElements = document.querySelectorAll('#game-canvas .reward');

        rewardsElements.forEach((reward) => {
            const rewardPosition = reward.getBoundingClientRect();
            if (
                player.x < rewardPosition.x + rewardPosition.width &&
                player.x + player.width > rewardPosition.x &&
                player.y < rewardPosition.y + rewardPosition.height &&
                player.y + player.height > rewardPosition.y
            ) {
                reward.remove();
                setScore((prevScore) => prevScore + 1);
                if (!displayedTechsRef.current.includes(techs[logoIndexRef.current])) {
                    setDisplayedTechs((prevTechs) => [...prevTechs, techs[logoIndexRef.current]]);
                }
                handelWin();
            }
        });
    }

    const renderRewards = () => {
        return rewards.map((reward) => (
            <div key={reward.id} style={{ position: 'absolute', bottom: `${reward.bottom}%`, left: `${reward.left}%` }}>
                <img ref={rewardRef} className='reward' src={logos[logoIndex]} alt="reward" />
            </div>
        ));
    };


    const movePlayer = (direction) => {
        const playerPercentageWidth = (playerRef.current.offsetWidth / gameCanvasRef.current.offsetWidth) * 100;

        setPlayerStyle((prevStyle) => {
            const newStyle = { ...prevStyle };
            let currentLeft = parseFloat(newStyle.left);

            if (direction === "left") {
                newStyle.transform = "scaleX(-1)";
                currentLeft = Math.max(0, currentLeft - 10);
            } else {
                newStyle.transform = "scaleX(1)";
                currentLeft = Math.min(100 - playerPercentageWidth, currentLeft + 10);
            }

            newStyle.left = `${currentLeft}%`;
            return newStyle;
        });

    };

    const handleGoBack = () => {
        setIsFading(true);
        const audio = new Audio(back);
        !isMuted && audio.play();
        setTimeout(() => {
            navigate("/");
        }, 300);
    };

    useEffect(() => {
        if (!loading) {
            const interval = setInterval(() => {
                setLogoIndex((currentIndex) => (currentIndex + 1) % logos.length);
                const rewardPercentageWidth = (50 / gameCanvasRef.current.offsetWidth) * 100;
                const newReward = {
                    id: Math.random(),
                    bottom: 100,
                    left: Math.random() * (100 - rewardPercentageWidth)
                };
                setRewards((currentRewards) => [...currentRewards, newReward]);
            }, 2000);

            return () => clearInterval(interval);
        }
    }, [loading]);

    useEffect(() => {
        if (!loading) {
            const interval = setInterval(() => {
                setRewards((currentRewards) =>
                    currentRewards.map((reward) => ({
                        ...reward,
                        bottom: reward.bottom - 5
                    })).filter((reward) => reward.bottom > -100)
                );
                checkCollision();
            }, 100);

            return () => clearInterval(interval);
        }
    }, [loading]);

    useEffect(() => {
        logoIndexRef.current = logoIndex;
    }, [logoIndex]);

    useEffect(() => {
        displayedTechsRef.current = displayedTechs;
    }, [displayedTechs]);

    useEffect(() => {
        switch (true) {
            case score >= 100:
                setScore(-9000);
                break;
            case score >= 70:
                setTitle("Ok that's annoying. You know I can manipulate your score right?");
                break;
            case score >= 60:
                setTitle("Literally, you can leave this open, touch nothing and your score will keep going up.");
                break;
            case score >= 50:
                setTitle("This is not a real game. You don't event lose lives or points.");
                break;
            case score >= 40:
                setTitle("Ok, you made your point. You're good at the easiest game in the world.");
                break;
            case score >= 30:
                setTitle("Seriously, you can stop now. There's no end.");
                break;
            case score >= 20:
                setTitle("I guess you've realized there's no end to this game...");
                break;
            case score >= 15:
                setTitle('Wait, are you still playing?');
                break;
            case score >= 8:
                setTitle('Well done! You caught all the techs!');
                break;
            case score < 0:
                setTitle('Hahaha! I told you!');
                break;
            default:
                break;
        }

    }, [score]);

    return (
        <div className={`container ${isFading && "slide-out"}`}>

            {loading ? <h2>Loading...</h2> :
                <>
                    <section ref={gameCanvasRef} id='game-canvas'>
                        <h3 className='score'>{title}</h3>
                        <h3 className='score'>Score: {score}</h3>
                        <ul>
                            {displayedTechs.map((tech, index) => <li key={index}>{tech}</li>)}
                        </ul>
                        {renderRewards()}
                        <img src={playerSprite} ref={playerRef} style={playerStyle} id='player' />
                    </section>
                    <img src={canvasButton} alt="go back button" className="canvas-button" onClick={handleGoBack} />
                    <img src={buttonL} onClick={() => movePlayer("left")} className='gamepad-L' />
                    <img src={buttonR} onClick={() => movePlayer("right")} className='gamepad-R' />
                </>
            }
        </div>
    );
}

export default Tools;