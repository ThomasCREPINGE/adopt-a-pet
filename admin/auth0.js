let auth0Client = null;

const initAuth0 = async () => {
  auth0Client = await createAuth0Client({
    domain: "dev-oy3el56b50grkeob.us.auth0.com",
    client_id: "GP2FYmT4h4erVgBS69BKSebdVIdkRbuP",
    redirect_uri: window.location.origin + "/admin",
  });
};

const login = async () => {
  await auth0Client.loginWithRedirect();
};

const handleRedirectCallback = async () => {
  const result = await auth0Client.handleRedirectCallback();
  window.history.replaceState({}, document.title, window.location.pathname);
};

const logout = async () => {
  await auth0Client.logout({
    returnTo: window.location.origin + "/admin",
  });
};

// Initialize the Auth0 client
initAuth0().then(() => {
  // Handle the redirect callback if needed
  if (window.location.search.includes("code=") && window.location.search.includes("state=")) {
    handleRedirectCallback();
  }
});
