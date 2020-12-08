import React, { useCallback } from 'react';
import { useAppDispatch } from '../reducers/previewers';
import fileReaderAsync from '../func/fileReaderAsync';
import { toPng } from 'html-to-image';
import execCopyCommand from '../func/execCopyCommand';

import { PreviewerProps } from './Previewer';

import cancel from '../media/cancel.svg';

export type InputChangeEvent = (
  event: React.ChangeEvent<HTMLInputElement>
) => void;

export default function ({ preview }: { preview: PreviewerProps | undefined }) {
  const dispatch = useAppDispatch();

  const handleInputChange: InputChangeEvent = useCallback(
    async ({ target }) => {
      const { type, name } = target;
      let { value } = target;
      if (type === 'file') {
        value = await fileReaderAsync(target.files[0]);
        target.value = '';
      }
      // @ts-ignore
      dispatch({ type: 'EDIT', name, value });
    },
    [dispatch]
  );

  const deleteSrc = useCallback(() => {
    dispatch({ type: 'EDIT', name: 'src', value: '' });
  }, [dispatch]);

  const handleGetString = useCallback(
    (format: 'json' | 'html') => {
      const selectedEl = document.querySelector(
        '.previewer_selected .story-previewer-preview'
      );
      if (selectedEl) {
        if (format === 'html') {
          const html = selectedEl.outerHTML;
          const href = preview.href.trim().replace(/"/g, '\\"');
          execCopyCommand(href ? `<a href="${href}">${html}</a>` : html);
        } else {
          execCopyCommand(JSON.stringify(preview || ''));
        }
      }
    },
    [preview]
  );

  const handleDownloadPNG = useCallback(async () => {
    const link = document.createElement('a');
    const card = document.querySelector(
      '.previewer_selected .story-previewer-preview'
    );
    if (card) {
      link.download = 'card.png';
      link.href = await toPng(card as HTMLElement);
      link.click();
    }
  }, []);

  return (
    <form>
      <div className='form'>
        <input
          name='title'
          type='text'
          placeholder='Введите подпись не длиннее 3 строчек'
          disabled={!preview}
          value={preview && preview.title}
          onChange={handleInputChange}
          className='form__input'
        />
        <input
          name='alt'
          type='text'
          placeholder='Введите описание картинки (нужно если картинка не прогрузится)'
          disabled={!preview}
          value={preview && preview.alt}
          onChange={handleInputChange}
          className='form__input'
        />
        <input
          name='href'
          type='text'
          placeholder='Введите cсылку для карточки или оставьте поле пустым'
          disabled={!preview}
          value={preview && preview.href}
          onChange={handleInputChange}
          className='form__input'
        />
        <div className='form__file'>
          <label className='form__btn' tabIndex={0}>
            Выберите картинку
            <input
              name='src'
              type='file'
              disabled={!preview}
              onChange={handleInputChange}
              style={{ opacity: 0, width: 0 }}
              tabIndex={-1}
            />
          </label>
          <button
            type='button'
            className='form__btn form__btn_delete'
            disabled={!preview}
            onClick={deleteSrc}>
            <img alt='X' src={cancel} className='form__btn_img' />
          </button>
        </div>
        <div className='form__color'>
          <label htmlFor='color1'>Color1:</label>
          <input
            type='color'
            id='color1'
            name='color1'
            disabled={!preview}
            value={preview && preview.color1}
            onChange={handleInputChange}
            className='form__color-input'
          />
          <label htmlFor='color2'>Color2:</label>
          <input
            type='color'
            id='color2'
            name='color2'
            disabled={!preview}
            value={preview && preview.color2}
            onChange={handleInputChange}
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
      </div>
    </form>
  );
}
