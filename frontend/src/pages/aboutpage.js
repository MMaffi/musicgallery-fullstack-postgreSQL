import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import '../styles/style.css';

function AboutPage() {
  const { t } = useTranslation();

  return (
    <main className="sobre" style={{ flex: 1, padding: '20px' }}>
      <h2>{t('about.title')}</h2>

      <p>
        <Trans i18nKey="about.p1" components={{
          bold1: <strong />,
          bold2: <strong />,
          bold3: <strong />
        }} />
      </p>

      <p>
        <Trans i18nKey="about.p2" components={{ italic: <em /> }} />
      </p>

      <p>
        <Trans i18nKey="about.p3" components={{
          bold1: <strong />,
          italic2: <em />
        }} />
      </p>

      <p>{t('about.p4')}</p>
      <p>{t('about.p5')}</p>
    </main>
  );
}

export default AboutPage;