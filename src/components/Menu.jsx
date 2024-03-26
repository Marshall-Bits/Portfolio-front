import './Menu.css';
import Icon from './Icon';



function Menu({ icons }) {
    const { bioIcon, toolsIcon, cvIcon, ghIcon, inIcon } = icons;

    return (
        <section className='icons-container'>
            <Icon image={bioIcon} page="/bio" />
            <Icon image={toolsIcon} page="/tools" />
            <Icon image={cvIcon} page="/career" />
            <Icon image={ghIcon} url="https://github.com/Marshall-Bits" />
            <Icon image={inIcon} url="https://www.linkedin.com/in/marcel-bosch-developer/" />
        </section>
    );
}

export default Menu;