import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import { List, ListItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'preact/hooks';
import { useRecoilState } from 'recoil';

import {
  courseSearchDialogStatus,
  loadingSearchPage,
  apiResultsSeachPage,
  searchTextSearchPage,
} from './atoms';
import { CourseViewDialog } from './CourseViewDialog';
import PaginationComponent from './PaginationComponent';

const SearchModal = () => {
  const [loading, setLoading] = useRecoilState(loadingSearchPage);
  const [courseSearchDialogStatusView, setCourseSearchDialogStatusView] =
    useRecoilState(courseSearchDialogStatus);
  const [searchText, setSearchText] = useRecoilState(searchTextSearchPage);
  const [apiResults, setApiResults] = useRecoilState(apiResultsSeachPage);
  const itemsPerPage = 5; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);
  let totalPages;
  let indexOfLastItem;
  let indexOfFirstItem;
  let currentItems;

  const handleSearchTextChange = (event: any) => {
    setSearchText(event.target.value);
    console.log('searching for: (onChange)' + searchText);
    console.log('searching for: ' + event.target.value);
  };

  useEffect(() => {
    let ignore = false;
    if (searchText === '') {
      setApiResults([]);
      return;
    } else {
      setLoading(true);
      fetch(`https://vanderbilt-catalog-api.onrender.com/search/${searchText}`).then((res) => {
        res.json().then((data) => {
          if (!ignore) {
            setApiResults(data.courses.hits);
            setCurrentPage(1);
            setLoading(false);
          }
        });
      });
      return () => {
        ignore = true;
      };
    }
  }, [searchText]);

  const closeModal = () => {
    setCourseSearchDialogStatusView(false);
  };

  const generateRandomNum = () => {
    return Math.floor(Math.random() * 1000000);
  };
  // pagination code
  totalPages = Math.ceil(apiResults.length / itemsPerPage);
  indexOfLastItem = currentPage * itemsPerPage;
  indexOfFirstItem = indexOfLastItem - itemsPerPage;
  currentItems = apiResults.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event: any, page: any) => {
    setCurrentPage(page);
    console.log(event);
    // Recalculate these values when the page changes
    indexOfLastItem = page * itemsPerPage;
    indexOfFirstItem = indexOfLastItem - itemsPerPage;
    currentItems = apiResults.slice(indexOfFirstItem, indexOfLastItem);
  };

  return (
    <div>
      <Dialog
        open={courseSearchDialogStatusView}
        onClose={() => {
          closeModal();
        }}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        fullWidth
      >
        <DialogTitle
          id="dialog-title"
          sx={{ pb: 2, fontFamily: 'Monospace', display: 'flex', flexDirection: 'row' }}
        >
          <IconButton
            onClick={() => {
              closeModal();
            }}
            aria-label="close-dialog"
          >
            <CloseIcon />
          </IconButton>
          Course Search
        </DialogTitle>

        <DialogContent
          id="dialog-description"
          sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
          <TextField
            label="Search"
            value={searchText}
            onChange={handleSearchTextChange}
            fullWidth
            autoFocus
            id={generateRandomNum().toString()}
          />
          {loading ? (
            <CircularProgress />
          ) : (
            <div>
              <List sx={{ listStyleType: 'disc', pl: 2 }}>
                {apiResults.length > 0 ? (
                  currentItems.map((result: any) => (
                    <ListItem
                      key={result._id}
                      sx={{
                        display: 'list-item',
                        flexDirection: 'row',
                        width: '100%',
                        fontFamily: 'Monospace',
                      }}
                    >
                      <CourseViewDialog course={result} />
                    </ListItem>
                  ))
                ) : (
                  <Typography
                    variant="body1"
                    component="div"
                    sx={{ fontFamily: 'Monospace', display: 'flex', justifyContent: 'center' }}
                  >
                    No results found
                  </Typography>
                )}
              </List>
              {apiResults.length > 0 ? (
                <PaginationComponent
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              ) : (
                <div></div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export { SearchModal };
