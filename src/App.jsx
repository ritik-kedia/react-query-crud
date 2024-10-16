import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './components/Layout/MainLayout';
import Home from './Pages/Home';
import FetchOld from './Pages/FetchOld';
import FetchRQ from './Pages/FetchRQ';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import FetchIndividual from './components/UI/FetchIndividual';



function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/trad",
          element: <FetchOld />,
        },
        {
          path: "/rq",
          element: <FetchRQ />
        },
        {
          path: "/rq/:id",
          element: <FetchIndividual />
        },
      ],
    },
  ]);

  const queryClient = new QueryClient();


  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
      {/* The rest of your application */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App