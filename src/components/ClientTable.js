import React, { useState } from 'react';

const ClientTable = ({ data = [] }) => {
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 20;

  // Logic to calculate the rows for the current page
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  // Change page function
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(data.length / rowsPerPage);

  return (
    <div className="w-full overflow-hidden rounded-lg shadow-xs">
  <div className="w-full overflow-hidden rounded-lg shadow-xs">
      <div className="w-full overflow-x-auto">
        <table className="w-full whitespace-no-wrap">
          <thead>
            <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
            {/* Table Rows */}
            {currentRows.map((item, index) => (
              <tr key={index} className="text-gray-700 dark:text-gray-400">
                <td className="px-4 py-3">
                  <div className="flex items-center text-sm">
                    <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                      <img
                        className="object-cover w-full h-full rounded-full"
                        src={item.image}
                        alt=""
                        loading="lazy"
                      />
                      <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                    </div>
                    <div>
                      <p className="font-semibold">{item.client}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{item.title}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm">{item.amount}</td>
                <td className="px-4 py-3 text-xs">
                  <span className={`px-2 py-1 font-semibold leading-tight ${
                    item.status === 'Approved'
                      ? 'text-green-700 bg-green-100 dark:bg-green-700 dark:text-green-100'
                      : 'text-red-700 bg-red-100 dark:bg-red-700 dark:text-red-100'
                  } rounded-full`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
        <span className="flex items-center col-span-3">
          Showing {indexOfFirstRow + 1}-{indexOfLastRow} of {data.length}
        </span>
        <span className="col-span-2"></span>
        <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
          <nav aria-label="Table navigation">
            <ul className="inline-flex items-center">
              <li>
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                  aria-label="Previous"
                >
                  <svg className="w-4 h-4 fill-current" aria-hidden="true" viewBox="0 0 20 20">
                    <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" />
                  </svg>
                </button>
              </li>
              {[...Array(totalPages).keys()].map(number => (
                <li key={number}>
                  <button
                    onClick={() => paginate(number + 1)}
                    className={`px-3 py-1 rounded-md focus:outline-none ${
                      currentPage === number + 1
                        ? 'text-white bg-purple-600 border border-purple-600'
                        : 'focus:shadow-outline-purple'
                    }`}
                  >
                    {number + 1}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                  aria-label="Next"
                >
                  <svg className="w-4 h-4 fill-current" aria-hidden="true" viewBox="0 0 20 20">
                    <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
                  </svg>
                </button>
              </li>
            </ul>
          </nav>
        </span>
      </div>
    </div>

    </div>
  );
};

export default ClientTable;

// Example usage (should be in a different file):
// const data = [
//   {
//     client: 'Hans Burger',
//     title: '10x Developer',
//     amount: '$863.45',
//     status: 'Approved',
//     date: '6/10/2020',
//     image: 'https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f'
//   },
//   // Additional rows...
// ];
// 
// <ClientTable data={data} />