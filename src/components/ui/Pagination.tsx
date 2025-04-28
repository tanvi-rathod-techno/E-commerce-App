type PaginationProps = {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
  }
  
  export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
  }: PaginationProps) {
    return (
      <div className="flex justify-center items-center gap-2 mt-6">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded hover:bg-gray-100 disabled:opacity-50"
        >
          Previous
        </button>
  
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => onPageChange(index + 1)}
            className={`px-4 py-2 border rounded ${
              currentPage === index + 1
                ? 'bg-pink-600 text-white'
                : 'hover:bg-gray-100'
            }`}
          >
            {index + 1}
          </button>
        ))}
  
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded hover:bg-gray-100 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    )
  }
  