'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { Agent } from '@/models/Agent'

export default function AgentDetailPage() {
  const { id } = useParams()
  const [agent, setAgent] = useState<Agent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // In a real app, this would fetch from the API
    // For now, we'll use mock data
    const fetchAgent = async () => {
      try {
        setLoading(true)
        
        // Mock data for demonstration
        const mockAgent: Agent = {
          id: id as string,
          name: 'AI Assistant Pro',
          description: 'AI Assistant Pro is a powerful AI agent that helps you with various tasks, from writing and research to data analysis and creative work. It uses advanced language models to understand your needs and provide accurate, helpful responses.',
          shortDescription: 'Your personal AI assistant for productivity and creativity',
          logoUrl: 'https://via.placeholder.com/150',
          websiteUrl: 'https://example.com/ai-assistant-pro',
          pricing: {
            type: 'freemium',
            startingPrice: 0,
            currency: 'USD',
            pricingUrl: 'https://example.com/ai-assistant-pro/pricing',
          },
          categories: ['Productivity', 'Writing', 'Research'],
          tags: ['AI Assistant', 'GPT', 'Language Model', 'Productivity Tool'],
          features: [
            'Natural language understanding',
            'Content generation',
            'Research assistance',
            'Data analysis',
            'Creative writing',
            'Multilingual support',
          ],
          industries: ['Technology', 'Education', 'Marketing', 'Research'],
          platforms: ['Web', 'Mobile', 'Desktop'],
          integrations: ['Google Workspace', 'Microsoft Office', 'Slack', 'Notion'],
          languages: ['English', 'Spanish', 'French', 'German', 'Chinese'],
          rating: {
            score: 4.7,
            count: 256,
          },
          createdAt: new Date('2023-01-15'),
          updatedAt: new Date('2023-05-20'),
        }
        
        // Simulate API delay
        setTimeout(() => {
          setAgent(mockAgent)
          setLoading(false)
        }, 500)
      } catch (err) {
        setError('Failed to load agent details')
        setLoading(false)
        console.error(err)
      }
    }

    fetchAgent()
  }, [id])

  if (loading) {
    return (
      <div className="container py-12">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      </div>
    )
  }

  if (error || !agent) {
    return (
      <div className="container py-12">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-red-800 dark:text-red-400 mb-2">Error</h2>
          <p className="text-red-700 dark:text-red-300">{error || 'Agent not found'}</p>
          <Link href="/" className="mt-4 inline-block text-primary-600 hover:text-primary-800">
            Return to home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="mb-8">
        <Link href="/" className="text-primary-600 hover:text-primary-800 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to all agents
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
              {agent.logoUrl ? (
                <div className="relative h-24 w-24 rounded-lg overflow-hidden">
                  <Image
                    src={agent.logoUrl}
                    alt={agent.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="h-24 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-500 dark:text-gray-400">
                    {agent.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            
            <div className="flex-grow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 md:mb-0">{agent.name}</h1>
                
                <div className="flex items-center space-x-2">
                  {agent.rating && (
                    <div className="flex items-center bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 px-3 py-1 rounded-full">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-medium">{agent.rating.score.toFixed(1)}</span>
                      <span className="text-xs ml-1">({agent.rating.count})</span>
                    </div>
                  )}
                  
                  <a
                    href={agent.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Visit Website
                  </a>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mt-2">{agent.shortDescription}</p>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {agent.categories.map((category) => (
                  <span
                    key={category}
                    className="bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 px-3 py-1 rounded-full text-sm"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Description</h2>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300">{agent.description}</p>
              </div>
              
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Features</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {agent.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Information</h2>
                
                <div className="space-y-4">
                  {agent.pricing && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Pricing</h3>
                      <p className="mt-1 text-gray-900 dark:text-white">
                        {agent.pricing.type === 'free' && 'Free'}
                        {agent.pricing.type === 'freemium' && 'Freemium'}
                        {agent.pricing.type === 'paid' && `Paid (${agent.pricing.startingPrice} ${agent.pricing.currency})`}
                        {agent.pricing.type === 'subscription' && `Subscription (${agent.pricing.startingPrice} ${agent.pricing.currency})`}
                        {agent.pricing.type === 'contact' && 'Contact for pricing'}
                      </p>
                      {agent.pricing.pricingUrl && (
                        <a
                          href={agent.pricing.pricingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary-600 hover:text-primary-800 mt-1 inline-block"
                        >
                          View pricing details
                        </a>
                      )}
                    </div>
                  )}
                  
                  {agent.platforms && agent.platforms.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Platforms</h3>
                      <p className="mt-1 text-gray-900 dark:text-white">{agent.platforms.join(', ')}</p>
                    </div>
                  )}
                  
                  {agent.integrations && agent.integrations.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Integrations</h3>
                      <p className="mt-1 text-gray-900 dark:text-white">{agent.integrations.join(', ')}</p>
                    </div>
                  )}
                  
                  {agent.languages && agent.languages.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Languages</h3>
                      <p className="mt-1 text-gray-900 dark:text-white">{agent.languages.join(', ')}</p>
                    </div>
                  )}
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Added on</h3>
                    <p className="mt-1 text-gray-900 dark:text-white">
                      {agent.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Last updated</h3>
                    <p className="mt-1 text-gray-900 dark:text-white">
                      {agent.updatedAt.toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium py-2 px-4 rounded-md flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    Save to favorites
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
