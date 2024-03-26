import { Stack, StackProps, CfnOutput, Environment } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as nodeLambda from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

export class AppStack extends Stack {
  theLambda: nodeLambda.NodejsFunction;

  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const env = props.env as Environment;

    this.theLambda = new nodeLambda.NodejsFunction(this, `${env.region}AppStackLambda`, {
      entry: 'lib/app-stack/handler.ts',
      handler: 'handler',
    });

    const fnUrl = this.theLambda.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });

    new CfnOutput(this, `${env.region}LambdaUrl`, {
      value: fnUrl.url,
    });
  };
}