'use client'

import { useState } from 'react'
import HtmlEditor from './HtmlEditor'

/**
 * Example usage of HtmlEditor component
 * 
 * This demonstrates how to use the HtmlEditor in your forms
 */
export default function HtmlEditorExample() {
  const [content, setContent] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Content:', content)
    console.log('Description:', description)
    
    // Here you can send the data to your API
    // The content will contain HTML markup
  }

  return (
    <div className="container mt-4">
      <h2>HTML Editor Example</h2>
      <form onSubmit={handleSubmit}>
        {/* Example 1: Basic usage */}
        <div className="mb-4">
          <label className="form-label">Content</label>
          <HtmlEditor
            value={content}
            onChange={setContent}
            placeholder="Enter your content here..."
            height="400px"
          />
        </div>

        {/* Example 2: With different height */}
        <div className="mb-4">
          <label className="form-label">Description</label>
          <HtmlEditor
            value={description}
            onChange={setDescription}
            placeholder="Enter description..."
            height="200px"
          />
        </div>

        {/* Display HTML preview */}
        <div className="mb-4">
          <h4>Preview (HTML Output):</h4>
          <div 
            className="border p-3 rounded"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>

        {/* Display raw HTML */}
        <div className="mb-4">
          <h4>Raw HTML:</h4>
          <pre className="bg-light p-3 rounded">
            <code>{content}</code>
          </pre>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  )
}


