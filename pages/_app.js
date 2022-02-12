import { MoralisProvider } from "react-moralis";
import { AppProvider } from "../context/AppContext";
// import { useContext } from "react";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/root.scss";
import "../styles/styles.scss";

function MyApp({ Component, pageProps }) {
	return (
		<AppProvider>
			<MainApp Component={Component} pageProps={pageProps} />
		</AppProvider>
	);
}

function MainApp({ Component, pageProps }) {
	// const { web3Loading } = useContext(AppContext);

	return (
		<MoralisProvider
			appId={process.env.NEXT_PUBLIC_APP_ID}
			serverUrl={process.env.NEXT_PUBLIC_SERVER_URL}
		>
			<Component {...pageProps} />
		</MoralisProvider>
	);
}

export default MyApp;
