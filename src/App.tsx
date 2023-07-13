import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import BaseLayout from "./components/layout/BaseLayout";
import { routes } from "./routes";
import { useRecoilState } from 'recoil'
import { authStatus } from "./recoil/atoms/authAtoms"

function App() {
  const authCurrent = useRecoilState(authStatus)[0];
  let element;

  //로그인 유무
  if (authCurrent.current) {
    element = <MainLayout />
  } else {
    element = <BaseLayout />
  }

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={element}>
            {routes}
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
