import { useStoreEffects } from '../useStoreEffects';

const Layout = ({
  children
}: {
  children: JSX.Element[] | JSX.Element;
}): JSX.Element => {
  useStoreEffects();

  return (
    <div className='bg-blue-primary p-8 flex justify-center w-full items-center'>
      {children}
    </div>
  );
};

export { Layout };
