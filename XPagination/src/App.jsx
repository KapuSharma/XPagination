import './App.css';
import { useEffect, useState } from 'react';
import TableRow from './components/TableRows';
function App() {
  const [employeeData,setEmployeeData]=useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [pagedData,setPagedData]=useState([])
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const res = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
        if (res.ok) {
          const data = await res.json();
          setEmployeeData(data);
        } else {
          alert(`Failed to fetch data. Status: ${res.status}`);
        }
      } catch (error) {
        alert("Failed to fetch data. Please try again later.");
        console.error("Fetch error:", error);
      }
    };
  
    fetchEmployeeData();
  }, []);

  useEffect(() => {
    const chunkSize = 10;
    const groupedData = [];
    for (let i = 0; i < employeeData.length; i += chunkSize) {
      groupedData.push(employeeData.slice(i, i + chunkSize));
    }
    setPagedData(groupedData);
  }, [employeeData]);
  const handleNextPage = () => {
    if (currentPage < pagedData.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <div className="App">
      <h1>Employee Data Table</h1>
      <table style={{width:"100%",borderBottom:"1px solid seagreen"}}>
        <thead><tr style={{width:"100%",backgroundColor:"seagreen",textAlign:"justify"}}>
          <th>Id</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
        </tr></thead>
        <tbody>
         {pagedData[currentPage]?.map((employee) => (
          <TableRow key={employee.id} employee={employee} />
        ))}
        
        </tbody>
        
      </table>
      <div
        style={{display:"flex",justifyContent:"center",gap:"10px", margin:"10px"}}
        >
        <button onClick={handlePreviousPage} disabled={currentPage === 0} style={{backgroundColor:"seagreen"}}>
          Previous
        </button>
        <span style={{color:"black",border:"1px solid",display:"inline-block",width:"15px",textAlign:"center",backgroundColor:"seagreen"}}>{currentPage+1}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === pagedData.length - 1}
          style={{backgroundColor:"seagreen"}}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;