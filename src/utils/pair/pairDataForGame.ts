import { GameAttribute } from "../../model/GameAttribute";


export default  (data:any):GameAttribute[] =>{
    console.log('game called')
    var arr:GameAttribute[] = []
    if(!!data['game']){
        const {game}= data;
        console.log('game',game)
        for(var key of game){
            arr.push({
                keyName: key,
                value: game[key]
            })
        }
    }

    return arr;
}