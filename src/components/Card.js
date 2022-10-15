import {Paper} from "@mui/material";

const Card = ({cardData}) => {

    const styles = {
        mainPaper: {
            padding: "7px",
        }
    }

    return(
        <Paper sx={styles.mainPaper}>
            {cardData.titulo}
        </Paper>
    )
}

export default Card