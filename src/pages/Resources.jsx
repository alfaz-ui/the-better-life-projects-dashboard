import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, FileText, Video, Headphones, ExternalLink } from 'lucide-react'
import ResourcesIllustration from '../components/illustrations/ResourcesIllustration'
import SearchBar from '../components/ui/SearchBar'

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState('')
  
  const allResources = [
    {
      category: 'Articles',
      icon: FileText,
      items: [
        { title: 'Understanding Wellbeing', description: 'Learn about the fundamentals of wellbeing' },
        { title: 'Building Resilience', description: 'Strategies for developing personal resilience' },
        { title: 'Mindfulness Practices', description: 'Introduction to mindfulness and meditation' },
      ],
    },
    {
      category: 'Videos',
      icon: Video,
      items: [
        { title: 'Wellbeing Workshop Series', description: 'Comprehensive video series on wellbeing' },
        { title: 'Stress Management Techniques', description: 'Practical techniques for managing stress' },
        { title: 'Building Healthy Relationships', description: 'Tips for improving relational wellbeing' },
      ],
    },
    {
      category: 'Audio',
      icon: Headphones,
      items: [
        { title: 'Guided Meditation', description: 'Relaxing meditation sessions' },
        { title: 'Wellbeing Podcast', description: 'Weekly podcast on wellbeing topics' },
        { title: 'Sleep Stories', description: 'Stories to help you relax and sleep' },
      ],
    },
  ]

  const filteredResources = useMemo(() => {
    if (!searchQuery) return allResources
    
    const query = searchQuery.toLowerCase()
    return allResources.map((category) => ({
      ...category,
      items: category.items.filter((item) => {
        return (
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          category.category.toLowerCase().includes(query)
        )
      })
    })).filter((category) => category.items.length > 0)
  }, [allResources, searchQuery])

  const resources = filteredResources

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] mb-2">
            Resources
          </h1>
          <p className="text-gray-600 dark:text-[#92c9a4] text-base font-normal leading-normal">
            Explore helpful resources to support your wellbeing journey
          </p>
        </div>
        <div className="hidden md:block w-48 h-32 opacity-60">
          <ResourcesIllustration className="w-full h-full" />
        </div>
      </div>

      <div className="mb-6">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search resources by title, description, or category..."
        />
      </div>

      <div className="space-y-8">
        {resources.map((category, categoryIndex) => {
          const Icon = category.icon
          return (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
              whileHover={{ y: -2 }}
              className="bg-white dark:bg-[#112217] rounded-lg p-6 border border-gray-200 dark:border-white/10 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-[#23482f] rounded-lg">
                  <Icon className="text-primary" size={24} />
                </div>
                <h2 className="text-gray-900 dark:text-white text-2xl font-bold">{category.category}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.items.map((item, itemIndex) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: categoryIndex * 0.1 + itemIndex * 0.05 }}
                    className="p-4 bg-gray-50 dark:bg-[#1A2D22] rounded-lg border border-gray-200 dark:border-white/5 hover:border-primary/30 hover:bg-green-50 dark:hover:bg-[#23482f] hover:shadow-md hover:shadow-primary/10 transition-all duration-200 cursor-pointer group relative overflow-hidden"
                  >
                    {/* Small illustration in corner */}
                    <div className="absolute top-2 right-2 w-16 h-16 opacity-20 group-hover:opacity-30 transition-opacity">
                      <ResourcesIllustration className="w-full h-full" />
                    </div>
                    <div className="flex items-start justify-between mb-2 relative z-10">
                      <h3 className="text-gray-900 dark:text-white font-semibold group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <ExternalLink className="text-gray-400 dark:text-white/40 group-hover:text-primary transition-colors shrink-0 ml-2" size={16} />
                    </div>
                    <p className="text-gray-600 dark:text-[#92c9a4] text-sm relative z-10">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default Resources

