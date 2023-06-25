import { IconButton, Stack, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useRecoilState } from 'recoil';
import { CSVLink } from 'react-csv';

import { Semester } from './Semester';
import { semesterArray } from './atoms';

/*

semesterView: [Semester[]]
  FullView: [Semester[]]
	Semester: {id, num, Possibility[]}
	Possibility: {id, Courses[]}
*/
/*
type Course {
  _id: String;
  code: String;
  name: String;
  department: String;
  departmentAbbreviation: String;
  hours: String;
  description: String;
}
*/

// code inspired by 5c-course-planner
let thisYear = new Date().getFullYear();
let thisMonth = new Date().getMonth() + 1;

if (thisMonth === 12) {
  thisYear++;
  thisMonth = 1;
}

const thisSeason = +(thisMonth > 4);
const thisSemester = 2 * thisYear + thisSeason;
const firstSemester = thisSemester - 2;

console.log(firstSemester);
let initialSems = Array(5);

for (let i = 0; i < 5; i++) {
  initialSems[i] = firstSemester + i;
}
console.log(initialSems);

// random id generator for semester
export function randomID() {
  return Math.floor(Math.random() * 1000000000);
}

export function decodeSemester(semNum: number) {
  return (
    (semNum % 2 ? 'F' : 'S') +
    Math.floor(semNum / 2)
      .toString()
      .substring(2)
  );
}

export function FullView({}: any) {
  const [semesterArrayView, setSemesterArrayView] = useRecoilState(semesterArray);

  // initialize the semester array view once
  // TODO: make sure to add local storage once implemented (only do this if the local storage array DNE)
  if (semesterArrayView.length === 0) {
    setSemesterArrayView(
      initialSems.map((semNum: any) => ({
        id: randomID(),
        num: semNum,
        possibilities: [],
      })),
    );
  }
  console.log(semesterArrayView);

  // generate csv data
  const csvData: any = [];
  csvData.push([
    'Semester Name',
    'Possibility Name',
    'Course Name',
    'Course Department',
    'Course Hours',
    'Course Description',
  ]);
  semesterArrayView.forEach((semester: any) => {
    semester.possibilities.forEach((possibility: any) => {
      possibility.courses.forEach((course: any) => {
        const csvLine = [
          decodeSemester(semester.num),
          'Possibility ' + Math.trunc(possibility.id / 100000),
          course.code + ': ' + course.name,
          course.department,
          course.hours,
          course.description,
        ];

        csvData.push(csvLine);
      });
    });
  });
  console.log('csvData');
  console.log(csvData);
  // generate name for each semester based upon the current year and season (full, spring)
  const addLeftSemester = () => {
    setSemesterArrayView((oldArray: any) => [
      { id: randomID(), num: oldArray[0].num - 1, possibilities: [] },
      ...oldArray,
    ]);
    console.log(semesterArrayView);
  };

  const addRightSemester = () => {
    setSemesterArrayView((oldArray: any) => [
      ...oldArray,
      { id: randomID(), num: oldArray[oldArray.length - 1].num + 1, possibilities: [] },
    ]);
    console.log('add a right semester');
    console.log(semesterArrayView);
  };

  return (
    <div>
      <Button>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          <CSVLink data={csvData} filename={"course_planner.csv"}>To CSV!</CSVLink>
        </Typography>
      </Button>
      <Stack direction="row" alignItems="center" justify="center" spacing={2}>
        <IconButton
          onClick={() => {
            addLeftSemester();
          }}
        >
          <AddIcon />
        </IconButton>

        {semesterArrayView.map((semester: any) => (
          <Semester key={semester.id} id={semester.id} />
        ))}

        <IconButton
          onClick={() => {
            addRightSemester();
          }}
        >
          <AddIcon />
        </IconButton>
      </Stack>
    </div>
  );
}
