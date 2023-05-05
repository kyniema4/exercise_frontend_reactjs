import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getDiscrepanciesByTeam } from '../../utils/api/api';
import pairDataForTeam from '../../utils/pair/pairDataForTeam';
import { GameAttribute } from '../../model/GameAttribute';
import switchUrlForType from '../../utils/pair/switchUrlForType';
import { rejectObject, resolveObject } from '../../utils/pair/actionForField';
import * as TeamModel from '../../model/Team';

interface DataType {
  key: string;
  title: string;
  discrepancies: number;
  tags: string[];
}

const Team = () => {

  const [teamData, setTeamData] = useState<TeamModel.Team[]>([]);

  useEffect(() => {
    console.log('mounted');
    getDiscrepanciesByTeam().then(result=>{
      // console.log(result);
      pairAll(result);
    })
  },[]);

  const pairAll = (data:any) => {

    // const homeData = pairDataForTeam(data, 'home');
    // setTeamHomeData (homeData);

    // const awayData = pairDataForTeam(data, 'away');
    // setTeamAwayData(awayData);
    const teams = pairDataForTeam(data);
    setTeamData(teams);
  }

  const resolveItem = (item:TeamModel.Team,title='') =>{
    // resolveObject('home', item.keyName);
    setTeamData(prevState => {
      const newState = prevState.map(obj => {
        // 👇️ if id equals 2, update the country property
        if (obj.id === item.id && obj.name == item.name) {
          return {...obj, isReject: 1};
        }
  
        // 👇️ otherwise return the object as is
        return obj;
      });
  
      return newState;
    });
  }

  const rejectItem = (item:TeamModel.Team) =>{
    // rejectObject('away', item.id)
    setTeamData(current =>
      current.filter(obj => {
        return !(obj.id === item.id && obj.name == item.name)
      }),
    );
    
  }

  const generateColumns= (type =0, title = 'Title'):ColumnsType<any>  => {
    const columns: ColumnsType<GameAttribute> = [
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
      {
        title: 'Status',
        render: (item) =>{
          
          if(!item.isReject){
            return ''
          }
          let color = 'volcano';
          if (item.isReject === 'resolved') {
            color = 'green';
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
          if(item.keyName=='id') return''
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
      <p className='text-2xl font-bold text-center my-6'> Discrepancies For Team </p>
      <div className='px-5'>
        <Table columns={generateColumns(1, 'Team')} dataSource={teamData} pagination={false}/>
      </div>
    </div>
  );
}

export default Team;