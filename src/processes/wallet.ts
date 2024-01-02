import { walletModel } from "@/entities/wallet";
import { appStartedEv } from "@/pages/factories";
import { sample } from "effector";

sample({
	clock: appStartedEv,
	fn: () => ({ value: true }),
	target: walletModel.events.setIsConnectedEv,
});
