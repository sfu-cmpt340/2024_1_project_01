import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { createTheme, MantineProvider } from '@mantine/core'

import '@mantine/core/styles.css'
import '@/styles.css'

import Classifier from '@/pages/classifier/index'
import Diagnosis from '@/pages/diagnosis/index'
import Error from '@/pages/error/index'
import Home from '@/pages/home/index'
import PreviousDiagnoses from '@/pages/previous-diagnoses/index'

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
        path: '/previous-diagnoses',
        element: <PreviousDiagnoses />
    },
    {
        path: '/diagnosis/:datetime',
        element: <Diagnosis />
    },
    {
        path: '/about'
    },
    {
        path: '*',
        element: <Error />
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <MantineProvider theme={theme}>
            <RouterProvider router={router} />
        </MantineProvider>
    </React.StrictMode>
);
