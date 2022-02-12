import { useMoralis } from "react-moralis";
import { useRouter } from "next/router";
import Loading from "components/Loading";
const mustBeUnauthed = (Component) => {
	const Unauthed = (props) => {
		const { isAuthenticated, isInitializing } = useMoralis();

		const router = useRouter();
		let description = "";
		let title = "";
		switch (router.pathname) {
			case "/connect":
				title = "Connect | Realm Hunter";
				description = "Join our Marketplace by connecting your wallet.";

			default:
				description = "Join our Marketplace by connecting your wallet.";
		}

		if (isInitializing) {
			return <Loading />;
		}
		// Login data added to props via redux-store (or use react context for example)
		if (!isInitializing) {
			// If user is not logged in, return login component
			if (isAuthenticated) {
				router.replace("/");
			} else {
				return <Component {...props} />;
			}
			// If user is logged in, return original component
		}
		return null;
	};

	// Copy getInitial props so it will run as well
	if (Component.getInitialProps) {
		Unauthed.getInitialProps = Component.getInitialProps;
	}

	return Unauthed;
};

export default mustBeUnauthed;
