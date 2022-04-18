import Image from "next/image";
import React from "react";
import { Accordion } from "react-bootstrap";
import { Element } from "react-scroll";
import styled from "styled-components";
import AccordionCustom from "./AccordionCustom";
import TextScrollTo from "./TextScrollTo";
import TitleFaqList from "./TitleFaqList";
import { HeadingXXS } from "components/Typography/Headings";
import { TextSecondary } from "components/Typography/Texts";

const FaqContainer = () => {
	return (
		<Wrapper className="px-3 mx-auto">
			<div className="text-center">
				<Image src="/images/logo.png" width={69.29} height={77.12} />

				<div className="text-start my-4">
					<TitleHeader as="h1" className="text-secondary mb-2">
						FAQ
					</TitleHeader>

					<DescriptionHeader>
						Note: Most of the questions below will redirect you to the Litepaper
						since we have most of the questions answered there. For the ones
						that haven’t been added, we will answer it below.
					</DescriptionHeader>
				</div>
			</div>

			<TitleNav className="mb-3">Quick Access</TitleNav>

			<ListNav>
				<Item>
					<TextScrollTo text="Product" to="product" duration={100} />
				</Item>

				<Item>
					<TextScrollTo text="Realm Hunter" to="realm" duration={100} />
				</Item>

				<Item>
					<TextScrollTo text="NBMons" to="nbmon" duration={100} />
				</Item>

				<Item>
					<TextScrollTo text="Token-related" to="token" duration={100} />
				</Item>
			</ListNav>

			<FaqContent>
				<Element name="product" className="mb-5 element">
					<TitleFaqList>Product FAQ</TitleFaqList>

					<Accordion defaultActiveKey="0">
						<AccordionCustom
							classesWrap="mb-3"
							eventKey="0"
							title="What is Not Boring Company?"
							description="Not Boring Company is a Metaverse startup, intending to become the Disney of Web3 by developing our IPs and franchise over a global scale and aiming to build the NBVerse - which is our version of a hyper second reality - where 1 billion people can live, work and play over the next few decades."
						/>

						<AccordionCustom
							classesWrap="mb-3"
							eventKey="1"
							title="What is Realm Hunter?"
							description="Realm Hunter is our flagship project. It is a quest-based, semi open world RPG play AND earn (we emphasize heavily on the “AND”) experience inspired from the likes of Pokemon and Genshin Impact. Venture across beautifully crafted yet mysterious realms with your companions (called NBMons) in search of treasures and riches. But, will you be worthy enough to convince the NBMons to bond and form a contract with you? Only one way to find out."
						/>
					</Accordion>
				</Element>

				<Element name="realm" className="mb-5 element">
					<TitleFaqList>Realm Hunter FAQ</TitleFaqList>

					<Accordion defaultActiveKey="0">
						<AccordionCustom
							classesWrap="mb-3"
							eventKey="0"
							title="What can you do in Realm Hunter?"
							description="Please refer to https://litepaper.nbcompany.io/games/realm-hunter/what-can-you-do-in-realm-hunter."
						/>

						<AccordionCustom
							classesWrap="mb-3"
							eventKey="1"
							title="What kinds of Realms are there?"
							description="Please refer to https://litepaper.nbcompany.io/games/realm-hunter/realms"
						/>

						<AccordionCustom
							classesWrap="mb-3"
							eventKey="2"
							title="Will there be rewards?"
							description="You bet. But before you can even think of the rewards, you need to endure the danger, challenges and opportunity costs that lie upon you in each Realm. Ready? Learn more here: https://litepaper.nbcompany.io/games/realm-hunter/realms/hunt-the-prize and https://app.gitbook.com/s/-MeF0x_3CbRejVJTOQTW/games/realm-hunter/earning-in-realm-hunter"
						/>

						<AccordionCustom
							classesWrap="mb-3"
							eventKey="3"
							title="Will Realm Hunter be singleplayer or multiplayer?"
							description="The majority of the game is quest-based and thus requires single-player, but also can be done in the form of co-op. Multiplayer will only exist in PVP and tournament modes. Learn more here: https://litepaper.nbcompany.io/games/realm-hunter/pvp-and-tournaments"
						/>

						<AccordionCustom
							classesWrap="mb-3"
							eventKey="4"
							title="Are there any limitations to how long I can play the game each day?"
							description="We are currently implementing an energy-based system for this. You will be required to spend energy on certain activities: such as (but not limited to, especially since we are expending our game mechanics): capturing wild NBMons, battling NBMons, journeying through Realms. The exact amount and usage of energy are still being debated."
						/>

						<AccordionCustom
							classesWrap="mb-3"
							eventKey="5"
							title="Will Realm Hunter be free to play or do I need to purchase something?"
							description="This is still under heavy discussion. We want the free-to-play (F2P) community to enjoy our game without spending a single penny. However, bear in mind that if we do allow the F2P aspect, this will be with special restrictions (not necessarily a bad connotation). For instance: limited rewards, a separate server for F2P members etc. We have seen some projects trying to combine F2P and pay-to-play and they have not gone well. We don’t want the same to happen with our community and create a bad sentiment since we care about each and every one of you. We’ll tread carefully with this topic and will announce this clearly once fully debated."
						/>

						<AccordionCustom
							classesWrap="mb-3"
							eventKey="6"
							title="When is Realm Hunter coming out?"
							description={`We are aiming to release a private alpha around Q3 2022. This will be a closed alpha and only a select amount of people will be able to participate. This includes people who own a specific role in our Discord, whitelisted people, people who own our Genesis collection and so on. A more specific requirement will be announced later on.

Our public alpha is expected to release late Q4 2022 or early Q1 2023. This version will allow everyone to play the game, whether whitelisted or not.

For a more detailed description of our plans, please refer to our Roadmap (https://litepaper.nbcompany.io/roadmap).
`}
						/>
					</Accordion>
				</Element>

				<Element name="nbmon" className="mb-5 element">
					<TitleFaqList>NBMon FAQ</TitleFaqList>

					<Accordion defaultActiveKey="0">
						<AccordionCustom
							classesWrap="mb-3"
							eventKey="0"
							title="What are NBMons?"
							description="Please refer to https://litepaper.nbcompany.io/games/realm-hunter/nbmons"
						/>

						<AccordionCustom
							classesWrap="mb-3"
							eventKey="1"
							title="How many NBMons will there be on the first release?"
							description="We are expecting around 40-50 NBMons (a mixture of wild and origins. Please refer to Species to learn more). We will release more NBMons with upcoming patches/updates."
						/>

						<AccordionCustom
							classesWrap="mb-3"
							eventKey="2"
							title="What are the different species of NBMons?"
							description="Please refer to https://litepaper.nbcompany.io/games/realm-hunter/nbmons/species"
						/>

						<AccordionCustom
							classesWrap="mb-3"
							eventKey="3"
							title="What are the different Genera of NBMons?"
							description="Please refer to https://litepaper.nbcompany.io/games/realm-hunter/nbmons/genera. Fun fact: Genera is the plural of Genus. Don’t be confused!"
						/>

						<AccordionCustom
							classesWrap="mb-3"
							eventKey="4"
							title="What are the different rarities of NBMons?"
							description="Please refer to https://app.gitbook.com/s/-MeF0x_3CbRejVJTOQTW/games/realm-hunter/nbmons/rarities. The higher the rarity, the lower the fertility deduction and the higher the chance to get better potential."
						/>

						<AccordionCustom
							classesWrap="mb-3"
							eventKey="5"
							title="What is Effort and Potential?"
							description="Please refer to https://litepaper.nbcompany.io/games/realm-hunter/nbmons/effort-and-potential"
						/>

						<AccordionCustom
							classesWrap="mb-3"
							eventKey="6"
							title="Does each NBMon have different move sets?"
							description="Move sets are native to an NBMon’s genus (visit What are the different Genera of NBMons?). When bred, you are able to inherit another parent’s move set which is not native to the offspring’s move set. Please refer to https://litepaper.nbcompany.io/games/realm-hunter/nbmons/movesets-and-passives for more info."
						/>

						<AccordionCustom
							classesWrap="mb-3"
							eventKey="7"
							title="What are passives?"
							description="Passives are additional bonuses that your team can stack and carry into battles to provide an advantage (or disadvantage, depending on the passives) to your team. Please refer to https://app.gitbook.com/s/-MeF0x_3CbRejVJTOQTW/games/realm-hunter/nbmons/movesets-and-passives for more info."
						/>

						<AccordionCustom
							classesWrap="mb-3"
							eventKey="8"
							title="What is breeding?"
							description="Breeding refers to two NBMons (male and female) giving birth to an offspring NBMon. The offspring will always follow the female parent’s genus. Please refer to https://app.gitbook.com/s/-MeF0x_3CbRejVJTOQTW/games/realm-hunter/nbmons/breeding-and-fertility for more info."
						/>

						<AccordionCustom
							classesWrap="mb-3"
							eventKey="9"
							title="What is fertility?"
							description="A freshly minted NBMon (not by breeding) will have maximum fertility (3000). Whenever you breed this NBMon, the fertility points will reduce depending on the rarity of the NBMon. Please refer to https://app.gitbook.com/s/-MeF0x_3CbRejVJTOQTW/games/realm-hunter/nbmons/breeding-and-fertility for more info."
						/>

						<AccordionCustom
							classesWrap="mb-3"
							eventKey="10"
							title="What is the role of Artifacts when breeding?"
							description="This has not been implemented yet with the current mechanic, however certain Artifacts will give boosts during breeding. For instance, you would have a chance to get a perfect stat in one of the potentials, or a higher chance to get a higher rarity. Either way, Artifacts will play a huge role when breeding, so do keep an eye out to get one!"
						/>
					</Accordion>
				</Element>

				<Element name="token" className="mb-5 element">
					<TitleFaqList>Token-related FAQ</TitleFaqList>

					<Accordion defaultActiveKey="0">
						<AccordionCustom
							classesWrap="mb-3"
							eventKey="0"
							title="What is $NBC (NBCoin)?"
							description="Please refer to https://litepaper.nbcompany.io/products/tokens/nbcoin-nbc"
						/>

						<AccordionCustom
							classesWrap="mb-3"
							eventKey="1"
							title="What is $REC (Realm Coin)?"
							description="Please refer to https://litepaper.nbcompany.io/products/tokens/realm-ip/realm-coin-rec"
						/>

						<AccordionCustom
							classesWrap="mb-3"
							eventKey="2"
							title="What is $RES (Realm Shards)?"
							description="Please refer to https://litepaper.nbcompany.io/products/tokens/realm-ip/realmshards-res"
						/>

						<AccordionCustom
							classesWrap="mb-3"
							eventKey="3"
							title="Is there any form of community treasury/bank?"
							description="Please refer to https://litepaper.nbcompany.io/products/nbexchequer."
						/>
					</Accordion>
				</Element>
			</FaqContent>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	max-width: 720px;
	width: 100%;
	margin-top: 80px;
	margin-bottom: 80px;
`;

const TitleHeader = styled(HeadingXXS)`
	font-weight: 700;
	font-size: 28px;
	line-height: 36px;
	text-align: center;
	text-align: left;
`;

const DescriptionHeader = styled(TextSecondary)`
	font-weight: 500;
	font-size: 16px;
	line-height: 20px;
	display: flex;
	align-items: center;
	letter-spacing: 0.1px;
	color: #bfc9c2;
`;

const TitleNav = styled(TextSecondary)`
	font-weight: 400;
	line-height: 24px;
	letter-spacing: 0.5px;
	color: #bfc9c2;
	text-align: center;
`;

const ListNav = styled.ul`
	list-style: none;
	padding: 0 !important;
	margin: 0 !important;
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
`;

const Item = styled.li`
	flex: 0 1 auto;
	padding: 0 15px 8px 15px;
`;

const FaqContent = styled.div`
	margin-top: 48px;
`;

export default FaqContainer;
