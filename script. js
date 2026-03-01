document.addEventListener('DOMContentLoaded', () => {

  // --- 1. SPLASH SCREEN LOGIC ---
  const splash = document.getElementById('splash-screen');
  setTimeout(() => {
    splash.style.opacity = '0';
    splash.style.visibility = 'hidden';
    // Let the user scroll after splash is gone
    document.body.style.overflowY = 'auto'; 
  }, 2800); // Fades out after 2.8 seconds

  // --- 2. THE SERVICES DATA BASE ---
  // Here you can edit the descriptions of what you offer!
  const servicesData = {
    cyber: {
      icon: 'gpp_good',
      title: 'Cyber Security',
      desc: 'Elite protection and auditing for your digital assets. Choose a specialization or course below:',
      items: [
        { name: 'Web Penetration Testing', desc: 'We find the holes in your website before hackers do.' },
        { name: 'Malware & Virus Removal', desc: 'Deep-cleaning of infected servers and personal devices.' },
        { name: 'Cyber Security Course', desc: 'Learn ethical hacking and network defense from scratch.' }
      ]
    },
    web: {
      icon: 'language',
      title: 'Web Development',
      desc: 'Breathtaking, lightning-fast websites built for business growth.',
      items: [
        { name: 'E-Commerce Store', desc: 'Start selling online with a beautiful, secure shop.' },
        { name: 'Business Landing Page', desc: 'A stunning portfolio or landing page to attract clients.' },
        { name: 'Full-Stack Web App', desc: 'Complex web systems with databases and user logins.' }
      ]
    },
    app: {
      icon: 'smartphone',
      title: 'App Programming',
      desc: 'Native and Cross-Platform mobile applications.',
      items: [
        { name: 'Android Application', desc: 'Custom Android apps ready for the Google Play Store.' },
        { name: 'iOS Application', desc: 'Smooth, beautiful apps for Apple devices.' },
        { name: 'App Development Course', desc: 'Learn how to build your own apps step-by-step.' }
      ]
    },
    system: {
      icon: 'memory',
      title: 'System Programming',
      desc: 'Low-level scripting, server setups, and automated logic.',
      items: [
        { name: 'Custom Automation Scripts', desc: 'Bots and scripts to automate your boring daily tasks.' },
        { name: 'Server & Database Setup', desc: 'Secure cloud hosting architecture (Linux/Windows).' },
        { name: 'API Integration', desc: 'Connecting different softwares together seamlessly.' }
      ]
    },
    tech: {
      icon: 'build_circle',
      title: 'General Tech Support',
      desc: 'Having a weird bug? We can fix any tech issue.',
      items: [
        { name: 'PC / Laptop Optimization', desc: 'Make your slow computer run like it is brand new.' },
        { name: 'Software Troubleshooting', desc: 'Fixing crashing programs or OS errors.' },
        { name: 'Data Recovery', desc: 'Attempting to restore lost or deleted files.' }
      ]
    }
  };

  // --- 3. MODAL LOGIC (POPUPS) ---
  const cards = document.querySelectorAll('.service-card');
  const modal = document.getElementById('service-modal');
  const closeModal = document.getElementById('close-modal');
  
  // Modal Elements
  const mIcon = document.getElementById('modal-icon');
  const mTitle = document.getElementById('modal-title');
  const mDesc = document.getElementById('modal-desc');
  const mList = document.getElementById('modal-list');

  // When a card is clicked...
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const serviceId = card.getAttribute('data-service');
      const data = servicesData[serviceId];

      // Populate Modal text
      mIcon.textContent = data.icon;
      mTitle.textContent = data.title;
      mDesc.textContent = data.desc;
      
      // Clear old list items
      mList.innerHTML = '';

      // Generate the sub-services dynamically
      data.items.forEach(item => {
        const li = document.createElement('li');
        li.className = 'sub-item';
        
        // Generate the pre-filled WhatsApp message
        const rawMessage = `Hello Never Hide Tech, I am interested in ${data.title}. Specifically: ${item.name}. Can we discuss this?`;
        const encodedMessage = encodeURIComponent(rawMessage);
        const waLink = `https://wa.me/${myWhatsAppNumber}?text=${encodedMessage}`;

        li.innerHTML = `
          <div class="sub-info">
            <h4>${item.name}</h4>
            <p>${item.desc}</p>
          </div>
          <a href="${waLink}" target="_blank" class="chat-btn">
            <span class="material-icons-round">chat</span> Request
          </a>
        `;
        mList.appendChild(li);
      });

      // Show Modal
      modal.classList.add('active');
    });
  });

  // Close Modal when 'X' is clicked
  closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  // Close Modal if clicking outside the glass box
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

});
