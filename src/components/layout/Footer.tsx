export function Footer() {
  return (
    <footer className="w-full flex flex-col items-center justify-center pt-8 md:pt-12 pb-[var(--toolbar-space)] mt-20 border-t border-slate-300">
      <p className="font-inter text-slate-500 text-xs sm:text-sm text-center">
        © {new Date().getFullYear()} Safwan Piliang. All rights reserved.
      </p>
    </footer>
  );
}
