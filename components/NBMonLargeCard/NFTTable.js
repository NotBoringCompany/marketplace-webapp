import React from "react";
import styled from "styled-components";
import { MainText } from "./Texts";
import Table from "react-bootstrap/Table";
import { mediaBreakpoint } from "utils/breakpoints";

const TableContainer = styled.div`
	& .table-responsive {
		padding: 8px;
		padding-bottom: 0;
		border-radius: 14px;
		overflow: hidden;
		width: 100%;
		background: linear-gradient(
				0deg,
				rgba(255, 255, 255, 0.17),
				rgba(255, 255, 255, 0.17)
			),
			linear-gradient(
				0deg,
				rgba(103, 219, 177, 0.01),
				rgba(103, 219, 177, 0.01)
			),
			#000000;
	}

	& .table-responsive .table-borderless {
		display: flex;
		flex-direction: column;
	}

	/* width */
	& ::-webkit-scrollbar {
		width: 10px;
	}

	/* Track */
	& ::-webkit-scrollbar-track {
		background: linear-gradient(
				0deg,
				rgba(255, 255, 255, 0.12),
				rgba(255, 255, 255, 0.12)
			),
			linear-gradient(
				0deg,
				rgba(103, 219, 177, 0.01),
				rgba(103, 219, 177, 0.01)
			),
			#000000;
		border-radius: 27px;
	}

	/* Handle */
	& ::-webkit-scrollbar-thumb {
		border: 1px solid #1f2020;
		background: linear-gradient(
				0deg,
				rgba(255, 255, 255, 0.23),
				rgba(255, 255, 255, 0.23)
			),
			linear-gradient(
				0deg,
				rgba(103, 219, 177, 0.01),
				rgba(103, 219, 177, 0.01)
			),
			#000000;
		border-radius: 4px;
	}

	/* Handle on hover */
	& ::-webkit-scrollbar-thumb:hover {
		background: linear-gradient(
				0deg,
				rgba(255, 255, 255, 0.23),
				rgba(255, 255, 255, 0.23)
			),
			linear-gradient(
				0deg,
				rgba(103, 219, 177, 0.01),
				rgba(103, 219, 177, 0.01)
			),
			#000000;
	}

	& .table-responsive table {
		max-height: 380px;
	}
	& tbody {
		margin-top: 8px;
		overflow: auto;
	}
	& tr {
		border: none;
	}

	& * {
		color: #fff;
	}

	& thead {
		border-bottom: 1px solid rgba(137, 147, 141, 0.16);
	}

	& tr {
		display: flex;
	}

	& tr th,
	& tr td {
		line-break: anywhere;
		margin: 0;
		width: calc(100% / 3);
		padding: 8px;
	}
	& tr th:first-child,
	& tr td:first-child {
		padding-left: 8px;
	}
`;

const TableHeaderText = styled.th`
	font-weight: 400;
	font-size: 14px;
	line-height: 16px;
	margin: 0;
	letter-spacing: 0.4px;
	color: #e1e3e0;
`;

const TimeText = styled.td`
	font-weight: 500;
	margin: 0;
	font-size: 11px;
	line-height: 16px;
	letter-spacing: 0.5px;
	& a {
		color: #bfc9c2;
	}

	& a:hover {
		color: #bfc9c2;
	}
`;

const TimeTextP = styled.p`
	font-weight: 500;
	margin: 0;
	font-size: 11px;
	line-height: 16px;
	letter-spacing: 0.5px;
	& a {
		color: #bfc9c2;
	}

	& a:hover {
		color: #bfc9c2;
	}
`;

const LinkText = styled(TimeText)`
	text-decoration: underline;
`;

const USDTextP = styled(TimeTextP)`
	font-size: 11px;
	color: #bfc9c2;
`;

const EmptyContainer = styled.div`
	width: 100%;
	border-radius: 14px;
	padding: 18px;
	background: linear-gradient(
			0deg,
			rgba(255, 255, 255, 0.17),
			rgba(255, 255, 255, 0.17)
		),
		linear-gradient(0deg, rgba(103, 219, 177, 0.01), rgba(103, 219, 177, 0.01)),
		#000000;

	text-align: center;
	font-weight: 400;
	font-size: 14px;
	line-height: 16px;
	margin: 0;
	letter-spacing: 0.4px;
	color: #e1e3e0;
`;
const LinkTextP = styled(TimeTextP)`
	text-decoration: underline;
`;
const OffersTable = ({ offers, userAddress }) => (
	<TableContainer className="w-100 d-flex">
		<Table borderless responsive>
			<thead>
				<tr>
					<TableHeaderText>Amount</TableHeaderText>
					<TableHeaderText>Address</TableHeaderText>
					<TableHeaderText>Time</TableHeaderText>
				</tr>
			</thead>
			<tbody>
				{[...offers].reverse().map((a) => (
					<tr key={a.id}>
						<td className="d-flex flex-column">
							<TimeTextP as="p">
								{a.price} {process.env.NEXT_PUBLIC_CURRENCY_NAME}
							</TimeTextP>
							<USDTextP as="p">~${a.usd}</USDTextP>
						</td>
						<LinkText className="text-center">
							<a
								href={`https://rinkeby.etherscan.io/tx/${a.txHash}`}
								target="_blank"
								rel="noreferrer noopener"
							>
								{a.address.toLowerCase() === userAddress
									? `You`
									: `...${a.address.split("").splice(-4).join("")}`}
							</a>
						</LinkText>
						<TimeText>{a.time}</TimeText>
					</tr>
				))}
			</tbody>
		</Table>
	</TableContainer>
);

const Activities = ({ activities }) => (
	<TableContainer className="w-100 d-flex">
		<Table borderless responsive>
			<thead>
				<tr>
					<TableHeaderText>Event</TableHeaderText>
					<TableHeaderText>Price</TableHeaderText>
					<TableHeaderText>Date</TableHeaderText>
				</tr>
			</thead>
			<tbody>
				{[...activities].reverse().map((a) => (
					<tr key={a.id}>
						<td className="d-flex flex-column">
							<LinkTextP className="text-start text-capitalize">
								<a
									href={`https://rinkeby.etherscan.io/tx/${a.txHash}`}
									target="_blank"
									rel="noreferrer noopener"
								>
									{a.event}
								</a>
							</LinkTextP>
						</td>
						<TimeText>
							{a.price === -1
								? `-`
								: `${a.price} ${process.env.NEXT_PUBLIC_CURRENCY_NAME}`}
						</TimeText>
						<TimeText>{a.time}</TimeText>
					</tr>
				))}
			</tbody>
		</Table>
	</TableContainer>
);

const NFTTable = ({ className, userAddress, data = [], type = "Offers" }) => {
	return (
		<div className={`d-flex flex-column ${className}`}>
			<MainText as="p" className="text-white text-start mb-2">
				{type}
			</MainText>

			{data.length ? (
				<>
					{type === "Offers" ? (
						<OffersTable offers={data} userAddress={userAddress} />
					) : (
						<Activities activities={data} userAddress={userAddress} />
					)}
				</>
			) : (
				<EmptyContainer>No {type} Yet</EmptyContainer>
			)}
		</div>
	);
};

export default NFTTable;
