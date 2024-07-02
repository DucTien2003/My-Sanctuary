import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 350,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function Filter({ genres }) {
  const theme = useTheme();
  const [selectedGenres, setSelectedGenres] = React.useState([]);

  React.useEffect(() => {
    // console.log(selectedGenres);
  }, [selectedGenres]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedGenres(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  return (
    <div>
      <FormControl sx={{ width: 400 }}>
        <InputLabel id="multiple-filter-label">Filter</InputLabel>
        <Select
          labelId="multiple-filter-label"
          id="multiple-filter"
          multiple
          value={selectedGenres}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Filter" />}
          renderValue={(selected) => (
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 0.5,
              }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}>
          {genres.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, selectedGenres, theme)}>
              <div className="w-full px-4 py-2">{name}</div>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
