const KEY_FOR_LOCAL_STORAGE = 'disStatus';
export  const getData = () =>{
    return JSON.parse( localStorage.getItem(KEY_FOR_LOCAL_STORAGE)??'{}')
}

export const getFieldValue = (fieldName='key') =>{
    const oldData = getData();
    return oldData[fieldName];
}

export  const saveData = (key='key', value='') =>{
    const oldData = getData();
    oldData[key] = value;
    return localStorage.setItem(KEY_FOR_LOCAL_STORAGE, JSON.stringify(oldData));
}