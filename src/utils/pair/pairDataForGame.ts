import { Game } from "../../model/Game";

import { getFieldValue, getSubFieldValue } from "./actionForField";


const pairDataForGame = (data:any):Game[] =>{
    let games:Game[] = [];
    var isReject = getSubFieldValue('game', data.game.id)??0
    if(isReject>=0){
        let game:Game = {
            id: data.game.id,
            home: data.home.id,
            away: data.away.id,
            attendance: data.game.attendance,
            isReject: isReject
        }
        games.push(game);
    }
    
    return games;
}

// const pairDataForGame = (data:any):GameAttribute[] =>{
//     console.log('game called')
//     var arr:GameAttribute[] = []
//     if(!!data['game']){
//         const {game}= data;
//         var oldAction = getFieldValue('game');
//         for(var keyName in game){
//             if(oldAction[keyName] !== 1){
//                 // var isReject = oldAction[keyName] ===-1;
//                 arr.push({
//                     keyName: keyName,
//                     value: data['game'][keyName],
//                     isReject: oldAction[keyName]??null,
//                 })
//             }
//         }
//     }

//     return arr;
// }
export default pairDataForGame;