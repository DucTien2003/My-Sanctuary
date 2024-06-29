import * as React from 'react';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Link, useParams } from 'react-router-dom';

import { formatPath } from '@/utils';

export default function ChapterSelector({
  comicId,
  listChapters,
  initialChapter,
}) {
  const { comicName } = useParams();

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
            {listChapters.map((chapter, index) => (
              <MenuItem value={chapter.index} key={index}>
                <Link
                  to={`/${formatPath(comicName)}/${comicId}/${formatPath(chapter.name)}/${chapter.id}`}
                  className="w-full px-4 py-2">
                  {chapter.name}
                </Link>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}
