"use client";

import { Suspense } from "react";
import ViewSurveyStudiesUser from "@/components/dashboard/view-survey-studies-user";

const index = () => {
  return (
    <Suspense fallback={
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    }>
      <ViewSurveyStudiesUser />
    </Suspense>
  );
};

export default index;

