import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store';
import { Form } from './form';
import { Uploader } from './uploader';
import { ActiveScreenType } from 'src/shared/enums/ActiveScreenType';
import { deleteDocument, getData } from 'src/store/list';
import { DeleteIcon } from 'src/components/icons/delete';

const Main = (): JSX.Element => {
  const [activeScreen, setActiveScreen] = useState<ActiveScreenType>(
    ActiveScreenType.List
  );
  const { data } = useAppSelector(state => state.list);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getData());
  }, []);

  const onChangeScreen = (screen: ActiveScreenType) => {
    setActiveScreen(screen);
  };

  const switchToUploader = () => {
    setActiveScreen(ActiveScreenType.Uploader);
  };

  const onDeleteDocument = (url: string) => {
    dispatch(deleteDocument({ url }));
  };

  return (
    <div className='flex flex-col items-start jsutify-center'>
      <div className='flex flex-row items-center text-white-primary'>
        <span className='p-2 bg-blue-light rounded cursor-pointer'>
          1 | Uploading
        </span>
        <span className='bg-blue-secondary py-2 px-2 ml-2 rounded cursor-pointer'>
          2
        </span>
        <span className='bg-blue-secondary py-2 px-2 ml-2 rounded cursor-pointer'>
          3
        </span>
      </div>
      <div className='flex flex-col w-[848px] min-h-[580px] items-center justify-between bg-blue-secondary mt-2 rounded'>
        {activeScreen === ActiveScreenType.Form ? (
          <Form setActiveScreen={onChangeScreen} />
        ) : activeScreen === ActiveScreenType.Uploader ? (
          <Uploader setActiveScreen={onChangeScreen} />
        ) : (
          <div className='flex flex-col w-full px-8 pt-8 pb-4'>
            <div className='flex flex-row items-center justify-between'>
              <span className='text-xl font-semibold text-gray-primary '>
                Upload from URL
              </span>
              <button
                className='bg-blue-secondary text-gray-newButton font-semibold px-4 py-2 border border-gray-newButtonBorder rounded'
                onClick={switchToUploader}
              >
                New
              </button>
            </div>
            <div className='flex flex-col mt-6 h-[500px] overflow-auto'>
              {data.map(el => (
                <div
                  className='flex flex-row items-center justify-between bg-blue-light p-6 my-2 rounded cursor-pointer'
                  key={el.url}
                >
                  <span>{el.name} </span>
                  <DeleteIcon onClick={() => onDeleteDocument(el.url)} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export { Main };
