import { Player } from "../../model/Player";
import { getSubFieldValue } from "./actionForField";

const  pairDataForPlayer = (players:any,teamId:String , team:String):Player[] =>{
    let arr:Player[] = [];
    players.forEach((player: Player) => {
        player.teamId = teamId;
        player.team = team;
        let isReject = getSubFieldValue(player.team+'players', player.id)??0;
        if(isReject>=0){
            arr.push({
                id: player.id??'',
                rushAttempts: player.rushAttempts??0,
                rushTds: player.rushTds??0,
                rushYdsGained: player.rushYdsGained??0,
                rec: player.rec??0,
                receivingYards: player.receivingYards??0,
                teamId:player.teamId??'',
                team: player.team,
                isReject:isReject
            });
        }
        
    });
    // for(var player of players){
    //     arr.push(player);
    // }

    return arr;
}
export default pairDataForPlayer;