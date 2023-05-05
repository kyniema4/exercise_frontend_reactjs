import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { Button, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getDiscrepanciesByGame } from '../../utils/api/api';
import pairDataForGame from '../../utils/pair/pairDataForGame';
import { GameAttribute } from '../../model/GameAttribute';
import switchUrlForType from '../../utils/pair/switchUrlForType';
import { rejectObject, resolveObject } from '../../utils/pair/actionForField';
import * as GameModel from '../../model/Game';
// interface DataType {
//   key: string;
//   team: string;
//   awayTeam: string;
//   attendance: number;
//   discrepancies: number;
//   tags: string[];
// }

const Game = () =>{

  const [gameData, setGameData] = useState<GameModel.Game[]>([]);

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

  const resolveItem = (item:GameModel.Game,title='') =>{
    // resolveObject('game', item.keyName)
    // setGameData(current =>
    //   current.filter(obj => {
    //     return !(obj.keyName === item.keyName && obj.value === item.value)
    //   }),
    // );
  }

  const rejectItem = (item:GameModel.Game,title ='') =>{
    // rejectObject('game', item.keyName)
    // setGameData(prevState => {
    //   const newState = prevState.map(obj => {
    //     // 👇️ if id equals 2, update the country property
    //     if (obj.keyName === item.keyName && obj.value === item.value) {
    //       return {...obj, isReject: true};
    //     }
  
    //     // 👇️ otherwise return the object as is
    //     return obj;
    //   });
  
    //   return newState;
    // });
    
  }



  const generateColumns= (type =0, title = 'Title'):ColumnsType<any>  => {
    const columns: ColumnsType<GameAttribute> = [
      {
        title: <a href={switchUrlForType(type)}>{title}</a>,
        dataIndex: 'id',
        key: 'id',
      },
      // {
      //   title: 'home',
      //   key: 'home',
      //   dataIndex: 'home',
      // },
      // {
      //   title: 'away',
      //   key: 'away',
      //   dataIndex: 'away',
      // },
      {
        title: 'attendance',
        key: 'attendance',
        dataIndex: 'attendance',
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
                rejectItem(item,title);
              }}
            >Ignore</Button>
            <Button size='small' type='primary'
              onClick={()=>{
                resolveItem(item,title);
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
      <p className='text-2xl font-bold text-center my-6'> Discrepancies For Game </p>
      <div className='px-5'>
        <Table columns={generateColumns(0, 'Game Id')} dataSource={gameData} />
      </div>
    </div>
  );
}

export default Game;