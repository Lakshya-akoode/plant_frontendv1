"use client"; // Add this at the top
import Image from "next/image";
import { getBlogTableData,deleteBlogAPI } from "../../../api/blog";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
// import moment from 'moment';

const TableData = () => {
   const [blogList, setBlogList] = useState([]);
    const router = useRouter();
  
    const fetchBlogData = async () => {
      const data = await getBlogTableData();
      setBlogList(data);
    };
    const deleteBlog = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this Blog?");
        if (!isConfirmed) return;
    
        try {
          const data = await deleteBlogAPI(id); // 🔹 Call the API function
          
          toast.success(data.message);
          setBlogList((prevBlogList) => prevBlogList.filter((blog) => blog._id !== id));
          //setTitle(""); // ✅ Reset input after success
        } catch (error) {
          alert("Failed to delete Blog.");
          //setError(error.message); // ❌ Show error if request fails
        }
      };
  let theadConent = [
    "Listing Title",
    "Date published",
    "Status",
    "Action",
  ];
  let tbodyContent = blogList?.slice(0, 10)?.map((item) => (
    <tr key={item._id} style={{backgroundColor: 'white'}}>
      <td scope="row" style={{padding: '15px', fontFamily: 'serif', color: '#6b7280'}}>
        <div style={{fontSize: '16px', fontWeight: 'normal'}}>
          {item.title}
        </div>
      </td>
      {/* End td */}

      <td style={{padding: '15px', fontFamily: 'serif', color: '#6b7280'}}>
        {new Date(item.createdAt).toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        })}
      </td>
      {/* End td */}

      <td style={{padding: '15px'}}>
        <span style={{
          backgroundColor: item.status ? '#10b981' : '#ef4444',
          color: 'white',
          padding: '4px 12px',
          borderRadius: '6px',
          fontSize: '14px',
          fontWeight: '500',
          display: 'inline-block'
        }}>
          {item.status ? "Active" : "Deactive"}
        </span>
      </td>
      {/* End td */}

      <td style={{padding: '15px'}}>
        <div style={{display: 'flex', gap: '8px'}}>
          <button 
            onClick={() => router.push(`/livetest/cmsadminlogin/edit-blog/${item._id}`)}
            style={{
              backgroundColor: '#f3f4f6',
              border: 'none',
              borderRadius: '6px',
              padding: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px'
            }}
            title="Edit"
          >
            <span className="flaticon-edit" style={{color: '#374151', fontSize: '16px'}}></span>
          </button>
          
          <button 
            onClick={() => deleteBlog(item._id)}
            style={{
              backgroundColor: '#f3f4f6',
              border: 'none',
              borderRadius: '6px',
              padding: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px'
            }}
            title="Delete"
          >
            <span className="flaticon-garbage" style={{color: '#374151', fontSize: '16px'}}></span>
          </button>
        </div>
      </td>
      {/* End td */}
    </tr>
  ));
useEffect(() => {
    fetchBlogData();
  }, []); 
  return (
    <>
      <table className="table">
        <thead className="thead-light">
          <tr>
            {theadConent.map((value, i) => (
              <th scope="col" key={i} style={{backgroundColor: '#1f2937', color: 'white', fontWeight: 'bold', padding: '12px 15px'}}>
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
