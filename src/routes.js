import App from "./App";
import ListaProjeto from "./pages/ListaProjeto";
import ListaUsuario from "./pages/ListaUsuario";
import NovoProjeto from "./pages/NovoProjeto";
import NovoUsuario from "./pages/NovoUsuario";

import NovaTarefa from "./components/FormCadastroAtividade/NovaTarefa";
import DetalhesProjeto from './pages/DetalhesProjeto';
import DetalhesUsuario from './pages/DetalhesUsuario';
import MudaData from "./pages/MudaData";

const router = [
    {
        path: "/",
        element: <App/>,
        children: [
			{
				path: "muda-data",
				element: <MudaData/>
			},
		]
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
    },
    {   
        path: "/usuario",
        element: <App />,
        children: [
            {   path: "",
                element: <ListaUsuario/>,
            },
            {   path: "novo-usuario",
                element: <NovoUsuario/>,
                // element: <ListaUsuario/>,
            },
            {   path: "listar/:idUsuario",
                element: <DetalhesUsuario/>,
            },
        ]
    },
]

export default router