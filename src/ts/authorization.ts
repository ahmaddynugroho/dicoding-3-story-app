let user = localStorage.getItem("user");
console.debug(window.location.href);
if (user) {
    console.log("logged in");
    const pagesToRedirectFrom = ["login", "register"];
    const shouldRedirect = pagesToRedirectFrom.some((path) =>
        window.location.href.includes(path),
    );
    if (shouldRedirect) {
        window.location.href = "/";
    }
} else {
    console.log("please login first");
    const pagesToRedirectTo = ["login", "register"];
    const shouldNotRedirect = pagesToRedirectTo.some((path) =>
        window.location.href.includes(path),
    );
    if (!shouldNotRedirect) {
        window.location.href = "/login";
    }
}
