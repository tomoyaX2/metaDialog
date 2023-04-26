import { useRef, ChangeEvent } from 'react';
import { FileIcon } from 'src/components/icons/file';
import { InfoIcon } from 'src/components/icons/info';
import { LinkIcon } from 'src/components/icons/link';
import { ActiveScreenType } from 'src/shared/enums/ActiveScreenType';
import { useAppDispatch } from 'src/store';
import { uploadFile } from 'src/store/list';

const Uploader = ({
  setActiveScreen
}: {
  setActiveScreen: (screen: ActiveScreenType) => void;
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    dispatch(uploadFile({ file }));
    setActiveScreen(ActiveScreenType.List);
  };

  const onClickUploader = () => {
    setActiveScreen(ActiveScreenType.Uploader);
    inputRef.current?.click();
  };

  const onClickUrl = () => {
    setActiveScreen(ActiveScreenType.Form);
  };
  return (
    <>
      <input
        type='file'
        ref={inputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <div className='flex flex-col items-center justify-center mt-[72px]'>
        <span className='text-xl font-semibold text-gray-primary '>
          Document Uploader
        </span>
        <div className='mt-6 flex flex-row px-32'>
          <div
            className='w-[338px] h-[334px] flex items-center justify-center bg-blue-light cursor-pointer rounded'
            onClick={onClickUploader}
          >
            <FileIcon />
            <span className='text-gray-primary font-semibold'>
              Upload from File
            </span>
          </div>
          <div
            className='w-[338px] h-[334px] flex items-center justify-center bg-blue-light ml-2 cursor-pointer rounded'
            onClick={onClickUrl}
          >
            <LinkIcon />
            <span className='text-gray-primary font-semibold'>
              Upload from URL
            </span>
          </div>
        </div>
      </div>
      <div className='flex flex-row px-4 bg-purple-secondary items-center justify-start w-full rounded-b h-6'>
        <InfoIcon />{' '}
        <span className='text-purple-primary font-semibold ml-2 text-sm'>
          File type: pdf, word, txt (20MB max)
        </span>
      </div>
    </>
  );
};

export { Uploader };
