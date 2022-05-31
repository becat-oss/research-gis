import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Amplify from 'aws-amplify';

Amplify.configure({
  aws_appsync_region: "ap-northeast-1", // Stack region
  aws_appsync_graphqlEndpoint: "https://hmvhhyra3fexhdvufvei2vadsy.appsync-api.ap-northeast-1.amazonaws.com/graphql", // AWS AppSync endpoint
  aws_appsync_authenticationType: "API_KEY", //Primary AWS AppSync authentication type
  aws_appsync_apiKey: "da2-mnp6xvhif5acflwzdrrsx4ftou" // AppSync API Key
});

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
