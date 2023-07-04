import { Stack, Typography, CircularProgress, TextField } from '@mui/material';
import { List, ListItem } from '@mui/material';
import { useRecoilState } from 'recoil';
import { useEffect } from 'preact/hooks';
import CircleIcon from '@mui/icons-material/Circle';

import NavBar from './components/navbar';
import { CourseViewDialog } from './components/CourseViewDialog';
import { apiResultsSeachPage, loadingSearchPage, searchTextSearchPage } from './components/atoms';

export function Search({}: any) {
  const [searchText, setSearchText] = useRecoilState(searchTextSearchPage);
  const [apiResults, setApiResults] = useRecoilState(apiResultsSeachPage);
  const [loading, setLoading] = useRecoilState(loadingSearchPage);

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
            setLoading(false);
          }
        });
      });
      return () => {
        ignore = true;
      };
    }
  }, [searchText]);

  return (
    <div>
      <NavBar />
      <Stack direction="column" alignItems="center" justify="center" spacing={2} p={4}>
        <Typography variant="h2" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          Search
        </Typography>
        <TextField
          label="Search"
          value={searchText}
          onChange={handleSearchTextChange}
          fullWidth
          autoFocus
        />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          Click on a course to view more information!
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <List>
            {apiResults.map((result: any) => (
              <ListItem key={result._id}>
                <CircleIcon />
                <CourseViewDialog course={result} />
              </ListItem>
            ))}
          </List>
        )}
      </Stack>
    </div>
  );
}
