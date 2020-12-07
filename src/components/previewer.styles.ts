import { CSSProperties } from 'react';

const styles: { [key: string]: CSSProperties } = {
  'story-previewer-preview': {
    position: 'relative',
    display: 'inline-block',
    height: '188px',
    width: '141px',
    margin: '5px 10px',
    borderRadius: '13px',
    cursor: 'pointer',
  },

  'story-previewer-image': {
    position: 'absolute',
    top: '0',
    left: '0',
    borderRadius: '8px',
    width: '141px',
    height: '188px',
  },

  'story-previewer-title': {
    position: 'absolute',
    left: '0',
    bottom: '16px',
    width: '100%',
    boxSizing: 'border-box',
    padding: '0 11px 0 14px',
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '21px',
    color: '#fff',
    textAlign: 'left',
    whiteSpace: 'pre-line',
    wordWrap: 'break-word',
    fontFamily: "Arial, 'Helvetica Neue', Helvetica, sans-serif",
  },
};

export default styles;
