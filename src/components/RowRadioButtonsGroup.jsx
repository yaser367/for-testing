import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function RowRadioButtonsGroup({ header,game,setGame,handleAvailable,apiData }) {
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">{header}</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        {apiData?.fives != "" && "0" && <FormControlLabel onClick={handleAvailable} onChange={(e)=>setGame(e.target.value)} value="fives" control={<Radio />} label="5x5" />}
        {apiData?.sevens != "" && "0" && <FormControlLabel onClick={handleAvailable} onChange={(e)=>setGame(e.target.value)} value="sevens" control={<Radio />} label="5x5" />}
        {apiData?.elevens != "" && "0" && <FormControlLabel onClick={handleAvailable} onChange={(e)=>setGame(e.target.value)} value="elevens" control={<Radio />} label="5x5" />}
        {apiData?.tennis != "" && "0" && <FormControlLabel onClick={handleAvailable} onChange={(e)=>setGame(e.target.value)} value="tennis" control={<Radio />} label="5x5" />}
        {apiData?.cricket != "" && "0" && <FormControlLabel onClick={handleAvailable} onChange={(e)=>setGame(e.target.value)} value="cricket" control={<Radio />} label="5x5" />}
        {apiData?.otherCount != "" && "0" && <FormControlLabel onClick={handleAvailable} onChange={(e)=>setGame(e.target.value)} value={apiData?.other} control={<Radio />} label="5x5" />}
     
      </RadioGroup>
    </FormControl>
  );
}
