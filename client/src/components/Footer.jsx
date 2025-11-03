function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-ink/5 bg-paper">
      <div className="max-w-7xl mx-auto text-center">
        <p className="font-serif text-base md:text-lg text-ink-secondary mb-4 italic">
          "The past is but a dream, and the future merely a vision."
        </p>
        <p className="font-sans text-sm text-ink-secondary mb-4">
          Dear Future is a quiet place for reflection.
        </p>
        <div className="flex items-center justify-center gap-6 font-sans text-xs text-ink-secondary">
          <a href="#faq" className="hover:text-ink transition-colors duration-300">
            FAQ
          </a>
          <span>|</span>
          <a href="#privacy" className="hover:text-ink transition-colors duration-300">
            Privacy
          </a>
          <span>|</span>
          <a href="#philosophy" className="hover:text-ink transition-colors duration-300">
            Our Philosophy
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
