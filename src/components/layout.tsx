import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import { Badge } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
    const [cartcount, setCartcount] =useState(0);
    useEffect(() => {
          const cartItem= localStorage.getItem('carts');
          if (cartItem) {
            // @ts-ignore
            setCartcount(JSON.parse(cartItem).length);
          }
    },[]);
  return (
    <div>
      <Navbar title={'Pizza Shop'}>
        <div className='options_container'>
          <a href='/cart'>
            <Badge badgeContent={cartcount} color='success'>
              <ShoppingCart color='action' />
            </Badge>
          </a>

          <a href='/trackOrder'>Track order</a>
        </div>
      </Navbar>
      <Outlet />
    </div>
  );
};

export default AppLayout;
