let currentStep = 0;
const steps = document.querySelectorAll(".step");
const progressBar = document.getElementById("progressBar");

function nextStep() {

    // validation for current step
    let inputs = steps[currentStep].querySelectorAll("input");

    for (let input of inputs) {
        if (!input.checkValidity()) {
            input.reportValidity();
            return;
        }
    }

    steps[currentStep].classList.remove("active");
    currentStep++;

    if (currentStep < steps.length) {
        steps[currentStep].classList.add("active");
        progressBar.style.width = ((currentStep) / (steps.length - 1)) * 100 + "%";
    }
}

function prevStep() {
    steps[currentStep].classList.remove("active");
    currentStep--;
    steps[currentStep].classList.add("active");
    progressBar.style.width = ((currentStep) / (steps.length - 1)) * 100 + "%";
}