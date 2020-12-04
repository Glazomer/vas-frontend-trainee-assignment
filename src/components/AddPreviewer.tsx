import React from 'react';

import { HandlePreviewerClick } from '../App';

type ContainerProps = {
  onClick: HandlePreviewerClick;
};

export default function Previewer({ onClick }: ContainerProps) {
  return (
    <li
      className={'story-previewer-preview story-previewer-preview_blank'}
      onClick={(e) => onClick(-1, 'append', e)}></li>
  );
}
