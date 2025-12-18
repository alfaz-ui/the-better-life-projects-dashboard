const SkeletonCard = () => {
  return (
    <div className="bg-white dark:bg-[#112217] rounded-lg p-6 border border-gray-200 dark:border-white/10 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-green-100 dark:bg-[#23482f] rounded-lg w-12 h-12"></div>
        <div className="h-8 w-16 bg-green-100 dark:bg-[#23482f] rounded"></div>
      </div>
      <div className="h-5 w-24 bg-green-100 dark:bg-[#23482f] rounded mb-2"></div>
      <div className="h-4 w-32 bg-green-100 dark:bg-[#23482f] rounded"></div>
    </div>
  )
}

export default SkeletonCard


