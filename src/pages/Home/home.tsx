import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
interface DataType {
  key: string;
  title: string;
  type: string;
}

function Home() {
  const columns: ColumnsType<DataType> = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Type',
      key: 'type',
      dataIndex: 'type',
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

  const data: DataType[] = [
    {
      key: '1',
      title: 'John Brown',
      type: 'Team',
    },
    {
      key: '2',
      title: 'Jim Green',
      type: 'Player',
    },
    {
      key: '3',
      title: 'Joe Black',
      type: 'Group',
    },
  ];
  return (
    <div className="App">
      <p className='text-2xl font-bold text-center my-6'> All discrepancies </p>
      <div className='px-5 my-5'>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
}

export default Home;