import React, { useCallback, useMemo, useState } from 'react';
import { TextInput } from "../UIkit";
import IconButton from "@material-ui/core/IconButton";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from "@material-ui/styles";


const SetSizesArea = (props) => {
    const { sizes, setSizes } = props;

    const classes = (makeStyles({
        checkIcon: {
            float: 'right'
        },
        iconCell: {
            padding: 0,
            height: 48,
            width: 48
        },
        width: {
            width: "50%"
        }
    }))();

    const [index, setIndex] = useState(0),
        [size, setSize] = useState(""),
        [quantity, setQuantity] = useState(0);

    const inputSize = useCallback((event) => {
        setSize(event.target.value)
    }, [setSize]);

    const inputQuantity = useCallback((event) => {
        setQuantity(event.target.value)
    }, [setQuantity]);

    const addSize = (index, size, quantity) => {
        if (size === "" || quantity === 0) {//空であれば追加できない
            return false
        } else {
            if (index === sizes.length) {//sizeの編集の時は必ずindexが一致するのでここを通る。
                setSizes(prevState => [...prevState, { size: size, quantity: quantity }]);//元のsizesと追加されたsizesをマージさせる
                // setIndex(index + 1);//memoIndexがあるのでいらないかも
                setSize("");
                setQuantity(0)
            } else { //ここにはsizeの編集ボタンを押した後に通る。
                const newSizes = sizes;
                newSizes[index] = { size: size, quantity: quantity };
                setSizes(newSizes);
                setIndex(newSizes.length) //indexを編集対象に変更
                setSize("");
                setQuantity(0);
            }
        }
    }

    const editSize = (index, size, quantity) => {
        setIndex(index)
        setSize(size)
        setQuantity(quantity)
    }

    const deleteSize = (deleteIndex) => {
        const newSizes = sizes.filter((item, index) => index !== deleteIndex)
        setSizes(newSizes);
    }

    const memoIndex = useMemo(() => {
        alert("sizeの初期値設定と追加、削除時はここが実行されます！")
        setIndex(sizes.length)
    }, [sizes.length])

    return (
        <div aria-label="サイズ展開">
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>サイズ</TableCell>
                            <TableCell>数量</TableCell>
                            <TableCell className={classes.iconCell} />
                            <TableCell className={classes.iconCell} />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sizes.length > 0 && (
                            sizes.map((item, index) => (
                                <TableRow key={item.size}>
                                    <TableCell component="th" scope="row">{item.size}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell className={classes.iconCell}>
                                        <IconButton className={classes.iconCell} onClick={() => editSize(index, item.size, item.quantity)}>
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell className={classes.iconCell}>
                                        <IconButton className={classes.iconCell} onClick={() => deleteSize(index)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
                <div>
                    <TextInput
                        fullWidth={false} label={"サイズ"} multiline={false} required={true}
                        onChange={inputSize} rows={1} value={size} type={"text"}
                        className={classes.width}
                    />
                    <TextInput
                        fullWidth={false} label={"数量"} multiline={false} required={true}
                        onChange={inputQuantity} rows={1} value={quantity} type={"number"}
                        className={classes.width}
                    />
                </div>
                <IconButton className={classes.checkIcon} onClick={() => addSize(index, size, quantity)}>
                    <CheckCircleIcon />
                </IconButton>
            </TableContainer>
            <div className="module-spacer--small" />
        </div>
    );
};

export default SetSizesArea;