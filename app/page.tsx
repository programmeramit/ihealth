"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Video,
  Calendar,
  FileText,
  Users,
  Activity,
  Shield,
  Clock,
  ChevronRight,
  Star,
  CheckCircle,
  Stethoscope,
  BedDouble,
  Pill,
  BarChart3,
  Bell,
  Lock,
  Smartphone,
  Globe,
  Heart,
  Zap,
  ArrowRight,
  Play,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  const {data} = useSession()
  console.log(data)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  const features = [
    {
      icon: <Video className="w-6 h-6" />,
      title: "HD Video Consultations",
      description:
        "Connect with patients via crystal-clear video calls. Supports up to 4K resolution with screen sharing, digital whiteboard, and real-time annotations for a comprehensive virtual care experience.",
      color: "from-cyan-500 to-blue-600",
      bg: "bg-cyan-50",
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Smart Appointment Scheduling",
      description:
        "AI-powered scheduling that automatically detects conflicts, sends reminders, and manages waitlists. Integrate with Google Calendar, Outlook, and Apple Calendar seamlessly.",
      color: "from-violet-500 to-purple-600",
      bg: "bg-violet-50",
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Electronic Health Records",
      description:
        "Comprehensive EHR system with voice-to-text dictation, FHIR-compliant data exchange, and intelligent clinical decision support powered by advanced medical AI.",
      color: "from-emerald-500 to-teal-600",
      bg: "bg-emerald-50",
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: "Real-time Patient Monitoring",
      description:
        "Monitor vitals, lab results, and IoT device data in real time. Automatic alerts for critical values with integrated wearable device support (Apple Watch, Fitbit, Garmin).",
      color: "from-rose-500 to-pink-600",
      bg: "bg-rose-50",
    },
    {
      icon: <Pill className="w-6 h-6" />,
      title: "Pharmacy & Prescriptions",
      description:
        "E-prescriptions with drug interaction checking, formulary management, and direct pharmacy routing. Reduce prescription errors by up to 89% with AI-assisted prescribing.",
      color: "from-amber-500 to-orange-600",
      bg: "bg-amber-50",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Analytics & Reporting",
      description:
        "Deep-dive analytics on patient outcomes, department efficiency, revenue cycles, and staff performance. Customizable dashboards with exportable reports for compliance.",
      color: "from-indigo-500 to-blue-600",
      bg: "bg-indigo-50",
    },
  ];

  const stats = [
    { value: "500+", label: "Hospitals Worldwide" },
    { value: "2M+", label: "Patients Served" },
    { value: "99.99%", label: "Uptime SLA" },
    { value: "4.9★", label: "Average Rating" },
  ];

  const testimonials = [
    {
      name: "Dr. Priya Sharma",
      role: "Chief Medical Officer, Apollo Hospitals",
      avatar: "PS",
      content:
        "MediCore transformed how we deliver care. Video consultations alone reduced no-show rates by 67%. The EHR integration is seamless and our staff productivity jumped 40% in the first month.",
      rating: 5,
    },
    {
      name: "Dr. Rajesh Kumar",
      role: "Head of Cardiology, AIIMS Delhi",
      avatar: "RK",
      content:
        "The real-time monitoring dashboard is exceptional. I can track all my ICU patients from anywhere. The alert system has helped us respond to critical situations 3x faster.",
      rating: 5,
    },
    {
      name: "Meena Patel",
      role: "Hospital Administrator, Fortis Healthcare",
      avatar: "MP",
      content:
        "From scheduling to billing, MediCore handles everything. We reduced administrative overhead by 55% and patient satisfaction scores hit an all-time high. Worth every rupee.",
      rating: 5,
    },
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "₹9,999",
      period: "/month",
      description: "Perfect for small clinics",
      features: [
        "Up to 5 doctors",
        "500 appointments/month",
        "Basic EHR",
        "Video consultations (SD)",
        "Email support",
        "Basic analytics",
      ],
      cta: "Start Free Trial",
      highlighted: false,
    },
    {
      name: "Professional",
      price: "₹29,999",
      period: "/month",
      description: "For growing hospitals",
      features: [
        "Up to 50 doctors",
        "Unlimited appointments",
        "Advanced EHR + AI",
        "HD Video consultations",
        "Priority 24/7 support",
        "Advanced analytics",
        "Pharmacy integration",
        "IoT device support",
      ],
      cta: "Get Started",
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large hospital networks",
      features: [
        "Unlimited doctors & staff",
        "Multi-location support",
        "Custom EHR workflows",
        "4K Video + recording",
        "Dedicated account manager",
        "Custom reporting",
        "API access",
        "On-premise option",
      ],
      cta: "Contact Sales",
      highlighted: false,
    },
  ];

  const faqs = [
    {
      question: "Is MediCore HIPAA and DPDP compliant?",
      answer:
        "Yes, MediCore is fully HIPAA compliant and adheres to India's Digital Personal Data Protection (DPDP) Act 2023. All patient data is encrypted at rest and in transit using AES-256 encryption. We undergo annual third-party security audits.",
    },
    {
      question: "How does the video consultation feature work?",
      answer:
        "Our WebRTC-based video call system works directly in the browser — no app downloads required for patients. Doctors can start a consultation from their dashboard, patients receive a secure link via SMS/email. Sessions support HD video, screen sharing, file transfer, and are recorded (with consent) for clinical records.",
    },
    {
      question: "Can MediCore integrate with our existing systems?",
      answer:
        "MediCore supports HL7 FHIR R4 standards and offers pre-built integrations with major lab systems (Thyrocare, Dr. Lal PathLabs), pharmacy networks, insurance providers, and billing systems. Custom API integrations are available for Enterprise customers.",
    },
    {
      question: "What happens to data if we stop using MediCore?",
      answer:
        "You own your data completely. Upon cancellation, we provide a full data export in standard formats (JSON, CSV, HL7). Data is securely purged from our servers within 30 days per DPDP requirements. Enterprise customers can opt for immediate deletion.",
    },
    {
      question: "How long does implementation take?",
      answer:
        "Starter plans are live within 24 hours. Professional plans typically take 3-7 days including staff training. Enterprise implementations are scoped individually but average 2-4 weeks for full deployment with data migration.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans overflow-x-hidden">
      {/* Custom Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');
        
        * { box-sizing: border-box; }
        
        body {
          font-family: 'DM Sans', sans-serif;
          background: #020817;
        }

        .display-font { font-family: 'Bricolage Grotesque', sans-serif; }

        .hero-gradient {
          background: radial-gradient(ellipse 80% 60% at 50% -10%, rgba(34, 197, 254, 0.15) 0%, transparent 70%),
                      radial-gradient(ellipse 50% 40% at 80% 30%, rgba(139, 92, 246, 0.1) 0%, transparent 60%),
                      #020817;
        }

        .glow-cyan { box-shadow: 0 0 40px rgba(34, 197, 254, 0.2); }
        .glow-violet { box-shadow: 0 0 40px rgba(139, 92, 246, 0.2); }

        .card-glass {
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(148, 163, 184, 0.08);
        }

        .nav-glass {
          background: rgba(2, 8, 23, 0.85);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(148, 163, 184, 0.08);
        }

        .gradient-text {
          background: linear-gradient(135deg, #22d3ee, #818cf8, #c084fc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .feature-card:hover {
          transform: translateY(-4px);
          border-color: rgba(34, 197, 254, 0.3) !important;
        }

        .feature-card { transition: all 0.3s ease; }

        .pricing-highlight {
          background: linear-gradient(135deg, rgba(34, 197, 254, 0.1), rgba(139, 92, 246, 0.1));
          border: 1px solid rgba(34, 197, 254, 0.3) !important;
        }

        .stat-card {
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.4));
        }

        .video-mockup {
          background: linear-gradient(135deg, #0f172a, #1e293b);
          border: 1px solid rgba(148, 163, 184, 0.1);
          border-radius: 16px;
          overflow: hidden;
        }

        .pulse-dot::before {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: rgba(34, 197, 254, 0.3);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .float-anim { animation: float 4s ease-in-out infinite; }

        .grid-bg {
          background-image: linear-gradient(rgba(148, 163, 184, 0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(148, 163, 184, 0.03) 1px, transparent 1px);
          background-size: 64px 64px;
        }

        .badge-pill {
          background: rgba(34, 197, 254, 0.1);
          border: 1px solid rgba(34, 197, 254, 0.25);
          color: #22d3ee;
        }

        .scroll-line {
          background: linear-gradient(to bottom, transparent, #22d3ee, #818cf8, transparent);
          width: 1px;
        }

        .cta-btn {
          background: linear-gradient(135deg, #0891b2, #6d28d9);
          transition: all 0.3s;
        }
        .cta-btn:hover { 
          background: linear-gradient(135deg, #0e7490, #7c3aed);
          box-shadow: 0 8px 32px rgba(34, 197, 254, 0.3);
          transform: translateY(-1px);
        }
      `}</style>

      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "nav-glass" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-600 flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <span className="display-font font-700 text-xl text-white">
              Medi<span className="gradient-text">Core</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {["Features", "Pricing", "Security", "Docs", "Blog"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-slate-400 hover:text-white text-sm transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              className="text-slate-300 hover:text-white hover:bg-slate-800"
            >
              {
                data && <Link href={"/dashboard"}>Dashboard</Link> || <Button onClick={async()=>signIn('google')}>SignIn</Button>
              }
            </Button>
            <Button className="cta-btn text-white border-0">
              Start Free Trial
            </Button>
          </div>

          <button
            className="md:hidden text-slate-400 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden nav-glass px-6 py-4 flex flex-col gap-4">
            {["Features", "Pricing", "Security", "Docs"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-slate-400 hover:text-white py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <Button className="cta-btn text-white border-0 w-full">
              Start Free Trial
            </Button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="hero-gradient grid-bg min-h-screen flex items-center pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 badge-pill px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Zap className="w-3.5 h-3.5" />
              Now with AI-powered diagnostics support
            </div>

            <h1 className="display-font text-5xl md:text-7xl font-800 leading-[1.05] mb-6">
              The Future of
              <br />
              <span className="gradient-text">Hospital Management</span>
              <br />
              <span className="text-slate-300">is Here</span>
            </h1>

            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
              MediCore unifies patient care, clinical workflows, and hospital operations into one
              intelligent platform — with built-in HD video consultations, AI-assisted EHR, and
              real-time monitoring.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button className="cta-btn text-white border-0 h-12 px-8 text-base">
                Start Free 30-Day Trial
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                className="border-slate-700 text-slate-300 hover:bg-slate-800 h-12 px-8 text-base"
              >
                <Play className="w-4 h-4 mr-2 fill-current" />
                Watch Demo
              </Button>
            </div>

            <p className="text-slate-500 text-sm">
              No credit card required · Setup in 5 minutes · Cancel anytime
            </p>
          </div>

          {/* Video Call Hero Mockup */}
          <div className="video-mockup max-w-4xl mx-auto float-anim glow-cyan">
            {/* Titlebar */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <div className="relative">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot" />
                </div>
                Video Consultation — Dr. Priya Sharma & Patient
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                  ● LIVE
                </Badge>
              </div>
            </div>

            {/* Video Grid */}
            <div className="grid grid-cols-3 gap-3 p-4">
              {/* Main Video - Doctor */}
              <div className="col-span-2 aspect-video rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 relative overflow-hidden border border-slate-700/50">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-violet-900/20" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-xs font-bold">
                    Dr
                  </div>
                  <div>
                    <div className="text-xs font-medium text-white">Dr. Priya Sharma</div>
                    <div className="text-xs text-slate-400">Cardiologist</div>
                  </div>
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <Badge className="bg-slate-900/70 text-slate-300 border-slate-700 text-xs">
                    HD 1080p
                  </Badge>
                </div>
                {/* Simulated video content */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <Stethoscope className="w-24 h-24 text-cyan-400" />
                </div>
              </div>

              {/* Side Panel */}
              <div className="flex flex-col gap-3">
                {/* Patient Video */}
                <div className="aspect-video rounded-xl bg-gradient-to-br from-violet-900/40 to-indigo-900/40 relative overflow-hidden border border-slate-700/50">
                  <div className="absolute bottom-2 left-2 text-xs text-white font-medium">
                    Patient: Arjun M.
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <Users className="w-8 h-8 text-violet-400" />
                  </div>
                </div>

                {/* Patient Vitals */}
                <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-3 flex-1">
                  <div className="text-xs font-medium text-slate-400 mb-2">Live Vitals</div>
                  <div className="space-y-2">
                    {[
                      { label: "Heart Rate", value: "78 bpm", color: "text-red-400", icon: "♥" },
                      { label: "SpO₂", value: "98%", color: "text-cyan-400", icon: "○" },
                      { label: "BP", value: "120/80", color: "text-violet-400", icon: "↑" },
                      { label: "Temp", value: "98.6°F", color: "text-amber-400", icon: "~" },
                    ].map((vital) => (
                      <div key={vital.label} className="flex justify-between items-center">
                        <span className="text-xs text-slate-500">{vital.label}</span>
                        <span className={`text-xs font-mono font-medium ${vital.color}`}>
                          {vital.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Controls Bar */}
            <div className="flex items-center justify-center gap-3 px-4 pb-4">
              {[
                { icon: "🎤", label: "Mute", active: false },
                { icon: "📷", label: "Cam", active: false },
                { icon: "💬", label: "Chat", active: false },
                { icon: "📋", label: "Notes", active: true },
                { icon: "🖥️", label: "Share", active: false },
                { icon: "💊", label: "Rx", active: false },
              ].map((ctrl) => (
                <button
                  key={ctrl.label}
                  className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-xs transition-colors ${
                    ctrl.active
                      ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                      : "bg-slate-800/50 text-slate-400 hover:bg-slate-800"
                  }`}
                >
                  <span>{ctrl.icon}</span>
                  <span>{ctrl.label}</span>
                </button>
              ))}
              <button className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg text-xs bg-red-500/20 text-red-400 border border-red-500/30 ml-2">
                <span>📵</span>
                <span>End</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-slate-800/50 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center stat-card rounded-xl p-4">
                <div className="display-font text-4xl font-800 gradient-text mb-1">
                  {stat.value}
                </div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 grid-bg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="badge-pill border-0 mb-4">All-in-One Platform</Badge>
            <h2 className="display-font text-4xl md:text-5xl font-700 mb-4">
              Everything your hospital needs,
              <br />
              <span className="gradient-text">in one place</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              From video consultations to supply chain — MediCore covers every clinical and
              administrative touchpoint.
            </p>
          </div>

          {/* Feature Tabs */}
          <Tabs defaultValue="0" className="w-full">
            <TabsList className="flex flex-wrap h-auto gap-2 bg-slate-900/50 p-2 border border-slate-800 rounded-2xl mb-8 justify-center">
              {features.map((f, i) => (
                <TabsTrigger
                  key={i}
                  value={String(i)}
                  className="flex items-center gap-2 data-[state=active]:bg-slate-800 data-[state=active]:text-white text-slate-400 rounded-xl text-sm"
                >
                  {f.icon}
                  <span className="hidden sm:inline">{f.title.split(" ")[0]}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {features.map((feature, i) => (
              <TabsContent key={i} value={String(i)}>
                <div className="card-glass rounded-2xl p-8 grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-4`}
                    >
                      {feature.icon}
                    </div>
                    <h3 className="display-font text-2xl font-700 text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed mb-6">{feature.description}</p>
                    <Button
                      variant="outline"
                      className="border-slate-700 text-slate-300 hover:bg-slate-800"
                    >
                      Learn More <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                  <div className="card-glass rounded-xl p-6 h-64 flex items-center justify-center">
                    <div
                      className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center opacity-80`}
                    >
                      <div className="text-white scale-150">{feature.icon}</div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {/* Feature Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
            {[
              {
                icon: <BedDouble className="w-5 h-5" />,
                title: "Bed Management",
                desc: "Real-time bed availability, automated allocation, and discharge planning.",
                color: "text-cyan-400",
              },
              {
                icon: <Bell className="w-5 h-5" />,
                title: "Smart Alerts",
                desc: "Critical value notifications via SMS, push, and in-app for the right clinician.",
                color: "text-amber-400",
              },
              {
                icon: <Lock className="w-5 h-5" />,
                title: "Role-Based Access",
                desc: "Granular RBAC ensures the right people see only what they need.",
                color: "text-violet-400",
              },
              {
                icon: <Smartphone className="w-5 h-5" />,
                title: "Mobile-First Apps",
                desc: "Native iOS and Android apps for doctors, nurses, and patients.",
                color: "text-emerald-400",
              },
              {
                icon: <Globe className="w-5 h-5" />,
                title: "Multi-Language",
                desc: "Supports English, Hindi, Tamil, Telugu, Bengali, and 20+ Indian languages.",
                color: "text-rose-400",
              },
              {
                icon: <Shield className="w-5 h-5" />,
                title: "HIPAA + DPDP",
                desc: "Certified compliance with healthcare data privacy regulations globally.",
                color: "text-indigo-400",
              },
            ].map((item) => (
              <Card
                key={item.title}
                className="feature-card card-glass border-slate-800/50 bg-transparent cursor-default"
              >
                <CardHeader className="pb-2">
                  <div className={`${item.color} mb-2`}>{item.icon}</div>
                  <CardTitle className="text-white text-base font-600">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-400 text-sm leading-relaxed">
                    {item.desc}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Video Consultation Deep Dive */}
      <section className="py-24 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="badge-pill border-0 mb-6">Telehealth Built In</Badge>
              <h2 className="display-font text-4xl md:text-5xl font-700 mb-6">
                Video consultations
                <br />
                <span className="gradient-text">patients love</span>
              </h2>
              <p className="text-slate-400 leading-relaxed mb-8">
                Our WebRTC-powered video platform is designed for clinical use — not just a generic
                video call. Built-in tools help doctors deliver care efficiently while patients get
                the personal attention they deserve.
              </p>

              <div className="space-y-4">
                {[
                  {
                    icon: <Video className="w-4 h-4 text-cyan-400" />,
                    title: "HD & 4K Video",
                    desc: "Crystal-clear resolution for accurate visual diagnosis",
                  },
                  {
                    icon: <FileText className="w-4 h-4 text-violet-400" />,
                    title: "In-call Prescriptions",
                    desc: "Issue e-prescriptions without leaving the video call",
                  },
                  {
                    icon: <Activity className="w-4 h-4 text-emerald-400" />,
                    title: "Live Vitals Sidebar",
                    desc: "See patient IoT device data in real time during the call",
                  },
                  {
                    icon: <Shield className="w-4 h-4 text-amber-400" />,
                    title: "End-to-end Encrypted",
                    desc: "AES-256 encryption ensures complete patient privacy",
                  },
                  {
                    icon: <Clock className="w-4 h-4 text-rose-400" />,
                    title: "Auto Transcription",
                    desc: "AI generates clinical notes from your consultation",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-white text-sm font-medium">{item.title}</div>
                      <div className="text-slate-500 text-sm">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {/* Waiting Room UI */}
              <div className="card-glass rounded-2xl p-5 border border-slate-700/50">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-medium text-white">Today&apos;s Video Queue</div>
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs">
                    4 Waiting
                  </Badge>
                </div>
                <div className="space-y-3">
                  {[
                    {
                      name: "Arjun Mehta",
                      time: "Now",
                      type: "Follow-up",
                      status: "In Call",
                      color: "bg-emerald-400",
                    },
                    {
                      name: "Sunita Patel",
                      time: "2 min",
                      type: "Consultation",
                      status: "Waiting",
                      color: "bg-amber-400",
                    },
                    {
                      name: "Rahul Singh",
                      time: "15 min",
                      type: "Lab Review",
                      status: "Scheduled",
                      color: "bg-slate-500",
                    },
                    {
                      name: "Deepa Nair",
                      time: "30 min",
                      type: "New Patient",
                      status: "Scheduled",
                      color: "bg-slate-500",
                    },
                  ].map((patient) => (
                    <div
                      key={patient.name}
                      className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/40 hover:bg-slate-800/60 transition-colors"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs bg-gradient-to-br from-cyan-600 to-violet-600 text-white">
                          {patient.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-white truncate">{patient.name}</div>
                        <div className="text-xs text-slate-500">{patient.type}</div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-xs text-slate-400">{patient.time}</div>
                        <div className={`text-xs flex items-center gap-1`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${patient.color}`} />
                          <span className="text-slate-400">{patient.status}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "12 min", label: "Avg. Call", color: "text-cyan-400" },
                  { value: "94%", label: "Satisfaction", color: "text-emerald-400" },
                  { value: "−67%", label: "No-shows", color: "text-violet-400" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="card-glass rounded-xl p-4 text-center border border-slate-700/30"
                  >
                    <div className={`display-font text-xl font-700 ${s.color}`}>{s.value}</div>
                    <div className="text-slate-500 text-xs mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 grid-bg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="badge-pill border-0 mb-4">Trusted by Clinicians</Badge>
            <h2 className="display-font text-4xl font-700 mb-4">
              Loved by doctors,
              <span className="gradient-text"> trusted by hospitals</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <Card
                key={t.name}
                className="card-glass border-slate-800/50 bg-transparent hover:border-slate-700 transition-colors"
              >
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">&ldquo;{t.content}&rdquo;</p>
                  <Separator className="bg-slate-800 mb-4" />
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-gradient-to-br from-cyan-600 to-violet-600 text-white text-sm font-medium">
                        {t.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-white text-sm font-medium">{t.name}</div>
                      <div className="text-slate-500 text-xs">{t.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="badge-pill border-0 mb-4">Simple Pricing</Badge>
            <h2 className="display-font text-4xl font-700 mb-4">
              Plans for every
              <span className="gradient-text"> size of care</span>
            </h2>
            <p className="text-slate-400">
              All plans include a 30-day free trial. No credit card required.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-6 relative ${
                  plan.highlighted
                    ? "pricing-highlight glow-cyan"
                    : "card-glass border border-slate-800/50"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-cyan-500 to-violet-600 text-white border-0 px-4">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="display-font text-xl font-700 text-white mb-1">{plan.name}</h3>
                  <p className="text-slate-500 text-sm mb-4">{plan.description}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="display-font text-4xl font-800 text-white">{plan.price}</span>
                    <span className="text-slate-500 text-sm">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="text-slate-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    plan.highlighted
                      ? "cta-btn text-white border-0"
                      : "border-slate-700 text-slate-300 hover:bg-slate-800"
                  }`}
                  variant={plan.highlighted ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 grid-bg">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="display-font text-4xl font-700 mb-4">
              Frequently asked
              <span className="gradient-text"> questions</span>
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={String(i)}
                className="card-glass border border-slate-800/50 rounded-xl px-5 data-[state=open]:border-slate-700"
              >
                <AccordionTrigger className="text-white hover:text-cyan-400 text-left no-underline hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-400 text-sm leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-slate-900 to-violet-900/20" />
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="display-font text-5xl md:text-6xl font-800 mb-6">
            Ready to transform
            <br />
            <span className="gradient-text">your hospital?</span>
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
            Join 500+ hospitals worldwide delivering better care with MediCore. Start your free
            30-day trial today — no credit card needed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="cta-btn text-white border-0 h-14 px-10 text-lg">
              Start Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              className="border-slate-700 text-slate-300 hover:bg-slate-800 h-14 px-10 text-lg"
            >
              Schedule a Demo
            </Button>
          </div>
          <p className="text-slate-600 text-sm mt-6">
            Trusted by Apollo, Fortis, AIIMS, Max Healthcare & more
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-600 flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <span className="display-font font-700 text-xl text-white">
                  Medi<span className="gradient-text">Core</span>
                </span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                Intelligent hospital management software for the modern healthcare provider.
              </p>
            </div>
            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Security", "Roadmap", "Changelog"],
              },
              {
                title: "Solutions",
                links: ["Hospitals", "Clinics", "Telemedicine", "Labs", "Pharmacies"],
              },
              {
                title: "Company",
                links: ["About", "Blog", "Careers", "Press", "Contact"],
              },
            ].map((col) => (
              <div key={col.title}>
                <div className="text-white text-sm font-medium mb-4">{col.title}</div>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <Separator className="bg-slate-800/50 mb-6" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-600 text-sm">
              © 2025 MediCore Technologies Pvt. Ltd. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-slate-600 text-sm">
              <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-slate-400 transition-colors">HIPAA Notice</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}