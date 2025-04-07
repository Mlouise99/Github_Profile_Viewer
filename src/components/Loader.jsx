import React from 'react';

function Loader() {
  return (
    <div className="flex justify-center items-center mt-6">
      <div className="w-16 h-16 border-4 border-t-4 border-indigo-600 border-solid rounded-full animate-spin"></div>
    </div>
  );
}

export default Loader;
