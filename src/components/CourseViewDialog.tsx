/*
 * CourseViewDialog.tsx
 * Description: This component is a list element button that when clicked shows a dialog that displays information about a course.
 * It is used in CourseSearchDialog.tsx and possibility.tsx.
 */

import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { IconButton, ListItem, ListItemButton, ListItemText } from '@mui/material';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { useRecoilState } from 'recoil';

import { selectedCourseinDialog, courseDialogOpeninDialog } from './atoms';

export function CourseViewDialog({ course }: any) {
  const [selectedCourse, setSelectedCourse] = useRecoilState<any>(selectedCourseinDialog);
  const [courseDialogOpen, setCourseDialogOpen] = useRecoilState(courseDialogOpeninDialog);

  const handleResultClick = (course: any) => {
    setSelectedCourse(course);
    setCourseDialogOpen(true);
  };

  const handleCloseCourseDialog = () => {
    setCourseDialogOpen(false);
  };

  return (
    <div>
      <ListItem key={course._id} >
        <ListItemButton
          onClick={() => {
            handleResultClick(course);
          }}
        >
          <ListItemText primary={course.code} secondary={course.name} sx={{width:'fit-content'}}/>
        </ListItemButton>

        {selectedCourse && (
          <Dialog
            open={courseDialogOpen}
            onClose={() => {
              handleCloseCourseDialog();
            }}
            spacing={2}
          >
            <DialogTitle id="dialog-title">
              <IconButton
                onClick={() => {
                  handleCloseCourseDialog();
                }}
                aria-label="close-dialog"
              >
                <CloseIcon />
              </IconButton>
              Course Information
            </DialogTitle>
            <DialogContent>
              <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                {selectedCourse.code + ': ' + selectedCourse.name}
              </Typography>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {'Department: ' + selectedCourse.department}
              </Typography>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {'Hours: ' + selectedCourse.hours}
              </Typography>
              <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
                {'Description: ' + selectedCourse.description}
              </Typography>
            </DialogContent>
          </Dialog>
        )}
      </ListItem>
    </div>
  );
}
