import React, { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { PreviewerActionType } from '../reducers/previewers';

export type HandleClick = (e: MouseEvent, action: PreviewerActionType) => void;

export default function Previewer({}: {}) {
  const dispatch = useDispatch();
  const handleClick: HandleClick = (e, action) => {
    e.stopPropagation();
    dispatch(action);
  };
  return (
    <li
      className={'story-previewer-preview story-previewer-preview_blank'}
      onClick={(e) => handleClick(e, { type: 'APPEND' })}></li>
  );
}
