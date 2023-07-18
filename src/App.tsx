import { BrowserRouter, Route, Routes, HashRouter } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import BaseLayout from "./components/layout/BaseLayout";
import { routes } from "./routes";
import { useRecoilState } from 'recoil'
import { authStatus } from "./recoil/atoms/authAtoms"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  const authCurrent = useRecoilState(authStatus)[0];
  let element;

  //로그인 유무
  if (authCurrent.current) {
    element = <MainLayout />
  } else {
    element = <BaseLayout />
  }

  const Theme = createTheme({
    palette: {
      background: {
        default: "#dbd9d3"
      },
    },
  });

  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <HashRouter>
        <Routes>
          <Route path="/" element={element}>
            {routes}
          </Route>
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
