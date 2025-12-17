import { motion } from 'framer-motion'
import { BookOpen, FileText, Video, Headphones, ExternalLink } from 'lucide-react'

const Resources = () => {
  const resources = [
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

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] mb-2">
          Resources
        </h1>
        <p className="text-[#92c9a4] text-base font-normal leading-normal">
          Explore helpful resources to support your wellbeing journey
        </p>
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
              className="bg-[#112217] rounded-lg p-6 border border-white/10"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-[#23482f] rounded-lg">
                  <Icon className="text-primary" size={24} />
                </div>
                <h2 className="text-white text-2xl font-bold">{category.category}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.items.map((item, itemIndex) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: categoryIndex * 0.1 + itemIndex * 0.05 }}
                    className="p-4 bg-[#1A2D22] rounded-lg border border-white/5 hover:border-white/20 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-white font-semibold group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <ExternalLink className="text-white/40 group-hover:text-primary transition-colors shrink-0 ml-2" size={16} />
                    </div>
                    <p className="text-[#92c9a4] text-sm">{item.description}</p>
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

