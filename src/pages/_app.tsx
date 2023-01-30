import { AppProps } from "next/app"
import { globalStyles } from "../styles/global"
import LogoImg from '../assets/ntn-blog.png'
import { Container, Header } from "../styles/pages/app";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return 
  (<Container>
    <Header>
      <img src={LogoImg.src} alt="Logo NTN Store" />
    </Header>
    <Component {...pageProps} />
  </Container>);
}