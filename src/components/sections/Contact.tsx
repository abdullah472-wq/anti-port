"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle, AlertCircle } from "lucide-react";
import { CONTACT_INFO } from "@/lib/data";
import Button from "@/components/ui/Button";

const ContactCard = ({ icon: Icon, title, value, href, color, index }: { icon: any, title: string, value: string, href?: string, color: string, index: number }) => {
  return (
    <motion.a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass p-6 rounded-3xl border border-white/10 flex items-center gap-6 group hover:translate-x-2 transition-all duration-300"
    >
      <div className={`w-14 h-14 rounded-2xl bg-${color}-500/20 flex items-center justify-center shrink-0 glow-${color}`}>
        <Icon className={`w-6 h-6 text-${color}-400`} />
      </div>
      <div className="flex flex-col gap-1">
        <h4 className="text-xs font-bold text-content-secondary uppercase tracking-widest">{title}</h4>
        <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">{value}</p>
      </div>
    </motion.a>
  );
};

const Contact = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      // Reset after 3 seconds
      setTimeout(() => setStatus("idle"), 3000);
    }, 2000);
  };

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center gap-4 mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gradient"
          >
            Get In Touch
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            className="h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full"
          />
          <p className="text-content-secondary max-w-xl mt-4">
            Have a project in mind or just want to say hi? Feel free to reach out. I&apos;m always open to new opportunities and collaborations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Side: Contact Info */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
               <h3 className="text-3xl font-bold text-white tracking-tight">Let&apos;s talk about <br /><span className="text-primary">your next project</span></h3>
               <p className="text-content-secondary max-w-md leading-relaxed">
                  I am available for freelance work, full-time positions, or just a friendly chat about technology. Drop me a message and I&apos;ll get back to you as soon as possible.
               </p>
            </div>

            <div className="flex flex-col gap-4">
              <ContactCard
                icon={Mail}
                title="Email Me"
                value={CONTACT_INFO.email}
                href={`mailto:${CONTACT_INFO.email}`}
                color="blue"
                index={0}
              />
              <ContactCard
                icon={Phone}
                title="WhatsApp"
                value={CONTACT_INFO.whatsapp}
                href={CONTACT_INFO.whatsappLink}
                color="neon"
                index={1}
              />
              <ContactCard
                icon={MapPin}
                title="Location"
                value={CONTACT_INFO.location}
                color="purple"
                index={2}
              />
            </div>

            {/* Fun 3D Illustration Placeholder */}
            <div className="hidden lg:block relative h-48 mt-8 glass rounded-3xl border-dashed border-primary/20 flex items-center justify-center overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent animate-pulse" />
               <MessageSquare className="w-16 h-16 text-primary/30 animate-bounce" />
               <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary/20 rounded-full blur-[60px]" />
            </div>
          </div>

          {/* Right Side: Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass p-10 rounded-3xl border border-white/10 shadow-2xl relative"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs font-bold text-content-secondary uppercase tracking-widest px-2">Your Name</label>
                  <input
                    required
                    type="text"
                    id="name"
                    placeholder="John Doe"
                    className="bg-dark-bg/50 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all text-white placeholder:text-content-secondary"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs font-bold text-content-secondary uppercase tracking-widest px-2">Your Email</label>
                  <input
                    required
                    type="email"
                    id="email"
                    placeholder="john@example.com"
                    className="bg-dark-bg/50 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all text-white placeholder:text-content-secondary"
                  />
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-xs font-bold text-content-secondary uppercase tracking-widest px-2">Subject</label>
                <input
                  required
                  type="text"
                  id="subject"
                  placeholder="Project Inquiry"
                  className="bg-dark-bg/50 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all text-white placeholder:text-content-secondary"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs font-bold text-content-secondary uppercase tracking-widest px-2">Your Message</label>
                <textarea
                  required
                  id="message"
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="bg-dark-bg/50 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all text-white placeholder:text-content-secondary resize-none"
                ></textarea>
              </div>

              <div className="pt-4">
                <Button
                  disabled={status === "loading"}
                  type="submit"
                  size="lg"
                  className="w-full h-14"
                  glow
                >
                  {status === "loading" ? (
                    <div className="loading-dots flex gap-1">
                      <div /><div /><div />
                    </div>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </>
                  )}
                </Button>
              </div>

              {/* Status Messages */}
              <AnimatePresence>
                 {status === "success" && (
                   <motion.div
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: 10 }}
                     className="flex items-center gap-3 p-4 rounded-xl bg-green-500/20 border border-green-500/30 text-green-400 text-sm"
                   >
                     <CheckCircle className="w-5 h-5" />
                     Message sent successfully! I&apos;ll get back to you soon.
                   </motion.div>
                 )}
                 {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="flex items-center gap-3 p-4 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 text-sm"
                    >
                      <AlertCircle className="w-5 h-5" />
                      Something went wrong. Please try again later.
                    </motion.div>
                 )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
