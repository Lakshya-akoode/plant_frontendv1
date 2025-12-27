"use client";

import { Suspense } from "react";
import ViewSurveyStudies from "@/components/dashboard/view-survey-studies";

const index = () => {
  return (
    <Suspense fallback={
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    }>
      <ViewSurveyStudies />
    </Suspense>
  );
};

export default index;

