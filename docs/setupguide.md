Charulatha Veena Website - Directory Structure
📁 Complete File Organization

charulatha-website/
├── index.html                 # Main HTML file
├── css/
│   ├── styles.css            # Main stylesheet
│   └── responsive.css        # Mobile responsive styles
├── js/
│   ├── main.js              # Core JavaScript functionality
│   └── photo-gallery.js     # Photo gallery specific code
├── assets/
│   ├── photos/              # Photo gallery images
│   │   ├── charulatha-concert1.jpg
│   │   ├── charulatha-veena-practice.jpg
│   │   ├── charulatha-teaching.jpg
│   │   ├── charulatha-festival.jpg
│   │   ├── charulatha-recording.jpg
│   │   ├── charulatha-concert2.jpg
│   │   ├── charulatha-masterclass.jpg
│   │   ├── charulatha-cultural-event.jpg
│   │   ├── charulatha-performance.jpg
│   │   ├── charulatha-studio.jpg
│   │   ├── charulatha-backstage.jpg
│   │   ├── charulatha-award.jpg
│   │   ├── charulatha-rehearsal.jpg
│   │   ├── charulatha-sunset-concert.jpg
│   │   └── charulatha-students.jpg
│   ├── images/              # Other website images
│   │   ├── veena-hero.jpg
│   │   ├── charulatha-portrait.jpg
│   │   └── logo.png
│   └── icons/               # Icon files
│       ├── favicon.ico
│       └── apple-touch-icon.png
├── docs/
│   ├── setup-guide.md       # This file
│   └── calendly-setup.md    # Calendly integration guide
└── README.md                # Project documentation

🚀 Setup Instructions
1. Create Directory Structure
bash

mkdir charulatha-website
cd charulatha-website
mkdir css js assets docs
mkdir assets/photos assets/images assets/icons

2. File Creation Order

    Create index.html (provided)
    Create css/styles.css (provided)
    Create css/responsive.css (provided)
    Create js/main.js (provided)
    Create js/photo-gallery.js (provided)

3. Add Your Content

    Replace placeholder photos in assets/photos/
    Add actual images in assets/images/
    Update contact information in index.html
    Customize colors/fonts in css/styles.css

📸 Photo Gallery Setup
Expected Photo Filenames:

    charulatha-concert1.jpg - Concert hall performance
    charulatha-veena-practice.jpg - Practice session
    charulatha-teaching.jpg - Teaching students
    charulatha-festival.jpg - Music festival appearance
    charulatha-recording.jpg - Recording studio session
    charulatha-concert2.jpg - Another live concert
    charulatha-masterclass.jpg - Conducting masterclass
    charulatha-cultural-event.jpg - Cultural program
    charulatha-performance.jpg - Stage performance
    charulatha-studio.jpg - Studio work
    charulatha-backstage.jpg - Behind the scenes
    charulatha-award.jpg - Award ceremony
    charulatha-rehearsal.jpg - Rehearsal session
    charulatha-sunset-concert.jpg - Outdoor evening concert
    charulatha-students.jpg - Group photo with students

Photo Requirements:

    Format: JPG, PNG, or WebP
    Size: Optimized for web (max 500KB each)
    Dimensions: 1200x800px recommended for best quality
    Aspect Ratio: 3:2 or 4:3 works best

📅 Calendly Integration Setup
1. Create Calendly Account

    Go to calendly.com
    Create account for Charulatha
    Set up event types:
        Consultation (30 min)
        Performance Booking (60 min)
        Lesson Inquiry (15 min)

2. Get Calendly URL

    In Calendly dashboard, go to event type
    Copy the scheduling URL
    Replace in index.html:
    html

    data-url="https://calendly.com/charulatha-veena/consultation"

3. Customization Options

    Colors: Match website theme (#8b4513, #ffd700)
    Questions: Add custom questions for bookings
    Availability: Set performance/teaching hours
    Notifications: Configure email confirmations

🎨 Customization Guide
Colors

Main theme colors in css/styles.css:
css

:root {
  --primary-brown: #8b4513;
  --secondary-brown: #cd853f;
  --accent-gold: #daa520;
  --highlight-gold: #ffd700;
  --cream: #f4e4c1;
  --off-

