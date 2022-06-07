import {  Button, Dialog } from "@mui/material";
import { Box } from "@mui/system"
import { FC, useEffect, useState } from "react"
import '../App.css';
import { IPosition } from "../services/types";
import { EditPositionBox } from "./edit-position";


// requires prop positionObject
export const PositionBox: FC<IPosition> = (props) => {
    // state to control if position menu is open
    const [ open, setOpen ] = useState(false);

    // handle open and close of menu
    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }


    return (
        <Box className="currentCompanies__position">
            <Button onClick={handleOpen}>{props.position.positionType}</Button>
            
            <Dialog
            className="positionBox__dialog"
            open={open}>
                <Box className="positionBox">
                    <EditPositionBox position={props.position} />

                    <br /><Button onClick={handleClose}>Close</Button>
                </Box>
            </Dialog>
        </Box>
    )
}