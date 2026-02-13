function togglePassword(toggle, passwordType) {
    let input=document.getElementById(passwordType);

    if (input.type === "password") {
        input.type = "text";
        toggle.style.background = "rgba(0, 0, 0, 0.5)";
        toggle.textContent = "👀";
    } else {
        input.type = "password";
        toggle.style.background = "rgba(0, 0, 0, 0.2)";
        toggle.textContent = "🙈";
    }
}