import App from "./App";
import ListaProjeto from "./pages/ListaProjeto";
import NovoProjeto from "./pages/NovoProjeto";
import DetalhesProjeto from './pages/DetalhesProjeto'

const router = [
    {
        path: "/",
        element: <App/>
    },
    {   
        path: "/projetos",
        element: <App />,
        children: [
            {   path: "",
                element: <ListaProjeto/>,
            },
            {
                path: "novo-projeto",
                element: <NovoProjeto/>,
            },
            {
                path: ":id",
                element: <DetalhesProjeto/>,
            },
        ]
    }
]

export default router
