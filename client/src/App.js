import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { StoreProvider } from "./utils/GlobalState";
import { ChakraProvider } from "@chakra-ui/react";

import Welcome from "./components/Welcome";
import PlayGame from "./components/PlayGame";
import GameOver from "./components/GameOver";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NoMatch from "./pages/NoMatch";
import Profile from "./pages/Profile";
import Success from "./pages/Success";
import Nav from "./components/Nav";
import Donation from "./components/Donation";

import customTheme from "./styles/theme";

const httpLink = createHttpLink({
	uri: "/graphql"
});
const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem("id_token");
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : ""
		}
	};
});
const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache()
});

function App() {
	return (
		<ApolloProvider client={client}>
			<Router>
				<StoreProvider>
					<ChakraProvider theme={customTheme}>
						<Nav />
						<Routes>
							<Route path="/" element={<Welcome />} />
							<Route path="/login" element={<Login />} />
							<Route path="/signup" element={<Signup />} />
							<Route path="/profile" element={<Profile />} />
							<Route path="/play" element={<PlayGame />} />
							<Route path="/gameover" element={<GameOver />} />
							<Route path="/success" element={<Success />} />
							<Route path="/donation" element={<Donation />} />

							<Route path="*" element={<NoMatch />} />
						</Routes>
					</ChakraProvider>
				</StoreProvider>
			</Router>
		</ApolloProvider>
	);
}

export default App;
