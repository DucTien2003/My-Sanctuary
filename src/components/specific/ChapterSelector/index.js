import * as React from 'react';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const chapterList = [
  { id: 1, name: 'Chapter 1' },
  { id: 2, name: 'Chapter 2' },
  { id: 3, name: 'Chapter 3' },
  { id: 4, name: 'Chapter 4' },
  { id: 5, name: 'Chapter 5' },
  { id: 6, name: 'Chapter 6' },
  { id: 7, name: 'Chapter 7' },
  { id: 8, name: 'Chapter 8' },
  { id: 9, name: 'Chapter 9' },
  { id: 10, name: 'Chapter 10' },
];

export default function ChapterSelector({ initialChapter }) {
  const [chapter, setChapter] = React.useState(initialChapter);

  const handleChange = (event) => {
    setChapter(event.target.value);
  };

  return (
    <div>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="chapter-selector-label">Chapter</InputLabel>
          <Select
            labelId="chapter-selector-label"
            id="chapter-selector"
            value={chapter}
            label="Chapter"
            onChange={handleChange}>
            {chapterList.map((chapter) => (
              <MenuItem key={chapter.id} value={chapter.id}>
                {chapter.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}
