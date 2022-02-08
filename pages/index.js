import { useContext, useEffect } from "react";
import { useMoralis } from "react-moralis";
import AppContext from "context/AppContext";
import Layout from "components/Layout";

export default function Home() {
	const { authenticate, isAuthenticated, logout } = useMoralis();
	const { web3 } = useContext(AppContext);

	useEffect(() => {
		console.log(web3);
	}, [web3]);

	return <Layout></Layout>;
}
