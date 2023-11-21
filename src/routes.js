import App from "./App";
import ListaProjeto from "./pages/ListaProjeto";
import ListaUsuario from "./pages/ListaUsuario";
import NovoProjeto from "./pages/NovoProjeto";
import NovoUsuario from "./pages/NovoUsuario";

import NovaTarefa from "./components/FormCadastroAtividade/NovaTarefa";
import DetalhesProjeto from './pages/DetalhesProjeto';
import FormAlterarDadosUsuario from './components/FormAlterarDadosUsuario/FormAlterarDadosUsuario';
import MudaData from "./pages/MudaData";
import Login from "./components/login.jsx"

const router = [
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path:"",
                element: <Login/>
            },
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
            {   path: "novo-usuario",
                element: <NovoUsuario/>,
            },
            {   path: "editar-informacoes/:idUsuario",
                element: <FormAlterarDadosUsuario/>,
            },
        ]
    },
]

export default router