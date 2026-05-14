import { type NextRequest } from 'next/server'
import {
  MOCK_CLIENTS,
  MOCK_CAMPAIGNS,
  MOCK_PROOF_PACKS,
  MOCK_REPORT_ITEMS,
  STATS,
  type Client,
  type Campaign,
  type ProofPack,
  type ReportItem,
} from '@/lib/data'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function GET(): Promise<Response> {
  const data = {
    clients: MOCK_CLIENTS,
    campaigns: MOCK_CAMPAIGNS,
    proofPacks: MOCK_PROOF_PACKS,
    reportItems: MOCK_REPORT_ITEMS,
    stats: STATS,
    totalClients: MOCK_CLIENTS.length,
    totalCampaigns: MOCK_CAMPAIGNS.length,
    totalProofPacks: MOCK_PROOF_PACKS.length,
    totalReportItems: MOCK_REPORT_ITEMS.length,
  }

  return Response.json({ ok: true, data }, { headers: CORS_HEADERS })
}

export async function POST(request: NextRequest): Promise<Response> {
  let body: unknown
  try {
    body = await request.json()
  } catch (error) {
    body = { error: 'Invalid JSON body' }
  }

  return Response.json(
    {
      ok: true,
      message: 'Demo mode — data not persisted',
      received: body,
    },
    { headers: CORS_HEADERS },
  )
}

export async function OPTIONS(): Promise<Response> {
  return new Response(null, { status: 200, headers: CORS_HEADERS })
}