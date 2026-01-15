"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Award, ExternalLink, Calendar, Shield, Star } from "lucide-react";
import { certificates } from "@/config/profile";

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
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

// 3D Tilt Certificate Card
function TiltCertificateCard({
  cert,
  index,
}: {
  cert: {
    id: string;
    title: string;
    issuingOrg: string;
    issueDate: string;
    credentialUrl?: string;
  };
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(ySpring, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-8, 8]);

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
      custom={index}
      className="group relative"
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
      {/* Glow border */}
      <motion.div
        className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
        style={{
          background: "linear-gradient(135deg, #3b82f6, #06b6d4, #8b5cf6)",
        }}
      />

      {/* Glassmorphism Card */}
      <div
        className="relative rounded-2xl p-6 glass-strong overflow-hidden border border-white/5 group-hover:border-primary/20 transition-all duration-300"
      >
        {/* Spotlight effect */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59, 130, 246, 0.15), transparent 40%)`,
          }}
        />

        {/* Animated corner decoration */}
        <motion.div
          className="absolute top-0 right-0 w-24 h-24"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.3 }}
        >
          <div className="absolute top-3 right-3 w-12 h-12 border-t-2 border-r-2 border-primary/20 rounded-tr-xl" />
          <motion.div
            className="absolute top-5 right-5"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Star className="w-3 h-3 text-primary/40" />
          </motion.div>
        </motion.div>

        <div className="relative flex gap-5">
          {/* Certificate Icon with animated ring */}
          <div className="relative flex-shrink-0">
            <motion.div
              className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/30 to-accent/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              style={{ padding: 2 }}
            />
            <motion.div
              className="relative w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Award className="w-8 h-8 text-primary" />
            </motion.div>
            {/* Verified badge */}
            <motion.div
              className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500/90 flex items-center justify-center"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
            >
              <Shield className="w-3 h-3 text-white" />
            </motion.div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <motion.h3
              className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-300"
              style={{ transform: "translateZ(20px)" }}
            >
              {cert.title}
            </motion.h3>
            <motion.p
              className="text-sm text-primary/80 mb-2 font-medium"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.2 }}
            >
              {cert.issuingOrg}
            </motion.p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <motion.span
                className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-secondary/50"
                whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.2)" }}
              >
                <Calendar className="w-3.5 h-3.5" />
                {cert.issueDate}
              </motion.span>
              {cert.credentialUrl && (
                <motion.a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-2 py-0.5 rounded-full hover:text-primary hover:bg-primary/10 transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Verify
                </motion.a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom gradient line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5"
          style={{
            background: "linear-gradient(90deg, transparent, #3b82f6, #06b6d4, transparent)",
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.4, duration: 0.6 }}
        />
      </div>
    </motion.div>
  );
}

export function CertificatesSection() {
  return (
    <section id="certificates" className="section relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      {/* Floating orbs */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)",
          bottom: "10%",
          right: "-10%",
        }}
        animate={{
          y: [-20, 20, -20],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
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
              Credentials
            </motion.span>
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Certificates & <span className="text-gradient">Achievements</span>
            </motion.h2>
            <motion.p
              className="text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Professional certifications that validate my expertise in AI,
              cloud, and software development
            </motion.p>
          </motion.div>

          {/* Certificates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificates.map((cert, index) => (
              <TiltCertificateCard key={cert.id} cert={cert} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
