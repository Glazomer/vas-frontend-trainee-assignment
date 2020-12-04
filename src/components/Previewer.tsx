import React from 'react';

import { HandlePreviewerClick } from '../App';

export type PreviewerProps = {
  src: string;
  alt: string;
  title: string;
};

type ContainerProps = {
  index: number;
  onClick: HandlePreviewerClick;
  selected: boolean;
};

export default function Previewer({
  onClick,
  selected,
  index,
  title,
  src,
  alt,
}: PreviewerProps & ContainerProps) {
  return (
    <li
      className={
        'story-previewer-preview' +
        (selected ? ' story-previewer-preview_selected' : '')
      }
      onClick={(e) => onClick(index, 'select', e)}>
      <button
        className='story-previewer-delete-btn'
        onClick={(e) => onClick(index, 'delete', e)}>
        X
      </button>
      {src && <img className='story-previewer-image' src={src} alt={alt} />}
      <div className='story-previewer-title'>{title}</div>
    </li>
  );
}
