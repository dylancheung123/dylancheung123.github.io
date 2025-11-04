import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import './styles.css';
import faviconUrl from './favicon.svg';

// Set favicon programmatically
const setFavicon = () => {
  let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.getElementsByTagName('head')[0].appendChild(link);
  }
  link.href = faviconUrl;
};

setFavicon();

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root container not found');
}

const root = createRoot(container);
root.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  </HashRouter>
);

