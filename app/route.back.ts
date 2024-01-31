import { NextApiRequest, NextApiResponse } from 'next';
import { LinearWebhooks, LINEAR_WEBHOOK_SIGNATURE_HEADER, LINEAR_WEBHOOK_TS_FIELD, LinearClient } from '@linear/sdk'

const webhookSecret = process.env.WEBHOOK_SECRET;
const webhookHandler = new LinearWebhooks(webhookSecret);
const linearClient = new LinearClient({
  apiKey: process.env.LINEAR_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Verify the webhook signature
      const signature = req.headers[LINEAR_WEBHOOK_SIGNATURE_HEADER.toLowerCase()] as string;
      const timestamp = req.body[LINEAR_WEBHOOK_TS_FIELD];
      const body = JSON.stringify(req.body);

      webhookHandler.verify(Buffer.from(body), signature, timestamp);

      // Handle the webhook event
      // Your logic here
      const projects = await linearClient.projects();
      const projectData = projects.nodes;

      res.status(200).json({ message: 'Webhook received and verified' });
    } catch (error) {
      console.error('Webhook verification failed', error);
      res.status(401).json({ message: 'Webhook verification failed' });
    }
  } else {
    // Handle any other HTTP methods
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}