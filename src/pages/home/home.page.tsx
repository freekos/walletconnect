import { walletModel } from "@/entities/wallet";
import { RootLayout } from "@/layouts";
import { useWeb3Modal } from "@web3modal/ethers/react";
import { useUnit } from "effector-react";

export function HomePage() {
	const { open } = useWeb3Modal();
	const [isConnected, address, chainId] = useUnit([
		walletModel.stores.$isConnected,
		walletModel.stores.$address,
		walletModel.stores.$chainId,
	]);
	const [setIsConnected] = useUnit([walletModel.events.setIsConnectedEv]);

	const handleConnect = () => {
		setIsConnected({ value: true });
		if (address && chainId) return;
		open({ view: "Connect" });
	};

	return (
		<RootLayout>
			<main className='flex min-h-screen flex-col items-center gap-10 p-24'>
				<h1 className='text-3xl font-bold'>
					<span className='text-blue-400'>WalletConnect</span> +{" "}
					<span className='text-orange-400'>Effector</span> Example
				</h1>

				{isConnected ? (
					<>
						<div className='flex justify-center items-center gap-10 px-10 py-5 bg-slate-100 rounded-3xl'>
							<p className='flex flex-col gap-2 justify-start'>
								<span className='text-sm font-bold text-stone-700'>Address:</span>
								<span className='text-xs font-semibold text-neutral-900 max-w-20 overflow-hidden text-ellipsis whitespace-nowrap'>
									{address}
								</span>
							</p>
							<p className='flex flex-col gap-2 justify-start'>
								<span className='text-sm font-bold text-stone-700'>ChainId:</span>
								<span className='text-xs font-semibold text-neutral-900'>{chainId}</span>
							</p>
						</div>
						<button
							className='px-4 py-2 bg-blue-400 hover:bg-blue-500 text-white rounded-full shadow-inner'
							onClick={() => open({ view: "Account" })}>
							Account
						</button>
					</>
				) : (
					<>
						<div className='flex justify-center items-center gap-10 px-10 py-5 bg-slate-100 rounded-3xl'>
							<span className='text-lg font-semibold'>Wallet is not connected</span>
						</div>
						<button
							className='px-4 py-2 bg-blue-400 hover:bg-blue-500 text-white rounded-full shadow-inner'
							onClick={handleConnect}>
							Connect Wallet
						</button>
					</>
				)}
			</main>
		</RootLayout>
	);
}
