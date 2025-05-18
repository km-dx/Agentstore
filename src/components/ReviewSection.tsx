'use client'

import { useState } from 'react'
import Image from 'next/image'

interface Review {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  rating: number
  title: string
  content: string
  createdAt: Date
  updatedAt?: Date
  helpful: number
  notHelpful: number
}

interface ReviewSectionProps {
  agentId: string
  reviews: Review[]
  onAddReview?: () => void
}

export default function ReviewSection({ agentId, reviews, onAddReview }: ReviewSectionProps) {
  const [sortBy, setSortBy] = useState<'newest' | 'highest' | 'lowest' | 'helpful'>('newest')
  const [expandedReviews, setExpandedReviews] = useState<Set<string>>(new Set())

  const toggleReviewExpansion = (reviewId: string) => {
    const newExpanded = new Set(expandedReviews)
    if (newExpanded.has(reviewId)) {
      newExpanded.delete(reviewId)
    } else {
      newExpanded.add(reviewId)
    }
    setExpandedReviews(newExpanded)
  }

  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return b.createdAt.getTime() - a.createdAt.getTime()
      case 'highest':
        return b.rating - a.rating
      case 'lowest':
        return a.rating - b.rating
      case 'helpful':
        return b.helpful - a.helpful
      default:
        return 0
    }
  })

  return (
    <div className="mt-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Reviews ({reviews.length})
        </h2>
        
        <div className="flex items-center mt-4 md:mt-0">
          <label htmlFor="sort-reviews" className="mr-2 text-sm text-gray-600 dark:text-gray-300">
            Sort by:
          </label>
          <select
            id="sort-reviews"
            className="rounded-md border border-gray-300 dark:border-gray-700 py-1 px-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
          >
            <option value="newest">Newest</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
            <option value="helpful">Most Helpful</option>
          </select>
        </div>
      </div>

      {reviews.length > 0 ? (
        <div className="space-y-6">
          {sortedReviews.map((review) => (
            <div key={review.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-100 dark:border-gray-700">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  {review.userAvatar ? (
                    <div className="relative h-12 w-12 rounded-full overflow-hidden">
                      <Image
                        src={review.userAvatar}
                        alt={review.userName}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <span className="text-lg font-bold text-gray-500 dark:text-gray-400">
                        {review.userName.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="flex-grow">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {review.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        By {review.userName} • {review.createdAt.toLocaleDateString()}
                      </p>
                    </div>
                    
                    <div className="flex mt-2 sm:mt-0">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${
                            i < review.rating
                              ? 'text-yellow-400'
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <p className={`text-gray-700 dark:text-gray-300 ${
                      !expandedReviews.has(review.id) && review.content.length > 300 
                        ? 'line-clamp-3' 
                        : ''
                    }`}>
                      {review.content}
                    </p>
                    
                    {review.content.length > 300 && (
                      <button
                        onClick={() => toggleReviewExpansion(review.id)}
                        className="mt-2 text-primary-600 hover:text-primary-800 text-sm font-medium"
                      >
                        {expandedReviews.has(review.id) ? 'Show less' : 'Read more'}
                      </button>
                    )}
                  </div>
                  
                  <div className="mt-4 flex items-center text-sm">
                    <button className="flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                      </svg>
                      Helpful ({review.helpful})
                    </button>
                    
                    <button className="flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 ml-4">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                      </svg>
                      Not Helpful ({review.notHelpful})
                    </button>
                    
                    <button className="flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 ml-4">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                      </svg>
                      Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">No reviews yet</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Be the first to review this agent and help others make informed decisions.
          </p>
        </div>
      )}
      
      <div className="mt-8">
        <button
          onClick={onAddReview}
          className="w-full md:w-auto bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded-md flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Write a Review
        </button>
      </div>
    </div>
  )
}
