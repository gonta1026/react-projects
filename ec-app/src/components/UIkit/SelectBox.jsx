import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const SelectBox = ({ label, value, required, select, options, }) => {

    const classes = (makeStyles({
        formControl: {
            marginBottom: 16,
            minWidth: 120,
            width: "100%"
        }
    }))();

    return (
        <FormControl className={classes.formControl}>
            <InputLabel >{label}</InputLabel>
            <Select
                value={value} required={required}
                onChange={(e) => select(e.target.value)}
            >
                {options.map((option) => {
                    return <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>
                })}
            </Select>
        </FormControl>
    );
};

export default SelectBox;