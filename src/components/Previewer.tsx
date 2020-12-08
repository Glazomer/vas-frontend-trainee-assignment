import React, { MouseEvent } from 'react';
import { PreviewerActionType, useAppDispatch } from '../reducers/previewers';
import styles from './previewer.styles';
import left from '../media/left.svg';
import right from '../media/right.svg';
import cancel from '../media/cancel.svg';

export type PreviewerProps = {
  src: string;
  alt: string;
  href: string;
  title: string;
  color1: string;
  color2: string;
};

type ContainerProps = {
  index: number;
  selected: boolean;
};

export type HandleClick = (e: MouseEvent, action: PreviewerActionType) => void;

export default function ({
  selected,
  color1,
  color2,
  index,
  title,
  src,
  alt,
}: PreviewerProps & ContainerProps) {
  const background = `linear-gradient(${color1}, ${color2})`;
  const dispatch = useAppDispatch();

  const handleClick: HandleClick = (e, action) => {
    e.stopPropagation();
    dispatch(action);
  };

  return (
    <li
      className={'previewer' + (selected ? ' previewer_selected' : '')}
      style={{ ...styles['story-previewer-preview'], background }}
      onClick={(e) => handleClick(e, { type: 'SELECT', select: index })}>
      <button
        className='previewer__btn previewer__btn_delete'
        onClick={(e) => handleClick(e, { type: 'DELETE' })}>
        <img alt='✖' src={cancel} className='previewer__btn_img' />
      </button>
      <button
        className='previewer__btn previewer__btn_arrow previewer__btn_arrow-left'
        onClick={(e) => handleClick(e, { type: 'MOVE', step: -1 })}>
        <img alt='←' src={left} className='previewer__btn_img' />
      </button>
      <button
        className='previewer__btn previewer__btn_arrow previewer__btn_arrow-right'
        onClick={(e) => handleClick(e, { type: 'MOVE', step: 1 })}>
        <img alt='→' src={right} className='previewer__btn_img' />
      </button>
      <div
        style={{ ...styles['story-previewer-preview'], background }}
        className='story-previewer-preview'>
        {src && (
          <img
            className='story-previewer-image'
            style={styles['story-previewer-image']}
            src={src}
            alt={alt}
          />
        )}
        <div
          className='story-previewer-title'
          style={styles['story-previewer-title']}>
          {title}
        </div>
      </div>
    </li>
  );
}
