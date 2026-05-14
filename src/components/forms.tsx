'use client'

import { useState } from 'react'
import { Button, Input } from '@/components/ui'

export function SearchAndFilter({ onSearch }: { onSearch?: (value: string) => void }) {
  const [query, setQuery] = useState('')
  return (
    <div className="flex gap-2">
      <Input value={query} onChange={event => { setQuery(event.target.value); onSearch?.(event.target.value) }} placeholder="Search..." />
      <Button type="button" variant="secondary">Filter</Button>
    </div>
  )
}

export function CreateEntityForm() {
  const [name, setName] = useState('')
  const [owner, setOwner] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const hasError = submitted && (!name.trim() || !owner.trim())
  return (
    <form className="space-y-3" onSubmit={event => { event.preventDefault(); setSubmitted(true) }}>
      <Input value={name} onChange={event => setName(event.target.value)} placeholder="Workflow name" />
      <Input value={owner} onChange={event => setOwner(event.target.value)} placeholder="Owner" />
      {hasError && <p className="text-sm font-medium text-red-600">Name and owner are required.</p>}
      {submitted && !hasError && <p className="rounded-lg border border-emerald-200 bg-emerald-50 p-2 text-sm font-medium text-emerald-700">Workflow created successfully.</p>}
      <Button type="submit">Create workflow</Button>
    </form>
  )
}

export function ExportButton() {
  const [exported, setExported] = useState(false)
  const handleExport = () => {
    const csv = 'name,status,owner\nLaunch workflow,active,Operations\nRoadmap unlock,pending,Product'
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'mvp-workflows.csv'
    link.click()
    URL.revokeObjectURL(url)
    setExported(true)
    window.setTimeout(() => setExported(false), 2000)
  }
  return <Button type="button" variant="secondary" onClick={handleExport}>{exported ? 'Exported' : 'Export CSV'}</Button>
}
