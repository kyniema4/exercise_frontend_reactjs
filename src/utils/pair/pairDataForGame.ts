import { GameAttribute } from "../../model/GameAttribute";


export default  (data:any):GameAttribute[] =>{
    console.log('game called')
    var arr:GameAttribute[] = []
    for(var key in data){
        if(key ==='home' || key==='away'){

            for(var keyName in data[key]){
                arr.push({
                    keyName: keyName,
                    value: data[key][keyName]
                })
            }

        }
    }

    return arr;
}