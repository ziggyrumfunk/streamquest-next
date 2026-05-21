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
          </ul>
        </div>

        <div>
          <div className="text-white/95 font-bold mb-3 tracking-wide">For Studios</div>
          <ul className="space-y-2 text-white/70">
            <li><Link href="/brands" className="hover:text-lime">Brands</Link></li>
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

      <div className="shell mt-10 pt-6 border-t border-white/5 text-xs text-white/50 flex flex-wrap items-center justify-between gap-3">
        <span>© {new Date().getFullYear()} StreamQuest. All rights reserved.</span>
        <a href="https://app.streamquest.io" className="hover:text-lime">
          app.streamquest.io
        </a>
      </div>
    </footer>
  );
}
