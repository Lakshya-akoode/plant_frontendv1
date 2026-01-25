"use client";

import { Suspense } from "react";
import MyLocation from "@/components/dashboard/my-location";

const index = () => {
  return (
    <Suspense fallback={
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    }>
      <MyLocation />
    </Suspense>
  );
};

export default index;