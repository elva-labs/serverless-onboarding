import { StackContext, Api, use } from 'sst/constructs';
import { ImageTransformationStack } from './storageTransformationStack';

export function API({ stack }: StackContext) {
  const { originalImageBucket, transformedImageBucket } = use(
    ImageTransformationStack,
  );

  const api = new Api(stack, 'transformationAPI', {
    routes: {
      'PUT        /images': 'src/functions/upload.main',
      'GET        /images/{id}': 'src/functions/read.main',
      'DELETE     /images/{id}': 'src/functions/delete.main',
    },

    defaults: {
      function: {
        bind: [originalImageBucket, transformedImageBucket],
      },
    },
  });

  stack.addOutputs({
    EndPoint: api.url,
  });

  return {
    apiEndpoint: api.url,
  };
}
