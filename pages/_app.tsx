import "@/styles/globals.css";
import type { AppProps } from "next/app";
import localFont from "next/font/local";
import darkTheme from "@/theme/theme";
import { ThemeProvider, CssBaseline } from "@mui/material";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  weight: "100 900",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  weight: "100 900",
  variable: "--font-geist-mono",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main className={`${geistSans.variable} ${geistMono.variable}`}>
        <Component {...pageProps} />
      </main>
    </ThemeProvider>
  );
}
