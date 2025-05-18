'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Agent } from '@/models/Agent'

export default function CategoriesPage() {
  const [agents, setAgents] = useState<Agent[]>([])
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
          setLoading(false)
        }, 500)
      } catch (err) {
        console.error(err)
        setLoading(false)
      }
    }

    fetchAgents()
  }, [])

  // Get all unique categories from agents
  const categories = Array.from(
    new Set(agents.flatMap(agent => agent.categories || []))
  ).sort()

  // Group agents by category
  const agentsByCategory = categories.reduce((acc, category) => {
    acc[category] = agents.filter(agent => 
      agent.categories && agent.categories.includes(category)
    )
    return acc
  }, {} as Record<string, Agent[]>)

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Categories</h1>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <div className="space-y-12">
          {categories.map(category => (
            <div key={category} className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{category}</h2>
                <Link 
                  href={`/agents?category=${encodeURIComponent(category)}`}
                  className="text-primary-600 hover:text-primary-800 text-sm font-medium"
                >
                  View all {agentsByCategory[category].length} agents
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {agentsByCategory[category].slice(0, 3).map(agent => (
                  <div key={agent.id} className="card hover:shadow-lg transition-shadow">
                    <div className="relative h-40 bg-gray-200 dark:bg-gray-700 rounded-md mb-4">
                      {agent.logoUrl && (
                        <img
                          src={agent.logoUrl}
                          alt={agent.name}
                          className="object-cover rounded-md w-full h-full"
                        />
                      )}
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2">{agent.name}</h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {agent.shortDescription || agent.description}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      {agent.rating && (
                        <div className="flex items-center">
                          <span className="text-yellow-500 mr-1">★</span>
                          <span>{agent.rating.score.toFixed(1)}</span>
                        </div>
                      )}
                      
                      <Link href={`/agent/${agent.id}`} className="text-primary-600 hover:text-primary-800 font-medium">
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
