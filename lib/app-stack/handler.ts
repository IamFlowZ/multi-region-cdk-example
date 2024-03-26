import { Context } from 'aws-lambda';

export const handler = async (event: any = {}, context: Context): Promise<any> => {
  console.log('event', event);
  return {
    message: `Hello from ${process.env.AWS_REGION}!`
  };
}