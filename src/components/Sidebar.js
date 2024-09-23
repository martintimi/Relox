import React from "react";
import { Link } from "react-router-dom";
import { FiHome, FiFileText, FiUserPlus } from 'react-icons/fi';


const Sidebar = () => {
  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-gray-900 text-white flex flex-col">
      <div className="h-16 flex items-center justify-center">
        <h1 className="text-xl font-bold">Windmill</h1>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-2">
        <Link to="/" className="flex items-center px-4 py-2 text-gray-200 hover:bg-gray-700">
          <FiHome className="mr-3" />
          Dashboard
        </Link>
        <Link to="/forms" className="flex items-center px-4 py-2 text-gray-200 hover:bg-gray-700">
          <FiFileText className="mr-3" />
          Forms
        </Link>
        <Link to="/pages" className="flex items-center px-4 py-2 text-gray-200 hover:bg-gray-700">
          <FiFileText className="mr-3" />
          Pages
        </Link>
      </nav>

      <div className="px-4 py-4">
        <Link to="/signup" className="flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500">
          <FiUserPlus className="mr-2" />
          Create account
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
