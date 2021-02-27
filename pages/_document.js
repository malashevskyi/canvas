import Document, {
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head></Head>
        <body>
          <div className="container">
            <canvas id="canvas"></canvas>
          </div>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
