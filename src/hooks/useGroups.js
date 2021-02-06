import React, { useEffect, useState } from 'react';
import { useDatabase } from 'contexts/DatabaseContext';

//hook for managing CRUD for groups
export const useGroups = () => {
  const [groupList, setGroupList] = useState([]);
  const db = useDatabase(); 

  useEffect(() => {
    getGroupList();
  },[]); 
  

  const getGroupList = () => {
    console.log('useGroups hook : getGroupList')
    return db.getAllGroups().then(setGroupList).catch((error) => ({ error }));
  };

  const createGroup = ({ title, icon }) => {
    console.log('useGroups hook : createGroup')
    return db.createGroup({ title, icon }).then(getGroupList).catch((error) => ({ error }));
  };

  return {
    groupList,
    getGroupList,
    createGroup,
  };
};
