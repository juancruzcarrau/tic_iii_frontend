import {Paper} from "@mui/material";
import Typography from "@mui/material/Typography";

const List = ({data}) => {

    const styles = {
        list: {
            minWidth: "300px",
            minHeight: "calc(100% - 2 * 10px - 2px)",
            padding: "10px",
            textAlign: "left",
            borderRadius: "10px"
        },
        mainFlex: {
            display: "flex",
            flexDirection: "column",
            maxHeight: "100%"
        },
        listTitle: {
            margin: "5px 10px 5px"
        }
    }

    return(
        <Paper sx={styles.list}>
            <div style={styles.mainFlex}>
                <div>
                    <Typography variant="h6" sx={styles.listTitle}>
                        {data.nombre}
                    </Typography>
                </div>

                <div>
                </div>

            </div>
        </Paper>
    )
}

export default List
