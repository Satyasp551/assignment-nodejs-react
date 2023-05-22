import React, { useEffect, useState } from "react";
import axios from "axios";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const fetchEmployees = async (page) => {
    try {
      const response = await axios.get(
        `http://localhost:8800/api/auth/getEmployee?page=${page}`
      );
      const { data } = response.data;
      setEmployees((prevEmployees) => [...prevEmployees, ...data]);
      setTotalCount(response.data.pagination.total);
    } catch (error) {
      console.error("Error while fetching the employees", error);
    }
  };

  useEffect(() => {
    fetchEmployees(page);
  }, [page]);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight && employees.length < totalCount) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [employees, totalCount]);

  return (
    <div>
      <h1>Employee List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>DOB</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Salary</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.dob}</td>
              <td>{employee.department}</td>
              <td>{employee.designation}</td>
              <td>{employee.salary}</td>
              <td>
                {employee.address.street}, {employee.address.city},{" "}
                {employee.address.state}, {employee.address.country},{" "}
                {employee.address.zipcode}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
