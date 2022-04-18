import Layout from "components/Layout";
import OverviewContainer from "components/OverviewContainer";
import React from "react";
import mustBeAuthed from "utils/mustBeAuthed";

const OverviewPage = () => {
	return (
		<Layout>
			<OverviewContainer />
		</Layout>
	);
};

export default mustBeAuthed(OverviewPage);