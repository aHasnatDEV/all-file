import React from 'react';
import ChatList from './ChatList/ChatList';
import Chats from './Chats/Chats';

const Layout = () => {
  return (
    <div className='flex'>
      <ChatList />
      <Chats />
    </div>
  );
};

export default Layout;
