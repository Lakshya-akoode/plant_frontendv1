

"use client"; // Add this at the top
import Image from "next/image";
import { getSubscribeEnquiryTableData } from "@/api/subscribeenquiry";
import { useState, useEffect } from "react";
// import Image from "next/image";
import Link from "next/link";

const AuthorReview = () => {
  const [enquiryList, setEnquiryList] = useState([]);
  const fetchEnquiryData = async () => {
        const data = await getSubscribeEnquiryTableData();
        setEnquiryList(data);
      };
  
  useEffect(() => {
    fetchEnquiryData();
  }, []); 
  return (
    <>
      {enquiryList.map((item) => (
        <div className="media mt30" key={item.id}>
          
          <div className="media-body">
            <h5 className="review_title mt-0">
              
             
              
               <div> <span className="text-thm">Email: {item.email}</span> </div>
              
              <span className="sspd_review float-end">
                Enquiry At: {new Date(item.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: '2-digit',
                  year: 'numeric',
                })}
                </span>
            </h5>
            

           
          </div>
        </div>
      ))}
    </>
  );
};

export default AuthorReview;
