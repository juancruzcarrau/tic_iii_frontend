import {ClickAwayListener, Paper, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "./Card";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import CloseIcon from '@mui/icons-material/Close';
import CardService from "../services/CardService";

const List = ({listDataProps}) => {

    const styles = {
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
            margin: "5px 10px 0px",
            fontWeight: "600"
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
        addNewCardButtonsFlex: {
            display: "flex",
            gap: "10px",
            paddingTop: "10px",
            alignItems: "stretch"
        },
        addNewCardButtonCancel: {
            minWidth:0,
            minHeight: 0,
            padding: "5px",
            backgroundColor: 'rgb(0, 0, 0, 0)',
            '&:hover':{
                backgroundColor: 'rgb(0, 0, 0, 0.1)'
            }
        }
    }

    const [listData, setListData] = useState(listDataProps)
    const [addNewCardIsIdle, setAddNewCardIsIdle] = useState(true)
    const {register, handleSubmit, reset} = useForm();
    const [update, setUpdate] = useState(1)


    const addNewCardOnClick = () => {
        setAddNewCardIsIdle(false)
    }
    const addNewCardOnClickAway = () => {
        setAddNewCardIsIdle(true)
    }

    const addNewCard = async (data) => {
        if(data.title){
            // If there is a title introduced
            data = {...data, title: data.title.trim(), listId: listData.id}
            const newCard = await CardService.addNewCard(data)
            console.log(newCard)
            setListData((listData) => {
                listData.tarjetas.push(newCard)
                return listData
            })
            reset()
            addNewCardOnClickAway()
        }
    }
    const updateCard = (newCardData) => {
        setListData((listData) => {
            listData.tarjetas = listData.tarjetas.map(tarjeta => {
                return tarjeta.id === newCardData.id ? newCardData : tarjeta
            })
            return listData
        })
    }
    const deleteCard = (cardId) => {
        setListData((listData) => {
            listData.tarjetas = listData.tarjetas.filter(tarjeta => tarjeta.id !== cardId).map(tarjeta => tarjeta)
            return listData
        })
        setUpdate(value => value + 1)
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
            {listData.tarjetas.length !== 0 && (
                    <Box sx={styles.cardFlex}>
                        {listData.tarjetas.map(card => {
                            return(
                                <div key={card.posicion}>
                                    <Card cardDataProps={card} updateCardInList={updateCard} deleteCardInList={deleteCard}/>
                                </div>
                            )
                        })}
                    </Box>
                )
            }


            {/*****ADD CARDS*****/}
            {addNewCardIsIdle ?
                <Button sx={styles.addNewCardButton} fullWidth={true} onClick={addNewCardOnClick}>
                    <AddIcon/> Add new card
                </Button>
            :
                <ClickAwayListener onClickAway={addNewCardOnClickAway}>
                    <form noValidate autoComplete="off" onSubmit={handleSubmit(addNewCard)}>
                        <Paper sx={{boxShadow: "0px 0px 119px -26px rgba(0,0,0,0.75)",}}>
                            <TextField
                                variant="standard"
                                multiline
                                autoFocus
                                maxRows={3}
                                fullWidth
                                {...register("title")}
                                InputProps={{style: {fontFamily: "system-ui", padding: "10px"}, disableUnderline: true}}
                                InputLabelProps={{style: {fontFamily: "system-ui",padding: "10px"}}}>
                            </TextField>
                        </Paper>

                        <Box sx={styles.addNewCardButtonsFlex}>

                            <Button sx={{fontFamily: "system-ui", textTransform: "none"}}
                                    variant="contained"
                                    disableElevation
                                    type="submit">
                                Add card
                            </Button>

                            <Button variant="filled" sx={styles.addNewCardButtonCancel} onClick={addNewCardOnClickAway}>
                                <CloseIcon/>
                            </Button>

                        </Box>
                    </form>
                </ClickAwayListener>
            }
        </Paper>
    )
}

export default List
