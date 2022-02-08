import { MoralisProvider } from "react-moralis";
import AppContext, { AppProvider } from "../context/AppContext";
import { useContext } from "react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
	return (
		<AppProvider>
			<MainApp Component={Component} pageProps={pageProps} />
		</AppProvider>
	);
}

function MainApp({ Component, pageProps }) {
	const { web3Loading } = useContext(AppContext);

	return (
		<MoralisProvider
			appId={process.env.NEXT_PUBLIC_APP_ID}
			serverUrl={process.env.NEXT_PUBLIC_SERVER_URL}
		>
			{!web3Loading ? <Component {...pageProps} /> : "loading..."}
		</MoralisProvider>
	);
}

export default MyApp;
