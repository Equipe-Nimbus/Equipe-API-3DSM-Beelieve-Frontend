import App from "./App";
import ListaProjeto from "./pages/ListaProjeto";
import NovoProjeto from "./pages/NovoProjeto";

import NovaTarefa from "./components/FormCadastroAtividade/NovaTarefa";
import DetalhesProjeto from './pages/DetalhesProjeto'
import MudaData from "./pages/MudaData";

import NovoUsuario from "./pages/NovoUsuario";

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
        path: "/usuarios",
        element: <App />,
        children: [
            {   path: "",
                element: <ListaUsuario/>,
            },
            {
                path: "novo-usuario",
                element: <NovoUsuario/>,
            },
            {
                path: ":id",
                element: <AlterarUsuario/>,
            },
        ]
    },
]

export default router