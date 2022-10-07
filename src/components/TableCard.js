import React, {useEffect, useState} from 'react';
import Typography from "@mui/material/Typography";
import {Box, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Checkbox} from "@mui/material";
import {CreateNewFolder, Favorite, FavoriteBorder} from "@mui/icons-material";
import BoardService from "../services/BoardService";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuItem from "@mui/material/MenuItem";
import {AspectRatio, CardCover, Link} from "@mui/joy";


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const TableCard = ({tablero, tableChange}) => {

    const [style, setStyle] = useState({
        buttonAction: {
            display: "flex",
            justifyContent: "flex-end",
            minHeight: "5hv",
            width: "35%",
        },
        card: { minHeight: "120px",
                height: "85%",
                maxHeight: "22vh",
                borderRadius: "10px",
        }
    })

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
        console.log(tablero)
        BoardService.update(tablero).then(tableChange)
    }

    return (
        <Card sx={style.card} elevation={2}>
            <CardActionArea>
                {tablero.imagenTableroDto?<CardMedia
                    sx={{maxHeight: "14vh"}}
                    component="img"
                    image={`data:image/jpeg;base64,${tablero.imagenTableroDto.foto}`}
                    alt="image"
                />:<></>}

                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Typography level="h2" sx={{ fontSize: 'md',fontWeight: "1000", mt: 2, width: "60%", display: "flex", justifyContent: "flex-start", marginLeft: "20px" }}>
                        {tablero.nombre}
                    </Typography>
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
                </Box>
            </CardActionArea>
        </Card>
    );
};

export default TableCard;