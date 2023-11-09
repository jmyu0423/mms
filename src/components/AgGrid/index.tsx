import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
// import 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import React, { useEffect, useRef, useCallback, useState, useMemo } from 'react';
import './style.css';

const AgGrid = ({ setRef, rowData, columnDefs, onRowClicked, heightVal, pageCnt}: any) => {
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

    const onGridReady = (params) =>{
        gridRef.current.api.addEventListener('paginationChanged', (e) =>{
            //Reset rows selection based on current page
            resetPaginationSelection(gridRef.current);
        });
    }

    //전체 셀렉트 현재 페이지만 적용
    const resetPaginationSelection = (self) =>{
        self.api.deselectAll();

        //Initialize pagination data
        let paginationSize = self.api.paginationGetPageSize();
        let currentPageNum = self.api.paginationGetCurrentPage();
        let totalRowsCount = self.api.getDisplayedRowCount();

        //Calculate current page row indexes
        let currentPageRowStartIndex = (currentPageNum * paginationSize);
        let currentPageRowLastIndex = (currentPageRowStartIndex + paginationSize);
        if(currentPageRowLastIndex > totalRowsCount) currentPageRowLastIndex = (totalRowsCount);

        for(let i = 0; i < totalRowsCount; i++)
        {
            //Set isRowSelectable=true attribute for current page rows, and false for other page rows
            let isWithinCurrentPage = (i >= currentPageRowStartIndex && i < currentPageRowLastIndex);
            self.api.getDisplayedRowAtIndex(i).setRowSelectable(isWithinCurrentPage);
        }
    }

    return (
        <div className="ag-theme-alpine" style={{ height: heightVal }}>
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
                paginationPageSize={pageCnt}
                onGridReady={onGridReady}
            />
        </div>
    )
}
export default AgGrid