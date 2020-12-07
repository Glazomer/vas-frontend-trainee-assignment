import { createStore } from 'redux';
import { useDispatch } from 'react-redux';
import undoable from 'redux-undo';

import { PreviewerProps } from '../components/Previewer';

export type PreviewerType = PreviewerProps;
export type PreviewersState = {
  selected: number;
  previews: PreviewerType[];
};

export type SelectPreviewerActionType = 'SELECT';
export type EditPreviewerActionType = 'EDIT';

export type PreviewersActionTypes =
  | 'APPEND'
  | 'DELETE'
  | 'MOVE_LEFT'
  | 'MOVE_RIGHT';

export type OtherPreviewersAction = {
  type: PreviewersActionTypes;
};
export type SelectPreviewerAction = {
  type: SelectPreviewerActionType;
  select: number;
};
export type EditPreviewerAction = {
  type: EditPreviewerActionType;
  name: keyof PreviewerProps;
  value: string;
};

export type PreviewerActionType =
  | OtherPreviewersAction
  | SelectPreviewerAction
  | EditPreviewerAction;

const src =
    'data:image/webp;base64,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',
  defaultState: PreviewersState = {
    selected: 0,
    previews: [
      {
        alt: 'Sellers image',
        src,
        href: '',
        title: 'Продают собствен­ники',
        color1: '#E3E3E3',
        color2: '#E3E3E3',
      },
    ],
  };

let altId = 1;

const reducer = function (
  state: PreviewersState = defaultState,
  action: PreviewerActionType
): PreviewersState {
  const { selected, previews } = state,
    preview = previews[selected];
  switch (action.type) {
    case 'SELECT': {
      return {
        ...state,
        selected: action.select,
      };
    }
    case 'APPEND': {
      const newPreview = {
        src: '',
        alt: 'preview ' + altId++,
        href: '',
        title: '',
        color1: '#E3E3E3',
        color2: '#E3E3E3',
      };
      return {
        selected: selected || 0,
        previews: [...previews, newPreview],
      };
    }
    case 'DELETE': {
      if (
        (preview.src || preview.title) &&
        !confirm('Are you sure to delete that card?')
      ) {
        return state;
      }
      const newPreviews = [...previews];
      newPreviews.splice(selected, 1);

      let newSelected = selected;
      if (!(newSelected in newPreviews)) {
        newSelected = newPreviews.length && newPreviews.length - 1;
      }
      return {
        selected: newSelected,
        previews: newPreviews,
      };
    }
    case 'MOVE_LEFT':
    case 'MOVE_RIGHT': {
      const newSelected = selected + (action.type === 'MOVE_LEFT' ? -1 : 1);
      if (newSelected in state.previews) {
        const newPreviews = [...state.previews];
        newPreviews.splice(newSelected, 0, newPreviews.splice(selected, 1)[0]);
        return {
          selected: newSelected,
          previews: newPreviews,
        };
      }
      return state;
    }
    case 'EDIT': {
      const { name, value } = action,
        newPreviews = [...previews];

      newPreviews[selected] = { ...newPreviews[selected], [name]: value };
      return {
        selected,
        previews: newPreviews,
      };
    }
    default: {
      return state;
    }
  }
};

const store = createStore(reducer);
export type AppDispatch = typeof store.dispatch;

const useAppDispatch = () => useDispatch<AppDispatch>();

export { reducer, useAppDispatch, store };
