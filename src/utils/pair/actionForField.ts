const KEY_FOR_LOCAL_STORAGE = 'disStatus';
export  const getData = () =>{
    return JSON.parse( localStorage.getItem(KEY_FOR_LOCAL_STORAGE)??'{}')
}

export const getFieldValue = (fieldName='key') =>{
    const oldData = getData();
    return oldData[fieldName]??{};
}

export const getSubFieldValue = (fieldName='key', subField ='2ndKey') =>{
    let fieldData = getFieldValue(fieldName);
    let subFieldValue = fieldData[subField];
    return subFieldValue;
}

export  const saveData = (key='key', value='') =>{
    const oldData = getData();
    oldData[key] = value;
    return localStorage.setItem(KEY_FOR_LOCAL_STORAGE, JSON.stringify(oldData));
}

export const resolveObject = (key ='key' , fieldName ='fieldName') =>{
    const oldData = getData();
    if(!oldData[key]) oldData[key] = {}
    oldData[key][fieldName] = 1;
    return localStorage.setItem(KEY_FOR_LOCAL_STORAGE, JSON.stringify(oldData));
}

export const rejectObject = (key ='key' , fieldName ='fieldName') =>{
    const oldData = getData();
    if(!oldData[key]) oldData[key] = {}
    oldData[key][fieldName] = -1;
    return localStorage.setItem(KEY_FOR_LOCAL_STORAGE, JSON.stringify(oldData));
}