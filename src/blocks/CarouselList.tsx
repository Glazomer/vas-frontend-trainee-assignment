import React from 'react';

export type Props = { children: React.ReactNode };
export default function ({ children, ...props }: Props) {
  return (
    <div className='carousel-content'>
      <ul className='carousel-list'>{children}</ul>
    </div>
  );
}
