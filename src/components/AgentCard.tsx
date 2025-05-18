'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Agent } from '@/models/Agent'

interface AgentCardProps {
  agent: Agent
}

export default function AgentCard({ agent }: AgentCardProps) {
  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="relative h-40 bg-gray-200 dark:bg-gray-700 rounded-md mb-4">
        {agent.logoUrl && (
          <Image
            src={agent.logoUrl}
            alt={agent.name}
            fill
            className="object-cover rounded-md"
          />
        )}
      </div>
      
      <h3 className="text-xl font-semibold mb-2">{agent.name}</h3>
      
      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
        {agent.shortDescription || agent.description}
      </p>
      
      <div className="flex justify-between items-center">
        {agent.categories && agent.categories.length > 0 && (
          <span className="text-sm bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 px-2 py-1 rounded-full">
            {agent.categories[0]}
          </span>
        )}
        
        <Link href={`/agent/${agent.id}`} className="text-primary-600 hover:text-primary-800 font-medium">
          View Details
        </Link>
      </div>
      
      {agent.tags && agent.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {agent.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
          {agent.tags.length > 3 && (
            <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full">
              +{agent.tags.length - 3} more
            </span>
          )}
        </div>
      )}
      
      {agent.rating && (
        <div className="mt-3 flex items-center">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(agent.rating!.score)
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
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
            ({agent.rating.count})
          </span>
        </div>
      )}
      
      {agent.pricing && (
        <div className="mt-3 text-sm">
          <span className="text-gray-500 dark:text-gray-400">
            {agent.pricing.type === 'free' && 'Free'}
            {agent.pricing.type === 'freemium' && 'Freemium'}
            {agent.pricing.type === 'paid' && `Paid (${agent.pricing.startingPrice} ${agent.pricing.currency || 'USD'})`}
            {agent.pricing.type === 'subscription' && `Subscription (${agent.pricing.startingPrice} ${agent.pricing.currency || 'USD'}/mo)`}
            {agent.pricing.type === 'contact' && 'Contact for pricing'}
          </span>
        </div>
      )}
    </div>
  )
}
