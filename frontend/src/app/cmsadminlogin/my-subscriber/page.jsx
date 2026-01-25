"use client";

import { Suspense } from "react";
import MySubscriber from "@/components/dashboard/my-subscriber";

const index = () => {
  return (
    <Suspense fallback={
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    }>
      <MySubscriber />
    </Suspense>
  );
};

export default index;

