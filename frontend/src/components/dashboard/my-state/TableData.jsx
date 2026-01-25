"use client"; // Add this at the top
import Image from "next/image";

import { getStateTableData,deleteStateAPI } from "../../../api/state";
import { getUsersApi } from "../../../api/user";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import Pagination from "./Pagination";

// import moment from 'moment';

const TableData = () => {
   const [stateList, setStateList] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [totalCount, setTotalCount] = useState(0);
   const [totalPages, setTotalPages] = useState(0);
   const [loading, setLoading] = useState(false);
   const [userCounts, setUserCounts] = useState({});
   const pageSize = 20;
    const router = useRouter();
  
    const fetchUserCounts = async (states) => {
      const counts = {};
      try {
        // Fetch user count for each state
        const promises = states.map(async (state) => {
          try {
            const stateName = state.name || state.title || '';
            if (!stateName) return;
            
            const userResponse = await getUsersApi({ state: stateName, limit: 1 });
            const count = userResponse?.totalCount || 0;
            counts[state._id] = count;
          } catch (error) {
            console.error(`Error fetching user count for state ${state.name}:`, error);
            counts[state._id] = 0;
          }
        });
        
        await Promise.all(promises);
        setUserCounts(counts);
      } catch (error) {
        console.error("Error fetching user counts:", error);
      }
    };

    const fetchStateData = async (page = 1) => {
      setLoading(true);
      try {
        const response = await getStateTableData(page, pageSize);
        if (response && response.items) {
          const states = response.items || [];
          setStateList(states);
          setTotalCount(response.totalCount || 0);
          setTotalPages(response.totalPages || 0);
          setCurrentPage(response.currentPage || 1);
          
          // Fetch user counts for the states
          if (states.length > 0) {
            await fetchUserCounts(states);
          }
        } else {
          setStateList([]);
          setTotalCount(0);
          setTotalPages(0);
          setUserCounts({});
        }
      } catch (error) {
        console.error("Error fetching states:", error);
        setStateList([]);
        setTotalCount(0);
        setTotalPages(0);
        setUserCounts({});
      } finally {
        setLoading(false);
      }
    };
    const deleteState = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this State?");
        if (!isConfirmed) return;
    
        try {
          const data = await deleteStateAPI(id); // 🔹 Call the API function
          
          // alert(data.message);
          toast.success(data.message);
          // Refresh the current page data after deletion
          fetchStateData(currentPage);
        } catch (error) {
          alert("Failed to delete State.");
          //setError(error.message); // ❌ Show error if request fails
        }
      };

    const handlePageChange = (page) => {
      setCurrentPage(page);
      fetchStateData(page);
    };
  let theadConent = [
    "State Name",
    "Country",
    // "Date Published",
    "Total Users",
    // "Status",
    // "Action",
  ];

  let tbodyContent = stateList?.map((item) => (
    <tr key={item._id}>
      <td scope="row" className="py-2 px-3 align-middle" style={{border: 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
        <div className="d-flex align-items-center">
          <h4 className="mb-0" style={{overflow: 'hidden', textOverflow: 'ellipsis'}}>{item.name || item.title}</h4>
        </div>
      </td>
      {/* End td */}

      <td className="py-2 px-3 align-middle" style={{border: 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
        <div className="d-flex align-items-center">
          <h4 className="mb-0">{item.country_name || item.countryid?.title || item.countryid?.name || '-'}</h4>
        </div>
      </td>
      {/* End td */}

      {/* <td className="py-2 px-3 align-middle" style={{border: 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
        <div className="d-flex align-items-center">
          <h4 className="mb-0">
            {item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: '2-digit',
              year: 'numeric',
            }) : '-'}
          </h4>
        </div>
      </td> */}
      {/* End td */}

      <td className="py-2 px-3 align-middle" style={{border: 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
        <div className="d-flex align-items-center">
          <h4 className="mb-0">{userCounts[item._id] !== undefined ? userCounts[item._id] : '-'}</h4>
        </div>
      </td>
      {/* End td */}

      {/* <td className="py-2 px-3 align-middle" style={{border: 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
        <span className={`status_tag ${item.status ? 'badge2' : 'badge'}`}>
          {item.status ? "Active" : "Inactive"}
        </span>
      </td> */}
      {/* End td */}

      {/* <td className="py-2 px-3 align-middle" style={{border: 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
        <ul className="view_edit_delete_list mb0 d-flex align-items-center">
          <li
            className="list-inline-item"
            data-toggle="tooltip"
            data-placement="top"
            title="Edit"
          >
            <button onClick={() => router.push(`/cmsadminlogin/edit-state/${item._id}`)}>
              <span className="flaticon-edit"></span>
            </button>
          </li>

          <li
            className="list-inline-item"
            data-toggle="tooltip"
            data-placement="top"
            title="Delete"
          >
            <a href="#" onClick={() => deleteState(item._id)}>
              <span className="flaticon-garbage"></span>
            </a>
          </li>
        </ul>
      </td> */}
      {/* End td */}
    </tr>
  ));
useEffect(() => {
    fetchStateData(1);
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
