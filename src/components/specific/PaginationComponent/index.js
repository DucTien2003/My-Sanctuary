import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import './paginationComponent.scss';

function PaginationComponent({
  size = 'large',
  comicPerPage = 36,
  comicList,
  handlePageChange = () => {},
}) {
  const totalPage = Math.ceil(comicList.length / comicPerPage);

  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPage}
        variant="outlined"
        shape="rounded"
        showFirstButton
        showLastButton
        size={size}
        onChange={(event, value) => handlePageChange(event, value)}
      />
    </Stack>
  );
}

export default PaginationComponent;
