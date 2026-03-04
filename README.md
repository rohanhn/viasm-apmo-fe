# APMO News Website

A modern news website built with Next.js for the Asia-Pacific Mathematical Olympiad (APMO) community.

## 🚀 Features

- **News Management**: Latest APMO news, announcements, and updates
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Internationalization**: Multi-language support with i18next
- **Performance Optimized**: Built with Next.js for fast loading
- **SEO Friendly**: Optimized for search engines with next-seo
- **Type Safe**: Full TypeScript support

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query
- **Forms**: React Hook Form with Yup validation
- **HTTP Client**: Axios
- **Internationalization**: i18next & react-i18next
- **UI Components**: React Select, React Slick
- **Notifications**: React Toastify
- **Security**: Google reCAPTCHA v3

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/rohanhn/viasm-apmo-fe.git

# Navigate to project directory
cd viasm-apmo-fe

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm test             # Run Jest tests
npm run e2e          # Run Cypress E2E tests
npm run storybook    # Start Storybook
```

## 🌐 Environment Setup

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=your_api_url_here
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
```

## 📁 Project Structure

```
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Next.js pages
│   ├── services/      # API services
│   ├── hooks/         # Custom React hooks
│   ├── utils/         # Utility functions
│   ├── styles/        # Global styles
│   └── types/         # TypeScript type definitions
├── public/            # Static assets
└── docs/             # Documentation
```

## 🚀 Deployment

The application is optimized for deployment on Vercel, Netlify, or any Node.js hosting platform.

```bash
npm run build
npm run start
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Contact

For questions about APMO or this website, please visit the official APMO channels.