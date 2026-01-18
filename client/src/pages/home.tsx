import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { 
  Github, Linkedin, Mail, Phone, MessageCircle, 
  Sun, Moon, Download, User, ChevronRight, 
  TrendingUp, BarChart3, Brain, Database, Code2, LineChart,
  FileText, ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const personalInfo = {
  name: "Harshit Shah",
  title: "Quantitative Analyst & Data Scientist",
  email: "harshitshah.work@gmail.com",
  phone: "+919978645603",
  whatsapp: "9978645603",
  linkedin: "https://linkedin.com/in/harshitvshah",
  github: "https://github.com/Harshit-0307",
  resumeUrl: "/resume.pdf",
  profileImg: "https://github.com/Harshit-0307.png" 
};

const indianStocks = [
  { symbol: "NIFTY 50", price: 24847.50, change: 1.24 },
  { symbol: "SENSEX", price: 81821.12, change: 0.98 },
  { symbol: "RELIANCE", price: 2934.25, change: 2.15 },
  { symbol: "TCS", price: 4123.80, change: -0.42 },
  { symbol: "HDFC BANK", price: 1756.40, change: 1.67 },
];

const skills = [
  { icon: TrendingUp, name: "Financial Modeling", desc: "DCF, Monte Carlo, VaR" },
  { icon: BarChart3, name: "Statistical Analysis", desc: "Regression, Time Series" },
  { icon: Brain, name: "Machine Learning", desc: "Deep Learning, NLP" },
  { icon: Database, name: "Data Engineering", desc: "SQL, ETL Pipelines" },
  { icon: Code2, name: "Programming", desc: "Python, R, C++" },
  { icon: LineChart, name: "Visualization", desc: "Plotly, D3.js" },
];

const projects = [
  {
    title: "Portfolio Optimization Engine",
    description: "Built a mean-variance optimization model with Monte Carlo simulation for risk assessment.",
    methods: ["Optimization", "Monte Carlo", "Sharpe Ratio"],
    github: "https://github.com/Harshit-0307",
    demo: "#",
  },
  {
    title: "Algorithmic Trading System",
    description: "Developed a high-frequency trading system with real-time market data processing.",
    methods: ["Stat Arb", "Time Series", "Real-time"],
    github: "https://github.com/Harshit-0307",
    demo: null,
  }
];

const blogPosts = [
  {
    title: "Understanding GARCH Models for Volatility Forecasting",
    excerpt: "A deep dive into GARCH models and their applications in financial markets.",
    date: "Dec 15, 2024",
    readTime: "8 min read",
    url: "#",
  }
];

function StockTicker() {
  return (
    <div className="border-b border-border bg-muted/20 py-2 font-mono text-[10px] overflow-hidden">
      <div className="flex animate-ticker whitespace-nowrap">
        {[...indianStocks, ...indianStocks].map((stock, i) => (
          <div key={i} className="flex gap-4 px-10 items-center">
            <span className="font-bold">{stock.symbol}</span>
            <span className="text-muted-foreground font-mono">₹{stock.price.toLocaleString('en-IN')}</span>
            <span className={stock.change >= 0 ? "text-primary" : "text-red-500"}>
              {stock.change >= 0 ? "▲" : "▼"} {Math.abs(stock.change).toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  const [subText, setSubText] = useState("");
  const fullSubText = "Executing Alpha Strategies...";
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setSubText(fullSubText.slice(0, i));
      i++;
      if (i > fullSubText.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="top" className="py-20 px-6 md:px-20 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
      <div className="flex-1 text-center md:text-left order-2 md:order-1">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 text-foreground">
          {personalInfo.name}
        </h1>
        <div className="font-mono text-primary text-lg md:text-xl mb-8">
          {subText}<span className="typewriter-cursor">_</span>
        </div>
        <p className="text-muted-foreground text-lg max-w-xl mb-10 leading-relaxed">
          I bridge the gap between financial theory and practical data-driven solutions. 
          Specializing in systematic trading and risk management.
        </p>
        <div className="flex flex-wrap justify-center md:justify-start gap-4">
          <a href={personalInfo.resumeUrl} download>
            <Button className="bg-primary text-black rounded-none px-8 font-bold hover:bg-primary/90">
              <Download className="mr-2 h-4 w-4" /> DOWNLOAD_CV
            </Button>
          </a>
          <a href="#contact">
            <Button variant="outline" className="rounded-none px-8 border-border hover:border-primary font-bold">
              CONTACT_ME
            </Button>
          </a>
        </div>
      </div>

      <div className="order-1 md:order-2">
        <div className="relative p-1 border border-primary/20 rounded-full">
          <Avatar className="h-48 w-48 md:h-64 md:w-64 rounded-full border-2 border-primary/40 profile-hover-effect">
            <AvatarImage src={personalInfo.profileImg} className="object-cover" />
            <AvatarFallback className="bg-muted"><User size={48}/></AvatarFallback>
          </Avatar>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { theme, setTheme } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <StockTicker />
      
      <nav className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
        {/* Clickable Logo that scrolls to top */}
        <button 
          onClick={scrollToTop} 
          className="font-bold tracking-tighter text-xl cursor-pointer hover:opacity-80 transition-opacity"
        >
          H<span className="text-primary">S</span>_CORE
        </button>
        
        <div className="flex items-center gap-8">
          <div className="hidden md:flex gap-6 text-sm font-bold">
            <a href="#projects" className="hover:text-primary">PROJECTS</a>
            <a href="#blog" className="hover:text-primary">BLOG</a>
            <a href="#contact" className="hover:text-primary">CONTACT</a>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="border border-border rounded-none"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
        </div>
      </nav>

      <main>
        <Hero />

        {/* Skills Section */}
        <section className="py-20 px-6 md:px-20 max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {skills.map((skill) => (
            <div key={skill.name} className="p-4 border border-border bg-muted/10 text-center">
              <skill.icon className="mx-auto mb-2 text-primary" size={24} />
              <h3 className="text-xs font-bold uppercase">{skill.name}</h3>
            </div>
          ))}
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-6 md:px-20 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 border-l-4 border-primary pl-4">FEATURED_PROJECTS</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <Card key={project.title} className="bg-muted/5 border-border rounded-none">
                <CardHeader>
                  <CardTitle className="text-primary">{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 mb-6 flex-wrap">
                    {project.methods.map(m => (
                      <span key={m} className="text-[10px] bg-primary/10 text-primary px-2 py-1">[{m}]</span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <Button variant="outline" size="sm" className="rounded-none border-primary text-primary" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer"><Github size={14} className="mr-2"/> SOURCE</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="py-20 px-6 md:px-20 max-w-7xl mx-auto bg-muted/10">
          <h2 className="text-3xl font-bold mb-12 border-l-4 border-primary pl-4">TECHNICAL_INSIGHTS</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Card key={post.title} className="bg-background border-border rounded-none">
                <CardHeader>
                  <span className="text-[10px] text-muted-foreground">{post.date} • {post.readTime}</span>
                  <CardTitle className="text-lg">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{post.excerpt}</p>
                  <a href={post.url} className="text-primary text-sm font-bold hover:underline">READ_MORE _</a>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-6 md:px-20 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">GET_IN_TOUCH</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="p-6 border border-border hover:border-primary transition-colors flex flex-col items-center">
              <Linkedin className="mb-2 text-[#0A66C2]" />
              <span className="text-xs font-bold">LINKEDIN</span>
            </a>
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="p-6 border border-border hover:border-primary transition-colors flex flex-col items-center">
              <Github className="mb-2" />
              <span className="text-xs font-bold">GITHUB</span>
            </a>
            <a href={`mailto:${personalInfo.email}`} className="p-6 border border-border hover:border-primary transition-colors flex flex-col items-center">
              <Mail className="mb-2 text-primary" />
              <span className="text-xs font-bold">EMAIL</span>
            </a>
            <a href={`https://wa.me/${personalInfo.whatsapp}`} target="_blank" rel="noopener noreferrer" className="p-6 border border-border hover:border-primary transition-colors flex flex-col items-center">
              <MessageCircle className="mb-2 text-[#25D366]" />
              <span className="text-xs font-bold">WHATSAPP</span>
            </a>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-border text-center text-muted-foreground text-xs font-mono">
        <p>© {new Date().getFullYear()} {personalInfo.name.toUpperCase()} // ALL_SYSTEMS_OPERATIONAL</p>
      </footer>
    </div>
  );
}