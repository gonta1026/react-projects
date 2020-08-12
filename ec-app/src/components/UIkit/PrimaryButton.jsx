import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";
import { createStyles } from "@material-ui/core";


const PrimaryButton = ({ color, hoverColor, label, onClick }) => {//
    const classes = (makeStyles((theme) =>
        createStyles({
            "button": {
                backgroundColor: color,
                color: '#000',
                fontSize: 16,
                height: 48,
                marginBottom: 16,
                width: 256,
                "&:hover": {
                    backgroundColor: hoverColor,
                }
            }
        })
    ))();

    return (
        <Button className={classes.button} variant="contained" onClick={() => onClick()}>
            {label}
        </Button>
    );
}

export default PrimaryButton;