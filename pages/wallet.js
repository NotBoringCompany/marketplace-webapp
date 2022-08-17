import Layout from "components/Layout";
import React from "react";
import mustBeAuthed from "utils/mustBeAuthed";
import WalletContainer from "components/WalletContainer";

const Wallet = () => {
    return (
        <Layout>
            <WalletContainer/>
        </Layout>
    );
}

export default mustBeAuthed(Wallet);