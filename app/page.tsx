"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
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
  GraduationCap,
  BookOpen,
  Brain,
  Target,
  TrendingUp,
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
  const observerRef = useRef<IntersectionObserver | null>(null)

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

  const openProjectModal = (project: Project) => {
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
    const handleEscape = (e: KeyboardEvent) => {
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
    { id: "experience", label: "Experience" },
    { id: "learning", label: "Learning" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Tech Stack" },
    { id: "contact", label: "Contact" },
  ]

  const techStack = [
    { name: "Flutter", logo: "/logos/flutter.png" },
    { name: "Dart", logo: "/logos/dart.png" },
    { name: "Swift", logo: "/logos/swift.png" },
    { name: "SwiftUI", logo: "/logos/swiftui.png" },
    { name: "kotlin", logo: "/logos/kotlin.png" },
    { name: "Java", logo: "/logos/java.png" },
    { name: "React", logo: "/logos/react.svg" },
    { name: "Next.js", logo: "/logos/nextjs.svg" },
    { name: "Nodejs", logo: "/logos/nodejs.png" },
    { name: "Node Express", logo: "/logos/node express.png" },
    { name: "Firebase", logo: "/logos/firebase.svg" },
    { name: "REST APIs", logo: "/logos/restapi.png" },
    { name: "GraphQL", logo: "/logos/graphql.png" },
    { name: "Riverpod", logo: "/logos/riverpod.png" },
    { name: "BLoC", logo: "/logos/bloc.png" },
    { name: "Provider", logo: "/logos/provider.png" },
    { name: "GetX", logo: "/logos/getx.png" },
    { name: "Hive", logo: "/logos/hive.png" },
    { name: "SQLite", logo: "/logos/sqlite.png" },
    { name: "Git", logo: "/logos/git.png" },
    { name: "CI/CD", logo: "/logos/cicd.png" },
    { name: "Testing", logo: "/logos/testing.png" },
    { name: "Clean", logo: "/logos/Layers-of-Clean-Architecture.webp" },
  ]

  const projects = [
    {
      title: "GR News",
      description:
        "Global Reporter is a news application that delivers accurate information with a wide variety of news types.",
      longDescription:
        "Worked collaboratively with another Flutter developer to build a news application that delivered both globaland local news content, personalized by the user's selected country. The app featured real-timecategorization into Breaking News, Hot News, and other relevant topics. \n\nResponsibilities:\n\nDeveloped core features for delivering both global and local news, tailored to the user's region andpreferences.\n\nImplemented push notifications for breaking news alerts and critical system updates to improve userengagement.\n\n Ensured smooth handling of localized and international news feeds with a strong focus on performance, data consistency, and real- time updates",
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
        "/kwee lamin 3.png?height=600&width=300",
        "/kwee lamin 4.png?height=600&width=300",
      ],
      website: "https://www.kweelamin.com/",
      // playStore: "https://apps.apple.com/cy/app/kwee-lamin/id6451135120",
      appStore: "https://apps.apple.com/cy/app/kwee-lamin/id6451135120",
      featured: true,
    },

    {
      title: "Food.com.mm",
      description: "Our app is your one-stop-shop for all your food and product needs.",
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
      description:
        "Developed the User App for a cross-border logistics platform (China–Myanmar), enabling parcel submission, tracking, and delivery management. Built with Flutter using Provider, Clean Architecture, Go Router, and barcode scanning. Supported real-time notifications and delivery options by user type. Collaborated with backend and admin teams to ensure seamless integration.",
      longDescription:
        "Developed a logistics app for cross-border transportation between China and Myanmar, designed to cater to various user types. The project included the User App, Rider App, Main Counter (China) App, Other Counter (China) App, and Admin Site. My primary responsibility was developing the User App, focusing on its functionality and seamless user experience. \n Responsibilities:Communicated effectively with other mobile developers, backend developers, and the admin site team toensure smooth integration.\nDeveloped the User App using Provider, Clean Architecture, Go Router, and HTTP for API calls.\nIntegrated qr_code_scanner (^1.0.1) to implement a barcode scanning feature for parcels from randomproducts or online shops.\nImplemented features:\n\nSubmit and manage parcel addresses for delivery from China to Myanmar.Parcel tracking.\nReal-time notifications for parcel status updates.\nDelivery options based on user type (pickup or home delivery).",
      techStack: ["Flutter", "Provider", "Go Router", "Clean Architecture", "qr_code_scanner"],
      image: "/Thumbnail xh.png?height=200&width=300",
      images: ["/xh 1.png?height=600&width=300", "/xh 2.png?height=600&width=300", "/xh 3.png?height=600&width=300"],
      // github: "https://github.com/username/fitness-tracker",
      // playStore: "https://play.google.com/store/apps/details?id=com.example.fitness",
      // appStore: "https://apps.apple.com/app/fitness-tracker/id123456789",
      featured: false,
    },
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
      description:
        "Developed ShwePyaePhyo, a mobile ecommerce application tailored for buying and browsing gold and jewelry products. The platform was designed to serve Myanmar customers with trusted pricing, detailed product visuals, and secure order handling for high-value, luxury items.",
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
      description:
        "Developed Wisdom Tree Library, a mobile application designed to give users access to a wide collection of books, journals, and educational materials. The app supports both digital reading and physical book reservations, along with personalized book tracking features tailored for students and lifelong learners.",
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
      description:
        "Developed Royal Collection, a mobile ecommerce application focused on selling a curated range ofcosmetics, skincare, and beauty products. The app delivers a premium shopping experience for users in Myanmar, featuring detailed product visuals, brand filtering, and fast, secure checkout options.",
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
    },
  ]

  const socialLinks = [
    { Icon: Github, href: "https://github.com/aungmyopaing890" },
    { Icon: Linkedin, href: "https://www.linkedin.com/in/aungmyo-paing-080160148/" },
    { Icon: Mail, href: "mailto:aungmyopaing890@gmail.com" },
  ]

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
                      {selectedProject.longDescription.split("\n").map((line, idx) => (
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
                          className="flex items-center justify-center hover-lift button-press glow bg-transparent"
                          onClick={() => window.open(selectedProject.github as string, "_blank")}
                        >
                          <Github className="h-4 w-4 mr-2" />
                          GitHub
                        </Button>
                      )}

                      {selectedProject.playStore && selectedProject.playStore.trim() !== "" && (
                        <Button
                          variant="outline"
                          className="flex items-center justify-center hover-lift button-press bg-transparent"
                          onClick={() => window.open(selectedProject.playStore as string, "_blank")}
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Play Store
                        </Button>
                      )}
                      {selectedProject.appStore && selectedProject.appStore.trim() !== "" && (
                        <Button
                          variant="outline"
                          className="flex items-center justify-center hover-lift button-press bg-transparent"
                          onClick={() => window.open(selectedProject.appStore as string, "_blank")}
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
              Senior Software
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient">
                {" "}
                Engineer
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto animate-fade-in-up animate-stagger-1">
              5+ years building full-stack solutions with production-grade backends (Python, Node.js) and modern web/mobile frontends (React, Next.js, Flutter) for global teams
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in-up animate-stagger-2">
              <a href="https://www.linkedin.com/in/aungmyo-paing-080160148/" target="_blank" rel="noopener noreferrer">
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

              <a href="https://github.com/aungmyopaing890" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  onClick={() => scrollToSection("projects")}
                  size="lg"
                  className="px-8 py-3 text-lg hover-lift button-press"
                >
                  <Github className="h-3 w-3 mr-1" />
                  GitHub
                </Button>
              </a>

              <a href="/Aung Myo Paing CV.pdf" download>
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
              Full-stack developer with 5+ years building production software — from mobile into end-to-end web and
              backend systems.
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
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Senior Software Engineer</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                I'm a Full Stack Developer at Beyond Climate Solutions in Pathum Thani, Thailand, working on the CLDB
                Platform for the Thai Meteorological Department — Flutter apps backed by Python data workflows and
                interactive visualisations for climate monitoring and disaster management. Over 5+ years I've built
                production software, starting in mobile and growing into full-stack work across Flutter, React, Next.js,
                Python and Node.js.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                I care about clean architecture, state management (BLoC, Riverpod, Provider) and performance — 60fps UI,
                efficient memory, and code that stays maintainable as it scales. Alongside that I'm studying mathematics
                and AI research in a structured way, currently Mathematics for Computer Science and AI For Everyone,
                working towards reading and reproducing machine learning papers. I enjoy solving complex problems through
                code, and I'm always happy to talk Flutter, Swift, Next.js and backend design.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover-lift hover:scale-105 transition-all duration-300">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 animate-bounce-in">5+</div>
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
      {/* Tech Stack Section */}
      <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800" data-animate>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 ${visibleElements.has("skills") ? "animate-fade-in-up" : "opacity-0"}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Tech Stack</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Technologies and tools I use to build robust, scalable solutions
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className={`group bg-gray-800 dark:bg-gray-900 border border-gray-700 dark:border-gray-600 rounded-lg p-6 text-center hover:scale-105 transition-all duration-300 hover:shadow-lg ${visibleElements.has("skills") ? "animate-fade-in-up" : "opacity-0"
                  }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-3 flex justify-center">
                  <img
                    src={tech.logo}
                    alt={tech.name}
                    className="h-10 w-10 object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="text-sm text-gray-300 dark:text-gray-400 font-medium">{tech.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Experience Section */}
      {/* Experience Section */}
      <section id="experience" className="py-20 bg-white dark:bg-gray-900" data-animate>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-16 ${visibleElements.has("experience") ? "animate-fade-in-up" : "opacity-0"}`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Work Experience</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              My professional journey in mobile development across different companies and roles
            </p>
          </div>

          {/* Mobile-First Timeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line - Hidden on mobile, visible on larger screens */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200 dark:bg-blue-800 rounded-full"></div>

            {/* Mobile Timeline Line - Left aligned */}
            <div className="lg:hidden absolute left-6 top-0 w-0.5 h-full bg-blue-200 dark:bg-blue-800 rounded-full"></div>

            {/* Experience Items */}
            <div className="space-y-8 lg:space-y-12">
              {/* Full Stack Developer - Beyond Climate Solutions */}
              <div className={`relative ${visibleElements.has("experience") ? "animate-slide-in-left" : "opacity-0"}`}>
                {/* Mobile Timeline Dot */}
                <div className="lg:hidden absolute left-4 top-6 w-4 h-4 bg-blue-600 rounded-full border-4 border-white dark:border-gray-900 shadow-lg z-10"></div>

                {/* Desktop Timeline Dot */}
                <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 top-6 w-4 h-4 bg-blue-600 rounded-full border-4 border-white dark:border-gray-900 shadow-lg z-10"></div>

                {/* Content Card */}
                <div className="ml-12 lg:ml-0 lg:flex lg:items-center">
                  <div className="lg:flex-1 lg:pr-8 lg:text-right">
                    <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover-lift transition-all duration-300 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                          <div className="mb-2 sm:mb-0">
                            <Badge className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm px-3 py-1">
                              Current
                            </Badge>
                          </div>
                          <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">01/2026 – Present</div>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                          Full Stack Developer
                        </h3>
                        <p className="text-blue-600 dark:text-blue-400 font-semibold text-lg mb-2">
                          Beyond Climate Solutions
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 flex items-center">
                          <span className="inline-block w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                          Pathum Thani, Thailand · On-site
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                          Led full-stack development of CLDB Platform for Thai Meteorological Department, architecting mobile apps in Flutter while implementing Python-based data workflows and interactive visualizations for climate monitoring and disaster management.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="hidden lg:block lg:flex-1 lg:pl-8"></div>
                </div>
              </div>

              {/* Senior Flutter Developer - JoyGroup International */}
              <div
                className={`relative ${visibleElements.has("experience") ? "animate-slide-in-right" : "opacity-0"}`}
                style={{ animationDelay: "0.2s" }}
              >
                {/* Mobile Timeline Dot */}
                <div className="lg:hidden absolute left-4 top-6 w-4 h-4 bg-purple-600 rounded-full border-4 border-white dark:border-gray-900 shadow-lg z-10"></div>

                {/* Desktop Timeline Dot */}
                <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 top-6 w-4 h-4 bg-purple-600 rounded-full border-4 border-white dark:border-gray-900 shadow-lg z-10"></div>

                {/* Content Card */}
                <div className="ml-12 lg:ml-0 lg:flex lg:items-center">
                  <div className="hidden lg:block lg:flex-1 lg:pr-8"></div>
                  <div className="lg:flex-1 lg:pl-8">
                    <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover-lift transition-all duration-300 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                          <div className="mb-2 sm:mb-0">
                            <Badge className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-sm px-3 py-1">
                              Previous
                            </Badge>
                          </div>
                          <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">11/2023 – 07/2025</div>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                          Senior Flutter Developer
                        </h3>
                        <p className="text-purple-600 dark:text-purple-400 font-semibold text-lg mb-2">JoyGroup International</p>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 flex items-center">
                          <span className="inline-block w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                          Bangkok, Thailand
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                          Led mobile development projects, mentored junior developers, and architected scalable Flutter
                          applications for international markets.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              {/* Mid Senior Flutter Developer - App.com.mm */}
              <div
                className={`relative ${visibleElements.has("experience") ? "animate-slide-in-left" : "opacity-0"}`}
                style={{ animationDelay: "0.4s" }}
              >
                {/* Mobile Timeline Dot */}
                <div className="lg:hidden absolute left-4 top-6 w-4 h-4 bg-indigo-600 rounded-full border-4 border-white dark:border-gray-900 shadow-lg z-10"></div>

                {/* Desktop Timeline Dot */}
                <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 top-6 w-4 h-4 bg-indigo-600 rounded-full border-4 border-white dark:border-gray-900 shadow-lg z-10"></div>

                {/* Content Card */}
                <div className="ml-12 lg:ml-0 lg:flex lg:items-center">
                  <div className="lg:flex-1 lg:pr-8 lg:text-right">
                    <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover-lift transition-all duration-300 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                          <div className="mb-2 sm:mb-0">
                            <Badge className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 text-sm px-3 py-1">
                              Previous
                            </Badge>
                          </div>
                          <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">04/2023 - 11/2023</div>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                          Mid Senior Flutter Developer
                        </h3>
                        <p className="text-indigo-600 dark:text-indigo-400 font-semibold text-lg mb-2">App.com.mm</p>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 flex items-center">
                          <span className="inline-block w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                          Yangon, Myanmar
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                          Developed complex e-commerce and logistics applications, implemented advanced state management
                          patterns, and optimized app performance for large user bases.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="hidden lg:block lg:flex-1 lg:pl-8"></div>
                </div>
              </div>

              {/* Junior Flutter Developer - PanaceaSoft */}
              <div
                className={`relative ${visibleElements.has("experience") ? "animate-slide-in-left" : "opacity-0"}`}
                style={{ animationDelay: "0.6s" }}
              >
                {/* Mobile Timeline Dot */}
                <div className="lg:hidden absolute left-4 top-6 w-4 h-4 bg-green-600 rounded-full border-4 border-white dark:border-gray-900 shadow-lg z-10"></div>

                {/* Desktop Timeline Dot */}
                <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 top-6 w-4 h-4 bg-green-600 rounded-full border-4 border-white dark:border-gray-900 shadow-lg z-10"></div>

                {/* Content Card */}
                <div className="ml-12 lg:ml-0 lg:flex lg:items-center">
                  <div className="lg:flex-1 lg:pr-8 lg:text-right">
                    <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover-lift transition-all duration-300 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                          <div className="mb-2 sm:mb-0">
                            <Badge className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm px-3 py-1">
                              Previous
                            </Badge>
                          </div>
                          <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">09/2022 – 04/2023</div>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                          Junior Flutter Developer
                        </h3>
                        <p className="text-green-600 dark:text-green-400 font-semibold text-lg mb-2">PanaceaSoft</p>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 flex items-center">
                          <span className="inline-block w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                          Yangon, Myanmar
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                          Built mobile applications with clean architecture, integrated REST APIs, and collaborated with
                          cross-functional teams to deliver high-quality products.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="hidden lg:block lg:flex-1 lg:pl-8"></div>
                </div>
              </div>

              {/* Junior Flutter Developer - TechPlusSolution */}
              <div
                className={`relative ${visibleElements.has("experience") ? "animate-slide-in-right" : "opacity-0"}`}
                style={{ animationDelay: "0.8s" }}
              >
                {/* Mobile Timeline Dot */}
                <div className="lg:hidden absolute left-4 top-6 w-4 h-4 bg-orange-600 rounded-full border-4 border-white dark:border-gray-900 shadow-lg z-10"></div>

                {/* Desktop Timeline Dot */}
                <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 top-6 w-4 h-4 bg-orange-600 rounded-full border-4 border-white dark:border-gray-900 shadow-lg z-10"></div>

                {/* Content Card */}
                <div className="ml-12 lg:ml-0 lg:flex lg:items-center">
                  <div className="hidden lg:block lg:flex-1 lg:pr-8"></div>
                  <div className="lg:flex-1 lg:pl-8">
                    <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover-lift transition-all duration-300 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                          <div className="mb-2 sm:mb-0">
                            <Badge className="bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 text-sm px-3 py-1">
                              Previous
                            </Badge>
                          </div>
                          <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">04/2021 – 08/2022</div>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                          Junior Flutter Developer
                        </h3>
                        <p className="text-orange-600 dark:text-orange-400 font-semibold text-lg mb-2">
                          TechPlusSolutions
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 flex items-center">
                          <span className="inline-block w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                          Yangon, Myanmar
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                          Started my Flutter development journey, learned mobile app fundamentals, and contributed to
                          various client projects while building strong technical foundations.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Currently Learning Section */}
      <section id="learning" className="py-20 bg-gray-50 dark:bg-gray-800" data-animate>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 ${visibleElements.has("learning") ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="inline-flex items-center justify-center p-3 mb-4 bg-blue-100 dark:bg-blue-900/30 rounded-2xl">
              <GraduationCap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Currently Learning</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Working through mathematics, machine learning, and paper reading so I can understand, reproduce, and
              eventually write AI research papers.
            </p>
            <p className="text-base text-gray-500 dark:text-gray-400 max-w-3xl mx-auto mt-4">
              <span className="font-semibold text-gray-700 dark:text-gray-200">12–18 months, 8–10 hrs/week.</span>{" "}
              One course + one maths topic + one paper + one project at a time — no collecting certificates.
            </p>
          </div>

          {/* Progress Badges */}
          <div
            className={`flex flex-wrap justify-center gap-3 mb-12 ${
              visibleElements.has("learning") ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            {[
              { label: "Maths for Computer Science — Modules 1–2 of 4", done: true },
              { label: "Practice assignments — 6 passed · avg 98%", done: true },
              { label: "AI For Everyone — Just started", done: false },
              { label: "Research Paper Assistant — In progress", done: false },
            ].map((badge, index) => (
              <Badge
                key={index}
                variant="secondary"
                className={`text-sm px-4 py-2 hover:scale-105 transition-transform duration-200 ${
                  badge.done
                    ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                    : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                }`}
              >
                {badge.label}
              </Badge>
            ))}
          </div>

          {/* Track Cards */}
          <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            {[
              {
                icon: Brain,
                color: "blue",
                track: "Mathematics",
                topic: "Module 2 — operations with binary numbers, number representation",
              },
              {
                icon: BookOpen,
                color: "purple",
                track: "AI Course",
                topic: "AI For Everyone",
              },
              {
                icon: Target,
                color: "green",
                track: "Project",
                topic: "Research Paper Assistant — defining the first useful version",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className={`bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover-lift transition-all duration-300 hover:scale-105 ${
                  visibleElements.has("learning") ? "animate-fade-in-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <CardContent className="p-6">
                  <div className={`inline-flex p-3 mb-4 bg-${item.color}-100 dark:bg-${item.color}-900/30 rounded-lg`}>
                    <item.icon className={`h-6 w-6 text-${item.color}-600 dark:text-${item.color}-400`} />
                  </div>
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
                    {item.track}
                  </h4>
                  <p className="text-gray-800 dark:text-gray-200 leading-relaxed">{item.topic}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Up Next */}
          <div
            className={`max-w-3xl mx-auto ${visibleElements.has("learning") ? "animate-fade-in-up" : "opacity-0"}`}
          >
            <div className="flex items-start sm:items-center gap-4 p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg shrink-0">
                <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Up next</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Sequences and series · Machine Learning Specialization · first paper summaries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white dark:bg-gray-900" data-animate>
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
                          className="flex items-center button-press hover:scale-105 transition-transform duration-200 bg-transparent"
                          onClick={(e: React.MouseEvent) => {
                            e.stopPropagation()
                            window.open(project.website as string, "_blank")
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
                          className="flex items-center button-press hover:scale-105 transition-transform duration-200 bg-transparent"
                          onClick={(e: React.MouseEvent) => {
                            e.stopPropagation()
                            window.open(project.playStore as string, "_blank")
                          }}
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Play Store
                        </Button>
                      )}

                      {project.appStore && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center button-press hover:scale-105 transition-transform duration-200 bg-transparent"
                          onClick={(e: React.MouseEvent) => {
                            e.stopPropagation()
                            window.open(project.appStore as string, "_blank")
                          }}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          App Store
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>

          {/* Additional Projects */}
          <div className={`${visibleElements.has("projects") ? "animate-fade-in-up" : "opacity-0"}`}>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">More Projects</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects
                .filter((project) => !project.featured)
                .map((project, index) => (
                  <Card
                    key={index}
                    className={`group hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 cursor-pointer hover-lift hover:scale-105 animate-fade-in-up`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => openProjectModal(project)}
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {project.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {project.techStack?.slice(0, 3).map((tech, techIndex) => (
                          <Badge
                            key={techIndex}
                            variant="secondary"
                            className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:scale-110 transition-transform duration-200"
                          >
                            {tech}
                          </Badge>
                        ))}
                        {project.techStack && project.techStack.length > 3 && (
                          <Badge
                            variant="secondary"
                            className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                          >
                            +{project.techStack.length - 3}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </section>


      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white dark:bg-gray-900" data-animate>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 ${visibleElements.has("contact") ? "animate-fade-in-up" : "opacity-0"}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Ready to bring your mobile app idea to life? Let's discuss your project and create something amazing
              together.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className={`space-y-8 ${visibleElements.has("contact") ? "animate-slide-in-left" : "opacity-0"}`}>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Let's Connect</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  I'm always interested in new opportunities and exciting projects. Whether you need a complete mobile
                  app, performance optimization, or technical consultation, I'd love to hear from you.
                </p>
              </div>

              <div className="space-y-6">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover-lift transition-all duration-300 hover:scale-105 group animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <link.Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {link.Icon === Github && "GitHub"}
                        {link.Icon === Linkedin && "LinkedIn"}
                        {link.Icon === Mail && "Email"}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        {link.Icon === Github && "View my repositories"}
                        {link.Icon === Linkedin && "Connect professionally"}
                        {link.Icon === Mail && "Send me a message"}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className={`${visibleElements.has("contact") ? "animate-slide-in-right" : "opacity-0"}`}>
              <Card className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Send a Message</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    Fill out the form below and I'll get back to you within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          placeholder="John"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 hover:scale-105 focus:scale-105"
                        />
                      </div>
                      <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          placeholder="Doe"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 hover:scale-105 focus:scale-105"
                        />
                      </div>
                    </div>
                    <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 hover:scale-105 focus:scale-105"
                      />
                    </div>
                    <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                      <input
                        type="text"
                        placeholder="Project Discussion"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 hover:scale-105 focus:scale-105"
                      />
                    </div>
                    <div className="animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                      <textarea
                        placeholder="Tell me about your project..."
                        rows={5}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 hover:scale-105 focus:scale-105"
                      ></textarea>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg hover-lift button-press glow animate-fade-in-up"
                      style={{ animationDelay: "0.6s" }}
                    >
                      Send Message
                      <Mail className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center space-x-6 mb-8">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-800 dark:bg-gray-900 rounded-full hover:bg-blue-600 dark:hover:bg-blue-600 transition-all duration-300 hover:scale-110 hover:-translate-y-1 button-press"
                >
                  <link.Icon className="h-6 w-6" />
                </a>
              ))}
            </div>
            <p className="text-gray-400 mb-4">
              © 2026 Aung Myo Paing. All rights reserved. Built with Next.js and Tailwind CSS.
            </p>
            <p className="text-gray-500 text-sm">
              Building thoughtful software across mobile, web and backend — one line of code at a time.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
