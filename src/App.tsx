import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import { routersConfig } from './router/router';



function App() {
    const router = createBrowserRouter(routersConfig);
  return <RouterProvider router={router} />;
}

export default App;
