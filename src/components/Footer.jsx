import './Footer.css';
import bgLeft from '../assets/bg-mob-bottom-left.webp';
import bgRight from '../assets/bg-mob-bottom-right.webp';

function Footer() {
  return (
    <footer>
      <img src={bgLeft} alt="bg-left" className="bg-left" />
      <img src={bgRight} alt="bg-right" className="bg-right" />
    </footer>
  );
};

export default Footer;