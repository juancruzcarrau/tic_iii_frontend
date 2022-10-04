import React, {useEffect, useState} from 'react';
import Typography from "@mui/material/Typography";
import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Checkbox} from "@mui/material";
import {Card, CardActionArea, CardActions, CardContent, Checkbox} from "@mui/material";
import {Favorite, FavoriteBorder} from "@mui/icons-material";
import BoardService from "../services/BoardService";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuItem from "@mui/material/MenuItem";


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const TableCard = ({tablero, tableChange}) => {

    const style = {
        buttonAction: {
            display: "flex",
            justifyContent: "space-between"
        }
    }

    const [favorito, setFavorito] = useState(tablero.favorito);

    const [onTop, setOnTop] = useState(false);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        setFavorito(tablero.favorito)
    }, [tableChange])

    function handleFavoriteChange() {
        tablero.favorito = !tablero.favorito;
        console.log(tablero)
        BoardService.update(tablero).then(res => {
                setFavorito(res.favorito)
            }
        )
    }

    return (
        <Card sx={{ minHeight: "120px",
                    maxHeight: "35vh"}} raised={true}>
            <CardActionArea>
                {tablero.imagenTableroDto?<CardMedia
                    component="img"
                    height="140"
                    image={`data:image/jpeg;base64,${tablero.imagenTableroDto.foto}`}
                    alt="image"
                />:<></>}
                <CardContent>
                    <Typography variant="h5" component="div">
                        {tablero.nombre}
                    </Typography>
                </CardContent>
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
                        <MenuItem sx={{marginRight: "10px", marginLeft: "10px"}}>Store</MenuItem>
                    </Menu>
                </CardActions>
            </CardActionArea>
        </Card>
    );
};

export default TableCard;