<div align="center">

<img src="https://img.shields.io/badge/Skill%20Exchange-Community%20Powered-blueviolet?style=for-the-badge&logo=sparkles&logoColor=white" />

# 🔄 ExchangeN — Trade Skills, Not Money

**Teach what you know. Learn what you don't.**
Find someone whose skills complement yours, and swap.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-6d28d9?style=for-the-badge&logo=vercel&logoColor=white)](https://frontend-green-three-51.vercel.app)
[![GitHub Stars](https://img.shields.io/github/stars/YashiBuildss/ExchangeN?style=for-the-badge&color=facc15)](https://github.com/YashiBuildss/ExchangeN/stargazers)
[![Backend Repo](https://img.shields.io/badge/Backend-skill--swap--backend-22c55e?style=for-the-badge&logo=express&logoColor=white)](https://github.com/YashiBuildss/skill-swap-backend)
[![Realtime](https://img.shields.io/badge/Realtime-Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)](https://socket.io/)

</div>

---

## 🚀 What is ExchangeN?

**ExchangeN** is a skill-swapping platform — instead of paying for lessons, you trade what you're good at for what you want to learn. Post what you can teach and what you're looking for, get matched with people who complement your skillset, and chat in real time to make it happen.

> *"You know guitar, they know Spanish. Everybody teaches, everybody learns."*

---

## 🎥 Features at a Glance

| Feature | Description |
|---|---|
| 🔐 **Auth** | Secure signup/login with JWT |
| 🧩 **Skill Matching** | Post what you offer and what you're seeking; browse matching listings from other users |
| 📝 **Posts Feed** | Share and browse skill-swap opportunities |
| 👤 **Profiles** | Editable bio, location, and profile picture |
| 💬 **Real-time Chat** | Text, file, and voice messages with typing indicators and online status |
| 📞 **Voice/Video Calls** | WebRTC calling, signaled over Socket.io |

---

## 🖥️ Screenshots

<details>
<summary>🏠 Home Page</summary>
<br/>
<img src="./public/screenshots/home.png" alt="Home Page" width="100%"/>

> Hero, value pitch, and calls to action

</details>

<details>
<summary>🧩 Skill Exchange</summary>
<br/>
<img src="./public/screenshots/exchange.png" alt="Skill Exchange" width="100%"/>

> Browse and filter skill-matching listings from other users

</details>

<details>
<summary>📝 Sign Up</summary>
<br/>
<img src="./public/screenshots/signup.png" alt="Sign Up" width="100%"/>

> Create a free account to start swapping

</details>

<details>
<summary>🔑 Log In</summary>
<br/>
<img src="./public/screenshots/login.png" alt="Log In" width="100%"/>

> Return and continue swapping skills

</details>

<details>
<summary>ℹ️ About</summary>
<br/>
<img src="./public/screenshots/aboutus.png" alt="About Page" width="100%"/>

> What XchangeN is building and why

</details>

---

## 🛠️ Tech Stack

**Frontend**

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

**Realtime**

![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)

**Backend & Storage** ([separate repo](https://github.com/YashiBuildss/skill-swap-backend))

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)

**Deployment**

![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)

---

## ⚡ Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/YashiBuildss/ExchangeN.git

# 2. Navigate into the project
cd ExchangeN

# 3. Install dependencies
npm install

# 4. Set up environment variables
cp .env.local.example .env.local   # or create it manually, see below

# 5. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. You'll also need the [backend](https://github.com/YashiBuildss/skill-swap-backend) running — either locally or pointed at a deployed instance.

---

## 🔑 Environment Variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Point this at your backend's URL — locally or deployed.

---

## 📁 Project Structure

```
ExchangeN/
├── src/
│   ├── app/
│   │   ├── page.jsx              # Home page
│   │   ├── signup/, login/       # Auth
│   │   ├── profile/, edit/       # User profile
│   │   ├── exchange/             # Skill listings
│   │   ├── create_post/          # Posts feed
│   │   ├── chat/[id]/            # Real-time chat + calls
│   │   ├── messages/             # Conversation list
│   │   └── aboutus/, contact/    # Static pages
│   ├── components/               # Reusable components
│   ├── context/                  # Auth & call context providers
│   └── lib/                      # API client, socket, utilities
└── public/                       # Static assets
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📬 Contact

<a href="https://mail.google.com/mail/?view=cm&to=yashiporwal.dev@gmail.com">
  <img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail"/>
</a>
<a href="https://www.linkedin.com/in/yashi-porwal/">
  <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/>
</a>

---

<div align="center">

Made with 💜 by [Yashi Porwal](https://github.com/YashiBuildss)

⭐ Star this repo if you found it helpful!

</div>
