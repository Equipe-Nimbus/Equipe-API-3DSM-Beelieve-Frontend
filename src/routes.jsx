import App from "./App";

const router = [
    {
        path: "/",
        element: <App/>
    },
    {
        element: <App />,
        children: [
            {
            
            }
        ]
    }
]

export default router