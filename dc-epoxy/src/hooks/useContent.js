import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useContent() {
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchContent() {
      try {
        const [settings, services, projects, testimonials, processSteps] = await Promise.all([
          supabase.from('settings').select('*').single(),
          supabase.from('services').select('*').order('sort_order'),
          supabase.from('projects').select('*').order('sort_order'),
          supabase.from('testimonials').select('*').order('sort_order'),
          supabase.from('process_steps').select('*').order('sort_order'),
        ])
        setContent({
          settings: settings.data,
          services: services.data || [],
          projects: projects.data || [],
          testimonials: testimonials.data || [],
          processSteps: processSteps.data || [],
        })
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    fetchContent()
  }, [])

  // Also return top-level fields for convenience
  return {
    content,
    loading,
    error,
    settings: content?.settings || null,
    services: content?.services || [],
    projects: content?.projects || [],
    testimonials: content?.testimonials || [],
    processSteps: content?.processSteps || [],
  }
}
