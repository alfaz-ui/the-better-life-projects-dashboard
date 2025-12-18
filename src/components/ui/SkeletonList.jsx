const SkeletonList = ({ count = 3 }) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#1A2D22] rounded-lg animate-pulse"
        >
          <div className="flex-1">
            <div className="h-4 w-32 bg-green-100 dark:bg-[#23482f] rounded mb-2"></div>
            <div className="h-3 w-24 bg-green-100 dark:bg-[#23482f] rounded"></div>
          </div>
          <div className="h-6 w-12 bg-green-100 dark:bg-[#23482f] rounded"></div>
        </div>
      ))}
    </div>
  )
}

export default SkeletonList


