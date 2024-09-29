import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { PoemGPT } from './pages/poemgpt';
import { LoveOracle } from './pages/loveoracle';

function App() {
  return (
    <>
      <Helmet>
        {/* General SEO */}
        <title>ValentineGPT: Your AI Cupid</title>
        <meta name="description" content="ValentineGPT: An AI-powered Valentine poem generator and Love Oracle." />
        
        {/* OpenGraph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://valentinegpt.netlify.app/" />
        <meta property="og:title" content="ValentineGPT: Your AI Cupid" />
        <meta property="og:description" content="Generate Valentine poems with our AI-powered Love Oracle." />
        <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/portfolio-site-b3999.appspot.com/o/ValentineGPT%20(1).PNG?alt=media&token=045d2733-2f49-4076-8a10-226024f4a7ac" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://valentinegpt.netlify.app/" />
        <meta property="twitter:title" content="ValentineGPT: Your AI Cupid" />
        <meta property="twitter:description" content="Generate Valentine poems with our AI-powered Love Oracle." />
        <meta property="twitter:image" content="https://firebasestorage.googleapis.com/v0/b/portfolio-site-b3999.appspot.com/o/ValentineGPT%20(1).PNG?alt=media&token=045d2733-2f49-4076-8a10-226024f4a7ac" />

        {/* WhatsApp */}
        <meta property="og:site_name" content="ValentineGPT" />
        <meta property="og:locale" content="en_US" />

        {/* Additional SEO */}
        <meta name="keywords" content="ValentineGPT, AI, ChatGPT, Valentine's Day, poem generator, love oracle, gift ideas" />
        <meta name="author" content="Your Name" />
        <link rel="canonical" href="https://valentinegpt.netlify.app/" />
      </Helmet>

      <Routes>
        <Route path="/" element={<LoveOracle/>}/>
        <Route path="/poem-gpt" element={<PoemGPT/>}/>
      </Routes>
    </>
  );
}

export default App;