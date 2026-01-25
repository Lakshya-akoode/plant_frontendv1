"use client";

import { Suspense } from "react";
import MyCities from "@/components/dashboard/my-cities";

const index = () => {
  return (
    <Suspense fallback={
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    }>
      <MyCities />
    </Suspense>
  );
};

export default index;