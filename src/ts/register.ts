import axios from "axios";
import { apiRegister } from "./config";

const q = (query: string) => document.querySelector(query);

const form = q("#register-form") as HTMLFormElement;

form.onsubmit = (e) => {
    e.preventDefault();
    const registeredElement = q("#registered") as HTMLDivElement;
    const errorElement = q("#error") as HTMLDivElement;
    const loadingElement = q("#loading") as HTMLDivElement;
    const name = q("#name") as HTMLInputElement;
    const email = q("#email") as HTMLInputElement;
    const password = q("#password") as HTMLInputElement;

    registeredElement.style.display = "none";
    errorElement.style.display = "none";
    loadingElement.style.display = "block";

    axios
        .post(apiRegister, {
            name: name.value,
            email: email.value,
            password: password.value,
        })
        .then(({ data }) => {
            console.debug("succ", data);
            name.value = "";
            email.value = "";
            password.value = "";
            loadingElement.style.display = "none";
            registeredElement.style.display = "block";
            registeredElement.innerText = data.message;
        })
        .catch(({ response }) => {
            const { data } = response;
            loadingElement.style.display = "none";
            errorElement.style.display = "block";
            errorElement.innerText = data.message;
            console.error(data.message);
        });
};
