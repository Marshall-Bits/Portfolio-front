import './Menu.css';
import Icon from './Icon';
import { useState } from 'react';



function Menu({ icons }) {
    const [isFading, setIsFading] = useState(false);
    const { bioIcon, toolsIcon, cvIcon, ghIcon, inIcon } = icons;

    return (
        <section className={`icons-container ${isFading && "slide-out"}`}>
            <Icon setIsFading={setIsFading} image={bioIcon} page="/bio" />
            <Icon setIsFading={setIsFading} image={toolsIcon} page="/tools" />
            <Icon setIsFading={setIsFading} image={cvIcon} page="/career" />
            <Icon setIsFading={setIsFading} image={ghIcon} url="https://github.com/Marshall-Bits" />
            <Icon setIsFading={setIsFading} image={inIcon} url="https://www.linkedin.com/in/marcel-bosch-developer/" />
        </section>
    );
}

export default Menu;