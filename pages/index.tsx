import { createGIP } from "@/pages/factories";
import { HomePage, pageStartedEv } from "@/pages/home";

function Page() {
	return <HomePage />;
}

Page.getInitialProps = createGIP({
	pageEvent: pageStartedEv,
});

export default Page;
