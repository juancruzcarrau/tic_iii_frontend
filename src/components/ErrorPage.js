import '../App.css';
import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";

const ErrorPage = () => {

    const styles = {
        mainFlex: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "inherit"
        }
    }

    return (
        <Box sx={styles.mainFlex}>
            <Typography> hello world </Typography>
        </Box>
    );
};

export default ErrorPage;