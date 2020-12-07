import React, { MouseEvent } from 'react';
import { PreviewerActionType, useAppDispatch } from '../reducers/previewers';
import styles from './previewer.styles';

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

export default function Previewer({
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
      className={
        'story-previewer-preview previewer' +
        (selected ? ' previewer_selected' : '')
      }
      style={{ ...styles['story-previewer-preview'], background }}
      onClick={(e) => handleClick(e, { type: 'SELECT', select: index })}>
      <button
        className='previewer__btn previewer__btn_delete'
        onClick={(e) => handleClick(e, { type: 'DELETE' })}>
        X
      </button>
      <button
        className='previewer__btn previewer__btn_arrow previewer__btn_arrow-left'
        onClick={(e) => handleClick(e, { type: 'MOVE_LEFT' })}>
        {'<'}
      </button>
      <button
        className='previewer__btn previewer__btn_arrow previewer__btn_arrow-right'
        onClick={(e) => handleClick(e, { type: 'MOVE_RIGHT' })}>
        {'>'}
      </button>
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
    </li>
  );
}
