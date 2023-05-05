import { GameAttribute } from "../../model/GameAttribute";
import { getFieldValue } from "./actionForField";


export default  (data:any , key='home'):GameAttribute[] =>{
    console.log('game called')
    var arr:GameAttribute[] = [];
    
    if(!!data[key]){
        var oldAction = getFieldValue(key);
        for(var keyName in data[key]){
            
            if(oldAction[keyName] != 1){
                var isReject = oldAction[keyName] == -1;
                arr.push({
                    keyName: keyName,
                    value: data[key][keyName],
                    isReject: oldAction[keyName]??null,
                })
            }
            
        }
    }

    return arr;
}