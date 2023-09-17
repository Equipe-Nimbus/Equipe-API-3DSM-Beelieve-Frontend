import App from "./App";
import ListaProjeto from "./components/ListaProjeto";
import NovoProjeto from "./pages/NovoProjeto";

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
            {   path: "/projetos/todos",
                element: <ListaProjeto/>,
            },
            {
                path: "/projetos/novo-projeto",
                element: <NovoProjeto/>,
                handle: {title: "Novo projeto"}
            },
        ]
    }
]

export default router
