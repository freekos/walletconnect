"use client";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
import { ReactNode } from "react";

interface WalletModalProps {
	children: ReactNode;
}

const projectId = "YOUR_PROJECT_ID";

const mainnet = {
	chainId: 1,
	name: "Ethereum",
	currency: "ETH",
	explorerUrl: "https://etherscan.io",
	rpcUrl: "https://cloudflare-eth.com",
};

const metadata = {
	name: "WalletConnect + Effector Example",
	description: "My Website description",
	url: "https://mywebsite.com",
	icons: ["https://avatars.mywebsite.com/"],
};

createWeb3Modal({
	ethersConfig: defaultConfig({ metadata }),
	chains: [mainnet],
	projectId,
});

export function WalletModal(props: WalletModalProps) {
	const { children } = props;
	// useEffect(() => {}, []);

	return <>{children}</>;
}
