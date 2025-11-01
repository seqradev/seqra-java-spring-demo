// JavaScript for UserProfile UI interactions

// Function to test an endpoint with custom message
function testEndpoint(url, inputId, resultId) {
    const message = document.getElementById(inputId).value || 'Welcome';
    const fullUrl = `${url}?message=${encodeURIComponent(message)}`;

    // Open in new window/tab
    window.open(fullUrl, '_blank');

    // Also load in iframe if result container exists
    const resultContainer = document.getElementById(resultId);
    if (resultContainer) {
        resultContainer.innerHTML = `<iframe src="${fullUrl}" class="result-frame"></iframe>`;
    }
}

// Function to test notification endpoints
function testNotificationEndpoint(url, inputId, resultId) {
    const content = document.getElementById(inputId).value || 'New Message';
    const fullUrl = `${url}?content=${encodeURIComponent(content)}`;

    // Open in new window/tab
    window.open(fullUrl, '_blank');

    // Also load in iframe if result container exists
    const resultContainer = document.getElementById(resultId);
    if (resultContainer) {
        resultContainer.innerHTML = `<iframe src="${fullUrl}" class="result-frame"></iframe>`;
    }
}

// Function to test greeting endpoints
function testGreetingEndpoint(url, inputId, resultId) {
    const greeting = document.getElementById(inputId).value || 'Welcome';
    const fullUrl = `${url}?greeting=${encodeURIComponent(greeting)}`;

    // Open in new window/tab
    window.open(fullUrl, '_blank');

    // Also load in iframe if result container exists
    const resultContainer = document.getElementById(resultId);
    if (resultContainer) {
        resultContainer.innerHTML = `<iframe src="${fullUrl}" class="result-frame"></iframe>`;
    }
}

// Function to insert XSS payload into input field
function insertPayload(inputId, payload) {
    document.getElementById(inputId).value = payload;
}

// Function to clear all input fields in a section
function clearSection(sectionId) {
    const section = document.getElementById(sectionId);
    const inputs = section.querySelectorAll('input[type="text"], textarea');
    inputs.forEach(input => input.value = '');
}

// Function to test all endpoints in a section with the same input
function testAllInSection(sectionClass, inputValue) {
    const buttons = document.querySelectorAll(`.${sectionClass} .btn`);
    buttons.forEach(button => {
        if (button.onclick) {
            // Set the input value first
            const inputId = button.getAttribute('data-input-id');
            if (inputId) {
                document.getElementById(inputId).value = inputValue;
            }
            // Trigger the click with a small delay
            setTimeout(() => button.click(), Math.random() * 1000);
        }
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    console.log('UserProfile UI loaded successfully');

    // Add some interactive features
    const inputs = document.querySelectorAll('input[type="text"], textarea');
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                // Find the associated test button and click it
                const card = input.closest('.endpoint-card');
                const testButton = card.querySelector('.btn');
                if (testButton) {
                    testButton.click();
                }
            }
        });
    });
});
