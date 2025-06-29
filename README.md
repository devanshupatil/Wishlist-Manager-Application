# 🎯 Wishlist Manager App

<div align="center">

![Wishlist Manager](https://img.shields.io/badge/Wishlist-Manager-blue?style=for-the-badge&logo=react)
![Version](https://img.shields.io/badge/version-1.0.0-green?style=for-the-badge)
![License](https://img.shields.io/badge/license-ISC-yellow?style=for-the-badge)

**A modern, full-stack wishlist management application that helps you organize and track your desired products with smart categorization and priority management.**

[🚀 Live Demo](https://wishlist-manager-app.netlify.app/) • [📖 Documentation](#documentation) • [🐛 Report Bug](#contributing) • [✨ Request Feature](#contributing)

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Quick Start](#-quick-start)
- [📁 Project Structure](#-project-structure)
- [🌐 API Documentation](#-api-documentation)
- [🌍 Internationalization](#-internationalization)
- [🔧 Configuration](#-configuration)
- [📱 Screenshots](#-screenshots)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

### 🎯 Core Functionality
- **Smart Product Management**: Add, edit, and delete wishlist items with ease
- **URL Integration**: Paste Amazon links and manage product information
- **Priority System**: Organize items with High, Medium, and Low priority levels
- **Category Organization**: Sort items into Electronics, Clothing, Home & Kitchen, Books, and more
- **Price Tracking**: Set target prices and track current prices
- **Notes & Descriptions**: Add detailed notes and descriptions for each item

### 🔐 Authentication & Security
- **Secure User Authentication**: Powered by Supabase Auth
- **Password Reset**: Forgot password functionality with email recovery
- **Protected Routes**: Secure access to user-specific data
- **JWT Token Management**: Secure API communication

### 🌍 User Experience
- **Multi-language Support**: Available in English, Hindi, and Marathi
- **Responsive Design**: Optimized for desktop and mobile devices
- **Real-time Updates**: Instant feedback with toast notifications
- **Smooth Animations**: Enhanced UX with Framer Motion
- **Modern UI**: Clean, intuitive interface built with Tailwind CSS

### 📊 Advanced Features
- **Smart Sorting**: Sort by date, price, or priority
- **Advanced Filtering**: Filter by priority levels or categories
- **Search Functionality**: Quick search through your wishlist
- **Data Export**: Future-ready for CSV export functionality

---

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-6.0.5-646CFF?style=flat-square&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=flat-square&logo=tailwind-css)
![React Router](https://img.shields.io/badge/React_Router-7.1.1-CA4245?style=flat-square&logo=react-router)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-Latest-339933?style=flat-square&logo=node.js)
![Express.js](https://img.shields.io/badge/Express.js-4.21.2-000000?style=flat-square&logo=express)
![Supabase](https://img.shields.io/badge/Supabase-Latest-3ECF8E?style=flat-square&logo=supabase)

### Additional Libraries
- **Framer Motion**: Smooth animations and transitions
- **React i18next**: Internationalization framework
- **Lucide React**: Beautiful, customizable icons
- **React Hot Toast**: Elegant toast notifications
- **JWT**: Secure authentication tokens

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/wishlist-manager-app.git
   cd wishlist-manager-app
   ```

2. **Install Backend Dependencies**
   ```bash
   cd Back-End
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../front-end
   npm install
   ```

4. **Environment Setup**
   
   Create `.env` files in both directories:
   
   **Backend (.env)**
   ```env
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   JWT_SECRET=your_jwt_secret
   PORT=4000
   ```
   
   **Frontend (.env)**
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. **Database Setup**
   
   Create the following table in your Supabase database:
   ```sql
   CREATE TABLE products (
     id SERIAL PRIMARY KEY,
     user_id UUID REFERENCES auth.users(id),
     product_name VARCHAR(255) NOT NULL,
     product_url TEXT,
     current_price DECIMAL(10,2),
     target_price DECIMAL(10,2),
     category VARCHAR(100),
     priority VARCHAR(20),
     notes TEXT,
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```

6. **Start the Application**
   
   **Backend Server:**
   ```bash
   cd Back-End
   npm run dev
   ```
   
   **Frontend Development Server:**
   ```bash
   cd front-end
   npm run dev
   ```

7. **Access the Application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:4000`

---

## 📁 Project Structure

```
wishlist-manager-app/
├── 📁 Back-End/
│   ├── 📄 index.js                 # Express server entry point
│   ├── 📄 package.json             # Backend dependencies
│   ├── 📁 config/
│   │   └── 📄 db.js                # Supabase configuration
│   ├── 📁 controller/
│   │   └── 📄 productController     # Business logic
│   ├── 📁 middleware/
│   │   └── 📄 auth.js              # Authentication middleware
│   ├── 📁 models/
│   │   └── 📄 productModels.js     # Data models
│   └── 📁 routes/
│       └── 📄 productRoutes.js     # API routes
├── 📁 front-end/
│   ├── 📄 index.html               # HTML entry point
│   ├── 📄 package.json             # Frontend dependencies
│   ├── 📄 vite.config.js           # Vite configuration
│   ├── 📄 tailwind.config.js       # Tailwind CSS config
│   ├── 📁 src/
│   │   ├── 📄 App.jsx              # Main React component
│   │   ├── 📄 main.jsx             # React entry point
│   │   ├── 📄 i18Next.js           # Internationalization setup
│   │   ├── 📁 components/
│   │   │   ├── 📄 Home.jsx         # Dashboard component
│   │   │   ├── 📄 Lists.jsx        # Wishlist display
│   │   │   ├── 📄 Login.jsx        # Authentication
│   │   │   ├── 📄 Signup.jsx       # User registration
│   │   │   ├── 📄 Navbar.jsx       # Navigation
│   │   │   └── 📄 UpdateItem.jsx   # Item editing
│   │   ├── 📁 contexts/
│   │   │   └── 📄 AuthContext.jsx  # Authentication context
│   │   ├── 📁 config/
│   │   │   └── 📄 supabase.js      # Supabase client
│   │   └── 📁 locales/
│   │       ├── 📁 en/              # English translations
│   │       ├── 📁 hi/              # Hindi translations
│   │       └── 📁 mar/             # Marathi translations
└── 📄 README.md                    # Project documentation
```

---

## 🌐 API Documentation

### Base URL
- **Development**: `http://localhost:4000/api`
- **Production**: `https://your-backend-url.com/api`

### Endpoints

#### Products
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/products` | Get all user products | ✅ |
| `GET` | `/products/:id` | Get specific product | ✅ |
| `POST` | `/products` | Create new product | ✅ |
| `PUT` | `/products/:id` | Update product | ✅ |
| `DELETE` | `/products/:id` | Delete product | ✅ |

#### Request/Response Examples

**Create Product**
```json
POST /api/products
{
  "product_name": "iPhone 15 Pro",
  "product_url": "https://amazon.com/...",
  "current_price": 999.99,
  "target_price": 899.99,
  "category": "Electronics",
  "priority": "High",
  "notes": "Wait for Black Friday sale"
}
```

---

## 🌍 Internationalization

The app supports multiple languages:

- **English** (en) - Default
- **Hindi** (hi) - हिंदी
- **Marathi** (mar) - मराठी

### Adding New Languages

1. Create a new folder in `front-end/src/locales/`
2. Add `translation.json` with translated keys
3. Update `i18Next.js` configuration

---

## 🔧 Configuration

### Environment Variables

#### Backend
```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
JWT_SECRET=your_jwt_secret_key
PORT=4000
NODE_ENV=development
```

#### Frontend
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_BASE_URL=http://localhost:4000/api
```

### Deployment

#### Frontend (Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Set environment variables in Netlify dashboard

#### Backend (Render/Railway)
1. Connect your GitHub repository
2. Set environment variables
3. Deploy with automatic builds

---

## 📱 Screenshots

<div align="center">

### 🏠 Dashboard
*Clean, intuitive dashboard for managing your wishlist*

### 📝 Add Items
*Easy-to-use form for adding new wishlist items*

### 📊 List View
*Organized view with sorting and filtering options*

### 🌐 Multi-language
*Seamless language switching between English, Hindi, and Marathi*

</div>

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Commit: `git commit -m 'Add amazing feature'`
5. Push: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Contribution Guidelines
- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass

### Areas for Contribution
- 🐛 Bug fixes
- ✨ New features
- 🌍 Additional language translations
- 📚 Documentation improvements
- 🎨 UI/UX enhancements

---

## 📈 Roadmap

### Upcoming Features
- [ ] **Price History Tracking**: Track price changes over time
- [ ] **Email Notifications**: Get notified when target prices are reached
- [ ] **Data Export**: Export wishlist to CSV/PDF
- [ ] **Social Sharing**: Share wishlists with friends and family
- [ ] **Mobile App**: React Native mobile application
- [ ] **Advanced Analytics**: Spending insights and trends
- [ ] **Bulk Operations**: Manage multiple items at once
- [ ] **Image Upload**: Add product images
- [ ] **Barcode Scanner**: Quick product addition via barcode

---

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Supabase** for providing excellent backend-as-a-service
- **React Team** for the amazing frontend framework
- **Tailwind CSS** for the utility-first CSS framework
- **Vite** for the lightning-fast build tool
- **Open Source Community** for inspiration and resources

---

<div align="center">

**Made with ❤️ by [Your Name]**

[⬆ Back to Top](#-wishlist-manager-app)

</div>
