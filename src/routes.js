import App from "./App";
import NovoProjeto from "./pages/NovoProjeto";
import NavBar from "./components/navBar"
import ListaProjeto from "./components/ListaProjeto";

const router = [
    {
        path: "/",
        element: <App/>
    },
    {
        element: <App />,
        children: [
            {
                path: "/novoProjeto",
                element: <NovoProjeto/>,
            },
            {path: "/listaProjeto",
            element: <ListaProjeto/>
            },
            {
                path: "/navbar",
                element: <NavBar/>
            }
            
        ]
    }
]

export default router
