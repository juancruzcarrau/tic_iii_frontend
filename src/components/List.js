import {ClickAwayListener, Paper, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "./Card";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import {useState} from "react";

const List = ({listData}) => {

    const [styles, setStyles] = useState({
        list: {
            minWidth: "300px",
            maxHeight: "calc(100% - 2 * 10px - 2px)",
            padding: "10px",
            textAlign: "left",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "rgb(255, 255, 255, 0.80)",
            gap: "5px"
        },
        listTitle: {
            margin: "5px 10px 0px"
        },
        cardFlex: {
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            gap: "10px",
            paddingBottom: "2px"
        },
        addNewCardButton:{
            fontFamily: "system-ui",
            textTransform: "none",
            color: "#5e646e",
            justifyContent: "flex-start",
            '&:hover': {
                backgroundColor: 'rgb(0, 0, 0, 0.1)'
            }
        },
        addNewCardTextField: {
        }
    })

    const [addNewCardIsIdle, setAddNewCardIsIdle] = useState(true)

    const addNewCardOnClick = () => {
        setAddNewCardIsIdle(false)
    }

    const addNewCardOnClickAway = () => {
        setAddNewCardIsIdle(true)
    }


    return(
        <Paper sx={styles.list}>

            {/*****TITLE*****/}
            <Box>
                <Typography variant="h6" sx={styles.listTitle}>
                    {listData.nombre}
                </Typography>
            </Box>

            {/*****CARDS*****/}
            <Box sx={styles.cardFlex}>
                {listData.tarjetas.map(card => {
                    return(
                        <div key={card.posicion}>
                            <Card cardData={card}/>
                        </div>
                    )
                })}
            </Box>

            {/*****ADD CARDS*****/}
            {addNewCardIsIdle ?
                <Button sx={styles.addNewCardButton} fullWidth={true} onClick={addNewCardOnClick}>
                    <AddIcon/> Add new card
                </Button>
            :
                <ClickAwayListener onClickAway={addNewCardOnClickAway}>
                    <Paper>
                        <TextField
                            variant="standard"
                            multiline
                            maxRows={3}
                            fullWidth
                            sx={styles.addNewCardTextField}
                            InputProps={{style: {fontFamily: "system-ui", padding: "7px"}, disableUnderline: true}}
                            InputLabelProps={{style: {fontFamily: "system-ui",padding: "7px"}}}>
                        </TextField>
                    </Paper>
                </ClickAwayListener>
            }
        </Paper>
    )
}

export default List
