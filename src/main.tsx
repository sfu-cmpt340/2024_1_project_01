import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { createTheme, MantineProvider } from '@mantine/core'

import '@mantine/core/styles.css'
import '@/styles.css'

import Classifier from '@/pages/classifier/index'
import Home from '@/pages/home/index'

const theme = createTheme({});

const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/classifier',
        element: <Classifier />
    },
    {
        path: '/previous-diagnoses'
    },
    {
        path: '/diagnosis/:datetime'
    },
    {
        path: '/about'
    },
    {
        path: '*',
        element: <p>404 Error</p>
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <MantineProvider theme={theme}>
            <RouterProvider router={router} />
        </MantineProvider>
    </React.StrictMode>
);
