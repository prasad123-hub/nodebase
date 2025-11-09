import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import prisma from '@/lib/prisma';
import { inngest } from './client';

export const executeWorkflow = inngest.createFunction(
  { id: 'execute-workflow' },
  { event: 'workflow/execute' },
  async ({ event, step }) => {
    const { steps } = await step.ai.wrap('generate-answer', generateText, {
      model: google('gemini-2.5-flash'),
      prompt: 'What is 2+2?',
    });

    return { steps };
  },
);
