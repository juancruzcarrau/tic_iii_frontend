import {Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "./Card";

const List = ({listData}) => {

    const styles = {
        list: {
            minWidth: "300px",
            maxHeight: "calc(100% - 2 * 10px - 2px)",
            padding: "10px",
            textAlign: "left",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "rgb(255, 255, 255, 0.80)"
        },
        listTitle: {
            margin: "5px 10px 5px"
        },
        cardBox: {
            display: "flex",
            flexDirection: "column",
            overflowY: "auto"
        }
    }

    return(
        <Paper sx={styles.list}>
            <Box>
                <Typography variant="h6" sx={styles.listTitle}>
                    {listData.nombre}
                </Typography>
            </Box>

            <Box sx={styles.cardBox}>
                {listData.tarjetas.map(card => {
                    return(
                        <div>
                            <Card cardData={card}/>
                        </div>
                    )
                })}
            </Box>
        </Paper>
    )
}

export default List
