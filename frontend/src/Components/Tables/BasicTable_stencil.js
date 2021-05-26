import React from "react";
import PropTypes from "prop-types";

import { CardContent } from "@material-ui/core";
// Table components
import MUIDataTable from "mui-datatables";

function BasicTable(props) {
    if (props.tableData === undefined ){
        return "No table data detected";
    }

    const options = {
        filterType: "dropdown",
        elevation: 1,
        selectableRows: "none",
        responsive: "standard",
        print: false,
        downloadOptions: {
          filename: "table.csv",
          separator: ",",
        },
        rowsPerPageOptions: [10, 15, 50, 100],
        //tableBodyHeight: 'auto',
        tableBodyHeight: props.height + 'px'
      };

    return (
      <CardContent>
        <div>
          <MUIDataTable columns={props.tableData["columns"]} data={props.tableData["rows"]} options={options}/>
        </div>
      </CardContent>
      //<MUIDataTable
      //  data={tableData}
      ///>
    );
}

BasicTable.propTypes = {
  classes: PropTypes.object
};

export default BasicTable;
