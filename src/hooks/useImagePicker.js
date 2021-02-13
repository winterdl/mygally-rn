import ImagePicker from 'react-native-image-crop-picker';

const useImagePicker = (props = {}) => {
  const {width, height, cropping, multiple, onSuccess, onFail} = props;
  const openImagePicker = () => {
    console.log('openImagePicker');
    ImagePicker.openPicker({
      width: 200,
      height: 300,
      cropping: true,
      multiple : true
    }).then((images) => {
      console.log(images);
    });
  };

  return {openImagePicker};
};

export default useImagePicker;
