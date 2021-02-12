import React, {useState, useRef} from 'react';

export const useReferredState = (initValue) => {
  const [state, setState] = useState(initValue);
  const ref = useRef(state); //create a ref referring to current state

  //update state and ref with updated value
  const setReferredState = (value) => {
    setState(value);
    ref.current = value;
  };

  return [state, ref, setReferredState];
};

