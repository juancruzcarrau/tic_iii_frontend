import React, {useEffect, useState} from 'react';
import Typography from "@mui/material/Typography";
import {Box, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Checkbox} from "@mui/material";
import {CreateNewFolder, Favorite, FavoriteBorder} from "@mui/icons-material";
import BoardService from "../services/BoardService";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuItem from "@mui/material/MenuItem";
import {useNavigate} from "react-router-dom";


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const TableCard = ({tablero, tableChange}) => {

    const [style, setStyle] = useState({
        buttonAction: {
            display: "flex",
            justifyContent: "flex-end",
            minHeight: "5hv",
            width: "30%",
        },
        card: { height: "190px",
                maxHeight: "22vh",
                borderRadius: "10px",
        }
    })

    const navigate = useNavigate();

    const [favorito, setFavorito] = useState(tablero.favorito);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        setFavorito(tablero.favorito);
    }, [tableChange])


    function handleFavoriteChange() {
        tablero.favorito = !tablero.favorito;
        BoardService.update(tablero).then(tableChange);
    }


    function handleClickTable() {
        navigate('/board/' + tablero.id);
    }

    function storeTable() {
        tablero.archivado = true;
        BoardService.update(tablero).then(tableChange);
    }

    return (
        <Card sx={style.card} elevation={2}>
            <CardActionArea onClick={tablero.archivado? null:handleClickTable}>
                {tablero.imagenTableroDto?<CardMedia
                    sx={{maxHeight: "14vh"}}
                    component="img"
                    image={`data:image/jpeg;base64,${tablero.imagenTableroDto.foto}`}
                    alt="image"
                />:<></>}
            </CardActionArea>
            <Box sx={{ display: 'flex', flexDirection: 'row', width:"100%" }}>
                <Box sx={{width: "70%", marginLeft: "20px",display: "flex", justifyContent: "flex-start"}}>
                    <Typography level="h2" sx={{ fontSize: 'md',fontWeight: "1000", mt: 2 }} noWrap>
                        {tablero.nombre}
                    </Typography>
                </Box>
                <CardActions sx={style.buttonAction}>
                    <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} checked={favorito} onChange={handleFavoriteChange}/>

                    <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? 'long-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id="long-menu"
                        MenuListProps={{
                            'aria-labelledby': 'long-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        {tablero.archivado? <MenuItem sx={{marginRight: "10px", marginLeft: "10px"}} >Restore</MenuItem>:
                            <MenuItem sx={{marginRight: "10px", marginLeft: "10px"}}
                                   onClick={storeTable}>Archived</MenuItem>
                        }                    </Menu>
                </CardActions>
            </Box>
        </Card>
    );
};

export default TableCard;