export default function ({store, redirect, route}) {
  const userIsLoggedIn = !!store.state.auth.user;
  const fullPath = route.fullPath;
  const urlRequiresNonAuth = /^\/login(\/|$)/.test(fullPath);

  if (!userIsLoggedIn && !urlRequiresNonAuth) {
    return redirect("/login");
  }
  if (userIsLoggedIn && urlRequiresNonAuth) {
    return redirect("/");// default page
  }
  return Promise.resolve();
}