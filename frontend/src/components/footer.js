import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/style.css';

function Footer() {
  const { t } = useTranslation();

  return (
    <footer>
      <div className="social-media">
        <a href="https://www.instagram.com/mateus_maffi" target="_blank" rel="noopener noreferrer" className="instagram" title="Instagram">
          <img src="/assets/icons/instagram.svg" alt="Instagram" />
        </a>
        <a href="https://www.youtube.com/@MateusMaffi" target="_blank" rel="noopener noreferrer" className="youtube" title="YouTube">
          <img src="/assets/icons/youtube.svg" alt="YouTube" />
        </a>
        <a href="https://github.com/MMaffi" target="_blank" rel="noopener noreferrer" className="github" title="GitHub">
          <img src="/assets/icons/github.svg" alt="GitHub" />
        </a>
        <a href="https://mmaffi.github.io" target="_blank" rel="noopener noreferrer" className="portfolio" title="Portfólio">
          <img src="/assets/icons/portfolio.svg" alt="Portfólio" />
        </a>
        <a href="mailto:mm.maffi@outlook.com" className="email" title="E-mail">
          <img src="/assets/icons/email.svg" alt="E-mail" />
        </a>
      </div>
      <p className="copyright">
        &copy; 2025 Music Gallery - {t('footer.copyright')}
      </p>
    </footer>
  );
}

export default Footer;