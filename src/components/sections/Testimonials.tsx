"use client";

import { FadeInStaggerContainer, FadeInStaggerItem } from "@/components/ui/FadeInStagger";
import { TESTIMONIALS } from "@/lib/data";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 px-6 relative overflow-hidden">
      <FadeInStaggerContainer className="max-w-7xl mx-auto">
        <FadeInStaggerItem className="flex flex-col items-center text-center gap-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient">
            Client Feedback
          </h2>
          <div className="h-1.5 w-20 bg-gradient-to-r from-primary to-secondary rounded-full" />
          <p className="text-content-secondary max-w-xl mt-4">
            Hear what people around the world have to say about working with me.
          </p>
        </FadeInStaggerItem>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <FadeInStaggerItem 
              key={testimonial.id}
              className="glass p-8 rounded-3xl border border-white/10 flex flex-col gap-6 relative group hover:border-primary/30 transition-colors"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-white/5 group-hover:text-primary/10 transition-colors" />
              
              <div className="flex gap-1">
                {[...Array(testimonial.rating)].map((_, index) => (
                  <Star key={index} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              
              <p className="text-content-secondary leading-relaxed italic flex-grow">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center gap-4 mt-4 pt-6 border-t border-white/10">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary text-lg">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-bold text-sm flex items-center gap-2">
                    {testimonial.name} <span className="text-base" title={testimonial.country}>{testimonial.flag}</span>
                  </span>
                  <span className="text-primary text-xs font-medium tracking-wide">
                    {testimonial.role}
                  </span>
                </div>
              </div>
            </FadeInStaggerItem>
          ))}
        </div>
      </FadeInStaggerContainer>
    </section>
  );
};

export default Testimonials;
