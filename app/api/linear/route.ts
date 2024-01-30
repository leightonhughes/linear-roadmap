import { NextApiRequest, NextApiResponse } from 'next';
import { LinearClient } from '@linear/sdk';

export default async function linearWebhookHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Initialize the Linear client
  const linearClient = new LinearClient({ apiKey: process.env.LINEAR_API_KEY });

  try {
    // Fetch the updated data from Linear
    const updatedProjects = await linearClient.projects();
    
    // Trigger a re-render by sending the updated data to the client
    res.status(200).json({ issue: updatedProjects });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the updated data' });
  }
}