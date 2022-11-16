import {Dialog, FormControlLabel, Paper, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import Box from "@mui/material/Box";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import cardService from "../services/CardService";
import Checkbox from '@mui/material/Checkbox';


const Card = ({cardDataProps, updateCardInList}) => {

    const styles = {
        dialogPaperProps: {
            style: {
                padding: "20px",
                borderRadius: "10px"
            }
        },
        titleInputProps: {
            style: {
                fontFamily: "system-ui",
                padding: "7px",
                backgroundColor: "rgb(0, 0, 0, 0.05)",
                borderRadius: "5px",
                fontWeight: "600",
                fontSize: "1.25rem"
            },
            disableUnderline: true
        },
        descriptionInputProps: {
            style: {
                fontFamily: "system-ui",
                padding: "7px",
                backgroundColor: "rgb(0, 0, 0, 0.05)",
                borderRadius: "5px"
            },
            disableUnderline: true
        },
        dateInputProps: {
            style: {
                fontFamily: "system-ui",
                backgroundColor: "rgb(0, 0, 0, 0.05)",
                borderRadius: "5px",
                padding: "7px",
                border: "0px"
            },
            disableUnderline: true
        },
        inputLabelProps: {
            style: {
                fontFamily: "system-ui",
                padding: "0px"
            }
        },
        dateFlexBox: {
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap"
        },
        checkBox: {
            fontFamily: "system-ui"
        }
    }

    const [cardData, setCardData] = useState(cardDataProps)
    const [isCardExpanded, setIsCardExpanded] = useState(false)
    const {register, handleSubmit, reset, setValue, getValues} = useForm();
    const [stateBeforeLastUpdate, setStateBeforeLastUpdate] = useState()
    const [date, setDate] = useState(null)
    const [completed, setCompleted] = useState(false)

    const expandCard = () => {
        setIsCardExpanded(true)
    }
    const closeCard = () => {
        setIsCardExpanded(false)
    }

    const setupDataForCard = () => {
        const date = cardData.fechaVencimiento != null ?
            new Date(cardData.fechaVencimiento[0], cardData.fechaVencimiento[1] - 1, cardData.fechaVencimiento[2]):
            null
        setDate(date)
        setCompleted(cardData.completada)
        return {
            id: cardData.id,
            title: cardData.titulo,
            description: cardData.descripcion,
            date: date,
            completed: cardData.completada,
        }
    }
    const updateCard = (newCardData) => {
        if(JSON.stringify(newCardData) !== JSON.stringify(stateBeforeLastUpdate)) {
            cardService.updateCard(newCardData).then((newCardData) => {
                setCardData(newCardData)
                updateCardInList(newCardData)
            })
            setStateBeforeLastUpdate(newCardData)
        }
    }
    const handleOnKeyDown = (e) => {
        if(e.key === "Enter" && !e.shiftKey){
            e.preventDefault()
            e.target.blur()
        }
    }
    const mainPaperStyle = () => {
        let style = {
            padding: "10px",
            cursor: "pointer",
            boxShadow: "0px 0px 119px -26px rgba(0,0,0,0.75)",
            "&:hover": {
                filter: "brightness(97%)"
            }
        }

        if (completed) {
            style.borderLeft = 6
            style.borderColor = "#4baf4d"
            style.paddingLeft = "7px"
        } else {
            if (date !== null) {
                const differenceInDays = (date.getTime() - (new Date()).getTime())/(1000 * 3600 * 24)
                if (differenceInDays > 1) {
                    //Do nothing
                } else if (differenceInDays > 0) {
                    style.borderLeft = 6
                    style.borderColor = "#fff304"
                    style.paddingLeft = "7px"
                } else {
                    style.borderLeft = 6
                    style.borderColor = "#e55b4a"
                    style.paddingLeft = "7px"
                }
            }
        }

        return style
    }

    useEffect(() => {
        reset(setupDataForCard())
        setStateBeforeLastUpdate(setupDataForCard())
    }, [])

    return(
        <>
            <Paper sx={mainPaperStyle()} onClick={expandCard}>
                {cardData.titulo}
            </Paper>

            <Dialog
                fullWidth
                maxWidth="sm"
                PaperProps={styles.dialogPaperProps}
                open={isCardExpanded}
                onClose={closeCard}>

                <form onSubmit={handleSubmit(updateCard)}>
                    <Box sx={{display: "flex", flexDirection: "column", gap: "10px"}}>
                        <TextField
                            variant="standard"
                            fullWidth
                            multiline
                            inputProps={{style: {padding: 0}}}
                            InputProps={styles.titleInputProps}
                            InputLabelProps={styles.inputLabelProps}
                            placeholder="Title"
                            {...register("title")}
                            onBlur={handleSubmit(updateCard)}
                            onKeyDown={handleOnKeyDown}/>

                        <TextField
                            variant="standard"
                            fullWidth
                            multiline
                            minRows={5}
                            maxRows={15}
                            inputProps={{style: {padding: 0}}}
                            InputProps={styles.descriptionInputProps}
                            InputLabelProps={styles.inputLabelProps}
                            placeholder="Description"
                            {...register("description")}
                            onBlur={handleSubmit(updateCard)}
                            onKeyDown={handleOnKeyDown}/>

                        <Box sx={styles.dateFlexBox}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    inputFormat="DD-MM-YYYY"
                                    value={date}
                                    onChange={(newDate) => {
                                        const parsedDate = new Date(newDate.$y, newDate.$M, newDate.$D)
                                        setValue("date", parsedDate)
                                        setDate(parsedDate)
                                        console.log(parsedDate)
                                        updateCard(getValues())
                                    }}
                                    renderInput={(params) =>
                                        <TextField {...params}
                                                   variant="outlined"
                                        />
                                    }
                                />
                            </LocalizationProvider>

                            <FormControlLabel control={<Checkbox value={completed}
                                                                 checked={completed}
                                                                 onChange={(newValue) => {
                                                                     setCompleted(newValue.target.checked)
                                                                     setValue("completed", newValue.target.checked)
                                                                     updateCard(getValues())
                                                                 }}/>}
                                              label="Completed"/>
                        </Box>
                    </Box>
                </form>
            </Dialog>
        </>
    )
}

export default Card