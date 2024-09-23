import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { UsersIcon, CashIcon, ShoppingCartIcon, PhoneIcon } from '@heroicons/react/solid';
import ClientTable from './ClientTable';

const Dashboard = () => {
  const pieChartRef = useRef(null);
  const lineChartRef = useRef(null);
  const [isDark, setIsDark] = useState(false); 

  // Define cardData with actual SVG icons
  const cardData = [
    { title: 'Total clients', value: '6389', color: 'orange', icon: <UsersIcon className="w-6 h-6" /> },
    { title: 'Account balance', value: '$46,760.89', color: 'green', icon: <CashIcon className="w-6 h-6" /> },
    { title: 'New sales', value: '376', color: 'blue', icon: <ShoppingCartIcon className="w-6 h-6" /> },
    { title: 'Pending contacts', value: '35', color: 'teal', icon: <PhoneIcon className="w-6 h-6" /> },
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      orange: 'text-orange-500 bg-orange-100 dark:text-orange-100 dark:bg-orange-500',
      green: 'text-green-500 bg-green-100 dark:text-green-100 dark:bg-green-500',
      blue: 'text-blue-500 bg-blue-100 dark:text-blue-100 dark:bg-blue-500',
      teal: 'text-teal-500 bg-teal-100 dark:text-teal-100 dark:bg-teal-500',
    };
    return colorMap[color] || '';
  };

  useEffect(() => {
    // Initialize Pie Chart for Revenue
    const pieCtx = document.getElementById('pie').getContext('2d');
    if (pieChartRef.current) {
      pieChartRef.current.destroy(); // Destroy previous instance if exists
    }
    pieChartRef.current = new Chart(pieCtx, {
      type: 'pie',
      data: {
        labels: ['Null', 'Null', 'Null'],
        datasets: [
          {
            data: [300, 150, 200],
            backgroundColor: ['#4299E1', '#2C7A7B', '#9F7AEA'],
            hoverBackgroundColor: ['#63B3ED', '#38B2AC', '#B794F4'],
          },
        ],
      },
    });

    // Initialize Line Chart for Traffic
    const lineCtx = document.getElementById('line').getContext('2d');
    if (lineChartRef.current) {
      lineChartRef.current.destroy(); // Destroy previous instance if exists
    }
    lineChartRef.current = new Chart(lineCtx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'],
        datasets: [
          {
            label: 'Organic',
            data: [65, 59, 80, 81, 56, 55, 40],
            borderColor: '#2C7A7B',
            fill: false,
          },
          {
            label: 'Paid',
            data: [28, 48, 40, 19, 86, 27, 90],
            borderColor: '#9F7AEA',
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Cleanup: destroy charts when the component unmounts or before re-render
    return () => {
      if (pieChartRef.current) {
        pieChartRef.current.destroy();
      }
      if (lineChartRef.current) {
        lineChartRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className={`flex flex-col flex-1 w-full ${isDark ? 'dark' : ''}`}>
      <main className="h-full overflow-y-auto bg-gray-900"> {/* Full background color applied */}
        <div className="container px-6 mx-auto grid">
          <h2 className="my-6 text-2xl font-semibold text-gray-200"> {/* Text color fixed */}
            Dashboard
          </h2>
          
          {/* CTA */}
          <a
            className="flex items-center justify-between p-4 mb-8 text-sm font-semibold text-purple-100 bg-purple-600 rounded-lg shadow-md focus:outline-none focus:shadow-outline-purple"
            href="#"
          >
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                ></path>
              </svg>
              <span>Star this project on GitHub</span>
            </div>
            <span>View more →</span>
          </a>

          {/* Cards */}
          <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
            {cardData.map((card, index) => (
              <div key={index} className="flex items-center p-4 bg-gray-800 rounded-lg shadow-xs dark:bg-gray-800"> {/* Fixed background to dark */}
                <div className={`p-3 mr-4 rounded-full ${getColorClasses(card.color)}`}>
                  {card.icon}
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium text-gray-400">{card.title}</p>
                  <p className="text-lg font-semibold text-gray-200">{card.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid gap-6 mb-8 md:grid-cols-2">
            <div className="min-w-0 p-4 rounded-lg shadow-xs dark:bg-gray-800">
              <h4 className="mb-4 font-semibold text-gray-300">Revenue</h4>
              <canvas id="pie"></canvas>
            </div>
            <div className="min-w-0 p-4 bg-gray-800 rounded-lg shadow-xs dark:bg-gray-800"> {/* Fixed background */}
              <h4 className="mb-4 font-semibold text-gray-300">Traffic</h4>
              <canvas id="line"></canvas>
            </div>
          </div>

          {/* Client Table */}
          <ClientTable />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
