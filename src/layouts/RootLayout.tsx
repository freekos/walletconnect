import { ReactNode } from "react";
import { WalletModal, WalletProvider } from "@/entities/wallet";

interface RootLayoutProps {
	children: ReactNode;
}

export function RootLayout(props: RootLayoutProps) {
	const { children } = props;
	return (
		<WalletModal>
			<WalletProvider>{children}</WalletProvider>
		</WalletModal>
	);
}
