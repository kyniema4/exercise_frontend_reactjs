import { Player } from "../../model/Player";

export default  (players:any):Player[] =>{
    var arr:Player[] = [];
    for(var player of players){
        arr.push(player);
    }

    return arr;
}