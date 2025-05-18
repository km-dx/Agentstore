'use client'

import { useState, useEffect } from 'react'
import AgentCard from '@/components/AgentCard'
import { Agent } from '@/models/Agent'

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    category: '',
    priceType: '',
    rating: 0,
  })

  useEffect(() => {
    // In a real app, this would fetch from the API
    // For now, we'll use mock data
    const fetchAgents = async () => {
      try {
        setLoading(true)
        
        // Mock data for demonstration - same as home page
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
          setLoading(false)
        }, 500)
      } catch (err) {
        console.error(err)
        setLoading(false)
      }
    }

    fetchAgents()
  }, [])

  // Get unique categories from all agents
  const categories = Array.from(
    new Set(agents.flatMap(agent => agent.categories))
  ).sort()

  // Filter agents based on selected filters
  const filteredAgents = agents.filter(agent => {
    // Filter by category
    if (filters.category && !agent.categories.includes(filters.category)) {
      return false
    }
    
    // Filter by price type
    if (filters.priceType && agent.pricing?.type !== filters.priceType) {
      return false
    }
    
    // Filter by minimum rating
    if (filters.rating > 0 && (!agent.rating || agent.rating.score < filters.rating)) {
      return false
    }
    
    return true
  })

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">All AI Agents</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>
            
            <div className="space-y-6">
              {/* Category filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 py-2 px-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Price type filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Pricing
                </label>
                <select
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 py-2 px-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  value={filters.priceType}
                  onChange={(e) => setFilters({ ...filters, priceType: e.target.value })}
                >
                  <option value="">All Pricing Types</option>
                  <option value="free">Free</option>
                  <option value="freemium">Freemium</option>
                  <option value="paid">Paid</option>
                  <option value="subscription">Subscription</option>
                  <option value="contact">Contact for Pricing</option>
                </select>
              </div>
              
              {/* Rating filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Minimum Rating
                </label>
                <select
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 py-2 px-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  value={filters.rating}
                  onChange={(e) => setFilters({ ...filters, rating: Number(e.target.value) })}
                >
                  <option value="0">Any Rating</option>
                  <option value="3">3+ Stars</option>
                  <option value="4">4+ Stars</option>
                  <option value="4.5">4.5+ Stars</option>
                </select>
              </div>
              
              {/* Reset filters button */}
              <button
                className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-2 px-4 rounded-md"
                onClick={() => setFilters({ category: '', priceType: '', rating: 0 })}
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
        
        {/* Agents grid */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          ) : filteredAgents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredAgents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No agents found</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your filters or check back later for new agents.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
