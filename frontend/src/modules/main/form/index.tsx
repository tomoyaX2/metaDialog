import { useState } from 'react';
import { LinkIcon } from 'src/components/icons/link';

import { useAppDispatch } from 'src/store';
import { sendUrlData } from 'src/store/list';
interface FormData {
  name: string;
  url: string;
}
const Form = () => {
  const [formData, setFormData] = useState<FormData>({ name: '', url: '' });
  const dispatch = useAppDispatch();

  const isActiveButton = formData.name && formData.url;

  const onSubmit = () => {
    if (isActiveButton) {
      dispatch(sendUrlData(formData));
    }
  };

  const handleChangeFormDataField = (value: string, name: string) => {
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div className='flex flex-col items-center justify-center mt-[132px]'>
      <span className='text-xl font-semibold text-gray-primary '>
        Upload from URL
      </span>
      <div className='flex flex-col mt-6'>
        <div className='flex flex-col items-start justify-start'>
          <label className='text-input-label'>
            Name <span className='text-red-primary'>*</span>
          </label>
          <input
            onChange={e => handleChangeFormDataField(e.target.value, 'name')}
            className='w-[311px] border border-blue-border h-10 outline-none px-4 bg-blue-secondary text-gray-primary rounded'
          />
        </div>
      </div>
      <div className='flex flex-col mt-6'>
        <div className='flex flex-row items-start justify-start'>
          <div className='h-10 w-16 flex items-center justify-center bg-blue-url rounded-l'>
            <LinkIcon width='22' height='22' />
            <span className='text-input-label'>URL</span>
          </div>
          <input
            className='w-[247px] border border-blue-border h-10 outline-none px-4 bg-blue-secondary text-gray-primary rounded-r'
            placeholder='https://'
            onChange={e => handleChangeFormDataField(e.target.value, 'url')}
          />
        </div>
      </div>

      <button
        onClick={onSubmit}
        className={` w-[311px] mt-7 h-10 rounded ${
          isActiveButton
            ? 'bg-button-active text-white-primary '
            : ' bg-button-inactive text-gray-inactiveButton'
        }`}
      >
        Submit
      </button>
    </div>
  );
};

export { Form };
