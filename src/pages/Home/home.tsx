import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getAllDiscrepancies } from '../../utils/api/api';
import pairDataForGame from '../../utils/pair/pairDataForGame';
import { GameAttribute } from '../../model/GameAttribute';
import pairDataForTeam from '../../utils/pair/pairDataForTeam';
import { Player } from '../../model/Player';


const Home =() => {

  const [gameData, setGameData] = useState<GameAttribute[]>([]);
  const [teamHomeData, setTeamHomeData] = useState<GameAttribute[]>([]);
  const [teamAwayData, setTeamAwayData] = useState<GameAttribute[]>([]);

  const [homePlayersData, setHomePlayerData] = useState<Player[]>([]);

  useEffect(() => {
    console.log('mounted');
    getAllDiscrepancies().then(result=>{
      // console.log(result);
      pairAll(result);
    })
  },[]);

  const pairAll = (data ={}) => {
    const game = pairDataForGame(data );
    setGameData(game);

    const homeData = pairDataForTeam(data, 'home');
    setTeamHomeData (homeData);

    const awayData = pairDataForTeam(data, 'away');
    setTeamAwayData(awayData);
  }
  

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
    },
    // {
    //   title: 'Action',
    //   key: 'action',
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <a href='#'>Detail</a>
    //     </Space>
    //   ),
    // },
  ];

  return (
    <div className="App">
      <p className='text-2xl font-bold text-center my-6'> All discrepancies </p>
      <div className='px-5 my-5'>
        <Table columns={columns} dataSource={gameData} />
      </div>
    </div>
  );
}

export default Home;