import React, { useEffect, useRef, useMemo, useState, useLayoutEffect } from 'react';
import PageTitleWrapper from "src/components/layout/PageTitleWrapper";
import { Box, Button, Card, CardActions, CardContent, Container, FormControlLabel, Grid, MenuItem, TextField, Typography } from "@mui/material";
import PageTitle from 'src/components/layout/PageTitle';
import { styled } from '@mui/material/styles';
import AgGrid from "src/components/AgGrid";
import { red, grey, indigo } from '@mui/material/colors';
import ManagementRegistModal from "src/pages/manage/modal/ManagementRegistModal"
import ManagementUpdateModal from "src/pages/manage/modal/ManagementUpdateModal"
import ImagePreviewModal from "src/pages/manage/modal/ImagePreviewModal";

const PageContainer = styled(Container)(
  ({ theme }) => `
		// & .MuiContainer-root: {
		//  @media (min-width: ${theme.breakpoints.values.lg}px) {
		//    max-width:none;
		//  };
		// };
		
		padding-bottom: 10px;
		@media (min-width: ${theme.breakpoints.values.lg}px) {
		  max-width:none;
		};
		@media (min-width: ${theme.breakpoints.values.sm}px) {
		  padding-left: 10px;
		  padding-right: 10px;
  
		};
	`
);

const WngCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '12px 12px'
}));

const BaseButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(indigo[400]),
  backgroundColor: indigo[400],
  width: 80,
  height: 30,
  fontSize: 15,
  marginRight: 5,
  '&:hover': {
    backgroundColor: indigo[600],
  },
}));

const DangerButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(indigo[400]),
  backgroundColor: red[300],
  width: 80,
  height: 30,
  fontSize: 15,
  marginRight: 0,
  '&:hover': {
    backgroundColor: red[400],
  },
}));

const Management = ({ }) => {
  const imgSize = { maxHeight: 35, maxWidth: "100%", cursor: "pointer" };
  const [gridState, setgridState] = useState(null); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState([
    {
      seqNo: 0,
      itemNm: "물품1",
      number: "물품-1",
      storage: "대전",
      texture: "천",
      count: "2",
      piece: "2",
      comment: "모르겠음",
      size: "10",
      getReason: "모름",
      country: "미국",
      giver: "지나가던사람",
      characteristic: "보기좋음",
      fileList: {
        fileInfo: {},
        fileName: "다운로드 (2).jpg"
      },
      image: "data:image/jpeg;base64,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"
    },
    {
      seqNo: 1,
      itemNm: "물품2",
      number: "물품-2",
      storage: "서울",
      texture: "나무",
      count: "4",
      piece: "4",
      comment: "모르겠음",
      size: "50",
      getReason: "생일선물",
      country: "태국",
      giver: "친구",
      characteristic: "상태좋음",
      fileList: {
        fileInfo: {},
        fileName: "다운로드 (2).jpg"
      },
      image: "data:image/jpeg;base64,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"
    },
    {
      seqNo: 2,
      itemNm: "물품3",
      number: "물품-3",
      storage: "서울",
      texture: "나무",
      count: "5",
      piece: "5",
      comment: "모르겠음",
      size: "100",
      getReason: "생일선물",
      country: "프랑스",
      giver: "지인",
      characteristic: "상태나쁨",
      fileList: {
        fileInfo: {},
        fileName: "다운로드 (2).jpg"
      },
      image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUTEhIVFhUVFxUXFRUXFRUVFxUVFRUWFhUXFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGi0lHR0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0rLS0tLS0tK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAADBAABAgUGB//EADoQAAIBAgMFBQcDAwMFAAAAAAABAgMRBCExBRJBUWETcYGhsQYikcHR4fAUcvEjMkIzUmIHFRZDsv/EABgBAQEBAQEAAAAAAAAAAAAAAAEAAgME/8QAHxEBAQEBAAMBAQADAAAAAAAAAAERAhIhMQNBMjNh/9oADAMBAAIRAxEAPwD7BCV0SSyCSRTFMSWgKpSzuHaJuknFxeGjJO6vnl9mcLFYfcdr3R6vE08vE42IpqTds7tIdxRysPV3ZJ8vQ9HRpSlZpOwfZ+xacPeavLrml4czql1JVa5FbCyatYiwSWR1WLYmolkYvEUpRYdLkGhhlLoJKbb6fmo9SmHJsGjhIoqdCPAm8U2dGcL1brgZpJPQ3V0A0p7uiz/kzTIYls6Mv7kX/wBqp/7V5hqWIC9oanMGkMVQlCLcIb1uC+5zcNCcpRlPL/jwR6JTKqUVLhmF5UpOhTsrcmM2zQRUlm+Zd0hkQLjrkL1o5Zr7DjmYkk9UIcVxzJuD1bD200MU6V9EwsJR0ioQOtHBt62BrZrUt5Ty/wBrWXkOQXSvZvoQ6X6d9PMoCYKsWykyiWaRi5dxC5RucxbO3au8n7jd3HlK2TXQ6VyMiiA4rExpx3pySXULKaSbeiTb7keQ2nU7WTnUk9zJxho93S/TULcUmh7S9sPfXZwe4v8ALS7dtCsNtzt8mmpcnl8PIRxVeD92Ky0a9HYvBYdXTtl6dfQ497fTtzJHosO7+vidCkI4WOVn8eY9TNcRjqikZLlXOjDE0LVIjTA1EWFysRi5Rdl3/T6+BzsRjK07JSUUuF2vjY6+Jo3OLj0l9uJzuxuSU3g8fiISTl/Uhxcb3tnwZ62jXTimndNJp958+w+Lakt5Poj0Wy8Za8eGUo+OqXj6m+brPcx33UBuoKOsYdU6ORt1DKq5iUqwTDSu+iJOlBXWZqNlkheVcH24Y1pztCKoIqqTtTWDT3aosR7Zc/QgZBroTZi5JyKYQ2ruRsyU2IauXvAmwc6hmtRz/a3H9lQstZyUfDVnksfjXw/Ezu+2km6UXa8VJOXTWztyz9DyTam0k/M5dV15mnsFgt/N3T8j0GDwbjqriGyqUorg16HdpPLIzz7a6o1KOQaLAxkaUjs5DpkuCUi3Ik02Ymy2wbJAVYtnPxNFRz1fdc6k2K4hZcjNjUryONfvXHtj4t76Wrtkl6voEx2GWrdl8LmdlJKTUdXq+NuRieq317jv75TmDcwE6rvZZHXycfEeVTgtRqjKyEacbBlIZVYadQrfFlI2mOjBlMzKpnZeIGpXSyWvp3lU8hvQw5uRIL9oQPSx6GpTTA3GGxeplLvXp/JQ1GwcmakwNSRphirVsLSq5amcRUE8TVtFnHuuvMcvam19Yf3Ra7muaz1RzNn0k2npyZeJ35PWy5L5nSwFOyzs+v1OM9129SOnh42Wg4rCtLIMmdo5UXQ1vC7qmHWHQc3yb4n2xpVA04aczDqC061gUq5asNuqDkDjUMVMQlx/O4UWxlFPOT7uYHCbqdlZEr10/uJTqcrd9r/A49115np36UUbr0brLXgcrA1WtfzxbudaMjrz1LHLqZSynweRtPqFlC4GpRQ2JpSNpN9CqaQeIxmkZ0d13+IVVFa90NTjc5tXDpTTtzGzPilF/Ux5+pZXZEM+y9U2BrvK/JrzyNyYKr/a/wA0NsszYtWkaU8hbETNfxmFK1Q4+0sY0rLj3D2JkcHFe/VtwS83+I8v6V6OIHvO93+eR0MJiVpmgtHCIYWFRnmVrqxqNXq/I1275mVhzMqDOvtz2JPE9RGttanHJzj3XOd7SOpTo1Jwd3GMmlbWy6HyPGbUqTd51qjd8kp7sUv2xVkPPN6a9R9yo49PR3G4VjxXsbKpLDQnUvd6cLpaM9LCvYzmIzicRY4uL9p8PSluzqJPlf1eiGsTUbyPkftPgq8K83Kk7Sb3Z2ck138H8DXPO0/x9Zw+2YVEnFtp6cvAYVW54f8A6dbOe5NuLV5K2qTtFbz7rn0PDYRci8fYtgCpSlrp8PMZjhVYchQDRorkZ65U6c6G+nlp4WDxxfNBpUc8gNSlqZ5lg6saWNV7WY5QjF5ybscxLMdpvhzXmht6HozXgtYq1smvmDjIwsS7p+D+5cYXeT7i56s+qzfgm8L19U+TNOVtQc5Jm/LYzmDEF+0IHknpmwVR5GpsUxNSyZ1rMLU6mQOtMDCeQOtVDfSz2Wxk0k28kszhbMqOpOU87N5d3Azt7G739OL/AHP5G9ixaPNevLrHokznXpKKyDxgDw+g0onXmOVDcUYlAK4lWNAjjMGppp8TzFP2GwcZ77pKTvezvu3/AG6HsarFmZ3Pjc+EquHjGOVrLh8j55tf247OcoU6a91tNvPNarJn0PGOTysn4Hy72p9mL1XOm17zzX0ZvjL9Fdr2W9rXiKvZzja+aau78z2/6SMtVl1PB+wmxOy3pya7R6ZXsuWZ7/Dztr6/LIu8ihihhYrRIcjTsK0665+YxTqXMyqwaMQ8YmKYaLFlP0yYri6STOhTFMWsyVc6dMuPLlmgeNx9Om0pPN8Fn4hktGV5v0SsvXoy+0txzRU1w+BhwM+J1VSs2LONzUmk7cSPmjGS/G9Bs+ZAu8iF4xa9XUZytpVsh+rM85t7Gblla7d/L+Tt3cjHM2tutZHE2ttiyai/H6dQFavKery5LT7iNegpKz8HyZ5+u7XWc4FSmpZp3/OJ29nTZ5alSnCWeTvrwZ6bZkdL/IOecq89j0uEeQ4pHOw7aQ3Fs7uYhGzBCSpitRS4DMiou4Uxy8RSm8t63cjh47Y1ST/vi1wveMr9Wk7/AAPWVI3FalAvcb56y64GA2Q4r3570v8AjeKS4JcX3nTo4Tv+IzGkHhTD3fq0GFKw1SuahRGIxHGbUpJjMEYgg8BxgakhfGU8xqmZq02xFcXEbPhOUZSWcXdffoMdmN9i+ZpUjW0OfKmzDpnTdJGZYcFrjVsInnxBKm49x1qlBrgCdG5mfnzLsntrypDsyDn6PqQ1g0/VnkeQ29LeqJcl6v7I9RiJ2R5DFS36kmuLy7lkjH6e/TfHou4mN0O4kjA5Y6aDUp5aDmzXwAzjc3hJWZT6L8egpJd4ypiWEn0HVE7xybZSLRaJMXLUSFgVOIKcQ5iURQG4Epo04mkSESLsVFBYogumg8UDigkRQsS8L2maksuDNUNRtAAJUUZ7JDDRTRIHs0XKkmbZESKOjK7zusrK2nO7MSpHQ3St0dWOb2PUh0tzoQtWPG7WxdrwTzevRfU5MYdDobfoKFaXKVpLx1z77iUF1OV+un8YdMm4H3SpIsWlZIynmFqRQvbMzWnYwdRnSpzONgJ38DrUpHTmsdGEjVjEWaRtlZGUmWCRF2BueZreLSiLiRkSICRZN58yIpMkNFhYAYDNJcy1GcOhkVqV4U1eUlFaZ8+RqnjactJx+Ns+5jJb7FpghCEksI3lva6S05j5Vgsb56xVyEZOqFhLkJvkJPD/APUCrKFOnOOXvuLdlxW9x/azzOB23ZpVLWesracslqe79pKCnSzSe7JPNXzzXH9x5GrsWm87W7nbyeSOnPX55nUFnW7KepVozW9Fprp9DbfQDh8KqcVFXsutw6h3ehwub6bgMqXGwvOCOnw/EJ1Y9DFbhfD1LM7GExNziSjZEoYlxCXDmvUxqFufU41DGtjcalzpOtYsPKZtyyFIzNSqZDoxvfRtM4+Jxu6wNParvmjLWO+plQq8DztfbNsrMaweL3sy1Y7qmXFi1J3DoWTFN8Buh7y9DlUnJT6anVgrNPn6li1eIwqqwcJZaZ8mtBH/AMfzTjU0XFXd+h1eT+PeHizrx+nXMyMdcy/Vx0V83xLKIZKyFF3JIUXcpskm+QrtEQC4m21/Tl4f/SPP7qPc1MLBqzin3q4vPZdF/wDrj4ZehWankFAuUOX3PR19jQ/xbXRu68zn4jDbuT9Ne4zfRjl1KVlwAOk7as6FWnfhfyF2sjNye6SkcN09Qf6Ru51KGFuufcGp4ZZ5fEZJV5PPyoyiw+GrPRnWqYXP7HLxtFwd1+eAXnGpdOKeRhzBU55altvPoOrC2Jhd3NQhG2lzdZaDNCOVkl3jyOnH2jhtJbrVg2DZ1HS4Nq3hmIQwLg/dzjy5LoXSldTCVOo+ldHIwsmjr4SV2M9s05TppxXNDdJ7ysAoqztw4B1Gzy46GqzG6TyaZunPNp8DFSP+XxNT0utV5mSOiGYu6NoQtEZRCTKqczZTVyQjY58zuXL7jVxN1ciy7Ih0DTMkbMXNBJCmLppoYcgNaQVOLVp2dgNXD3zb6fnM6deJixz/AE/Od841LlJYWg0tcu/0GI01394WMf5JG3eP5/n4c4Ort0Ldf4gGMwu+rPzsO26ls3g1597JnHNSy5P5MxhsPN526O+WjPQpFKkg8T5OLR2fK/vNDP6Tn6HQnSKa6eIyK9aUVBJ5IL2XGwyo3yuglKIjSv6ZP3rZjEKd1dBYU+Fg0IWZlJCndBbXVjLVszGDxSqR3kpJXazVr2425F/0jQ5GaeTtqbtndcSqkc97wYJuGWXAvT5GVmrrh5mo5imizKdsi2SWWUiElkKISYlMw5AZVAbq9TbI1SoAlPiYdS4OpMCubLaf4jFPOSXUd7O4EpGnzLjDMO6RhrmIZcUWvib7PwLSsQBSKUMw7Imno7/nMkw6ZHC60CRQWN0SLUqAWnSsxiMVqadtQIO6alDyCbty0BDirolNczaViSWZJLEisrGiEgoNp5mcTNxW8ldegWa48ilLmBhKOLk8+HL6DdCupK6/jvA1cKn05cvEqhh5J3TSXGPPLXvCbHXrws2eqbLKTuS5pxXcsqxCTjOZTnzFmykzWrDDmYUwLkaTC1YcwSzvyHYNitBWtYPhpGN9kZxL3EEZZoBqCMOCWobdFtoYbtKbhvNXyutefwGCvPbY21lKNNOzy39HwvuruYPYWMlGUYJ70ZtXSTvB2Sbvy+gltLZ8qTcN+6yfemd/2Z2fKEd+Ws0rJctfzuPd1OOfz9f1555Xp2UkaSLSL3TwvQqxLF2IgKRLKLYpUiNXRozFglRZoG8mERJDE48TaISZWaKiSSNgVMspEWQhneRAlyyTzRTKIRUylqvH5EIZ6+GfXVpcA1DVkICNv5lrgQh0ZVD5GZ/MhADy3tJ/qv8AbH5notl/6VP9sfQhD1/r/q5cuP8AKmTSLIeV1Z5kRZCSmRFkJMsriQgf0qq6FxLIQWi5EIRQyiEIrRJEIQWQhCT/2Q=="
    }
  ]); // Set rowData to Array of Objects, one Object per Row
  const [selectedRow, setSelectedRow] = useState([]);

  //등록모달 컨트롤 state
  const [openRegist, setOpenRegist] = useState(false);

  //수정모달 컨트롤 state
  const [openUpdate, setOpenUpdate] = useState(false);
  const [singleCurrRowData, setSingleCurrRowData] = useState({});

  //이미지 미리보기 컨트롤 state
  const [openPreview, setOpenPreview] = useState(false);

  const [columnDefs, setColumnDefs] = useState([
    { field: 'number', headerName: '번호', flex: 2, cellStyle: { textAlign: "center" } },
    { field: 'itemNm', headerName: '명칭', flex: 2, cellStyle: { textAlign: "center" } },
    { field: 'storage', headerName: '보관장소', flex: 2, cellStyle: { textAlign: "center" } },
    { field: 'texture', headerName: '재질', flex: 2, cellStyle: { textAlign: "center" } },
    { field: 'count', headerName: '건', flex: 1.5, cellStyle: { textAlign: "center" } },
    { field: 'piece', headerName: '점', flex: 1.5, cellStyle: { textAlign: "center" } },
    { field: 'comment', headerName: '제작시대/용도기능', flex: 3, cellStyle: { textAlign: "center" } },
    { field: 'size', headerName: '크기(cm)', flex: 2, cellStyle: { textAlign: "center" } },
    { field: 'getReason', headerName: '입수연유', flex: 2, cellStyle: { textAlign: "center" } },
    { field: 'country', headerName: '국가명', flex: 2, cellStyle: { textAlign: "center" } },
    { field: 'giver', headerName: '증정자이름/직책', flex: 2, cellStyle: { textAlign: "center" } },
    {
      field: 'image', headerName: '이미지', flex: 2, cellStyle: { textAlign: "center" },
      cellRenderer: function (row) {
        if (row.data.image) {
          return (
            <div className="" onClick={(e) => { openPreviewModal(row) }}>
              <img
                style={imgSize}
                loading="lazy"
                src={row.data.image}
              />
            </div>
          );
        } else return null;
      },
    },
    {
      field: '', headerName: '설정', flex: 2, cellStyle: { textAlign: "center" },
      cellRenderer: function (row) {
        return (
          <div>
            <Button style={{ padding: 0, fontWeight: "bold" }} onClick={(e) => openUpdateModal(row)}>수정</Button>
          </div>
        )
      }
    }
  ]);

  const onRowClicked = (row: any) => {
    setSelectedRow(row);
  }

  const openRegistModal = () => {
    setOpenRegist(true);
  }

  const closeRegistModal = () => {
    setOpenRegist(false)
  }

  const openUpdateModal = (row) => {
    setSingleCurrRowData(row.data);
    setOpenUpdate(true);
  }

  const closeUpdateModal = () => {
    setOpenUpdate(false)
  }

  const deleteRowData = () => {
    let seqNos = [];
    let currRowData = [];
    if (selectedRow.length > 0) {
      selectedRow.map((data) => {
        seqNos.push(data.seqNo);
      })
    }

    //삭제할 array 제외
    if (rowData.length > 0) {
      currRowData = rowData.filter(it => !seqNos.includes(it.seqNo));
    }
    setRowData(currRowData)
  }

  //깜빡임 없이 aggrid update
  const updateRow = (obj) => {
    let rowNode = gridState.current.api.getRowNode(gridState.current.api.getSelectedNodes()[0].rowIndex);
    let newData = { ...rowNode.data }
    Object.assign(newData, {
      itemNm: obj.itemNm,
      number: obj.number,
      storage: obj.storage,
      texture: obj.texture,
      count: obj.count,
      piece: obj.piece,
      comment: obj.comment,
      size: obj.size,
      getReason: obj.getReason,
      country: obj.country,
      giver: obj.giver,
      characteristic: obj.characteristic,
      fileList: obj.fileList,
      image: obj.image
    });
    rowNode.setData(newData)
  }

  const openPreviewModal = (row) => {
    setSingleCurrRowData(row.data);
    setOpenPreview(true);
  }

  const closePreviewModal = () => {
    setOpenPreview(false);
  }

  return (
    <>
      <PageTitleWrapper>
        <PageTitle heading="박물관리" />
        <BaseButton onClick={(e) => openRegistModal()}>등록</BaseButton>
        <DangerButton onClick={(e) => deleteRowData()}>삭제</DangerButton>
        {/* <Button variant="outlined" size="small">등록</Button> */}
      </PageTitleWrapper>
      <PageContainer>
        <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
          <Grid item xs={12}>
            <WngCard style={{ display: 'block' }}>
              <Grid xs={12}>
                <CardContent sx={{ padding: 0, flexGrow: 8 }}>
                  <Box noValidate component="form" autoComplete="off" sx={{ display: 'flex' }}>
                    <AgGrid
                      setRef={setgridState} // Ref for accessing Grid's API
                      rowData={rowData} // Row Data for Rows
                      columnDefs={columnDefs} // Column Defs for Columns
                      onRowClicked={onRowClicked}
                      heightVal={850}
                    />
                  </Box>
                </CardContent>
              </Grid>
            </WngCard>
          </Grid>
        </Grid>
      </PageContainer>

      {/* 등록모달 */}
      <ManagementRegistModal
        openRegist={openRegist}
        closeRegistModal={closeRegistModal}
        setRowData={setRowData}
        rowData={rowData}
      />

      {/* 수정모달 */}
      <ManagementUpdateModal
        openUpdate={openUpdate}
        closeUpdateModal={closeUpdateModal}
        setSingleCurrRowData={setSingleCurrRowData}
        singleCurrRowData={singleCurrRowData}
        updateRow={updateRow}
      />

      <ImagePreviewModal
        openPreview={openPreview}
        closePreviewModal={closePreviewModal}
        singleCurrRowData={singleCurrRowData}
      />
    </>
  );
};

export default Management;