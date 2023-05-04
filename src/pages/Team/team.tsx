import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getDiscrepanciesByTeam } from '../../utils/api/api';
import pairDataForTeam from '../../utils/pair/pairDataForTeam';
import { GameAttribute } from '../../model/GameAttribute';
import switchUrlForType from '../../utils/pair/switchUrlForType';
interface DataType {
  key: string;
  title: string;
  discrepancies: number;
  tags: string[];
}

const Team = () => {

  const [teamHomeData, setTeamHomeData] = useState<GameAttribute[]>([]);
  const [teamAwayData, setTeamAwayData] = useState<GameAttribute[]>([]);

  useEffect(() => {
    console.log('mounted');
    getDiscrepanciesByTeam().then(result=>{
      // console.log(result);
      pairAll(result);
    })
  },[]);

  const pairAll = (data:any) => {

    const homeData = pairDataForTeam(data, 'home');
    setTeamHomeData (homeData);

    const awayData = pairDataForTeam(data, 'away');
    setTeamAwayData(awayData);
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
      <p className='text-2xl font-bold text-center my-6'> Discrepancies For Team </p>
      <div className='px-5'>
        <Table columns={generateColumns(1, 'Home Team')} dataSource={teamHomeData} pagination={false}/>
        <Table columns={generateColumns(1, 'Away Team')} dataSource={teamAwayData} pagination={false}/>
      </div>
    </div>
  );
}

export default Team;