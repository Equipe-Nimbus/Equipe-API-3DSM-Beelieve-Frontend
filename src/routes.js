import App from "./App";
import NovoProjeto from "./pages/NovoProjeto";
//import { Link } from "react-router-dom";

const router = [
    {
        path: "/",
        element: <App/>
    },
    {   
        path: "/projetos",
        element: <App />,
        handle: {title: 'Projetos'},
        children: [
            {
                path: "/projetos/novo-projeto",
                element: <NovoProjeto/>,
                handle: {title: "Novo projeto"}
            }
        ]
    }
]

export default router
