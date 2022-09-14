import './App.css'
import LoginPage from "./components/LoginPage";
import { createTheme, ThemeProvider} from "@mui/material";

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
  return (
      <ThemeProvider theme={theme}>
          <div className="App">
            <LoginPage/>
          </div>
      </ThemeProvider>
  );
}

export default App;
