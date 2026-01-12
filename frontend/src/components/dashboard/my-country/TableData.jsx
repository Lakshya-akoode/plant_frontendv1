"use client"; // Add this at the top
import Image from "next/image";
import { getCountryTableData,deleteCountryAPI } from "../../../api/country";
import { getUsersApi } from "../../../api/user";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import Pagination from "./Pagination";
// import moment from 'moment';

const TableData = () => {
   const [countryList, setCountryList] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [totalCount, setTotalCount] = useState(0);
   const [totalPages, setTotalPages] = useState(0);
   const [loading, setLoading] = useState(false);
   const [userCounts, setUserCounts] = useState({});
   const pageSize = 20;
    const router = useRouter();
  
    const fetchUserCounts = async (countries) => {
      const counts = {};
      try {
        // Fetch user count for each country
        const promises = countries.map(async (country) => {
          try {
            const countryName = country.name || country.title || '';
            if (!countryName) return;
            
            const userResponse = await getUsersApi({ country: countryName, limit: 1 });
            const count = userResponse?.totalCount || 0;
            counts[country._id] = count;
          } catch (error) {
            console.error(`Error fetching user count for country ${country.name}:`, error);
            counts[country._id] = 0;
          }
        });
        
        await Promise.all(promises);
        setUserCounts(counts);
      } catch (error) {
        console.error("Error fetching user counts:", error);
      }
    };

    const fetchCountryData = async (page = 1) => {
      setLoading(true);
      try {
        const response = await getCountryTableData(page, pageSize);
        if (response && response.items) {
          const countries = response.items || [];
          setCountryList(countries);
          setTotalCount(response.totalCount || 0);
          setTotalPages(response.totalPages || 0);
          setCurrentPage(response.currentPage || 1);
          
          // Fetch user counts for the countries
          if (countries.length > 0) {
            await fetchUserCounts(countries);
          }
        } else {
          setCountryList([]);
          setTotalCount(0);
          setTotalPages(0);
          setUserCounts({});
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
        setCountryList([]);
        setTotalCount(0);
        setTotalPages(0);
        setUserCounts({});
      } finally {
        setLoading(false);
      }
    };
    const deleteCountry = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this Country?");
        if (!isConfirmed) return;
    
        try {
          const data = await deleteCountryAPI(id); // 🔹 Call the API function
          
          // alert(data.message);
          toast.success(data.message);
          // Refresh the current page data after deletion
          fetchCountryData(currentPage);
        } catch (error) {
          alert("Failed to delete Country.");
          //setError(error.message); // ❌ Show error if request fails
        }
      };

    const handlePageChange = (page) => {
      setCurrentPage(page);
      fetchCountryData(page);
    };
  let theadConent = [
    "Listing Title",
    "Phone Code",
    "Currency Code",
    "Total Users",
    // "Status",
    // "Action",
  ];
   let tbodyContent = countryList?.map((item) => (
     <tr key={item._id}>
       <td scope="row" className="py-2 px-3 align-middle" style={{border: 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
         <div className="d-flex align-items-center">
           <h4 className="mb-0" style={{overflow: 'hidden', textOverflow: 'ellipsis'}}>{item.name || item.title}</h4>
         </div>
       </td>
       {/* End td */}

       <td className="py-2 px-3 align-middle" style={{border: 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
         <div className="d-flex align-items-center">
           <h4 className="mb-0">{item.phonecode || '-'}</h4>
         </div>
       </td>
       {/* End td */}

       <td className="py-2 px-3 align-middle" style={{border: 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
         <div className="d-flex align-items-center">
           <h4 className="mb-0">{item.currency || '-'}</h4>
         </div>
       </td>
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
             <button onClick={() => router.push(`/livetest/cmsadminlogin/edit-country/${item._id}`)}>
               <span className="flaticon-edit"></span>
             </button>
           </li>

           <li
             className="list-inline-item"
             data-toggle="tooltip"
             data-placement="top"
             title="Delete"
           >
             <a href="#" onClick={() => deleteCountry(item._id)}>
               <span className="flaticon-garbage"></span>
             </a>
           </li>
         </ul>
       </td> */}
       {/* End td */}
     </tr>
   ));
useEffect(() => {
    fetchCountryData(1);
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
