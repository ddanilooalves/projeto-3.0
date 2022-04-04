const alert = () => {
    const closed = document.querySelector("#closed");
    const message = document.querySelector(".message");

    closed.addEventListener("click", () => {
        message.style.display = "none";
    });

    setTimeout(() => {
        message.style.display = "none";
    }, 4000);
};

alert();