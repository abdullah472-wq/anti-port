"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Briefcase, DollarSign, Clock, User, Mail, FileText } from "lucide-react";
import { useState } from "react";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal = ({ isOpen, onClose }: ProjectModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const message = `*New Project Inquiry*
    
*Name:* ${formData.name}
*Email:* ${formData.email}
*Project Type:* ${formData.projectType}
*Budget:* ${formData.budget}
*Timeline:* ${formData.timeline}
*Message:* ${formData.message}`;

    const whatsappUrl = `https://wa.me/8801581818368?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    
    setIsSubmitting(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-bg/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl glass rounded-3xl p-8 border border-white/10 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-white">Start a Project</h3>
                <p className="text-content-secondary text-sm mt-1">Tell me about your project</p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-content-secondary mb-2">
                    <User className="w-4 h-4 text-primary" />
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-content-secondary/50 focus:border-primary/50 focus:outline-none transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-content-secondary mb-2">
                    <Mail className="w-4 h-4 text-primary" />
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-content-secondary/50 focus:border-primary/50 focus:outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-content-secondary mb-2">
                  <Briefcase className="w-4 h-4 text-primary" />
                  Project Type
                </label>
                <select
                  required
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-primary/50 focus:outline-none transition-colors"
                >
                  <option value="" className="bg-surface">Select project type</option>
                  <option value="website" className="bg-surface">Website Development</option>
                  <option value="webapp" className="bg-surface">Web Application</option>
                  <option value="landing" className="bg-surface">Landing Page</option>
                  <option value="redesign" className="bg-surface">Website Redesign</option>
                  <option value="other" className="bg-surface">Other</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-content-secondary mb-2">
                    <DollarSign className="w-4 h-4 text-primary" />
                    Budget Range
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-primary/50 focus:outline-none transition-colors"
                  >
                    <option value="" className="bg-surface">Select budget</option>
                    <option value="500-1000" className="bg-surface">$500 - $1,000</option>
                    <option value="1000-2500" className="bg-surface">$1,000 - $2,500</option>
                    <option value="2500-5000" className="bg-surface">$2,500 - $5,000</option>
                    <option value="5000+" className="bg-surface">$5,000+</option>
                  </select>
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-content-secondary mb-2">
                    <Clock className="w-4 h-4 text-primary" />
                    Timeline
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-primary/50 focus:outline-none transition-colors"
                  >
                    <option value="" className="bg-surface">Select timeline</option>
                    <option value="1-2weeks" className="bg-surface">1-2 Weeks</option>
                    <option value="2-4weeks" className="bg-surface">2-4 Weeks</option>
                    <option value="1-2months" className="bg-surface">1-2 Months</option>
                    <option value="2-3months" className="bg-surface">2-3 Months</option>
                    <option value="flexible" className="bg-surface">Flexible</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-content-secondary mb-2">
                  <FileText className="w-4 h-4 text-primary" />
                  Project Details
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-content-secondary/50 focus:border-primary/50 focus:outline-none transition-colors resize-none"
                  placeholder="Tell me about your project requirements..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-medium hover:shadow-glow-primary transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send via WhatsApp
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
