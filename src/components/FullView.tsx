import { IconButton, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useRecoilState } from 'recoil';

import { Semester } from './Semester';
import { semesterArray } from './atoms';

/*
semesterView structure:
  FullView:[Semester:{id, possibilites[]}]
	Semester: {id, possibilites[]}
	Possibility: {id,Courses[]}
*/

export function FullView({}: any) {
  const [semesterArrayView, setSemesterArrayView] = useRecoilState(semesterArray);

  // random id generator for semester
  const randomID = () => {
    return Math.floor(Math.random() * 1000000000);
  };

  const addLeftSemester = () => {
    setSemesterArrayView((oldArray: any) => [{ id: randomID(), possibilities: [] }, ...oldArray]);
  };

  const addRightSemester = () => {
    setSemesterArrayView((oldArray: any) => [...oldArray, { id: randomID(), possibilities: [] }]);
  };

  const handleRemoveSemester = (id: number) => {
    setSemesterArrayView((oldArray: any) => oldArray.filter((semester: number) => semester !== id));
  };

  return (
    <div>
      <Stack direction="row" alignItems="center" justify="center" spacing={2}>
        <IconButton onClick={addLeftSemester}>
          <AddIcon />
        </IconButton>

        {semesterArrayView.map((id: number) => (
          <Semester key={id} id={id} handleRemoveSemester={handleRemoveSemester} />
        ))}

        <IconButton onClick={addRightSemester}>
          <AddIcon />
        </IconButton>
      </Stack>
    </div>
  );
}
