'use client'

import { useState } from 'react'
import Image from 'next/image'

interface AgentSubmissionFormProps {
  onSubmit: (data: AgentSubmissionData) => Promise<void>
  onCancel?: () => void
}

export interface AgentSubmissionData {
  name: string
  description: string
  shortDescription: string
  logoUrl?: string
  websiteUrl: string
  pricing: {
    type: 'free' | 'freemium' | 'paid' | 'subscription' | 'contact'
    startingPrice?: number
    currency?: string
    pricingUrl?: string
  }
  categories: string[]
  tags: string[]
  features: string[]
  industries?: string[]
  platforms?: string[]
  integrations?: string[]
  languages?: string[]
}

export default function AgentSubmissionForm({ onSubmit, onCancel }: AgentSubmissionFormProps) {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  
  // Form state
  const [formData, setFormData] = useState<AgentSubmissionData>({
    name: '',
    description: '',
    shortDescription: '',
    websiteUrl: '',
    pricing: {
      type: 'free',
    },
    categories: [],
    tags: [],
    features: [],
    industries: [],
    platforms: [],
    integrations: [],
    languages: [],
  })

  // Available options for select fields
  const categoryOptions = [
    'Productivity', 'Writing', 'Research', 'Data Analysis', 'Design', 
    'Development', 'Marketing', 'Customer Service', 'Education', 'Finance',
    'Healthcare', 'Legal', 'Sales', 'HR', 'Other'
  ]
  
  const industryOptions = [
    'Technology', 'Education', 'Marketing', 'Research', 'Healthcare',
    'Finance', 'Legal', 'Retail', 'Manufacturing', 'Media', 'Entertainment',
    'Real Estate', 'Transportation', 'Agriculture', 'Energy', 'Other'
  ]
  
  const platformOptions = [
    'Web', 'Mobile', 'Desktop', 'API', 'Chrome Extension', 'Slack',
    'Discord', 'Telegram', 'WhatsApp', 'Microsoft Teams', 'Other'
  ]
  
  const languageOptions = [
    'English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese',
    'Korean', 'Russian', 'Portuguese', 'Italian', 'Dutch', 'Arabic',
    'Hindi', 'Other'
  ]

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      
      if (parent === 'pricing') {
        setFormData({
          ...formData,
          pricing: {
            ...formData.pricing,
            [child]: value,
          },
        })
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }
  
  // Handle checkbox changes for multi-select fields
  const handleCheckboxChange = (field: keyof AgentSubmissionData, value: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        [field]: [...(formData[field] as string[]), value],
      })
    } else {
      setFormData({
        ...formData,
        [field]: (formData[field] as string[]).filter(item => item !== value),
      })
    }
  }
  
  // Handle array field additions (for features, tags, etc.)
  const handleArrayFieldAdd = (field: keyof AgentSubmissionData, value: string) => {
    if (!value.trim()) return
    
    if (!(formData[field] as string[]).includes(value)) {
      setFormData({
        ...formData,
        [field]: [...(formData[field] as string[]), value],
      })
    }
    
    // Clear the input field
    const input = document.getElementById(`${field}-input`) as HTMLInputElement
    if (input) input.value = ''
  }
  
  // Handle array field removals
  const handleArrayFieldRemove = (field: keyof AgentSubmissionData, value: string) => {
    setFormData({
      ...formData,
      [field]: (formData[field] as string[]).filter(item => item !== value),
    })
  }
  
  // Handle logo upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError('Logo image must be less than 2MB')
      return
    }
    
    // Check file type
    if (!['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type)) {
      setError('Logo must be a JPG, PNG, GIF, or WebP image')
      return
    }
    
    // Create a preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setLogoPreview(e.target?.result as string)
      // In a real app, you would upload the file to a storage service
      // and set the URL in formData
      setFormData({
        ...formData,
        logoUrl: 'https://via.placeholder.com/150', // Placeholder for demo
      })
    }
    reader.readAsDataURL(file)
  }
  
  // Validate the current step
  const validateStep = () => {
    switch (step) {
      case 1:
        if (!formData.name.trim()) {
          setError('Agent name is required')
          return false
        }
        if (!formData.shortDescription.trim()) {
          setError('Short description is required')
          return false
        }
        if (!formData.description.trim()) {
          setError('Description is required')
          return false
        }
        if (!formData.websiteUrl.trim()) {
          setError('Website URL is required')
          return false
        }
        break
      case 2:
        if (formData.categories.length === 0) {
          setError('At least one category is required')
          return false
        }
        if (formData.features.length === 0) {
          setError('At least one feature is required')
          return false
        }
        break
      case 3:
        // No required fields in step 3
        break
    }
    
    setError(null)
    return true
  }
  
  // Handle next step
  const handleNextStep = () => {
    if (validateStep()) {
      setStep(step + 1)
    }
  }
  
  // Handle previous step
  const handlePrevStep = () => {
    setStep(step - 1)
  }
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateStep()) {
      return
    }
    
    try {
      setIsSubmitting(true)
      setError(null)
      
      await onSubmit(formData)
      
      // Reset form after successful submission
      setFormData({
        name: '',
        description: '',
        shortDescription: '',
        websiteUrl: '',
        pricing: {
          type: 'free',
        },
        categories: [],
        tags: [],
        features: [],
        industries: [],
        platforms: [],
        integrations: [],
        languages: [],
      })
      setLogoPreview(null)
      setStep(1)
    } catch (err) {
      console.error(err)
      setError('Failed to submit agent. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Render step progress indicator
  const renderStepIndicator = () => (
    <div className="mb-6">
      <div className="flex items-center">
        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
          step >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
        }`}>
          1
        </div>
        <div className={`flex-1 h-1 mx-2 ${
          step >= 2 ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
        }`}></div>
        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
          step >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
        }`}>
          2
        </div>
        <div className={`flex-1 h-1 mx-2 ${
          step >= 3 ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
        }`}></div>
        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
          step >= 3 ? 'bg-primary-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
        }`}>
          3
        </div>
      </div>
      <div className="flex justify-between mt-2 text-sm">
        <span className={step === 1 ? 'font-medium text-primary-600' : 'text-gray-500 dark:text-gray-400'}>Basic Info</span>
        <span className={step === 2 ? 'font-medium text-primary-600' : 'text-gray-500 dark:text-gray-400'}>Categories & Features</span>
        <span className={step === 3 ? 'font-medium text-primary-600' : 'text-gray-500 dark:text-gray-400'}>Additional Details</span>
      </div>
    </div>
  )

  // Render form navigation buttons
  const renderFormNavigation = () => (
    <div className="flex justify-between mt-8">
      {step > 1 ? (
        <button
          type="button"
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          onClick={handlePrevStep}
          disabled={isSubmitting}
        >
          Previous
        </button>
      ) : (
        <div></div>
      )}
      
      {step < 3 ? (
        <button
          type="button"
          className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleNextStep}
          disabled={isSubmitting}
        >
          Next
        </button>
      ) : (
        <button
          type="submit"
          className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Agent'}
        </button>
      )}
    </div>
  )

  // Render basic information form (step 1)
  const renderBasicInfoForm = () => (
    <div>
      <div className="mb-6">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Agent Name *
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className="w-full rounded-md border border-gray-300 dark:border-gray-700 py-2 px-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          placeholder="e.g., AI Assistant Pro"
          value={formData.name}
          onChange={handleChange}
          maxLength={100}
          required
        />
      </div>
      
      <div className="mb-6">
        <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Short Description *
        </label>
        <input
          id="shortDescription"
          name="shortDescription"
          type="text"
          className="w-full rounded-md border border-gray-300 dark:border-gray-700 py-2 px-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          placeholder="A brief one-line description (max 100 characters)"
          value={formData.shortDescription}
          onChange={handleChange}
          maxLength={100}
          required
        />
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {100 - formData.shortDescription.length} characters remaining
        </p>
      </div>
      
      <div className="mb-6">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Full Description *
        </label>
        <textarea
          id="description"
          name="description"
          className="w-full rounded-md border border-gray-300 dark:border-gray-700 py-2 px-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 min-h-[150px]"
          placeholder="Provide a detailed description of your AI agent"
          value={formData.description}
          onChange={handleChange}
          maxLength={2000}
          required
        />
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {2000 - formData.description.length} characters remaining
        </p>
      </div>
      
      <div className="mb-6">
        <label htmlFor="websiteUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Website URL *
        </label>
        <input
          id="websiteUrl"
          name="websiteUrl"
          type="url"
          className="w-full rounded-md border border-gray-300 dark:border-gray-700 py-2 px-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          placeholder="https://example.com"
          value={formData.websiteUrl}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Logo
        </label>
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            {logoPreview ? (
              <div className="relative h-16 w-16 rounded-md overflow-hidden">
                <Image
                  src={logoPreview}
                  alt="Logo preview"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="h-16 w-16 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
          </div>
          
          <div className="flex-grow">
            <label className="block">
              <span className="sr-only">Choose logo file</span>
              <input 
                type="file" 
                className="block w-full text-sm text-gray-500 dark:text-gray-400
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-medium
                  file:bg-primary-50 file:text-primary-700
                  dark:file:bg-primary-900/20 dark:file:text-primary-300
                  hover:file:bg-primary-100 dark:hover:file:bg-primary-900/30"
                accept="image/jpeg,image/png,image/gif,image/webp"
                onChange={handleLogoUpload}
              />
            </label>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              JPG, PNG, GIF or WebP (max. 2MB)
            </p>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Pricing *
        </label>
        <select
          name="pricing.type"
          className="w-full rounded-md border border-gray-300 dark:border-gray-700 py-2 px-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 mb-3"
          value={formData.pricing.type}
          onChange={handleChange}
          required
        >
          <option value="free">Free</option>
          <option value="freemium">Freemium</option>
          <option value="paid">Paid (one-time)</option>
          <option value="subscription">Subscription</option>
          <option value="contact">Contact for pricing</option>
        </select>
        
        {(formData.pricing.type === 'paid' || formData.pricing.type === 'subscription') && (
          <div className="flex space-x-3 mb-3">
            <div className="flex-1">
              <label htmlFor="pricing.startingPrice" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Starting Price
              </label>
              <input
                id="pricing.startingPrice"
                name="pricing.startingPrice"
                type="number"
                min="0"
                step="0.01"
                className="w-full rounded-md border border-gray-300 dark:border-gray-700 py-2 px-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="0.00"
                value={formData.pricing.startingPrice || ''}
                onChange={handleChange}
              />
            </div>
            
            <div className="w-1/3">
              <label htmlFor="pricing.currency" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Currency
              </label>
              <input
                id="pricing.currency"
                name="pricing.currency"
                type="text"
                className="w-full rounded-md border border-gray-300 dark:border-gray-700 py-2 px-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="USD"
                value={formData.pricing.currency || ''}
                onChange={handleChange}
                maxLength={3}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )

  // Render categories and features form (step 2)
  const renderCategoriesAndFeaturesForm = () => (
    <div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Categories *
        </label>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          Select all categories that apply to your AI agent
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {categoryOptions.map((category) => (
            <label key={category} className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500"
                checked={formData.categories.includes(category)}
                onChange={(e) => handleCheckboxChange('categories', category, e.target.checked)}
              />
              <span className="text-gray-700 dark:text-gray-300">{category}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Features *
        </label>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          Add key features of your AI agent
        </p>
        <div className="flex">
          <input
            id="features-input"
            type="text"
            className="flex-grow rounded-l-md border border-gray-300 dark:border-gray-700 py-2 px-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            placeholder="e.g., Natural language understanding"
          />
          <button
            type="button"
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-r-md"
            onClick={() => {
              const input = document.getElementById('features-input') as HTMLInputElement
              handleArrayFieldAdd('features', input.value)
            }}
          >
            Add
          </button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {formData.features.map((feature) => (
            <div key={feature} className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full flex items-center">
              <span>{feature}</span>
              <button
                type="button"
                className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                onClick={() => handleArrayFieldRemove('features', feature)}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Tags
        </label>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          Add tags to help users find your AI agent
        </p>
        <div className="flex">
          <input
            id="tags-input"
            type="text"
            className="flex-grow rounded-l-md border border-gray-300 dark:border-gray-700 py-2 px-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            placeholder="e.g., GPT, Language Model"
          />
          <button
            type="button"
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-r-md"
            onClick={() => {
              const input = document.getElementById('tags-input') as HTMLInputElement
              handleArrayFieldAdd('tags', input.value)
            }}
          >
            Add
          </button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {formData.tags.map((tag) => (
            <div key={tag} className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full flex items-center">
              <span>{tag}</span>
              <button
                type="button"
                className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                onClick={() => handleArrayFieldRemove('tags', tag)}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  // Render additional details form (step 3)
  const renderAdditionalDetailsForm = () => (
    <div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Industries
        </label>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          Select industries where your AI agent is most useful
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {industryOptions.map((industry) => (
            <label key={industry} className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500"
                checked={formData.industries?.includes(industry) || false}
                onChange={(e) => handleCheckboxChange('industries', industry, e.target.checked)}
              />
              <span className="text-gray-700 dark:text-gray-300">{industry}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Platforms
        </label>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          Select platforms where your AI agent is available
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {platformOptions.map((platform) => (
            <label key={platform} className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500"
                checked={formData.platforms?.includes(platform) || false}
                onChange={(e) => handleCheckboxChange('platforms', platform, e.target.checked)}
              />
              <span className="text-gray-700 dark:text-gray-300">{platform}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Languages
        </label>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          Select languages your AI agent supports
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {languageOptions.map((language) => (
            <label key={language} className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500"
                checked={formData.languages?.includes(language) || false}
                onChange={(e) => handleCheckboxChange('languages', language, e.target.checked)}
              />
              <span className="text-gray-700 dark:text-gray-300">{language}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-100 dark:border-gray-700">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Submit an AI Agent</h2>
      
      {error && (
        <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 p-4 rounded-md">
          {error}
        </div>
      )}
      
      {renderStepIndicator()}
      
      <form onSubmit={handleSubmit}>
        {step === 1 && renderBasicInfoForm()}
        {step === 2 && renderCategoriesAndFeaturesForm()}
        {step === 3 && renderAdditionalDetailsForm()}
        
        {renderFormNavigation()}
      </form>
      
      {onCancel && (
        <div className="mt-4 text-center">
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel submission
          </button>
        </div>
      )}
    </div>
  )
}
