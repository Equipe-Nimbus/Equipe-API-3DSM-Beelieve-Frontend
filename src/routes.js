import App from "./App";
import NovoProjeto from "./pages/NovoProjeto";
import FormValorHora from "./components/FormValorHora/FormValorHora";

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
                element: <NovoProjeto/>
            },
            {
                path: "/ValorHora",
                element: <FormValorHora/>
            }
        ]
    }
]

export default router
