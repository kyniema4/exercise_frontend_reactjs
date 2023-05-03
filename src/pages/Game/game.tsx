import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
interface DataType {
  key: string;
  team: string;
  awayTeam: string;
  attendance: number;
  discrepancies: number;
  tags: string[];
}

const Game = () =>{
  const columns: ColumnsType<DataType> = [
    {
      title: 'Team',
      dataIndex: 'team',
      key: 'team',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Away Team',
      dataIndex: 'awayTeam',
      key: 'awayTeam',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Attendance',
      key: 'attendance',
      dataIndex: 'attendance',
      align: 'right'
    },
    {
      title: 'Discrepancies',
      key: 'discrepancies',
      dataIndex: 'discrepancies',
      align: 'right'
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = 'volcano';
            if (tag === 'resolved') {
              color = 'green';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      width: 200,
      render: (_, record) => (
        <Space size="middle">
          <Button size='small' type="primary" danger>Ignore</Button>
          <Button size='small' type='primary'>Resolve</Button>
        </Space>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: '1',
      team: 'John Brown',
      awayTeam: 'Team Sky',
      attendance: 100,
      discrepancies: 10,
      tags: ['resolved'],
    },
    {
      key: '2',
      team: 'John Brown',
      awayTeam: 'Team Sky',
      attendance: 100,
      discrepancies: -2,
      tags: ['ignored'],
    },
    {
      key: '3',
      team: 'John Brown',
      awayTeam: 'Team Sky',
      attendance: 100,
      discrepancies: -2,
      tags: ['resolved'],
    },
  ];
  return (
    <div className="App">
      <p className='text-2xl font-bold text-center my-6'> Discrepancies For Game </p>
      <div className='px-5'>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
}

export default Game;