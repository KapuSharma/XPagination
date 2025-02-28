import React from "react";

export default function TableRow({employee}){
    return (
        <tr style={{textAlign:"justify",paddingLeft:"50px"}}>
        <td>{employee.id}</td>
        <td>{employee.name}</td>
        <td>{employee.email}</td>
        <td>{employee.role}</td>
      </tr>
    )
}