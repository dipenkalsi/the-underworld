import '../styles/globals.css'
import { ThirdwebProvider , ChainId } from "@thirdweb-dev/react";
import network from '../utils/network'
function MyApp({ Component, pageProps }) {
  return <ThirdwebProvider
  activeChain="goerli"
>
    <Component {...pageProps} />
    </ThirdwebProvider>
}

export default MyApp
