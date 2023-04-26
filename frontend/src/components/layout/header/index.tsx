import { LogoIcon } from 'src/components/icons/logo';

const Header = (): JSX.Element => (
  <div className='w-full flex h-16 justify-center items-center bg-blue-primary border-b border-blue-border'>
    <LogoIcon />
  </div>
);

export { Header };
