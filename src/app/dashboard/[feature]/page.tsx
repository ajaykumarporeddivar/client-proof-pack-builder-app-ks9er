'use client'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, Badge, Button } from '@/components/ui'
import { AppHeader } from '@/components/layout'
import { formatDate, formatCurrency } from '@/lib/utils'
// ⚠ Import ONLY the MOCK arrays defined in your SPEC CONTRACT Entity Reference Table:
import { MOCK_PROOF_PACKS, MOCK_CLIENTS, MOCK_CAMPAIGNS, MOCK_REPORT_ITEMS } from '@/lib/data'
import { Search, Plus, Download, Eye } from 'lucide-react'

export default function FeaturePage() {
  const params = useParams()
  const slug = (params.feature as string) ?? ''
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [selected, setSelected] = useState<string | null>(null)

  // ── Feature 1: Proof Pack Intake (/dashboard/intake) ──────────────────────
  if (slug === 'intake') {
    const items = MOCK_PROOF_PACKS.filter(i =>
      (!search || i.title.toLowerCase().includes(search.toLowerCase()) || i.clientName.toLowerCase().includes(search.toLowerCase())) &&
      (!statusFilter || i.status === statusFilter)
    )
    return (
      <div className="space-y-6">
        <AppHeader
          title="Proof Pack Intake"
          subtitle={`${items.length} Proof Packs total`}
          actions={<Button size="sm"><Plus size={14} className="mr-1" />New Proof Pack</Button>}
        />
        <Card>
          <CardHeader>
            <div className="flex gap-3">
              <div className="relative flex-1 max-w-xs">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search proof packs..."
                  className="w-full pl-9 pr-3 py-2 text-sm border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
                />
              </div>
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="px-3 py-2 text-sm border border-zinc-200 rounded-lg bg-white focus:outline-none"
              >
                <option value="">All statuses</option>
                <option value="Draft">Draft</option>
                <option value="Pending Review">Pending Review</option>
                <option value="Ready for Export">Ready for Export</option>
                <option value="Exported">Exported</option>
              </select>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead className="border-b border-zinc-100">
                <tr className="text-left text-zinc-500 text-xs uppercase tracking-wide">
                  <th className="px-6 py-3">Title</th>
                  <th className="px-6 py-3">Client</th>
                  <th className="px-6 py-3">Campaign</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Period Start</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {items.map(item => (
                  <tr
                    key={item.id}
                    onClick={() => setSelected(selected === item.id ? null : item.id)}
                    className={`hover:bg-zinc-50 cursor-pointer transition-colors ${selected === item.id ? 'bg-indigo-50' : ''}`}
                  >
                    <td className="px-6 py-3 font-medium text-zinc-900">{item.title}</td>
                    <td className="px-6 py-3 text-zinc-500">{item.clientName}</td>
                    <td className="px-6 py-3 text-zinc-700">{item.campaignName || 'N/A'}</td>
                    <td className="px-6 py-3">
                      <Badge variant={item.status === 'Ready for Export' ? 'success' : item.status === 'Pending Review' ? 'warning' : item.status === 'Draft' ? 'info' : 'default'}>
                        {item.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-3 text-zinc-400 text-xs">{formatDate(item.reportingPeriodStart)}</td>
                    <td className="px-6 py-3">
                      <button className="text-zinc-400 hover:text-zinc-700 p-1"><Eye size={14} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-6 py-3 border-t border-zinc-100 text-xs text-zinc-400">
              Showing {items.length} of {MOCK_PROOF_PACKS.length} Proof Packs
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // ── Feature 2: Operating Dashboard (/dashboard/dashboard) ──────────────────────
  if (slug === 'dashboard') {
    const items = MOCK_PROOF_PACKS.filter(i =>
      !search || i.title.toLowerCase().includes(search.toLowerCase()) || i.clientName.toLowerCase().includes(search.toLowerCase()) || (i.campaignName && i.campaignName.toLowerCase().includes(search.toLowerCase()))
    )
    return (
      <div className="space-y-6">
        <AppHeader
          title="Operating Dashboard"
          subtitle={`${items.length} Proof Packs`}
          actions={<Button size="sm"><Plus size={14} className="mr-1" />Add Proof Pack</Button>}
        />
        <div className="mb-4">
          <div className="relative max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search proof packs..."
              className="w-full pl-9 pr-3 py-2 text-sm border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(item => (
            <Card key={item.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelected(item.id)}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
                    {String(item.clientName).slice(0, 2).toUpperCase()}
                  </div>
                  <Badge variant={item.status === 'Ready for Export' ? 'success' : item.status === 'Pending Review' ? 'warning' : item.status === 'Draft' ? 'info' : 'default'}>
                    {item.status}
                  </Badge>
                </div>
                <h3 className="font-semibold text-zinc-900 text-sm mb-1">{item.title}</h3>
                <p className="text-zinc-500 text-xs mb-3">{item.clientName} - {item.campaignName || 'General'}</p>
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span>Reporting Period: {formatDate(item.reportingPeriodStart)}</span>
                  <span>{formatDate(item.createdAt)}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  // ── Feature 3: Proof Pack Exports (/dashboard/exports) ──────────────────────
  if (slug === 'exports') {
    const items = MOCK_PROOF_PACKS.filter(i =>
      !search || i.title.toLowerCase().includes(search.toLowerCase()) || i.clientName.toLowerCase().includes(search.toLowerCase()) || (i.campaignName && i.campaignName.toLowerCase().includes(search.toLowerCase()))
    )
    return (
      <div className="space-y-6">
        <AppHeader
          title="Proof Pack Exports"
          subtitle={`${items.length} records`}
          actions={
            <div className="flex gap-2">
              <Button variant="outline" size="sm"><Download size={14} className="mr-1" />Export</Button>
              <Button size="sm"><Plus size={14} className="mr-1" />New Proof Pack</Button>
            </div>
          }
        />
        <Card>
          <CardHeader>
            <div className="relative max-w-xs">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search exports..."
                className="w-full pl-9 pr-3 py-2 text-sm border border-zinc-200 rounded-lg focus:outline-none" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead className="border-b border-zinc-100">
                <tr className="text-left text-zinc-500 text-xs uppercase tracking-wide">
                  <th className="px-6 py-3">Title</th>
                  <th className="px-6 py-3">Client</th>
                  <th className="px-6 py-3">Campaign</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Period Start</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {items.map(item => (
                  <tr key={item.id} className="hover:bg-zinc-50 cursor-pointer" onClick={() => setSelected(item.id)}>
                    <td className="px-6 py-3 font-medium text-zinc-900">{item.title}</td>
                    <td className="