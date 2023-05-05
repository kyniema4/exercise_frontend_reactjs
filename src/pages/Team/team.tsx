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
  }

  const resolveItem = (item:GameAttribute,title='') =>{
    // if(title ==='Home Team'){
    //   resolveObject('home', item.keyName);
    //   setTeamHomeData(current =>
    //     current.filter(obj => {
    //       return !(obj.keyName === item.keyName && obj.value == item.value)
    //     }),
    //   );
    // }
    // if(title === 'Away Team'){
    //   resolveObject('away', item.keyName);
    //   setTeamAwayData(current =>
    //     current.filter(obj => {
    //       return !(obj.keyName === item.keyName && obj.value == item.value)
    //     }),
    //   );
    // }
  }

  const rejectItem = (item:GameAttribute,title ='') =>{
    // if(title ==='Home Team'){
    //   rejectObject('home', item.keyName)
    //   setTeamHomeData(prevState => {
    //     const newState = prevState.map(obj => {
    //       // 👇️ if id equals 2, update the country property
    //       if (obj.keyName === item.keyName && obj.value == item.value) {
    //         return {...obj, isReject: true};
    //       }
    
    //       // 👇️ otherwise return the object as is
    //       return obj;
    //     });
    
    //     return newState;
    //   });
    // }
    // if(title === 'Away Team'){
    //   rejectObject('away', item.keyName)
    //   setTeamAwayData(prevState => {
    //     const newState = prevState.map(obj => {
    //       // 👇️ if id equals 2, update the country property
    //       if (obj.keyName === item.keyName && obj.value == item.value) {
    //         return {...obj, isReject: true};
    //       }
    
    //       // 👇️ otherwise return the object as is
    //       return obj;
    //     });
    
    //     return newState;
    //   });
    // }
    
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
      },
      {
        title: 'Tags',
        render: (item) =>{
          let color = 'volcano';
              // if (tag === 'resolved') {
              //   color = 'green';
              // }
          if(item.keyName == 'id'||!item.isReject){
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
          if(item.keyName=='id') return''
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
      <p className='text-2xl font-bold text-center my-6'> Discrepancies For Team </p>
      <div className='px-5'>
        <Table columns={generateColumns(1, 'Team')} dataSource={teamData} pagination={false}/>
      </div>
    </div>
  );
}

export default Team;