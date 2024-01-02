import { createEvent } from "effector";
import { createGIPFactory } from "nextjs-effector";

export const appStartedEv = createEvent<void>();

export const createGIP = createGIPFactory({
	sharedEvents: [appStartedEv],
});
