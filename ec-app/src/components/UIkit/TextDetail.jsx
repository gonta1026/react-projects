import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

const TextDetail = (props) => {
    const { label, value } = props

    const classes = (makeStyles({
        row: {
            display: 'flex',
            flexFlow: 'row wrap',
            marginBottom: 16
        },
        label: {
            marginLeft: 0,
            marginRight: 'auto'
        },
        value: {
            fontWeight: 600,
            marginLeft: 'auto',
            marginRight: 0
        }
    }))();

    return (
        <div className={classes.row}>
            <div className={classes.label}>{label}</div>
            <div className={classes.value}>{value}</div>
        </div>
    );
};

export default TextDetail;