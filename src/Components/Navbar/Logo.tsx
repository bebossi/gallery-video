import Image from 'next/image';
import logo from '../../public/logo.jpg';

const Logo = () => {
  return (
    <div>
      <Image className="rounded-full w-14 h-14" src={logo} alt="Logo" />
    </div>
  );
};

export default Logo;
