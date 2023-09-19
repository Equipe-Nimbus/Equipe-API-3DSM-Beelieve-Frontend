import App from "./App";
import ListaProjeto from "./pages/ListaProjeto";
import NovoProjeto from "./pages/NovoProjeto";

const router = [
    {
        path: "/",
        element: <App/>
    },
    {   
        path: "",
        element: <App />,
        children: [
            {   path: "/projetos",
                element: <ListaProjeto/>,
                handle: {title: 'Projetos'}
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
