import { Container, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { pizzaList } from '../apis/pizzaApi';
import { Pizza, PizzaBase, PizzaSize } from '../apis/types';

const Home = () => {
  //   @ts-ignore
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [cartList, setCartList] = useState<Pizza[]>([]);

  useEffect(() => {
    if (pizzaList.length > 0) {
      setPizzas(pizzaList as Pizza[]);
    }
  }, [pizzaList]);
  useEffect(() => {
    if (pizzaList.length > 0 && localStorage.getItem('carts')) {
      const cart: string | null = localStorage.getItem('carts');
      // @ts-ignore
      setCartList(JSON.parse(cart));
    }
  }, []);
  const handleAddToCard = (card: Pizza) => {
    let copyAddedList = [...cartList];
    if (copyAddedList.includes(card)) {
      alert('item already added to cart');

    } else {
      copyAddedList.push(card);
      //@ts-ignore
      localStorage.setItem('carts', JSON.stringify(copyAddedList));
      alert('item added to cart');
      setCartList(copyAddedList);
     
    }
  };
  const handlePizzaSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSize: PizzaSize = e.target.value as PizzaSize;
    const updatedPizzaList = pizzas.map((pizzaItem) => {
      if (pizzaItem.size !== selectedSize) {
        // Update the base property for the selected pizza
        return { ...pizzaItem, size: selectedSize };
      }
      return pizzaItem;
    });
    setPizzas(updatedPizzaList);
  };
  const handlePizzaBase = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBase: PizzaBase = e.target.value as PizzaBase;

    const updatedPizzaList = pizzas.map((pizzaItem) => {
      if (pizzaItem.base !== selectedBase) {
        // Update the base property for the selected pizza
        return { ...pizzaItem, base: selectedBase };
      }
      return pizzaItem;
    });
    setPizzas(updatedPizzaList);
  };
  return (
    <Container>
      <Grid container sx={{ my: 6 }}>
        {pizzas &&
          pizzas?.map((pizza) => {
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
                      value={'Add to cart'}
                      className='addToCardButn'
                      onClick={() => handleAddToCard(pizza)}
                    />
                  </div>
                </div>
              </Grid>
            );
          })}
      </Grid>
    </Container>
  );
};

export default Home;
