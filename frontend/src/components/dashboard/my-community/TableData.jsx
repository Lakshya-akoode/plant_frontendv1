"use client"; // Add this at the top
import Image from "next/image";

import { getCommunityData, deleteCommunityAPI } from "../../../api/community";
import { getUsersApi } from "../../../api/user";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import Pagination from "./Pagination";

// import moment from 'moment';

const TableData = () => {
    const [communityList, setCommunityList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const pageSize = 10;
    const router = useRouter();

    const [allCommunityData, setAllCommunityData] = useState([]);

    const fetchCommunityData = async (page = 1) => {
      setLoading(true);
      try {
        let sortedItems = allCommunityData;
        
        // Fetch all data first time, then use cached data for pagination
        if (allCommunityData.length === 0) {
          // Fetch all data with a large limit to get all items
          const response = await getCommunityData(1, 10000);
          if (response && response.items) {
            // Sort all items by createdAt descending (newest first)
            sortedItems = [...(response.items || [])].sort((a, b) => {
              const dateA = new Date(a.createdAt || a.created_at || 0);
              const dateB = new Date(b.createdAt || b.created_at || 0);
              return dateB - dateA; // Descending order (newest first)
            });
            setAllCommunityData(sortedItems);
            setTotalCount(response.totalCount || sortedItems.length);
            setTotalPages(Math.ceil((response.totalCount || sortedItems.length) / pageSize));
          }
        }

        // Paginate the sorted data on frontend
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedData = sortedItems.slice(startIndex, endIndex);
        
        setCommunityList(paginatedData);
        setCurrentPage(page);
      } catch (error) {
        console.error("Error fetching community data:", error);
        setCommunityList([]);
        setTotalCount(0);
        setTotalPages(0);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserData = async () => {
      try {
        const data = await getUsersApi();
        setUserList(data.items || []);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const getUserName = (userId) => {
      // Handle mock data
      if (userId === "mock-user-id") return "John Doe";
      if (userId === "mock-user-id-2") return "Jane Smith";
      
      const user = userList.find(u => u._id === userId);
      return user ? user.name : "Unknown User";
    };

    const deleteCommunity = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this comment?");
        if (!isConfirmed) return;
    
        try {
          const data = await deleteCommunityAPI(id);
          toast.success(data.message);
          
          // Remove the deleted item from allCommunityData
          const updatedData = allCommunityData.filter(item => item._id !== id);
          setAllCommunityData(updatedData);
          setTotalCount(updatedData.length);
          setTotalPages(Math.ceil(updatedData.length / pageSize));
          
          // After deletion, check if current page becomes empty
          // If we're on a page that will become empty, go to previous page
          const startIndex = (currentPage - 1) * pageSize;
          if (updatedData.length <= startIndex && currentPage > 1) {
            // Current page will be empty, go to previous page
            const newPage = currentPage - 1;
            setCurrentPage(newPage);
            fetchCommunityData(newPage);
          } else {
            // Refresh the current page data after deletion
            fetchCommunityData(currentPage);
          }
        } catch (error) {
          alert("Failed to delete comment.");
        }
      };

    const handlePageChange = (page) => {
      setCurrentPage(page);
      fetchCommunityData(page);
    };
  let theadConent = [
    "User",
    "Comment",
    "Likes/Dislikes",
    "Action",
  ];

  let tbodyContent = communityList?.map((item) => (
    <tr key={item._id}>
      <td scope="row" className="py-2 px-3 align-middle" style={{border: 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
        <div className="d-flex align-items-center">
          <h4 className="mb-0" style={{overflow: 'hidden', textOverflow: 'ellipsis'}}>{getUserName(item.user)}</h4>
        </div>
      </td>
      {/* End td */}

      <td className="py-2 px-3 align-middle" style={{border: 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
        <div className="d-flex align-items-center">
          <h4 className="mb-0" style={{overflow: 'hidden', textOverflow: 'ellipsis'}}>{item.comment}</h4>
        </div>
      </td>
      {/* End td */}

      <td className="py-2 px-3 align-middle" style={{border: 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
        <div className="d-flex align-items-center gap-2">
          <span className="badge bg-success">
            <i className="fa fa-thumbs-up me-1"></i>
            {item.likes || item.likesCount || 0}
          </span>
          <span className="badge bg-danger">
            <i className="fa fa-thumbs-down me-1"></i>
            {item.dislikes || item.dislikesCount || 0}
          </span>
        </div>
      </td>
      {/* End td */}

      <td className="py-2 px-3 align-middle" style={{border: 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
        <ul className="view_edit_delete_list mb0 d-flex align-items-center">
          <li
            className="list-inline-item"
            data-toggle="tooltip"
            data-placement="top"
            title="Edit"
          >
            <button onClick={() => router.push(`/cmsadminlogin/edit-community/${item._id}`)}>
              <span className="flaticon-edit"></span>
            </button>
          </li>
          {/* End li */}

          <li
            className="list-inline-item"
            data-toggle="tooltip"
            data-placement="top"
            title="Delete"
          >
            <a href="#" onClick={() => deleteCommunity(item._id)}>
              <span className="flaticon-garbage"></span>
            </a>
          </li>
        </ul>
      </td>
      {/* End td */}
    </tr>
  ));
useEffect(() => {
    fetchCommunityData(1);
    fetchUserData();
  }, []); 
  
  return (
    <>
      {loading ? (
        <div className="text-center py-4">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <table className="table" style={{border: 'none', borderCollapse: 'separate', borderSpacing: '0', width: '100%', tableLayout: 'fixed'}}>
            <thead className="thead-light">
              <tr>
                {theadConent.map((value, i) => (
                  <th scope="col" key={i} className="py-2 px-3 align-middle" style={{border: 'none', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                    {value}
                  </th>
                ))}
              </tr>
            </thead>
            {/* End theaad */}

            <tbody>{tbodyContent}</tbody>
          </table>
          
          {totalPages > 1 && (
            <div className="mbp_pagination">
              <Pagination
                totalCount={totalCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default TableData;
