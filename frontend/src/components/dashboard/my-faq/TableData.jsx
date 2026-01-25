"use client"; // Add this at the top
import Image from "next/image";
import { getFaqTableData,deleteFaqAPI } from "../../../api/faq";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// import moment from 'moment';
import { toast } from 'react-toastify';
const TableData = ({faqList,setFaqList}) => {
    const router = useRouter();
    const deleteFaq = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this FAQ?");
        if (!isConfirmed) return;
    
        try {
          const data = await deleteFaqAPI(id);
          
          toast.success(data.message);
          setFaqList((prevFaqList) => prevFaqList.filter((faq) => faq._id !== id));
        } catch (error) {
          toast.error(error.message || "Failed to delete FAQ");
          console.error("Delete error:", error);
        }
      };
  let theadConent = [
    "Listing Title",
    "Date published",
    "Status",
    "Action",
  ];
  let tbodyContent = faqList?.slice(0, 10)?.map((item) => (
    <tr key={item._id} style={{ 
      backgroundColor: '#f8f9fa',
      borderBottom: '1px solid #e5e7eb'
    }}>
      <td scope="row" style={{ 
        padding: '12px 15px',
        border: 'none',
        color: '#374151',
        fontSize: '16px',
        verticalAlign: 'middle',
        textAlign: 'left'
      }}>
        {item.title}
      </td>
      {/* End td */}

      <td style={{ 
        padding: '12px 15px',
        border: 'none',
        color: '#374151',
        fontSize: '16px',
        verticalAlign: 'middle',
        textAlign: 'left'
      }}>
        {new Date(item.createdAt).toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        })}
      </td>
      {/* End td */}

      <td style={{ 
        padding: '12px 15px',
        border: 'none',
        textAlign: 'center',
        verticalAlign: 'middle'
      }}>
        <span style={{
          backgroundColor: item.status ? '#10b981' : '#ef4444',
          color: 'white',
          padding: '4px 12px',
          borderRadius: '4px',
          fontSize: '16px',
          fontWeight: '500'
        }}>
          {item.status ? "Active" : "Inactive"}
        </span>
      </td>
      {/* End td */}

      <td style={{ 
        padding: '12px 15px',
        border: 'none',
        textAlign: 'center',
        verticalAlign: 'middle'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '5px'
        }}>
          <button 
            onClick={() => router.push(`/cmsadminlogin/edit-faq/${item._id}`)}
            style={{
              backgroundColor: '#f3f4f6',
              border: 'none',
              borderRadius: '4px',
              padding: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px'
            }}
            title="Edit FAQ"
          >
            <span className="flaticon-edit" style={{
              color: '#374151',
              fontSize: '16px'
            }}></span>
          </button>
          
          <button 
            onClick={() => deleteFaq(item._id)}
            style={{
              backgroundColor: '#f3f4f6',
              border: 'none',
              borderRadius: '4px',
              padding: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px'
            }}
            title="Delete FAQ"
          >
            <span className="flaticon-garbage" style={{
              color: '#374151',
              fontSize: '16px'
            }}></span>
          </button>
        </div>
      </td>
      {/* End td */}
    </tr>
  ));
// useEffect(() => {
//     fetchFaqData();
//   }, []); 
  return (
    <>
      <table className="table">
        <thead className="thead-light">
          <tr>
            {theadConent.map((value, i) => (
              <th scope="col" key={i} style={{
                backgroundColor: '#1f2937',
                color: 'white',
                fontWeight: 'bold',
                padding: '12px 15px',
                textAlign: i === 0 ? 'left' : i === 1 ? 'left' : 'center',
                border: 'none'
              }}>
                {value}
              </th>
            ))}
          </tr>
        </thead>
        {/* End thead */}

        <tbody>{tbodyContent}</tbody>
      </table>
    </>
  );
};

export default TableData;
