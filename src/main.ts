import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import Amplify, { Storage } from 'aws-amplify';
import amplify from './aws-exports';
import awsmobile from './aws-exports';
Amplify.configure(amplify);
Amplify.configure(awsmobile);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

  Amplify.configure({
    Auth: {
        identityPoolId: awsmobile.aws_cognito_identity_pool_id, //REQUIRED - Amazon Cognito Identity Pool ID
        region: awsmobile.aws_cognito_region, // REQUIRED - Amazon Cognito Region
        userPoolId: awsmobile.aws_user_pools_id, //OPTIONAL - Amazon Cognito User Pool ID
        userPoolWebClientId: awsmobile.aws_user_pools_web_client_id, //OPTIONAL - Amazon Cognito Web Client ID
    },
    Storage: {
        AWSS3: {
            bucket: awsmobile.aws_user_files_s3_bucket, //REQUIRED -  Amazon S3 bucket
            region: awsmobile.aws_user_files_s3_bucket_region, //OPTIONAL -  Amazon service region
        }
    }
});
