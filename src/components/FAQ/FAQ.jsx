import React, { useState } from "react";
import NavBar from '../NavBar/NavBar'; // Import the NavBar component
import "./FAQ.css"; 
import Footer from '../Footer/Footer';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const faqData = [
    {
      question: "How does the Phone Tracker App work?",
      answer:
        "The Phone Tracker App allows you to track your device in real-time using GPS, Wi-Fi, and cellular data. Simply register your device and you can view its location on a map, set geo-fences, and receive alerts.",
    },
    {
      question: "Is my data safe?",
      answer:
        "Yes, your data is secure. We use end-to-end encryption to ensure your personal information and device data remain private. Our app complies with strict data privacy laws.",
    },
    {
      question: "Can I track more than one device?",
      answer:
        "Yes, you can register multiple devices under your account. Each device will appear in your dashboard, where you can track them individually.",
    },
    {
      question: "What happens if my device goes offline?",
      answer:
        "If your device goes offline, the app will display the last known location. Once the device reconnects to a network, its location will update in real-time.",
    },
    {
      question: "How do I set up a geo-fence?",
      answer:
        "To set up a geo-fence, go to the 'Tracking' page, select the device you want to set a boundary for, and choose 'Set Geo-fence.' You can specify the radius and get alerts when the boundary is crossed.",
    },
    {
      question: "How do I register a new device?",
      answer:
        "Go to the dashboard, click on 'Add New Device,' and fill in the required information such as device name and type. Once registered, the device will appear on your dashboard.",
    },
    {
      question: "Can I share my device location with others?",
      answer:
        "Yes, you can share your device’s location with emergency contacts. Go to the 'Emergency Contacts' page, add the contact, and toggle the 'Share Location' option.",
    },
    {
      question: "What subscription plans are available?",
      answer:
        "We offer Free, Premium, and Enterprise subscription plans. You can view and upgrade your plan on the 'Subscription Plans' page, where you’ll find detailed information about each plan’s features.",
    },
    {
      question: "How do I reset my password?",
      answer:
        "Click on the 'Forgot Password?' link on the login page and follow the instructions to reset your password. You’ll receive a password reset link in your email.",
    },
    {
      question: "Is there a way to lock my device remotely?",
      answer:
        "Yes, on the 'Tracking' page, you can remotely lock your device by clicking the 'Lock Device' button. This feature is available in our Premium and Enterprise plans.",
    },
    {
      question: "Can I view the history of my device’s location?",
      answer:
        "Yes, you can view the location history of your device on the 'History Log' page. You can also filter the data by specific date ranges.",
    },
    {
      question: "How accurate is the GPS tracking?",
      answer:
        "The accuracy of GPS tracking depends on your device's connection to satellites. Typically, GPS can pinpoint a device's location within a few meters.",
    },
    {
      question: "What is a geo-fence, and how does it work?",
      answer:
        "A geo-fence is a virtual boundary you can set around a location. You will receive alerts when the device enters or exits the boundary.",
    },
    {
      question: "How do I update my profile information?",
      answer:
        "You can update your profile information on the 'Settings' page. Here, you can edit your email, phone number, password, and other details.",
    },
    {
      question: "What should I do if my device is stolen?",
      answer:
        "If your device is stolen, you can use the app to track its location, lock it remotely, and even wipe data if necessary.",
    },
    {
      question: "How do I remove a device from my account?",
      answer:
        "To remove a device, go to the 'Device Management' page, select the device you wish to remove, and choose the 'Deregister' option.",
    },
    {
      question: "How do I cancel my subscription?",
      answer:
        "To cancel your subscription, go to the 'Subscription Plans' page and select 'Cancel Subscription'. Your account will remain active until the end of the billing cycle.",
    },
    {
      question: "Can I export my device’s location history?",
      answer:
        "Yes, you can export your device's location history as a CSV or PDF file from the 'History Log' page.",
    },
    {
      question: "What happens if I change my device?",
      answer:
        "If you change your device, you can deregister the old one and register the new device under your account. All tracking information will then be available for the new device.",
    },
    {
      question: "How do I add or remove emergency contacts?",
      answer:
        "You can add or remove emergency contacts by going to the 'Emergency Contacts' page. You can also allow or restrict them from viewing your device’s location."
    },
  ];
  

  
  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div>
      <NavBar /> {/* Use NavBar here */}
      <div className="faq-container">
        <h1 className="faq-title">Frequently Asked Questions</h1>
        <div className="faq-list">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${activeIndex === index ? "active" : ""}`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="faq-question">
                {faq.question}
                <span className="faq-icon">
                  {activeIndex === index ? "-" : "+"}
                </span>
              </div>
              <div
                className="faq-answer"
                style={{
                  maxHeight: activeIndex === index ? "500px" : "0",
                  transition: "max-height 0.3s ease",
                }}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FAQ;
