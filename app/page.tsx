"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  Users,
  Award,
  Heart,
  GraduationCap,
  Microscope,
  Palette,
  Computer,
  Globe,
  Trophy,
  MapPin,
  Phone,
  Mail,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"

export default function SchoolPortfolio() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({})
  const observerRef = useRef<IntersectionObserver | null>(null)

  const heroSlides = [
    {
      title: "Myanmar Excellence Academy",
      subtitle: "Empowering Future Leaders Through Excellence in Education",
      description:
        "Join our community of learners and discover your potential in a nurturing, world-class environment.",
      background: "from-blue-600 to-blue-800",
      image: "/placeholder.svg?height=600&width=1200",
    },
    {
      title: "Academic Excellence",
      subtitle: "Rigorous Curriculum, Outstanding Results",
      description: "Our comprehensive academic programs prepare students for success in top universities worldwide.",
      background: "from-green-600 to-green-800",
      image: "/placeholder.svg?height=600&width=1200",
    },
    {
      title: "Modern Facilities",
      subtitle: "State-of-the-Art Learning Environment",
      description: "Experience learning in our cutting-edge classrooms, laboratories, and technology centers.",
      background: "from-purple-600 to-purple-800",
      image: "/placeholder.svg?height=600&width=1200",
    },
    {
      title: "Global Community",
      subtitle: "Preparing Students for International Success",
      description: "Our diverse community and international programs open doors to global opportunities.",
      background: "from-orange-600 to-orange-800",
      image: "/placeholder.svg?height=600&width=1200",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }))
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = document.querySelectorAll("[data-animate]")
    elements.forEach((el) => {
      if (observerRef.current) {
        observerRef.current.observe(el)
      }
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50 animate-slide-down">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center animate-fade-in">
              <GraduationCap className="h-8 w-8 text-blue-600 animate-bounce-gentle" />
              <span className="ml-2 text-xl font-bold text-gray-900">Myanmar Excellence Academy</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {["Home", "About", "Programs", "Admission", "Campus Life", "Contact"].map((item, index) => (
                  <Link
                    key={item}
                    href={`#${item.toLowerCase().replace(" ", "")}`}
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 animate-fade-in-stagger"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide
                ? "translate-x-0 opacity-100"
                : index < currentSlide
                  ? "-translate-x-full opacity-0"
                  : "translate-x-full opacity-0"
            }`}
          >
            <div className={`relative h-full bg-gradient-to-r ${slide.background} text-white`}>
              <div className="absolute inset-0 bg-black opacity-20"></div>
              <div
                className="absolute inset-0 bg-cover bg-center opacity-30 animate-ken-burns"
                style={{ backgroundImage: `url(${slide.image})` }}
              ></div>
              <div className="relative h-full flex items-center justify-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                  <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">{slide.title}</h1>
                  <p className="text-xl md:text-2xl mb-4 text-blue-100 animate-fade-in-up-delay">{slide.subtitle}</p>
                  <p className="text-lg mb-8 text-blue-50 max-w-3xl mx-auto animate-fade-in-up-delay-2">
                    {slide.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up-delay-3">
                    <Button
                      size="lg"
                      className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 transform hover:scale-105 transition-all duration-300 animate-pulse-gentle"
                    >
                      Apply Now
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 transform hover:scale-105 transition-all duration-300"
                    >
                      Visit Campus
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300 z-10 hover:scale-110 animate-float"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300 z-10 hover:scale-110 animate-float-delay"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                index === currentSlide ? "bg-white animate-pulse" : "bg-white bg-opacity-50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-16 bg-gray-50" data-animate>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-12 transition-all duration-1000 ${isVisible.about ? "animate-fade-in-up" : "opacity-0 translate-y-10"}`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About Our School</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Founded with a vision to provide world-class education in Myanmar, we are committed to nurturing young
              minds and preparing them for global success.
            </p>
          </div>

          <div
            className={`grid md:grid-cols-2 gap-12 items-center mb-16 transition-all duration-1000 delay-200 ${isVisible.about ? "animate-fade-in-left" : "opacity-0 -translate-x-10"}`}
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 animate-fade-in-right">Our Mission</h3>
              <p className="text-gray-600 mb-6 animate-fade-in-right-delay">
                To provide exceptional education that develops critical thinking, creativity, and character in our
                students, preparing them to become responsible global citizens and future leaders.
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 animate-fade-in-right-delay-2">Our Vision</h3>
              <p className="text-gray-600 animate-fade-in-right-delay-3">
                To be Myanmar's premier educational institution, recognized for academic excellence, innovative teaching
                methods, and the holistic development of our students.
              </p>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Students in classroom"
                width={600}
                height={400}
                className="rounded-lg shadow-lg transform hover:scale-105 transition-all duration-500 animate-fade-in-scale"
              />
            </div>
          </div>

          {/* Core Values */}
          <div
            className={`grid md:grid-cols-4 gap-8 transition-all duration-1000 delay-400 ${isVisible.about ? "animate-fade-in-up" : "opacity-0 translate-y-10"}`}
          >
            {[
              {
                icon: BookOpen,
                title: "Knowledge",
                desc: "Fostering a love for learning and intellectual curiosity",
                color: "blue",
              },
              {
                icon: Award,
                title: "Excellence",
                desc: "Striving for the highest standards in all endeavors",
                color: "orange",
              },
              {
                icon: Users,
                title: "Community",
                desc: "Building strong relationships and social responsibility",
                color: "green",
              },
              {
                icon: Heart,
                title: "Integrity",
                desc: "Upholding honesty, respect, and ethical values",
                color: "purple",
              },
            ].map((value, index) => (
              <div
                key={value.title}
                className={`text-center animate-fade-in-up-stagger hover:transform hover:scale-105 transition-all duration-300`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div
                  className={`bg-${value.color}-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-gentle`}
                >
                  <value.icon className={`h-8 w-8 text-${value.color}-600`} />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h4>
                <p className="text-gray-600 text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Programs Section */}
      <section id="programs" className="py-16 bg-white" data-animate>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-12 transition-all duration-1000 ${isVisible.programs ? "animate-fade-in-up" : "opacity-0 translate-y-10"}`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Academic Programs</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our comprehensive curriculum is designed to challenge and inspire students across all disciplines.
            </p>
          </div>

          <div
            className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 delay-200 ${isVisible.programs ? "animate-fade-in-up" : "opacity-0 translate-y-10"}`}
          >
            {[
              {
                icon: Microscope,
                title: "Science & Mathematics",
                desc: "Advanced STEM curriculum with hands-on laboratory experiences and research opportunities.",
                color: "blue",
                items: ["Physics, Chemistry, Biology", "Advanced Mathematics", "Computer Science", "Research Projects"],
              },
              {
                icon: Palette,
                title: "Arts & Humanities",
                desc: "Creative expression and critical thinking through literature, arts, and social sciences.",
                color: "orange",
                items: ["Literature & Writing", "Visual Arts", "History & Geography", "Philosophy & Ethics"],
              },
              {
                icon: Globe,
                title: "Languages",
                desc: "Multilingual education preparing students for global communication and cultural understanding.",
                color: "green",
                items: ["English (Advanced)", "Myanmar Language", "Mandarin Chinese", "Cultural Studies"],
              },
              {
                icon: Computer,
                title: "Technology & Innovation",
                desc: "Cutting-edge technology education preparing students for the digital future.",
                color: "purple",
                items: ["Programming & Coding", "Robotics", "Digital Design", "AI & Machine Learning"],
              },
              {
                icon: Trophy,
                title: "Sports & Wellness",
                desc: "Physical education and wellness programs promoting healthy lifestyle and teamwork.",
                color: "red",
                items: ["Team Sports", "Individual Fitness", "Mental Health", "Nutrition Education"],
              },
              {
                icon: Users,
                title: "Leadership & Service",
                desc: "Character development through leadership opportunities and community service.",
                color: "yellow",
                items: ["Student Government", "Community Service", "Public Speaking", "Project Management"],
              },
            ].map((program, index) => (
              <Card
                key={program.title}
                className={`hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-fade-in-up-stagger group`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div
                    className={`bg-${program.color}-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:animate-bounce`}
                  >
                    <program.icon className={`h-6 w-6 text-${program.color}-600`} />
                  </div>
                  <CardTitle className="group-hover:text-blue-600 transition-colors duration-300">
                    {program.title}
                  </CardTitle>
                  <CardDescription>{program.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {program.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className={`animate-fade-in-right-stagger opacity-0`}
                        style={{ animationDelay: `${index * 0.1 + itemIndex * 0.05}s`, animationFillMode: "forwards" }}
                      >
                        • {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Admission Info Section */}
      <section id="admission" className="py-16 bg-gray-50" data-animate>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-12 transition-all duration-1000 ${isVisible.admission ? "animate-fade-in-up" : "opacity-0 translate-y-10"}`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Admission Information</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join our community of learners and begin your journey toward academic excellence.
            </p>
          </div>

          <div
            className={`grid md:grid-cols-2 gap-12 transition-all duration-1000 delay-200 ${isVisible.admission ? "animate-fade-in-up" : "opacity-0 translate-y-10"}`}
          >
            <div className="animate-fade-in-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Admission Requirements</h3>
              <div className="space-y-4">
                {[
                  { step: "1", title: "Application Form", desc: "Complete online application with required documents" },
                  { step: "2", title: "Academic Records", desc: "Previous school transcripts and certificates" },
                  { step: "3", title: "Entrance Assessment", desc: "Subject-based evaluation and interview" },
                  { step: "4", title: "Parent Meeting", desc: "Discussion with parents about school expectations" },
                ].map((req, index) => (
                  <div
                    key={req.step}
                    className={`flex items-start animate-fade-in-right-stagger hover:transform hover:translate-x-2 transition-all duration-300`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Badge className="bg-blue-100 text-blue-800 mr-3 mt-1 animate-pulse-gentle">{req.step}</Badge>
                    <div>
                      <h4 className="font-semibold text-gray-900">{req.title}</h4>
                      <p className="text-gray-600 text-sm">{req.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="animate-fade-in-right">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Important Dates</h3>
              <Card className="hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {[
                      { event: "Application Opens", date: "January 15, 2024", color: "blue" },
                      { event: "Application Deadline", date: "March 31, 2024", color: "orange" },
                      { event: "Entrance Assessments", date: "April 15-30, 2024", color: "green" },
                      { event: "Academic Year Begins", date: "June 1, 2024", color: "purple" },
                    ].map((date, index) => (
                      <div
                        key={date.event}
                        className={`flex justify-between items-center border-b pb-2 animate-fade-in-up-stagger hover:bg-gray-50 p-2 rounded transition-all duration-300`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <span className="font-medium text-gray-900">{date.event}</span>
                        <span className={`text-${date.color}-600 font-semibold animate-pulse-gentle`}>{date.date}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 animate-bounce-gentle">
                  Download Application Form
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Campus Life Section */}
      <section id="campus" className="py-16 bg-white" data-animate>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-12 transition-all duration-1000 ${isVisible.campus ? "animate-fade-in-up" : "opacity-0 translate-y-10"}`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Campus Life</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Experience a vibrant campus community where learning extends beyond the classroom.
            </p>
          </div>

          <div
            className={`grid md:grid-cols-3 gap-8 mb-12 transition-all duration-1000 delay-200 ${isVisible.campus ? "animate-fade-in-up" : "opacity-0 translate-y-10"}`}
          >
            {[
              {
                title: "Modern Facilities",
                desc: "State-of-the-art classrooms, laboratories, and learning spaces equipped with the latest technology.",
                image: "/placeholder.svg?height=250&width=350",
              },
              {
                title: "Student Activities",
                desc: "Rich extracurricular programs including clubs, sports teams, and cultural activities.",
                image: "/placeholder.svg?height=250&width=350",
              },
              {
                title: "Green Campus",
                desc: "Beautiful, eco-friendly campus environment that promotes sustainability and well-being.",
                image: "/placeholder.svg?height=250&width=350",
              },
            ].map((facility, index) => (
              <div
                key={facility.title}
                className={`text-center animate-fade-in-up-stagger group`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative overflow-hidden rounded-lg">
                  <Image
                    src={facility.image || "/placeholder.svg"}
                    alt={facility.title}
                    width={350}
                    height={250}
                    className="rounded-lg shadow-md mb-4 transform group-hover:scale-110 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-20 transition-all duration-300 rounded-lg"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {facility.title}
                </h3>
                <p className="text-gray-600">{facility.desc}</p>
              </div>
            ))}
          </div>

          <div
            className={`bg-blue-50 rounded-lg p-8 transition-all duration-1000 delay-400 ${isVisible.campus ? "animate-fade-in-scale" : "opacity-0 scale-95"}`}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center animate-fade-in-up">
              Student Clubs & Activities
            </h3>
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { icon: BookOpen, title: "Academic Clubs", color: "blue" },
                { icon: Palette, title: "Arts & Culture", color: "orange" },
                { icon: Trophy, title: "Sports Teams", color: "green" },
                { icon: Users, title: "Community Service", color: "purple" },
              ].map((club, index) => (
                <div
                  key={club.title}
                  className={`text-center animate-fade-in-up-stagger`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-lg transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 group">
                    <club.icon className={`h-8 w-8 text-${club.color}-600 mx-auto mb-2 group-hover:animate-bounce`} />
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {club.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50" data-animate>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-12 transition-all duration-1000 ${isVisible.testimonials ? "animate-fade-in-up" : "opacity-0 translate-y-10"}`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Community Says</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from our students, parents, and alumni about their experiences at Myanmar Excellence Academy.
            </p>
          </div>

          <div
            className={`grid md:grid-cols-3 gap-8 transition-all duration-1000 delay-200 ${isVisible.testimonials ? "animate-fade-in-up" : "opacity-0 translate-y-10"}`}
          >
            {[
              {
                text: "The teachers here truly care about each student's success. My daughter has grown so much academically and personally since joining this school.",
                name: "Ma Wai Wai",
                role: "Parent",
                initials: "MW",
                color: "blue",
              },
              {
                text: "This school prepared me well for university. The rigorous academics and supportive environment helped me achieve my goals.",
                name: "Ko Min Thu",
                role: "Alumni, Class of 2023",
                initials: "KM",
                color: "green",
              },
              {
                text: "I love the diverse activities and the friends I've made here. The teachers make learning fun and engaging every day.",
                name: "Thant Htet",
                role: "Grade 10 Student",
                initials: "TH",
                color: "purple",
              },
            ].map((testimonial, index) => (
              <Card
                key={testimonial.name}
                className={`bg-white hover:shadow-xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 animate-fade-in-up-stagger group`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 text-yellow-400 fill-current animate-twinkle`}
                        style={{ animationDelay: `${i * 0.1}s` }}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 group-hover:text-gray-800 transition-colors duration-300">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center">
                    <div
                      className={`w-10 h-10 bg-${testimonial.color}-100 rounded-full flex items-center justify-center mr-3 group-hover:animate-pulse`}
                    >
                      <span className={`text-${testimonial.color}-600 font-semibold`}>{testimonial.initials}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="py-16 bg-white" data-animate>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-12 transition-all duration-1000 ${isVisible.contact ? "animate-fade-in-up" : "opacity-0 translate-y-10"}`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Get in touch with us to learn more about our school or to schedule a campus visit.
            </p>
          </div>

          <div
            className={`grid md:grid-cols-2 gap-12 transition-all duration-1000 delay-200 ${isVisible.contact ? "animate-fade-in-up" : "opacity-0 translate-y-10"}`}
          >
            <div className="animate-fade-in-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h3>
              <div className="space-y-6">
                {[
                  { icon: MapPin, title: "Address", info: "123 Education Street, Yangon, Myanmar 11181" },
                  { icon: Phone, title: "Phone", info: "+95 1 234 5678" },
                  { icon: Mail, title: "Email", info: "info@myanmarexcellence.edu.mm" },
                ].map((contact, index) => (
                  <div
                    key={contact.title}
                    className={`flex items-start animate-fade-in-right-stagger hover:transform hover:translate-x-2 transition-all duration-300 group`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <contact.icon className="h-6 w-6 text-blue-600 mr-3 mt-1 group-hover:animate-bounce" />
                    <div>
                      <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                        {contact.title}
                      </h4>
                      <p className="text-gray-600">{contact.info}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map Placeholder */}
              <div className="mt-8">
                <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center hover:bg-gray-300 transition-all duration-300 group animate-fade-in-scale">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2 group-hover:animate-bounce" />
                    <p className="text-gray-500">Interactive Map</p>
                    <p className="text-sm text-gray-400">Google Maps Integration</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-fade-in-right">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="animate-fade-in-up-stagger">
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <Input
                      id="firstName"
                      placeholder="Your first name"
                      className="hover:border-blue-400 focus:border-blue-500 transition-all duration-300"
                    />
                  </div>
                  <div className="animate-fade-in-up-stagger" style={{ animationDelay: "0.1s" }}>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <Input
                      id="lastName"
                      placeholder="Your last name"
                      className="hover:border-blue-400 focus:border-blue-500 transition-all duration-300"
                    />
                  </div>
                </div>
                <div className="animate-fade-in-up-stagger" style={{ animationDelay: "0.2s" }}>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    className="hover:border-blue-400 focus:border-blue-500 transition-all duration-300"
                  />
                </div>
                <div className="animate-fade-in-up-stagger" style={{ animationDelay: "0.3s" }}>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    placeholder="+95 xxx xxx xxxx"
                    className="hover:border-blue-400 focus:border-blue-500 transition-all duration-300"
                  />
                </div>
                <div className="animate-fade-in-up-stagger" style={{ animationDelay: "0.4s" }}>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    placeholder="What is this regarding?"
                    className="hover:border-blue-400 focus:border-blue-500 transition-all duration-300"
                  />
                </div>
                <div className="animate-fade-in-up-stagger" style={{ animationDelay: "0.5s" }}>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    rows={4}
                    placeholder="Tell us more about your inquiry..."
                    className="hover:border-blue-400 focus:border-blue-500 transition-all duration-300"
                  />
                </div>
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 animate-fade-in-up-stagger"
                  style={{ animationDelay: "0.6s" }}
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 animate-fade-in-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="animate-fade-in-up-stagger">
              <div className="flex items-center mb-4">
                <GraduationCap className="h-8 w-8 text-blue-400 animate-bounce-gentle" />
                <span className="ml-2 text-xl font-bold">Myanmar Excellence Academy</span>
              </div>
              <p className="text-gray-400 text-sm">
                Empowering future leaders through excellence in education since 2010.
              </p>
            </div>
            {[
              {
                title: "Quick Links",
                links: ["About Us", "Academic Programs", "Admission", "Campus Life"],
              },
              {
                title: "Resources",
                links: ["Student Portal", "Parent Portal", "Library", "Calendar"],
              },
              {
                title: "Contact Info",
                links: [
                  "123 Education Street",
                  "Yangon, Myanmar 11181",
                  "+95 1 234 5678",
                  "info@myanmarexcellence.edu.mm",
                ],
              },
            ].map((section, index) => (
              <div
                key={section.title}
                className="animate-fade-in-up-stagger"
                style={{ animationDelay: `${(index + 1) * 0.1}s` }}
              >
                <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-2 text-sm">
                  {section.links.map((link, linkIndex) => (
                    <li
                      key={link}
                      className="animate-fade-in-right-stagger"
                      style={{ animationDelay: `${(index + 1) * 0.1 + linkIndex * 0.05}s` }}
                    >
                      {section.title === "Contact Info" ? (
                        <span className="text-gray-400">{link}</span>
                      ) : (
                        <Link
                          href="#"
                          className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block"
                        >
                          {link}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div
            className="border-t border-gray-800 mt-8 pt-8 text-center animate-fade-in-up"
            style={{ animationDelay: "0.8s" }}
          >
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Myanmar Excellence Academy. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
