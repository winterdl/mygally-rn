import { useState } from 'react';
import ImagePicker from 'react-native-image-crop-picker';

const useImagePicker = (props = {}) => {
  const {width, height, cropping, multiple, onSuccess, onFail} = props;
  const [images , setImages] = useState([]); 
  const openImagePicker = () => {
    console.log('openImagePicker');
    ImagePicker.openPicker({
      width: 200,
      height: 300,
      cropping: true,
      multiple : true
    }).then((images) => {
      console.log(images); 
      setImages(prevState => [...prevState, ...images]); 
    });
  };

  return {openImagePicker, images, setImages};
};

export default useImagePicker;
