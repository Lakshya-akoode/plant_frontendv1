"use client"; // Add this at the top

import { getEnquiryTableData,deleteSubscribeEnquiryAPI } from "@/api/subscribeenquiry";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';

const TableData = ({enquiryList,setEnquiryList}) => {
    const router = useRouter();
  
    
    const deleteEnquiry = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this Enquiry?");
        if (!isConfirmed) return;
    
        try {
          const data = await deleteSubscribeEnquiryAPI(id); // 🔹 Call the API function
          
          // alert(data.message);
           toast.success(data.message);
          setEnquiryList((prevEnquiryList) => prevEnquiryList.filter((enquiry) => enquiry._id !== id));
          //setTitle(""); // ✅ Reset input after success
        } catch (error) {
          alert("Failed to delete city.");
          //setError(error.message); // ❌ Show error if request fails
        }
      };
  let theadConent = [
    "Email",
    "Date",
    "Action",
  ];
  let tbodyContent = enquiryList?.map((item) => (
    <tr key={item._id}>
    
      {/* End td */}
      <td>{item.email}</td>
        <td>{new Date(item.createdAt).toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        })}</td>
      {/* End td */}

     
      {/* End td */}

     

      <td>
        <ul className="view_edit_delete_list mb0">
          
          {/* End li */}

          <li
            className="list-inline-item"
            data-toggle="tooltip"
            data-placement="top"
            title="Delete"
          >
            <a href="#"  onClick={() => deleteEnquiry(item._id)}>
              <span className="flaticon-garbage"></span>
            </a>
          </li>
        </ul>
      </td>
      {/* End td */}
    </tr>
  ));
// useEffect(() => {
//     fetchEnquiryData();
//   }, []); 
  return (
    <>
      <table className="table">
        <thead className="thead-light">
          <tr>
            {theadConent.map((value, i) => (
              <th scope="col" key={i}>
                {value}
              </th>
            ))}
          </tr>
        </thead>
        {/* End theaad */}

        <tbody>{tbodyContent}</tbody>
      </table>
    </>
  );
};

export default TableData;
