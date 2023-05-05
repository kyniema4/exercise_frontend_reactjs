import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { Button, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import * as PlayerModel from '../../model/Player';
import { getDiscrepanciesByPlayer } from '../../utils/api/api';
import pairDataForPlayer from '../../utils/pair/pairDataForPlayer';
import switchUrlForType from '../../utils/pair/switchUrlForType';
import { rejectObject } from '../../utils/pair/actionForField';
// interface DataType {
//   key: string;
//   title: string;
//   discrepancies: number;
//   tags: string[];
// }

const Player = () =>{
  const [playersData, setPlayersData] = useState<PlayerModel.Player[]>([]);

  useEffect(() => {
    console.log('mounted');
    getDiscrepanciesByPlayer().then(result=>{
      // console.log(result);
      pairAll(result);
    })
  },[]);

  const pairAll = (data:any) => {
    const homePlayers = pairDataForPlayer(data['homePlayers'] , data['home']['id'] , 'home');
    const awayPlayers = pairDataForPlayer(data['awayPlayers'] , data['away']['id'] , 'away');
    setPlayersData([...homePlayers,...awayPlayers]);

  }

  const resolveItem = (item:PlayerModel.Player) =>{
    // resolveObject('home', item.keyName);
    setPlayersData(current =>
      current.filter(obj => {
        return !(obj.id === item.id && obj.team == item.team)
      }),
    );
  }

  const rejectItem = (item:PlayerModel.Player) =>{
    rejectObject('away', item.id)
    setPlayersData(prevState => {
      const newState = prevState.map(obj => {
        // 👇️ if id equals 2, update the country property
        if (obj.id === item.id && obj.team == item.team) {
          return {...obj, isReject: true};
        }
  
        // 👇️ otherwise return the object as is
        return obj;
      });
  
      return newState;
    });
    
  }

  const generateColumns= (type =0, title = 'Title'):ColumnsType<any>  => {
    
    const columns :ColumnsType<PlayerModel.Player> = [
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
      {
        title: 'Status',
        render: (item) =>{
          let color = 'volcano';
          if (item.isReject === 1) {
            color = 'green';
          }
          if(!item.isReject){
            return ''
          }
          return (
            <Tag color={color} key={item.isReject??'noaction'}>
              Resolved
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
                rejectItem(item);
              }}
            >Ignore</Button>
            <Button size='small' type='primary'
              onClick={()=>{
                resolveItem(item);
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
        <Table columns={generateColumns(2, 'Players')} dataSource={playersData} pagination={false}/>
      </div>
    </div>
  );
}

export default Player;