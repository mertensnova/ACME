import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
   static async getInitialProps(ctx: any) {
      const initialProps = await Document.getInitialProps(ctx);
      return {
         ...initialProps,
         styles: React.Children.toArray([initialProps.styles]),
      };
   }

   render() {
      return (
         <Html lang="en">
            <Head>
               <meta name="description" content="Made by Amr Ashebo" />
               <link rel="icon" href="/acme.svg" />
            </Head>
            <body>
               <Main />
               <NextScript />
            </body>
         </Html>
      );
   }
}

export default MyDocument;
