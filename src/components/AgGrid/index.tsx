import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
// import 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import React, { useEffect, useRef, useCallback, useState } from 'react';

const AgGrid = ({ setRef, rowData, columnDefs, defaultColDef, onRowClicked, heightVal }: any) => {
    const gridRef = useRef<any>(null);

    useEffect(() => {
        setRef(gridRef)
    }, [gridRef])

    const onSelectionChanged = useCallback(() => {
        const selectedRows = gridRef.current.api.getSelectedRows();
        let doc = document.querySelector('#selectedRows');
        if (doc) {
            doc.innerHTML = selectedRows.length === 1 ? selectedRows[0].athlete : '';
        }
    }, [gridRef]);

    return (
        <div className="ag-theme-alpine" style={{ width: '100%', height: heightVal }}>
            <AgGridReact
                ref={gridRef}
                rowData={rowData} // Row Data for Rows
                columnDefs={columnDefs} // Column Defs for Columns
                defaultColDef={defaultColDef}
                animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                rowSelection='single' // Options - allows click selection of rows
                onRowClicked={(e) => onRowClicked(gridRef.current.api.getSelectedRows())} // click row event
                overlayNoRowsTemplate={"데이터가없습니다."}
                onSelectionChanged={onSelectionChanged}
            />
        </div>
    )
}
export default AgGrid