import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getAllDiscrepancies } from '../../utils/api/api';
import pairDataForGame from '../../utils/pair/pairDataForGame';
import { GameAttribute } from '../../model/GameAttribute';
import pairDataForTeam from '../../utils/pair/pairDataForTeam';
import { Player } from '../../model/Player';
import pairDataForPlayer from '../../utils/pair/pairDataForPlayer';


const Home =() => {

  const [gameData, setGameData] = useState<GameAttribute[]>([]);
  const [teamHomeData, setTeamHomeData] = useState<GameAttribute[]>([]);
  const [teamAwayData, setTeamAwayData] = useState<GameAttribute[]>([]);

  const [homePlayersData, setHomePlayerData] = useState<Player[]>([]);
  const [awayPlayersData, setAwayPlayerData] = useState<Player[]>([]);

  useEffect(() => {
    console.log('mounted');
    getAllDiscrepancies().then(result=>{
      // console.log(result);
      pairAll(result);
    })
  },[]);

  const pairAll = (data:any) => {
    const game = pairDataForGame(data );
    setGameData(game);

    const homeData = pairDataForTeam(data, 'home');
    setTeamHomeData (homeData);

    const awayData = pairDataForTeam(data, 'away');
    setTeamAwayData(awayData);

    setHomePlayerData(pairDataForPlayer(data['homePlayers'] ))
    setAwayPlayerData(pairDataForPlayer(data['awayPlayers']))
  }
  

  
    
  const generateColumns= (type =0, title = 'Title'):ColumnsType<any>  => {
    if(type == 0){
      const columns: ColumnsType<GameAttribute> = [
        {
          title: 'Title',
          dataIndex: 'keyName',
          key: 'keyName',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'discrepancy value',
          key: 'value',
          dataIndex: 'value',
        },];
      return columns;
    }
    const columns :ColumnsType<Player> = [
      {
        title: 'Title',
        dataIndex: 'keyName',
        key: 'keyName',
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'discrepancy value',
        key: 'value',
        dataIndex: 'value',
      },];
    return columns;
  }

  return (
    <div className="App">
      <p className='text-2xl font-bold text-center my-6'> All discrepancies </p>
      <div className='px-5 my-5'>
        <Table columns={generateColumns(0, 'Game')} dataSource={gameData} pagination={false}/>
        <Table columns={generateColumns(0, 'Home Team')} dataSource={teamHomeData} pagination={false}/>
        <Table columns={generateColumns(0, 'Away Team')} dataSource={teamAwayData} pagination={false}/>

        <Table columns={generateColumns(1, 'Home Players')} dataSource={homePlayersData} pagination={false}/>
        <Table columns={generateColumns(1, 'Away Players')} dataSource={awayPlayersData} pagination={false}/>
      </div>
    </div>
  );
}

export default Home;