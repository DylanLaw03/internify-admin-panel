import { Backdrop, Button } from "@mui/material";
import { Box } from "@mui/system"
import { FC, useState } from "react"
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
        <Box className="positionBox">
            <Button onClick={handleOpen}>{props.position.positionType}</Button>
            
            <Backdrop
            sx={{color: '#fff'}}
            open={open}>
                <Box className="positionBox__positionMenu">
                    <EditPositionBox position={props.position}/>

                    <br /><Button onClick={handleClose}>Close</Button>
                </Box>
            </Backdrop>
        </Box>
    )
}