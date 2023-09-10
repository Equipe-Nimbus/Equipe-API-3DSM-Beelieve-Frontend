import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Outlet/>
      <p>Footer</p>
    </>
  );
}

export default App;
