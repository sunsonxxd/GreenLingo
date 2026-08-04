# GreenLingo  
**Hong Kong Environmental Education + Gamified Rewards Platform**

GreenLingo is a web application built with React + Vite that combines environmental education with gamification. It aims to encourage Hong Kong residents to develop sustainable daily habits through daily challenges, knowledge courses, a recycling map, and a green coin reward system.

---

## Features

- **Intro Slides**  
  First-time users are guided through an introduction about Hong Kong’s waste problem, the benefits of recycling, and how GreenLingo works.

- **Green Coin System**  
  Users earn “Green Coins” by completing tasks. Coins can be exchanged for eco-friendly rewards in the shop.

- **Daily Challenges**  
  Personalized daily tasks based on the user’s interest level in environmental actions (High / Medium / Low).  
  Examples include: short showers, clean recycling, and using official recycling points.

- **Green Classroom**  
  Progressive learning system with unlockable lessons:
  - Recycling Basics
  - Common Recycling Mistakes
  - Home Sorting
  - Beginner Quiz  
  Mid-level courses are prepared for future expansion.

- **Recycling Map**  
  Interactive map (powered by Leaflet) showing recycling points with filters for:
  - Address keyword
  - Point type
  - District
  - Accepted waste types (Paper, Plastics, Metals, Glass Bottles, etc.)

- **Green Coin Shop**  
  Exchange coins for eco-friendly items such as reusable bags, plastic-free detergent, supermarket vouchers, and rice.

- **Profile & Reset**  
  Users can view their progress and reset all local data for demo purposes.

---

## Tech Stack

| Category       | Technology                  |
|----------------|-----------------------------|
| Framework      | React 19                    |
| Build Tool     | Vite                        |
| Routing        | React Router DOM            |
| Map            | Leaflet + react-leaflet     |
| Styling        | Pure CSS                    |
| Data Storage   | localStorage (no backend)   |
| Language       | Traditional Chinese (Cantonese style) |

---

## Installation & Launch

### 1. Install Dependencies

```bash
npm install

npm run dev

npm run build
