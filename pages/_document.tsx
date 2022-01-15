import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <title>Canvas animations</title>
          <meta name="keywords" content="Canvas, animation" />
          <meta name="description" content="Canvas animations" />
          <meta property="og:title" content="Canvas animations" />
          <meta property="og:type" content="website" />
          <meta
            property="og:url"
            content="https://canvas-phi-fawn.vercel.app/"
          />
          <meta
            property="og:image"
            content="https://canvas-phi-fawn.vercel.app/images/main-og.jpg"
          />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:site_name" content="Canvas animations" />
          <meta property="og:description" content="Canvas animations" />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={`/favicons/apple-touch-icon.png`}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href={`/favicons/favicon-32x32.png`}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href={`/favicons/favicon-16x16.png`}
          />
          <link rel="manifest" href={`/favicons/site.webmanifest`} />
        </Head>
        <body>
          <div className="container">
            <canvas id="canvas" />
            <canvas id="canvasGL" />
          </div>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
