import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { 
  Github, Linkedin, Mail, MessageCircle, 
  Sun, Moon, Download, User, 
  TrendingUp, BarChart3, Brain, Database, Code2, LineChart
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
    <div className="border-b border-border bg-background py-2 font-mono text-[10px] overflow-hidden">
      <div className="flex animate-ticker whitespace-nowrap">
        {[...indianStocks, ...indianStocks].map((stock, i) => (
          <div key={i} className="flex gap-4 px-10 items-center">
            <span className="font-bold tracking-tighter">{stock.symbol}</span>
            <span className="text-muted-foreground">₹{stock.price.toLocaleString('en-IN')}</span>
            <span className={stock.change >= 0 ? "text-blue-500 font-bold" : "text-red-500 font-bold"}>
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
  const fullSubText = "SYSTEM_STATUS: EXECUTING_ALPHA_STRATEGIES";
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setSubText(fullSubText.slice(0, i));
      i++;
      if (i > fullSubText.length) clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="top" className="py-24 px-6 md:px-20 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
      <div className="flex-1 text-center md:text-left order-2 md:order-1">
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-4 text-foreground">
          {personalInfo.name.split(' ')[0]}<span className="text-primary">{personalInfo.name.split(' ')[1]}</span>
        </h1>
        <div className="font-mono text-primary text-sm md:text-base mb-8 tracking-widest uppercase">
          {subText}<span className="typewriter-cursor">_</span>
        </div>
        <p className="text-muted-foreground text-lg max-w-xl mb-10 leading-relaxed font-medium">
          Quant Analyst at Estee Advisors. Specialized in HFT strategies, 
          systematic trading, and advanced risk management frameworks.
        </p>
        <div className="flex flex-wrap justify-center md:justify-start gap-4">
          <a href={personalInfo.resumeUrl} download>
            <Button className="bg-primary text-white rounded-none px-10 py-6 font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
              <Download className="mr-2 h-4 w-4" /> DOWNLOAD_CV
            </Button>
          </a>
          <a href="#contact">
            <Button variant="outline" className="rounded-none px-10 py-6 border-border hover:border-primary font-bold transition-all">
              GET_IN_TOUCH
            </Button>
          </a>
        </div>
      </div>

      <div className="order-1 md:order-2">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-400 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <Avatar className="h-56 w-56 md:h-72 md:w-72 rounded-full border-4 border-background relative profile-hover-effect">
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
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
      <StockTicker />
      
      <nav className="border-b border-border bg-background/90 backdrop-blur-xl sticky top-0 z-50 px-6 py-5 flex justify-between items-center">
        <button 
          onClick={scrollToTop} 
          className="font-black tracking-tighter text-2xl cursor-pointer hover:text-primary transition-colors"
        >
          H<span className="text-primary">S</span>.
        </button>
        
        <div className="flex items-center gap-10">
          <div className="hidden md:flex gap-8 text-xs font-black tracking-widest">
            <a href="#projects" className="hover:text-primary transition-colors">PROJECTS</a>
            <a href="#blog" className="hover:text-primary transition-colors">INSIGHTS</a>
            <a href="#contact" className="hover:text-primary transition-colors">CONTACT</a>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="border border-border rounded-none hover:border-primary transition-all"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
        </div>
      </nav>

      <main>
        <Hero />

        {/* Skills Section */}
        <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto border-y border-border bg-muted/5">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {skills.map((skill) => (
              <div key={skill.name} className="p-6 border border-border bg-background hover:border-primary transition-all group text-center shadow-sm">
                <skill.icon className="mx-auto mb-4 text-muted-foreground group-hover:text-primary transition-colors" size={28} />
                <h3 className="text-[10px] font-black uppercase tracking-widest">{skill.name}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-4xl font-black tracking-tighter">SELECTED_WORK</h2>
            <div className="h-[2px] flex-1 bg-border"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            {projects.map((project) => (
              <Card key={project.title} className="bg-background border-border rounded-none hover:shadow-2xl transition-all border-t-4 border-t-primary/20 hover:border-t-primary">
                <CardHeader className="pt-8">
                  <CardTitle className="text-2xl font-bold tracking-tight">{project.title}</CardTitle>
                  <CardDescription className="text-base mt-2">{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-8">
                  <div className="flex gap-2 mb-8 flex-wrap">
                    {project.methods.map(m => (
                      <span key={m} className="text-[9px] font-bold bg-muted text-muted-foreground px-3 py-1 tracking-tighter uppercase">#{m}</span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <Button variant="outline" size="sm" className="rounded-none border-primary text-primary hover:bg-primary hover:text-white font-bold" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer"><Github size={14} className="mr-2"/> VIEW_SOURCE</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 px-6 md:px-20 max-w-5xl mx-auto border-t border-border mt-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black tracking-tighter mb-4">LET'S_COLLABORATE</h2>
            <p className="text-muted-foreground font-mono">AVAILABLE_FOR_QUANTITATIVE_CONSULTING</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="p-8 border border-border bg-card hover:border-primary hover:-translate-y-1 transition-all flex flex-col items-center shadow-sm">
              <Linkedin className="mb-4 text-blue-600" size={32} />
              <span className="text-[10px] font-black tracking-widest">LINKEDIN</span>
            </a>
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="p-8 border border-border bg-card hover:border-primary hover:-translate-y-1 transition-all flex flex-col items-center shadow-sm">
              <Github className="mb-4" size={32} />
              <span className="text-[10px] font-black tracking-widest">GITHUB</span>
            </a>
            <a href={`mailto:${personalInfo.email}`} className="p-8 border border-border bg-card hover:border-primary hover:-translate-y-1 transition-all flex flex-col items-center shadow-sm">
              <Mail className="mb-4 text-primary" size={32} />
              <span className="text-[10px] font-black tracking-widest">EMAIL</span>
            </a>
            <a href={`https://wa.me/${personalInfo.whatsapp}`} target="_blank" rel="noopener noreferrer" className="p-8 border border-border bg-card hover:border-primary hover:-translate-y-1 transition-all flex flex-col items-center shadow-sm">
              <MessageCircle className="mb-4 text-green-500" size={32} />
              <span className="text-[10px] font-black tracking-widest">WHATSAPP</span>
            </a>
          </div>
        </section>
      </main>

      <footer className="py-16 border-t border-border bg-muted/20 text-center">
        <p className="text-muted-foreground text-[10px] font-black tracking-[0.3em] uppercase">
          © {new Date().getFullYear()} {personalInfo.name} // SECURE_HANDSHAKE_COMPLETE
        </p>
      </footer>
    </div>
  );
}