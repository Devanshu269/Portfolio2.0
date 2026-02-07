# EmailJS Setup Guide

To enable email functionality in your portfolio contact form, follow these steps:

## 1. Create EmailJS Account
1. Go to [EmailJS](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## 2. Create Email Service
1. Go to Email Services in your dashboard
2. Add a new email service
3. Choose your email provider (Gmail, Outlook, etc.)
4. Connect your email account and grant permissions

## 3. Create Email Template
1. Go to Email Templates in your dashboard
2. Create a new template
3. Use this template structure:

**Template ID:** Copy this ID for your code

**Subject:** New message from {{from_name}} via Portfolio

**Content:**
```
You have received a new message from your portfolio contact form:

Name: {{from_name}}
Email: {{from_email}}
Message: {{message}}

---
Sent via Portfolio Contact Form
```

## 4. Get Your Credentials
1. **Public Key:** Go to Account → API Keys → Public Key
2. **Service ID:** Go to Email Services → Copy your service ID
3. **Template ID:** Go to Email Templates → Copy your template ID

## 5. Update Your Code
In `/src/components/Contact/Contact.jsx`, replace the placeholder values:

```javascript
// Replace these with your actual EmailJS credentials
emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your public key

const response = await emailjs.send(
    'YOUR_SERVICE_ID', // Replace with your service ID
    'YOUR_TEMPLATE_ID', // Replace with your template ID
    {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: 'devanshu.shekhar2@gmail.com' // Your email
    }
);
```

## 6. Test Your Setup
1. Run your development server: `npm run dev`
2. Fill out the contact form with test data
3. Submit the form
4. Check your email for the test message

## Features Included
- ✅ Loading states with spinner animation
- ✅ Success/error message feedback
- ✅ Form validation
- ✅ Automatic form reset on success
- ✅ Responsive design
- ✅ Error handling

## Troubleshooting
- **Email not sending:** Check your EmailJS service configuration
- **API errors:** Verify your public key, service ID, and template ID
- **No email received:** Check your spam folder

## Security Notes
- Your public key is safe to expose in frontend code
- EmailJS handles the secure email delivery
- No backend server required for this setup
