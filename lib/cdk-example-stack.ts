import cdk = require('@aws-cdk/cdk');
import ec2 = require('@aws-cdk/aws-ec2');
import ecs = require('@aws-cdk/aws-ecs');

export class CdkExampleStack extends cdk.Stack {
  constructor(parent: cdk.App, name: string, props?: cdk.StackProps) {
    super(parent, name, props);

    // The code that defines your stack goes here
    const vpc = new ec2.VpcNetwork(this, 'MyVpc', {
      maxAZs: 3 // Default is all AZs in region
    });

    const cluster = new ecs.Cluster(this, 'MyCluster', {
      vpc: vpc
    });

    // Create a load-balanced Fargate service and make it public
    new ecs.LoadBalancedFargateService(this, 'MyFargateService', {
      cluster: cluster,  // Required
      cpu: '512', // Default is 256
      desiredCount: 6,  // Default is 1
      image: ecs.ContainerImage.fromDockerHub('amazon/amazon-ecs-sample'), // Required
      memoryMiB: '2048',  // Default is 512
      publicLoadBalancer: true  // Default is false
    });
  }
}
