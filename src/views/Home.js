import React from 'react';
import { Link } from '@reach/router';
import { Avatar, Button, Container, Divider, FormControl, Grid, Typography } from '@material-ui/core';

export default function Home({}){

    return (
        <Container maxWidth="sm" style={{marginTop: 20}}>
            <Grid container
                direction="row"
                justify="center"
                alignItems="center"
                >
                    <Link to="/">
                        <img src="https://res-3.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/vwqgoanz91a1lgcwebyc"
                            width="70px"  
                            alt="Bunny Studio" />
                    </Link>
                    <Typography display="inline" variant="h3" color="textPrimary">
                        ToDos
                    </Typography>
            </Grid>
            <Typography display="inline" variant="h6" color="textPrimary">
                Welcome, this is the main page for Bunny Studios To dos list.
            </Typography>
            <br/>
            <Typography display="inline" variant="h6" color="textPrimary">
                Current API: {process.env.REACT_APP_WS_URL}
            </Typography>
            <p>Please select one of the pages to start working</p>
            <Button variant="contained" color="secondary" fullWidth
                component={Link} to="/users">
                {/* <Link to="">Users</Link> */}
                Users
            </Button>
            <Divider style={{padding: 10}} />
            <Button variant="contained" color="primary" fullWidth
                component={Link} to="/tasks">
                User Tasks
            </Button>
        </Container>
    );
}