import type { AppProps } from "next/app";
import { withEffector } from "nextjs-effector";
import { ToastContainer } from "react-toastify";
import "@/processes";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";

export function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Component {...pageProps} />
			<ToastContainer />
		</>
	);
}

export default withEffector(App);
