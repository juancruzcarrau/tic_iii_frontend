import {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import BoardService from "../services/BoardService";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Button from "@mui/material/Button";
import List from "./List";

const Board = () => {

    const [styles, setStyles] = useState({
        mainFlex: {
            display: "flex",
            width: "calc(100% - 2*15)",
            minHeight: "calc(100% - 15px - 10px)", // 100 - paddingBottom - paddingTop - Navbar height
            padding: "15px",
            paddingTop: "10px",
            flexDirection: "column",
            rowGap: "5px"
        },
        topBar: {
            display: "flex",
            width: "calc(100% - 2*5px)",
            textAlign:"left",
            padding: "5px",
            alignItems: "center",
            gap: "10px",
        },
        listsContainer: {
            display: "flex",
            flexGrow: 1,
            flexDirection: "row",
            justifyContent: "flexStart",
            overflowX:"auto",
            columnGap: "10px",
            maxHeight: "100%"
        },
        favouriteButton: {
            minWidth:0,
            minHeight: 0,
            padding: "5px",
            backgroundColor: '#e1e2e6',
            '&:hover':{
                backgroundColor: '#BABFCB'
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

    useEffect(() => {
        getBoardData();
        mainFlexHeightAdjustment();
    }, [])

    const getBoardData = () => {
        BoardService.getById(id)
            .then(board => {
                setBoard(board)
                console.log(board)
            })
            .catch(error => console.log(error))
    }
    const mainFlexHeightAdjustment = () => {
        let copy = styles;
        const offsetTop = ref.current.offsetTop;
        copy.mainFlex = {...copy.mainFlex, minHeight: "calc(100% - 15px - 10px - " + offsetTop + "px)"}
        setStyles(copy)
    }

    return(
        <Box sx={styles.mainFlex} ref={ref}>

            <Box sx={styles.topBar}>
                <Typography variant="h5" sx={{fontWeight: 700}}>{board.nombre}</Typography>
                <Button variant="filled" sx={styles.favouriteButton}>
                    {board.favorito ? (
                        <FavoriteIcon/>
                    ) : (
                        <FavoriteBorderIcon/>
                    )}
                </Button>
            </Box>

            <div style={styles.listsContainer}>
                {board.listas.map((list) => {
                    return(
                        <Box sx={styles.listaBox}>
                            <List key={list.posicion} data={list}/>
                        </Box>
                    )
                })}
            </div>

        </Box>
    )
}

export default Board