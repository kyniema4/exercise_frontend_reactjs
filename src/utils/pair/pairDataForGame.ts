import { GameAttribute } from "../../model/GameAttribute";
import { getFieldValue } from "./actionForField";


const pairDataForGame = (data:any):GameAttribute[] =>{
    console.log('game called')
    var arr:GameAttribute[] = []
    if(!!data['game']){
        const {game}= data;
        var oldAction = getFieldValue('game');
        for(var keyName in game){
            if(oldAction[keyName] !== 1){
                // var isReject = oldAction[keyName] ===-1;
                arr.push({
                    keyName: keyName,
                    value: data['game'][keyName],
                    isReject: oldAction[keyName]??null,
                })
            }
        }
    }

    return arr;
}
export default pairDataForGame;