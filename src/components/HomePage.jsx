import React from 'react';

// You would typically import a CSS file here for styling
// import './HomePage.css'; 

function HomePage() {
    // You can add state, event handlers, and data fetching here

    return (
        // The main container for your home page layout
        <div style={{ padding: '20px', textAlign: 'center' }}>
            
            {/* 1. Hero Section / Main Title */}
            <h1>Welcome to Our Application!</h1>
            <p style={{ fontSize: '1.2rem', color: '#555' }}>
                Your journey starts here. Explore our features and connect with the community.
            </p>

            {/* 2. Feature Section (Example of component composition) */}
            <section style={{ marginTop: '40px', display: 'flex', justifyContent: 'space-around' }}>
                <FeatureCard title="Fast Login" icon="🔑" description="Secure and fast authentication." />
                <FeatureCard title="New Features" icon="✨" description="Always updated with the latest tools." />
                <FeatureCard title="Community" icon="🗣️" description="Join the conversation with other users." />
            </section>

            {/* 3. Call to Action */}
            <div style={{ marginTop: '60px' }}>
                <a href="/signup" style={{ 
                    padding: '15px 30px', 
                    backgroundColor: '#6d76f9ff', // Your primary color
                    color: 'white', 
                    textDecoration: 'none', 
                    borderRadius: '5px',
                    fontSize: '1.1rem'
                }}>
                    Get Started Now
                </a>
            </div>
            
        </div>
    );
}

// Example of a small, reusable component for the Home Page
function FeatureCard({ title, icon, description }) {
    return (
        <div style={{ width: '30%', padding: '20px', border: '1px solid #eee', borderRadius: '8px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{icon}</div>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
}

export default HomePage;