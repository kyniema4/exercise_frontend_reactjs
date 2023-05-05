import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { Button, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import * as PlayerModel from '../../model/Player';
import { getDiscrepanciesByPlayer } from '../../utils/api/api';
import pairDataForPlayer from '../../utils/pair/pairDataForPlayer';
import switchUrlForType from '../../utils/pair/switchUrlForType';
// interface DataType {
//   key: string;
//   title: string;
//   discrepancies: number;
//   tags: string[];
// }

const Player = () =>{
  const [homePlayersData, setHomePlayerData] = useState<PlayerModel.Player[]>([]);
  const [awayPlayersData, setAwayPlayerData] = useState<PlayerModel.Player[]>([]);

  useEffect(() => {
    console.log('mounted');
    getDiscrepanciesByPlayer().then(result=>{
      // console.log(result);
      pairAll(result);
    })
  },[]);

  const pairAll = (data:any) => {

    setHomePlayerData(pairDataForPlayer(data['homePlayers'] ))
    setAwayPlayerData(pairDataForPlayer(data['awayPlayers']))
  }

  const generateColumns= (type =0, title = 'Title'):ColumnsType<any>  => {
    
    const columns :ColumnsType<PlayerModel.Player> = [
      {
        title: <a href={switchUrlForType(type)}>{title}</a>,
        render: (player) => player.id,
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
      {
        title: 'Tags',
        render: (item) =>{
          let color = 'volcano';
              // if (tag === 'resolved') {
              //   color = 'green';
              // }
          if(item.keyName === 'id'||!item.isReject){
            return ''
          }
          return (
            <Tag color={color} key={item.isReject??'noaction'}>
              Reject
            </Tag>
          );
        }
      },
      {
        title: 'Action',
        key: 'action',
        width: 200,
        render: (item) => {
          if(item.keyName==='id') return''
          return (
          <Space size="middle">
            <Button size='small' type="primary" danger
              onClick={()=>{
                // rejectItem(item,title);
              }}
            >Ignore</Button>
            <Button size='small' type='primary'
              onClick={()=>{
                // resolveItem(item,title);
              }}
            >Resolve</Button>
          </Space>
        )},
      },
    ];
    return columns;
  }

  return (
    <div className="App">
      <p className='text-2xl font-bold text-center my-6'> Discrepancies For Player </p>
      <div className='px-5'>
        <Table columns={generateColumns(2, 'Home Players')} dataSource={homePlayersData} pagination={false}/>
        <Table columns={generateColumns(2, 'Away Players')} dataSource={awayPlayersData} pagination={false}/>
      </div>
    </div>
  );
}

export default Player;