import {Alert, Collapse, Dialog, FormControlLabel, Paper, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import Box from "@mui/material/Box";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import cardService from "../services/CardService";
import Checkbox from '@mui/material/Checkbox';


const Card = ({cardDataProps, updateCardInList}) => {

    const [styles, setStyles] = useState({
        mainPaper: {
            padding: "7px",
            cursor: "pointer",
            "&:hover": {
                filter: "brightness(90%)"
            }
        },
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
    })

    const [cardData, setCardData] = useState(cardDataProps)
    const [isCardExpanded, setIsCardExpanded] = useState(false)
    const {register, handleSubmit, reset, setValue, getValues} = useForm();
    const [stateBeforeLastUpdate, setStateBeforeLastUpdate] = useState()
    const [date, setDate] = useState(null)
    const [alert, setAlert] = useState(false)
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
            setAlert(true)
            setStateBeforeLastUpdate(newCardData)
        }
    }
    const handleOnKeyDown = (e) => {
        if(e.key === "Enter" && !e.shiftKey){
            e.preventDefault()
            e.target.blur()
        }
    }
    const updateBackgroundColor = () => {
        console.log("Completed: ", completed)
        let newStyles = styles
        if (completed) {
            newStyles.mainPaper.backgroundColor = "#edf7ed"
        } else {
            console.log(date)
            if (date !== null) {
                console.log("Has relevant date")
                const differenceInDays = (date.getTime() - (new Date()).getTime())/(1000 * 3600 * 24)
                console.log(differenceInDays)
                if (differenceInDays > 1) {
                    newStyles.mainPaper.backgroundColor = "white"
                } else if (differenceInDays > 0) {
                    newStyles.mainPaper.backgroundColor = "#fff4e5"
                } else {
                    newStyles.mainPaper.backgroundColor = "#fdeded"
                }
            } else {
                newStyles.mainPaper.backgroundColor = "white"
            }
        }
        setStyles(newStyles)
    }

    useEffect(() => {
        reset(setupDataForCard())
        setStateBeforeLastUpdate(setupDataForCard())
    }, [])
    useEffect(() => {
        setTimeout(async () => {
           await setAlert(false)
        }, 3000)
    }, [alert])
    useEffect(() => {
        updateBackgroundColor()
    }, [completed, date])


    return(
        <>
            <Paper sx={styles.mainPaper} onClick={expandCard}>
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
                                        setValue("date", newDate)
                                        setDate(newDate)
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

                        <Collapse in={alert}>
                            <Alert severity="success">Card updated successfully!</Alert>
                        </Collapse>
                    </Box>
                </form>
            </Dialog>
        </>
    )
}

export default Card