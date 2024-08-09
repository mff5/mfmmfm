import React from 'react';
import '/src/styles/components/admin/AdminFooter.css';

const AdminFooter = () => {
    return (
        <footer className="admin-footer">
            <div className="footer-content">
                <p>&copy; 2024 Office24. All rights reserved.</p>
                <div className="footer-links">
                    <a href="/terms-of-service">Terms of Service</a>
                    <a href="/privacy-policy">Privacy Policy</a>
                    <a href="/contact">Contact Us</a>
                </div>
                <div className="footer-socials">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                </div>
            </div>
        </footer>
    );
};

export default AdminFooter;
