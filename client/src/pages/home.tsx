import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { 
  Github, Linkedin, Mail, MessageCircle, 
  Sun, Moon, Download, User, 
  TrendingUp, BarChart3, Brain, Database, Code2, LineChart,
  ArrowRight, ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const personalInfo = {
  name: "Harshit Shah",
  title: "Quantitative Analyst & Data Scientist",
  email: "harshitshah.work@gmail.com",
  phone: "+919978645603",
  whatsapp: "+919978645603",
  linkedin: "https://linkedin.com/in/harshitvshah",
  github: "https://github.com/Harshit-0307",
  resumeUrl: "/resume.pdf",
  profileImg: "https://github.com/Harshit-0307.png" 
};

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
    title: "Pairs Trading Framework",
    description: "A comprehensive backtesting engine for statistical arbitrage that achieved an 18.02% annualized return using cointegration and Z-score signals.",
    methods: ["Stats Arb", "Cointegration", "Backtesting"],
    github: "https://github.com/Harshit-0307/Pairs-Trading", // Updated to specific repo
  },
  {
    title: "QuantLab: Strategy Research",
    description: "Integrated environment for time series forecasting (ARIMA), factor models (Fama-French), and risk-parity optimization.",
    methods: ["ARIMA", "Fama-French", "Python"],
    github: "https://github.com/Harshit-0307/QuantLab", // Updated to specific repo
  },
  {
    title: "Portfolio Optimization Engine",
    description: "Built a mean-variance optimization model with Monte Carlo simulation for risk assessment and Sharpe Ratio maximization.",
    methods: ["Optimization", "Monte Carlo", "Risk MGMT"],
    github: "https://github.com/Harshit-0307", // Replace with specific URL
  },
  {
    title: "HFT Data Pipeline",
    description: "ETL pipelines designed for high-frequency tick data processing and real-time feature engineering.",
    methods: ["SQL", "ETL", "Real-time"],
    github: "https://github.com/Harshit-0307", // Replace with specific URL
  }
];

const blogPosts = [
  {
    title: "Volatility Forecasting with GARCH Models",
    excerpt: "Implementing Generalized Autoregressive Conditional Heteroskedasticity models to predict market risk and set dynamic stop-losses.",
    date: "Oct 22, 2024",
    readTime: "6 min read",
    tag: "Time Series",
    url: "https://medium.com/@sheikh.sahil12299/mastering-volatility-forecasting-with-garch-models-a-deep-dive-into-financial-market-dynamics-8df73c037b7e" // Add your blog link here
  },
  {
    title: "Machine Learning in HFT Environments",
    excerpt: "Exploring low-latency feature engineering and the trade-offs between model complexity and execution speed in high-frequency trading.",
    date: "June 05, 2022",
    readTime: "10 min read",
    tag: "ML / HFT",
    url: "https://www.sciencedirect.com/science/article/abs/pii/S0165188922001439" // Add your blog link here
  },
  {
    title: "Modern Portfolio Theory vs. Black-Litterman",
    excerpt: "A comparison of asset allocation frameworks and how to incorporate subjective market views into quantitative optimization.",
    date: "Dec 28, 2025",
    readTime: "8 min read",
    tag: "Portfolio MGMT",
    url: "https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://tesi.luiss.it/29991/1/704501_MAESTRIPIERI_SIMONE.pdf&ved=2ahUKEwit84CfpZiSAxXriq8BHehwLO8QFnoECBsQAQ&usg=AOvVaw0PuWIRsDXfQAjHB1O4gBoo" // Add your blog link here
  },
  {
    title: "The Role of Factor Models in Alpha Generation",
    excerpt: "Decomposing returns using Fama-French factors to identify true alpha versus market beta in systematic strategies.",
    date: "Dec 15, 2025",
    readTime: "7 min read",
    tag: "Alpha Research",
    url: "https://www.investopedia.com/terms/a/alpha.asp" // Add your blog link here
  }
];

function TradingViewTicker() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scriptId = "tradingview-widget-script";
    let script = document.getElementById(scriptId) as HTMLScriptElement;
    
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://widgets.tradingview-widget.com/w/en/tv-ticker-tape.js";
      script.type = "module";
      script.async = true;
    }

    const ticker = document.createElement("tv-ticker-tape");
    ticker.setAttribute("symbols", "BSE:SENSEX,BSE:RELIANCE,OANDA:XAUUSD,BSE:SUNCLAY,FX_IDC:USDINR,BSE:TRENT,BSE:PRECAM,BSE:TATACAP,BSE:TCS,BSE:HDFCBANK,BSE:HDBFS,BSE:EICHERMOT,BSE:ADANIPOWER,BSE:ATGL");
    ticker.setAttribute("colorTheme", "dark");
    ticker.setAttribute("isTransparent", "true");

    if (containerRef.current) {
      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(script);
      containerRef.current.appendChild(ticker);
    }

    return () => {
      if (containerRef.current) containerRef.current.innerHTML = "";
    };
  }, []);

  return (
    <div className="border-b border-border bg-background min-h-[46px]" ref={containerRef}></div>
  );
}

function Hero() {
  const [subText, setSubText] = useState("");
  const fullSubText = "EXECUTING_ALPHA_STRATEGIES";
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setSubText(fullSubText.slice(0, i));
      i++;
      if (i > fullSubText.length) clearInterval(interval);
    }, 50);
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
      <TradingViewTicker />
      
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
                      <a href={project.github} target="_blank" rel="noopener noreferrer"><Github size={14} className="mr-2"/> VIEW_REPO</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Blog/Insights Section */}
        <section id="blog" className="py-24 px-6 md:px-20 max-w-7xl mx-auto border-t border-border bg-muted/5">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <p className="text-primary font-mono text-xs mb-2 tracking-widest uppercase">Research & Analysis</p>
              <h2 className="text-4xl font-black tracking-tighter">TECHNICAL_INSIGHTS</h2>
            </div>
            <Button variant="link" className="text-muted-foreground hover:text-primary p-0 h-auto font-bold tracking-widest text-xs">
              VIEW_ALL_ARTICLES <ArrowRight size={14} className="ml-2" />
            </Button>
          </div>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {blogPosts.map((post) => (
  <a 
    key={post.title} 
    href={post.url} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="block group"
  >
    <Card className="h-full bg-background border-border rounded-none group-hover:border-primary transition-all flex flex-col shadow-sm">
      <CardHeader>
        <div className="flex justify-between items-center mb-4">
          <span className="text-[10px] font-bold text-primary tracking-widest uppercase bg-primary/10 px-2 py-1">{post.tag}</span>
          <span className="text-[10px] text-muted-foreground font-mono">{post.date}</span>
        </div>
        <CardTitle className="text-lg group-hover:text-primary transition-colors leading-tight">{post.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-xs text-muted-foreground mb-6 leading-relaxed line-clamp-3">{post.excerpt}</p>
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-border/50">
          <span className="text-[10px] text-muted-foreground font-mono italic">{post.readTime}</span>
          <div className="text-[10px] font-black tracking-widest uppercase group-hover:translate-x-1 transition-transform flex items-center gap-2">
            READ_LOG <ExternalLink size={10} />
          </div>
        </div>
      </CardContent>
    </Card>
  </a>
))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 px-6 md:px-20 max-w-5xl mx-auto border-t border-border">
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