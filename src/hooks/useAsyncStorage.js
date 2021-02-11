// set/get item from async storage
import AsyncStorage from '@react-native-community/async-storage';

const useAsyncStorage = () => {
  const getItem = (key) => {
    if (!key) Promise.reject('Key is null');

    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(key, (err, result) => {
        if (err) reject(err);

        resolve(JSON.parse(result));
      });
    });
  };

  const setItem = (key, value) => {
    if (!key) Promise.reject('Key is null');

    return new Promise((resolve, reject) => {
      AsyncStorage.setItem(key, JSON.stringify(value), (error) => {
        if (error) reject(error);

        resolve('Added item to async storage.');
      });
    });
  };

  const removeItem = (key) => {
    if (!key) Promise.reject('Key is null');

    AsyncStorage.removeItem(key);
  };

  return {
    getItem,
    setItem,
    removeItem,
  };
};

export {useAsyncStorage};
