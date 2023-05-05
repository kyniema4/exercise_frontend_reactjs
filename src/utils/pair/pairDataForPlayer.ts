import { Player } from "../../model/Player";

const  pairDataForPlayer = (players:any):Player[] =>{
    var arr:Player[] = [];
    players.forEach((player: Player) => {
        arr.push(player);
    });
    // for(var player of players){
    //     arr.push(player);
    // }

    return arr;
}
export default pairDataForPlayer;