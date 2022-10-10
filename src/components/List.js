import {Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "./Card";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import {useEffect, useRef} from "react";

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
        },
        addNewCardButton:{
            fontFamily: "system-ui",
            textTransform: "none",
            color: "#5e646e",
            justifyContent: "flex-start",
            '&:hover': {
                backgroundColor: 'rgb(0, 0, 0, 0.1)'
            }
        }
    }

    const addNewCardButtonRef = useRef()

    useEffect(() => {
        console.log(addNewCardButtonRef)
    }, [addNewCardButtonRef])

    return(
        <Paper sx={styles.list}>

            {/*****TITLE*****/}
            <Box>
                <Typography variant="h6" sx={styles.listTitle}>
                    {listData.nombre}
                </Typography>
            </Box>

            {/*****CARDS*****/}
            <Box sx={styles.cardBox}>
                {listData.tarjetas.map(card => {
                    return(
                        <div key={card.posicion}>
                            <Card cardData={card}/>
                        </div>
                    )
                })}
            </Box>

            {/*****ADD CARDS*****/}
            <Box>
                <Button ref={addNewCardButtonRef} sx={styles.addNewCardButton} fullWidth={true}>
                    <AddIcon/> Add new card
                </Button>
            </Box>
        </Paper>
    )
}

export default List
