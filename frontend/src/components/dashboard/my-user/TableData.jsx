"use client";
import Image from "next/image";
import { getUsersApi, deleteUserAPI } from "../../../api/user";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';

const TableData = ({ 
  filters = {}, 
  currentPage = 1, 
  pageSize = 10, 
  onUserListChange, 
  onTotalCountChange 
}) => {
   const [userList, setUserList] = useState([]);
   const [loading, setLoading] = useState(false);
    const router = useRouter();
  
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const data = await getUsersApi({
          ...filters,
          page: currentPage,
          limit: pageSize
        });
  
        setUserList(data);
        if (onUserListChange) onUserListChange(data.items || []);
        if (onTotalCountChange) onTotalCountChange(data.totalCount || 0);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUserList({ items: [], totalCount: 0 });
        if (onUserListChange) onUserListChange([]);
        if (onTotalCountChange) onTotalCountChange(0);
      } finally {
        setLoading(false);
      }
    };
    
  const deleteUser = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this user?");
    if (!isConfirmed) return;

    try {
      await deleteUserAPI(id);
      toast.success("User deleted successfully!");
      await fetchUserData();
    } catch (error) {
      toast.error(error.message || "Failed to delete user.");
    }
  };
  const theadContent = [
    "Listing Title",
    "User Email",
    "MPQ Status",
    "Logs",
    "Logs History",
    "Survey Studies",
    "MPQ",
  ];
  const tbodyContent = userList?.items?.map((item) => (
    <tr key={item._id}>
      <td scope="row" className="py-2 px-3 align-middle">
        <div className="d-flex align-items-center">
          <h4 className="mb-0 fw-normal">{item.name}</h4>
        </div>
      </td>

      <td className="py-2 px-3 align-middle">
        <span className="text-dark">{item.email}</span>
      </td>

      {/* <td className="py-2 px-3 align-middle">
        <span className={`status_tag ${item.isEmailVerified && item.isPhoneVerified ? 'badge2' : 'badge'}`}>
          {item.isEmailVerified && item.isPhoneVerified ? "Verified" : "Basic"}
        </span>
      </td> */}
      <td className="py-2 px-3 align-middle">
        <span className={`status_tag ${item.masterProfileQuestionnaireCompleted ? 'badge2' : 'badge'}`}>
          {item.masterProfileQuestionnaireCompleted ? "Completed" : "Not Completed"}
        </span>
      </td>
      
      <td className="py-2 px-3 align-middle">
        <button 
          className="btn btn-sm"
          style={{ backgroundColor: '#5cb85c', color: 'white', border: 'none' }}
          onClick={() => router.push(`/livetest/cmsadminlogin/edit-logs/${item._id}`)}
          title="View Logs"
        >
          View
        </button>
      </td>
      <td className="py-2 px-3 align-middle">
        <button 
          className="btn btn-sm"
          style={{ backgroundColor: '#5cb85c', color: 'white', border: 'none' }}
          onClick={() => router.push(`/livetest/cmsadminlogin/view-loghistory/${item._id}`)}
          title="View Logs"
        >
          View
        </button>
      </td>
       <td className="py-2 px-3 align-middle">
        <button 
          className="btn btn-sm"
          style={{ backgroundColor: '#5cb85c', color: 'white', border: 'none' }}
          onClick={() => router.push(`/livetest/cmsadminlogin/view-surveystudies/${item._id}`)}
          title="View Logs"
        >
          View
        </button>
      </td>

      <td className="py-2 px-3 align-middle">
        <div className="d-flex align-items-center">
          <button 
            className="btn btn-sm btn-outline-secondary"  style={{ backgroundColor: '#34aa54', color: 'white', border: 'none' }}
            onClick={() => router.push(`/livetest/cmsadminlogin/edit-user/${item._id}`)}
            title="Edit"
          >
            <span className="flaticon-edit"></span>
          </button>
          <button 
            className="btn btn-sm btn-outline-secondary ml-2  bg-danger text-white" 
            onClick={() => deleteUser(item._id)}
            title="Delete"
          >
            <span className="flaticon-garbage"></span>
          </button>
        </div>
      </td>
    </tr>
  )) || [];

  useEffect(() => {
    fetchUserData();
  }, [filters, currentPage, pageSize]);

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading users...</p>
      </div>
    );
  }

  return (
    <>
      <table className="table">
        <thead className="thead-light">
          <tr>
            {theadContent.map((value, i) => (
              <th scope="col" key={i} className="py-2 px-3 align-middle">
                {value}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{tbodyContent}</tbody>
      </table>
    </>
  );
};

export default TableData;