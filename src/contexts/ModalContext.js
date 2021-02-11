import React, {useContext, useState} from 'react';
import {Modal} from 'components/common';

const ModalContext = React.createContext({
  component : null, 
  openModal : () => {},
  closeModal : () => {},
});

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({children}) => {
  const [component, setComponent] = useState(null);
  const [props, setProps] = useState({});

  const openModal = (component, props = {}) => {
    setComponent(component);
    setProps(props);
  };

  const closeModal = () => {
    setComponent(null);
  };

  return (
    <ModalContext.Provider value={{openModal, closeModal}}>
      {children}
      {component && (
        <Modal {...props}>
          {component}
        </Modal>
      )}
    </ModalContext.Provider>
  );
};
