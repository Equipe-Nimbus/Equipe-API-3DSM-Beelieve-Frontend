import App from "./App";
import ListaProjeto from "./pages/ListaProjeto";
import NovoProjeto from "./pages/NovoProjeto";
import DetalhesProjeto from './pages/DetalhesProjeto';
import NovaTarefa from "./components/FormCadastroAtividade/NovaTarefa";


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
            {
                path: "tarefas/:idTarefa",
                element: <NovaTarefa/>
            }
        ]
    }
]

export default router