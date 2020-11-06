import React from 'react';
import { Button, Card, CardActions, Grid, makeStyles, Typography } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';import {
    CardContent,
    CardMedia,
} from "@material-ui/core";

const useStyles = makeStyles({
    root: {
      maxWidth: 300,
    },
    media: {
      height: 140,
    },
});

export default function BunnyCard({title, main, detail, id, item, image, status,
    key, onDelete = () => {}, onUpdate = () => {}, onClick = () => {}}) {
    
      const classes = useStyles();
  
    return (
      <Grid key={key + "-grid"} item>
        <Card className={classes.root} key={`${key}-in`} onClick={onClick}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={image}
              title={title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                  {main}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                  {detail}
              </Typography>
              {
                status &&
                <>
                  <br/>
                  <Typography variant="subtitle2" color="textPrimary" component="label" style={{margin: "2em"}}>
                      <strong>{status}</strong>
                  </Typography>
                </>
              }
            </CardContent>
          </CardActionArea>
          <CardActions>
              <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  startIcon={<DeleteIcon />}
                  onClick={() => onDelete(id)}
              >
                  Delete
              </Button>
              <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  startIcon={<UpdateIcon />}
                  onClick={() => onUpdate(item)}
              >
                  Update
              </Button>
          </CardActions>
        </Card>
      </Grid>
    );
  }
  