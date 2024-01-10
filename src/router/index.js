import { createBrowserRouter } from 'react-router-dom';
import Month from '@/pages/Month';
import Year from '@/pages/Year';
import Layout from '@/pages/Layout';
import New from '@/pages/New';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Month />,
            },
            {
                path: '/year',
                element: <Year />,
            },
        ]
    },
    {
        path: '/new',
        element: <New />,
    }
]);

export default router;

