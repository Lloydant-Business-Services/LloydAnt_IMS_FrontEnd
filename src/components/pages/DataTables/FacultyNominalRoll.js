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
        // {
        //     name: "S/N",
        //     selector: "sn",
        //     sortable: true,
        //   },
  
  
          {
            name: "Username",
            selector: "userName",
            sortable: true,
          },
          {
            name: "Staff Number",
            selector: "staffIdentityNumber",
            sortable: true,
          },
          {
            name: "Staff Name",
            selector: "staffName",
            sortable: true,
          },
          {
            name: "Staff Type",
            selector: "staffType",
            sortable: true,
          },
          {
            name: "Salary Category",
            selector: "staffSalaryCategory",
            sortable: true,
          },
          // {
          //   name: "Staff Category",
          //   selector: "staffCategory",
          //   sortable: false,
          // },
        
      
          {
            name: "Department",
            selector: "staffDepartment",
            sortable: true,
          },
          {
            name: "Rank",
            selector: "staffRank",
            sortable: true,
          },
        
      ];
      
      const data = this.props.rawData

   


    const tableData = {
        columns,
        data,
      };
  return (
    <DataTableExtensions
      {...tableData}
        style={{padding:"20px"}}
        
      
      
    >
      <DataTable
        noHeader
        // defaultSortField="id"
        defaultSortAsc={true}
        pagination
        highlightOnHover
        expandOnRowClicked={true}
        title={"Nominal Roll"}
        fixedHeader={"header test"}
        
        
        
        
        
        
        
      />
    </DataTableExtensions>
  );
}
}

export default TestData;