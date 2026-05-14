import { type NextRequest } from 'next/server'
import {
  MOCK_CLIENTS,
  MOCK_CAMPAIGNS,
  MOCK_PROOF_PACKS,
  MOCK_REPORT_ITEMS,
  type Client,
  type Campaign,
  type ProofPack,
  type ReportItem,
} from '@/lib/data'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

interface SearchableItem {
  id: string
  type: 'client' | 'campaign' | 'proofPack' | 'reportItem'
  name: string // Primary display name
  description?: string // Additional searchable text
  clientName?: string
  campaignName?: string
  proofPackTitle?: string
  fullSearchText: string
}

export async function GET(request: NextRequest): Promise<Response> {
  const { searchParams } = request.nextUrl
  const query = searchParams.get('q') || ''
  const typeFilter = searchParams.get('type')

  const lowerCaseQuery = query.toLowerCase()

  const allSearchableItems: SearchableItem[] = [
    ...MOCK_CLIENTS.map((item: Client) => ({
      id: item.id,
      type: 'client',
      name: item.name,
      fullSearchText: `${item.name} client`,
    })),
    ...MOCK_CAMPAIGNS.map((item: Campaign) => ({
      id: item.id,
      type: 'campaign',
      name: item.name,
      description: item.description,
      clientName: item.clientName,
      fullSearchText: `${item.name} ${item.description || ''} ${item.clientName} campaign`,
    })),
    ...MOCK_PROOF_PACKS.map((item: ProofPack) => ({
      id: item.id,
      type: 'proofPack',
      name: item.title,
      clientName: item.clientName,
      campaignName: item.campaignName,
      proofPackTitle: item.title,
      fullSearchText: `${item.title} ${item.clientName} ${item.campaignName || ''} proofpack`,
    })),
    ...MOCK_REPORT_ITEMS.map((item: ReportItem) => ({
      id: item.id,
      type: 'reportItem',
      name: item.name,
      fullSearchText: `${item.name} report item metric`,
    })),
  ]

  let results: SearchableItem[] = []

  if (lowerCaseQuery === '') {
    // If query is empty, return the first 5 items from all types
    results = allSearchableItems.slice(0, 5)
  } else {
    results = allSearchableItems.filter((item) => {
      const matchesQuery = item.fullSearchText.toLowerCase().includes(lowerCaseQuery)
      const matchesType = typeFilter ? item.type === typeFilter : true
      return matchesQuery && matchesType
    })
  }

  // Limit to a maximum of 20 results
  const limitedResults = results.slice(0, 20)

  return Response.json(
    {
      ok: true,
      data: {
        results: limitedResults,
        total: limitedResults.length,
        query: query,
        type: typeFilter,
      },
    },
    { headers: CORS_HEADERS },
  )
}

export async function OPTIONS(): Promise<Response> {
  return new Response(null, { status: 200, headers: CORS_HEADERS })
}