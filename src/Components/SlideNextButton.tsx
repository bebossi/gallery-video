import { useSwiper } from 'swiper/react';
import { GrNext } from 'react-icons/gr';

const SlideNextButton = () => {
  const swiper = useSwiper();

  return (
    <button
      className="bg-slate-950 rounded-full p-2"
      onClick={() => swiper.slideNext()}
    >
      <GrNext size={50} />
    </button>
  );
};

export default SlideNextButton;
