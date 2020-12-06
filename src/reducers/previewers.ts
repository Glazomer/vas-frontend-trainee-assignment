import undoable from 'redux-undo';

export type Previewer = {
  src: string;
  alt: string;
  title: string;
};
export type Previewers = {
  selected: number;
  previews: Previewer[];
};

export type SelectPreviewerActionType = 'SELECT';

export type PreviewersActionTypes =
  | 'APPEND'
  | 'DELETE'
  | 'MOVE_LEFT'
  | 'MOVE_RIGHT';

export type PreviewersAction = {
  type: PreviewersActionTypes;
};
export type SelectPreviewerAction = {
  type: SelectPreviewerActionType;
  select: number;
};

function previewers(
  state: Previewers,
  action: PreviewersAction | SelectPreviewerAction
): Previewers {
  switch (action.type) {
    case 'SELECT': {
      return {
        ...state,
        selected: action.select,
      };
    }
    case 'APPEND': {
      const newPreview = { src: '', alt: '', title: '' };
      return {
        ...state,
        previews: [...state.previews, newPreview],
      };
    }
    case 'DELETE': {
      const previews = [...state.previews];
      previews.splice(state.selected, 1);

      let { selected } = state;
      if (selected >= previews.length) {
        selected = previews.length - 1;
      }
      return {
        selected,
        previews,
      };
    }
    case 'MOVE_LEFT':
    case 'MOVE_RIGHT': {
      const selected = state.selected + (action.type === 'MOVE_LEFT' ? -1 : 1);
      if (selected in state.previews) {
        const previews = [...state.previews];
        previews.splice(selected, 0, previews.splice(state.selected, 1)[0]);
        return {
          selected,
          previews,
        };
      }
    }
    default: {
      return state;
    }
  }
}

export default undoable(previewers);
