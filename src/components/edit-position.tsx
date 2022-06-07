// box used to hold data for editing a position
import { Box, FormControlLabel, FormGroup, FormLabel, MenuItem, Select, SelectChangeEvent, Switch, TextField, Button } from "@mui/material";
import { FC, useState, useEffect } from "react";
import { IPosition, Season } from "../services/types";


export const EditPositionBox: FC<IPosition> = (props) => {
    // states to hold current status of position attributes, will be used to update a position
    const [ positionTypeState, setPositionTypeState ] = useState(props.position.positionType);
    const [ currentlyOpenState, setCurrentlyOpenState ] = useState(props.position.currentlyOpen);
    const [ positionYearState, setPositionYearState ] = useState(props.position.year);
    const [ positionTermState, setPositionTermState ] = useState(props.position.term);

    // get list of interviews for a position on load
    useEffect(() => {
        fetch('https://internify-api-test.herokuapp.com/getInterviews',{
        method: "POST",
        headers: {
            'accept': 'application/json',
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            "positionID": props.position._id
        })})
        .then(response => response.json())
        .then(response => {
            console.log(props.position._id);
            for (let i in response) {
              console.log(response[i]);
          }})
    }, [])

    // function to update position in DB
    // params: requeired: optional(must have one )year, term(1 = Spring, 2 = summer, 3 = fall, 4 = winter), positionType, currentlyOpen(true or false)
    const handlePositionUpdate = () => {
        fetch('https://internify-api-test.herokuapp.com/updatePosition',{
        method: "PUT",
        headers: {
            'accept': 'application/json',
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            "positionID": props.position._id,
            "year": positionYearState,
            "term": positionTermState,
            "positionType": positionTypeState,
            "currentlyOpen": currentlyOpenState
        })})
        .then(response => {
            if(response.status === 200) {
                alert("Successfully Updated Position");
            }
            else {
                alert("Error Updating Position")
            }
        })
    }

    return (
        <Box>
            <FormGroup className="positionBox__positionMenu">
                <FormLabel>
                    <TextField
                        fullWidth
                        variant="standard"
                        value={positionTypeState}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPositionTypeState(event.target.value)}
                    />
                </FormLabel>

                <FormControlLabel
                    className="positionBox__positionMenu__currentlyOpen"
                    control = {
                        <Switch checked={currentlyOpenState} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCurrentlyOpenState(event.target.checked)}/>
                    }
                    label = "Currently Open"
                    labelPlacement="start"
                />

                <FormLabel>
                    <TextField
                        required
                        variant="standard"
                        value={positionYearState}
                        type="number"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPositionYearState(parseInt(event.target.value))}
                    />
                </FormLabel>

                <Select
                    required
                    value={positionTermState}
                    onChange={(event: SelectChangeEvent<number>) => setPositionTermState(event.target.value as number)}
                >
                    <MenuItem value={1}>{Season[1]}</MenuItem>
                    <MenuItem value={2}>{Season[2]}</MenuItem>
                    <MenuItem value={3}>{Season[3]}</MenuItem>
                    <MenuItem value={4}>{Season[4]}</MenuItem>
                </Select>
                
                <Button onClick={handlePositionUpdate}>Update</Button>
        </FormGroup>
    </Box>

    )
}