import { GameAttribute } from "../../model/GameAttribute";


export default  (data:any , key='home'):GameAttribute[] =>{
    console.log('game called')
    var arr:GameAttribute[] = []
    if(!!data[key]){
        for(var keyName in data[key]){
            arr.push({
                keyName: keyName,
                value: data[key][keyName]
            })
        }
    }

    return arr;
}