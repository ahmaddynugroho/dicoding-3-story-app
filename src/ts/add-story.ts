import axios from "axios";
import * as bootstrap from "bootstrap";
import { apiPostStories } from "./config";

const q = (query: string) => document.querySelector(query);

const forms = document.querySelectorAll(
    ".needs-validation",
) as NodeListOf<HTMLInputElement>;
const toastTrigger = document.getElementById("upload-button");
const toastLive = document.getElementById("uploaded-toast") as Element;

const postStory = (e: SubmitEvent) => {
    e.preventDefault();

    const errorElement = q("#error") as HTMLDivElement;
    const loadingElement = q("#loading") as HTMLDivElement;
    loadingElement.style.display = "block";

    const form = document.querySelector("#post-form") as HTMLFormElement;
    const formData = new FormData(form);
    // console.debug(form);
    // console.debug(formData);
    // console.debug(formData.get("photo"));

    const token =
        "Bearer " + JSON.parse(localStorage.getItem("user") ?? "")?.token;
    axios
        .post(apiPostStories, formData, {
            headers: {
                Authorization: token,
            },
        })
        .then(({ data }) => {
            console.debug(data.message);
            loadingElement.style.display = "none";
            form.reset();
            if (toastTrigger) {
                const toastBootstrap =
                    bootstrap.Toast.getOrCreateInstance(toastLive);
                toastBootstrap.show();
            }
        })
        .catch((err) => {
            loadingElement.style.display = "none";
            errorElement.style.display = "block";
            errorElement.innerText = err.data.message;
            console.error(err);
        });
};

Array.from(forms).forEach((form) => {
    form.addEventListener(
        "submit",
        (event) => {
            if (form.checkValidity()) {
                postStory(event);
            }
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }

            form.classList.add("was-validated");
        },
        false,
    );
});
