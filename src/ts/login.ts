import axios from "axios";
import { apiLogin } from "./config";

const q = (query: string) => document.querySelector(query);

const form = q("#login-form") as HTMLFormElement;

form.onsubmit = (e) => {
    e.preventDefault();
    const loginedElement = q("#logined") as HTMLDivElement;
    const errorElement = q("#error") as HTMLDivElement;
    const loadingElement = q("#loading") as HTMLDivElement;
    const email = q("#email") as HTMLInputElement;
    const password = q("#password") as HTMLInputElement;

    loginedElement.style.display = "none";
    errorElement.style.display = "none";
    loadingElement.style.display = "block";

    axios
        .post(apiLogin, {
            email: email.value,
            password: password.value,
        })
        .then(({ data }) => {
            console.debug("succ", data);
            email.value = "";
            password.value = "";
            loadingElement.style.display = "none";
            loginedElement.style.display = "block";
            loginedElement.innerText =
                data.message + "; redirecting to dashboard...";
            localStorage.setItem("user", JSON.stringify(data.loginResult));
            window.location.href = "/";
        })
        .catch(({ response }) => {
            const { data } = response;
            loadingElement.style.display = "none";
            errorElement.style.display = "block";
            errorElement.innerText = data.message;
            console.error(data.message);
        });
};
