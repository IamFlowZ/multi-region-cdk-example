import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AppStack } from './app-stack/app-stack';

export class MultiRegionExampleStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const regions = ['us-east-1', 'eu-west-1'];

    // store the regional stacks in an object for debugging
    const regionalStacks = regions.reduce((accu, region) => {
      const regionalStack = new AppStack(this, region, {
        env: { region },
      });
      return { ...accu, [region]: regionalStack };
    }, {});
  }
}
