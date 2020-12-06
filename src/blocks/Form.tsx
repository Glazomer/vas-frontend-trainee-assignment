import React from 'react';
import { PreviewerProps } from '../components/Previewer';

export type InputChangeEvent = (
  event: React.ChangeEvent<HTMLInputElement>
) => void;
type Props = PreviewerProps & { handleInputChange: InputChangeEvent };

export default function Previewer({ handleInputChange, alt, title }: Props) {
  return (
    <form>
      <input name='src' type='file' onChange={handleInputChange} />
      <input name='alt' type='text' value={alt} onChange={handleInputChange} />
      <input
        name='title'
        type='text'
        value={title}
        onChange={handleInputChange}
      />
    </form>
  );
}
