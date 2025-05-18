'use client'

import { useState, useEffect } from 'react'

interface TagFilterProps {
  tags: string[]
  selectedTags: string[]
  onChange: (tags: string[]) => void
}

export default function TagFilter({ tags, selectedTags, onChange }: TagFilterProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [visibleTags, setVisibleTags] = useState<string[]>(tags)

  useEffect(() => {
    if (searchTerm) {
      setVisibleTags(tags.filter(tag => 
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      ))
    } else {
      setVisibleTags(tags)
    }
  }, [searchTerm, tags])

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onChange(selectedTags.filter(t => t !== tag))
    } else {
      onChange([...selectedTags, tag])
    }
  }

  return (
    <div className="space-y-3">
      <div className="relative">
        <input
          type="text"
          placeholder="Search tags..."
          className="w-full rounded-md border border-gray-300 dark:border-gray-700 py-2 pl-8 pr-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <svg 
          className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
          />
        </svg>
      </div>

      <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-1">
        {visibleTags.length > 0 ? (
          visibleTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`text-sm px-3 py-1 rounded-full transition-colors ${
                selectedTags.includes(tag)
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {tag}
            </button>
          ))
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400 w-full text-center py-2">
            No tags found
          </p>
        )}
      </div>
    </div>
  )
}
