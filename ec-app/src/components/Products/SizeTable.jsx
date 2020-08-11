import React from 'react';
import { Table, TableCell, TableRow, TableBody, IconButton, TableContainer } from "@material-ui/core";

import { ShoppingCart, FavoriteBorder } from '@material-ui/icons';
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
    iconCell: {
        padding: 0,
        height: 48,
        width: 48
    }
});


const SizeTable = (props) => {
    const classes = useStyles()
    const sizes = props.sizes;
    const product = props.product

    return (
        <TableContainer>
            <Table aria-label="simple table">
                <TableBody>
                    {sizes.length > 0 && (
                        sizes.map((item) => (
                            <TableRow key={item.size}>
                                <TableCell component="th" scope="row">{item.size}</TableCell>
                                <TableCell>残り{item.quantity}点</TableCell>
                                <TableCell className={classes.iconCell}>
                                    {item.quantity > 0 ? (
                                        <IconButton onClick={() => { props.addProduct(item.size) }}
                                            className={classes.iconCell}
                                        >
                                            <ShoppingCart />
                                        </IconButton>
                                    ) : (
                                            <div>売切</div>
                                        )}
                                </TableCell>
                                <TableCell className={classes.iconCell}>
                                    <IconButton className={classes.iconCell}>
                                        <FavoriteBorder />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default SizeTable;