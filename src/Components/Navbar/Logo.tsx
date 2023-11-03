import Image from 'next/image';
import logo from '../../public/logo.jpg';

const Logo = () => {
  return (
    <div>
      <Image
        className="rounded-full m-2 ml-12"
        width={90}
        height={90}
        src={logo}
        alt="Logo"
      />
    </div>
  );
};

export default Logo;
