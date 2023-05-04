import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getDiscrepanciesByGame } from '../../utils/api/api';
import pairDataForGame from '../../utils/pair/pairDataForGame';
import { GameAttribute } from '../../model/GameAttribute';
import switchUrlForType from '../../utils/pair/switchUrlForType';
interface DataType {
  key: string;
  team: string;
  awayTeam: string;
  attendance: number;
  discrepancies: number;
  tags: string[];
}

const Game = () =>{

  const [gameData, setGameData] = useState<GameAttribute[]>([]);
  const [teamHomeData, setTeamHomeData] = useState<GameAttribute[]>([]);
  const [teamAwayData, setTeamAwayData] = useState<GameAttribute[]>([]);

  useEffect(() => {
    console.log('mounted');
    getDiscrepanciesByGame().then(result=>{
      console.log(result);
      pairAll(result);
    })
  },[]);

  const pairAll = (data:any) => {
    const game = pairDataForGame(data );
    setGameData(game);
  }

  const generateColumns= (type =0, title = 'Title'):ColumnsType<any>  => {
    const columns: ColumnsType<GameAttribute> = [
      {
        title: <a href={switchUrlForType(type)}>{title}</a>,
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
      <p className='text-2xl font-bold text-center my-6'> Discrepancies For Game </p>
      <div className='px-5'>
        <Table columns={generateColumns(0, 'Game')} dataSource={gameData} />
      </div>
    </div>
  );
}

export default Game;