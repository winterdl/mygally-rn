import React, {useEffect, useState} from 'react';
import {useDatabase} from 'contexts/DatabaseContext';

export const usePosts = (groupId) => {
  const [postList, setPostList] = useState([]);
  const db = useDatabase();

  useEffect(() => {
    getPostList(groupId);
  }, []);

  const getPostList = (groupId) => {
    console.log('usePosts hook : getPostList');
    return db
      .getAllPosts(groupId)
      .then(setPostList)
      .catch((error) => ({error}));
  };

  const createPost = (params) => {
    console.log('usePosts hook : createPost');
    return db
      .createPost(params)
      .then(() => {
        getPostList();
        return {error: null};
      })
      .catch((error) => ({error}));
  };

  const updatePost = (params) => {
    console.log('usePosts hook : updatePost', params);
    return db
      .updatePost(params)
      .then(() => {
        getPostList();
        return {error: null};
      })
      .catch((error) => ({error}));
  };

  return {
    postList,
    getPostList,
    createPost,
    updatePost
  };
};
