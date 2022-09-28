import React, {useEffect, useState} from 'react';
import Typography from "@mui/material/Typography";
import {Button, Card, CardActionArea, CardActions, CardContent, Checkbox} from "@mui/material";
import {Favorite, FavoriteBorder} from "@mui/icons-material";
import TableService from "../services/TableService";
import login from "./Login";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const TableCard = ({tablero, tableChange}) => {

    const [favorito, setFavorito] = useState(tablero.favorito);

    useEffect(() => {
        setFavorito(tablero.favorito)
    }, [tableChange])

    function handleFavoriteChange() {
        tablero.favorito = !tablero.favorito;
        console.log(tablero)
        TableService.update(tablero).then(res => {
                setFavorito(res.favorito)
            }
        )
    }

    return (
        <Card sx={{ minHeight: "120px",
                    maxHeight: "180px"}} raised={true}>
            <CardActionArea>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Table
                    </Typography>
                    <Typography variant="h5" component="div">
                        {tablero.nombre}
                    </Typography>
                    <Typography sx={{ mb: 0.5 }} color="text.secondary">
                        Last modification: {tablero.fechaModificacion}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} checked={favorito} onChange={handleFavoriteChange}/>
                </CardActions>
            </CardActionArea>
        </Card>
    );
};

export default TableCard;