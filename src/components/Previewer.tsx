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
        className='btn__previewer btn__previewer_delete'
        onClick={(e) => onClick(index, 'delete', e)}>
        X
      </button>
      <button
        className='btn__previewer btn__previewer_arrow btn__previewer_arrow-left'
        onClick={(e) => onClick(index, 'move-left', e)}>
        {'<'}
      </button>
      <button
        className='btn__previewer btn__previewer_arrow btn__previewer_arrow-right'
        onClick={(e) => onClick(index, 'move-right', e)}>
        {'>'}
      </button>
      {src && <img className='story-previewer-image' src={src} alt={alt} />}
      <div className='story-previewer-title'>{title}</div>
    </li>
  );
}
