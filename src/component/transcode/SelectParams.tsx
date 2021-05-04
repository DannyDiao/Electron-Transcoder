import React from "react";
import { makeStyles, Theme } from '@material-ui/core/styles';
import { createStyles, FormControl, InputLabel, MenuItem } from '@material-ui/core';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    }
  })
);

export default function SelectParams() {
  const classes = useStyles();
  const [age, setAge] = React.useState('');

  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
};
