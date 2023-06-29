'use client'

import React, {useMemo} from "react";
import {
    ConnectionProvider,
    WalletProvider
} from "@solana/wallet-adapter-react";
import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { BackpackWalletAdapter, PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets";
import {CivicPassProvider} from "@/app/CivicPassContext";
import {useGateway, IdentityButton, GatewayStatus} from "@civic/solana-gateway-react";
import {WalletAdapterNetwork} from "@solana/wallet-adapter-base";
import {clusterApiUrl} from "@solana/web3.js";

require('@solana/wallet-adapter-react-ui/styles.css');

const Content = () => {
    const { gatewayStatus, gatewayToken } = useGateway();

    return (<div>
        <h1>Gateway Status: { gatewayStatus }</h1>
        <IdentityButton />
    </div>)
}

export default function Home() {
    const network = WalletAdapterNetwork.Devnet;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter(),
            new BackpackWalletAdapter(),
        ],
        []
    );

    return (
        <div className="App">
            <ConnectionProvider endpoint={endpoint}>
                <WalletProvider wallets={wallets} autoConnect>
                    <WalletModalProvider>
                        <CivicPassProvider>
                            <WalletMultiButton />
                            <Content />
                        </CivicPassProvider>
                    </WalletModalProvider>
                </WalletProvider>
            </ConnectionProvider>
        </div>
    );
}
