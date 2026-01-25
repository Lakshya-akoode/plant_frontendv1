"use client"; // Add this at the top
import Image from "next/image";
import properties from "../../../data/properties";
// import properties from "../../../api/city";
import { getCityTableData,deleteCityAPI } from "../../../api/city";
import { getUsersApi } from "../../../api/user";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// import moment from 'moment';
import { toast } from 'react-toastify';
import Pagination from "./Pagination";

const TableData = () => {
   const [cityList, setCityList] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [totalCount, setTotalCount] = useState(0);
   const [totalPages, setTotalPages] = useState(0);
   const [loading, setLoading] = useState(false);
   const [userCounts, setUserCounts] = useState({});
   const pageSize = 20;
    const router = useRouter();
  
    const fetchUserCounts = async (cities) => {
      const counts = {};
      try {
        // Fetch user count for each city
        const promises = cities.map(async (city) => {
          try {
            const cityName = city.name || city.title || '';
            if (!cityName) return;
            
            const userResponse = await getUsersApi({ city: cityName, limit: 1 });
            const count = userResponse?.totalCount || 0;
            counts[city._id] = count;
          } catch (error) {
            console.error(`Error fetching user count for city ${city.name}:`, error);
            counts[city._id] = 0;
          }
        });
        
        await Promise.all(promises);
        setUserCounts(counts);
      } catch (error) {
        console.error("Error fetching user counts:", error);
      }
    };

    const fetchCityData = async (page = 1) => {
      setLoading(true);
      try {
        const response = await getCityTableData(page, pageSize);
        if (response && response.items) {
          const cities = response.items || [];
          setCityList(cities);
          setTotalCount(response.totalCount || 0);
          setTotalPages(response.totalPages || 0);
          setCurrentPage(response.currentPage || 1);
          
          // Fetch user counts for the cities
          if (cities.length > 0) {
            await fetchUserCounts(cities);
          }
        } else {
          setCityList([]);
          setTotalCount(0);
          setTotalPages(0);
          setUserCounts({});
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
        setCityList([]);
        setTotalCount(0);
        setTotalPages(0);
        setUserCounts({});
      } finally {
        setLoading(false);
      }
    };
    const deleteCity = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this city?");
        if (!isConfirmed) return;
    
        try {
          const data = await deleteCityAPI(id); // 🔹 Call the API function
          
          // alert(data.message);
           toast.success(data.message);
          // Refresh the current page data after deletion
          fetchCityData(currentPage);
        } catch (error) {
          alert("Failed to delete city.");
          //setError(error.message); // ❌ Show error if request fails
        }
      };

    const handlePageChange = (page) => {
      setCurrentPage(page);
      fetchCityData(page);
    };
  let theadConent = [
    "City Name",
    "Country",
    "State",
    // "Date published",
    "Total Users",
    // "Status",
    // "Action",
  ];
  let tbodyContent = cityList?.map((item) => (
    <tr key={item._id}>
      <td scope="row" className="py-2 px-3 align-middle" style={{border: 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
        <div className="d-flex align-items-center">
          <h4 className="mb-0" style={{overflow: 'hidden', textOverflow: 'ellipsis'}}>{item.name || item.title}</h4>
        </div>
      </td>
      <td className="py-2 px-3 align-middle" style={{border: 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
        <div className="d-flex align-items-center">
          <h4 className="mb-0">{item.country_name || item.countryid?.title || item.countryid?.name || '-'}</h4>
        </div>
      </td>
      <td className="py-2 px-3 align-middle" style={{border: 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
        <div className="d-flex align-items-center">
          <h4 className="mb-0">{item.state_name || item.stateid?.title || item.stateid?.name || '-'}</h4>
        </div>
      </td>
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
      <td className="py-2 px-3 align-middle" style={{border: 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
        <div className="d-flex align-items-center">
          <h4 className="mb-0">{userCounts[item._id] !== undefined ? userCounts[item._id] : '-'}</h4>
        </div>
      </td>
      {/* <td className="py-2 px-3 align-middle" style={{border: 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
        <span className={`status_tag ${item.status ? 'badge2' : 'badge'}`}>
          {item.status ? "Active" : "Inactive"}
        </span>
      </td> */}
      {/* <td className="py-2 px-3 align-middle" style={{border: 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
        <ul className="view_edit_delete_list mb0 d-flex align-items-center">
          <li
            className="list-inline-item"
            data-toggle="tooltip"
            data-placement="top"
            title="Edit"
          >
            <button onClick={() => router.push(`/cmsadminlogin/edit-city/${item._id}`)}>
              <span className="flaticon-edit"></span>
            </button>
          </li>
          <li
            className="list-inline-item"
            data-toggle="tooltip"
            data-placement="top"
            title="Delete"
          >
            <a href="#" onClick={() => deleteCity(item._id)}>
              <span className="flaticon-garbage"></span>
            </a>
          </li>
        </ul>
      </td> */}
    </tr>
  ));
useEffect(() => {
    fetchCityData(1);
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
