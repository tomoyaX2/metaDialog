import './style.css';

const SideText = (): JSX.Element => {
  return (
    <div className='flex flex-col items-center justify-center w-[352px] ml-[88px]'>
      <h1 className='gradient text-3xl font-bold'>
        Contrary to popular belief, Lorem Ipsum is not simply random text.
      </h1>
      <span className='mt-4 text-gray-secondary'>
        It has roots in a piece of classical Latin literature from 45 BC, making
        it over 2000 years old. Richard McClintock, a Latin professor at
        Hampden-Sydney.
      </span>
    </div>
  );
};

export { SideText };
