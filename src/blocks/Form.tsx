import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { PreviewersState, useAppDispatch } from '../reducers/previewers';
import FileReaderAsync from '../func/FileReaderAsync';

export type InputChangeEvent = (
  event: React.ChangeEvent<HTMLInputElement>
) => void;

let lastValue = '';

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

  useEffect(() => {
    const previewEl = document.querySelector(
        '.story-previewer-preview_selected .story-previewer-title'
      ),
      { height, lineHeight } = window.getComputedStyle(previewEl),
      lines = Math.floor(parseInt(height) / parseInt(lineHeight));
    console.log(height, lineHeight, lines);
    if (lines > 3) {
      alert('Подпись должна быть не длиннее 3ех строчек');
      dispatch({ type: 'EDIT', name: 'title', value: lastValue });
    } else {
      lastValue = preview.title;
    }
  }, [preview && preview.title]);

  return (
    <form>
      <div className='form'>
        <label htmlFor='title'>Выберете подпись:</label>
        <input
          id='title'
          name='title'
          type='text'
          placeholder='Подпись должна быть не длиннее 3ех строчек'
          disabled={!(selected in previews)}
          value={preview && preview.title}
          onChange={handleChange}
        />
        <label htmlFor='alt'>Опишите картинку:</label>
        <input
          id='alt'
          name='alt'
          type='text'
          disabled={!(selected in previews)}
          value={preview && preview.alt}
          onChange={handleChange}
        />
        <label className='form__btn' tabIndex={0}>
          Выберете картинку
          <input
            id='src'
            name='src'
            type='file'
            disabled={!(selected in previews)}
            onChange={handleChange}
            style={{ opacity: 0, width: 0 }}
            tabIndex={-1}
          />
        </label>
      </div>
    </form>
  );
}
