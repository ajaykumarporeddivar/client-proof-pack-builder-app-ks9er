export async function GET(): Promise<Response> {
  return Response.json({
    ok: true,
    version: '1.0.0',
    mode: 'demo',
    ts: Date.now(),
    features: ['dashboard', 'analytics', 'export'],
  })
}