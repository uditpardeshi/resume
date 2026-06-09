import * as React from "react";
import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ChevronDown, MessageSquare, Shield, FileText, User } from "lucide-react";

export function GsapDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLAnchorElement[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Close dropdown on click outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Animate dropdown container open
      gsap.fromTo(
        menuRef.current,
        {
          opacity: 0,
          y: -15,
          scale: 0.95,
          pointerEvents: "none",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          pointerEvents: "auto",
          duration: 0.35,
          ease: "back.out(1.5)",
        },
      );
      // Animate items stagger-in
      gsap.fromTo(
        itemsRef.current,
        { opacity: 0, x: -12 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.04,
          duration: 0.25,
          ease: "power2.out",
          delay: 0.08,
        },
      );
    } else {
      // Animate closed
      gsap.to(menuRef.current, {
        opacity: 0,
        y: -10,
        scale: 0.95,
        pointerEvents: "none",
        duration: 0.2,
        ease: "power2.in",
      });
    }
  }, [isOpen]);

  const links = [
    { to: "/support", label: "Support", desc: "Get help & submit feedback", icon: MessageSquare },
    {
      to: "/developer",
      label: "Developer Info",
      desc: "About the creator & tech stack",
      icon: User,
    },
    { to: "/terms", label: "Terms of Service", desc: "Fair use agreement & terms", icon: FileText },
    { to: "/privacy", label: "Privacy Policy", desc: "How we protect your data", icon: Shield },
  ];

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 text-muted-foreground hover:text-saffron text-sm font-semibold transition-colors cursor-pointer outline-none focus:text-saffron py-1.5 px-3 rounded-md hover:bg-saffron/5"
      >
        <span>Explore Links</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180 text-saffron" : ""}`}
        />
      </button>

      {/* Dropdown Container */}
      <div
        ref={menuRef}
        className="absolute left-0 mt-3 w-80 bg-paper/95 backdrop-blur-md border border-border rounded-xl shadow-soft p-2 z-50 opacity-0 pointer-events-none origin-top-left"
        style={{ transform: "translateY(-15px)" }}
      >
        <div className="grid gap-1">
          {links.map((link, idx) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.to}
                to={link.to}
                ref={(el: HTMLAnchorElement | null) => {
                  if (el) itemsRef.current[idx] = el;
                }}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-saffron/10 transition-colors group cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                <div className="w-8 h-8 rounded-lg bg-saffron/10 text-saffron flex items-center justify-center group-hover:bg-saffron/20 shrink-0 transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="space-y-0.5 text-left">
                  <div className="font-bold text-xs text-ink group-hover:text-saffron transition-colors">
                    {link.label}
                  </div>
                  <div className="text-[10px] text-muted-foreground leading-normal font-medium">
                    {link.desc}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
