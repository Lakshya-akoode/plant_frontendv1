"use client";

import { Suspense } from "react";
import MySurvey from "@/components/dashboard/my-survey";

const index = () => {
  return (
    <Suspense fallback={
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    }>
      <MySurvey />
    </Suspense>
  );
};

export default index;

