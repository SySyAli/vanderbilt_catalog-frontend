/*
 * CourseSearchDialog.tsx
 * Description: This component is a dialog that allows the user to search for a course and send the selected course to the parent component
 */

import Button from '@mui/material/Button';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  ListItemButton,
  Typography,
} from '@mui/material';
import { List, ListItem, CircularProgress, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'preact/hooks';
import { useRecoilState } from 'recoil';

import { CourseViewDialog } from '../components/CourseViewDialog';
import {
  openCourseDialog,
  searchTextDialog,
  apiResultsDialog,
  loadingDialog,
  currIDs,
  semesterArray,
} from './atoms';

import PaginationComponent from './PaginationComponent';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Pagination } from 'react-instantsearch';
import { useHits } from 'react-instantsearch';
import 'instantsearch.css/themes/satellite.css';

const searchClient = algoliasearch('WD6VZ40OGV', '3797c53026949327da8d97616d2efc7e');

export function CourseSearchDialog({ possibilityId, semesterId }: any) {
  const [open, setOpen] = useRecoilState(openCourseDialog);
  const [searchText, setSearchText] = useRecoilState(searchTextDialog);
  const [apiResults, setApiResults] = useRecoilState(apiResultsDialog);
  const [loading, setLoading] = useRecoilState(loadingDialog);
  const [currIDsView, setCurrIDsView] = useRecoilState<any>(currIDs);
  const [semesterArrayView, setSemesterArrayView] = useRecoilState(semesterArray);

  function Hit({ result, key }: any) {
    return (
      <ListItem
        key={key}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          fontFamily: 'Monospace',
        }}
      >
        <IconButton
          onClick={() => {
            handleAddCourse(result);
          }}
          variant="outlined"
          aria-label="add-course"
          size="small"
          sx={{ width: 'fit-content', maxWidth: '40px' }}
        >
          <AddIcon fontSize="small" />
        </IconButton>

        <CourseViewDialog course={result} sx={{ width: 'fit-content' }} />
      </ListItem>
    );
  }

  function CustomHits(props: any) {
    const hits = useHits(props);
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          minHeight: '500px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        {hits.hits.length > 0 ? (
          hits.hits.map((hit: any) => <Hit result={hit} key={hit.objectID} />)
        ) : (
          <Typography
            variant="body1"
            component="div"
            sx={{ fontFamily: 'Monospace', display: 'flex', justifyContent: 'center' }}
          >
            NO CURRENT RESULTS
          </Typography>
        )}
      </div>
    );
  }

  const handleOpenDialog = () => {
    console.log('opening course search button of: ' + possibilityId + ' ' + semesterId);
    setCurrIDsView({ possibilityId: possibilityId, semesterId: semesterId });

    setOpen(true);
  };

  const handleCloseDialog = () => {
    console.log('closing course search button of: ' + possibilityId + ' ' + semesterId);
    setCurrIDsView({ possibilityId: null, semesterId: null });

    setOpen(true);
    setSearchText('');
    setApiResults([]);
    setLoading(false);
    setOpen(false);
  };

  const handleAddCourse = (course: any) => {
    console.log(
      'adding course: ' +
        course.code +
        ' to possibility: ' +
        currIDsView.possibilityId +
        ' and semester: ' +
        currIDsView.semesterId,
    );

    if (currIDsView) {
      // generating the correct semester and possibility objects based upon currIDsView
      const semester = semesterArrayView.find(
        (semester: any) => semester.id === currIDsView.semesterId,
      );
      const possibility = semester
        ? semester.possibilities.find((p: any) => p.id === currIDsView.possibilityId)
        : null;

      // Check if the semester and possibility exist
      if (semester && possibility) {
        // Check if the course is already in the possibility
        if (possibility.courses.some((c: any) => c._id === course._id)) {
          return;
        }

        // Update the possibility's courses array
        const updatedPossibility = {
          ...possibility,
          courses: [...possibility.courses, course],
        };

        // Update the semester's possibilities array
        const updatedPossibilities = semester.possibilities.map((p: any) =>
          p.id === possibility.id ? updatedPossibility : p,
        );

        // Update the semester array
        setSemesterArrayView((oldArray: any) => {
          const updatedArray = oldArray.map((s: any) =>
            s.id === semesterId ? { ...semester, possibilities: updatedPossibilities } : s,
          );
          return updatedArray;
        });
      }
    }
    console.log(semesterArrayView);

    // close the dialog
    handleCloseDialog();
  };

  return (
    <div>
      <Button
        sx={{
          borderColor: 'rgb(228, 228, 228)',
          border: '1px solid #222222',
          color: '#302b21',
          fontFamily: 'Monospace',
        }}
        onClick={() => {
          handleOpenDialog();
        }}
        variant="outlined"
      >
        Add a Course
      </Button>

      <Dialog
        open={open}
        onClose={() => {
          handleCloseDialog();
        }}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        fullWidth
      >
        <DialogTitle id="dialog-title" sx={{ pb: 2, fontFamily: 'Monospace' }}>
          <IconButton
            onClick={() => {
              handleCloseDialog();
            }}
            aria-label="close-dialog"
          >
            <CloseIcon />
          </IconButton>
          Course Search
        </DialogTitle>

        <DialogContent
          id="dialog-description"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <InstantSearch searchClient={searchClient} indexName="vanderbiltcoursecatalogMAIN">
            <div style={{ width: '100%' }}>
              <Typography
                variant="h6"
                component="SearchBox"
                sx={{ flexGrow: 1, fontFamily: 'Monospace', width: '50%' }}
              >
                <SearchBox />
                <CustomHits />
                <Typography
                  variant="body1"
                  component="Pagination"
                  sx={{ flexGrow: 1, fontFamily: 'Monospace', pt: 2, width: '100%' }}
                >
                  <Pagination />
                </Typography>
              </Typography>
            </div>
          </InstantSearch>
        </DialogContent>
      </Dialog>
    </div>
  );
}
