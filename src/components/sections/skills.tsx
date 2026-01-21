"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { skills } from "@/config/profile";
import {
  Brain,
  Monitor,
  Server,
  Cloud,
  Wrench,
  Sparkles,
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
    },
  },
};

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "AI & Machine Learning": Brain,
  "Frontend Development": Monitor,
  "Backend Development": Server,
  "Cloud & DevOps": Cloud,
  "Tools & Frameworks": Wrench,
};

const gridPatterns = [
  "col-span-2 row-span-2", // AI & ML - large
  "col-span-2 row-span-1", // Frontend
  "col-span-1 row-span-2", // Backend
  "col-span-1 row-span-1", // Cloud
  "col-span-2 row-span-1", // Tools
];

// 3D Tilt Skill Card
function TiltSkillCard({
  category,
  skills: skillsList,
  pattern,
  Icon,
  index,
}: {
  category: string;
  skills: string[];
  pattern: string;
  Icon: React.ComponentType<{ className?: string }>;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(ySpring, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);

    // Spotlight
    const spotX = ((e.clientX - rect.left) / rect.width) * 100;
    const spotY = ((e.clientY - rect.top) / rect.height) * 100;
    ref.current.style.setProperty("--mouse-x", `${spotX}%`);
    ref.current.style.setProperty("--mouse-y", `${spotY}%`);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      className={`${pattern} group relative cursor-default`}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02, z: 30 }}
      transition={{ duration: 0.3 }}
    >
      {/* Glow border on hover */}
      <motion.div
        className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
        style={{
          background: "linear-gradient(135deg, #3b82f6, #06b6d4, #8b5cf6)",
        }}
      />

      {/* Main card */}
      <div className="relative h-full glass rounded-2xl p-6 border border-white/5 group-hover:border-primary/20 transition-colors duration-300 overflow-hidden">
        {/* Spotlight effect */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59, 130, 246, 0.15), transparent 40%)`,
          }}
        />

        {/* Floating decoration */}
        <motion.div
          className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-primary/5 blur-2xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, delay: index * 0.5 }}
        />

        {/* Category Header */}
        <div className="relative flex items-center gap-3 mb-4">
          <motion.div
            className="p-2.5 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 group-hover:from-primary/30 group-hover:to-accent/20 transition-colors"
            whileHover={{ rotate: 5, scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <Icon className="w-5 h-5 text-primary" />
          </motion.div>
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
            {category}
          </h3>
          {index === 0 && (
            <motion.div
              className="ml-auto"
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-4 h-4 text-primary/60" />
            </motion.div>
          )}
        </div>

        {/* Skills Tags with staggered animation */}
        <div className="relative flex flex-wrap gap-2">
          {skillsList.map((skill, skillIndex) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: skillIndex * 0.03 + index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.08,
                backgroundColor: "rgba(59, 130, 246, 0.25)",
                color: "rgb(59, 130, 246)",
              }}
              className="text-xs px-3 py-1.5 rounded-full bg-secondary/50 text-muted-foreground border border-transparent hover:border-primary/30 transition-all duration-200 cursor-default"
            >
              {skill}
            </motion.span>
          ))}
        </div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
      </div>
    </motion.div>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="section relative overflow-hidden">
      {/* Background gradient orb */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%)",
          top: "10%",
          left: "-15%",
        }}
        animate={{
          y: [-30, 30, -30],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container-custom relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <motion.span
              className="text-primary text-sm font-medium uppercase tracking-widest inline-block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Expertise
            </motion.span>
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Skills & <span className="text-gradient">Technologies</span>
            </motion.h2>
            <motion.p
              className="text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              A comprehensive toolkit spanning AI/ML, full-stack development,
              and cloud infrastructure
            </motion.p>
          </motion.div>

          {/* Bento Grid with 3D Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]">
            {skills.map((category, index) => {
              const Icon = categoryIcons[category.category] || Brain;
              const pattern = gridPatterns[index % gridPatterns.length];

              return (
                <TiltSkillCard
                  key={category.category}
                  category={category.category}
                  skills={category.skills}
                  pattern={pattern}
                  Icon={Icon}
                  index={index}
                />
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
