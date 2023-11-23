import { useSwiper } from 'swiper/react';
import { GrPrevious } from 'react-icons/gr';

const SlidePreviousButton = () => {
  const swiper = useSwiper();

  return (
    <button
      className="bg-slate-950 rounded-full p-2"
      onClick={() => swiper.slidePrev()}
    >
      <GrPrevious size={50} />
    </button>
  );
};

export default SlidePreviousButton;
