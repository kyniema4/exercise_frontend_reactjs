import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { Button, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getDiscrepanciesByGame } from '../../utils/api/api';
import pairDataForGame from '../../utils/pair/pairDataForGame';
import { GameAttribute } from '../../model/GameAttribute';
import switchUrlForType from '../../utils/pair/switchUrlForType';
import { rejectObject, resolveObject } from '../../utils/pair/actionForField';
// interface DataType {
//   key: string;
//   team: string;
//   awayTeam: string;
//   attendance: number;
//   discrepancies: number;
//   tags: string[];
// }

const Game = () =>{

  const [gameData, setGameData] = useState<GameAttribute[]>([]);

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

  const resolveItem = (item:GameAttribute,title='') =>{
    resolveObject('game', item.keyName)
    setGameData(current =>
      current.filter(obj => {
        return !(obj.keyName === item.keyName && obj.value === item.value)
      }),
    );
  }

  const rejectItem = (item:GameAttribute,title ='') =>{
    rejectObject('game', item.keyName)
    setGameData(prevState => {
      const newState = prevState.map(obj => {
        // 👇️ if id equals 2, update the country property
        if (obj.keyName === item.keyName && obj.value === item.value) {
          return {...obj, isReject: true};
        }
  
        // 👇️ otherwise return the object as is
        return obj;
      });
  
      return newState;
    });
    
  }



  const generateColumns= (type =0, title = 'Title'):ColumnsType<any>  => {
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
        <Table columns={generateColumns(0, 'Game')} dataSource={gameData} />
      </div>
    </div>
  );
}

export default Game;