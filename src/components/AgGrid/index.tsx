import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
// import 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import React, { useEffect, useRef, useCallback, useState } from 'react';

const AgGrid = ({ setRef, rowData, columnDefs, defaultColDef, onRowClicked, heightVal }: any) => {


    return (
        <div className="ag-theme-alpine" style={{ width: '100%', height: heightVal }}>
            <AgGridReact
                rowData={rowData} // Row Data for Rows
                columnDefs={columnDefs} // Column Defs for Columns
            />
        </div>
    )
}
export default AgGrid