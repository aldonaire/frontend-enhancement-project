import { useEffect, useState } from 'react';

function SocialBar() {
  const [sidebarDark, setSidebarDark] = useState(false);

  useEffect(() => {
    const darkSections = ['hero'];
    const lightSections = ['destinations', 'about', 'contact'];

    const handleIntersect = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
          const id = entry.target.id;
          if (darkSections.includes(id)) {
            setSidebarDark(false);
          } else if (lightSections.includes(id)) {
            setSidebarDark(true);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.3,
    });

    const allSections = [...darkSections, ...lightSections];
    allSections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`social-bar sidebar ${sidebarDark ? 'sidebar--dark' : 'sidebar--light'}`}>
      <div className="sidebar-line"></div>
      
      <span className="sidebar-dash">—</span>
      
      <a href="https://instagram.com" className="social-icon" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
        </svg>
      </a>
      
      <a href="https://facebook.com" className="social-icon" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      </a>
      
      <a href="https://twitter.com" className="social-icon" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      </a>
      
      <span className="sidebar-dash">—</span>
      
      <div className="sidebar-line"></div>
    </div>
  );
}

function NameTag() {
  const [sidebarDark, setSidebarDark] = useState(false);

  useEffect(() => {
    const darkSections = ['hero'];
    const lightSections = ['destinations', 'about', 'contact'];

    const handleIntersect = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
          const id = entry.target.id;
          if (darkSections.includes(id)) {
            setSidebarDark(false);
          } else if (lightSections.includes(id)) {
            setSidebarDark(true);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.3,
    });

    const allSections = [...darkSections, ...lightSections];
    allSections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`name-tag sidebar ${sidebarDark ? 'sidebar--dark' : 'sidebar--light'}`}>
      <span className="sidebar-text">— charles</span>
    </div>
  );
}

export { SocialBar, NameTag };