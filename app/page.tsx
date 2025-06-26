"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Menu,
  X,
  ChevronDown,
  Code,
  Smartphone,
  Zap,
  Users,
  Star,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Play,
  Download,
  Moon,
  Sun,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Rocket,
  Heart,
} from "lucide-react"

export default function FlutterPortfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isDarkMode, setIsDarkMode] = useState(true) // Default to dark
  type Project = {
    title: string
    description: string
    longDescription: string
    techStack?: string[]
    image: string
    images: string[]
    website?: string
    github?: string
    playStore?: string
    appStore?: string
    featured: boolean
  }

  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isModalClosing, setIsModalClosing] = useState(false)
  const [visibleElements, setVisibleElements] = useState(new Set())
  const [isLoading, setIsLoading] = useState(false)
  const observerRef = useRef(null)

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Intersection Observer for scroll animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.1, rootMargin: "50px" },
    )

    // Observe all animatable elements
    const elements = document.querySelectorAll("[data-animate]")
    elements.forEach((el) => observerRef.current?.observe(el))

    return () => observerRef.current?.disconnect()
  }, [])

  useEffect(() => {
    // Check for saved preference, system preference, or default to dark
    const savedTheme = localStorage.getItem("theme")
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    let shouldBeDark = true // Default to dark

    if (savedTheme) {
      shouldBeDark = savedTheme === "dark"
    } else if (systemPrefersDark !== undefined) {
      shouldBeDark = systemPrefersDark
    }

    setIsDarkMode(shouldBeDark)

    if (shouldBeDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)

    if (newDarkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  const openProjectModal = (project) => {
    setIsLoading(true)
    setTimeout(() => {
      setSelectedProject(project)
      setCurrentImageIndex(0)
      setIsLoading(false)
      document.body.style.overflow = "hidden"
    }, 300)
  }

  const closeProjectModal = () => {
    setIsModalClosing(true)
    setTimeout(() => {
      setSelectedProject(null)
      setCurrentImageIndex(0)
      setIsModalClosing(false)
      document.body.style.overflow = "unset"
    }, 300)
  }

  const nextImage = () => {
    if (selectedProject && selectedProject.images) {
      setCurrentImageIndex((prev) => (prev === selectedProject.images.length - 1 ? 0 : prev + 1))
    }
  }

  const prevImage = () => {
    if (selectedProject && selectedProject.images) {
      setCurrentImageIndex((prev) => (prev === 0 ? selectedProject.images.length - 1 : prev - 1))
    }
  }

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        closeProjectModal()
      }
    }

    if (selectedProject) {
      document.addEventListener("keydown", handleEscape)
      return () => document.removeEventListener("keydown", handleEscape)
    }
  }, [selectedProject])

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "testimonials", label: "Testimonials" },
    { id: "contact", label: "Contact" },
  ]

  const skills = [
    { name: "Flutter", level: 95 },
    { name: "Dart", level: 95 },
    { name: "Firebase", level: 90 },
    { name: "REST APIs", level: 88 },
    { name: "GraphQL", level: 85 },
    { name: "Riverpod", level: 92 },
    { name: "BLoC", level: 90 },
    { name: "Native Integration", level: 85 },
    { name: "CI/CD", level: 80 },
    { name: "Testing", level: 88 },
  ]

  const projects = [{
    title: "GR News",
    description:
      "Global Reporter is a news application that delivers accurate information with a wide variety of news types.",
    longDescription:
      "Worked collaboratively with another Flutter developer to build a news application that delivered both globaland local news content, personalized by the user’s selected country. The app featured real-timecategorization into Breaking News, Hot News, and other relevant topics. \n\nResponsibilities:\n\nDeveloped core features for delivering both global and local news, tailored to the user’s region andpreferences.\n\nImplemented push notifications for breaking news alerts and critical system updates to improve userengagement.\n\n Ensured smooth handling of localized and international news feeds with a strong focus on performance, data consistency, and real- time updates",
    techStack: ["Flutter", "Pushy", "Provider", "Clean Architecture"],
    image: "/Global Report.png?height=200&width=300",
    images: [
      "/gr1.jpg?height=600&width=300",
      "/Global Report 1.png?height=600&width=300",
      // "/Global Report.png?height=600&width=300",
    ],
    // github: "https://github.com/username/trading-app",
    playStore: "https://apkpure.com/global-reporter/com.joygroup.globalreporterpro",
    appStore: "https://apps.apple.com/mm/app/gr-news/id6737678665",
    featured: true,
  },
  {
    title: "Kwee Lamin",
    description: "Kwee Lamin is an ecommerce app for Computer sales.",
    longDescription:
      "Kwee Lamin is an ecommerce app for Computer sales and allows users to shop online, browse product catalogs, create wish lists, add items to a cart, and complete purchases.",
    techStack: ["Flutter", "Firebase", "Provider", "Clean Architecture"],
    image: "/Kwee LaMin THUMBNAIL.png?height=200&width=300",
    images: [
      "/kwee lamin 1.png?height=600&width=300",
      "/kwee lamin 2.png?height=600&width=300",
      "/kwee lamin 3.png?height=600&width=300", "/kwee lamin 4.png?height=600&width=300",

    ],
    website: "https://www.kweelamin.com/",
    // playStore: "https://apps.apple.com/cy/app/kwee-lamin/id6451135120",
    appStore: "https://apps.apple.com/cy/app/kwee-lamin/id6451135120",
    featured: true,
  },

  {
    title: "Food.com.mm",
    description:
      "Our app is your one-stop-shop for all your food and product needs.",
    longDescription:
      "Our app is your one-stop-shop for all your food and product needs. With just a few taps on your smartphone, you can easily browse and purchase a wide variety of items, including groceries, snacks, and household essentials. Our user- friendly interface makes it easy to search for products, compare prices, and place orders.You can choose to have your items delivered straight to your doorstep or pick them up at a convenient location. We offer a range of payment options, prepaid and cash on delivery.Plus, our secure checkout process ensures that your personal and financial information is always protected. With our app, you can easily keep track of your orders, access past purchases, and receive notifications on the latest deals and promotions. Say goodbye to long queues at the grocery store and download our app today to start enjoying the convenience of shopping for food and products online!",
    techStack: ["Flutter", "Firebase", "Provider", "Clean Architecture"],
    image: "/fooodcommm.jpg?height=200&width=300",
    images: [
      "/food1.webp?height=600&width=300",
      "/food2.webp?height=600&width=300",
      "/food3.webp?height=600&width=300",
      "/food4.webp?height=600&width=300",
    ],
    // github: "https://github.com/username/social-app",
    // playStore: "https://play.google.com/store/apps/details?id=com.example.social",
    appStore: "https://apps.apple.com/cy/app/food-com-mm/id6446515746",
    featured: true,
  },
  {
    title: "XH Express",
    description: "Developed the User App for a cross-border logistics platform (China–Myanmar), enabling parcel submission, tracking, and delivery management. Built with Flutter using Provider, Clean Architecture, Go Router, and barcode scanning. Supported real-time notifications and delivery options by user type. Collaborated with backend and admin teams to ensure seamless integration.",
    longDescription:
      "Developed a logistics app for cross-border transportation between China and Myanmar, designed to cater to various user types. The project included the User App, Rider App, Main Counter (China) App, Other Counter (China) App, and Admin Site. My primary responsibility was developing the User App, focusing on its functionality and seamless user experience. \n Responsibilities:Communicated effectively with other mobile developers, backend developers, and the admin site team toensure smooth integration.\nDeveloped the User App using Provider, Clean Architecture, Go Router, and HTTP for API calls.\nIntegrated qr_code_scanner (^1.0.1) to implement a barcode scanning feature for parcels from randomproducts or online shops.\nImplemented features:\n\nSubmit and manage parcel addresses for delivery from China to Myanmar.Parcel tracking.\nReal-time notifications for parcel status updates.\nDelivery options based on user type (pickup or home delivery).",
    techStack: ["Flutter", "Provider", "Go Router", "Clean Architecture", "qr_code_scanner"],
    image: "/Thumbnail xh.png?height=200&width=300",
    images: [
      "/xh 1.png?height=600&width=300",
      "/xh 2.png?height=600&width=300",
      "/xh 3.png?height=600&width=300",
    ],
    // github: "https://github.com/username/fitness-tracker",
    // playStore: "https://play.google.com/store/apps/details?id=com.example.fitness",
    // appStore: "https://apps.apple.com/app/fitness-tracker/id123456789",
    featured: false,
  }
    ,
  {
    title: "汇率员",
    description:
      "Rate Reporting in Myanmar is a comprehensive app for tracking and reporting exchange rates in Myanmar. It provides real-time updates on currency values, allowing users to stay informed about the latest rates.",
    longDescription:
      "Aimed at users in China, this application was developed to enable real-time tracking of currency exchange rates and cryptocurrency prices. The platform also allowed admins to manage custom categories such as Exchange Currency, Crypto, Rice, and other goods and commodities—ensuring flexibility for a wide range of financial and trade use cases. \n Responsibilities: \n\n Implemented user authentication using Google and Apple Sign- In.\n Built an admin dashboard to dynamically manage exchange rates and cryptocurrency prices.\n Integrated system notifications to alert users of market changes and app updates.\n Used Syncfusion Flutter Charts to develop interactive and informative data visualizations.\n Developed and maintained robust API interactions using Dio, with proper error handling and response validation.\n Built scalable and reusable UI components to deliver a responsive and intuitive user experience.\n Technologies & Methodologies: \n\n Flutter Flavors: Managed multiple environments(development, staging, production) with ease andconsistency.\nEnvironment Variables: Enabled dynamic configuration, improving deployment flexibility across builds.\nProvider: Used for state management, ensuring consistent UI updates and responsive state handling.\nClean Architecture: Adopted to maintain code scalability, separation of concerns, and long - term maintainability.\n Dio + Retrofit: Used for efficient, scalable API communication with support for interceptors and errortracking.",
    techStack: ["Flutter", "Bloc", "Clean", "Firebase"],
    image: "/Rate Reporter Graphic.png?height=200&width=300",
    images: [
      "/Rate Reporter 1.png?height=600&width=300",
      "/Rate Reporter 2.png?height=600&width=300",
      "/Rate Reporter 3.png?height=600&width=300",
      "/Rate Reporter 4.png?height=600&width=300",
    ],
    // github: "https://github.com/username/food-delivery",
    playStore: "https://apkpure.com/%E6%B1%87%E7%8E%87%E5%91%98/com.joygroup.ratereporterproduction",
    appStore: "https://apps.apple.com/us/app/%E6%B1%87%E7%8E%87%E5%91%98/id6739500614",
    featured: true,
  },

  {
    title: "Shwe Pyae Phyo",
    description: "Developed ShwePyaePhyo, a mobile ecommerce application tailored for buying and browsing gold and jewelry products. The platform was designed to serve Myanmar customers with trusted pricing, detailed product visuals, and secure order handling for high-value, luxury items.",
    longDescription:
      "Developed ShwePyaePhyo, a mobile ecommerce application tailored for buying and browsing gold and jewelry products. The platform was designed to serve Myanmar customers with trusted pricing, detailed product visuals, and secure order handling for high-value, luxury items. \n \n Responsibilities:\nGold and jewelry catalog featuring high- resolution images and detailed specifications such as karat,weight, and type.\n Real - time gold price display with automatic price adjustment for each product based on market rates.\nWishlist and inquiry system to enable personalized engagement with high - value luxury items.\nSecure checkout supporting both home delivery and in -store pickup options.\nCustomer support integration directly within product and order screens for fast assistance.\n Implemented Features:\n\n Developed a rich product catalog showcasing gold and jewelry items with high - resolution images and detailed specifications such as karat value, weight, and type.\nIntegrated a real - time gold pricing system that dynamically adjusts product prices based on the current market rate.\n Enabled a wishlist and product inquiry feature to support personalized engagement and highinvolvement purchasing decisions.\n Built a secure and flexible checkout process, allowing users to choose between home delivery and instore pickup options.\n Embedded customer support access directly within product and order views, improving user trust and support response efficiency.\n Challenges:\n\n Ensured accurate pricing tied to daily gold rate fluctuations.\n Designed a luxurious, trustworthy UI for high - value transactions.\n Secured personal and payment data to build customer trust.\n Optimized image - heavy UI for performance without compromising quality.\n Handled localization for Myanmar language and formats.\n Managed real - time inventory and pricing updates.\n Implemented spam - safe inquiry forms with user - friendly validation.",
    techStack: ["Flutter", "REST API", "Bloc", "Hive"],
    image: "/shwepyaephyo.jpg?height=200&width=300",
    images: [
      "/shwepyaephyo1.webp?height=600&width=300",
      "/shwepyaephyo2.webp?height=600&width=300",
      "/shwepyaephyo3.webp?height=600&width=300",
      "/shwepyaephyo4.webp?height=600&width=300",
    ],
    // github: "https://github.com/username/travel-booking",
    // playStore: "https://play.google.com/store/apps/details?id=com.example.travel",
    appStore: "https://apps.apple.com/cy/app/shwepyaephyo/id6470454086",
    featured: false,
  },
  {
    title: "BinaryComputerStore",
    description: "Ecommerce app for Computer sales.",
    longDescription:
      "Binary Computer Store app is an ecommerce app for Computer sales and allows users to shop online, browse product catalogs, create wish lists, add items to a cart, and complete purchases.",
    techStack: ["Flutter", "GraphQL", "BLoC", "WebRTC"],
    image: "/binarycomputerstore.png?height=200&width=300",
    images: [
      "/BinaryComputerStore1.jpg?height=600&width=300",
      "/BinaryComputerStore2.webp?height=600&width=300",
      "/BinaryComputerStore3.webp?height=600&width=300",
    ],
    // github: "https://github.com/username/healthcare-app",
    playStore: "https://play.google.com/store/apps/details?id=com.hpe.binarys",
    appStore: "https://apps.apple.com/cy/app/binarycomputerstore/id6450131505",
    featured: false,
  },
  {
    title: "Wisdom Tree Library",
    description: "Developed Wisdom Tree Library, a mobile application designed to give users access to a wide collection of books, journals, and educational materials. The app supports both digital reading and physical book reservations, along with personalized book tracking features tailored for students and lifelong learners.",
    longDescription:
      "Developed Wisdom Tree Library, a mobile application designed to give users access to a wide collection of books, journals, and educational materials.The app supports both digital reading and physical book reservations, along with personalized book tracking features tailored for students and lifelong learners. \nResponsibilities: \n\n Built the mobile frontend using Provider, Clean Architecture, Go Router, and Dio to ensure maintainability and scalability.\nDesigned and implemented UI components for book listings, search, filters, and category- basednavigation to enhance user experience.\nIntegrated QR code - based check -in/check-out functionality and user-specific borrowing historytracking.\nCollaborated with the backend team to sync book availability, manage borrow limits, and support userauthentication for secure access.\nImplemented Features: \n\nSearch and browse digital library content by title, author, category, and language.\nBorrow and reserve system for both physical and digital books, including return tracking.\nQR code scanning for fast check -in/check-out and location tagging within physical libraries.\nReading history and bookmarks with support for personal reading goals and reminders.\nAdmin panel integration for inventory management and user access control.\nChallenges: \n\nDesigned an intuitive interface suitable for both academic users and casual readers.\nEnsured real - time synchronization of book availability and user activity across devices.\nManaged offline access and implemented caching strategies for smooth reading experiences without connectivity",
    techStack: ["Flutter", "Firebase", "riverpod", "Go Router", "Clean Architecture"],
    image: "/Wisdom Tree Library.webp?height=200&width=300",
    images: [
      "/Wisdom Tree Library 1.webp?height=600&width=300",
      "/Wisdom Tree Library 2.webp?height=600&width=300",
      "/Wisdom Tree Library 3.webp?height=600&width=300",
      "/Wisdom Tree Library 4.webp?height=600&width=300",
    ],
    // github: "https://github.com/username/learning-management",
    // playStore: "https://play.google.com/store/apps/details?id=com.example.learning",
    appStore: "https://apps.apple.com/cy/app/wisdom-tree-library/id6464262162",
    featured: false,
  },
  {
    title: "Royal Collection",
    description: "Developed Royal Collection, a mobile ecommerce application focused on selling a curated range ofcosmetics, skincare, and beauty products. The app delivers a premium shopping experience for users in Myanmar, featuring detailed product visuals, brand filtering, and fast, secure checkout options.",
    longDescription:
      "Developed Royal Collection, a mobile ecommerce application focused on selling a curated range ofcosmetics, skincare, and beauty products. The app delivers a premium shopping experience for users in Myanmar, featuring detailed product visuals, brand filtering, and fast, secure checkout options.\n  Responsibilities: Designed and developed the frontend using Riverpod, Clean Architecture, Go Router, and Dio forstructured development and smooth API communication.\n Created visually engaging UI components to highlight product quality, skin compatibility, and userreviews.\n Implemented smart search, brand filtering, and personalized product recommendations.\n Collaborated with backend developers to manage product inventory, promotional logic, and orderhistory.\n Implemented Features:\n \n Product catalog with skincare, makeup, fragrance, and personal care items, featuring high- qualityimages and ingredient highlights.\n Filter and search by brand, product type, category, and skin type.\n Promotions and bundle offers with real - time stock updates.\n Customer reviews and ratings displayed on product detail pages.\n Fast and secure checkout with support for multiple delivery addresses and varied payment methods.\n Challenges:\n \n Designing a visually elegant and trustworthy UI tailored to beauty - conscious consumers.\n Handling diverse product data, including ingredient lists, skin types, and shade compatibility.\n Ensuring smooth app performance and minimal load time despite media - heavy content.",
    techStack: ["Flutter", "Firebase", "GetX", "Go Router", "Clean Architecture"],
    image: "/Wisdom Tree Library.webp?height=200&width=300",
    images: [
      "/Royal Collection1.webp?height=600&width=300",
      "/Royal Collection2.webp?height=600&width=300",
      "/Royal Collection3.webp?height=600&width=300",
      "/Royal Collection4.webp?height=600&width=300",
    ],

    appStore: "https://apps.apple.com/cy/app/royal-collection/id6449526605",
    featured: false,
  },]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Product Manager at TechCorp",
      content:
        "Working with this Flutter developer was exceptional. They delivered a pixel-perfect app ahead of schedule with clean, maintainable code. Their attention to performance optimization was outstanding.",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Michael Chen",
      role: "CTO at StartupXYZ",
      content:
        "Incredible technical skills and collaborative attitude. They seamlessly integrated complex native modules and helped us scale our app to handle millions of users. Highly recommended!",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Emily Rodriguez",
      role: "Lead Developer at InnovateLab",
      content:
        "Their expertise in state management and Flutter architecture is top-notch. They consistently delivered high-quality code and were always reliable in meeting deadlines.",
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ]

  const socialLinks = [
    { Icon: Github, href: 'https://github.com/aungmyopaing890' },
    { Icon: Linkedin, href: 'https://www.linkedin.com/in/aungmyo-paing-080160148/' },
    { Icon: Mail, href: 'mailto:aungmyopaing890@gmail.com' },
  ];


  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[150] flex items-center justify-center">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 flex flex-col items-center space-y-4 animate-scale-in">
            <div className="loading-spinner"></div>
            <p className="text-gray-600 dark:text-gray-300 animate-pulse">Loading project details...</p>
          </div>
        </div>
      )}

      {/* Project Modal */}
      {selectedProject && (
        <div
          className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 modal-backdrop ${isModalClosing ? "modal-exit" : ""}`}
        >
          <div
            className={`bg-white dark:bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl modal-content ${isModalClosing ? "modal-exit" : ""}`}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 animate-fade-in-down">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                <Sparkles className="h-6 w-6 mr-2 text-blue-500 animate-spin-slow" />
                {selectedProject.title}
              </h3>
              <button
                onClick={closeProjectModal}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-300 hover:rotate-90 button-press"
              >
                <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
              <div className="grid lg:grid-cols-2 gap-6 p-6">
                {/* Image Slider */}
                <div className="space-y-4 animate-slide-in-left">
                  <div className="relative aspect-[9/16] bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden group">
                    <img
                      src={selectedProject.images[currentImageIndex] || "/placeholder.svg"}
                      alt={`${selectedProject.title} screenshot ${currentImageIndex + 1}`}
                      className="w-full h-full object-fill image-transition group-hover:scale-105"
                    />

                    {/* Navigation Arrows */}
                    {selectedProject.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all duration-300 hover:scale-110 button-press opacity-0 group-hover:opacity-100"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all duration-300 hover:scale-110 button-press opacity-0 group-hover:opacity-100"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </>
                    )}

                    {/* Image Indicators */}
                    {selectedProject.images.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                        {selectedProject.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentImageIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
                              }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Thumbnail Navigation */}
                  {selectedProject.images.length > 1 && (
                    <div className="flex space-x-2 overflow-x-auto animate-fade-in">
                      {selectedProject.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${index === currentImageIndex
                            ? "border-blue-500 shadow-lg shadow-blue-500/25"
                            : "border-gray-200 dark:border-gray-700 hover:border-blue-300"
                            }`}
                        >
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Project Details */}
                <div className="space-y-6 animate-slide-in-right">
                  <div className="animate-fade-in-up">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      <Rocket className="h-5 w-5 mr-2 text-purple-500" />
                      About This Project
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {selectedProject.longDescription.split('\n').map((line, idx) => (
                        <span key={idx}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div className="animate-fade-in-up animate-stagger-1">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      <Code className="h-5 w-5 mr-2 text-green-500" />
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.techStack?.map((tech, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 hover:scale-105 transition-transform duration-200 animate-bounce-in"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {/* scrollToSection(item.id) */}
                  {/* Action Buttons */}
                  <div className="space-y-4 animate-fade-in-up animate-stagger-2">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                      <Heart className="h-5 w-5 mr-2 text-red-500 animate-pulse" />
                      View Project
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {selectedProject.github && selectedProject.github.trim() !== "" && (
                        <Button
                          variant="outline"
                          className="flex items-center justify-center hover-lift button-press glow"
                          onClick={() => window.open(selectedProject.github, "_blank")}
                        >
                          <Github className="h-4 w-4 mr-2" />
                          GitHub
                        </Button>
                      )}

                      {selectedProject.playStore && selectedProject.playStore.trim() !== "" && (
                        <Button
                          variant="outline"
                          className="flex items-center justify-center hover-lift button-press"
                          onClick={() => window.open(selectedProject.playStore, "_blank")}
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Play Store
                        </Button>
                      )}
                      {selectedProject.appStore && selectedProject.appStore.trim() !== "" && (
                        <Button
                          variant="outline"
                          className="flex items-center justify-center hover-lift button-press"
                          onClick={() => window.open(selectedProject.appStore, "_blank")}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          App Store
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-700 animate-fade-in-down">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 animate-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                {"<Mobile Dev />"}
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-all duration-300 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105 ${activeSection === item.id ? "text-blue-600 dark:text-blue-400" : "text-gray-700 dark:text-gray-300"
                    } animate-fade-in-down`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 hover:rotate-180 button-press"
              >
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 hover:rotate-180 button-press"
              >
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 button-press"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 animate-slide-up">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-300 hover:scale-105 animate-fade-in ${activeSection === item.id
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900/20 relative overflow-hidden"
      >
        {/* Enhanced Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-float"></div>
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
          <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-green-400/5 rounded-full blur-3xl animate-pulse-slow"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="animate-fade-in-up">
            {/* Profile Image */}
            <div className="mt-20 sm:mt-0 mb-8 animate-bounce-in">
              <img
                src="/profile.png?height=200&width=200"
                alt="Aung Myo Paing - Flutter Developer"
                className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full mx-auto border-4 border-white dark:border-gray-700 shadow-xl object-cover hover:scale-110 transition-transform duration-500 glow"
              />
            </div>
            <h2 className="text-xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 dark:text-white mb-4 animate-fade-in-up">
              {"<Aung Myo Paing />"}
            </h2>
            <h1 className="text-3xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in-up">
              Senior Mobile
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient">
                {" "}
                Developer
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto animate-fade-in-up animate-stagger-1">
              4+ years crafting high-performance cross-platform mobile apps with pixel-perfect UI/UX and seamless native
              integrations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in-up animate-stagger-2">
              <a
                href="https://www.linkedin.com/in/aungmyo-paing-080160148/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg hover-lift button-press glow"
                >
                  <Linkedin className="h-3 w-3 mr-1" />
                  Hire Me
                  <ChevronDown className="ml-2 h-5 w-5 animate-bounce" />
                </Button>
              </a>

              {/* <Button variant="outline" onClick={() => scrollToSection("projects")}
                size="lg" className="px-8 py-3 text-lg hover-lift button-press">
                View Projects
                <ExternalLink className="ml-2 h-5 w-5" />
              </Button> */}

              <a
                href="https://github.com/aungmyopaing890"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" onClick={() => scrollToSection("projects")}
                  size="lg" className="px-8 py-3 text-lg hover-lift button-press">
                  <Github className="h-3 w-3 mr-1" />
                  GitHub
                </Button>
              </a>

              <a
                href="/Aung Myo Paing CV.pdf"
                download
              >
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg hover-lift button-press"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download CV
                </Button>
              </a>

            </div>
            <div className="flex justify-center space-x-8 text-gray-600 dark:text-gray-400 animate-fade-in-up animate-stagger-3">
              <div className="flex items-center hover:scale-110 transition-transform duration-300">
                <Smartphone className="h-6 w-6 mr-2 text-blue-600 animate-wiggle" />
                <span>Mobile Apps</span>
              </div>
              <div className="flex items-center hover:scale-110 transition-transform duration-300">
                <Zap className="h-6 w-6 mr-2 text-purple-600 animate-pulse" />
                <span>Performance</span>
              </div>
              <div className="flex items-center hover:scale-110 transition-transform duration-300">
                <Code className="h-6 w-6 mr-2 text-green-600 animate-spin-slow" />
                <span>Clean Code</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white dark:bg-gray-900" data-animate>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 ${visibleElements.has("about") ? "animate-fade-in-up" : "opacity-0"}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">About Me</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Passionate Mobile developer with a proven track record of delivering scalable, high-performance mobile
              applications
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`${visibleElements.has("about") ? "animate-slide-in-left" : "opacity-0"}`}>
              {/* Large Profile Image for About Section */}
              {/* <div className="flex justify-center lg:justify-start mb-8">
                <img
                  src="/placeholder.svg?height=300&width=300"
                  alt="Aung Myo Paing - Senior Flutter Developer"
                  className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl shadow-2xl object-cover border-4 border-gray-200 dark:border-gray-700 hover:scale-105 transition-transform duration-500 hover:rotate-2"
                />
              </div> */}
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Senior Mobile Developer</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                With over 4 years of experience building cross-platform applications for startups and enterprises, I
                specialize in creating pixel-perfect UIs with exceptional performance. My expertise spans the entire
                mobile development lifecycle, from architecture design to deployment and maintenance.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                I have a deep understanding of state management patterns (Riverpod, BLoC), native module integration,
                and performance optimization techniques. My attention to detail and collaborative approach have helped
                teams deliver successful products that scale to millions of users.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover-lift hover:scale-105 transition-all duration-300">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 animate-bounce-in">4+</div>
                  <div className="text-gray-600 dark:text-gray-300">Years Experience</div>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover-lift hover:scale-105 transition-all duration-300">
                  <div
                    className="text-3xl font-bold text-purple-600 dark:text-purple-400 animate-bounce-in"
                    style={{ animationDelay: "0.2s" }}
                  >
                    50+
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">Projects Completed</div>
                </div>
              </div>
            </div>

            <div className={`space-y-6 ${visibleElements.has("about") ? "animate-slide-in-right" : "opacity-0"}`}>
              {[
                {
                  icon: Smartphone,
                  color: "blue",
                  title: "Cross-Platform Expertise",
                  desc: "Single codebase, multiple platforms",
                },
                {
                  icon: Zap,
                  color: "purple",
                  title: "Performance Optimization",
                  desc: "60fps animations, efficient memory usage",
                },
                {
                  icon: Code,
                  color: "green",
                  title: "Clean Architecture",
                  desc: "Scalable, maintainable code patterns",
                },
                {
                  icon: Users,
                  color: "orange",
                  title: "Team Collaboration",
                  desc: "Agile methodologies, code reviews",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover-lift transition-all duration-300 hover:scale-105 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className={`p-3 bg-${item.color}-100 dark:bg-${item.color}-900/30 rounded-lg group-hover-rotate transition-transform duration-300`}
                  >
                    <item.icon className={`h-6 w-6 text-${item.color}-600 dark:text-${item.color}-400`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{item.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800" data-animate>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 ${visibleElements.has("projects") ? "animate-fade-in-up" : "opacity-0"}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Featured Projects</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Real-world Flutter applications showcasing scalable architecture, performance optimization, and
              pixel-perfect UI
            </p>
          </div>

          {/* Featured Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {projects
              .filter((project) => project.featured)
              .map((project, index) => (
                <Card
                  key={index}
                  className={`group hover:shadow-xl transition-all duration-500 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer hover-lift hover:scale-105 ${visibleElements.has("projects") ? "animate-fade-in-up" : "opacity-0"
                    }`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                  onClick={() => openProjectModal(project)}
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.techStack?.map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="secondary"
                          className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 hover:scale-110 transition-transform duration-200"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex space-x-4">
                      {project.website && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center button-press hover:scale-105 transition-transform duration-200"
                          onClick={(e) => {
                            e.stopPropagation()
                            window.open(project.website, "_blank")
                          }}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Website
                        </Button>
                      )}

                      {project.playStore && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center button-press hover:scale-105 transition-transform duration-200"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(project.playStore, "_blank");
                          }}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Play Store
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center button-press hover:scale-105 transition-transform duration-200"
                        onClick={(e) => {
                          e.stopPropagation()
                          window.open(project.appStore, "_blank")
                        }}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        App Store
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>

          {/* More Projects Section */}
          <div className="mb-8">
            <h3
              className={`text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center ${visibleElements.has("projects") ? "animate-fade-in-up" : "opacity-0"}`}
            >
              More Projects
            </h3>

            {/* Horizontal Scrollable Container */}
            <div className="relative w-full">
              <div className="flex overflow-x-scroll scrollbar-thin scrollbar-hide gap-6 pb-4 max-w-full" style={{ scrollSnapType: "x mandatory" }}>
                {projects
                  .filter((project) => !project.featured)
                  .map((project, index) => (
                    <Card
                      key={index}
                      className={`group hover:shadow-xl transition-all duration-500 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 overflow-hidden flex-shrink-0 w-80 cursor-pointer hover-lift hover:scale-105 ${visibleElements.has("projects") ? "animate-slide-in-right" : "opacity-0"
                        }`}
                      style={{ scrollSnapAlign: "start", animationDelay: `${index * 0.1}s` }}
                      onClick={() => openProjectModal(project)}
                    >
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                          {project.title}
                        </CardTitle>
                        <CardDescription className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                          {project.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex flex-wrap gap-1 mb-4">
                          {project.techStack?.slice(0, 3).map((tech, techIndex) => (
                            <Badge
                              key={techIndex}
                              variant="secondary"
                              className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs hover:scale-110 transition-transform duration-200"
                            >
                              {tech}
                            </Badge>
                          ))}
                          {project.techStack && project.techStack.length > 3 && (
                            <Badge
                              variant="secondary"
                              className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs"
                            >
                              +{project.techStack.length - 3}
                            </Badge>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          {project.github && project.github.trim() !== "" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center text-xs px-2 py-1 button-press hover:scale-105 transition-transform duration-200"
                              onClick={() => window.open(project.github, "_blank")}
                            >
                              <Github className="h-3 w-3 mr-1" />
                              GitHub
                            </Button>
                          )}

                          {project.playStore && project.playStore.trim() !== "" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center text-xs px-2 py-1 button-press hover:scale-105 transition-transform duration-200" onClick={() => window.open(project.playStore, "_blank")}
                            >
                              <Play className="h-3 w-3 mr-1" />
                              Play Store
                            </Button>
                          )}
                          {project.appStore && project.appStore.trim() !== "" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center text-xs px-2 py-1 button-press hover:scale-105 transition-transform duration-200" onClick={() => window.open(project.appStore, "_blank")}
                            >
                              <Download className="h-3 w-3 mr-1" />
                              App Store
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center text-xs px-2 py-1 button-press hover:scale-105 transition-transform duration-200"
                            onClick={(e) => {
                              e.stopPropagation()
                              openProjectModal(project)
                            }}
                          >
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>

              {/* Scroll Indicators */}
              <div className="flex justify-center mt-4 space-x-2">
                {projects
                  .filter((project) => !project.featured)
                  .map((_, index) => (
                    <div key={index} className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 animate-pulse" />
                  ))}
              </div>
            </div>

            {/* Swipe Hint */}
            <div className="text-center mt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center animate-bounce">
                <span className="mr-2">Swipe to see more projects</span>
                <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-white dark:bg-gray-900" data-animate>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 ${visibleElements.has("skills") ? "animate-fade-in-up" : "opacity-0"}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Skills & Technologies</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive expertise in Flutter ecosystem and modern mobile development tools
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <div
                key={index}
                className={`space-y-2 ${visibleElements.has("skills") ? "animate-fade-in-up" : "opacity-0"}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900 dark:text-white">{skill.name}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-1000 ease-out animate-shimmer"
                    style={{
                      width: visibleElements.has("skills") ? `${skill.level}%` : "0%",
                      backgroundImage: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                      backgroundSize: "200px 100%",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div
            className={`mt-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 text-center ${visibleElements.has("skills") ? "animate-fade-in-up" : "opacity-0"}`}
          >
            {["Flutter", "Dart", "Firebase", "GraphQL", "Riverpod", "BLoC"].map((tech, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-md transition-all duration-300 hover-lift hover:scale-110 animate-bounce-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center group-hover-rotate transition-transform duration-300">
                  <Code className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white dark:bg-gray-900" data-animate>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 ${visibleElements.has("contact") ? "animate-fade-in-up" : "opacity-0"}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Let's Work Together</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Ready to bring your mobile app idea to life? Let's discuss your project
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className={`${visibleElements.has("contact") ? "animate-slide-in-left" : "opacity-0"}`}>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Get In Touch</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                I'm always interested in new opportunities and exciting projects. Whether you need a complete mobile app
                or want to enhance an existing one, I'd love to hear from you.
              </p>

              <div className="space-y-4">
                {[
                  { icon: Mail, title: "Email", value: "aungmyopaing@gmail.com" },
                  { icon: Linkedin, title: "LinkedIn", value: "https://www.linkedin.com/in/aungmyo-paing-080160148/" },
                  { icon: Github, title: "GitHub", value: "https://github.com/aungmyopaing890" },
                ].map((contact, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 hover-lift transition-all duration-300 hover:scale-105 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover-rotate transition-transform duration-300">
                      <contact.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">{contact.title}</div>
                      <div className="text-gray-600 dark:text-gray-300">{contact.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Card
              className={`bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover-lift transition-all duration-500 ${visibleElements.has("contact") ? "animate-slide-in-right" : "opacity-0"}`}
            >
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Send Message</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Fill out the form below and I'll get back to you within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="animate-fade-in-up">
                    <Input
                      placeholder="Your Name"
                      className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 focus:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <div className="animate-fade-in-up animate-stagger-1">
                    <Input
                      type="email"
                      placeholder="Your Email"
                      className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 focus:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <div className="animate-fade-in-up animate-stagger-2">
                    <Textarea
                      placeholder="Your Message"
                      rows={4}
                      className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 focus:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white hover-lift button-press glow animate-fade-in-up animate-stagger-3">
                    Send Message
                    <Mail className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 dark:bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center animate-fade-in-up">
            <div className="mb-4 md:mb-0">
              <span className="text-2xl font-bold text-blue-400 animate-gradient bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                {"<Mobile Dev />"}
              </span>
              <p className="text-gray-400 mt-2">Senior Mobile Developer</p>
            </div>
            <div className="flex space-x-6">
              {/* {[Github, Linkedin, Mail].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-125 hover:rotate-12 animate-bounce-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Icon className="h-6 w-6" />
                </a>
              ))} */}
              {socialLinks.map(({ Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-125 hover:rotate-12 animate-bounce-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 animate-fade-in-up animate-stagger-1">
            <p>&copy; {new Date().getFullYear()} Senior Mobile Developer Portfolio. All rights reserved.</p>
            <p>Developed by Aung Myo Paing</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
