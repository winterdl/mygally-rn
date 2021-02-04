import React, {useState} from 'react';
import {useDatabase} from 'contexts/DatabaseContext';

//hook for managing CRUD for groups
export const useGroups = () => {
  const [groupList, setGroupList] = useState([]);
  const db = useDatabase();

  const getGroupList = () => {
    return db.getAllGroups().then(setGroupList);
  };

  const createGroup = ({title, icon}) => {
    return db.createGroup({title, icon}).then(getGroupList);
  };

  return {
    groupList,
    getGroupList,
    createGroup,
  };
};
