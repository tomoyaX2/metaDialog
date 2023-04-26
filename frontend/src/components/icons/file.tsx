import type { IconProps } from './icons.props';

export const FileIcon = (props: IconProps): JSX.Element => (
  <svg
    width='40'
    height='40'
    viewBox='0 0 40 40'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M21.667 3.33325H10.0003C9.11627 3.33325 8.26842 3.68444 7.6433 4.30956C7.01818 4.93468 6.66699 5.78253 6.66699 6.66659V33.3333C6.66699 34.2173 7.01818 35.0652 7.6433 35.6903C8.26842 36.3154 9.11627 36.6666 10.0003 36.6666H30.0003C30.8844 36.6666 31.7322 36.3154 32.3573 35.6903C32.9825 35.0652 33.3337 34.2173 33.3337 33.3333V14.9999L21.667 3.33325Z'
      stroke='#7BB3F8'
      strokeWidth='3.33333'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M21.667 3.33325V14.9999H33.3337'
      stroke='#7BB3F8'
      strokeWidth='3.33333'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
