import {Box, Paper} from "@mui/material";
import Login from "./Login";

const LoginPage = () => {

    const styles = {
        paper: {
            maxWidth: "350px",
            padding: "20px",
            borderRadius: "20px",
            boxShadow: "0px 0px 92px -15px rgba(0,0,0,0.88)"
        },
        back: {
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#001845"
        }
    }

    return (
        <Box sx={styles.back}>
            <Paper sx={styles.paper}>
                <Login/>
            </Paper>
        </Box>

    )
}

export default LoginPage