'use client'

import { useState } from 'react'

interface ReviewFormProps {
  agentId: string
  onSubmit: (review: {
    rating: number
    title: string
    content: string
  }) => Promise<void>
  onCancel?: () => void
}

export default function ReviewForm({ agentId, onSubmit, onCancel }: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
    if (rating === 0) {
      setError('Please select a rating')
      return
    }
    
    if (!title.trim()) {
      setError('Please enter a title for your review')
      return
    }
    
    if (!content.trim()) {
      setError('Please enter your review')
      return
    }
    
    try {
      setIsSubmitting(true)
      setError(null)
      
      await onSubmit({
        rating,
        title,
        content,
      })
      
      // Reset form after successful submission
      setRating(0)
      setTitle('')
      setContent('')
    } catch (err) {
      console.error(err)
      setError('Failed to submit review. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-100 dark:border-gray-700">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Write a Review</h2>
      
      {error && (
        <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 p-4 rounded-md">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Rating
          </label>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="text-2xl focus:outline-none"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
              >
                <span className={`${
                  (hoverRating || rating) >= star
                    ? 'text-yellow-400'
                    : 'text-gray-300 dark:text-gray-600'
                }`}>
                  ★
                </span>
              </button>
            ))}
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
              {rating > 0 ? `${rating} star${rating !== 1 ? 's' : ''}` : 'Select a rating'}
            </span>
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="review-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Title
          </label>
          <input
            id="review-title"
            type="text"
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 py-2 px-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            placeholder="Summarize your experience"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100}
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="review-content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Review
          </label>
          <textarea
            id="review-content"
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 py-2 px-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 min-h-[150px]"
            placeholder="Share your experience with this agent"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={2000}
          />
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {2000 - content.length} characters remaining
          </p>
        </div>
        
        <div className="flex justify-end space-x-4">
          {onCancel && (
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          )}
          
          <button
            type="submit"
            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </div>
      </form>
    </div>
  )
}
