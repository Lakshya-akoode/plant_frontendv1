"use client";

import { Suspense } from "react";
import MyEnquiry from "@/components/dashboard/my-enquiry";

const index = () => {
  return (
    <Suspense fallback={
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    }>
      <MyEnquiry />
    </Suspense>
  );
};

export default index;