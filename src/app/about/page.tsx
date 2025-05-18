'use client'

import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">About AI Agent Store</h1>
      
      <div className="max-w-3xl space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            AI Agent Store is dedicated to helping users discover, compare, and select the best AI agents for their specific needs. 
            We believe that AI agents can significantly enhance productivity, creativity, and problem-solving capabilities, 
            and our mission is to make these tools accessible and understandable to everyone.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
          <ul className="list-disc pl-6 space-y-3 text-gray-600 dark:text-gray-300">
            <li>
              <strong>Comprehensive Directory:</strong> A curated collection of the best AI agents across various categories.
            </li>
            <li>
              <strong>Detailed Information:</strong> In-depth descriptions, features, pricing, and user ratings for each agent.
            </li>
            <li>
              <strong>Comparison Tools:</strong> Easy-to-use tools to compare different agents side by side.
            </li>
            <li>
              <strong>Category Exploration:</strong> Browse agents by categories to find the perfect tool for your needs.
            </li>
            <li>
              <strong>Agency Listings:</strong> Discover agencies that specialize in developing and maintaining AI agents.
            </li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-2 text-primary-600 dark:text-primary-400">Transparency</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We provide honest, unbiased information about AI agents, including their capabilities, limitations, and pricing.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-2 text-primary-600 dark:text-primary-400">Quality</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We carefully vet all agents listed on our platform to ensure they meet high standards of functionality and reliability.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-2 text-primary-600 dark:text-primary-400">Accessibility</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We strive to make information about AI agents accessible and understandable to users of all technical backgrounds.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-2 text-primary-600 dark:text-primary-400">Innovation</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We continuously update our platform to showcase the latest advancements in AI agent technology.
              </p>
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">Join Our Community</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            We're building a community of AI agent users and developers. Join us to share experiences, 
            get recommendations, and stay updated on the latest developments in the AI agent ecosystem.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/signup" 
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-md text-lg font-medium"
            >
              Sign Up
            </Link>
            <Link 
              href="/contact" 
              className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-6 py-3 rounded-md text-lg font-medium"
            >
              Contact Us
            </Link>
          </div>
        </section>
        
        <section className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-medium mb-2">What is an AI agent?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                An AI agent is a software program that uses artificial intelligence to perform tasks, 
                make decisions, or solve problems on behalf of users. These agents can range from simple 
                chatbots to complex systems that can analyze data, generate content, or automate workflows.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">How do I choose the right AI agent?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Consider your specific needs, budget, and technical requirements. Our platform provides 
                detailed information and comparison tools to help you make an informed decision. You can 
                also filter agents by category, pricing model, and features.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">Are the agents on your platform secure?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We vet all agents for basic security practices, but we recommend reviewing each agent's 
                privacy policy and security features before use, especially for handling sensitive data. 
                Always check the agent's website for the most up-to-date security information.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">How can I list my AI agent on your platform?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                If you're a developer or company with an AI agent you'd like to list, please contact us 
                through our submission form. We'll review your agent to ensure it meets our quality standards 
                before adding it to our directory.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
