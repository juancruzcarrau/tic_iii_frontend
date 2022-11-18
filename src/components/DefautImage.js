import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";

const DefautImage = ({image, imageSelected, functionSelection}) => {

    const [selected, setSelescted] = useState(true);

    const [styles, setStyles] = useState({
        container: {
            height: "80px",
            width: "130px",
            marginRight: "10px",
            borderRadius: "10px",
            '&:hover': {
                backgroundColor: 'primary.main',
                opacity: [0.9, 0.8, 0.7],
            }
        },
        image: {
            objectFit: "cover",
            height: "100%",
            width: "100%",
            borderRadius: "10px",
            cursor: "pointer",
        },
        imageSelected: {
            objectFit: "cover",
            height: "100%",
            width: "100%",
            borderRadius: "10px",
            cursor: "pointer",
            borderStyle: "solid",
            borderWidth: "2px"
        }
    })

    function handleClick() {
        functionSelection(image.id);
    }

    return (
        <Box sx={styles.container}>
            <img src={`data:image/jpeg;base64,${image.foto}`} style={imageSelected? styles.imageSelected : styles.image} onClick={handleClick}/>
        </Box>
    );
};

export default DefautImage;