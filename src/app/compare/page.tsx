'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Agent } from '@/models/Agent'

export default function ComparePage() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [selectedAgents, setSelectedAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would fetch from the API
    // For now, we'll use mock data
    const fetchAgents = async () => {
      try {
        setLoading(true)
        
        // Mock data for demonstration - same as other pages
        const mockAgents: Agent[] = [
          {
            id: '1',
            name: 'AI Assistant Pro',
            description: 'AI Assistant Pro is a powerful AI agent that helps you with various tasks.',
            shortDescription: 'Your personal AI assistant for productivity and creativity',
            logoUrl: 'https://via.placeholder.com/150',
            websiteUrl: 'https://example.com/ai-assistant-pro',
            pricing: {
              type: 'freemium',
              startingPrice: 0,
              currency: 'USD',
            },
            categories: ['Productivity', 'Writing'],
            tags: ['AI Assistant', 'GPT'],
            features: ['Natural language understanding', 'Content generation'],
            rating: {
              score: 4.7,
              count: 256,
            },
            createdAt: new Date('2023-01-15'),
            updatedAt: new Date('2023-05-20'),
          },
          {
            id: '2',
            name: 'Data Analyzer AI',
            description: 'Powerful data analysis tool powered by artificial intelligence.',
            shortDescription: 'Transform your data into actionable insights',
            logoUrl: 'https://via.placeholder.com/150',
            websiteUrl: 'https://example.com/data-analyzer',
            pricing: {
              type: 'subscription',
              startingPrice: 29,
              currency: 'USD',
            },
            categories: ['Data Analysis', 'Business'],
            tags: ['Data', 'Analytics', 'Charts'],
            features: ['Data visualization', 'Predictive analytics', 'Report generation'],
            rating: {
              score: 4.5,
              count: 128,
            },
            createdAt: new Date('2023-02-10'),
            updatedAt: new Date('2023-06-05'),
          },
          {
            id: '3',
            name: 'Creative Writer',
            description: 'AI-powered creative writing assistant for authors and content creators.',
            shortDescription: 'Unleash your creativity with AI assistance',
            logoUrl: 'https://via.placeholder.com/150',
            websiteUrl: 'https://example.com/creative-writer',
            pricing: {
              type: 'free',
            },
            categories: ['Writing', 'Creativity'],
            tags: ['Content Creation', 'Writing Assistant'],
            features: ['Story generation', 'Content ideas', 'Style suggestions'],
            rating: {
              score: 4.2,
              count: 95,
            },
            createdAt: new Date('2023-03-20'),
            updatedAt: new Date('2023-05-15'),
          },
          {
            id: '4',
            name: 'Code Assistant',
            description: 'AI coding assistant that helps developers write better code faster.',
            shortDescription: 'Your AI pair programmer',
            logoUrl: 'https://via.placeholder.com/150',
            websiteUrl: 'https://example.com/code-assistant',
            pricing: {
              type: 'subscription',
              startingPrice: 19,
              currency: 'USD',
            },
            categories: ['Development', 'Productivity'],
            tags: ['Coding', 'Programming', 'Developer Tools'],
            features: ['Code completion', 'Bug detection', 'Refactoring suggestions'],
            rating: {
              score: 4.8,
              count: 312,
            },
            createdAt: new Date('2023-01-05'),
            updatedAt: new Date('2023-06-10'),
          },
          {
            id: '5',
            name: 'Research Companion',
            description: 'AI research assistant that helps with academic and professional research.',
            shortDescription: 'Accelerate your research with AI',
            logoUrl: 'https://via.placeholder.com/150',
            websiteUrl: 'https://example.com/research-companion',
            pricing: {
              type: 'freemium',
              startingPrice: 0,
              currency: 'USD',
            },
            categories: ['Research', 'Education'],
            tags: ['Academic', 'Research', 'Knowledge Management'],
            features: ['Literature search', 'Citation management', 'Summarization'],
            rating: {
              score: 4.4,
              count: 87,
            },
            createdAt: new Date('2023-04-12'),
            updatedAt: new Date('2023-05-30'),
          },
          {
            id: '6',
            name: 'Design AI',
            description: 'AI-powered design assistant for creating beautiful graphics and layouts.',
            shortDescription: 'Create stunning designs with AI assistance',
            logoUrl: 'https://via.placeholder.com/150',
            websiteUrl: 'https://example.com/design-ai',
            pricing: {
              type: 'paid',
              startingPrice: 49,
              currency: 'USD',
            },
            categories: ['Design', 'Creativity'],
            tags: ['Graphic Design', 'UI/UX', 'Creative Tools'],
            features: ['Layout generation', 'Color palette suggestions', 'Image enhancement'],
            rating: {
              score: 4.6,
              count: 142,
            },
            createdAt: new Date('2023-02-28'),
            updatedAt: new Date('2023-06-15'),
          },
        ]
        
        // Simulate API delay
        setTimeout(() => {
          setAgents(mockAgents)
          // Pre-select the first two agents for comparison
          setSelectedAgents([mockAgents[0], mockAgents[1]])
          setLoading(false)
        }, 500)
      } catch (err) {
        console.error(err)
        setLoading(false)
      }
    }

    fetchAgents()
  }, [])

  const toggleAgentSelection = (agent: Agent) => {
    if (selectedAgents.some(a => a.id === agent.id)) {
      // Remove agent from selection
      setSelectedAgents(selectedAgents.filter(a => a.id !== agent.id))
    } else {
      // Add agent to selection (limit to 3)
      if (selectedAgents.length < 3) {
        setSelectedAgents([...selectedAgents, agent])
      } else {
        alert('You can compare up to 3 agents at a time')
      }
    }
  }

  // Get all unique features from selected agents
  const allFeatures = Array.from(
    new Set(selectedAgents.flatMap(agent => agent.features || []))
  ).sort()

  // Get all unique categories from selected agents
  const allCategories = Array.from(
    new Set(selectedAgents.flatMap(agent => agent.categories || []))
  ).sort()

  // Get all unique tags from selected agents
  const allTags = Array.from(
    new Set(selectedAgents.flatMap(agent => agent.tags || []))
  ).sort()

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Compare AI Agents</h1>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Select Agents to Compare (up to 3)</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {agents.map(agent => (
                <div 
                  key={agent.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedAgents.some(a => a.id === agent.id)
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700'
                  }`}
                  onClick={() => toggleAgentSelection(agent)}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="relative h-16 w-16 mb-2">
                      {agent.logoUrl ? (
                        <Image
                          src={agent.logoUrl}
                          alt={agent.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      ) : (
                        <div className="h-16 w-16 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">
                          <span className="text-xl font-bold text-gray-500 dark:text-gray-400">
                            {agent.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <h3 className="text-sm font-medium">{agent.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {selectedAgents.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="border border-gray-200 dark:border-gray-700 p-4 text-left w-1/4">Feature</th>
                    {selectedAgents.map(agent => (
                      <th key={agent.id} className="border border-gray-200 dark:border-gray-700 p-4 text-center">
                        <div className="flex flex-col items-center">
                          <div className="relative h-16 w-16 mb-2">
                            {agent.logoUrl ? (
                              <Image
                                src={agent.logoUrl}
                                alt={agent.name}
                                fill
                                className="object-cover rounded-md"
                              />
                            ) : (
                              <div className="h-16 w-16 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">
                                <span className="text-xl font-bold text-gray-500 dark:text-gray-400">
                                  {agent.name.charAt(0)}
                                </span>
                              </div>
                            )}
                          </div>
                          <h3 className="font-semibold">{agent.name}</h3>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Basic Info */}
                  <tr>
                    <td colSpan={selectedAgents.length + 1} className="border border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900 font-semibold">
                      Basic Information
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 dark:border-gray-700 p-4">Description</td>
                    {selectedAgents.map(agent => (
                      <td key={agent.id} className="border border-gray-200 dark:border-gray-700 p-4">
                        {agent.shortDescription || agent.description}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border border-gray-200 dark:border-gray-700 p-4">Rating</td>
                    {selectedAgents.map(agent => (
                      <td key={agent.id} className="border border-gray-200 dark:border-gray-700 p-4 text-center">
                        {agent.rating ? (
                          <div className="flex items-center justify-center">
                            <span className="text-yellow-500 mr-1">★</span>
                            <span>{agent.rating.score.toFixed(1)}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                              ({agent.rating.count})
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-500 dark:text-gray-400">No rating</span>
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border border-gray-200 dark:border-gray-700 p-4">Pricing</td>
                    {selectedAgents.map(agent => (
                      <td key={agent.id} className="border border-gray-200 dark:border-gray-700 p-4 text-center">
                        {agent.pricing ? (
                          <div>
                            <div className="font-medium">
                              {agent.pricing.type === 'free' && 'Free'}
                              {agent.pricing.type === 'freemium' && 'Freemium'}
                              {agent.pricing.type === 'paid' && 'Paid'}
                              {agent.pricing.type === 'subscription' && 'Subscription'}
                              {agent.pricing.type === 'contact' && 'Contact for pricing'}
                            </div>
                            {(agent.pricing.type === 'paid' || agent.pricing.type === 'subscription') && (
                              <div className="text-sm text-gray-600 dark:text-gray-300">
                                {agent.pricing.startingPrice} {agent.pricing.currency || 'USD'}
                                {agent.pricing.type === 'subscription' && '/mo'}
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-500 dark:text-gray-400">Not specified</span>
                        )}
                      </td>
                    ))}
                  </tr>
                  
                  {/* Categories */}
                  <tr>
                    <td colSpan={selectedAgents.length + 1} className="border border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900 font-semibold">
                      Categories
                    </td>
                  </tr>
                  {allCategories.map(category => (
                    <tr key={category}>
                      <td className="border border-gray-200 dark:border-gray-700 p-4">{category}</td>
                      {selectedAgents.map(agent => (
                        <td key={agent.id} className="border border-gray-200 dark:border-gray-700 p-4 text-center">
                          {agent.categories && agent.categories.includes(category) ? (
                            <svg className="w-6 h-6 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="w-6 h-6 text-gray-300 dark:text-gray-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                  
                  {/* Features */}
                  <tr>
                    <td colSpan={selectedAgents.length + 1} className="border border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900 font-semibold">
                      Features
                    </td>
                  </tr>
                  {allFeatures.map(feature => (
                    <tr key={feature}>
                      <td className="border border-gray-200 dark:border-gray-700 p-4">{feature}</td>
                      {selectedAgents.map(agent => (
                        <td key={agent.id} className="border border-gray-200 dark:border-gray-700 p-4 text-center">
                          {agent.features && agent.features.includes(feature) ? (
                            <svg className="w-6 h-6 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="w-6 h-6 text-gray-300 dark:text-gray-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                  
                  {/* Tags */}
                  <tr>
                    <td colSpan={selectedAgents.length + 1} className="border border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900 font-semibold">
                      Tags
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 dark:border-gray-700 p-4">Tags</td>
                    {selectedAgents.map(agent => (
                      <td key={agent.id} className="border border-gray-200 dark:border-gray-700 p-4">
                        <div className="flex flex-wrap gap-1 justify-center">
                          {agent.tags && agent.tags.map(tag => (
                            <span key={tag} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>
                  
                  {/* Links */}
                  <tr>
                    <td colSpan={selectedAgents.length + 1} className="border border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900 font-semibold">
                      Links
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 dark:border-gray-700 p-4">Website</td>
                    {selectedAgents.map(agent => (
                      <td key={agent.id} className="border border-gray-200 dark:border-gray-700 p-4 text-center">
                        <a
                          href={agent.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:text-primary-800"
                        >
                          Visit Website
                        </a>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border border-gray-200 dark:border-gray-700 p-4">Details</td>
                    {selectedAgents.map(agent => (
                      <td key={agent.id} className="border border-gray-200 dark:border-gray-700 p-4 text-center">
                        <Link href={`/agent/${agent.id}`} className="text-primary-600 hover:text-primary-800">
                          View Details
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No agents selected</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Please select at least one agent to compare.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  )
}
