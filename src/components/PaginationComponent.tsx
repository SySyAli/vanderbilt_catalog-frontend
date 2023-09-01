import {Pagination} from '@mui/material'


const PaginationComponent = ({ currentPage, totalPages, onPageChange }: any) => {
    return (
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={onPageChange}
        sx={{ display: 'flex', justifyContent: 'center', fontFamily: 'Monospace' }}
      />
    );
  };
  
  export default PaginationComponent;