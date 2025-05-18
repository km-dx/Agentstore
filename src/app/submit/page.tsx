'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AgentSubmissionForm, { AgentSubmissionData } from '@/components/AgentSubmissionForm'
import { supabase } from '@/lib/supabase'

export default function SubmitAgentPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  
  const handleSubmit = async (data: AgentSubmissionData) => {
    setIsSubmitting(true)
    setError(null)
    
    try {
      // Insert the agent data
      const { error: insertError, data: agentData } = await supabase
        .from('agents')
        .insert({
          name: data.name,
          description: data.description,
          short_description: data.shortDescription,
          logo_url: data.logoUrl,
          website_url: data.websiteUrl,
          pricing_type: data.pricing.type,
          pricing_starting_price: data.pricing.startingPrice,
          pricing_currency: data.pricing.currency,
          pricing_url: data.pricing.pricingUrl,
          features: data.features, // Features are stored directly in the agents table as an array
        })
        .select('id')
        .single()
      
      if (insertError) throw insertError
      
      if (!agentData) throw new Error('Failed to retrieve agent ID after insertion')
      
      const agentId = agentData.id
      
      // Process categories
      if (data.categories.length > 0) {
        for (const categoryName of data.categories) {
          // Check if category exists, create if not
          const { data: existingCategory } = await supabase
            .from('categories')
            .select('id')
            .eq('name', categoryName)
            .single()
          
          let categoryId
          
          if (existingCategory) {
            categoryId = existingCategory.id
          } else {
            // Create new category
            const slug = categoryName.toLowerCase().replace(/\s+/g, '-')
            const { data: newCategory, error: categoryError } = await supabase
              .from('categories')
              .insert({
                name: categoryName,
                slug: slug,
                description: `Category for ${categoryName}`
              })
              .select('id')
              .single()
            
            if (categoryError) throw categoryError
            categoryId = newCategory?.id
          }
          
          if (categoryId) {
            // Link category to agent
            const { error: linkError } = await supabase
              .from('agent_categories')
              .insert({
                agent_id: agentId,
                category_id: categoryId
              })
            
            if (linkError) throw linkError
          }
        }
      }
      
      // Process tags
      if (data.tags.length > 0) {
        for (const tagName of data.tags) {
          // Check if tag exists, create if not
          const { data: existingTag } = await supabase
            .from('tags')
            .select('id')
            .eq('name', tagName)
            .single()
          
          let tagId
          
          if (existingTag) {
            tagId = existingTag.id
          } else {
            // Create new tag
            const slug = tagName.toLowerCase().replace(/\s+/g, '-')
            const { data: newTag, error: tagError } = await supabase
              .from('tags')
              .insert({
                name: tagName,
                slug: slug
              })
              .select('id')
              .single()
            
            if (tagError) throw tagError
            tagId = newTag?.id
          }
          
          if (tagId) {
            // Link tag to agent
            const { error: linkError } = await supabase
              .from('agent_tags')
              .insert({
                agent_id: agentId,
                tag_id: tagId
              })
            
            if (linkError) throw linkError
          }
        }
      }
      
      // Note: industries, platforms, integrations, and languages are not in the current TypeScript types
      // We'll skip processing them for now
      
      // Show success message
      setSuccess(true)
      
      // Redirect to the agent page after a delay
      setTimeout(() => {
        router.push(`/agent/${agentId}`)
      }, 3000)
      
    } catch (err) {
      console.error('Error submitting agent:', err)
      setError('Failed to submit agent. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const handleCancel = () => {
    router.push('/')
  }
  
  if (success) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 p-6 rounded-lg text-center">
          <h2 className="text-2xl font-semibold mb-4">Submission Successful!</h2>
          <p className="mb-4">Thank you for submitting your AI agent. Your submission is now pending review.</p>
          <p>You will be redirected to the agent page shortly...</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Submit an AI Agent</h1>
      
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Share your AI agent with the community. Please provide accurate and detailed information to help users discover and understand your agent.
      </p>
      
      {error && (
        <div className="mb-8 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 p-4 rounded-md">
          {error}
        </div>
      )}
      
      <AgentSubmissionForm 
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  )
}
