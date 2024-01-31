import { NextResponse } from 'next/server'
import { LinearWebhooks, LINEAR_WEBHOOK_SIGNATURE_HEADER, LINEAR_WEBHOOK_TS_FIELD, LinearClient } from '@linear/sdk'

const webhookSecret = process.env.WEBHOOK_SECRET;
const webhookHandler = new LinearWebhooks(webhookSecret);
const linearClient = new LinearClient({
  apiKey: process.env.LINEAR_API_KEY,
});

export async function GET() {
  const data = await linearClient.projects();

  return NextResponse.json({
    data
  })
}

// export async function POST(request: Request) {
//   const data = await request.json();
//   return NextResponse.json({
//     data
//   });
// }