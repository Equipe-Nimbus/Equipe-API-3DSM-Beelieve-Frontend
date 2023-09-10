import App from "./App";
import NovoProjeto from "./pages/NovoProjeto";

const router = [
    {
        path: "/",
        element: <App/>
    },
    {
        element: <App />,
        children: [
            {
                path: "/novoProjeto",
                element: <NovoProjeto/>
            }
        ]
    }
]

export default router
