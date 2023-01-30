import { AppProps } from "next/app"
import { globalStyles } from "../styles/global"
import LogoImg from '../assets/ntn-blog.png'
import { Container, Header } from "../styles/pages/app";
import Image from "next/image";

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (<Container>
    <Header>
      <Image src={LogoImg} width={70} alt="Logo NTN Store" />
    </Header>
    <Component {...pageProps} />
  </Container>
  );
}