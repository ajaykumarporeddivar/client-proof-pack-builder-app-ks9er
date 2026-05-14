import { BarChart, Sparkline } from '@/components/charts'
import { Card, StatCard, Table } from '@/components/ui'
import { metrics, records } from '@/lib/data'
import { formatCurrency } from '@/lib/utils'

export default function DashboardPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-zinc-500">Operations</p>
        <h1 className="mt-1 text-3xl font-black text-zinc-950">Dashboard</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {metrics.map(metric => (
          <StatCard key={metric.id} label={metric.label} value={metric.id === 'revenue' ? formatCurrency(metric.value) : metric.value} detail={`${metric.change}% change`} />
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <Card>
          <h2 className="font-bold text-zinc-950">Performance</h2>
          <div className="mt-4"><BarChart /></div>
        </Card>
        <Card>
          <h2 className="font-bold text-zinc-950">Trend</h2>
          <div className="mt-4 text-zinc-900"><Sparkline /></div>
        </Card>
      </div>
      <Card>
        <h2 className="font-bold text-zinc-950">Recent records</h2>
        <Table className="mt-4">
          <tbody>
            {records.map(record => (
              <tr key={record.id} className="border-t border-zinc-100">
                <td className="py-3 font-medium text-zinc-950">{record.name}</td>
                <td className="py-3 text-zinc-500">{record.owner}</td>
                <td className="py-3 text-zinc-500">{record.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  )
}
