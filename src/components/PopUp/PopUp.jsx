import React from 'react';
import { MdClose } from 'react-icons/md'; // استيراد أيقونة القفل من react-icons

export default function PopUp({ children, ShowForm, closeForm }) {
  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      closeForm(); 
    }
  };

  return (
    <>
      {/* النافذة المنبثقة */}
      {ShowForm && (
        <div

          className="fixed inset-0 flex  justify-center items-center bg-black bg-opacity-50 z-50"
          onClick={handleOutsideClick} 
        >
          <div className="bg-white max-h-screen overflow-y-auto p-12 rounded-lg shadow-lg w-1/2 relative">
            <button
              onClick={closeForm}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              <MdClose className="text-4xl text-red-500" />
            </button>

            <div>{children}</div>
          </div>
        </div>
      )}
    </>
  );
}
