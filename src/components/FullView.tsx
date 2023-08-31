import { IconButton, Stack, Typography, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useRecoilState } from 'recoil';
import { CSVLink } from 'react-csv';
import DownloadIcon from '@mui/icons-material/Download';

import { Semester } from '../components/semester';
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
let initialSems = Array(4);

for (let i = 0; i < 4; i++) {
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
  const [semesterArrayView, setSemesterArrayView] = useRecoilState<any>(semesterArray);

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

  const addLeftSemester = () => {
    // check if the generated id is unique, if not generate another one
    let generatedID = randomID();
    while (semesterArrayView.some((semester: any) => semester.id === generatedID)) {
      generatedID = randomID();
    }

    setSemesterArrayView((oldArray: any) => [
      { id: generatedID, num: oldArray[0].num - 1, possibilities: [] },
      ...oldArray,
    ]);
    console.log(semesterArrayView);
  };

  const addRightSemester = () => {
    // check if the generated id is unique, if not generate another one
    let generatedID = randomID();
    while (semesterArrayView.some((semester: any) => semester.id === generatedID)) {
      generatedID = randomID();
    }

    setSemesterArrayView((oldArray: any) => [
      ...oldArray,
      { id: generatedID, num: oldArray[oldArray.length - 1].num + 1, possibilities: [] },
    ]);
    console.log('add a right semester');
    console.log(semesterArrayView);
  };

  return (
    <div style={{ display: 'flex', height: '100%', backgroundColor: '#fff5ed' }}>
      <Fab
        sx={{
          position: 'fixed',
          bottom: (theme) => theme.spacing(2),
          right: (theme) => theme.spacing(2),
          backgroundColor: '#E0D5C0', fontFamily: 'Monospace' 
        }}
        variant="extended"
      >
        <Typography
          variant="body1"
          component="div"
          sx={{ flexGrow: 1, fontWeight: 'bold', width: 'fit-content', fontFamily: 'Monospace'  }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <DownloadIcon />
            <CSVLink
              style={{ color: '#000000', textDecoration: 'none' }}
              data={csvData}
              filename={'course_planner.csv'}
            >
              Excel!
            </CSVLink>
          </div>
        </Typography>
      </Fab>

      <Stack
        direction="row"
        alignItems="stretch"
        wrap="nowrap"
        height={'100%'}
        sx={{ display: 'flex', flexDirection: 'row', overflowX: 'auto', flexGrow: 1 }}
      >
        <IconButton variant="outlined" sx={{ 
          borderColor: 'rgb(228, 228, 228)', border: '1px solid', borderRadius: '0px'}}
          onClick={() => {
            addLeftSemester();
          }}
        >
          <AddIcon />
        </IconButton>

        {semesterArrayView.map((semester: any) => (
          <Semester key={semester.id} id={semester.id} />
        ))}

        <IconButton variant="outlined" sx={{ 
          borderColor: 'rgb(228, 228, 228)', border: '1px solid', borderRadius: '0px'}}
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
