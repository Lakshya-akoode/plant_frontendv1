import { useState, useEffect } from 'react';
import { getPlantTypePercentages } from '../../../api/statistics';

const TopRecommendedPlants = () => {
  const [plants, setPlants] = useState([
    { name: "Cannabis", value: 0, percentage: "0%", color: "#70d870" },
    { name: "Vegetables", value: 0, percentage: "0%", color: "#65a30d" },
    { name: "Fruits", value: 0, percentage: "0%", color: "#84cc16" },
    { name: "Herbs", value: 0, percentage: "0%", color: "#a3e635" },
    { name: "Flowers", value: 0, percentage: "0%", color: "#38a846" },
    { name: "Other", value: 0, percentage: "0%", color: "#4d7c0f" }
  ]);

  useEffect(() => {
    const fetchPlantData = async () => {
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

        const url = process.env.NEXT_PUBLIC_ADMIN_API_URL + "api/dashboard/plant-types-percentage";

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Plant types API error response:", errorText);
          return;
        }

        const data = await response.json();
        
        if (data.success && data.data) {
          const plantTypes = data.data;
          const updatedPlants = [
            { name: "Cannabis", value: Math.round(plantTypes.Cannabis || 0), percentage: `${Math.round(plantTypes.Cannabis || 0)}%`, color: "#70d870" },
            { name: "Vegetables", value: Math.round(plantTypes.Vegetables || 0), percentage: `${Math.round(plantTypes.Vegetables || 0)}%`, color: "#65a30d" },
            { name: "Fruits", value: Math.round(plantTypes.Fruits || 0), percentage: `${Math.round(plantTypes.Fruits || 0)}%`, color: "#84cc16" },
            { name: "Herbs", value: Math.round(plantTypes.Herbs || 0), percentage: `${Math.round(plantTypes.Herbs || 0)}%`, color: "#a3e635" },
            { name: "Flowers", value: Math.round(plantTypes.Flowers || 0), percentage: `${Math.round(plantTypes.Flowers || 0)}%`, color: "#38a846" },
            { name: "Other", value: Math.round(plantTypes.Other || 0), percentage: `${Math.round(plantTypes.Other || 0)}%`, color: "#4d7c0f" }
          ];
          setPlants(updatedPlants);
        }
      } catch (error) {
        console.error('Error fetching plant data:', error);
      }
    };

    fetchPlantData();
  }, []);

  return (
    <div className="top-recommended-plants">
      <div className="chart-container">
        {plants.map((plant, index) => (
          <div key={index} className="plant-bar-row">
            <span className="plant-name">{plant.name}</span>
            <div className="bar-wrapper">
              <div className="bar-container">
                <div 
                  className="bar" 
                  style={{ 
                    width: `${Math.min(plant.value * 15, 100)}%`,
                    backgroundColor: plant.color
                  }}
                ></div>
              </div>
              <span className="plant-percentage">{plant.percentage}</span>
            </div>
          </div>
        ))}
      </div>
      {/* <div className="chart-footer">
        <div className="month-labels">
          <span>Jan</span>
          <span>Muy</span>
          <span>Mun</span>
          <span>Aug</span>
        </div>
      </div> */}
    </div>
  );
};

export default TopRecommendedPlants;
