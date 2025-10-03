
import pantman1 from '../assets/t-shirtwomen1.jpg';
import pantman2 from '../assets/t-shirtwomen2.jpg';
import pantman3 from '../assets/t-shirtwomen3.jpg';
import pantman4 from '../assets/t-shirtwomen4.jpg';

function Background({ heroCount }) {
  const images = [pantman1, pantman2, pantman3, pantman4];

  const baseImageStyle = "w-[55%] md:h-[80%]  float-right object-contain bg-white rounded-lg mt-[3%] p-2 mr-[5%] ";

  if (heroCount >= 0 && heroCount < images.length) {
    return <img src={images[heroCount]} alt="hero" className={baseImageStyle} />;
  }

  return null;
}

export default Background;
