import type { DemoMetric, DemoRecord, NavItem } from './types'

export const metrics: DemoMetric[] = [
  { id: 'revenue', label: 'Revenue', value: 48200, change: 12 },
  { id: 'users', label: 'Active users', value: 1284, change: 18 },
  { id: 'conversion', label: 'Conversion', value: 8, change: 4 },
  { id: 'health', label: 'Health score', value: 96, change: 2 },
]

export const records: DemoRecord[] = [
  { id: 'rec_1', name: 'Launch workflow', status: 'active', owner: 'Operations', value: 84, priority: 'high', notes: 'Primary MVP workflow is moving through review', createdAt: '2026-05-01' },
  { id: 'rec_2', name: 'Customer review', status: 'pending', owner: 'Success', value: 62, priority: 'medium', notes: 'Needs stakeholder response before approval', createdAt: '2026-05-03' },
  { id: 'rec_3', name: 'Revenue audit', status: 'complete', owner: 'Finance', value: 91, priority: 'high', notes: 'Upgrade path validated for paid tier', createdAt: '2026-05-05' },
  { id: 'rec_4', name: 'Growth experiment', status: 'active', owner: 'Marketing', value: 73, priority: 'medium', notes: 'Acquisition loop being measured', createdAt: '2026-05-07' },
  { id: 'rec_5', name: 'Roadmap unlock', status: 'pending', owner: 'Product', value: 78, priority: 'high', notes: 'Post-payment expansion workflow queued', createdAt: '2026-05-08' },
  { id: 'rec_6', name: 'Client intake', status: 'active', owner: 'Delivery', value: 69, priority: 'medium', notes: 'New intake records are being normalized', createdAt: '2026-05-09' },
  { id: 'rec_7', name: 'Approval queue', status: 'active', owner: 'Operations', value: 88, priority: 'high', notes: 'Three pending approvals require action', createdAt: '2026-05-10' },
  { id: 'rec_8', name: 'Export package', status: 'complete', owner: 'Success', value: 95, priority: 'low', notes: 'CSV handoff prepared for client reporting', createdAt: '2026-05-11' },
  { id: 'rec_9', name: 'Expansion review', status: 'pending', owner: 'Sales', value: 71, priority: 'medium', notes: 'Buyer is evaluating locked roadmap scope', createdAt: '2026-05-12' },
  { id: 'rec_10', name: 'SLA readiness', status: 'complete', owner: 'Enterprise', value: 93, priority: 'high', notes: 'Enterprise controls passed review', createdAt: '2026-05-13' },
]

export const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Settings', href: '/dashboard/settings' },
]
