'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import AgentCard from '@/components/AgentCard'
import { Agent } from '@/models/Agent'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would fetch from the API
    // For now, we'll use mock data
    const fetchAgents = async () => {
      try {
        setLoading(true)
        
        // Mock data for demonstration
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

  // Filter agents based on search query
  const filteredAgents = agents.filter(agent => 
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (agent.shortDescription && agent.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())) ||
    agent.categories.some(category => category.toLowerCase().includes(searchQuery.toLowerCase())) ||
    agent.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="container py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary-700 dark:text-primary-400 mb-4">
          AI Agent Store
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Discover, filter, and compare the best AI tools and agents for your needs
        </p>
      </header>

      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for AI agents..."
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-1 rounded-md">
            Search
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      ) : filteredAgents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No agents found</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search query or check back later for new agents.
          </p>
        </div>
      )}
    </div>
  )
}
