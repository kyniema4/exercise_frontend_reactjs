const switchUrlForType = (type = 0) =>{
    switch(type){
      case 0: return '/game';
      case 1: return 'team';
      case 2: return '/player'
    }
    return '/';
}
export default switchUrlForType