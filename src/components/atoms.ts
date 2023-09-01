import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'recoil-persist',
  storage: localStorage,
  converter: JSON
});

const semesterArray = atom<any>({
  key: 'semesterState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

const currIDs = atom<any>({
  key: 'currPossibilityIDState',
  default: {},
});

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

const searchTextSearchPage = atom<string>({
  key: 'searchTextSearchPageState',
  default: '',
});

const apiResultsDialog = atom<any>({
  key: 'apiResultsState',
  default: [],
});

const apiResultsSeachPage = atom<any>({
  key: 'apiResultsSearchPageState',
  default: [],
});

const loadingDialog = atom<boolean>({
  key: 'loadingState',
  default: false,
});

const loadingSearchPage = atom<boolean>({
  key: 'loadingSearchPageState',
  default: false,
});

const aboutModalStatus = atom<boolean>({
  key: 'aboutModalStatusState',
  default: false,
});

const courseSearchDialogStatus = atom<boolean>({
  key: 'courseSearchDialogStatusState',
  default: false,
});

export {
  semesterArray,
  currIDs,
  possibilityArray,
  coursesSelectedArray,
  selectedCourseinDialog,
  courseDialogOpeninDialog,
  openCourseDialog,
  searchTextDialog,
  apiResultsDialog,
  loadingDialog,
  searchTextSearchPage,
  apiResultsSeachPage,
  loadingSearchPage,
  aboutModalStatus,
  courseSearchDialogStatus
};
