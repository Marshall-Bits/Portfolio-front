import './Menu.css';
import Icon from './Icon';
import bioIcon from '../assets/bio-icon.webp';
import toolsIcon from '../assets/tools-icon.webp';
import cvIcon from '../assets/cv-icon.webp';
import ghIcon from '../assets/gh-icon.webp';
import inIcon from '../assets/in-icon.webp';

function Menu() {

    return (
        <>
            <section className='icons-container'>
                <Icon image={bioIcon} page="/bio" />
                <Icon image={toolsIcon} page="/tools" />
                <Icon image={cvIcon} page="/career" />
                <Icon image={ghIcon} url="https://github.com/Marshall-Bits" />
                <Icon image={inIcon} url="https://www.linkedin.com/in/marcel-bosch-developer/" />
            </section>
        </>
    );
}

export default Menu;