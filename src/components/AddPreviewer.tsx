import React, { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { PreviewerActionType } from '../reducers/previewers';
import styles from './previewer.styles';

export type HandleClick = (e: MouseEvent, action: PreviewerActionType) => void;

export default function ({}: {}) {
  const dispatch = useDispatch();
  const handleClick: HandleClick = (e, action) => {
    e.stopPropagation();
    dispatch(action);
  };
  return (
    <li
      className={'previewer previewer_blank'}
      onClick={(e) => handleClick(e, { type: 'APPEND' })}
      style={styles['story-previewer-preview']}></li>
  );
}
