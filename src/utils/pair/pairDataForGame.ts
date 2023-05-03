import { GameAttribute } from "../../model/GameAttribute";


export default  (data:any):GameAttribute[] =>{
    console.log('game called')
    var arr:GameAttribute[] = []
    for(var key in data){
        if(key ==='home' || key==='away'){


            
        }
    }

    return arr;
}