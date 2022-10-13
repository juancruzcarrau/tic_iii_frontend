import {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import BoardService from "../services/BoardService";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Button from "@mui/material/Button";
import List from "./List";
import {Paper} from "@mui/material";
import DivisorLine from "./DivisorLine";

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
        stack: {
            overflowX: "auto"
        }
    })

    const { id } = useParams();
    const [board, setBoard] = useState({listas: []});
    const ref = useRef(null);

    useEffect( () => {
        getBoardData();
        mainFlexHeightAdjustment();
        // setBackgroundImage()

    }, [id])

    useEffect(() => {
    }, [board])

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

    return(
        <Box sx={styles.mainFlex} ref={ref}>

            <Paper sx={styles.topBar}>
                <Typography variant="h5" sx={{fontWeight: 700, marginRight: "5px"}}>{board.nombre}</Typography>

                <DivisorLine color={"rgb(0,0,0,0.7)"} size={"20px"}/>

                <Button variant="filled" sx={styles.favouriteButton}>
                    {board.favorito ? (
                        <FavoriteIcon/>
                    ) : (
                        <FavoriteBorderIcon/>
                    )}
                </Button>
            </Paper>

            <div style={styles.listsContainer}>
                {board.listas.map((list) => {
                    return(
                        <Box sx={styles.listaBox} key={list.posicion}>
                            <List listData={list}/>
                        </Box>
                    )
                })}
            </div>

        </Box>
    )
}

export default Board