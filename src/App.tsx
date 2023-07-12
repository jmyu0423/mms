import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import BaseLayout from "./components/layout/BaseLayout";
import { routes } from "./routes";
import { useAuth } from './contexts/AuthenticationContext';
import React, { Component, Suspense } from 'react'


function App() {
  const { authentication }: any = useAuth();
  console.log(authentication)
  let element;

  //로그인 유무
  if (authentication.current) {
    <MainLayout />
  } else {
    <BaseLayout />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={element}>
          {routes}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
