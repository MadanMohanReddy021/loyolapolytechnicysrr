import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

const DisplayData = () => {
  // State to store student data
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  // Fetch data from the API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://warp-dusty-jingle.glitch.me/api/students');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setStudents(data); // Store data in state
        setLoading(false); // Stop loading
      } catch (err) {
        setError(err.message); // Set error state
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty array ensures it runs only once when component mounts

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const download=()=>{
    console.log(students);
    var arr=[];
    const st=students.map(element=>{
        const marks=[];
        {JSON.parse(element.marks).map((mark,index)=>{
            if(mark.subcode!="Month &amp; Year" && mark.subcode){
                if (mark.subcode === "Grand Total" || mark.subcode === "Result") {
                    marks.push({subcode:mark.subcode,marks:mark.marks.join(", ")})
                }
                else{
                    marks.push({subcode:mark.subcode,marks:mark.marks.join(", ")})

                }
            }
        })
        }
arr.push({pin:element.pinnumber,name:element.name,branch:element.branch,sem:element.semester,marks:JSON.stringify(marks)})


    })
    const ws = XLSX.utils.json_to_sheet(arr); // Convert JSON to worksheet
            const wb = XLSX.utils.book_new(); // Create a new workbook
            XLSX.utils.book_append_sheet(wb, ws, 'Student Data'); // Append the worksheet to the workbook

            // Trigger download
            XLSX.writeFile(wb, 'student_data.xlsx');
            console.log('success');
            console.log(arr);
  }
 

  return (
    <div className="container mt-5">
        <button className='download'onClick={()=>download()}>Download</button>
      <h2>Student Data</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>PIN Number</th>
            <th>Name</th>
            <th>Branch</th>
            <th>Semester</th>
            <th>Marks</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.pinnumber}>{}
              <td>{student.pinnumber}</td>
              <td>{student.name}</td>
              <td>{student.branch}</td>
              <td>{student.semester}</td>
              <td>
                {JSON.parse(student.marks).map((mark, index) => { {console.log(mark)}
                  // Check if it's a special entry like 'Grand Total' or 'Result'
                  if(mark.subcode!="Month &amp; Year" && mark.subcode){
                  if (mark.subcode === "Grand Total" || mark.subcode === "Result") {
                    return (
                      <div key={index}>
                        <strong>{mark.subcode}:</strong> {mark.marks=='undefined'?'':mark.marks.join(", ")}
                      </div>
                    );
                  }
                
                  // Render each subject and marks
                  return (
                    <div key={index}>
                      <strong>{mark.subcode}:</strong> {mark.marks.join(", ")}
                    </div>
                  );
                }
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayData;
