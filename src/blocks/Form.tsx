import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { PreviewersState, useAppDispatch } from '../reducers/previewers';
import FileReaderAsync from '../func/FileReaderAsync';
import { toPng } from 'html-to-image';

export type InputChangeEvent = (
  event: React.ChangeEvent<HTMLInputElement>
) => void;

let lastValue = '';

export default function Previewer({}: {}) {
  const [html, setHtml] = useState(''),
    dispatch = useAppDispatch(),
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
    },
    deleteSrc = () => {
      dispatch({ type: 'EDIT', name: 'src', value: '' });
    };

  const handleGetString = (format: 'json' | 'html') => {
    const el = document.getElementById(
      'form__' + format
    ) as HTMLTextAreaElement;
    el.focus();
    el.select();
    document.execCommand('copy');
  };

  const handleDownloadPNG = async () => {
    const link = document.createElement('a'),
      card = document.querySelector(
        '.previewer_selected .story-previewer-preview'
      );
    link.download = 'card.png';
    link.href = await toPng(card as HTMLElement);
    link.click();
  };

  useEffect(() => {
    const selected = document.querySelector(
      '.previewer_selected .story-previewer-title'
    );

    if (selected) {
      const { height, lineHeight } = window.getComputedStyle(selected),
        lines = Math.floor(parseInt(height) / parseInt(lineHeight));

      if (lines > 3) {
        alert('Подпись должна быть не длиннее 3ех строчек');
        dispatch({ type: 'EDIT', name: 'title', value: lastValue });
      } else {
        lastValue = preview.title;
      }
    }
  }, [preview && preview.title]);

  useEffect(() => {
    const selectedEl = document.querySelector(
      '.previewer_selected .story-previewer-preview'
    );
    if (selectedEl) {
      const selectedHtml = selectedEl.outerHTML,
        href = preview.href.trim(),
        anchor = (html: string) =>
          `<a href="${href.replace(/"/g, '\\"')}">${html}</a>`;
      setHtml(href ? anchor(selectedHtml) : selectedHtml);
    } else {
      setHtml('');
    }
  }, [preview]);

  return (
    <form>
      <div className='form'>
        <input
          name='title'
          type='text'
          placeholder='Введите подпись не длиннее 3ех строчек'
          disabled={!(selected in previews)}
          value={preview && preview.title}
          onChange={handleChange}
          className='form__input'
        />
        <input
          name='alt'
          type='text'
          placeholder='Введите описание картинки (нужно если картинка не прогрузится)'
          disabled={!(selected in previews)}
          value={preview && preview.alt}
          onChange={handleChange}
          className='form__input'
        />
        <input
          name='href'
          type='text'
          placeholder='Введите cсылку для карточки или оставьте поле пустым'
          disabled={!(selected in previews)}
          value={preview && preview.href}
          onChange={handleChange}
          className='form__input'
        />
        <div className='form__file'>
          <label className='form__btn' tabIndex={0}>
            Выберете картинку
            <input
              name='src'
              type='file'
              disabled={!(selected in previews)}
              onChange={handleChange}
              style={{ opacity: 0, width: 0 }}
              tabIndex={-1}
            />
          </label>
          <button
            type='button'
            className='form__btn form__btn_delete'
            disabled={!(selected in previews)}
            onClick={deleteSrc}>
            X
          </button>
        </div>
        <div className='form__color'>
          <label htmlFor='color1'>Color1:</label>
          <input
            type='color'
            id='color1'
            name='color1'
            disabled={!(selected in previews)}
            value={preview && preview.color1}
            onChange={handleChange}
            className='form__color-input'
          />
          <label htmlFor='color2'>Color2:</label>
          <input
            type='color'
            id='color2'
            name='color2'
            disabled={!(selected in previews)}
            value={preview && preview.color2}
            onChange={handleChange}
            className='form__color-input'
          />
        </div>
        <hr />
        <button
          type='button'
          className='form__btn'
          onClick={() => handleGetString('json')}>
          Скопировать как JSON
        </button>
        <button
          type='button'
          className='form__btn'
          onClick={() => handleGetString('html')}>
          Скопировать как HTML
        </button>
        <button type='button' className='form__btn' onClick={handleDownloadPNG}>
          Сохранить как PNG
        </button>
        <textarea
          id='form__json'
          className='form__input'
          value={JSON.stringify(preview || '')}
          rows={10}
          readOnly
        />
        <textarea
          id='form__html'
          className='form__input'
          value={html}
          rows={10}
          readOnly
        />
      </div>
    </form>
  );
}
