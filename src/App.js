import React, { useState, useEffect } from 'react';

// Static Category Data (Updated with unique IDs for articles)
const categoriesData = {
  'bootcamps': {
    title: "Best Coding Bootcamps",
    description: "Discover the top coding bootcamps that offer intensive, career-focused training to help you transition into tech quickly. We review programs for web development, data science, cybersecurity, and more.",
    keyConcepts: [
      "Immersive Learning",
      "Career Support",
      "Job Placement Rates",
      "Payment Options (ISA, Upfront)",
      "Curriculum Depth"
    ],
    featuredCourses: [
      { id: "full-stack-web-dev-bootcamp-review", title: "Full-Stack Web Dev Bootcamp Review", description: "An in-depth look at a leading full-stack program, covering modern web technologies and practical projects.", image: "https://placehold.co/150x100/E0E0E0/333333?text=FS+Bootcamp", affiliateUrl: "https://example.com/bootcamp-affiliate-id-123" },
      { id: "data-science-bootcamp-deep-dive", title: "Data Science Bootcamp Deep Dive", description: "Analyzing the curriculum and outcomes of a popular data science bootcamp.", image: "https://placehold.co/150x100/D0D0D0/333333?text=DS+Bootcamp" },
      { id: "cybersecurity-bootcamp-analysis", title: "Cybersecurity Bootcamp Analysis", description: "A review of top cybersecurity bootcamps for beginners.", image: "https://placehold.co/150x100/C0C0C0/333333?text=Cyber+Bootcamp" }
    ],
    articles: [
      { id: "is-a-coding-bootcamp-right-for-you", title: "Is a Coding Bootcamp Right for You?", description: "Explore the pros and cons of coding bootcamps to determine if they align with your career goals.", image: "https://placehold.co/150x100/B0B0B0/333333?text=Bootcamp+Fit" },
      { id: "how-to-choose-the-best-bootcamp", title: "How to Choose the Best Bootcamp", description: "Factors to consider before enrolling in a bootcamp.", image: "https://placehold.co/150x100/A0A0A0/333333?text=Choose+Bootcamp" },
      { id: "bootcamp-vs-self-taught-which-path", title: "Bootcamp vs. Self-Taught: Which Path to Take?", description: "A comparison of two popular learning approaches.", image: "https://placehold.co/150x100/909090/333333?text=Bootcamp+vs+Self" }
    ]
  },
  'online-courses': {
    title: "Top Online Courses",
    description: "Explore the best online platforms and courses for self-paced learning in various programming languages and tech skills. From beginner-friendly introductions to advanced specializations.",
    keyConcepts: [
      "Self-Paced Learning",
      "Flexibility",
      "Certification Value",
      "Course Content Quality",
      "Community Support"
    ],
    featuredCourses: [
      { id: "python-for-everybody-coursera-review", title: "Python for Everybody (Coursera) Review", description: "Master Python for data analysis and machine learning with hands-on projects and expert guidance.", image: "https://placehold.co/150x100/E0E0E0/333333?text=Python+Course", affiliateUrl: "https://www.coursera.org/specializations/python-for-everybody?action=enroll&affid=YOUR_COURSERA_AFFILIATE_ID" },
      { id: "full-stack-javascript-udemy-guide", title: "Full-Stack JavaScript (Udemy) Guide", description: "Mastering JavaScript from frontend to backend with this comprehensive Udemy course.", image: "https://placehold.co/150x100/D0D0D0/333333?text=JS+Course", affiliateUrl: "https://www.udemy.com/course/full-stack-javascript/?persist_locale=&affid=YOUR_UDEMY_AFFILIATE_ID" },
      { id: "sql-for-data-analysis-edx-insights", title: "SQL for Data Analysis (edX) Insights", description: "Gain essential SQL skills for data manipulation and analysis.", image: "https://placehold.co/150x100/C0C0C0/333333?text=SQL+Course" }
    ],
    articles: [
      { id: "free-vs-paid-online-courses", title: "Free vs. Paid Online Courses: What's Best?", description: "Comparing free and paid learning options.", image: "https://placehold.co/150x100/B0B0B0/333333?text=Free+vs+Paid" },
      { id: "how-to-stay-motivated-in-online-learning", title: "How to Stay Motivated in Online Learning", description: "Tips for successful self-study.", image: "https://placehold.co/150x100/A0A0A0/333333?text=Motivation" },
      { id: "best-platforms-for-online-tech-education", title: "Best Platforms for Online Tech Education", description: "A comparison of Coursera, edX, Udemy, and more.", image: "https://placehold.co/150x100/909090/333333?text=Platforms" }
    ]
  },
  'learning-paths': {
    title: "Software Learning Paths",
    description: "Find structured learning roadmaps for various software development roles. Whether you want to be a frontend, backend, mobile, or DevOps engineer, we've got a path for you.",
    keyConcepts: [
      "Structured Roadmaps",
      "Skill Progression",
      "Project-Based Learning",
      "Tooling & Ecosystem",
      "Career Specialization"
    ],
    featuredCourses: [
      { id: "frontend-developer-roadmap", title: "Frontend Developer Roadmap", description: "Your step-by-step guide to becoming a successful frontend developer.", image: "https://placehold.co/150x100/E0E0E0/333333?text=Frontend+Path" },
      { id: "backend-engineer-journey", title: "Backend Engineer Journey", description: "Charting the course to master backend development.", image: "https://placehold.co/150x100/D0D0D0/333333?text=Backend+Path" },
      { id: "devops-learning-path", title: "DevOps Learning Path", description: "Understanding the tools and practices for a DevOps career.", image: "https://placehold.co/150x100/C0C0C0/333333?text=DevOps+Path" }
    ],
    articles: [
      { id: "choosing-your-software-development-niche", title: "Choosing Your Software Development Niche", description: "Deciding between different tech roles.", image: "https://placehold.co/150x100/B0B0B0/333333?text=Niche+Choice" },
      { id: "building-a-strong-developer-portfolio", title: "Building a Strong Developer Portfolio", description: "Showcasing your projects effectively.", image: "https://placehold.co/150x100/A0A0A0/333333?text=Portfolio" },
      { id: "mobile-development-ios-vs-android-path", title: "Mobile Development: iOS vs Android Path", description: "Which mobile platform should you focus on?", image: "https://placehold.co/150x100/909090/333333?text=Mobile+Path" }
    ]
  },
  'success-stories': {
    title: "Inspiring Success Stories",
    description: "Read real-life testimonials and interviews from individuals who successfully transitioned into tech careers. Learn from their challenges, strategies, and triumphs.",
    keyConcepts: [
      "Real-Life Journeys",
      "Overcoming Challenges",
      "Job Search Strategies",
      "Motivation & Resilience",
      "Diverse Backgrounds"
    ],
    featuredCourses: [ // Bu kategori için featuredCourses yerine yeniden adlandırıldı
      { id: "from-teacher-to-software-engineer", title: "From Teacher to Software Engineer", description: "Sarah's journey from education to coding.", image: "https://placehold.co/150x100/E0E0E0/333333?text=Teacher+Story" },
      { id: "breaking-into-tech-at-40-plus", title: "Breaking Tech at 40+", description: "How Mark started a new tech career in his 40s.", image: "https://placehold.co/150x100/D0D0D0/333333?text=Age+Story" },
      { id: "self-taught-developers-path-to-google", title: "Self-Taught Developer's Path to Google", description: "The incredible story of a self-learner landing a dream job.", image: "https://placehold.co/150x100/C0C0C0/333333?text=Self+Taught" }
    ],
    articles: [
      { id: "how-i-landed-my-first-tech-job-in-6-months", title: "How I Landed My First Tech Job in 6 Months", description: "A detailed account of a rapid career change, highlighting challenges and strategies.", image: "https://placehold.co/150x100/B0B0B0/333333?text=First+Job" },
      { id: "the-power-of-networking-in-tech", title: "The Power of Networking in Tech", description: "Building connections for career growth.", image: "https://placehold.co/150x100/A0A0A0/333333?text=Networking" },
      { id: "interview-tips-from-a-faang-engineer", title: "Interview Tips from a FAANG Engineer", description: "Insights from a top tech company.", image: "https://placehold.co/150x100/909090/333333?text=FAANG+Tips" }
    ]
  },
  'blog': {
    title: "Latest Blog Posts",
    description: "Stay up-to-date with the latest trends, news, and insights in the world of software education and technology. Our blog covers everything from new programming languages to industry analysis.",
    keyConcepts: [
      "Industry News",
      "Tech Trends",
      "Opinion Pieces",
      "Tutorials",
      "Community Updates"
    ],
    featuredCourses: [ // Bu kategori için featuredPosts olarak yeniden adlandırıldı
      { id: "the-rise-of-webassembly-in-web-dev", title: "The Rise of WebAssembly in Web Dev", description: "Exploring the impact of WebAssembly on web development.", image: "https://placehold.co/150x100/E0E0E0/333333?text=WebAssembly" },
      { id: "understanding-quantum-computing-basics", title: "Understanding Quantum Computing Basics", description: "A simplified introduction to the complex world of quantum computing.", image: "https://placehold.co/150x100/D0D0D0/333333?text=Quantum+Comp" },
      { id: "ethical-ai-a-developers-perspective", title: "Ethical AI: A Developer's Perspective", description: "Navigating the ethical challenges in AI development.", image: "https://placehold.co/150x100/C0C0C0/333333?text=Ethical+AI" }
    ],
    articles: [      
      { id: "top-5-programming-languages-to-learn-in-2025", title: "Top 5 Programming Languages to Learn in 2025", description: "A look at the most in-demand languages.", image: "https://placehold.co/150x100/B0B0B0/333333?text=Top+Languages" },
      { id: "ai-transforming-data-center-energy", title: "AI is Transforming Data Center Energy Consumption: New Generation Smart Cooling Systems Undergo Global Tests", description: "As global digitalization continues its unceasing pace, data center energy consumption is becoming an increasingly critical issue in terms of environmental sustainability and operational costs. The cooling of these centers, in particular, constitutes a significant portion of their total energy expenditure. However, recent developments indicate that artificial intelligence (AI) is offering revolutionary solutions in this domain. Pilot projects and large-scale tests conducted over the past few years have demonstrated that AI-powered smart cooling systems can dramatically reduce the energy footprint of data centers. Unlike traditional fixed-setting cooling solutions, these next-generation systems utilize machine learning algorithms to analyze real-time data, including server load, internal/external temperatures, humidity, and even energy prices. Based on this analysis, AI precisely predicts the data center's optimal cooling needs and dynamically adjusts cooling systems. Industry analysts predict that AI-based smart cooling systems will become a standard component of data centers within the next 5 years.", image: "https://placehold.co/150x100/A0A0A0/333333?text=AiCode", categoryId: "technology" },
      { id: "the-future-of-low-code-no-code-platforms", title: "Low-Code No-Code Platforms: The Future of Development?", description: "Impact on traditional software development.", image: "https://placehold.co/150x100/A0A0A0/333333?text=LowCode" },
      { id: "demystifying-blockchain-for-developers", title: "Demystifying Blockchain for Developers", description: "A guide to understanding blockchain technology.", image: "https://placehold.co/150x100/909090/333333?text=Blockchain" }
    ]
  },
  'ai-tech': {
    title: "AI Technologies",
    description: "Explore the latest advancements and applications of artificial intelligence across various industries. From machine learning algorithms to AI-powered tools and platforms.",
    keyConcepts: [
      "Machine Learning",
      "Deep Learning",
      "Natural Language Processing",
      "AI Ethics",
      "AI in Industry"
    ],
    featuredCourses: [
      { id: "intro-to-machine-learning", title: "Introduction to Machine Learning", description: "Learn the basics of machine learning and how to apply them.", image: "https://placehold.co/150x100/E0E0E0/333333?text=ML+Course", affiliateUrl: "https://example.com/ml-course" },
      { id: "deep-learning-specialization", title: "Deep Learning Specialization", description: "Master the foundations of deep learning and neural networks.", image: "https://placehold.co/150x100/D0D0D0/333333?text=DL+Specialization", affiliateUrl: "https://example.com/deep-learning-specialization" },
      { id: "ai-for-everyone", title: "AI For Everyone", description: "Understand AI's impact on society and how to navigate the AI-powered future.", image: "https://placehold.co/150x100/C0C0C0/333333?text=AI+For+Everyone", affiliateUrl: "https://example.com/ai-for-everyone" }
    ],
    articles: [
      { id: "what-is-ai-and-how-does-it-work", title: "What is AI and How Does it Work?", description: "A beginner's guide to understanding artificial intelligence.", image: "https://placehold.co/150x100/B0B0B0/333333?text=What+is+AI" },
      { id: "machine-learning-vs-deep-learning", title: "Machine Learning vs Deep Learning: What's the Difference?", description: "Exploring the key differences and use cases.", image: "https://placehold.co/150x100/A0A0A0/333333?text=ML+vs+DL" },
      { id: "the-future-of-ai-ethics", title: "The Future of AI: Opportunities and Ethical Challenges", description: "Navigating the ethical landscape of AI advancements.", image: "https://placehold.co/150x100/909090/333333?text=AI+Ethics" }
    ]
  },
  'technology': {
    title: "AI and Technology",
    description: "Discover how AI is revolutionizing various tech domains, from data science to software development.",
    keyConcepts: [
      "AI in Data Science",
      "Machine Learning Innovations",
      "AI-Powered Development Tools",
      "Ethical AI Use",
      "Future Tech Trends"
    ],
    featuredCourses: [
      { id: "ai-for-data-science", title: "AI for Data Science", description: "Leverage AI to enhance your data science skills.", image: "https://placehold.co/150x100/E0E0E0/333333?text=AI+Data+Science", affiliateUrl: "https://example.com/ai-for-data-science" },
      { id: "machine-learning-advanced", title: "Advanced Machine Learning", description: "Deepen your machine learning knowledge with advanced techniques.", image: "https://placehold.co/150x100/D0D0D0/333333?text=Adv+ML", affiliateUrl: "https://example.com/advanced-machine-learning" },
      { id: "ethical-ai-development", title: "Ethical AI Development", description: "Understand the ethical implications of AI in tech.", image: "https://placehold.co/150x100/C0C0C0/333333?text=Ethical+AI+Dev", affiliateUrl: "https://example.com/ethical-ai-development" }
    ],
    articles: [
      { id: "ai-impact-on-tech-careers", title: "The Impact of AI on Tech Careers", description: "How AI is changing job roles in technology.", image: "https://placehold.co/150x100/B0B0B0/333333?text=AI+Impact+Tech" },
      { id: "top-ai-tools-for-developers", title: "Top AI Tools for Developers", description: "Essential AI tools every developer should know.", image: "https://placehold.co/150x100/A0A0A0/333333?text=AI+Tools+Dev" },
      { id: "future-of-ai-in-software-development", title: "The Future of AI in Software Development", description: "Predictions and trends for AI in software engineering.", image: "https://placehold.co/150x100/909090/333333?text=Future+of+AI+Dev" }
    ]
  },
  // More categories can be added as needed
};

// Helper function to get all articles from all categories
const getAllArticles = () => {
  let allArticles = [];
  for (const categoryId in categoriesData) {
    const category = categoriesData[categoryId];
    // Add categoryId to each article for easier searching
    const articlesWithCategory = category.articles.map(article => ({ ...article, categoryId: categoryId }));
    const featuredCoursesWithCategory = category.featuredCourses ? category.featuredCourses.map(article => ({ ...article, categoryId: categoryId })) : [];
    allArticles = allArticles.concat(articlesWithCategory, featuredCoursesWithCategory);
  }
  return allArticles;
};

const allArticlesData = getAllArticles(); // Used as static article data

// Static Author Data
const authorData = {
  'john-doe': {
    id: 'john-doe',
    name: 'John Doe',
    bio: 'John Doe is a Senior Software Engineer with over 10 years of experience in full-stack web development, data science, and cloud architecture. He is passionate about simplifying complex technical concepts and helping aspiring developers kickstart their careers. John has a strong background in Python, JavaScript, and various cloud platforms, and he enjoys sharing his insights on effective learning strategies and career growth in tech.',
    image: 'https://placehold.co/150x150/E0E0E0/333333?text=John+Doe',
    // Filter articles that could be written by John Doe
    articles: allArticlesData.filter(article =>
      ['python-for-everybody-coursera-review', 'full-stack-javascript-udemy-guide', 'frontend-developer-roadmap', 'backend-engineer-journey', 'the-rise-of-webassembly-in-web-dev', 'understanding-quantum-computing-basics', 'ethical-ai-a-developers-perspective'].includes(article.id)
    )
  },
  // More authors can be added as needed
};


// Main App Component
function App() {
  // currentPage can now be an object: { type: 'pageName', id?: string, categoryId?: string, articleId?: string, searchQuery?: string }
  const [currentPage, setCurrentPage] = useState({ type: 'articles-list' }); // Initial page is set to All Articles instead of Admin panel
  // New states: User's login status and interests
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInterests, setUserInterests] = useState([]); // Array of category IDs

  // useEffect to dynamically update the document title
  useEffect(() => {
    let title = "TechPathFinder: Your Guide to Software Education";
    if (currentPage.type === 'category' && categoriesData[currentPage.id]) {
      title = `${categoriesData[currentPage.id].title} - TechPathFinder`;
    } else if (currentPage.type === 'single-post' && currentPage.categoryId && currentPage.articleId) {
      const categoryArticles = categoriesData[currentPage.categoryId]?.articles.concat(categoriesData[currentPage.categoryId]?.featuredCourses || []);
      const article = categoryArticles?.find(art => art.id === currentPage.articleId);
      if (article) {
        title = `${article.title} - TechPathFinder`;
      }
    } else if (currentPage.type === 'search-results' && currentPage.searchQuery) {
      title = `Search Results for "${currentPage.searchQuery}" - TechPathFinder`;
    } else if (currentPage.type === 'author-profile' && authorData[currentPage.id]) {
        title = `${authorData[currentPage.id].name}'s Profile - TechPathFinder`;
    }
    else {
      switch (currentPage.type) {
        case 'home':
          title = "TechPathFinder: Launch Your Tech Career";
          break;
        case 'articles-list':
          title = "All Articles - TechPathFinder";
          break;
        case 'about':
          title = "About Us - TechPathFinder";
          break;
        case 'contact':
          title = "Contact Us - TechPathFinder";
          break;
        case 'privacy-policy':
          title = "Privacy Policy - TechPathFinder";
          break;
        case 'terms-of-service':
          title = "Terms of Service - TechPathFinder";
          break;
        case 'login':
          title = "Login - TechPathFinder";
          break;
        case 'register':
          title = "Register - TechPathFinder";
          break;
        case 'set-interests':
          title = "Set Your Interests - TechPathFinder";
          break;
        case 'admin-panel': // Admin panel page
          title = "Admin Panel - TechPathFinder";
          break;
        default:
          title = "TechPathFinder: Your Guide to Software Education";
      }
    }
    document.title = title;
  }, [currentPage]);

  // Login, Logout and Interest Update Functions
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    // In a real application, user data (including interests) would be fetched from a backend here.
    // For now, we can either assign some default interests or leave it empty when logging in.
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserInterests([]);
    setCurrentPage({ type: 'home' });
  };

  const handleSetInterests = (selectedInterests) => {
    setUserInterests(selectedInterests);
    setCurrentPage({ type: 'home' }); // Return to home page after updating interests
  };


  // Simple routing based on page changes
  const renderPage = () => {
    switch (currentPage.type) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} isLoggedIn={isLoggedIn} userInterests={userInterests} />;
      case 'category':
        return <CategoryPage categoryId={currentPage.id} setCurrentPage={setCurrentPage} />;
      case 'blog':
        return <CategoryPage categoryId="blog" setCurrentPage={setCurrentPage} />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'privacy-policy':
        return <PrivacyPolicyPage />;
      case 'terms-of-service':
        return <TermsOfServicePage />;
      case 'single-post':
        return <SinglePostPage categoryId={currentPage.categoryId} articleId={currentPage.articleId} setCurrentPage={setCurrentPage} />;
      case 'login':
        return <LoginPage setCurrentPage={setCurrentPage} onLoginSuccess={handleLoginSuccess} />;
      case 'register':
        return <RegisterPage setCurrentPage={setCurrentPage} />;
      case 'search-results':
        return <SearchResultsPage searchQuery={currentPage.searchQuery} setCurrentPage={setCurrentPage} />;
      case 'author-profile':
        return <AuthorProfilePage authorId={currentPage.id} setCurrentPage={setCurrentPage} />;
      case 'set-interests': // New interest selection page
        return <SetInterestsPage
                 setCurrentPage={setCurrentPage}
                 userInterests={userInterests}
                 onSetInterests={handleSetInterests}
               />;
      case 'admin-panel': // Admin panel page
        return <AdminPanelPage setCurrentPage={setCurrentPage} />;
      case 'articles-list': // All articles page
        return <ArticleListPage articles={allArticlesData} setCurrentPage={setCurrentPage} />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} isLoggedIn={isLoggedIn} userInterests={userInterests} />;
    }
  };

  return (
    // Assuming Tailwind CSS and Google Fonts are used.
    // In a real application, these fonts would be loaded with <link> tags in the public/index.html file.
    <div className="font-inter antialiased text-gray-800 bg-gray-50 min-h-screen flex flex-col">
      {/* Header Component */}
      <Header setCurrentPage={setCurrentPage} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />

      {/* Main Content Area */}
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderPage()}
      </main>

      {/* Footer Component */}
      <Footer setCurrentPage={setCurrentPage} />

      {/* Fixed Bottom Ad Space (Visible on all pages) */}
      {/* Reklam alanı kaldırıldı */}
    </div>
  );
}

// Header Component
const Header = ({ setCurrentPage, isLoggedIn, handleLogout }) => {
  const [searchInputValue, setSearchInputValue] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile menu state

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInputValue.trim()) {
      setCurrentPage({ type: 'search-results', searchQuery: searchInputValue.trim() });
      setSearchInputValue(''); // Clear search input after submission
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-lg py-4"> {/* Improved shadow */}
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-3xl font-bold text-blue-700 cursor-pointer font-space-grotesk tracking-tight" onClick={() => setCurrentPage({ type: 'home' })}>
          TechPathFinder
        </div>
        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex-grow mx-4 max-w-md hidden md:flex">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchInputValue}
            onChange={(e) => setSearchInputValue(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition duration-300">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </button>
        </form>
        {/* Navigation Menu (Desktop) */}
        <nav className="hidden md:flex space-x-6 items-center">
          <NavLink onClick={() => setCurrentPage({ type: 'home' })}>Home</NavLink>
          <NavLink onClick={() => setCurrentPage({ type: 'articles-list' })}>All Articles</NavLink> {/* New All Articles Link */}
          <NavLink onClick={() => setCurrentPage({ type: 'category', id: 'bootcamps' })}>Bootcamps</NavLink>
          <NavLink onClick={() => setCurrentPage({ type: 'category', id: 'online-courses' })}>Courses</NavLink>
          <NavLink onClick={() => setCurrentPage({ type: 'blog' })}>Blog</NavLink>
          {isLoggedIn && ( // Admin Panel link visible only when logged in
            <NavLink onClick={() => setCurrentPage({ type: 'admin-panel' })} className="text-purple-600 hover:text-purple-800">Admin Panel</NavLink>
          )}
          {/* Login / Logout button */}
          {isLoggedIn ? (
            <button onClick={handleLogout}
                    className="px-6 py-2 rounded-full text-white font-semibold tracking-wide
                               bg-gradient-to-r from-red-600 to-red-800
                               hover:from-red-700 hover:to-red-900
                               shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
              Logout
            </button>
          ) : (
            <button onClick={() => setCurrentPage({ type: 'login' })}
                    className="px-6 py-2 rounded-full text-white font-semibold tracking-wide
                               bg-gradient-to-r from-blue-600 to-blue-800
                               hover:from-blue-700 hover:to-blue-900
                               shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
              Login
            </button>
          )}
        </nav>
        {/* Mobile Navigation Button */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-gray-600 focus:outline-none">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              )}
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile Menu Layer (Simple example) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white py-4 shadow-md">
          <nav className="flex flex-col items-center space-y-4">
            <NavLink onClick={() => { setCurrentPage({ type: 'home' }); setIsMobileMenuOpen(false); }}>Home</NavLink>
            <NavLink onClick={() => { setCurrentPage({ type: 'articles-list' }); setIsMobileMenuOpen(false); }}>All Articles</NavLink>
            <NavLink onClick={() => { setCurrentPage({ type: 'category', id: 'bootcamps' }); setIsMobileMenuOpen(false); }}>Bootcamps</NavLink>
            <NavLink onClick={() => { setCurrentPage({ type: 'category', id: 'online-courses' }); setIsMobileMenuOpen(false); }}>Courses</NavLink>
            <NavLink onClick={() => { setCurrentPage({ type: 'blog' }); setIsMobileMenuOpen(false); }}>Blog</NavLink>
            {isLoggedIn && (
              <NavLink onClick={() => { setCurrentPage({ type: 'admin-panel' }); setIsMobileMenuOpen(false); }} className="text-purple-600">Admin Panel</NavLink>
            )}
            {isLoggedIn ? (
              <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                      className="px-6 py-2 rounded-full text-white font-semibold tracking-wide
                                 bg-gradient-to-r from-red-600 to-red-800
                                 hover:from-red-700 hover:to-red-900
                                 shadow-lg transition duration-300 transform hover:scale-105">
                Logout
              </button>
            ) : (
              <button onClick={() => { setCurrentPage({ type: 'login' }); setIsMobileMenuOpen(false); }}
                      className="px-6 py-2 rounded-full text-white font-semibold tracking-wide
                                 bg-gradient-to-r from-blue-600 to-blue-800
                                 hover:from-blue-700 hover:to-blue-900
                                 shadow-lg transition duration-300 transform hover:scale-105">
                Login
              </button>
            )}
          </nav>
          <form onSubmit={handleSearchSubmit} className="flex px-4 mt-4">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchInputValue}
              onChange={(e) => setSearchInputValue(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition duration-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </button>
          </form>
        </div>
      )}
    </header>
  );
};

// Navigation Link Component
const NavLink = ({ children, onClick, className = '' }) => {
  const handleClick = (e) => {
    e.preventDefault(); // Prevent default anchor tag behavior
    if (onClick) {
      onClick(e); // Call the passed onClick function
    }
  };

  return (
    <a href="#" onClick={handleClick} className={`text-gray-600 hover:text-blue-700 font-medium transition duration-300 ${className}`}>
      {children}
    </a>
  );
};

// Footer Component
const Footer = ({ setCurrentPage }) => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8 mt-12 shadow-inner"> {/* Added shadow */}
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-wrap justify-center space-x-6 mb-4">
          <FooterLink onClick={() => setCurrentPage({ type: 'privacy-policy' })}>Privacy Policy</FooterLink>
          <FooterLink onClick={() => setCurrentPage({ type: 'terms-of-service' })}>Terms of Service</FooterLink>
          <FooterLink onClick={() => setCurrentPage({ type: 'about' })}>About Us</FooterLink>
          <FooterLink onClick={() => setCurrentPage({ type: 'contact' })}>Contact</FooterLink>
        </div>
        <p className="text-sm">&copy; {new Date().getFullYear()} TechPathFinder. All rights reserved.</p>
        {/* Affiliate Disclaimer */}
        <p className="text-xs text-gray-400 mt-2">
            This site contains affiliate links. We may earn a small commission from purchases made through these links, at no extra cost to you.
        </p>
      </div>
    </footer>
  );
};

// Footer Link Component
const FooterLink = ({ children, onClick }) => (
  <a href="#" onClick={onClick} className="hover:text-blue-400 transition duration-300 text-sm">
    {children}
  </a>
);

// Wide Ad Section Component
// Reklam bileşeni kaldırıldı

// Home Page Component
const HomePage = ({ setCurrentPage, isLoggedIn, userInterests }) => {
  // Filter articles based on user's interests
  const recommendedArticles = allArticlesData.filter(article =>
    userInterests.includes(article.categoryId)
  );

  return (
    <div className="flex flex-col lg:flex-row lg:space-x-8">
      {/* Left Sidebar (Yahoo-like) */}
      <div className="lg:w-1/5 bg-white p-4 rounded-xl shadow-lg mb-6 lg:mb-0"> {/* Rounded corners and shadow */}
        <h3 className="font-space-grotesk font-semibold text-lg text-gray-700 mb-4">Categories</h3>
        <ul className="space-y-2">
          <li><a href="#" onClick={() => setCurrentPage({ type: 'category', id: 'bootcamps' })} className="text-blue-600 hover:underline hover:text-blue-800 transition duration-200">Bootcamps</a></li>
          <li><a href="#" onClick={() => setCurrentPage({ type: 'category', id: 'online-courses' })} className="text-blue-600 hover:underline hover:text-blue-800 transition duration-200">Online Courses</a></li>
          <li><a href="#" onClick={() => setCurrentPage({ type: 'category', id: 'learning-paths' })} className="text-blue-600 hover:underline hover:text-blue-800 transition duration-200">Learning Paths</a></li>
          <li><a href="#" onClick={() => setCurrentPage({ type: 'category', id: 'success-stories' })} className="text-blue-600 hover:underline hover:text-blue-800 transition duration-200">Success Stories</a></li>
          <li><a href="#" onClick={() => setCurrentPage({ type: 'blog' })} className="text-blue-600 hover:underline hover:text-blue-800 transition duration-200">Blog</a></li>
          {/* Other categories can be added here */}
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="lg:w-3/5 flex-grow">
        {/* Hero Section (Mimics Yahoo's main featured news block) */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-2xl shadow-xl mb-8 text-center"> {/* Rounded corners and shadow */}
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-4 leading-tight font-space-grotesk tracking-tight"> {/* Font Space Grotesk */}
            Launch Your Tech Career: Your Software Education Guide
          </h1>
          <p className="text-lg mb-6 max-w-2xl mx-auto opacity-90"> {/* Slight opacity effect */}
            Find the best bootcamps, online courses, and learning paths to start coding.
          </p>
          <button onClick={() => setCurrentPage({ type: 'category', id: 'online-courses' })}
                  className="px-8 py-3 rounded-full text-blue-800 font-bold tracking-wide
                             bg-white hover:bg-blue-100
                             shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
            Explore Courses
          </button>
        </section>

        {/* Recommended Articles Section (PERSONALIZED) */}
        {isLoggedIn && (
          <section className="bg-white p-6 rounded-xl shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 font-space-grotesk">Recommended Articles for You</h2>
            {userInterests.length > 0 ? (
              recommendedArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recommendedArticles.slice(0, 3).map((article, index) => ( // Show first 3 recommendations
                    <ArticleCard
                      key={index}
                      {...article}
                      setCurrentPage={setCurrentPage}
                      categoryId={article.categoryId}
                      articleId={article.id}
                      affiliateUrl={article.affiliateUrl}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No articles found matching your interests. Try selecting more interests!</p>
              )
            ) : (
              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-gray-700 mb-4">Define your interests to receive personalized article recommendations.</p>
                <button
                  onClick={() => setCurrentPage({ type: 'set-interests' })}
                  className="px-6 py-2 rounded-md text-white font-semibold tracking-wide
                             bg-gradient-to-r from-blue-600 to-blue-800
                             hover:from-blue-700 hover:to-blue-900
                             shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105"
                >
                  Set My Interests
                </button>
              </div>
            )}
          </section>
        )}


        {/* Featured Section (Mimics Yahoo's smaller news card sequence) */}
        <section className="bg-white p-6 rounded-xl shadow-lg mb-8"> {/* Rounded corners and shadow */}
          <h2 className="text-2xl font-bold text-gray-800 mb-6 font-space-grotesk">Featured</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> {/* Reduced to 3 columns */}
            <ArticleCard
              setCurrentPage={setCurrentPage}
              categoryId="blog" // Example category for featured
              articleId="top-5-ai-tools-for-developers"
              title="Top 5 AI Tools for Developers"
              image="https://placehold.co/200x120/F0F0F0/333333?text=AI+Tools"
            />
            <ArticleCard
              setCurrentPage={setCurrentPage}
              categoryId="blog"
              articleId="the-future-of-low-code-no-code-platforms"
              title="Future of Remote Work in Tech"
              image="https://placehold.co/200x120/E8E8E8/333333?text=Remote+Work"
            />
            <ArticleCard
              setCurrentPage={setCurrentPage}
              categoryId="blog"
              articleId="demystifying-blockchain-for-developers"
              title="Cybersecurity Basics for Coders"
              image="https://placehold.co/200x120/E0E0E0/333333?text=Security+Tips"
            />
          </div>
        </section>

        {/* Latest Articles Section (Single Column - Mimics Yahoo's "Stories for You") */}
        <section className="bg-white p-6 rounded-xl shadow-lg mb-8"> {/* Rounded corners and shadow */}
          <h2 className="text-2xl font-bold text-gray-800 mb-6 font-space-grotesk">Latest Articles</h2>
          <div className="grid grid-cols-1 gap-6"> {/* Single column for articles */}
            <ArticleCard
              setCurrentPage={setCurrentPage}
              categoryId="online-courses"
              articleId="python-for-everybody-coursera-review"
              horizontal={true} // New prop for horizontal layout
              title="Mastering Python for Data Science"
              description="A comprehensive guide to leveraging Python for data analysis and machine learning."
              image="https://placehold.co/150x100/E0E0E0/333333?text=Python+Data" // Smaller image
              affiliateUrl={categoriesData['online-courses'].featuredCourses[0].affiliateUrl} // Passing affiliate URL
            />
            <ArticleCard
              setCurrentPage={setCurrentPage}
              categoryId="learning-paths"
              articleId="frontend-developer-roadmap"
              horizontal={true}
              title="Frontend Developer Roadmap 2024"
              description="Stay updated with the latest trends and essential skills for frontend developers."
              image="https://placehold.co/150x100/D0D0D0/333333?text=Frontend+Map"
            />
            <ArticleCard
              setCurrentPage={setCurrentPage}
              categoryId="bootcamps"
              articleId="full-stack-web-dev-bootcamp-review" // Now using a featured course
              horizontal={true}
              title="Choosing Your First Coding Bootcamp"
              description="Factors to consider when selecting a bootcamp that fits your learning style."
              image="https://placehold.co/150x100/B0B0B0/333333?text=Bootcamp+Choice"
              affiliateUrl={categoriesData['bootcamps'].featuredCourses[0].affiliateUrl} // Passing affiliate URL
            />
          </div>
        </section>

        {/* Popular Guides Section - Can remain multi-column or adjustable */}
        <section className="bg-white p-6 rounded-xl shadow-lg mb-8"> {/* Rounded corners and shadow */}
          <h2 className="text-2xl font-bold text-gray-800 mb-6 font-space-grotesk">Popular Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ArticleCard
              setCurrentPage={setCurrentPage}
              categoryId="online-courses"
              articleId="full-stack-javascript-udemy-guide"
              title="The Ultimate Guide to Learning JavaScript"
              description="Everything you need to know to master JavaScript."
              image="https://placehold.co/400x250/909090/333333?text=JavaScript+Guide"
              affiliateUrl={categoriesData['online-courses'].featuredCourses[1].affiliateUrl} // Passing affiliate URL
            />
            <ArticleCard
              setCurrentPage={setCurrentPage}
              categoryId="learning-paths"
              articleId="backend-engineer-journey"
              title="Data Structures and Algorithms for Beginners"
              description="Fundamental concepts for every aspiring software engineer."
              image="https://placehold.co/400x250/808080/333333?text=DSA+Basics"
            />
          </div>
        </section>
      </div>

      {/* Right Sidebar (Yahoo-like) */}
      <div className="lg:w-1/5 bg-white p-4 rounded-xl shadow-lg"> {/* Rounded corners and shadow */}
        {/* Email Subscription */}
        <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200 shadow-inner"> {/* Rounded corners, inner shadow and border */}
          <h3 className="font-space-grotesk font-semibold text-lg text-blue-700 mb-3">Join Our Newsletter</h3>
          <p className="text-sm text-gray-700 mb-4">Get the latest insights and course recommendations directly to your inbox!</p>
          <input
            type="email"
            placeholder="Your email address"
            className="w-full p-2 border border-gray-300 rounded-md mb-3 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {/* Newsletter Subscribe button in new style */}
          <button className="w-full px-6 py-2 rounded-md text-white font-semibold tracking-wide
                             bg-gradient-to-r from-blue-600 to-blue-800
                             hover:from-blue-700 hover:to-blue-900
                             shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

// Article Card Component - Now supports horizontal layout, dynamic routing, and affiliate links
const ArticleCard = ({ title, description, image, horizontal = false, setCurrentPage, categoryId, articleId, affiliateUrl }) => {
  const handleClick = (e) => {
    // If affiliate URL exists, open in a new tab.
    if (affiliateUrl) {
      window.open(affiliateUrl, '_blank', 'noopener noreferrer');
    } else if (categoryId && articleId) {
      setCurrentPage({ type: 'single-post', categoryId, articleId });
    } else {
      setCurrentPage({ type: 'single-post' }); // Fallback to static example if no specific ID
    }
  };

  if (horizontal) {
    return (
      <div
        className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col sm:flex-row items-stretch sm:items-center hover:shadow-lg transition-shadow duration-300 cursor-pointer" // Mobile: flex-col, sm+: flex-row
        onClick={handleClick} // Card click always triggers handleClick
      >
        <img src={image} alt={title} className="w-full sm:w-2/5 h-32 object-cover flex-shrink-0 rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none" onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/150x100/CCCCCC/333333?text=Placeholder"; }}/> {/* Image height set to h-32, width adjusted */}
        <div className="p-4 w-full sm:w-3/5 flex flex-col justify-between"> {/* Width adjusted */}
          <h3 className="text-lg font-bold text-gray-800 mb-1 font-space-grotesk">{title}</h3> {/* Smaller title for horizontal */}
          {description && <p className="text-gray-600 text-xs line-clamp-2">{description}</p>} {/* Smaller description, line-clamp for truncation */}
          <button
            onClick={(e) => { e.stopPropagation(); handleClick(e); }} // Ensure button click is separate
            className="mt-3 inline-flex items-center justify-center px-4 py-2 rounded-md text-white text-sm font-semibold tracking-wide
                       bg-gradient-to-r from-blue-500 to-blue-700
                       hover:from-blue-600 hover:to-blue-800
                       shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105"
          >
            {affiliateUrl ? "View Course" : "Read More"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={handleClick} // Card click always triggers handleClick
    >
      <img src={image} alt={title} className="w-full h-48 object-cover rounded-t-xl" onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x250/CCCCCC/333333?text=Placeholder"; }}/>
      <div className="p-4 flex flex-col justify-between h-48"> {/* Fixed height for better alignment in grid */}
        <h3 className="text-xl font-bold text-gray-800 mb-2 font-space-grotesk">{title}</h3>
        {description && <p className="text-gray-600 text-sm line-clamp-3">{description}</p>} {/* line-clamp added */}
        <button
          onClick={(e) => { e.stopPropagation(); handleClick(e); }} // Ensure button click is separate
          className="mt-3 inline-flex items-center justify-center px-4 py-2 rounded-md text-white text-sm font-semibold tracking-wide
                     bg-gradient-to-r from-blue-500 to-blue-700
                     hover:from-blue-600 hover:to-blue-800
                     shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105"
        >
          {affiliateUrl ? "View Course" : "Read More"}
        </button>
      </div>
    </div>
  );
};

// Single Post Page Component (Dynamic)
const SinglePostPage = ({ categoryId, articleId, setCurrentPage }) => {
  const categoryArticles = categoriesData[categoryId]?.articles.concat(categoriesData[categoryId]?.featuredCourses || []);
  const article = articleId ? categoryArticles?.find(art => art.id === articleId) : null;

  const [comments, setComments] = useState([]);
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentName.trim() === '' || commentText.trim() === '') {
      console.error("Please fill in both name and comment fields.");
      return;
    }
    const newComment = {
      id: comments.length + 1,
      name: commentName,
      text: commentText,
      date: new Date().toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' }),
    };
    setComments([...comments, newComment]);
    setCommentName('');
    setCommentText('');
  };

  // Related Articles Algorithm (Simple: same category, exclude current article)
  const getRelatedArticles = () => {
    if (!categoryId) return [];
    const currentCategoryArticles = categoriesData[categoryId]?.articles.concat(categoriesData[categoryId]?.featuredCourses || []);
    return currentCategoryArticles.filter(art => art.id !== articleId).slice(0, 3); // Get max 3 related articles
  };

  const relatedArticles = getRelatedArticles();

  if (!article) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-lg text-center text-red-600">
        <h1 className="text-3xl font-bold mb-4 font-space-grotesk">Article Not Found</h1>
        <p>The article you are looking for does not exist or no ID was provided.</p>
      </div>
    );
  }

  // Find the author of the article (for now, assuming John Doe is the author of all static articles)
  const articleAuthor = authorData['john-doe']; // For now, author of all articles is assumed to be John Doe

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col lg:flex-row lg:space-x-8"> {/* Rounded corners and shadow */}
      <div className="lg:w-3/4">
        {/* Article Affiliate Disclaimer */}
        {article.affiliateUrl && (
            <p className="text-sm text-gray-500 italic mb-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                This article contains an affiliate link to a recommended product/service. We may earn a small commission from purchases made through this link, at no extra cost to you.
            </p>
        )}

        <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-800 mb-4 font-space-grotesk leading-tight">{article.title}</h1> {/* Font Space Grotesk */}
        <p className="text-gray-500 text-sm mb-6">By <a href="#" onClick={() => setCurrentPage({ type: 'author-profile', id: articleAuthor.id })} className="text-blue-600 hover:underline">{articleAuthor.name}</a> | May 28, 2025 | Category: {categoriesData[categoryId]?.title || 'N/A'}</p>

        {/* AdSense In-Article Ad Placeholder */}
  

        {/* Article Content - For now using description, but in real app, this would be full HTML/Markdown content */}
        <p className="text-lg leading-relaxed mb-6 text-gray-700"> {/* Text color adjusted */}
          {article.description} This article delves into the intricacies of the topic, providing readers with a thorough understanding and practical takeaways. It explores key concepts, challenges, and solutions, making it a valuable resource for anyone looking to deepen their knowledge and apply it effectively in real-world scenarios.
          <br/><br/>
          This section can contain code snippets, images, videos, and more.
        </p>
        <h2 className="text-2xl font-bold text-gray-800 mb-4 font-space-grotesk">More Details on "{article.title}"</h2> {/* Font Space Grotesk */}
        <p className="text-base leading-relaxed mb-6 text-gray-700">
          Here you can expand on specific sub-topics related to the article. For example, if this is about Python for Data Science, you might have sections on advanced Pandas, machine learning model building, or deployment strategies.
        </p>
        <pre className="bg-gray-800 text-white p-4 rounded-xl text-sm overflow-x-auto mb-6 shadow-md"> {/* Rounded corners and shadow */}
          <code className="language-python">
{`# Sample code snippet for ${article.title}
def example_function():
    print("This is a code example related to the article.")
    return "Success!"

result = example_function()
print(result)
`}
          </code>
        </pre>
        <h3 className="text-xl font-bold text-gray-800 mb-3 mt-5 font-space-grotesk">Subtopic 1: In-Depth Look</h3> {/* Font Space Grotesk */}
        <p className="text-base leading-relaxed mb-4 text-gray-700">
          Detailed explanation of the first subtopic. This is where you will provide the core value and expertise to the reader.
        </p>
        <h3 className="text-xl font-bold text-gray-800 mb-3 mt-5 font-space-grotesk">Subtopic 2: Practical Applications</h3> {/* Font Space Grotesk */}
        <p className="text-base leading-relaxed mb-6 text-gray-700">
          Discuss real-world applications or propose a small project idea related to the theme of the article.
        </p>


        {/* AdSense In-Article Ad Placeholder */}
  

        {/* Author Bio */}
        <div className="bg-blue-50 p-6 rounded-xl shadow-inner mt-8 border border-blue-200"> {/* Rounded corners, inner shadow and border */}
          <h3 className="text-xl font-bold text-blue-700 mb-3 font-space-grotesk">About the Author</h3> {/* Font Space Grotesk */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
            <img src={articleAuthor.image} alt={articleAuthor.name} className="rounded-full w-24 h-24 object-cover shadow-md" /> {/* Size adjusted, shadow added */}
            <div className="text-center sm:text-left">
              <p className="font-semibold text-gray-800 text-lg">
                <a href="#" onClick={() => setCurrentPage({ type: 'author-profile', id: articleAuthor.id })} className="text-blue-700 hover:underline hover:text-blue-900 transition duration-200">
                  {articleAuthor.name}
                </a>
              </p>
              <p className="text-gray-600 text-sm mt-1">{articleAuthor.bio.substring(0, 150)}...</p> {/* Short bio */}
              <a href="#" onClick={() => setCurrentPage({ type: 'author-profile', id: articleAuthor.id })} className="text-blue-600 hover:underline text-xs mt-2 inline-block">
                View Full Profile
              </a>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-8 p-6 bg-gray-50 rounded-xl shadow-inner border border-gray-200"> {/* Rounded corners, inner shadow and border */}
          <h3 className="text-xl font-bold text-gray-800 mb-4 font-space-grotesk">Comments ({comments.length})</h3> {/* Font Space Grotesk */}
          {comments.length === 0 ? (
            <p className="text-gray-600 mb-4">No comments yet. Be the first to share your thoughts!</p>
          ) : (
            <div className="space-y-4 mb-6">
              {comments.map((comment) => (
                <div key={comment.id} className="border-b border-gray-200 pb-4">
                  <p className="font-semibold text-gray-800">{comment.name} <span className="text-gray-500 text-xs">- {comment.date}</span></p>
                  <p className="text-gray-700 text-sm mt-1">{comment.text}</p>
                </div>
              ))}
            </div>
          )}

          <h3 className="text-xl font-bold text-gray-800 mb-4 font-space-grotesk">Leave a Comment</h3> {/* Font Space Grotesk */}
          <form onSubmit={handleCommentSubmit} className="space-y-4">
            <div>
              <label htmlFor="commentName" className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                id="commentName"
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
                className="shadow-sm appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <label htmlFor="commentText" className="block text-gray-700 text-sm font-bold mb-2">
                Comment
              </label>
              <textarea
                id="commentText"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows="4"
                className="shadow-sm appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write your comment here..."
                required
              ></textarea>
            </div>
            {/* Submit Comment button in new style */}
            <button
              type="submit"
              className="px-6 py-2 rounded-md text-white font-semibold tracking-wide
                         bg-gradient-to-r from-blue-600 to-blue-800
                         hover:from-blue-700 hover:to-blue-900
                         shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105"
            >
              Submit Comment
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-2">
            *Comments are displayed immediately but are not saved permanently in this demo.
          </p>
        </div>
      </div>

      {/* Right Sidebar (Single Post Page) */}
      <div className="lg:w-1/4 mt-8 lg:mt-0">
        <div className="p-4 bg-white rounded-xl shadow-lg"> {/* Rounded corners and shadow */}
          <h3 className="font-space-grotesk font-semibold text-lg text-gray-700 mb-4">Related Articles</h3>
          {relatedArticles.length > 0 ? (
            <ul className="space-y-3">
              {relatedArticles.map((art, index) => (
                <li key={index}>
                  <a href="#" onClick={() => setCurrentPage({ type: 'single-post', categoryId: art.categoryId, articleId: art.id })} className="text-blue-600 hover:underline text-sm hover:text-blue-800 transition duration-200">
                    {art.title}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No related articles found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Category Page Component (Dynamic with Pagination)
const CategoryPage = ({ categoryId, setCurrentPage }) => {
  const category = categoriesData[categoryId];
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const articlesPerPage = 6; // Number of articles to show per page

  if (!category) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-lg text-center text-red-600">
        <h1 className="text-3xl font-bold mb-4 font-space-grotesk">Category Not Found</h1>
        <p>The category you are looking for does not exist.</p>
      </div>
    );
  }

  const allCategoryArticles = category.articles.concat(category.featuredCourses || []);
  const totalPages = Math.ceil(allCategoryArticles.length / articlesPerPage);
  const startIndex = (currentPageNum - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const currentArticles = allCategoryArticles.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPageNum(page);
    window.scrollTo(0, 0); // Scroll to top when page changes
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg"> {/* Rounded corners and shadow */}
      {/* Category Hero Section */}
      <section className="bg-blue-50 p-8 rounded-xl shadow-md mb-8 text-center border border-blue-200">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-blue-800 mb-4 font-space-grotesk leading-tight">
          {category.title}
        </h1>
        <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
          {category.description}
        </p>
      </section>

      <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-6 font-space-grotesk">Key Concepts</h2>
      <ul className="list-disc list-inside text-base leading-relaxed mb-6 space-y-2 pl-4"> {/* Added pl-4 for better indentation */}
        {category.keyConcepts.map((concept, index) => (
          <li key={index} className="text-gray-700">{concept}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-bold text-gray-800 mb-6 mt-6 font-space-grotesk">All Articles in {category.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {currentArticles.map((article, index) => (
          <ArticleCard key={index} {...article} setCurrentPage={setCurrentPage} categoryId={categoryId} articleId={article.id} affiliateUrl={article.affiliateUrl} />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPageNum}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      <h2 className="text-2xl font-bold text-gray-800 mb-6 mt-6 font-space-grotesk">Discover More</h2>
      <div className="grid grid-cols-1 gap-6">
        {/* More specific content or links can be added here */}
        <ArticleCard
          setCurrentPage={setCurrentPage}
          horizontal={true}
          title="General Tech Career Tips"
          description="Advice for navigating your career in technology."
          image="https://placehold.co/150x100/707070/333333?text=Career+Tips"
          categoryId="blog" // Example fallback category
          articleId="top-5-programming-languages-to-learn-in-2025" // Example fallback article
        />
      </div>

      {/* Category Page Bottom Ad Space */}
      {/* Ad Space kaldırıldı */}
    </div>
  );
};

// Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex justify-center items-center space-x-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-md
                   bg-gradient-to-r from-blue-500 to-blue-700 text-white
                   hover:from-blue-600 hover:to-blue-800
                   disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 shadow-md"
      >
        Previous
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-4 py-2 rounded-md font-semibold ${
            currentPage === number
              ? 'bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-lg' // Active button has stronger gradient and shadow
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 shadow-sm' // Inactive buttons
          } transition duration-300`}
        >
          {number}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-md
                   bg-gradient-to-r from-blue-500 to-blue-700 text-white
                   hover:from-blue-600 hover:to-blue-800
                   disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 shadow-md"
      >
        Next
      </button>
    </nav>
  );
};

// Search Results Page Component
const SearchResultsPage = ({ searchQuery, setCurrentPage }) => {
  const filteredArticles = allArticlesData.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (article.description && article.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg"> {/* Rounded corners and shadow */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6 font-space-grotesk">Search Results for "{searchQuery}"</h1>
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {filteredArticles.map((article, index) => (
            <ArticleCard
              key={index}
              {...article}
              horizontal={true}
              setCurrentPage={setCurrentPage}
              categoryId={article.categoryId}
              articleId={article.id}
              affiliateUrl={article.affiliateUrl} // Passing affiliate URL
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No articles found matching your search query.</p>
      )}
      {/* Search Results Page Ad Space */}
      {/* Ad Space kaldırıldı */}
    </div>
  );
};

// Login Page Component
const LoginPage = ({ setCurrentPage, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login Attempt:', { email, password });
    // Here, you would typically send these credentials to a backend for authentication
    // For now, we'll just simulate a successful login and redirect to home
    console.log('Login simulated! (Credentials not checked)');
    onLoginSuccess(); // Update app state
    setCurrentPage({ type: 'home' });
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-md mx-auto"> {/* Rounded corners and shadow */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center font-space-grotesk">Log In to Your Account</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="loginEmail" className="block text-gray-700 text-sm font-bold mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="loginEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow-sm appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-blue-500 focus:border-blue-500"
            placeholder="you@example.com"
            required
          />
        </div>
        <div>
          <label htmlFor="loginPassword" className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="loginPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow-sm appearance-none border rounded-md w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:ring-blue-500 focus:border-blue-500"
            placeholder="********"
            required
          />
        </div>
        {/* Login button in new style */}
        <button
          type="submit"
          className="w-full px-6 py-2 rounded-md text-white font-semibold tracking-wide
                     bg-gradient-to-r from-blue-600 to-blue-800
                     hover:from-blue-700 hover:to-blue-900
                     shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
        >
          Log In
        </button>
      </form>
      <p className="text-center text-gray-600 text-sm mt-6">
        Don't have an account?{' '}
        <a href="#" onClick={() => setCurrentPage({ type: 'register' })} className="text-blue-600 hover:underline hover:text-blue-800 transition duration-200">
          Sign up here
        </a>
      </p>
    </div>
  );
};

// Register Page Component
const RegisterPage = ({ setCurrentPage }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    console.log('Registration Attempt:', { name, email, password });
    // Here, you would typically send this data to a backend to create a new user
    // For now, we'll just simulate a successful registration and redirect to login
    console.log('Registration simulated! (User not actually created)');
    setCurrentPage({ type: 'login' });
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-md mx-auto"> {/* Rounded corners and shadow */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center font-space-grotesk">Create Your Account</h1>
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label htmlFor="registerName" className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="registerName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow-sm appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-blue-500 focus:border-blue-500"
            placeholder="John Doe"
            required
          />
        </div>
        <div>
          <label htmlFor="registerEmail" className="block text-gray-700 text-sm font-bold mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="registerEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow-sm appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-blue-500 focus:border-blue-500"
            placeholder="you@example.com"
            required
          />
        </div>
        <div>
          <label htmlFor="registerPassword" className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="registerPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow-sm appearance-none border rounded-md w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:ring-blue-500 focus:border-blue-500"
            placeholder="********"
            required
          />
        </div>
        {/* Register button in new style */}
        <button
          type="submit"
          className="w-full px-6 py-2 rounded-md text-white font-semibold tracking-wide
                     bg-gradient-to-r from-blue-600 to-blue-800
                     hover:from-blue-700 hover:to-blue-900
                     shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
        >
          Sign Up
        </button>
      </form>
      <p className="text-center text-gray-600 text-sm mt-6">
        Already have an account?{' '}
        <a href="#" onClick={() => setCurrentPage({ type: 'login' })} className="text-blue-600 hover:underline hover:text-blue-800 transition duration-200">
          Log in here
        </a>
      </p>
    </div>
  );
};

// Author Profile Page Component
const AuthorProfilePage = ({ authorId, setCurrentPage }) => {
    const author = authorData[authorId];

    if (!author) {
        return (
            <div className="bg-white p-8 rounded-lg shadow-lg text-center text-red-600">
                <h1 className="text-3xl font-bold mb-4 font-space-grotesk">Author Not Found</h1>
                <p>The author you are looking for does not exist.</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg"> {/* Rounded corners and shadow */}
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-4 mb-8">
                <img
                    src={author.image}
                    alt={author.name}
                    className="rounded-full w-32 h-32 object-cover shadow-xl flex-shrink-0 border-4 border-blue-100" // Border and stronger shadow
                />
                <div className="text-center md:text-left">
                    <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-800 mb-2 font-space-grotesk tracking-tight">{author.name}</h1>
                    <p className="text-gray-600 text-lg leading-relaxed">{author.bio}</p>
                </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-8 font-space-grotesk">{author.name}'s Articles</h2>
            {author.articles.length >  0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {author.articles.map((article, index) => (
                        <ArticleCard
                            key={index}
                            {...article}
                            setCurrentPage={setCurrentPage}
                            categoryId={article.categoryId} // Ensure categoryId is passed for dynamic linking
                            articleId={article.id}
                            affiliateUrl={article.affiliateUrl} // Passing affiliate URL
                        />
                    ))}
                </div>
            ) : (
                <p className="text-gray-600">This author has not published any articles yet.</p>
            )}
        </div>
    );
};


// About Us Page Component
const AboutPage = () => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg"> {/* Rounded corners and shadow */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6 font-space-grotesk">About TechPathFinder</h1>
      <p className="text-base leading-relaxed mb-4 text-gray-700">
        TechPathFinder is dedicated to empowering individuals to successfully transition into the dynamic world of software development. We provide comprehensive, practical, and up-to-date guides, in-depth course reviews, and inspiring success stories to assist you on your learning journey.
      </p>
      <p className="text-base leading-relaxed mb-4 text-gray-700">
        Our mission is to simplify the complexities of coding and tech careers, making quality education accessible and understandable for everyone, regardless of their background. We believe that with the right resources and guidance, anyone can build a successful career in technology.
      </p>
      <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-6 font-space-grotesk">Our Vision</h2>
      <p className="text-base leading-relaxed mb-4 text-gray-700">
        To be the world's most trusted source for aspiring software developers and career changers, providing actionable insights and fostering a community of lifelong learners.
      </p>
      <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-6 font-space-grotesk">About the Author</h2>
      <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
        <img src="https://placehold.co/120x120/E0E0E0/333333?text=Your+Photo" alt="Your Name" className="rounded-full shadow-md" /> {/* Size adjusted, shadow added */}
        <div>
          <p className="font-semibold text-gray-800 text-lg">Your Name (Software Developer)</p>
          <p className="text-gray-600 text-base">
            As an experienced software developer with X years in [specific technologies/fields, e.g., web development, data science, cloud engineering], I have witnessed firsthand the transformative power of technology education. I am passionate about sharing my knowledge and helping others unlock their potential in this exciting industry. With TechPathFinder, my goal is to provide the clear, practical guidance I wished I had when starting my own journey.
          </p>
        </div>
      </div>
    </div>
  );
};

// Contact Page Component
const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(''); // Message state

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', { name, email, message });
    // In a real application, you would send this data to a backend service
    console.log('Contact form submission simulated!');
    // Clear form fields
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto"> {/* Rounded corners and shadow */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center font-space-grotesk">Contact Us</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="contactName" className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="contactName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow-sm appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-blue-500 focus:border-blue-500"
            placeholder="Your Name"
            required
          />
        </div>
        <div>
          <label htmlFor="contactEmail" className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="contactEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow-sm appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-blue-500 focus:border-blue-500"
            placeholder="you@example.com"
            required
          />
        </div>
        <div>
          <label htmlFor="contactMessage" className="block text-gray-700 text-sm font-bold mb-2">
            Message
          </label>
          <textarea
            id="contactMessage"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="4"
            className="shadow-sm appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-blue-500 focus:border-blue-500"
            placeholder="Your message..."
            required
          ></textarea>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="px-8 py-3 rounded-md text-white font-semibold tracking-wide
                       bg-gradient-to-r from-blue-600 to-blue-800
                       hover:from-blue-700 hover:to-blue-900
                       shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
};

// Privacy Policy Page Component (Simple Example)
const PrivacyPolicyPage = () => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg"> {/* Rounded corners and shadow */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6 font-space-grotesk">Privacy Policy</h1>
      <p className="text-base leading-relaxed mb-4 text-gray-700">
        At TechPathFinder, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains the types of information that is collected and recorded by TechPathFinder and how we use it.
      </p>
      <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-6 font-space-grotesk">Log Files</h2>
      <p className="text-base leading-relaxed mb-4 text-gray-700">
        TechPathFinder follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this as part of their analytics services. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any personally identifiable information. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
      </p>
      <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-6 font-space-grotesk">Google AdSense and Cookies</h2>
      <p className="text-base leading-relaxed mb-4 text-gray-700">
        Google is one of the third-party vendors on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.techpathfinder.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://policies.google.com/technologies/ads</a>.
      </p>
      <p className="text-base leading-relaxed mb-4 text-gray-700">
        Some of our advertising partners may use cookies and web beacons on our site. Each of our advertising partners has their own Privacy Policy for their user data.
      </p>
      <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-6 font-space-grotesk">Consent</h2>
      <p className="text-base leading-relaxed mb-4 text-gray-700">
        By using our website, you hereby consent to our Privacy Policy and agree to its terms and conditions.
      </p>
    </div>
  );
};

// Terms of Service Page Component (Simple Example)
const TermsOfServicePage = () => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg"> {/* Rounded corners and shadow */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6 font-space-grotesk">Terms of Service</h1>
      <p className="text-base leading-relaxed mb-4 text-gray-700">
        Welcome to TechPathFinder! These terms and conditions outline the rules and regulations for the use of the TechPathFinder Website, located at www.techpathfinder.com.
      </p>
      <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-6 font-space-grotesk">Intellectual Property Rights</h2>
      <p className="text-base leading-relaxed mb-4 text-gray-700">
        Unless otherwise stated, TechPathFinder and/or its licensors own the intellectual property rights for all material on this Website. All intellectual property rights are reserved. You may access this from TechPathFinder for your own personal use subjected to restrictions set in these terms and conditions.
      </p>
      <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-6 font-space-grotesk">Restrictions</h2>
      <p className="text-base leading-relaxed mb-4 text-gray-700">
        You are specifically restricted from all of the following:
      </p>
      <ul className="list-disc list-inside text-base leading-relaxed mb-4 space-y-2">
        <li>Publishing any Website material in any other media;</li>
        <li>Selling, sublicensing and/or otherwise commercializing any Website material;</li>
        <li>Publicly performing and/or showing any Website material;</li>
        <li>Using this Website in any way that may damage or impair the Website;</li>
        <li>Using this Website in any way that impacts user access to this Website;</li>
        <li>Using this Website contrary to applicable laws and regulations, or in a way that causes, or may cause, harm to the Website, or to any person or business entity;</li>
        <li>Engaging in any data mining, data harvesting, data extracting or any other similar activity in relation to this Website;</li>
        <li>Using this Website to engage in any advertising or marketing.</li>
      </ul>
      <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-6 font-space-grotesk">Limitation of Liability</h2>
      <p className="text-base leading-relaxed mb-4 text-gray-700">
        The information contained in this website is for general information purposes only. The information is provided by TechPathFinder and while we endeavor to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk.
      </p>
    </div>
  );
};

// New Interests Selection Page Component
const SetInterestsPage = ({ setCurrentPage, userInterests, onSetInterests }) => {
  const [selectedCategories, setSelectedCategories] = useState(userInterests);

  const handleCheckboxChange = (categoryId) => {
    setSelectedCategories(prevSelected =>
      prevSelected.includes(categoryId)
        ? prevSelected.filter(id => id !== categoryId)
        : [...prevSelected, categoryId]
    );
  };

  const handleSaveInterests = () => {
    onSetInterests(selectedCategories);
    setCurrentPage({ type: 'home' });
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 font-space-grotesk text-center">Set Your Interests</h1>
      <p className="text-center text-gray-600 mb-8">Select the categories you are interested in to receive personalized article recommendations.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {Object.keys(categoriesData).map(categoryId => (
          <div key={categoryId} className="flex items-center p-3 bg-gray-50 rounded-md border border-gray-200">
            <input
              type="checkbox"
              id={categoryId}
              checked={selectedCategories.includes(categoryId)}
              onChange={() => handleCheckboxChange(categoryId)}
              className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
            />
            <label htmlFor={categoryId} className="ml-3 text-lg text-gray-700 font-medium">
              {categoriesData[categoryId].title}
            </label>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={handleSaveInterests}
          className="px-8 py-3 rounded-md text-white font-semibold tracking-wide
                     bg-gradient-to-r from-blue-600 to-blue-800
                     hover:from-blue-700 hover:to-blue-900
                     shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
        >
          Save My Interests
        </button>
      </div>
    </div>
  );
};

// Confirmation Modal Component
const ConfirmationModal = ({ show, title, message, onConfirm, onCancel }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm transform transition-all scale-100 opacity-100">
        <h3 className="text-xl font-bold text-gray-800 mb-4 font-space-grotesk">{title}</h3>
        <p className="text-gray-700 mb-6">{message}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-5 py-2 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 transition duration-300 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 transition duration-300 font-medium shadow-md"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

// Article Form Modal Component
const ArticleFormModal = ({ show, onClose, onSave, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [image, setImage] = useState(initialData?.image || '');
  const [categoryId, setCategoryId] = useState(initialData?.categoryId || Object.keys(categoriesData)[0]);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setImage(initialData.image);
      setCategoryId(initialData.categoryId);
    } else {
      setTitle('');
      setDescription('');
      setImage('');
      setCategoryId(Object.keys(categoriesData)[0]);
    }
  }, [initialData, show]);

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !image || !categoryId) {
      alert('Please fill in all fields.'); // Custom modal can be used
      return;
    }
    onSave({
      ...initialData,
      title,
      description,
      image,
      categoryId,
    });
    onClose(); // Close modal after saving
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg transform transition-all scale-100 opacity-100">
        <h3 className="text-xl font-bold text-gray-800 mb-4 font-space-grotesk">{initialData ? 'Edit Article' : 'Add New Article'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="articleTitle" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
            <input
              type="text"
              id="articleTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="shadow-sm border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="articleDescription" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
            <textarea
              id="articleDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              className="shadow-sm border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="articleImage" className="block text-gray-700 text-sm font-bold mb-2">Image URL</label>
            <input
              type="url"
              id="articleImage"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="shadow-sm border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="articleCategory" className="block text-gray-700 text-sm font-bold mb-2">Category</label>
            <select
              id="articleCategory"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="shadow-sm border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
              {Object.keys(categoriesData).map(catId => (
                <option key={catId} value={catId}>{categoriesData[catId].title}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 transition duration-300 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition duration-300 font-medium shadow-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// User Form Modal Component
const UserFormModal = ({ show, onClose, onSave, initialData }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [email, setEmail] = useState(initialData?.email || '');
  const [role, setRole] = useState(initialData?.role || 'user'); // Default role

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setEmail(initialData.email);
      setRole(initialData.role);
    } else {
      setName('');
      setEmail('');
      setRole('user');
    }
  }, [initialData, show]);

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !role) {
      alert('Please fill in all fields.'); // Custom modal can be used
      return;
    }
    onSave({
      ...initialData,
      name,
      email,
      role,
    });
    onClose(); // Close modal after saving
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm transform transition-all scale-100 opacity-100">
        <h3 className="text-xl font-bold text-gray-800 mb-4 font-space-grotesk">{initialData ? 'Edit User' : 'Add New User'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="userName" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
            <input
              type="text"
              id="userName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow-sm border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="userEmail" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              id="userEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow-sm border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="userRole" className="block text-gray-700 text-sm font-bold mb-2">Role</label>
            <select
              id="userRole"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="shadow-sm border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 transition duration-300 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition duration-300 font-medium shadow-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Category Form Modal Component
const CategoryFormModal = ({ show, onClose, onSave, initialData }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description);
    } else {
      setName('');
      setDescription('');
    }
  }, [initialData, show]);

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description) {
      alert('Please fill in all fields.'); // Custom modal can be used
      return;
    }
    onSave({
      ...initialData,
      name,
      description,
    });
    onClose(); // Close modal after saving
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm transform transition-all scale-100 opacity-100">
        <h3 className="text-xl font-bold text-gray-800 mb-4 font-space-grotesk">{initialData ? 'Edit Category' : 'Add New Category'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="categoryName" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
            <input
              type="text"
              id="categoryName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow-sm border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="categoryDescription" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
            <textarea
              id="categoryDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              className="shadow-sm border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            ></textarea>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 transition duration-300 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition duration-300 font-medium shadow-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Ad Form Modal Component
const AdFormModal = ({ show, onClose, onSave, initialData }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [active, setActive] = useState(initialData?.active || true);
  const [earnings, setEarnings] = useState(initialData?.earnings || 0);
  const [clicks, setClicks] = useState(initialData?.clicks || 0);


  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setContent(initialData.content);
      setActive(initialData.active);
      setEarnings(initialData.earnings);
      setClicks(initialData.clicks);
    } else {
      setName('');
      setContent('');
      setActive(true);
      setEarnings(0);
      setClicks(0);
    }
  }, [initialData, show]);

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !content) {
      alert('Please fill in all fields.'); // Custom modal can be used
      return;
    }
    onSave({
      ...initialData,
      name,
      content,
      active,
      earnings: parseFloat(earnings), // Save as numeric value
      clicks: parseInt(clicks, 10),    // Save as numeric value
    });
    onClose(); // Close modal after saving
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm transform transition-all scale-100 opacity-100">
        <h3 className="text-xl font-bold text-gray-800 mb-4 font-space-grotesk">{initialData ? 'Edit Ad' : 'Add New Ad'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="adName" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
            <input
              type="text"
              id="adName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow-sm border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="adContent" className="block text-gray-700 text-sm font-bold mb-2">Content</label>
            <textarea
              id="adContent"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="3"
              className="shadow-sm border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="adEarnings" className="block text-gray-700 text-sm font-bold mb-2">Earnings ($)</label>
            <input
              type="number"
              id="adEarnings"
              step="0.01"
              value={earnings}
              onChange={(e) => setEarnings(e.target.value)}
              className="shadow-sm border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="adClicks" className="block text-gray-700 text-sm font-bold mb-2">Clicks</label>
            <input
              type="number"
              id="adClicks"
              value={clicks}
              onChange={(e) => setClicks(e.target.value)}
              className="shadow-sm border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="adActive"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
              className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
            />
            <label htmlFor="adActive" className="ml-2 text-gray-700 text-sm font-bold">Active</label>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 transition duration-300 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition duration-300 font-medium shadow-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


// Admin Panel Component
const AdminPanelPage = ({ setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState('articles'); // 'articles', 'users', 'categories', 'ads'

  // Dummy data for admin panel (will reset on refresh)
  const [articles, setArticles] = useState(allArticlesData); // Use allArticlesData as initial dummy data
  const [users, setUsers] = useState([
    { id: 'user1', name: 'Alice Smith', email: 'alice@example.com', role: 'user' },
    { id: 'user2', name: 'Bob Johnson', email: 'bob@example.com', role: 'user' },
    { id: 'admin1', name: 'Admin User', email: 'admin@example.com', role: 'admin' },
  ]);
  const [categories, setCategories] = useState(Object.values(categoriesData).map(cat => ({ id: cat.title.toLowerCase().replace(/\s/g, '-'), name: cat.title, description: cat.description })));
  const [ads, setAds] = useState([
    { id: 'ad1', name: 'Homepage Top Ad', content: 'Ana Sayfa Üst Reklam Alanı', active: true, earnings: 120.50, clicks: 500 },
    { id: 'ad2', name: 'Article In-feed Ad', content: 'Makale İçi Reklam Alanı', active: true, earnings: 75.20, clicks: 300 },
    { id: 'ad3', name: 'Sidebar Ad', content: 'Kenar Çubuğu Reklam Alanı', active: true, earnings: 200.00, clicks: 800 },
  ]);

  // Modal State Management
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmCallback, setConfirmCallback] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState('');
  const [confirmTitle, setConfirmTitle] = useState('');

  const [showArticleModal, setShowArticleModal] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);

  const [showUserModal, setShowUserModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);

  const [showAdModal, setShowAdModal] = useState(false);
  const [currentAd, setCurrentAd] = useState(null);


  // General Confirmation Handler
  const openConfirmModal = (message, callback, title = "Confirmation Required") => {
    setConfirmMessage(message);
    setConfirmTitle(title);
    setConfirmCallback(() => callback);
    setShowConfirmModal(true);
  };

  const handleConfirmAction = () => {
    if (confirmCallback) {
      confirmCallback();
    }
    setShowConfirmModal(false);
    setConfirmCallback(null);
  };

  const handleCancelConfirm = () => {
    setShowConfirmModal(false);
    setConfirmCallback(null);
  };


  // Article Management Handlers
  const handleAddArticleClick = () => {
    setCurrentArticle(null);
    setShowArticleModal(true);
  };

  const handleEditArticleClick = (article) => {
    setCurrentArticle(article);
    setShowArticleModal(true);
  };

  const handleSaveArticle = (newArticleData) => {
    if (newArticleData.id) { // Editing an existing article
      setArticles(articles.map(art => art.id === newArticleData.id ? newArticleData : art));
    } else { // Adding new
      setArticles([...articles, { ...newArticleData, id: `article-${Date.now()}` }]);
    }
    setShowArticleModal(false);
  };

  const handleDeleteArticle = (id) => {
    openConfirmModal(
      'Are you sure you want to delete this article?',
      () => {
        setArticles(articles.filter(art => art.id !== id));
        console.log('Article Deleted:', id);
      }
    );
  };

  // User Management Handlers
  const handleAddUserClick = () => {
    setCurrentUser(null);
    setShowUserModal(true);
  };

  const handleEditUserClick = (user) => {
    setCurrentUser(user);
    setShowUserModal(true);
  };

  const handleSaveUser = (newUserData) => {
    if (newUserData.id) { // Editing an existing user
      setUsers(users.map(user => user.id === newUserData.id ? newUserData : user));
    } else { // Adding new
      setUsers([...users, { ...newUserData, id: `user-${Date.now()}` }]);
    }
    setShowUserModal(false);
  };

  const handleDeleteUser = (id) => {
    openConfirmModal(
      'Are you sure you want to delete this user?',
      () => {
        setUsers(users.filter(user => user.id !== id));
        console.log('User Deleted:', id);
      }
    );
  };

  // Category Management Handlers
  const handleAddCategoryClick = () => {
    setCurrentCategory(null);
    setShowCategoryModal(true);
  };

  const handleEditCategoryClick = (category) => {
    setCurrentCategory(category);
    setShowCategoryModal(true);
  };

  const handleSaveCategory = (newCategoryData) => {
    if (newCategoryData.id) { // Editing an existing category
      setCategories(categories.map(cat => cat.id === newCategoryData.id ? { ...cat, name: newCategoryData.name, description: newCategoryData.description } : cat));
    } else { // Adding new
      setCategories([...categories, { ...newCategoryData, id: `category-${Date.now()}` }]);
    }
    setShowCategoryModal(false);
  };

  const handleDeleteCategory = (id) => {
    openConfirmModal(
      'Are you sure you want to delete this category?',
      () => {
        setCategories(categories.filter(cat => cat.id !== id));
        console.log('Category Deleted:', id);
      }
    );
  };

  // Ad Management Handlers
  const handleAddAdClick = () => {
    setCurrentAd(null);
    setShowAdModal(true);
  };

  const handleEditAdClick = (ad) => {
    setCurrentAd(ad);
    setShowAdModal(true);
  };

  const handleSaveAd = (newAdData) => {
    if (newAdData.id) { // Editing an existing ad
      setAds(ads.map(ad => ad.id === newAdData.id ? newAdData : ad));
    } else { // Adding new
      setAds([...ads, { ...newAdData, id: `ad-${Date.now()}` }]);
    }
    setShowAdModal(false);
  };

  const handleDeleteAd = (id) => {
    openConfirmModal(
      'Are you sure you want to delete this ad?',
      () => {
        setAds(ads.filter(ad => ad.id !== id));
        console.log('Ad Deleted:', id);
      }
    );
  };

  const handleIncrementClicks = (id) => {
    setAds(ads.map(ad => ad.id === id ? { ...ad, clicks: ad.clicks + 1 } : ad));
  };

  const handleIncrementEarnings = (id) => {
    setAds(ads.map(ad => ad.id === id ? { ...ad, earnings: parseFloat((ad.earnings + 0.10).toFixed(2)) } : ad)); // Simulate 0.10 increase
  };


  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 font-space-grotesk">Admin Panel</h1>
      <p className="text-red-600 text-sm mb-4">
        **WARNING:** Changes in this panel are for demo purposes only and will reset on page refresh. A real application would require database integration.
      </p>

      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('articles')}
          className={`py-2 px-4 text-lg font-medium ${activeTab === 'articles' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
        >
          Articles
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`py-2 px-4 text-lg font-medium ${activeTab === 'users' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
        >
          Users
        </button>
        <button
          onClick={() => setActiveTab('categories')}
          className={`py-2 px-4 text-lg font-medium ${activeTab === 'categories' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
        >
          Categories
        </button>
        <button
          onClick={() => setActiveTab('ads')}
          className={`py-2 px-4 text-lg font-medium ${activeTab === 'ads' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
        >
          Ads
        </button>
      </div>

      {activeTab === 'articles' && (
        <div className="admin-section">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 font-space-grotesk">Article Management</h2>
          <button
            onClick={handleAddArticleClick}
            className="mb-4 px-4 py-2 rounded-md text-white bg-green-600 hover:bg-green-700 transition duration-300 shadow-md"
          >
            Add New Article
          </button>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-md">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">ID</th>
                  <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Title</th>
                  <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Description</th>
                  <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Image URL</th>
                  <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Category</th>
                  <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <tr key={article.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4 text-sm text-gray-700">{article.id}</td>
                    <td className="py-2 px-4 text-sm text-gray-700">{article.title}</td>
                    <td className="py-2 px-4 text-sm text-gray-700 max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">{article.description}</td>
                    <td className="py-2 px-4 text-sm text-gray-700 max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">{article.image}</td>
                    <td className="py-2 px-4 text-sm text-gray-700">{categoriesData[article.categoryId]?.title || 'N/A'}</td>
                    <td className="py-2 px-4 text-sm">
                      <button
                        onClick={() => handleEditArticleClick(article)}
                        className="mr-2 px-3 py-1 rounded-md text-white bg-blue-500 hover:bg-blue-600 transition duration-300 text-xs"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteArticle(article.id)}
                        className="px-3 py-1 rounded-md text-white bg-red-500 hover:bg-red-600 transition duration-300 text-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ArticleFormModal
            show={showArticleModal}
            onClose={() => setShowArticleModal(false)}
            onSave={handleSaveArticle}
            initialData={currentArticle}
          />
        </div>
      )}

      {activeTab === 'users' && (
        <div className="admin-section">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 font-space-grotesk">User Management</h2>
          <button
            onClick={handleAddUserClick}
            className="mb-4 px-4 py-2 rounded-md text-white bg-green-600 hover:bg-green-700 transition duration-300 shadow-md"
          >
            Add New User
          </button>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-md">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">ID</th>
                  <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Name</th>
                  <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Email</th>
                  <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Role</th>
                  <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4 text-sm text-gray-700">{user.id}</td>
                    <td className="py-2 px-4 text-sm text-gray-700">{user.name}</td>
                    <td className="py-2 px-4 text-sm text-gray-700">{user.email}</td>
                    <td className="py-2 px-4 text-sm text-gray-700">{user.role}</td>
                    <td className="py-2 px-4 text-sm">
                      <button
                        onClick={() => handleEditUserClick(user)}
                        className="mr-2 px-3 py-1 rounded-md text-white bg-blue-500 hover:bg-blue-600 transition duration-300 text-xs"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="px-3 py-1 rounded-md text-white bg-red-500 hover:bg-red-600 transition duration-300 text-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <UserFormModal
            show={showUserModal}
            onClose={() => setShowUserModal(false)}
            onSave={handleSaveUser}
            initialData={currentUser}
          />
        </div>
      )}

      {activeTab === 'categories' && (
        <div className="admin-section">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 font-space-grotesk">Category Management</h2>
          <button
            onClick={handleAddCategoryClick}
            className="mb-4 px-4 py-2 rounded-md text-white bg-green-600 hover:bg-green-700 transition duration-300 shadow-md"
          >
            Add New Category
          </button>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-md">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">ID</th>
                  <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Name</th>
                  <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Description</th>
                  <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4 text-sm text-gray-700">{category.id}</td>
                    <td className="py-2 px-4 text-sm text-gray-700">{category.name}</td>
                    <td className="py-2 px-4 text-sm text-gray-700 max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">{category.description}</td>
                    <td className="py-2 px-4 text-sm">
                      <button
                        onClick={() => handleEditCategoryClick(category)}
                        className="mr-2 px-3 py-1 rounded-md text-white bg-blue-500 hover:bg-blue-600 transition duration-300 text-xs"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
                        className="px-3 py-1 rounded-md text-white bg-red-500 hover:bg-red-600 transition duration-300 text-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <CategoryFormModal
            show={showCategoryModal}
            onClose={() => setShowCategoryModal(false)}
            onSave={handleSaveCategory}
            initialData={currentCategory}
          />
        </div>
      )}

      {activeTab === 'ads' && (
        <div className="admin-section">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 font-space-grotesk">Ad Management</h2>
          <button
            onClick={handleAddAdClick}
            className="mb-4 px-4 py-2 rounded-md text-white bg-green-600 hover:bg-green-700 transition duration-300 shadow-md"
          >
            Add New Ad
          </button>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-md">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">ID</th>
                  <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Name</th>
                  <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Content</th>
                  <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Status</th>
                  <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Clicks</th>
                  <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Earnings ($)</th>
                  <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {ads.map((ad) => (
                  <tr key={ad.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4 text-sm text-gray-700">{ad.id}</td>
                    <td className="py-2 px-4 text-sm text-gray-700">{ad.name}</td>
                    <td className="py-2 px-4 text-sm text-gray-700 max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">{ad.content}</td>
                    <td className="py-2 px-4 text-sm text-gray-700">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${ad.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {ad.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-2 px-4 text-sm text-gray-700">
                      {ad.clicks}
                      <button onClick={() => handleIncrementClicks(ad.id)} className="ml-2 px-2 py-0.5 rounded-md text-white bg-blue-400 hover:bg-blue-500 text-xs leading-none">+</button>
                    </td>
                    <td className="py-2 px-4 text-sm text-gray-700">
                      ${ad.earnings.toFixed(2)}
                      <button onClick={() => handleIncrementEarnings(ad.id)} className="ml-2 px-2 py-0.5 rounded-md text-white bg-green-400 hover:bg-green-500 text-xs leading-none">+</button>
                    </td>
                    <td className="py-2 px-4 text-sm">
                      <button
                        onClick={() => handleEditAdClick(ad)}
                        className="mr-2 px-3 py-1 rounded-md text-white bg-blue-500 hover:bg-blue-600 transition duration-300 text-xs"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteAd(ad.id)}
                        className="px-3 py-1 rounded-md text-white bg-red-500 hover:bg-red-600 transition duration-300 text-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <AdFormModal
            show={showAdModal}
            onClose={() => setShowAdModal(false)}
            onSave={handleSaveAd}
            initialData={currentAd}
          />
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        show={showConfirmModal}
        title={confirmTitle}
        message={confirmMessage}
        onConfirm={handleConfirmAction}
        onCancel={handleCancelConfirm}
      />
    </div>
  );
};

// All Articles Page Component (Newly added)
const ArticleListPage = ({ articles, setCurrentPage }) => {
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const articlesPerPage = 9; // Number of articles to show per page

  const totalPages = Math.ceil(articles.length / articlesPerPage);
  const startIndex = (currentPageNum - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const currentArticles = articles.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPageNum(page);
    window.scrollTo(0, 0); // Scroll to top when page changes
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 font-space-grotesk text-center">All Articles</h1>

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentArticles.map((article, index) => (
            <ArticleCard
              key={index}
              {...article}
              setCurrentPage={setCurrentPage}
              categoryId={article.categoryId}
              articleId={article.id}
              affiliateUrl={article.affiliateUrl}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center">No articles found yet.</p>
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPageNum}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

// Adding the new article to the allArticlesData array
allArticlesData.push({
  id: "ai-transforming-data-center-energy", // Unique ID for the article
  title: "AI is Transforming Data Center Energy Consumption: New Generation Smart Cooling Systems Undergo Global Tests",
  description: "As global digitalization continues its unceasing pace, data center energy consumption is becoming an increasingly critical issue in terms of environmental sustainability and operational costs. The cooling of these centers, in particular, constitutes a significant portion of their total energy expenditure. However, recent developments indicate that artificial intelligence (AI) is offering revolutionary solutions in this domain. Pilot projects and large-scale tests conducted over the past few years have demonstrated that AI-powered smart cooling systems can dramatically reduce the energy footprint of data centers. Unlike traditional fixed-setting cooling solutions, these next-generation systems utilize machine learning algorithms to analyze real-time data, including server load, internal/external temperatures, humidity, and even energy prices. Based on this analysis, AI precisely predicts the data center's optimal cooling needs and dynamically adjusts cooling systems. Industry analysts predict that AI-based smart cooling systems will become a standard component of data centers within the next 5 years.",
  image: "https://example.com/ai-data-center-cooling.jpg", // Replace with actual image URL
  categoryId: "technology" // Assuming "technology" is a valid category ID
});

export default App;
