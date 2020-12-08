import React from 'react';
import { useSelector } from 'react-redux';

import CarouselList from './components/CarouselList';
import Previewer from './components/Previewer';
import AddPreviewer from './components/AddPreviewer';
import Form from './components/Form';

import { PreviewersState } from './reducers/previewers';

export default function App() {
  const { previews, selected } = useSelector<PreviewersState, PreviewersState>(
    (state) => state
  );

  return (
    <>
      <CarouselList>
        {previews.map((props, i) => (
          <Previewer key={i} index={i} selected={i === selected} {...props} />
        ))}
        <AddPreviewer />
      </CarouselList>
      <Form preview={previews[selected]} />
    </>
  );
}
