import React from 'react';
import Image from "material-ui-image";
import { Link } from "@reach/router";import {
    Grid,
    Typography,
} from "@material-ui/core";

export default function ViewTitle({title}){
    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
        >
            <Link to="/">
                <img
                    src="https://res-3.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/vwqgoanz91a1lgcwebyc"
                    width="70px"
                    alt="Bunny Studio"
                />
            </Link>
            <Typography display="inline" variant="h3" color="textPrimary">
                {title}
            </Typography>
        </Grid>
    );
}