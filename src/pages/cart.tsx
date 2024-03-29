import { Container, Divider, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { pizzaList } from '../apis/pizzaApi';
import { Pizza, PizzaBase, PizzaSize } from '../apis/types';
import { useRoutes } from 'react-router-dom';

const Cart = () => {
  const [cartList, setCartList] = useState<Pizza[]>([]);
  const [order, setOrder] = useState<Pizza[]>([]);
  useEffect(() => {
    if (pizzaList.length > 0 && localStorage.getItem('carts')) {
      const cart: string | null = localStorage.getItem('carts');
      // @ts-ignore
      setCartList(JSON.parse(cart));
    }
  }, []);

  const placeOrder = (cartList: Pizza[]) => {
    if (cartList.length > 0 && cartList.length <= 10)  {
      let copyofOrder = [...cartList];

      copyofOrder.length > 0 &&
        copyofOrder.forEach((item) => {
          if (!item.hasOwnProperty('orderId')) {
            item.orderId = Math.floor(Math.random() * 1000);
          }
        });
      console.log(copyofOrder);
      if (localStorage.getItem('order')) {
        // @ts-ignore
        const orderList = JSON.parse(localStorage.getItem('order'));
        setOrder([...orderList, ...copyofOrder]);
      }
      setOrder([...copyofOrder]);
      console.log('Order', order);
      if (order.length < 10) {
        localStorage.setItem('order', JSON.stringify(copyofOrder));
        localStorage.setItem('carts', '');
      } else {
        alert('you cant order more than 10');
      }
    }
  };

  const handlePizzaSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSize: PizzaSize = e.target.value as PizzaSize;
    const updatedPizzaList = cartList.map((pizzaItem) => {
      if (pizzaItem.size !== selectedSize) {
        // Update the base property for the selected pizza
        console.log('work');
        return { ...pizzaItem, size: selectedSize };
      }
      console.log(pizzaItem);
      return pizzaItem;
    });
    setCartList(updatedPizzaList);
  };
  const handlePizzaBase = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBase: PizzaBase = e.target.value as PizzaBase;

    const updatedPizzaList = cartList.map((pizzaItem) => {
      if (pizzaItem.base !== selectedBase) {
        // Update the base property for the selected pizza
        console.log('work');
        return { ...pizzaItem, base: selectedBase };
      }
      console.log(pizzaItem);
      return pizzaItem;
    });
    setCartList(updatedPizzaList);
  };
  return (
    <Container>
      <div className='cart_container'>
        <h3>Cart</h3>
        <div>items: {cartList.length}</div>
      </div>
      <Divider />
      <Grid container sx={{ my: 6 }}>
        {cartList &&
          cartList?.map((pizza) => {
            return (
              <Grid
                item
                key={pizza.id}
                xs={12}
                lg={3}
                md={4}
                sm={6}
                sx={{ position: 'relative' }}
              >
                <div className='pizza_card'>
                  <img
                    style={{ width: '250px' }}
                    src={pizza.image}
                    alt={pizza.name}
                  />
                  <p className='pizza_name'>{pizza.name}</p>
                  <p className='pizza_desc'>{pizza.description}</p>
                  <p className='pizzaType'>
                    {pizza.pizzaType === 'Veg' ? (
                      <span
                        style={{
                          fontWeight: '500',
                          paddingLeft: '5px',
                          color: 'green',
                        }}
                      >
                        Veg
                      </span>
                    ) : (
                      <span
                        style={{
                          fontWeight: '500',
                          paddingLeft: '5px',
                          color: 'red',
                        }}
                      >
                        NonVeg
                      </span>
                    )}
                  </p>
                  <div className='priceNcart'>
                    <select
                      name='base'
                      id='base'
                      className='selectDropDown'
                      defaultValue={pizza?.base}
                      onChange={handlePizzaBase}
                    >
                      <option value='Thin'>Thin</option>
                      <option value='Thick'>Thick</option>
                    </select>
                    <select
                      name='size'
                      id='size'
                      className='selectDropDown'
                      defaultValue={pizza?.size}
                      onChange={handlePizzaSize}
                    >
                      <option value='Small'>Small</option>
                      <option value='Medium'>Medium</option>
                      <option value='Large'>Large</option>
                    </select>
                  </div>
                  <div className='priceNcart'>
                    <p className='price'>Rs.{pizza.price}</p>
                    <input
                      type='button'
                      value={'Remove'}
                      className='addToCardButn'
                    />
                  </div>
                </div>
              </Grid>
            );
          })}
      </Grid>
      <Divider />
      <div className='cart_container'>
        <h3>Total Price: Rs.17899</h3>
        <div>Total Orders: {cartList.length}</div>
        <div>payment mode : pay on conuter</div>
        {/* @ts-ignore */}
        <input
          type='button'
          disabled={order.length > 10}
          value={'Place Order'}
          className='addToCardButn'
          onClick={() => placeOrder(cartList)}
        />
        {order.length > 10 && (
          <p style={{ color: 'red', fontSize: '12px' }}>
            You can not order more then 10 pizza
          </p>
        )}
        <>
        {order.length > 10 && 
        alert('You cannt order more than 10 pizza')
        }
        </>

      </div>
    </Container>
  );
};

export default Cart;
