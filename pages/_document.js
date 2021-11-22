import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={`/favicons/${2}/apple-touch-icon.png`}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href={`/favicons/${2}/favicon-32x32.png`}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href={`/favicons/${2}/favicon-16x16.png`}
          />
          <link rel="manifest" href={`/favicons/${2}/site.webmanifest`} />
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
