import { useState, useEffect, useCallback } from 'react';

function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showButton, setShowButton] = useState(false);

  // Stable handler using useCallback - friendly to React Compiler
  const handleBeforeInstallPrompt = useCallback((e) => {
    // Prevent the default mini-infobar
    e.preventDefault();
    setDeferredPrompt(e);
    setShowButton(true);
  }, []);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, [handleBeforeInstallPrompt]);

  // Stable install handler
  const handleInstall = useCallback(async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;
    console.log('User install prompt outcome:', outcome);

    // Clean up
    setDeferredPrompt(null);
    setShowButton(false);
  }, [deferredPrompt]);

  // Don't render anything if we shouldn't show the button
  if (!showButton) {
    return null;
  }

  return (
    <button
      onClick={handleInstall}
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        backgroundColor: '#1f2937',
        color: 'white',
        border: 'none',
        padding: '14px 24px',
        borderRadius: '9999px',
        fontSize: '16px',
        fontWeight: '500',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
        cursor: 'pointer',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      📱 Install BookShelf App
    </button>
  );
}

export default InstallPrompt;