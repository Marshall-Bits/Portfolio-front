import './Tools.css';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import canvasButton from '../assets/canvas-button.webp';
import playerImage from '../assets/player.webp';
import playerWin from '../assets/player-win.webp';
import buttonL from '../assets/button-L.webp';
import buttonR from '../assets/button-R.webp';
import back from '../assets/back.mp3';
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
    const navigate = useNavigate();
    const playerRef = useRef(null);
    const rewardRef = useRef(null);
    const gameCanvasRef = useRef(null);
    const logos = [nodeLogo, expressLogo, vueLogo, piniaLogo, reactLogo, reduxLogo, csharpLogo, unityLogo];

    const handelWin = () => {
        setPlayerSprite(playerWin);
        const audio = new Audio(back);
        audio.play();
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
                    handelWin();
                }
            });
        }
        
        useEffect(() => {
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
    }, []);

    useEffect(() => {
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
    }, []);

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
        audio.play();
        setTimeout(() => {
            navigate("/");
        }, 300);
    };

    return (
        <div className={`container ${isFading && "slide-out"}`}>

            <section ref={gameCanvasRef} id='game-canvas'>
                {renderRewards()}
                <img src={playerSprite} ref={playerRef} style={playerStyle} id='player' />
            </section>
            <img src={canvasButton} alt="go back button" className="canvas-button" onClick={handleGoBack} />
            <img src={buttonL} onClick={() => movePlayer("left")} className='gamepad-L' />
            <img src={buttonR} onClick={() => movePlayer("right")} className='gamepad-R' />
        </div>
    );
}

export default Tools;