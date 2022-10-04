import {Paper} from "@mui/material";

const List = () => {

    const styles = {
        list: {
            minWidth: "300px",
            minHeight: "100%"
        }

    }

    return(
        <Paper sx={styles.list}>
            List here
        </Paper>
    )
}

export default List
