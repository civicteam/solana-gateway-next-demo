'use client'

import { GatewayProvider } from "@civic/solana-gateway-react"
import React, { FC, PropsWithChildren } from "react";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import {PublicKey} from "@solana/web3.js";

export const UNIQUENESS_PASS = new PublicKey("uniqobk8oGh4XBLMqM68K8M2zNu3CdYX7q5go7whQiv")

export const CivicPassProvider: FC<PropsWithChildren> = ({ children }) => {
  const wallet = useAnchorWallet();
  const { connection } = useConnection();

  return <GatewayProvider
    wallet={wallet}
    connection={connection}
    gatekeeperNetwork={UNIQUENESS_PASS}
  >
    {children}
  </GatewayProvider>;
}