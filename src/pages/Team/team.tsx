import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
interface DataType {
  key: string;
  title: string;
  discrepancies: number;
  tags: string[];
}

function Team() {
  const columns: ColumnsType<DataType> = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <a>{text}</a>,
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
      title: 'John Brown',
      discrepancies: 10,
      tags: ['resolved'],
    },
    {
      key: '2',
      title: 'Jim Green',
      discrepancies: -2,
      tags: ['ignored'],
    },
    {
      key: '3',
      title: 'Joe Black',
      discrepancies: 33,
      tags: ['resolved'],
    },
  ];
  return (
    <div className="App">
      <p className='text-2xl font-bold text-center my-6'> Discrepancies For Team </p>
      <div className='px-5'>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
}

export default Team;