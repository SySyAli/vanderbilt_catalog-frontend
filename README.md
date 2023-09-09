# Vanderbilt Course Catalog Planner
<p align='center'>
  <img src='https://img.shields.io/badge/Vite-purple?style=for-the-badge&logo=vite&logoColor=white'>
  <img src='https://img.shields.io/badge/Recoil-blue?style=for-the-badge&logo=recoil&logoColor=white'>
  <img src='https://img.shields.io/badge/Algolia-darkblue?style=for-the-badge&logo=algolia&logoColor=white'>
  <img src='https://img.shields.io/badge/MUI-blue?style=for-the-badge&logo=mui&logoColor=white'>
  <img src='https://img.shields.io/badge/Preact-%23800080?style=for-the-badge&logo=preact&logoColor=white'>
  <img src='https://img.shields.io/badge/Typescript-blue?style=for-the-badge&logo=typescript&logoColor=white'>
</p>

A minimalistic, simple and MODERN Course Catalog Planner and Search for Vanderbilt Students.

## Preview
COMING SOON...

## Installation
To install and run this project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repo.git
   ```

2. Install the dependencies:

   ```bash
   cd your-repo
   npm install
   ```

3. Start the server:

   ```bash
   npm run dev
   ```

   The server will start running on `http://localhost:5173`.

## Detailed Explanation
This web app has two primary features: the COURSE PLANNER and SEARCH features. The course planner is meant to help students plan their semester based upon the Vanderbilt Course Catalog. To explain this feature, one can simply add the semesters they are interested in a planning for. After, each semester can contain many possibilities and each possibility can contain multiple course selections. This can all be exported to excel. There is also the search feature, which uses algolia to search through the data.

This is how the data is stored in our app (using recoil for persistent global state):
```
FullView: [ Semester[] ]
Semester: { id, num, Possibility[] }
Possibility: { id, Courses[] }

type Course {
  _id: String,
  code: String,
  name: String,
  department: String,
  departmentAbbreviation: String,
  hours: String,
  description: String
}

```

## Acknowledgements and References
- [5c Course Planner](https://5c-course-planner.vercel.app/)
- [Vanderbilt University](https://www.vanderbilt.edu/)
