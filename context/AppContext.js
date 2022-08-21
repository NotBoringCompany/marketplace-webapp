import { createContext, useEffect, useState } from "react";
import { useMoralis, useChain } from "react-moralis";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import SetupModal from "components/Modal/SetupModal";
import WrongNetwork from "components/Modal/WrongNetwork";
import NoMetaMask from "components/Modal/NoMetaMask";
import SwitchModal from "components/NewModal/SwitchModal";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
	const router = useRouter();
	const [showSetupModal, setShowSetupModal] = useState(false);
	const [showWrongNetworkModal, setShowWrongNetworkModal] = useState(false);
	const [showModalNoMM, setShowModalNoMM] = useState(false);
	const [justHatchedNBMon, setJustHatchedNBMon] = useState(null);

	const [switchModal, setSwitchModal] = useState({
		show: false,
		content: "",
	});

	const { isAuthenticated, isWeb3Enabled, enableWeb3, user, logout } =
		useMoralis();
	const { chainId, chain } = useChain();

	const statesModalSetup = {
		getter: showSetupModal,
		setter: setShowSetupModal,
	}; // getter + setter
	const statesModalNoMM = { getter: showModalNoMM, setter: setShowModalNoMM }; // getter + setter

	const statesModalWrongNetwork = {
		getter: showWrongNetworkModal,
		setter: setShowWrongNetworkModal,
	};

	const statesSwitchModal = { getter: switchModal, setter: setSwitchModal };

	const statesJustHatched = {
		getter: justHatchedNBMon,
		setter: setJustHatchedNBMon,
	};

	const addUserDataMutation = useMutation(
		(data) =>
			fetch(`${process.env.NEXT_PUBLIC_NEW_REST_API_URL}/account/addUserData`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}),
		{
			retry: 0,
		}
	);

	useEffect(() => {
		if (window.ethereum)
			window.ethereum.on("accountsChanged", function (accounts) {
				if (isAuthenticated && user && accounts && accounts[0]) {
					console.log("Connected as:", user && user.attributes.ethAddress);
					console.log("Metamask picked:", accounts[0]);
					if (
						user.attributes.ethAddress &&
						user.attributes.ethAddress.toLowerCase() !==
							accounts[0].toLowerCase()
					) {
						logout();
						window && window.location.reload();
					} else {
						window && window.location.reload();
					}
				}
				if (accounts.length === 0) window && window.location.reload();
			});
		if (user && isAuthenticated) {
			addUserDataMutation.mutate({ objId: user.id, playfabId: "" });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuthenticated, user]);

	useEffect(() => {
		setTimeout(() => {
			enableWeb3({ provider: "metamask" });
		}, 100);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isWeb3Enabled, isAuthenticated]);

	useEffect(() => {
		setSwitchModal({ ...switchModal, show: false });
		if (isAuthenticated && user && !user.attributes.email)
			setShowSetupModal(true);

		if (chainId && chainId !== process.env.NEXT_PUBLIC_CHAIN_ID) {
			setShowWrongNetworkModal(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuthenticated, router.pathname, chainId]);

	useEffect(() => {
		if (isWeb3Enabled) {
			if (chainId && chainId !== process.env.NEXT_PUBLIC_CHAIN_ID) {
				setShowWrongNetworkModal(true);
			}
		}
	}, [chainId, chain, isWeb3Enabled]);

	return (
		<AppContext.Provider
			value={{
				showWrongNetworkModal,
				setShowWrongNetworkModal,
				setShowModalNoMM,
				statesSwitchModal,
				statesJustHatched,
			}}
		>
			<SetupModal stateUtils={statesModalSetup} />
			<WrongNetwork stateUtils={statesModalWrongNetwork} />
			<NoMetaMask stateUtils={statesModalNoMM} />
			<SwitchModal stateUtils={statesSwitchModal} />

			{children}
		</AppContext.Provider>
	);
};

export default AppContext;
