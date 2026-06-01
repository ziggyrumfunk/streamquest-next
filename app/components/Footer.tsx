import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-24 py-12">
      <div className="shell grid gap-8 md:grid-cols-4 text-sm">
        <div>
          <div className="text-lime font-bold tracking-widest text-base mb-3">
            STREAMQUEST
          </div>
          <p className="text-white/70 leading-relaxed">
            Paid, quest-based Twitch streamer campaigns for indie and AA games.
          </p>
        </div>

        <div>
          <div className="text-white/95 font-bold mb-3 tracking-wide">For Creators</div>
          <ul className="space-y-2 text-white/70">
            <li><Link href="/streamers" className="hover:text-lime">Streamers</Link></li>
            <li><Link href="/quests-guide" className="hover:text-lime">Quests Guide</Link></li>
            <li><Link href="/testimonials" className="hover:text-lime">Testimonials</Link></li>
            <li><Link href="/news" className="hover:text-lime">News</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-white/95 font-bold mb-3 tracking-wide">For Studios</div>
          <ul className="space-y-2 text-white/70">
            <li><Link href="/brands" className="hover:text-lime">Brands</Link></li>
            <li><Link href="/case-studies" className="hover:text-lime">Case Studies</Link></li>
            <li><Link href="/pitch" className="hover:text-lime">For partners</Link></li>
            <li><Link href="/faq" className="hover:text-lime">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-white/95 font-bold mb-3 tracking-wide">Legal</div>
          <ul className="space-y-2 text-white/70">
            <li><Link href="/privacy-policy" className="hover:text-lime">Privacy Policy</Link></li>
            <li><Link href="/terms-and-conditions" className="hover:text-lime">Terms &amp; Conditions</Link></li>
          </ul>
        </div>
      </div>

      <div className="shell mt-10 pt-6 border-t border-white/5 flex flex-wrap items-center justify-center gap-4">
        <a
          href="https://www.linkedin.com/company/streamquestio"
          target="_blank"
          rel="noopener"
          aria-label="StreamQuest on LinkedIn"
          className="footer-social"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
            <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM8.34 18H5.67V9.67h2.67V18zM7 8.5a1.54 1.54 0 1 1 0-3.08 1.54 1.54 0 0 1 0 3.08zM18.34 18h-2.67v-4.06c0-.97-.02-2.22-1.35-2.22-1.35 0-1.56 1.06-1.56 2.15V18h-2.67V9.67h2.56v1.14h.04c.36-.68 1.23-1.4 2.54-1.4 2.72 0 3.22 1.79 3.22 4.12V18z"/>
          </svg>
          <span className="sr-only">LinkedIn</span>
        </a>
        <a
          href="https://www.instagram.com/streamquest.io/"
          target="_blank"
          rel="noopener"
          aria-label="StreamQuest on Instagram"
          className="footer-social"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
            <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.86 5.86 0 0 0-2.13 1.38A5.86 5.86 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.74 1.46 1.38 2.13a5.86 5.86 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.86 5.86 0 0 0 2.13-1.38 5.86 5.86 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.86 5.86 0 0 0-1.38-2.13A5.86 5.86 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/>
          </svg>
          <span className="sr-only">Instagram</span>
        </a>
        <a
          href="https://www.tiktok.com/@streamquest.io"
          target="_blank"
          rel="noopener"
          aria-label="StreamQuest on TikTok"
          className="footer-social"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
            <path d="M19.6 6.32a5.86 5.86 0 0 1-3.5-1.12 5.84 5.84 0 0 1-2.3-3.97h-3.18v13.04a2.78 2.78 0 0 1-2.78 2.78 2.78 2.78 0 0 1-2.78-2.78 2.78 2.78 0 0 1 2.78-2.78c.28 0 .55.04.8.12V8.34a6.02 6.02 0 0 0-.8-.05A6.04 6.04 0 0 0 1.8 14.27a6.04 6.04 0 0 0 6.04 6.04 6.04 6.04 0 0 0 6.04-6.04V8.43a8.96 8.96 0 0 0 5.72 2.04V7.29a5.83 5.83 0 0 1-.01-.97z"/>
          </svg>
          <span className="sr-only">TikTok</span>
        </a>
        <a
          href="mailto:contact@streamquest.io"
          aria-label="Email StreamQuest"
          className="footer-social"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 7 9 6 9-6" />
          </svg>
          <span className="sr-only">Email</span>
        </a>
      </div>

      <div className="shell mt-6 pt-4 border-t border-white/5 text-xs text-white/50 flex flex-wrap items-center justify-between gap-3">
        <span>
          © {new Date().getFullYear()} StreamQuest. All rights reserved. Built by{" "}
          <a
            href="https://www.rumfunk.nl"
            className="hover:text-lime underline-offset-2 hover:underline"
            target="_blank"
            rel="noopener"
          >
            Rumfunk
          </a>
          .
        </span>
        <a href="https://app.streamquest.io" className="hover:text-lime">
          app.streamquest.io
        </a>
      </div>
    </footer>
  );
}
