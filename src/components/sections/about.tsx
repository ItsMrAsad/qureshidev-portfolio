"use client";

import { motion } from "motion/react";
import { MapPin, Sparkles, Brain, Target, Rocket } from "lucide-react";
import { profile, experience, stats } from "@/config/profile";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

const highlights = [
  {
    icon: Brain,
    title: "AI-Native Architecture",
    description: "Designing systems where artificial intelligence is the core, not an afterthought — from LLM orchestration to autonomous decision-making",
  },
  {
    icon: Rocket,
    title: "10x Performance Impact",
    description: "Building solutions that don't just work — they transform workflows, reduce costs by 40%+, and scale to millions of operations",
  },
  {
    icon: Target,
    title: "Production-Grade Quality",
    description: "Enterprise-ready systems with 99.7% accuracy, battle-tested in Fortune 500 environments handling real-world complexity",
  },
  {
    icon: Sparkles,
    title: "Future-Forward Innovation",
    description: "Always on the bleeding edge — from multi-agent systems to neural architectures that will define the next decade of software",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="section relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      <div className="container-custom relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="text-primary text-sm font-medium uppercase tracking-widest">
              About Me
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
              Crafting the Future with{" "}
              <span className="text-gradient">AI & Code</span>
            </h2>
          </motion.div>

          {/* Stats Row */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                custom={index}
                className="glass rounded-xl p-6 text-center group hover:bg-primary/5 transition-colors"
              >
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Bio */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="glass rounded-2xl p-8">
                <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                  {profile.bio}
                </p>
                <div className="flex items-center gap-2 mt-6 text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{profile.location}</span>
                </div>
              </div>

              {/* Highlights */}
              <div className="grid gap-4">
                {highlights.map((item, index) => (
                  <motion.div
                    key={item.title}
                    variants={itemVariants}
                    custom={index}
                    className="glass rounded-xl p-4 flex items-start gap-4 group hover:bg-primary/5 transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {item.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Experience Timeline */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Experience
              </h3>
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <motion.div
                    key={exp.id}
                    variants={itemVariants}
                    custom={index}
                    className="relative pl-6 border-l-2 border-border hover:border-primary transition-colors"
                  >
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-primary" />
                    <div className="glass rounded-xl p-6 ml-4">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <h4 className="font-semibold text-foreground">
                          {exp.role}
                        </h4>
                        <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">
                          {exp.duration}
                        </span>
                      </div>
                      <p className="text-primary text-sm mb-3">{exp.company}</p>
                      <p className="text-sm text-muted-foreground mb-4">
                        {exp.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {exp.techUsed.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
