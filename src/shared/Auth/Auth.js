import Auth from '@aws-amplify/auth';
import { ENV } from '../../environment';

Auth.configure({
  aws_cognito_identity_pool_id: ENV.COGNITO_IDENTITY_POOL,
  aws_cognito_region: ENV.REGION,
  aws_sign_in_enabled: 'enable',
  aws_user_pools: 'enable',
  aws_user_pools_id: ENV.COGNITO_USERPOOL,
  aws_user_pools_mfa_type: 'ON',
  aws_user_pools_web_client_id: ENV.COGNITO_CLIENT,
});

export default Auth;
