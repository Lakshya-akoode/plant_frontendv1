"use client";

import { Suspense } from "react";
import MyBlog from "@/components/dashboard/my-blog";

const index = () => {
  return (
    <Suspense fallback={
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    }>
      <MyBlog />
    </Suspense>
  );
};

export default index;