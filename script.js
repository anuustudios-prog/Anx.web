// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-analytics.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup 
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDykeGco6ktsy0UG6OomirN4Q0iNvRLhq8",
  authDomain: "anx-web-4888e.firebaseapp.com",
  projectId: "anx-web-4888e",
  storageBucket: "anx-web-4888e.firebasestorage.app",
  messagingSenderId: "428277401680",
  appId: "1:428277401680:web:73995a41ecb0421803e955",
  measurementId: "G-QCYR8NTNPW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Initialize EmailJS with Public Key
(function() {
  emailjs.init("Ri93ZrOpPx8ioLBoc");
})();

// Mobile Nav Toggle
const mobileToggle = document.getElementById('mobile-toggle');
const navLinks = document.getElementById('nav-links');

if(mobileToggle) {
  mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// Service Modal Data & Logic
const serviceData = {
  bot: {
    title: "Bot Development",
    icon: "fa-robot",
    description: "Custom automated Discord and Telegram bots tailored for moderating communities, managing economy systems, integrating crypto/fiat payment gateways, and backend API connections.",
    features: [
      "Discord Slash Commands & Button Menus",
      "Telegram Bot API & Webhook Systems",
      "Automated Payments & VIP Roles",
      "Database Management (MongoDB/MySQL)"
    ],
    images: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80"
    ],
    serviceName: "Bot Development"
  },
  web: {
    title: "Web Development",
    icon: "fa-code",
    description: "Modern, high-performance websites built with clean code and minimalist dark/cyberpunk aesthetic. Optimized for fast loading times and mobile responsiveness.",
    features: [
      "Single-Page & Multi-Page Web Apps",
      "Glassmorphism & Interactive UI/UX",
      "WhatsApp Order & EmailJS Form Integration",
      "SEO Optimized & Fast Loading Speeds"
    ],
    images: [
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=400&q=80"
    ],
    serviceName: "Web Development"
  },
  graphic: {
    title: "Graphic Design",
    icon: "fa-pen-nib",
    description: "Clean vector designs, anime line-art, branding identities, social media covers, and high-converting YouTube thumbnails designed to grab instant attention.",
    features: [
      "Anime Vector & Line Art Illustrations",
      "YouTube Thumbnails & Social Banners",
      "Brand Logos & Visual Identities",
      "Photoshop & Ibis Paint Professional Quality"
    ],
    images: [
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=400&q=80"
    ],
    serviceName: "Graphic Design"
  },
  ads: {
    title: "Social Media Ads",
    icon: "fa-rectangle-ad",
    description: "Strategic digital ad management for Meta, Google, and TikTok. We craft engaging ad creatives and targeted strategy for maximum engagement and sales.",
    features: [
      "High-CTR Ad Banner & Video Creatives",
      "Target Audience Research & Setup",
      "Copywriting Designed for Conversions",
      "Analytics & Campaign Optimization"
    ],
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&w=400&q=80"
    ],
    serviceName: "Social Media Ads"
  }
};

window.openServiceModal = function(key) {
  const data = serviceData[key];
  if (!data) return;

  const modalBody = document.getElementById('service-modal-body');
  modalBody.innerHTML = `
    <div class="service-modal-header">
      <i class="fa-solid ${data.icon}"></i>
      <h2>${data.title}</h2>
    </div>
    <p style="color: var(--text-dim); margin-bottom: 15px;">${data.description}</p>
    
    <h4 style="margin-top: 20px;">Key Capabilities:</h4>
    <ul class="sample-feature-list">
      ${data.features.map(f => `<li><i class="fa-solid fa-check"></i> ${f}</li>`).join('')}
    </ul>

    <h4 style="margin-top: 20px;">Sample Preview / Examples:</h4>
    <div class="sample-grid">
      ${data.images.map(img => `<img src="${img}" class="sample-img" alt="Sample Work">`).join('')}
    </div>

    <button class="btn btn-primary" style="width: 100%; margin-top: 20px;" onclick="selectServiceAndOrder('${data.serviceName}')">
      Order ${data.title} Now
    </button>
  `;

  document.getElementById('service-modal').classList.add('active');
};

window.closeServiceModal = function() {
  document.getElementById('service-modal').classList.remove('active');
};

window.selectServiceAndOrder = function(serviceName) {
  closeServiceModal();
  const serviceSelect = document.getElementById('service');
  if (serviceSelect) {
    serviceSelect.value = serviceName;
    serviceSelect.dispatchEvent(new Event('change'));
  }
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
};

// Close Service Modal on Overlay Click
const serviceModalOverlay = document.getElementById('service-modal');
if (serviceModalOverlay) {
  serviceModalOverlay.addEventListener('click', (e) => {
    if (e.target === serviceModalOverlay) {
      closeServiceModal();
    }
  });
}

// Login Modal Toggle
const loginModal = document.getElementById('login-modal');
const openLoginBtn = document.getElementById('open-login-btn');
const closeLoginBtn = document.getElementById('close-login-btn');
const mobileLoginLink = document.getElementById('login-link-mobile');

if(openLoginBtn) {
  openLoginBtn.addEventListener('click', () => {
    loginModal.classList.add('active');
  });
}

if(mobileLoginLink) {
  mobileLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.classList.add('active');
  });
}

if(closeLoginBtn) {
  closeLoginBtn.addEventListener('click', () => {
    loginModal.classList.remove('active');
  });
}

if(loginModal) {
  loginModal.addEventListener('click', (e) => {
    if (e.target === loginModal) {
      loginModal.classList.remove('active');
    }
  });
}

// Firebase Email/Password Login & Register Form Handler
document.getElementById('login-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const submitBtn = document.getElementById('login-submit-btn');
  submitBtn.innerText = "Processing...";
  submitBtn.disabled = true;

  const userEmail = document.getElementById('login-email').value;
  const userPass = document.getElementById('login-password').value;

  signInWithEmailAndPassword(auth, userEmail, userPass)
    .then((userCredential) => {
      alert("Login Successful! Welcome back.");
      submitBtn.innerText = "Login";
      submitBtn.disabled = false;
      loginModal.classList.remove('active');
      document.getElementById('login-form').reset();
    })
    .catch((error) => {
      createUserWithEmailAndPassword(auth, userEmail, userPass)
        .then(async (userCredential) => {
          const user = userCredential.user;
          
          await setDoc(doc(db, "users", user.uid), {
            email: userEmail,
            createdAt: new Date()
          });

          alert("Account created & Logged in successfully!");
          submitBtn.innerText = "Login";
          submitBtn.disabled = false;
          loginModal.classList.remove('active');
          document.getElementById('login-form').reset();
        })
        .catch((regError) => {
          alert("Error: " + regError.message);
          submitBtn.innerText = "Login";
          submitBtn.disabled = false;
        });
    });
});

// Firebase Google Login Handler
const googleLoginBtn = document.getElementById('google-login-btn');
if(googleLoginBtn) {
  googleLoginBtn.addEventListener('click', function() {
    signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        const user = result.user;
        
        // Firestore එකේ user කෙනෙක් විදිහට save වී ඇද්දැයි පරීක්ෂා කර බැලීම
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        
        if (!userSnap.exists()) {
          await setDoc(userRef, {
            email: user.email,
            name: user.displayName,
            createdAt: new Date()
          });
        }

        alert("Google Login Successful! Welcome, " + user.displayName);
        loginModal.classList.remove('active');
      })
      .catch((error) => {
        alert("Google Login Error: " + error.message);
      });
  });
}

// Dynamic Fields Logic for Graphic Design Service
const serviceSelect = document.getElementById('service');
const graphicFields = document.getElementById('graphic-design-fields');

if(serviceSelect) {
  serviceSelect.addEventListener('change', function() {
    if (this.value === 'Graphic Design') {
      graphicFields.style.display = 'flex';
    } else {
      graphicFields.style.display = 'none';
    }
  });
}

// WHATSAPP ORDER FORM SCRIPT
document.getElementById('order-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const phoneNumber = "94740246367"; 

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const service = document.getElementById('service').value;
  const message = document.getElementById('message').value;

  let whatsappText = `*NEW ORDER REQUEST - STUDIO'S ANX*%0A%0A` +
                     `*Name:* ${encodeURIComponent(name)}%0A` +
                     `*Email:* ${encodeURIComponent(email)}%0A` +
                     `*Service Required:* ${encodeURIComponent(service)}%0A`;

  if (service === 'Graphic Design') {
    const thumbName = document.getElementById('thumbnail-name').value;
    const colors = document.getElementById('color-theme').value;
    
    whatsappText += `*Thumbnail Name:* ${encodeURIComponent(thumbName)}%0A` +
                    `*Preferred Colors:* ${encodeURIComponent(colors)}%0A`;
  }

  whatsappText += `*Details:* ${encodeURIComponent(message)}`;

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${whatsappText}`;
  window.open(whatsappUrl, '_blank');
});
