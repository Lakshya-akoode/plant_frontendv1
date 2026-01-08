"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getDashboardData, formatNumber } from "../../../api/statistics";
import { getUsersApi } from "../../../api/user";

const AllStatistics = () => {
  const router = useRouter();
  const [statistics, setStatistics] = useState({
    totalUsers: 0,
    totalSurveys: 0,
    completedSurveys: 0,
    incompleteMPQUsers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setLoading(true);
        const dashboardData = await getDashboardData();

        // Fetch incomplete MPQ users count
        let incompleteMPQCount = 0;
        try {
          const incompleteUsersResponse = await getUsersApi({
            mpqStatus: "not completed",
            limit: 1,
            page: 1,
          });
          incompleteMPQCount = incompleteUsersResponse?.totalCount || 0;
        } catch (error) {
          console.error("Error fetching incomplete MPQ users:", error);
        }

        if (dashboardData && dashboardData.data) {
          setStatistics({
            totalUsers: dashboardData.data.users?.totalUsers || 0,
            totalSurveys:
              dashboardData.data.surveys?.totalSurveys || 0,
            completedSurveys:
              dashboardData.data.surveys?.totalUsersCompletedAllSurveys || 0,
            incompleteMPQUsers: incompleteMPQCount,
          });
        } else {
          // If dashboard data is not available, still set incomplete MPQ users
          setStatistics(prev => ({
            ...prev,
            incompleteMPQUsers: incompleteMPQCount,
          }));
        }
      } catch (error) {
        console.error("Error fetching statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  const allStatistics = [
    {
      id: 1,
      blockStyle: "",
      icon: (
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
            fill="currentColor"
          />
        </svg>
      ),
      timer: loading ? "..." : formatNumber(statistics.totalUsers),
      name: "Total Users",
    },
    {
      id: 2,
      blockStyle: "style2",
      icon: (
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17 2H15.82A3 3 0 0 0 12 0a3 3 0 0 0-2.82 2H7a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Zm-5 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2ZM9 7h6v2H9V7Zm0 4h6v2H9v-2Zm0 4h6v2H9v-2Z"
            fill="currentColor"
          />
        </svg>
      ),
      timer: loading ? "..." : formatNumber(statistics.totalSurveys),
      name: "Total Surveys",
    },
    {
      id: 3,
      blockStyle: "style3",
      icon: (
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 6H16V4C16 2.89 15.11 2 14 2H10C8.89 2 8 2.89 8 4V6H4C2.89 6 2.01 6.89 2.01 8L2 19C2 20.11 2.89 21 4 21H20C21.11 21 22 20.11 22 19V8C22 6.89 21.11 6 20 6ZM10 4H14V6H10V4ZM20 19H4V8H8V10H10V8H14V10H16V8H20V19Z"
            fill="currentColor"
          />
        </svg>
      ),
      timer: loading ? "..." : formatNumber(statistics.completedSurveys),
      name: "Completed Surveys",
    },
    {
      id: 4,
      blockStyle: "style4",
      icon: (
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
            fill="currentColor"
          />
          <circle cx="18" cy="6" r="4.5" fill="currentColor" opacity="0.9" />
          <path
            d="M18 4V6L19.5 7.5"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ),
      timer: loading ? "..." : formatNumber(statistics.incompleteMPQUsers),
      name: "Incomplete Users",
    },
  ];

  const handleCardClick = (itemId) => {
    if (itemId === 1) {
      router.push("/livetest/cmsadminlogin/my-user");
    } 
    else if (itemId === 2) {
      router.push("/livetest/cmsadminlogin/my-survey");
    }
    else if (itemId === 3) {  
      router.push("/livetest/cmsadminlogin/my-user");
    }
    else if (itemId === 4) {
      // Redirect to users list with MPQ Status filter set to "Not Completed"
      router.push("/livetest/cmsadminlogin/my-user?mpqStatus=Not%20Completed");
    }
  };

  return (
    <>
      {allStatistics.map((item) => (
        <div className="col-sm-6 col-md-6 col-lg-6 col-xl-3" key={item.id}>
          <div 
            className={`ff_one ${item.blockStyle}`}
            onClick={() => handleCardClick(item.id)}
            style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
          >
            <div className="stat-title">{item.name}</div>
            <div className="stat-content">
              <div className="stat-icon">{item.icon}</div>
              <div className="stat-value">{item.timer}</div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default AllStatistics;
