import './App.css'
import LoginPage from "./components/LoginPage";
import {createTheme, ThemeProvider} from "@mui/material";
import {Navigate, Route, Routes} from "react-router-dom";
import MainPage from "./components/MainPage";
import UserService from "./services/UserService";

const theme = createTheme({
    palette: {
        primary: {
            main: '#023E7D'
        }
    },
    typography: {
        fontFamily:"Montserrat"
    }
})


function App() {

    const ProtectedRouteLogin = ({ children }) => {
        const currentUser = UserService.getCurrentUser();
        if (currentUser !== null) {
            return <Navigate to='/home' replace />
        }else {
            return children;
        }

    }

    const ProtectedRouteMain = ({ children }) => {
        const currentUser = UserService.getCurrentUser();
        if (currentUser === null) {
            return <Navigate to='/login' replace />
        }else {
            return children;
        }

    }

  return (
      <ThemeProvider theme={theme}>
          <div className="App">
              <Routes>
                  <Route path='/login' element={<ProtectedRouteLogin> <LoginPage /> </ProtectedRouteLogin>} />
                  <Route path='/*' element={<ProtectedRouteMain> <MainPage /> </ProtectedRouteMain>} />
              </Routes>
          </div>
      </ThemeProvider>
  );
}

export default App;
