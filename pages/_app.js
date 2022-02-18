import Router from "next/router";

import { MoralisProvider } from "react-moralis";
import { AppProvider } from "../context/AppContext";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
// import { useContext } from "react";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/root.scss";
import "../styles/styles.scss";

function Main({ Component, pageProps }) {
	NProgress.configure({
		minimum: 0.3,
		easing: "ease",
		speed: 350,

		showSpinner: false,
	});
	Router.events.on("routeChangeStart", () => NProgress.start());
	Router.events.on("routeChangeComplete", () => NProgress.done());
	Router.events.on("routeChangeError", () => NProgress.done());
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
