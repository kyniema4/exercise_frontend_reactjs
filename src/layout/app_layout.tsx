import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Layout } from 'antd';

const { Header, Content } = Layout;
const items: MenuProps['items'] = [
    {
        label: (
            <Link to="/">All Discrepancies</Link>
        ),
        key: 'all',
    },
    {
        label: (
            <Link to="/team">Team</Link>
        ),
        key: 'team',
    },
    {
        label: (
            <Link to="/player">Player</Link>
        ),
        key: 'player',
    },
    {
        label: (
            <Link to="/game">Game</Link>
        ),
        key: 'game',
    },
];

const AppLayout: React.FC = () => {
    const [current, setCurrent] = useState('all');

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return (
        <Layout>
            <Header>
                <Menu theme="dark" onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
            </Header>
            <Content>
                <Outlet />
            </Content>
        </Layout>
    );
};

export default AppLayout;