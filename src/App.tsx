import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import CarouselList from './blocks/CarouselList';
import Previewer from './components/Previewer';
import AddPreviewer from './components/AddPreviewer';
import Form from './blocks/Form';

import { PreviewersState } from './reducers/previewers';

export default function App() {
  const { previews, selected } = useSelector<PreviewersState, PreviewersState>(
    (state) => state
  );

  // useEffect(
  //   () =>
  //     (window.onbeforeunload = () => 'Are you sure you want to navigate away?'),
  //   []
  // );
  return (
    <>
      <CarouselList>
        {previews.map((props, i) => (
          <Previewer key={i} index={i} selected={i === selected} {...props} />
        ))}
        <AddPreviewer />
      </CarouselList>
      <Form />
    </>
  );
}
