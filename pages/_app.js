import { MoralisProvider } from "react-moralis";
import { AppProvider } from "../context/AppContext";
// import { useContext } from "react";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/root.scss";
import "../styles/styles.scss";

function Main({ Component, pageProps }) {
	return (
		<MoralisProvider
			appId={process.env.NEXT_PUBLIC_APP_ID}
			serverUrl={process.env.NEXT_PUBLIC_SERVER_URL}
		>
			<AppProvider>
				<Component {...pageProps} />
			</AppProvider>
		</MoralisProvider>
	);
}

export default Main;
