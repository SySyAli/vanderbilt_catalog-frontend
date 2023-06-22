import { atom } from 'recoil';

const possibilityArray = atom<any>({
  key: 'possibilityState',
  default: [],
});

const coursesSelectedArray = atom<any>({
  key: 'coursesSelectedState',
  default: {},
});

const selectedCourseinDialog = atom<any>({
  key: 'selectedCourseState',
  default: [],
});


const courseDialogOpeninDialog = atom<boolean>({
  key: 'courseDialogOpenState',
  default: false,
});

// all of the below atoms are used in CourseSearchDialog.tsx
const openCourseDialog = atom<boolean>({
  key: 'openCourseDialogState',
  default: false,
});

const searchTextDialog = atom<string>({
  key: 'searchTextState',
  default: '',
});

const apiResultsDialog = atom<any>({
  key: 'apiResultsState',
  default: [],
});

const loadingDialog = atom<boolean>({
  key: 'loadingState',
  default: false,
});

export {
  possibilityArray,
  coursesSelectedArray,
  selectedCourseinDialog,
  courseDialogOpeninDialog,
  openCourseDialog,
  searchTextDialog,
  apiResultsDialog,
  loadingDialog,
};
