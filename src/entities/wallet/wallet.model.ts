import { createEffect, createEvent, createStore, sample } from "effector";
import { Eip1193Provider, BrowserProvider } from "ethers";

class Events {
	setIsConnectedEv = createEvent<{ value: boolean }>();
	createProviderEv = createEvent<{ walletProvider: Eip1193Provider }>();
	setAddressEv = createEvent<{ address: string }>();
	setChainIdEv = createEvent<{ chainId: number }>();
}

class Effects {
	createProviderFx = createEffect<{ walletProvider: Eip1193Provider }, BrowserProvider>().use(
		({ walletProvider }) => {
			const provider = new BrowserProvider(walletProvider);
			return provider;
		}
	);
	getBalanceFx = createEffect<{ provider: BrowserProvider; address: string }, bigint>().use(
		async ({ provider, address }) => {
			const balance = await provider.getBalance(address);
			return balance;
		}
	);
}

class Stores {
	$isConnected = createStore<boolean>(false);
	$provider = createStore<BrowserProvider | null>(null);
	$address = createStore<string | null>(null);
	$chainId = createStore<number | null>(null);
	$balance = createStore<bigint | null>(null);
}

const events = new Events();
const effects = new Effects();
const stores = new Stores();

stores.$isConnected.on(events.setIsConnectedEv, (_, { value }) => value);

sample({
	source: events.createProviderEv,
	target: effects.createProviderFx,
});

const walletWillConnected = sample({
	clock: stores.$isConnected,
	filter: (clock) => clock,
});

stores.$provider.on(
	sample({ source: effects.createProviderFx.done, clock: [walletWillConnected] }),
	(_, { result }) => result
);
stores.$address.on(
	sample({ source: events.setAddressEv, clock: [events.setAddressEv, walletWillConnected] }),
	(_, { address }) => address
);
stores.$chainId.on(
	sample({ source: events.setChainIdEv, clock: [events.setChainIdEv, walletWillConnected] }),
	(_, { chainId }) => chainId
);

sample({
	source: { provider: stores.$provider, address: stores.$address },
	filter: (source: {
		provider: BrowserProvider | null;
		address: string | null;
	}): source is { provider: BrowserProvider; address: string } =>
		!!source.provider && !!source.address,
	target: effects.getBalanceFx,
});

sample({
	clock: effects.getBalanceFx.done,
	fn: ({ result }) => result,
	target: stores.$balance,
});

sample({
	clock: stores.$isConnected,
	filter: (clock) => !clock,
	target: Object.values(stores).map((store) => store.reinit),
});

export { events, effects, stores };
