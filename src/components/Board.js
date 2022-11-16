import React, {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import BoardService from "../services/BoardService";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Button from "@mui/material/Button";
import List from "./List";
import {ClickAwayListener, Paper, TextField} from "@mui/material";
import DivisorLine from "./DivisorLine";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import {useForm} from "react-hook-form";
import ListService from "../services/ListService";

const Board = () => {

    const [styles, setStyles] = useState({
        mainFlex: {
            display: "flex",
            width: "calc(100% - 2*15)",
            maxHeight: "calc(100% - 15px - 10px)", // 100 - paddingBottom - paddingTop - Navbar height
            minHeight: "calc(100% - 15px - 10px)",
            padding: "15px",
            paddingTop: "10px",
            flexDirection: "column",
            gap: "10px"
        },
        topBar: {
            display: "flex",
            width: "calc(100% - 2*15px)",
            textAlign:"left",
            padding: "5px 15px 5px",
            alignItems: "center",
            borderRadius: "10px",
            backgroundColor: "rgb(255,255,255, 0.8)",
        },
        listsContainer: {
            display: "flex",
            flexGrow: 1,
            flexDirection: "row",
            justifyContent: "flexStart",
            overflowX:"auto",
            columnGap: "10px",
            minHeight: "100%"
        },
        favouriteButton: {
            minWidth:0,
            minHeight: 0,
            padding: "5px",
            backgroundColor: 'rgb(0, 0, 0, 0)',
            '&:hover':{
                backgroundColor: 'rgb(0, 0, 0, 0.1)'
            }
        },
        listaBox: {
            maxHeight: "100%"
        },
        addNewListButton: {
            minWidth: "300px",
            maxWidth: "300px",
            maxHeight: "50px",
            backgroundColor: "rgb(255, 255, 255, 0.80)",
            borderRadius: "10px",
            fontFamily: "system-ui",
            textTransform: "none",
            justifyContent: "flex-start",
            color: "#5e646e",
            '&:hover': {
                backgroundColor: 'rgb(255, 255, 255, 0.90)'
            }
        },
        adNewListContainer: {
            minWidth: "300px",
            padding: "10px",
            textAlign: "left",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "rgb(255, 255, 255, 0.80)",
            gap: "5px"
        },
        addNewListButtonsFlex: {
            display: "flex",
            gap: "10px",
            paddingTop: "10px",
            alignItems: "stretch"
        },
        addNewListButtonCancel: {
            minWidth:0,
            minHeight: 0,
            padding: "5px",
            backgroundColor: 'rgb(0, 0, 0, 0)',
            '&:hover':{
                backgroundColor: 'rgb(0, 0, 0, 0.1)'
            }
        }
    })

    const { id } = useParams();
    const [board, setBoard] = useState({listas: []});
    const ref = useRef(null);
    const [addNewListIsIdle, setAddNewListIsIdle] = useState(true)
    const {register, handleSubmit, reset} = useForm();

    useEffect( () => {
        getBoardData();
        mainFlexHeightAdjustment();
        // setBackgroundImage()

    }, [id])

    const getBoardData = () => {
        BoardService.getById(id)
            .then(board => {
                setBoard(board)
                setBackgroundImage(board)
            })
            .catch(error => console.log(error))
    }
    const mainFlexHeightAdjustment = () => {
        let copy = styles;
        const offsetTop = ref.current.offsetTop;
        const newHeight = "calc(100% - 15px - 10px - " + offsetTop + "px)"
        copy.mainFlex = {...copy.mainFlex, minHeight: newHeight, maxHeight: newHeight}
        setStyles(copy)
    }
    const setBackgroundImage = (board) => {
        let copy = styles;
        const imageUrl = `url(\"data:image/jpeg;base64,${board.imagenTableroDto.foto}\")`
        copy.mainFlex = {...copy.mainFlex,
            backgroundImage: imageUrl,
            backgroundSize: "cover",
            backgroundPosition: "center"
        }
        setStyles(copy)
    }

    const addNewListOnClick = () => {
        setAddNewListIsIdle(false)
    }
    const addNewListOnClickAway = () => {
        setAddNewListIsIdle(true)
    }
    const addNewList = async (data) => {
        if(data.name){
            // If there is a title introduced
            data = {...data, boardId: board.id}
            const newList = await ListService.addNewList(data)
            board.listas.push(newList)
            reset()
            addNewListOnClickAway()
        }
    }

    function handleFavoriteChange() {
        board.favorito = !board.favorito;
        BoardService.update(board)
        reset()
    }

    return(
        <Box sx={styles.mainFlex} ref={ref}>

            {/*****TITLE*****/}
            <Paper sx={styles.topBar}>
                <Typography variant="h5" sx={{fontWeight: 700, marginRight: "5px"}}>{board.nombre}</Typography>

                <DivisorLine color={"rgb(0,0,0,0.7)"} size={"20px"}/>

                <Button variant="filled" sx={styles.favouriteButton} onClick={handleFavoriteChange}>
                    {board.favorito ? (
                        <FavoriteIcon/>
                    ) : (
                        <FavoriteBorderIcon/>
                    )}
                </Button>
            </Paper>

            {/*****LISTS*****/}
            <div style={styles.listsContainer}>
                {board.listas.map((list) => {
                    return(
                        <Box sx={styles.listaBox} key={list.posicion}>
                            <List listDataProps={list}/>
                        </Box>
                    )
                })}

                {/*****ADD LISTS*****/}
                {addNewListIsIdle ?
                    <Button sx={styles.addNewListButton} fullWidth={true} onClick={addNewListOnClick}>
                        <AddIcon/> Add new list
                    </Button>
                :
                    <ClickAwayListener onClickAway={addNewListOnClickAway}>
                        <form noValidate autoComplete="off" onSubmit={handleSubmit(addNewList)}>
                            <Paper sx={styles.adNewListContainer}>
                                <TextField
                                    variant="standard"
                                    multiline
                                    autoFocus
                                    maxRows={3}
                                    fullWidth
                                    {...register("name")}
                                    InputProps={{style: {padding: "7px",fontWeight: 600, fontSize: "1.25rem", lineHeight: 1.6}, disableUnderline: true}}
                                    InputLabelProps={{style: {padding: "7px",fontWeight: 600, fontSize: "1.25rem", lineHeight: 1.6}}}>
                                </TextField>


                                <Box sx={styles.addNewListButtonsFlex}>

                                    <Button sx={{fontFamily: "system-ui", textTransform: "none",}}
                                            variant="contained"
                                            disableElevation
                                            type="submit">
                                        Add list
                                    </Button>

                                    <Button variant="filled" sx={styles.addNewListButtonCancel} onClick={addNewListOnClickAway}>
                                        <CloseIcon/>
                                    </Button>

                                </Box>
                            </Paper>
                        </form>
                    </ClickAwayListener>
                }

            </div>
        </Box>
    )
}

export default Board