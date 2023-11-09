import App from "./App";
import ListaProjeto from "./pages/ListaProjeto";
import ListaUsuario from "./pages/ListaUsuario";
import NovoProjeto from "./pages/NovoProjeto";
import NovoUsuario from "./pages/NovoUsuario";
import VisualizarUsuario from "./pages/VisualizarUsuario";
import FormVisualizarUsuario from "./components/FormVisualizarUsuario/FormVisualizarUsuario";

import NovaTarefa from "./components/FormCadastroAtividade/NovaTarefa";
import DetalhesProjeto from './pages/DetalhesProjeto';
import FormAlterarDadosUsuario from './components/FormAlterarDadosUsuario/FormAlterarDadosUsuario';
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
        path: "/usuarios",
        element: <App />,
        children: [
            {   path: "",
                element: <ListaUsuario/>,
            },
            {   path: "visualizar",
                element: <FormVisualizarUsuario/>,
            },
            {   path: "novo-usuario",
                element: <NovoUsuario/>,
            },
            {   path: "editar-informacoes/:idUsuario",
                element: <FormAlterarDadosUsuario/>,
            },
            {   path: "visualizar-usuario/:idUsuario",
                element: <VisualizarUsuario/>,
            },
        ]
    },
]

export default router