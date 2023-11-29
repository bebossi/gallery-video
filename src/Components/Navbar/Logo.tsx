import Image from 'next/image';
import logo from '../../public/logo.jpg';

const Logo = () => {
  return (
    <div>
      <Image
        className="rounded-full w-[6rem] h-[6rem] sm:h-[7rem] sm:w-[7rem] xl:w-[8rem] xl:h-[8rem]"
        src={logo}
        alt="Logo"
      />
    </div>
  );
};

export default Logo;
