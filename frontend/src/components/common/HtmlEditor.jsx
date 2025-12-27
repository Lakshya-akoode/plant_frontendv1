'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

const CKEDITOR_SCRIPT_URL = 'https://cdn.ckeditor.com/4.22.1/standard/ckeditor.js'
let ckeditorLoaderPromise = null

const loadCkeditorScript = () => {
  if (typeof window === 'undefined') return Promise.resolve()
  if (window.CKEDITOR) return Promise.resolve()
  if (!ckeditorLoaderPromise) {
    ckeditorLoaderPromise = new Promise((resolve, reject) => {
      const existingScript = document.querySelector(`script[src="${CKEDITOR_SCRIPT_URL}"]`)
      if (existingScript) {
        existingScript.addEventListener('load', resolve)
        existingScript.addEventListener('error', reject)
        return
      }

      const script = document.createElement('script')
      script.src = CKEDITOR_SCRIPT_URL
      script.async = true
      script.onload = resolve
      script.onerror = reject
      document.body.appendChild(script)
    })
  }
  return ckeditorLoaderPromise
}

export default function HtmlEditor({
  id,
  value = '',
  onChange,
  placeholder = 'Write something...',
  height = '300px',
  readOnly = false,
}) {
  const textareaRef = useRef(null)
  const editorInstanceRef = useRef(null)
  const [isReady, setIsReady] = useState(false)
  const [internalValue, setInternalValue] = useState(value || '')

  const elementId = useMemo(() => {
    if (id) return id
    return `html-editor-${Math.random().toString(36).slice(2, 10)}`
  }, [id])

  useEffect(() => {
    let isMounted = true

    loadCkeditorScript()
      .then(() => {
        if (!isMounted) return
        if (!window.CKEDITOR || !textareaRef.current) return

        editorInstanceRef.current = window.CKEDITOR.replace(textareaRef.current, {
          height,
          readOnly,
          removePlugins: 'elementspath',
          resize_enabled: false,
        })

        editorInstanceRef.current.on('instanceReady', () => {
          if (!isMounted) return
          editorInstanceRef.current.setData(value || '')
          setIsReady(true)
          if (typeof onChange === 'function') {
            onChange(editorInstanceRef.current.getData())
          }
        })

        editorInstanceRef.current.on('change', () => {
          if (!isMounted) return
          const data = editorInstanceRef.current.getData()
          setInternalValue(data)
          if (typeof onChange === 'function') {
            onChange(data)
          }
        })
      })
      .catch((error) => {
        console.error('Failed to load CKEditor:', error)
      })

    return () => {
      isMounted = false
      if (editorInstanceRef.current) {
        editorInstanceRef.current.destroy()
        editorInstanceRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (!editorInstanceRef.current) return
    if (!isReady) return
    const currentData = editorInstanceRef.current.getData()
    if ((value || '') !== currentData) {
      editorInstanceRef.current.setData(value || '')
      setInternalValue(value || '')
    }
  }, [value, isReady])

  useEffect(() => {
    if (editorInstanceRef.current) {
      editorInstanceRef.current.setReadOnly(!!readOnly)
    }
  }, [readOnly])

  return (
    <div className="html-editor-wrapper">
      <textarea
        id={elementId}
        ref={textareaRef}
        defaultValue={internalValue}
        placeholder={placeholder}
      />
      {!isReady && (
        <div className="html-editor-placeholder">Loading editor…</div>
      )}
      <style jsx>{`
        .html-editor-wrapper {
          position: relative;
        }
        .html-editor-wrapper textarea {
          display: none;
        }
        .html-editor-placeholder {
          padding: 16px;
          border: 1px solid #dadada;
          border-radius: 8px;
          background: #f8f9fa;
          color: #666;
          font-size: 14px;
        }
      `}</style>
    </div>
  )
}


