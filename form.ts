function validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function displayMessage(message: string, isSuccess: boolean): void {
    const resultMessage = document.getElementById('resultMessage');
    if (resultMessage) {
        resultMessage.innerHTML = message;
        resultMessage.className = isSuccess ? 'success' : 'error';
    }
}

async function submitForm(event: Event): Promise<void> {
    event.preventDefault();

    const nameInput = (document.getElementById('name') as HTMLInputElement).value;
    const emailInput = (document.getElementById('email') as HTMLInputElement).value;
    const contactInput = (document.getElementById('contact') as HTMLInputElement).value;
    const subjectInput = (document.getElementById('subject') as HTMLInputElement).value;
    const messageInput = (document.getElementById('message') as HTMLInputElement).value;

    if (!validateEmail(emailInput)) {
        displayMessage('Please enter a valid email address.', false);
        return;
    }

    const formData = {
        name: nameInput,
        email: emailInput,
        contact: contactInput,
        subject: subjectInput,
        message: messageInput,
    };

    try {
        console.log('Submitting form data:', formData);

        const response = await fetch('https://6717e333b910c6a6e02a739a.mockapi.io/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        console.log('Response status:', response.status);

        if (response.ok) {
            displayMessage('Form Submitted Successfully', true);
        } else {
            throw new Error(`Failed to submit form: ${response.status}`);
        }
    } catch (error) {
        console.error('Error during submission:', error);
        displayMessage('Submission Failed. Please try again.', false);
    }
}

document.getElementById('contactForm')!.addEventListener('submit', submitForm);
