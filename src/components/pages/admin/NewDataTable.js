import React from 'react';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
// import { columns, data } from './Data.js';

class TestData extends React.Component {
  state = {
    tablePayload: JSON.parse(localStorage.getItem("TableData")),

  }
 

  render(){

    const columns = [
        {
            name: "S/N",
            selector: "sn",
            sortable: true,
          },
  
  
          {
            name: "Username",
            selector: "username",
            sortable: true,
          },
          {
            name: "Staff ID",
            selector: "staffIdentityNumber",
            sortable: true,
          },
          {
            name: "Name",
            selector: "name",
            sortable: true,
          },
          {
            name: "Staff Type",
            selector: "staffType",
            sortable: true,
          },
          {
            name: "Staff Category",
            selector: "staffCategory",
            sortable: false,
          },
        
          {
            name: "Rank",
            selector: "rank",
            sortable: true,
          },
          {
            name: "Department",
            selector: "department",
            sortable: true,
          },
          // {
          //   name: "Action",
          //   selector: "action",
          //   sortable: true,
          // },
      ];
      
      const data = this.props.passedStaffData

    

    const tableData = {
        columns,
        data,
      };
  return (
    <DataTableExtensions
      {...tableData}
      
      
    >
      <DataTable
        noHeader
        defaultSortField="id"
        defaultSortAsc={true}
        pagination
        highlightOnHover
        expandOnRowClicked={true}
        
        
        
        
        
      />
    </DataTableExtensions>
  );
}
}

export default TestData;