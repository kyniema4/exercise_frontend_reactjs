import { GameAttribute } from "../../model/GameAttribute";


export default  (data:any):GameAttribute[] =>{
    console.log('game called')
    var arr:GameAttribute[] = []
    if(!!data['home']){
        const {game}= data;
        console.log('game',game)
        for(var key in game){
            arr.push({
                keyName: key,
                value: game[key]
            })
        }
    }

    return arr;
}