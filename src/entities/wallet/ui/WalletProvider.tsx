import { useWeb3ModalProvider, useWeb3ModalAccount } from "@web3modal/ethers/react";
import { useUnit } from "effector-react";
import { ReactNode, useEffect } from "react";
import { walletModel } from "..";

interface WalletProviderProps {
	children: ReactNode;
}

export function WalletProvider(props: WalletProviderProps) {
	const { children } = props;
	const { walletProvider } = useWeb3ModalProvider();
	const { isConnected, address, chainId } = useWeb3ModalAccount();
	const [setIsConnected, createProvider, setAddress, setChainId] = useUnit([
		walletModel.events.setIsConnectedEv,
		walletModel.events.createProviderEv,
		walletModel.events.setAddressEv,
		walletModel.events.setChainIdEv,
	]);

	useEffect(() => {
		if (!!isConnected) return;
		setIsConnected({ value: isConnected });
	}, [isConnected]);

	useEffect(() => {
		if (!walletProvider) return;
		createProvider({ walletProvider });
	}, [walletProvider]);

	useEffect(() => {
		if (!address) return;
		setAddress({ address });
	}, [address]);

	useEffect(() => {
		if (!chainId) return;
		setChainId({ chainId });
	}, [chainId]);

	return <>{children}</>;
}
