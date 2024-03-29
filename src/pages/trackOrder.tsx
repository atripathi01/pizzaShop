import { Button, Container, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Pizza, PizzaStage } from '../apis/types';

const TrackOrder = () => {
  const [order, setOrder] = useState<Pizza[]>([]);
  useEffect(() => {
    if (localStorage.getItem('order')) {
      // @ts-ignore
      const orderList = JSON.parse(localStorage.getItem('order'));
      setOrder([...orderList]);
    }
    console.log('Order', order);
  }, []);
  useEffect(() => {
    if (order.length > 0) {
      localStorage.setItem('order', JSON.stringify(order));
    }
  }, [order]);

  // @ts-ignore
  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min} min ${sec} sec`;
  };

  const pizzaSizes = {
    Small: 3 * 60, // 3 minutes
    Medium: 4 * 60, // 4 minutes
    Large: 5 * 60, // 5 minutes
  };

  //@ts-ignore
  const updatePizzaStage = (orderId, action) => {
    const updatedPizzas = order?.map((pizza) => {
      if (pizza.id === orderId) {
        let newStage: PizzaStage = pizza.stage;
        if (action === 'next') {
          switch (pizza.stage) {
            case 'Order Placed':
              newStage = 'Order Making';
              break;
            case 'Order Making':
              newStage = 'Order Ready';
              break;
            case 'Order Ready':
              newStage = 'Order Picked';
              break;
            default:
              break;
          }
        } else if (action === 'cancel') {
          newStage = 'Cancelled';
        }
        return { ...pizza, stage: newStage };
      }
      return pizza;
    });
    setOrder(updatedPizzas);
  };
  const timeSpent = 390;
  return (
    <Container>
      <div>
        <h3>Track Order</h3>
        <div>Order Count : {order.length}</div>
        <div>
          Order Delivered Pizza :{' '}
          {order.filter((pizza) => pizza.stage === 'Order Picked').length}
        </div>
      </div>
      <Grid container>
        {order &&
          order.map((order) => {
            const timeInStage = {
              'Order Placed': timeSpent,
              'Order in Making': timeSpent - pizzaSizes[order?.size],
              'Order Ready': timeSpent - pizzaSizes[order?.size] - 60, // 1 minute for preparation
              'Order Picked': timeSpent - pizzaSizes[order?.size] - 60 - 120, // 2 minutes for delivery
              'Cancelled': timeSpent,
            };
            // Determine if the pizza is overdue
            //@ts-ignore
            const isOverdue = timeInStage[order?.stage] > 180;

            return (
              <>
                <div className='orderId_box'>Order Id: {order?.orderId}</div>
                <Grid item xs={12}>
                  <div className='stage_card'>
                    <p>{order?.stage}</p>
                    {/* @ts-ignore */}
                    <p className={`time_S ${isOverdue ? 'red' : ''}`}>
                      Time spent in {order?.stage}:{' '}
                      {/* @ts-ignore */}
                      {formatTime(timeInStage[order?.stage])}
                    </p>
                    <div>
                      {order?.stage !== 'Order Ready' && (
                        <Button
                          variant='outlined'
                          color='secondary'
                          sx={{ mx: 1 }}
                          onClick={() =>
                            updatePizzaStage(order?.orderId, 'next')
                          }
                        >
                          Next
                        </Button>
                      )}
                      {order?.stage !== 'Order Ready' && (
                        <Button
                          variant='contained'
                          color='error'
                          onClick={() =>
                            updatePizzaStage(order?.orderId, 'cancel')
                          }
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>
                </Grid>
              </>
            );
          })}
      </Grid>
    </Container>
  );
};

export default TrackOrder;
