import React from 'react';
interface Props {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}
const Pagination: React.FC<Props> = ({ currentPage, totalPages, onPageChange }) => {
    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxPagesToShow = 3; // Số lượng trang hiển thị trực tiếp

        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
            const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

            if (startPage > 1) {
                pageNumbers.push(1);
                if (startPage > 2) {
                    pageNumbers.push('...');
                }
            }

            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }

            if (endPage < totalPages) {
                if (endPage < totalPages - 1) {
                    pageNumbers.push('...');
                }
                pageNumbers.push(totalPages);
            }
        }

        return pageNumbers.map((pageNumber, index) => (
            <button
                key={index}
                onClick={() => {
                    if (typeof pageNumber === 'number') {
                        onPageChange(pageNumber);
                    }
                }}
                className={`inline-flex w-11 h-11 items-center justify-center rounded-full ${typeof pageNumber === 'number'
                    ? currentPage === pageNumber
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white'
                    : 'text-gray-600'
                    }`}
            >
                {pageNumber}
            </button>
        ));
    };

    return (
        <nav className="flex justify-center">
            <div className="flex space-x-2">
                {renderPageNumbers()}
            </div>
        </nav>
    );
}

export default Pagination;
