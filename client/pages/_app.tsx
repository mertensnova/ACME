import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        {/* <Hydrate state={pageProps.dehydratedState}> */}
          <Component {...pageProps} />
        {/* </Hydrate> */}
      </NextUIProvider>
    </QueryClientProvider>
  );
}
