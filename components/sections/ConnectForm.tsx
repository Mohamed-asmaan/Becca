"use client";

import { useState, useCallback } from "react";
import { Container, Button } from "@/components/ui";

export default function ConnectForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    },
    []
  );

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      // Placeholder: replace with your contact API when ready
      await new Promise((r) => setTimeout(r, 1000));
      setStatus("success");
      setFormData({ name: "", email: "", company: "", message: "" });
    } catch {
      setStatus("error");
    }
  }, []);

  const inputBase =
    "w-full px-4 py-3 bg-transparent border border-foreground-inverse/30 text-foreground-inverse placeholder-foreground-inverse/40 focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-60 transition-colors duration-200 hover:border-foreground-inverse/50";

  return (
    <section
      className="relative bg-surface pt-16 sm:pt-24 md:pt-32 pb-16 sm:pb-24 md:pb-32 overflow-clip"
      aria-labelledby="connect-heading"
    >
      <Container>
        <div className="max-w-[40rem] mx-auto">
          <h1
            id="connect-heading"
            className="font-display text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-foreground-inverse text-center"
          >
            Let&apos;s talk
          </h1>
          <p className="mt-6 text-body text-foreground-inverse/90 text-center">
            Tell us about your project. We&apos;d love to hear from you.
          </p>

          <form onSubmit={handleSubmit} className="mt-12 sm:mt-16 space-y-6">
            <div>
              <label
                htmlFor="connect-name"
                className="block text-label text-foreground-inverse/80 mb-2"
              >
                Name
              </label>
              <input
                id="connect-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={status === "loading"}
                className={inputBase}
                placeholder="Your name"
              />
            </div>
            <div>
              <label
                htmlFor="connect-email"
                className="block text-label text-foreground-inverse/80 mb-2"
              >
                Email
              </label>
              <input
                id="connect-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={status === "loading"}
                className={inputBase}
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label
                htmlFor="connect-company"
                className="block text-label text-foreground-inverse/80 mb-2"
              >
                Company
              </label>
              <input
                id="connect-company"
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                disabled={status === "loading"}
                className={inputBase}
                placeholder="Your company"
              />
            </div>
            <div>
              <label
                htmlFor="connect-message"
                className="block text-label text-foreground-inverse/80 mb-2"
              >
                Message
              </label>
              <textarea
                id="connect-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                disabled={status === "loading"}
                className={`${inputBase} resize-y min-h-[8rem]`}
                placeholder="Tell us about your project..."
              />
            </div>
            <div className="pt-4">
              <Button
                type="submit"
                variant="primary"
                disabled={status === "loading"}
                className="w-full sm:w-auto sm:min-w-[12rem]"
              >
                {status === "loading" ? "Sending…" : "Send message"}
              </Button>
            </div>
            <p className="text-body text-foreground-inverse/80" role="status">
              {status === "success" && "Thanks! We'll be in touch soon."}
              {status === "error" &&
                "Something went wrong. Please try again or email us directly."}
            </p>
          </form>
        </div>
      </Container>
    </section>
  );
}
