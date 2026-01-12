import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { 
  Menu, X, ChevronRight, Github, Linkedin, Mail, Phone, 
  MessageCircle, FileText, Download, ExternalLink, TrendingUp,
  BarChart3, Brain, Database, Code2, LineChart, Sun, Moon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import heroBackground from "@assets/generated_images/stock_market_charts_background.png";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#cv", label: "CV" },
  { href: "#projects", label: "Projects" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];

/* =============================================
   PLACEHOLDER DATA - EDIT YOUR INFORMATION HERE
   ============================================= */

const personalInfo = {
  name: "Harshit Shah",
  title: "Quantitative Analyst & Data Scientist",
  email: "your.email@example.com", // EDIT: Your email address
  phone: "+1234567890", // EDIT: Your phone number (for tel: link)
  whatsapp: "1234567890", // EDIT: Your WhatsApp number (without + or spaces)
  linkedin: "https://linkedin.com/in/yourprofile", // EDIT: Your LinkedIn URL
  github: "https://github.com/yourusername", // EDIT: Your GitHub URL
  resumeUrl: "/resume.pdf", // EDIT: Path to your resume PDF
};

const indianStocks = [
  { symbol: "NIFTY 50", price: 24847.50, change: 1.24 },
  { symbol: "SENSEX", price: 81821.12, change: 0.98 },
  { symbol: "RELIANCE", price: 2934.25, change: 2.15 },
  { symbol: "TCS", price: 4123.80, change: -0.42 },
  { symbol: "HDFC BANK", price: 1756.40, change: 1.67 },
  { symbol: "INFOSYS", price: 1892.15, change: -0.89 },
  { symbol: "ICICI BANK", price: 1287.30, change: 0.73 },
  { symbol: "BHARTI AIRTEL", price: 1654.90, change: 1.92 },
  { symbol: "ITC", price: 467.25, change: 0.56 },
  { symbol: "WIPRO", price: 298.45, change: -1.23 },
  { symbol: "BAJAJ FINANCE", price: 7234.60, change: 2.34 },
  { symbol: "MARUTI", price: 12456.75, change: 0.87 },
];

const aboutText = {
  // EDIT: Your professional summary paragraphs
  intro: "I am a quantitative analyst and data scientist with a passion for bridging the gap between financial theory and practical data-driven solutions.",
  experience: "With extensive experience in financial modeling, statistical analysis, and machine learning, I specialize in developing robust quantitative strategies and predictive models that drive informed decision-making.",
  skills: "My expertise spans time series analysis, risk modeling, algorithmic trading systems, and advanced statistical methods. I leverage Python, R, and SQL to transform complex financial data into actionable insights.",
};

const skills = [
  { icon: TrendingUp, name: "Financial Modeling", desc: "DCF, Monte Carlo, VaR" },
  { icon: BarChart3, name: "Statistical Analysis", desc: "Regression, Time Series" },
  { icon: Brain, name: "Machine Learning", desc: "Deep Learning, NLP" },
  { icon: Database, name: "Data Engineering", desc: "SQL, ETL Pipelines" },
  { icon: Code2, name: "Programming", desc: "Python, R, C++" },
  { icon: LineChart, name: "Visualization", desc: "Tableau, D3.js, Plotly" },
];

const projects = [
  {
    // EDIT: Project 1 details
    title: "Portfolio Optimization Engine",
    description: "Built a mean-variance optimization model with Monte Carlo simulation for risk assessment. Implements Modern Portfolio Theory with custom constraints.",
    methods: ["Mean-Variance Optimization", "Monte Carlo Simulation", "Sharpe Ratio Analysis"],
    github: "https://github.com/yourusername/project1", // EDIT: GitHub link
    demo: "https://demo-link.com", // EDIT: Live demo link (or null if none)
  },
  {
    // EDIT: Project 2 details
    title: "Algorithmic Trading System",
    description: "Developed a high-frequency trading system with real-time market data processing and automated order execution based on statistical arbitrage strategies.",
    methods: ["Statistical Arbitrage", "Time Series Analysis", "Real-time Processing"],
    github: "https://github.com/yourusername/project2",
    demo: null,
  },
  {
    // EDIT: Project 3 details
    title: "Credit Risk Scoring Model",
    description: "Machine learning pipeline for credit risk assessment using gradient boosting and neural networks. Achieved 94% AUC on validation dataset.",
    methods: ["XGBoost", "Neural Networks", "Feature Engineering"],
    github: "https://github.com/yourusername/project3",
    demo: "https://demo-link.com",
  },
  {
    // EDIT: Project 4 details
    title: "Options Pricing Framework",
    description: "Implemented Black-Scholes, Binomial Tree, and Monte Carlo methods for derivatives pricing with Greeks calculation and volatility surface modeling.",
    methods: ["Black-Scholes Model", "Binomial Trees", "Volatility Surface"],
    github: "https://github.com/yourusername/project4",
    demo: null,
  },
];

const blogPosts = [
  {
    // EDIT: Blog post 1 details
    title: "Understanding GARCH Models for Volatility Forecasting",
    excerpt: "A deep dive into Generalized Autoregressive Conditional Heteroskedasticity models and their applications in financial markets.",
    date: "Dec 15, 2024",
    readTime: "8 min read",
    url: "#", // EDIT: Link to blog post
  },
  {
    // EDIT: Blog post 2 details
    title: "Machine Learning in Quantitative Finance: A Practical Guide",
    excerpt: "Exploring the intersection of ML and quant finance, from feature engineering to model deployment in production systems.",
    date: "Nov 28, 2024",
    readTime: "12 min read",
    url: "#",
  },
  {
    // EDIT: Blog post 3 details
    title: "Risk Parity vs. Mean-Variance: A Comparative Analysis",
    excerpt: "Comparing portfolio construction methodologies and their performance during different market regimes.",
    date: "Oct 10, 2024",
    readTime: "10 min read",
    url: "#",
  },
];

/* =============================================
   COMPONENTS
   ============================================= */

function StockTicker() {
  return (
    <div className="bg-secondary/50 border-b border-border overflow-hidden py-2.5">
      <div className="flex animate-ticker">
        {[...indianStocks, ...indianStocks].map((stock, index) => (
          <div
            key={`${stock.symbol}-${index}`}
            className="flex items-center gap-3 px-8 whitespace-nowrap border-r border-border/30"
          >
            <span className="text-xs font-semibold tracking-wide text-foreground">{stock.symbol}</span>
            <span className="text-xs font-mono text-muted-foreground">₹{stock.price.toLocaleString('en-IN')}</span>
            <span className={`text-xs font-mono font-medium ${stock.change >= 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
              {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-9 h-9" />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-lg hover:bg-muted transition-colors"
      data-testid="theme-toggle"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-accent" />
      ) : (
        <Moon className="h-5 w-5 text-foreground" />
      )}
    </button>
  );
}

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#" className="font-display font-bold text-xl tracking-tight" data-testid="nav-logo">
            <span className="text-foreground">H</span><span className="text-accent">S</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors"
                data-testid={`nav-link-${link.label.toLowerCase()}`}
              >
                {link.label}
              </a>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-foreground"
              data-testid="nav-mobile-toggle"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-card border border-border rounded-lg mt-2 p-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-3 text-foreground hover:text-accent transition-colors"
                data-testid={`nav-mobile-link-${link.label.toLowerCase()}`}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 dark:opacity-[0.15]"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-block mb-8">
            <span className="px-4 py-2 text-xs font-medium tracking-widest uppercase text-accent border border-accent/30 bg-accent/5">
              {personalInfo.title}
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold mb-8 leading-tight tracking-tight">
            <span className="text-foreground">Harshit Shah</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4 leading-relaxed">
            Bridging <span className="text-foreground font-medium">Finance</span> and <span className="text-foreground font-medium">Data Science</span>
          </p>
          
          <p className="text-base md:text-lg text-muted-foreground/70 max-w-xl mx-auto mb-12">
            through Quantitative Analysis
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium px-8"
              asChild
              data-testid="hero-cta-projects"
            >
              <a href="#projects">
                View Projects
                <ChevronRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border hover:border-accent/50 hover:text-accent px-8"
              asChild
              data-testid="hero-cta-contact"
            >
              <a href="#contact">Get in Touch</a>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <ChevronRight className="h-5 w-5 text-muted-foreground rotate-90" />
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-20 md:py-32 bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-center">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Transforming complex financial data into strategic insights
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* EDIT: Update these paragraphs with your bio */}
            <p className="text-lg text-foreground/90 leading-relaxed">
              {aboutText.intro}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {aboutText.experience}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {aboutText.skills}
            </p>
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-4"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="p-4 rounded-xl bg-secondary/50 border border-border hover:border-primary/30 transition-colors group"
              >
                <skill.icon className="h-6 w-6 text-primary mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-medium text-sm mb-1">{skill.name}</h3>
                <p className="text-xs text-muted-foreground">{skill.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CV() {
  return (
    <section id="cv" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Curriculum <span className="text-gradient">Vitae</span>
          </h2>
          <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
            Explore my professional background and qualifications
          </p>

          <Card className="max-w-xl mx-auto bg-card border-border card-hover">
            <CardContent className="p-8">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">Professional Resume</h3>
              <p className="text-muted-foreground text-sm mb-6">
                Download my complete curriculum vitae with detailed work experience, education, and certifications.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {/* EDIT: Update href to your resume PDF path */}
                <Button
                  className="bg-primary hover:bg-primary/90"
                  asChild
                  data-testid="cv-view-resume"
                >
                  <a href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Resume
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="border-border hover:border-primary"
                  asChild
                  data-testid="cv-download"
                >
                  <a href={personalInfo.resumeUrl} download>
                    <Download className="mr-2 h-4 w-4" />
                    Download CV
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="py-20 md:py-32 bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-center">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Quantitative solutions and data-driven applications
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Card className="h-full bg-card border-border card-hover group">
                <CardHeader>
                  <CardTitle className="font-display text-xl group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.methods.map((method) => (
                      <span
                        key={method}
                        className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                      >
                        {method}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {/* EDIT: Update these links for each project */}
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-border hover:border-primary hover:text-primary"
                      asChild
                      data-testid={`project-github-${index}`}
                    >
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                      </a>
                    </Button>
                    {project.demo && (
                      <Button
                        size="sm"
                        className="bg-primary hover:bg-primary/90"
                        asChild
                        data-testid={`project-demo-${index}`}
                      >
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Blog() {
  return (
    <section id="blog" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-center">
            Technical <span className="text-gradient">Insights</span>
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Articles on quantitative finance and data science
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <a
                href={post.url}
                className="block h-full"
                data-testid={`blog-post-${index}`}
              >
                <Card className="h-full bg-card border-border card-hover group">
                  <CardHeader>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <CardTitle className="font-display text-lg group-hover:text-primary transition-colors leading-snug">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center text-sm text-primary font-medium group-hover:gap-2 transition-all">
                      Read More
                      <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-20 md:py-32 bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
            Interested in collaboration or have questions? Reach out through any of these channels.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="bg-card border-border">
            <CardContent className="p-8">
              <div className="grid sm:grid-cols-2 gap-6">
                {/* LinkedIn */}
                {/* EDIT: Update href to your LinkedIn profile */}
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary border border-border hover:border-primary/30 transition-all group"
                  data-testid="contact-linkedin"
                >
                  <div className="w-12 h-12 rounded-full bg-[#0A66C2]/10 flex items-center justify-center">
                    <Linkedin className="h-6 w-6 text-[#0A66C2]" />
                  </div>
                  <div>
                    <h3 className="font-medium group-hover:text-primary transition-colors">LinkedIn</h3>
                    <p className="text-sm text-muted-foreground">Professional Network</p>
                  </div>
                </a>

                {/* GitHub */}
                {/* EDIT: Update href to your GitHub profile */}
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary border border-border hover:border-primary/30 transition-all group"
                  data-testid="contact-github"
                >
                  <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center">
                    <Github className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium group-hover:text-primary transition-colors">GitHub</h3>
                    <p className="text-sm text-muted-foreground">Code Repository</p>
                  </div>
                </a>

                {/* Email */}
                {/* EDIT: Update href to your email */}
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary border border-border hover:border-primary/30 transition-all group"
                  data-testid="contact-email"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium group-hover:text-primary transition-colors">Email</h3>
                    <p className="text-sm text-muted-foreground">Direct Message</p>
                  </div>
                </a>

                {/* Phone / WhatsApp */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 border border-border">
                  <div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center">
                    <Phone className="h-6 w-6 text-[#25D366]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Phone</h3>
                    <div className="flex gap-2 mt-1">
                      {/* EDIT: Update href to your phone number */}
                      <a
                        href={`tel:${personalInfo.phone}`}
                        className="text-xs px-2 py-1 rounded bg-secondary hover:bg-primary/10 hover:text-primary transition-colors"
                        data-testid="contact-phone"
                      >
                        Call
                      </a>
                      {/* EDIT: Update href to your WhatsApp number */}
                      <a
                        href={`https://wa.me/${personalInfo.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs px-2 py-1 rounded bg-secondary hover:bg-[#25D366]/10 hover:text-[#25D366] transition-colors flex items-center gap-1"
                        data-testid="contact-whatsapp"
                      >
                        <MessageCircle className="h-3 w-3" />
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-8 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              data-testid="footer-linkedin"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              data-testid="footer-github"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-muted-foreground hover:text-primary transition-colors"
              data-testid="footer-email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <StockTicker />
      <Navigation />
      <main>
        <Hero />
        <About />
        <CV />
        <Projects />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
