import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function RowRadioButtonsGroup({ header,game,setGame }) {
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">{header}</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel onChange={(e)=>setGame(e.target.value)} value="fives" control={<Radio />} label="5x5" />
        <FormControlLabel onChange={(e)=>setGame(e.target.value)} value="sevens" control={<Radio />} label="7x7" />
        <FormControlLabel onChange={(e)=>setGame(e.target.value)} value="elevens" control={<Radio />} label="11x11" />
        <FormControlLabel
          value="disabled"
          disabled
          control={<Radio />}
          label="other"
        />
      </RadioGroup>
    </FormControl>
  );
}
