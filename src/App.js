import './App.css'
import LoginPage from "./components/LoginPage";
import {createTheme, ThemeProvider} from "@mui/material";
import {Navigate, Route, Routes} from "react-router-dom";
import MainPage from "./components/MainPage";
import UserService from "./services/AuthentictionService";

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

    const ProtectedRoute = ({ children }) => {
        const currentUser = UserService.getCurrentUser();
        if (currentUser === null) {
            return <Navigate to='/' replace />
        }else {
            return children;
        }

    }

  return (
      <ThemeProvider theme={theme}>
          <div className="App">
              <Routes>
                  <Route path='/' element={<LoginPage />} />
                  <Route path='/home' element={<ProtectedRoute> <MainPage /> </ProtectedRoute>} />
              </Routes>
          </div>
      </ThemeProvider>
  );
}

export default App;
