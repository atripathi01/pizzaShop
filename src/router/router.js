import AppLayout from '../components/layout';
import Cart from '../pages/cart';
import Home from '../pages/home';
import Login from '../pages/login';
import Register from '../pages/register';
import TrackOrder from '../pages/trackOrder';


export const routersConfig = [
    {
        element: <AppLayout />,
        children: [
            {
                path: '/',
                element: <Home />,
      
            },
            {
                path: '/trackOrder',
                element: <TrackOrder />,
                
            },
            {
                path: '/cart',
                element: <Cart />,
      
            },
            
        ]
        
    },
   
    {
        path: '/login',
        element: <Login />
   
    },
    {
        path: '/register',
        element: <Register />

    },
   
]