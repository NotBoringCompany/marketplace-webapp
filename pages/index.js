import { useEffect } from "react";
import { useMoralis, useWeb3Contract, useWeb3Transfer } from "react-moralis";
import Web3 from "web3";

import Image from "react-bootstrap/Image";
import Layout from "components/Layout";
import styled from "styled-components";
import { useRouter } from "next/router";
import Loading from "components/Loading";
import { HeadingMD } from "components/Typography/Headings";
import MetamaskButton from "components/Buttons/MetamaskButton";
import MintingGenesis from "../abis/MintingGenesis.json";

const GENESIS_CONTRACT_ADDRESS_ETH =
	"0xc62620D685e08BaEB324D6EBAfB3dba1d333932c";

const StyledContainer = styled.video`
	position: fixed;
	right: 0;
	bottom: 0;
	min-width: 100%;
	min-height: 100%;
`;

const ContentContainer = styled.div`
	position: fixed;
	top: 113px;
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: center;
	padding: 20px;
`;

const StyledHeadingMD = styled(HeadingMD)`
	& span.skinny {
		font-weight: lighter;
	}
	font-size: 38px;
`;

export default function Home() {
	const { isAuthenticated, user, isInitializing, Moralis } = useMoralis();
	const router = useRouter();

	// const { data, error, runContractFunction, isFetching, isLoading } =
	// 	useWeb3Contract({
	// 		abi: MintingGenesis,
	// 		contractAddress: GENESIS_CONTRACT_ADDRESS_ETH,
	// 		functionName: "whitelistedGenesisEggMint",
	// 		params: {
	// 			_owner: user && user.attributes.ethAddress,
	// 			_amountToMint: 1,
	// 			_hatchingDuration: 300,
	// 			_nbmonStats: [],
	// 			_types: [],
	// 			_potential: [],
	// 			_passives: [],
	// 			_isEgg: true,
	// 		},
	// 	});

	// const trf = useWeb3Transfer({
	// 	amount: Moralis.Units.ETH(0.08),
	// 	receiver: "0x5fa5c1998d4c11f59c17FDE8b3f07588C23837D5",
	// 	type: "native",
	// });

	// const fn = async () => {
	// 	await Moralis.enableWeb3();

	// 	const web3 = new Web3(Moralis.provider);

	// 	const contract = new web3.eth.Contract(
	// 		MintingGenesis,
	// 		GENESIS_CONTRACT_ADDRESS_ETH
	// 	);

	// 	const pvtKey =
	// 		"55c0ee6d4551520e4acf662f024579dae542b9d459dcdf8cc6b21ec98a970524";

	// 	const account = web3.eth.accounts.privateKeyToAccount(pvtKey).address;

	// 	const transaction = contract.methods.whitelistedGenesisEggMint(
	// 		"0xda6FCd7aF0E44E5d301dF3e7720a5281BBECCb2A", // dog's wallet address
	// 		1,
	// 		300,
	// 		[],
	// 		[],
	// 		[],
	// 		[],
	// 		true
	// 	);

	// 	const options = {
	// 		to: "0xda6FCd7aF0E44E5d301dF3e7720a5281BBECCb2A",
	// 		data: transaction.encodeABI(),
	// 		gas: 1000000,
	// 	};
	// 	const signed = await web3.eth.accounts.signTransaction(options, pvtKey);
	// 	console.log("signed,,", signed);
	// 	const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);
	// 	console.log("RECEIPT", receipt);
	// };

	// const fn = async () => {
	// 	await Moralis.enableWeb3();

	// 	const web3 = new Web3(Moralis.provider);

	// 	const mintingGenesisContract = new web3.eth.Contract(
	// 		MintingGenesis,
	// 		GENESIS_CONTRACT_ADDRESS_ETH
	// 	);

	// 	const whiteListedEggMint =
	// 		mintingGenesisContract.methods.whitelistedGenesisEggMint(
	// 			"0x6ef0f724e780E5D3aD66f2A4FCbEF64A774eA796", // dog's wallet address
	// 			1,
	// 			300,
	// 			[],
	// 			[],
	// 			[],
	// 			[],
	// 			true
	// 		);

	// 	const encodedABI = whiteListedEggMint.encodeABI();

	// 	const tx = {
	// 		chainId: "4",
	// 		to: "0x6ef0f724e780E5D3aD66f2A4FCbEF64A774eA796",
	// 		data: encodedABI,
	// 		from: "0x5fa5c1998d4c11f59c17FDE8b3f07588C23837D5",
	// 		gas: 3000000,
	// 	};

	// 	const signedTx = await web3.eth.accounts.signTransaction(
	// 		tx,
	// 		"55c0ee6d4551520e4acf662f024579dae542b9d459dcdf8cc6b21ec98a970524",
	// 		(e) => {
	// 			console.log(e);
	// 		}
	// 	);

	// 	console.log(signedTx);
	// };

	// useEffect(() => {
	// 	if (trf.data) {
	// 		const x = trf.data.wait();
	// 		x.then((r) => {
	// 			console.log("RES", r);
	// 		});
	// 	}
	// }, [trf]);

	// console.log(trf.error && trf.error);
	// console.log(trf.data && trf.data);

	// useEffect(() => {
	// 	if (isAuthenticated) {
	// 		router.push("/nbmons");
	// 	} else {
	// 		router.push("/connect");
	// 	}
	// }, [isAuthenticated]);

	return (
		<Layout>
			{!isInitializing && (
				<StyledContainer loop muted>
					<source
						src="https://uploads-ssl.webflow.com/6186cb7acaa11f0e5fecf726/6186cc609578c419bfb5f681_Realm%20Hunter%20Town-transcode.mp4"
						type="video/mp4"
					/>
				</StyledContainer>
			)}

			<ContentContainer>
				{!isInitializing ? (
					<>
						<Image
							src={"./images/rh_logo2.png"}
							alt="logo"
							width={360}
							height={260}
						/>
						<StyledHeadingMD className="text-white mt-1 mb-4">
							<span className="skinny">
								Genesis NBMon egg minting starts on
							</span>{" "}
							April 22, 4PM UTC
						</StyledHeadingMD>
						{/* 
						{user && (
							<>
								<button
									onClick={() => {
										trf.fetch();
									}}
									disabled={trf.isFetching}
								>
									transfer
								</button>

								<button onClick={fn}>sign tx</button>
							</>
						)} */}
						{!isAuthenticated && <MetamaskButton big />}
					</>
				) : (
					<Loading />
				)}
			</ContentContainer>
		</Layout>
	);
}
