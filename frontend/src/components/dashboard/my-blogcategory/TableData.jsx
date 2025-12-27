"use client"; // Add this at the top
import Image from "next/image";
import { getBlogcategoryTableData,deleteBlogcategoryAPI } from "../../../api/blogcategory";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// import moment from 'moment';
import { toast } from 'react-toastify';

const TableData = () => {
   const [blogcategoryList, setBlogcategoryList] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
    const router = useRouter();
  
    const fetchBlogcategoryData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getBlogcategoryTableData();
        setBlogcategoryList(data);
      } catch (error) {
        setError(error.message);
        toast.error("Failed to fetch blog categories.");
        setBlogcategoryList([]);
      } finally {
        setLoading(false);
      }
    };
    const deleteBlogcategory = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this Blogcategory?");
        if (!isConfirmed) return;
    
        try {
          const data = await deleteBlogcategoryAPI(id); // 🔹 Call the API function
          
          toast.success(data.message);
          setBlogcategoryList((prevBlogcategoryList) => prevBlogcategoryList.filter((blogcategory) => blogcategory._id !== id));
          //setTitle(""); // ✅ Reset input after success
        } catch (error) {
          alert("Failed to delete Blogcategory.");
          //setError(error.message); // ❌ Show error if request fails
        }
      };
  let theadConent = [
    "Listing Title",
    "Date published",
    "Status",
    "Action",
  ];
  let tbodyContent = Array.isArray(blogcategoryList) ? blogcategoryList.map((item) => (
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
          backgroundColor: item.status ? '#5cb85c' : '#ef4444',
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
            onClick={() => router.push(`/livetest/cmsadminlogin/edit-blogcategory/${item._id}`)}
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
            onClick={() => deleteBlogcategory(item._id)}
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
  )) : [];
useEffect(() => {
    fetchBlogcategoryData();
  }, []); 
  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading blog categories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">Error!</h4>
        <p>{error}</p>
        <hr />
        <p className="mb-0">
          <button 
            className="btn btn-primary" 
            onClick={fetchBlogcategoryData}
          >
            Try Again
          </button>
        </p>
      </div>
    );
  }

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

        <tbody>
          {!Array.isArray(blogcategoryList) || blogcategoryList.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center py-4">
                <p className="mb-0">No blog categories found.</p>
                <small className="text-muted">Create your first blog category to get started.</small>
              </td>
            </tr>
          ) : (
            tbodyContent
          )}
        </tbody>
      </table>
    </>
  );
};

export default TableData;
