import React from 'react';
import { useSelector } from 'react-redux';
import { PreviewersState, useAppDispatch } from '../reducers/previewers';
import FileReaderAsync from '../func/FileReaderAsync';

export type InputChangeEvent = (
  event: React.ChangeEvent<HTMLInputElement>
) => void;

export default function Previewer({}: {}) {
  const dispatch = useAppDispatch(),
    { selected, previews } = useSelector<PreviewersState, PreviewersState>(
      (state) => state
    ),
    preview = previews[selected];

  const handleChange: InputChangeEvent = async ({ target }) => {
    let { type, name, value } = target;
    if (type === 'file') {
      value = await FileReaderAsync(target.files[0]);
      target.value = '';
    }
    // @ts-ignore
    dispatch({ type: 'EDIT', name, value });
  };

  return (
    <form>
      <input
        name='src'
        type='file'
        disabled={!(selected in previews)}
        onChange={handleChange}
      />
      <input
        name='alt'
        type='text'
        disabled={!(selected in previews)}
        value={preview && preview.alt}
        onChange={handleChange}
      />
      <input
        name='title'
        type='text'
        disabled={!(selected in previews)}
        value={preview && preview.title}
        onChange={handleChange}
      />
    </form>
  );
}
