import { useState, useEffect } from 'react';

const HealthCategoryDistribution = () => {
  const [demographics, setDemographics] = useState([
    { name: "Male", percentage: 0, color: "#4CAF50" },
    { name: "female", percentage: 0, color: "#81C784" },
    { name: "Non-binary", percentage: 0, color: "#A5D6A7" },
    { name: "Prefer not to say", percentage: 0, color: "#C8E6C9" },
    { name: "Other", percentage: 0, color: "#2E7D32" }
  ]);

  useEffect(() => {
    const fetchGenderData = async () => {
      try {
        const userDataString = localStorage.getItem("user");
        if (!userDataString) {
          console.error("No user data found in localStorage");
          return;
        }
        
        const userData = JSON.parse(userDataString);
        const token = userData?.token;

        if (!token) {
          console.error("No authentication token found");
          return;
        }

        const url = process.env.NEXT_PUBLIC_ADMIN_API_URL + "api/dashboard/gender-types-percentage";

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Gender API error response:", errorText);
          return;
        }

        const data = await response.json();
        
        if (data.success && data.data) {
          const genderData = data.data;
          const updatedDemographics = [
            { name: "Male", percentage: Math.round(genderData.Male || 0), color: "#4CAF50" },
            { name: "female", percentage: Math.round(genderData.female || 0), color: "#81C784" },
            { name: "Non-binary", percentage: Math.round(genderData["Non-binary"] || 0), color: "#A5D6A7" },
            { name: "Prefer not to say", percentage: Math.round(genderData["Prefer not to say"] || 0), color: "#C8E6C9" },
            { name: "Other", percentage: Math.round(genderData.Other || 0), color: "#2E7D32" }
          ];
          setDemographics(updatedDemographics);
        }
      } catch (error) {
        console.error('Error fetching gender data:', error);
      }
    };

    fetchGenderData();
  }, []);

  return (
    <div className="demographic-breakdown">
      <div className="donut-chart-container">
        <div className="donut-chart">
          <svg width="140" height="140" viewBox="0 0 140 140">
            {/* Background circle */}
            <circle
              cx="70"
              cy="70"
              r="55"
              fill="none"
              stroke="#f3f4f6"
              strokeWidth="20"
            />
            {/* Male segment - largest */}
            <circle
              cx="70"
              cy="70"
              r="55"
              fill="none"
              stroke="#4CAF50"
              strokeWidth="20"
              strokeDasharray={`${52 * 3.456} ${100 * 3.456}`}
              strokeDashoffset="0"
              transform="rotate(-90 70 70)"
            />
            {/* Female segment */}
            <circle
              cx="70"
              cy="70"
              r="55"
              fill="none"
              stroke="#81C784"
              strokeWidth="20"
              strokeDasharray={`${45 * 3.456} ${100 * 3.456}`}
              strokeDashoffset={`-${52 * 3.456}`}
              transform="rotate(-90 70 70)"
            />
            {/* Non-binary segment */}
            <circle
              cx="70"
              cy="70"
              r="55"
              fill="none"
              stroke="#A5D6A7"
              strokeWidth="20"
              strokeDasharray={`${2 * 3.456} ${100 * 3.456}`}
              strokeDashoffset={`-${97 * 3.456}`}
              transform="rotate(-90 70 70)"
            />
            {/* Prefer not to say segment */}
            <circle
              cx="70"
              cy="70"
              r="55"
              fill="none"
              stroke="#C8E6C9"
              strokeWidth="20"
              strokeDasharray={`${1 * 3.456} ${100 * 3.456}`}
              strokeDashoffset={`-${99 * 3.456}`}
              transform="rotate(-90 70 70)"
            />
            {/* Other segment - smallest */}
            <circle
              cx="70"
              cy="70"
              r="55"
              fill="none"
              stroke="#2E7D32"
              strokeWidth="20"
              strokeDasharray={`${3 * 3.456} ${100 * 3.456}`}
              strokeDashoffset={`-${100 * 3.456}`}
              transform="rotate(-90 70 70)"
            />
          </svg>
        </div>
        <div className="legend">
          {demographics.map((demographic, index) => (
            <div key={index} className="legend-item">
              <div 
                className="legend-color" 
                style={{ backgroundColor: demographic.color }}
              ></div>
              <span className="legend-label">{demographic.name}</span>
              <span className="legend-percentage">{demographic.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthCategoryDistribution;
