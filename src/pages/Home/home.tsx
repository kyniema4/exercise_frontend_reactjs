import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import {  Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getAllDiscrepancies } from '../../utils/api/api';
import pairDataForGame from '../../utils/pair/pairDataForGame';
import { GameAttribute } from '../../model/GameAttribute';
import pairDataForTeam from '../../utils/pair/pairDataForTeam';
import { Player } from '../../model/Player';
import pairDataForPlayer from '../../utils/pair/pairDataForPlayer';
import switchUrlForType from '../../utils/pair/switchUrlForType';
import * as TeamModel from '../../model/Team';

const Home =() => {

  const [gameData, setGameData] = useState<GameAttribute[]>([]);

  const [teamData, setTeamData] = useState<TeamModel.Team[]>([]);

  // const [teamHomeData, setTeamHomeData] = useState<GameAttribute[]>([]);
  // const [teamAwayData, setTeamAwayData] = useState<GameAttribute[]>([]);

  const [playersData, setPlayersData] = useState<Player[]>([]);

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

    // const homeData = pairDataForTeam(data, 'home');
    // setTeamHomeData (homeData);

    // const awayData = pairDataForTeam(data, 'away');
    // setTeamAwayData(awayData);


    const homePlayers = pairDataForPlayer(data['homePlayers'] , data['home']['id'] , 'home');
    const awayPlayers = pairDataForPlayer(data['awayPlayers'] , data['away']['id'] , 'away');
    setPlayersData([...homePlayers,...awayPlayers]);

    const teams = pairDataForTeam(data);
    setTeamData(teams);
  }
  

    
  const generateColumns= (type =0, title = 'Title'):ColumnsType<any>  => {
    if(type === 0){
      const columns: ColumnsType<GameAttribute> = [
        {
          title: <a href={switchUrlForType(type)}>{title}</a>,
          dataIndex: 'keyName',
          key: 'keyName',
          render: (text) => <a href='#'>{text}</a>,
        },
        {
          title: 'discrepancy value',
          key: 'value',
          dataIndex: 'value',
        },];
      return columns;
    }

    if(type === 1){
      const columns: ColumnsType<TeamModel.Team> = [
        {
          title: <a href={switchUrlForType(type)}>{title}</a>,
          render: (player) => player.id,
        },
        {
          title: 'teamId',
          key: 'teamId',
          dataIndex: 'id',
        },
        {
          title: 'team',
          key: 'team',
          dataIndex: 'name',
        },
        {
          title: 'rush Attempts',
          key: 'rushAttempts',
          dataIndex: 'rushAttempts',
        },
        {
          title: 'rush touch downs',
          key: 'rushTds',
          dataIndex: 'rushTds',
        },
        {
          title: 'Rush Yards Ganed',
          key: 'rushYdsGained',
          dataIndex: 'rushYdsGained',
        },
        {
          title: 'Receptions',
          key: 'rec',
          dataIndex: 'rec',
        },
        {
          title: 'Receiving Yards',
          key: 'receivingYards',
          dataIndex: 'receivingYards',
        },
      ]
      return columns;
    }
    // id: any,
    // rushAttempts: any,
    // rushTds: any,
    // rushYdsGained:any,
    // rec: any,
    // receivingYards: any
    const columns :ColumnsType<Player> = [
      {
        title: <a href={switchUrlForType(type)}>{title}</a>,
        render: (player) => player.id,
      },
      {
        title: 'teamId',
        key: 'teamId',
        dataIndex: 'teamId',
      },
      {
        title: 'team',
        key: 'team',
        dataIndex: 'team',
      },
      {
        title: 'rush Attempts',
        key: 'rushAttempts',
        dataIndex: 'rushAttempts',
      },
      {
        title: 'rush touch downs',
        key: 'rushTds',
        dataIndex: 'rushTds',
      },
      {
        title: 'Rush Yards Ganed',
        key: 'rushYdsGained',
        dataIndex: 'rushYdsGained',
      },
      {
        title: 'Receptions',
        key: 'rec',
        dataIndex: 'rec',
      },
      {
        title: 'Receiving Yards',
        key: 'receivingYards',
        dataIndex: 'receivingYards',
      },
    ];
    return columns;
  }

  return (
    <div className="App">
      <p className='text-2xl font-bold text-center my-6'> All discrepancies </p>
      <div className='px-5 my-5'>
        <Table columns={generateColumns(0, 'Game')} dataSource={gameData} pagination={false}/>

        <Table columns={generateColumns(1, 'Teams')} dataSource={teamData} pagination={false}/>

        <Table columns={generateColumns(2, 'Players')} dataSource={playersData} pagination={false}/>
      </div>
    </div>
  );
}

export default Home;