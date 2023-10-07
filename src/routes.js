import App from "./App";
import ListaProjeto from "./pages/ListaProjeto";
import NovoProjeto from "./pages/NovoProjeto";
import DetalhesProjeto from './pages/DetalhesProjeto'
import { element } from "prop-types";
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
            
        ]
    },
    
]

export default router
