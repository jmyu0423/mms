import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
// import 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import React, { useEffect, useRef, useCallback, useState, useMemo } from 'react';
import './style.css';

const AgGrid = ({ setRef, rowData, columnDefs, onRowClicked, heightVal }: any) => {
    const gridRef = useRef<any>(null);

    useEffect(() => {
        setRef(gridRef)
    }, [gridRef])

    const defaultColDef = useMemo(() => ({
        sortable: true,
        resizable: true,
        filter: 'agTextColumnFilter',
        wrapHeaderText: true,
        autoHeaderHeight: true,
        // headerClass: function (params: any) {
        //   // logic to return the correct class
        //   return 'header-one';
        // }
    }), []);

    const onSelectionChanged = useCallback(() => {
        const selectedRows = gridRef.current.api.getSelectedRows();
        let doc = document.querySelector('#selectedRows');
        if (doc) {
            doc.innerHTML = selectedRows.length === 1 ? selectedRows[0].athlete : '';
        }
    }, [gridRef]);

    const getRowHeight = useCallback((params) => {
        return params.data.rowHeight;
    }, []);

    return (
        <div className="ag-theme-alpine" style={{ width: '100%', height: heightVal }}>
            <AgGridReact
                ref={gridRef}
                rowData={rowData} // Row Data for Rows
                columnDefs={columnDefs} // Column Defs for Columns
                defaultColDef={defaultColDef}
                animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                rowSelection='multiple' // Options - allows click selection of rows
                onRowClicked={(e) => onRowClicked(gridRef.current.api.getSelectedRows())} // click row event
                overlayNoRowsTemplate={"데이터가없습니다."}
                onSelectionChanged={onSelectionChanged}
                getRowHeight={getRowHeight}
                pagination={true}
            />
        </div>
    )
}
export default AgGrid