
'use client'

import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { getUserGrowthData } from '../../../api/statistics';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: false
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: '#ffffff',
      bodyColor: '#ffffff',
      borderColor: '#22c55e',
      borderWidth: 1,
      cornerRadius: 8,
      displayColors: true,
      callbacks: {
        title: function(context) {
          return `Month: ${context[0].label}`;
        },
        label: function(context) {
          return `New Users: ${context.parsed.y}`;
        }
      }
    }
  },
  scales: {
    x: {
      display: true,
      title: {
        display: false
      },
      grid: {
        display: false
      },
      ticks: {
        font: {
          size: 12,
          weight: '500'
        },
        color: '#6B7280'
      }
    },
    y: {
      display: true,
      title: {
        display: false
      },
      grid: {
        color: 'rgba(0, 0, 0, 0.1)',
        drawBorder: false,
        lineWidth: 1
      },
      ticks: {
        font: {
          size: 12,
          weight: '500'
        },
        color: '#6B7280',
        beginAtZero: true,
        precision: 0,
        stepSize: 20
      }
    }
  }
};

export default function StatisticsChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "New Users",
        data: [],
        borderColor: "#22c55e",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#22c55e",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        borderWidth: 3,
      },
    ],
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const growthData = await getUserGrowthData();
        
        // Check if we have valid data
        if (!growthData || !growthData.labels || !growthData.data) {
          throw new Error('Invalid data received from API');
        }
        
        // Always show all 12 months for continuous line chart
        setChartData({
          labels: growthData.labels,
          datasets: [
            {
              label: "New Users",
              data: growthData.data,
              borderColor: "#22c55e",
              backgroundColor: "rgba(34, 197, 94, 0.1)",
              fill: true,
              tension: 0.4,
              pointBackgroundColor: "#22c55e",
              pointBorderColor: "#ffffff",
              pointBorderWidth: 2,
              pointRadius: 5,
              pointHoverRadius: 7,
              borderWidth: 3,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching chart data:', error);
        setError(error.message);
        
        // Set fallback data
        setChartData({
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [
            {
              label: "New Users",
              data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              borderColor: "#22c55e",
              backgroundColor: "rgba(34, 197, 94, 0.1)",
              fill: true,
              tension: 0.4,
              pointBackgroundColor: "#22c55e",
              pointBorderColor: "#ffffff",
              pointBorderWidth: 2,
              pointRadius: 5,
              pointHoverRadius: 7,
              borderWidth: 3,
            },
          ],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        <span className="ml-3 text-gray-600">Loading chart data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-red-500 text-lg mb-2">⚠️</div>
          <p className="text-red-600 font-medium">Failed to load chart data</p>
          <p className="text-gray-500 text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-64">
      <Line options={options} data={chartData} />
    </div>
  );
}
