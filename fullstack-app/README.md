# 🎉 EventHub - Fullstack Event Management Platform

A modern, full-stack event management application built with Next.js 16, TypeScript, MongoDB, and Mongoose. EventHub allows users to create, manage, and book events with a beautiful, responsive interface.

## 🚀 Features

### 🎯 Core Functionality

- **Event Management**: Create, view, and manage events with detailed information
- **Event Booking**: Users can book events with email validation
- **Image Upload**: Cloudinary integration for event image management
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Type Safety**: Full TypeScript implementation with strict types

### 🔧 Technical Features

- **MongoDB Integration**: Mongoose ODM with optimized schemas
- **Connection Caching**: Efficient database connection management
- **API Routes**: RESTful API endpoints for events and bookings
- **Slug Generation**: Automatic URL-friendly slug creation
- **Data Validation**: Comprehensive server-side validation
- **Error Handling**: Robust error management with proper HTTP status codes

## 🛠️ Tech Stack

### Frontend

- **Next.js 16** - React framework with App Router
- **React 19.2** - Latest React features
- **TypeScript 5** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework
- **Lucide React** - Beautiful icons

### Backend

- **Next.js API Routes** - Serverless API endpoints
- **MongoDB** - NoSQL database
- **Mongoose 8** - MongoDB object modeling
- **Cloudinary** - Image upload and management

### Development Tools

- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Class Variance Authority** - Component styling variants

## 📁 Project Structure

```
fullstack-app/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   └── events/              # Event-related endpoints
│   │       ├── route.ts         # GET/POST events
│   │       └── [slug]/          # Dynamic event routes
│   │           └── route.ts     # GET event by slug
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   └── providers.tsx            # Context providers
├── components/                   # Reusable UI components
│   ├── EventCard.tsx            # Event display card
│   ├── ExploreBtn.tsx           # Explore button component
│   ├── LightRays.tsx            # Animation component
│   └── Navbar.tsx               # Navigation component
├── database/                     # Database models and schemas
│   ├── event.model.ts           # Event Mongoose model
│   ├── booking.model.ts         # Booking Mongoose model
│   └── index.ts                 # Model exports
├── lib/                         # Utilities and configurations
│   ├── constants.ts             # App constants and mock data
│   ├── mongodb.ts               # MongoDB connection setup
│   └── utils.ts                 # Helper utilities
└── public/                      # Static assets
    ├── icons/                   # Icon assets
    └── images/                  # Image assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- MongoDB database (local or MongoDB Atlas)
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/pratiksarkar55/Nextjs-Full-stack-app.git
   cd fullstack-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   # MongoDB Connection
   MONGODB_URI=mongodb://localhost:27017/eventdb
   # Or for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/eventdb

   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 📚 API Documentation

### Events API

#### Get All Events

```http
GET /api/events
```

**Response:**

```json
{
  "events": [
    {
      "_id": "...",
      "title": "React Summit 2025",
      "slug": "react-summit-2025",
      "description": "The biggest React conference...",
      "date": "2025-06-12",
      "time": "09:00",
      "mode": "offline",
      "tags": ["React", "Frontend", "JavaScript"]
      // ... other fields
    }
  ]
}
```

#### Get Event by Slug

```http
GET /api/events/[slug]
```

**Example:**

```http
GET /api/events/react-summit-2025
```

**Response:**

```json
{
  "event": {
    "_id": "...",
    "title": "React Summit 2025",
    "slug": "react-summit-2025"
    // ... complete event data
  }
}
```

#### Create New Event

```http
POST /api/events
Content-Type: multipart/form-data
```

**Form Data:**

- `title` (string, required)
- `description` (string, required)
- `overview` (string, required)
- `image` (file, required)
- `venue` (string, required)
- `location` (string, required)
- `date` (string, required) - YYYY-MM-DD format
- `time` (string, required) - HH:MM format
- `mode` (string, required) - online/offline/hybrid
- `audience` (string, required)
- `agenda` (array, required)
- `organizer` (string, required)
- `tags` (array, required)

### Error Responses

All API endpoints return consistent error responses:

```json
{
  "message": "Error description",
  "error": "Detailed error information"
}
```

**HTTP Status Codes:**

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error
- `503` - Service Unavailable (database issues)

## 🗄️ Database Schema

### Event Model

```typescript
interface IEvent {
  title: string; // Event title (max 200 chars)
  slug: string; // Auto-generated URL slug
  description: string; // Detailed description (max 2000 chars)
  overview: string; // Brief overview (max 500 chars)
  image: string; // Cloudinary image URL
  venue: string; // Event venue
  location: string; // Event location
  date: string; // ISO date format (YYYY-MM-DD)
  time: string; // 24-hour format (HH:MM)
  mode: "online" | "offline" | "hybrid";
  audience: string; // Target audience
  agenda: string[]; // Event agenda items
  organizer: string; // Event organizer
  tags: string[]; // Event tags
  createdAt: Date; // Auto-generated
  updatedAt: Date; // Auto-generated
}
```

### Booking Model

```typescript
interface IBooking {
  eventId: ObjectId; // Reference to Event
  email: string; // User email (validated)
  createdAt: Date; // Auto-generated
  updatedAt: Date; // Auto-generated
}
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Code Quality

- **TypeScript**: Strict type checking enabled
- **ESLint**: Configured for Next.js best practices
- **Prettier**: Code formatting (recommended)

### Database Features

- **Connection Caching**: Optimized for serverless environments
- **Automatic Indexing**: Slug and eventId fields are indexed
- **Data Validation**: Server-side validation with Mongoose
- **Pre-save Hooks**: Automatic slug generation and data normalization

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Environment Variables for Production

```env
MONGODB_URI=your_production_mongodb_uri
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Pratik Sarkar**

- GitHub: [@pratiksarkar55](https://github.com/pratiksarkar55)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- MongoDB for the robust database solution
- Cloudinary for image management
- Tailwind CSS for the utility-first CSS framework

---

⭐ **Star this repository if you found it helpful!**
