// box used to hold data for editing a position
import { Box, FormControlLabel, FormGroup, Switch, TextField } from "@mui/material";
import { FC, useState } from "react";
import { IPosition } from "../services/types";


export const EditPositionBox: FC<IPosition> = (props) => {
    // states to hold current status of position attributes, will be used to update a position
    const [ positionTypeState, setPositionTypeState ] = useState(props.position.positionType);
    const [ currentlyOpenState, setCurrentlyOpenState ] = useState(props.position.currentlyOpen);
    const [ positionYearState, setPositionYearState ] = useState(props.position.year);
    const [ positionTermState, setPositionTermState ] = useState(props.position.term);

    

    return (
        <Box className="positionBox__positionMenu__positionInfo">
            {positionTypeState} <br />
            {String(currentlyOpenState)} <br />
            {positionYearState} <br />
            {positionTermState} <br />

            <FormGroup className="positionBox__positionMenu__positionInfo__formGroup">
                <TextField
                variant="standard"
                value={positionTypeState}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPositionTypeState(event.target.value)}
            />

            <FormControlLabel 
                control = {
                    <Switch checked={currentlyOpenState} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCurrentlyOpenState(event.target.checked)}/>
                }
                label = "Currently Open"
                labelPlacement="start"
            />
            </FormGroup>
        </Box>
    )
}