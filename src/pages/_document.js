import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          name="description"
          content="Fazzpay adalah aplikasi e-wallet yang aman dan mudah digunakan untuk berbagai kebutuhan finansial Anda."
        />
        <meta
          name="keywords"
          content="aplikasi e-wallet, Fazzpay, transaksi digital, keamanan finansial, kemudahan transaksi, mudah digunakan"
        />
        <link rel="canonical" href="https://fazzpay-next.vercel.app" />
        <link rel="icon" href="/digital-wallet.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,400;0,600;0,700;0,800;0,900;1,400;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.4/font/bootstrap-icons.css"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
