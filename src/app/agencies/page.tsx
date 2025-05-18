'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Agency {
  id: string
  name: string
  description: string
  logoUrl: string
  websiteUrl: string
  location: string
  foundedYear: number
  specialties: string[]
  agentCount: number
}

export default function AgenciesPage() {
  const [agencies, setAgencies] = useState<Agency[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would fetch from the API
    // For now, we'll use mock data
    const fetchAgencies = async () => {
      try {
        setLoading(true)
        
        // Mock data for demonstration
        const mockAgencies: Agency[] = [
          {
            id: '1',
            name: 'AI Solutions Inc.',
            description: 'Leading provider of AI agents for business and productivity.',
            logoUrl: 'https://via.placeholder.com/150',
            websiteUrl: 'https://example.com/ai-solutions',
            location: 'San Francisco, CA',
            foundedYear: 2018,
            specialties: ['Business', 'Productivity', 'Data Analysis'],
            agentCount: 12
          },
          {
            id: '2',
            name: 'Creative AI Labs',
            description: 'Specializing in AI agents for creative professionals and content creators.',
            logoUrl: 'https://via.placeholder.com/150',
            websiteUrl: 'https://example.com/creative-ai-labs',
            location: 'New York, NY',
            foundedYear: 2020,
            specialties: ['Creativity', 'Design', 'Content Creation'],
            agentCount: 8
          },
          {
            id: '3',
            name: 'Tech Agents Group',
            description: 'Developing cutting-edge AI agents for developers and technical professionals.',
            logoUrl: 'https://via.placeholder.com/150',
            websiteUrl: 'https://example.com/tech-agents',
            location: 'Seattle, WA',
            foundedYear: 2019,
            specialties: ['Development', 'Programming', 'DevOps'],
            agentCount: 15
          },
          {
            id: '4',
            name: 'Research AI Partners',
            description: 'Creating specialized AI agents for academic and research purposes.',
            logoUrl: 'https://via.placeholder.com/150',
            websiteUrl: 'https://example.com/research-ai',
            location: 'Boston, MA',
            foundedYear: 2017,
            specialties: ['Research', 'Education', 'Academic'],
            agentCount: 10
          },
          {
            id: '5',
            name: 'Enterprise AI Solutions',
            description: 'Enterprise-grade AI agents for large organizations and businesses.',
            logoUrl: 'https://via.placeholder.com/150',
            websiteUrl: 'https://example.com/enterprise-ai',
            location: 'Chicago, IL',
            foundedYear: 2016,
            specialties: ['Enterprise', 'Business Intelligence', 'Automation'],
            agentCount: 20
          },
          {
            id: '6',
            name: 'AI Assistants Co.',
            description: 'Focused on personal AI assistants and productivity tools.',
            logoUrl: 'https://via.placeholder.com/150',
            websiteUrl: 'https://example.com/ai-assistants',
            location: 'Austin, TX',
            foundedYear: 2021,
            specialties: ['Personal Assistants', 'Productivity', 'Task Management'],
            agentCount: 6
          },
        ]
        
        // Simulate API delay
        setTimeout(() => {
          setAgencies(mockAgencies)
          setLoading(false)
        }, 500)
      } catch (err) {
        console.error(err)
        setLoading(false)
      }
    }

    fetchAgencies()
  }, [])

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">AI Agent Agencies</h1>
      
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-3xl">
        Discover agencies that specialize in developing and maintaining AI agents for various purposes.
        These agencies offer custom solutions and multiple agents to meet your specific needs.
      </p>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {agencies.map(agency => (
            <div key={agency.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center mr-4">
                    {agency.logoUrl ? (
                      <img src={agency.logoUrl} alt={agency.name} className="h-10 w-10 object-contain" />
                    ) : (
                      <span className="text-xl font-bold text-gray-500 dark:text-gray-400">
                        {agency.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl font-semibold">{agency.name}</h2>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {agency.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {agency.specialties.map(specialty => (
                    <span 
                      key={specialty} 
                      className="text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 px-2 py-1 rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
                
                <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1 mb-4">
                  <div className="flex items-center">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{agency.location}</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Founded in {agency.foundedYear}</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>{agency.agentCount} AI Agents</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                  <a 
                    href={agency.websiteUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-800 text-sm font-medium"
                  >
                    Visit Website
                  </a>
                  <Link 
                    href={`/agencies/${agency.id}`}
                    className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
