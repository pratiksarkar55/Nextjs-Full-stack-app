export interface Event {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
  description?: string;
  price?: string;
  capacity?: number;
  organizer?: string;
  tags?: string[];
}

// Available images in the public/images folder
const availableImages = [
  "/images/event1.png",
  "/images/event2.png",
  "/images/event3.png",
  "/images/event4.png",
  "/images/event5.png",
  "/images/event6.png",
  "/images/event-full.png",
];

// Function to randomly pick an image
const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * availableImages.length);
  return availableImages[randomIndex];
};

export const events: Event[] = [
  {
    title: "React Summit 2025",
    image: getRandomImage(),
    slug: "react-summit-2025",
    location: "Amsterdam, Netherlands",
    date: "2025-06-12",
    time: "9:00 AM",
    description:
      "The biggest React conference in Europe featuring the latest updates from the React team and community leaders.",
    price: "$450",
    capacity: 2000,
    organizer: "GitNation",
    tags: ["React", "Frontend", "JavaScript"],
  },
  {
    title: "AI & Machine Learning Bootcamp",
    image: getRandomImage(),
    slug: "ai-ml-bootcamp-2025",
    location: "San Francisco, CA",
    date: "2025-03-20",
    time: "10:00 AM",
    description:
      "Intensive 3-day bootcamp covering the fundamentals of AI, machine learning, and deep learning with hands-on projects.",
    price: "$1,200",
    capacity: 150,
    organizer: "AI Institute",
    tags: ["AI", "Machine Learning", "Python", "Data Science"],
  },
  {
    title: "Startup Pitch Competition",
    image: getRandomImage(),
    slug: "startup-pitch-comp-2025",
    location: "Austin, TX",
    date: "2025-04-15",
    time: "2:00 PM",
    description:
      "Early-stage startups compete for $100K in funding. Network with VCs, angels, and fellow entrepreneurs.",
    price: "Free",
    capacity: 500,
    organizer: "Tech Stars",
    tags: ["Startup", "Entrepreneurship", "Funding", "Networking"],
  },
  {
    title: "Full Stack Developer Meetup",
    image: getRandomImage(),
    slug: "fullstack-dev-meetup",
    location: "London, UK",
    date: "2025-02-28",
    time: "6:30 PM",
    description:
      "Monthly meetup for full stack developers. This month: Building scalable apps with Next.js and PostgreSQL.",
    price: "Free",
    capacity: 80,
    organizer: "London Tech Community",
    tags: ["Full Stack", "Next.js", "PostgreSQL", "Networking"],
  },
  {
    title: "Cybersecurity Summit 2025",
    image: getRandomImage(),
    slug: "cybersecurity-summit-2025",
    location: "Washington DC, USA",
    date: "2025-05-08",
    time: "8:30 AM",
    description:
      "Leading experts discuss the latest cybersecurity threats, defense strategies, and emerging technologies.",
    price: "$650",
    capacity: 1200,
    organizer: "CyberSec Alliance",
    tags: ["Cybersecurity", "InfoSec", "Technology", "Enterprise"],
  },
  {
    title: "Code for Climate Hackathon",
    image: getRandomImage(),
    slug: "code-for-climate-2025",
    location: "Berlin, Germany",
    date: "2025-04-22",
    time: "9:00 AM",
    description:
      "48-hour hackathon focused on building solutions for climate change and environmental sustainability.",
    price: "Free",
    capacity: 300,
    organizer: "Climate Tech Hub",
    tags: ["Hackathon", "Climate", "Sustainability", "Social Impact"],
  },
  {
    title: "DevOps & Cloud Infrastructure Conference",
    image: getRandomImage(),
    slug: "devops-cloud-conf-2025",
    location: "Seattle, WA",
    date: "2025-07-10",
    time: "9:30 AM",
    description:
      "Learn about the latest in DevOps practices, cloud architecture, and infrastructure automation.",
    price: "$520",
    capacity: 800,
    organizer: "CloudOps Institute",
    tags: ["DevOps", "Cloud", "AWS", "Kubernetes", "Infrastructure"],
  },
  {
    title: "Women in Tech Leadership Workshop",
    image: getRandomImage(),
    slug: "women-tech-leadership-2025",
    location: "Toronto, Canada",
    date: "2025-03-08",
    time: "1:00 PM",
    description:
      "Empowering women in technology through leadership development, mentorship, and career advancement strategies.",
    price: "$150",
    capacity: 200,
    organizer: "Women in Tech TO",
    tags: ["Leadership", "Women in Tech", "Career Development", "Diversity"],
  },
  {
    title: "Blockchain & Web3 Developer Summit",
    image: getRandomImage(),
    slug: "blockchain-web3-summit-2025",
    location: "Miami, FL",
    date: "2025-06-25",
    time: "10:00 AM",
    description:
      "Deep dive into blockchain development, smart contracts, DeFi protocols, and the future of Web3.",
    price: "$750",
    capacity: 600,
    organizer: "Web3 Developers Guild",
    tags: ["Blockchain", "Web3", "Smart Contracts", "DeFi", "Cryptocurrency"],
  },
  {
    title: "Mobile App Development Workshop",
    image: getRandomImage(),
    slug: "mobile-app-workshop-2025",
    location: "Sydney, Australia",
    date: "2025-05-18",
    time: "9:00 AM",
    description:
      "Hands-on workshop covering React Native and Flutter development with real-world project examples.",
    price: "$280",
    capacity: 120,
    organizer: "Mobile Dev Academy",
    tags: ["Mobile Development", "React Native", "Flutter", "iOS", "Android"],
  },
  {
    title: "Open Source Contribution Day",
    image: getRandomImage(),
    slug: "open-source-contrib-day",
    location: "Portland, OR",
    date: "2025-09-15",
    time: "10:30 AM",
    description:
      "Community event for developers to contribute to open source projects with guidance from maintainers.",
    price: "Free",
    capacity: 250,
    organizer: "Open Source Portland",
    tags: ["Open Source", "Community", "Git", "GitHub", "Collaboration"],
  },
  {
    title: "Game Development Expo 2025",
    image: getRandomImage(),
    slug: "gamedev-expo-2025",
    location: "Los Angeles, CA",
    date: "2025-08-12",
    time: "11:00 AM",
    description:
      "Showcase of indie games, workshops on game engines, and networking with game developers and publishers.",
    price: "$320",
    capacity: 1500,
    organizer: "GameDev LA",
    tags: [
      "Game Development",
      "Unity",
      "Unreal Engine",
      "Indie Games",
      "Gaming",
    ],
  },
  {
    title: "UX/UI Design Thinking Workshop",
    image: getRandomImage(),
    slug: "ux-ui-design-workshop-2025",
    location: "Copenhagen, Denmark",
    date: "2025-04-05",
    time: "9:00 AM",
    description:
      "Interactive workshop on design thinking principles, user research methods, and modern UI/UX practices.",
    price: "$180",
    capacity: 100,
    organizer: "Nordic Design Lab",
    tags: [
      "UX Design",
      "UI Design",
      "Design Thinking",
      "User Research",
      "Prototyping",
    ],
  },
  {
    title: "Data Science & Analytics Conference",
    image: getRandomImage(),
    slug: "data-science-analytics-2025",
    location: "Chicago, IL",
    date: "2025-07-22",
    time: "8:00 AM",
    description:
      "Explore the latest in data science, big data analytics, and machine learning applications in industry.",
    price: "$580",
    capacity: 900,
    organizer: "Data Science Society",
    tags: [
      "Data Science",
      "Analytics",
      "Big Data",
      "Machine Learning",
      "Statistics",
    ],
  },
  {
    title: "Freelancer Success Seminar",
    image: getRandomImage(),
    slug: "freelancer-success-2025",
    location: "Remote/Online",
    date: "2025-12-03",
    time: "2:00 PM",
    description:
      "Learn how to build a successful freelancing career in tech, from client acquisition to project management.",
    price: "$75",
    capacity: 1000,
    organizer: "Freelance Tech Community",
    tags: ["Freelancing", "Career", "Business", "Remote Work", "Consulting"],
  },
];

export const featuredEvents = events.slice(0, 6);
export const upcomingEvents = events.filter(
  (event) => new Date(event.date) > new Date()
);
export const freeEvents = events.filter((event) => event.price === "Free");
