"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ExternalLink, Github, ArrowRight, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { projects, type Project } from "@/config/profile";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
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

// 3D Tilt Card Component
function TiltProjectCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(ySpring, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-8, 8]);

  const glareX = useTransform(xSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(ySpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);

    // For spotlight effect
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
      className={`group relative cursor-pointer ${
        project.featured ? "md:col-span-2 md:row-span-2" : ""
      }`}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{ scale: 1.02, z: 50 }}
      transition={{ duration: 0.3 }}
    >
      {/* Card glow border on hover */}
      <motion.div
        className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
        style={{
          background: "linear-gradient(135deg, #3b82f6, #06b6d4, #8b5cf6)",
        }}
      />

      {/* Main card */}
      <div className="relative rounded-2xl overflow-hidden glass border border-white/5 group-hover:border-primary/20 transition-colors duration-300">
        {/* Spotlight effect */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59, 130, 246, 0.15), transparent 40%)`,
          }}
        />

        {/* Glare effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)`,
            backgroundPosition: `${glareX}% ${glareY}%`,
          }}
        />

        {/* Project Image / Gradient Placeholder */}
        <div
          className={`relative w-full overflow-hidden ${
            project.featured ? "h-48 md:h-72" : "h-44"
          }`}
        >
          {/* Animated gradient background */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(6, 182, 212, 0.15), rgba(139, 92, 246, 0.1))",
              backgroundSize: "200% 200%",
            }}
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Floating shapes */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute w-20 h-20 rounded-full bg-primary/10"
              style={{ top: "20%", left: "10%" }}
              animate={{ y: [-5, 5, -5], x: [-3, 3, -3] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            <motion.div
              className="absolute w-32 h-32 rounded-full bg-accent/10"
              style={{ bottom: "10%", right: "10%" }}
              animate={{ y: [5, -5, 5], x: [3, -3, 3] }}
              transition={{ duration: 7, repeat: Infinity }}
            />
          </div>

          {/* Large initial letter */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span
              className="text-7xl md:text-8xl font-bold text-primary/10 select-none"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              {project.title.charAt(0)}
            </motion.span>
          </div>

          {/* Featured Badge */}
          {project.featured && (
            <motion.div
              className="absolute top-4 left-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Badge className="bg-primary/90 text-primary-foreground gap-1 px-3 py-1">
                <Sparkles className="w-3 h-3" />
                Featured
              </Badge>
            </motion.div>
          )}

          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-transparent flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="flex items-center gap-2 text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/30"
              initial={{ scale: 0.8, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-sm font-medium">View Details</span>
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6">
          <motion.h3
            className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300"
            style={{ transform: "translateZ(30px)" }}
          >
            {project.title}
          </motion.h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {project.description}
          </p>

          {/* Tech Stack with stagger animation */}
          <div className="flex flex-wrap gap-2">
            {project.techStack.slice(0, project.featured ? 5 : 4).map((tech, i) => (
              <motion.span
                key={tech}
                className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary/80 border border-primary/20"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.2)" }}
              >
                {tech}
              </motion.span>
            ))}
            {project.techStack.length > (project.featured ? 5 : 4) && (
              <span className="text-xs px-2.5 py-1 rounded-full bg-secondary/50 text-muted-foreground">
                +{project.techStack.length - (project.featured ? 5 : 4)}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({
  project,
  open,
  onClose,
}: {
  project: Project | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-card/95 backdrop-blur-xl border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
            {project.title}
            {project.featured && <Zap className="w-5 h-5 text-primary" />}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {project.description}
          </DialogDescription>
        </DialogHeader>

        {/* Project Image */}
        <motion.div
          className="relative w-full h-48 rounded-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(6, 182, 212, 0.15), rgba(139, 92, 246, 0.1))",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-8xl font-bold text-primary/10">
              {project.title.charAt(0)}
            </span>
          </div>
        </motion.div>

        {/* Long Description */}
        {project.longDescription && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground leading-relaxed whitespace-pre-line text-sm"
          >
            {project.longDescription}
          </motion.div>
        )}

        {/* Tech Stack */}
        <motion.div
          className="mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h4 className="text-sm font-medium text-foreground mb-3">
            Technologies Used
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, i) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.05 }}
              >
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                >
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          className="flex gap-4 mt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {project.liveUrl && (
            <Button asChild className="flex-1 gap-2 glow-primary">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            </Button>
          )}
          {project.githubUrl && (
            <Button variant="outline" asChild className="flex-1 gap-2 hover:border-primary/50">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-4 h-4" />
                Source Code
              </a>
            </Button>
          )}
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="section relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Floating gradient orbs */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
          top: "20%",
          right: "-10%",
        }}
        animate={{
          y: [-20, 20, -20],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
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
              className="text-primary text-sm font-medium uppercase tracking-widest"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Portfolio
            </motion.span>
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Featured <span className="text-gradient">Projects</span>
            </motion.h2>
            <motion.p
              className="text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              A showcase of AI-powered applications and intelligent systems
              that push the boundaries of what&apos;s possible
            </motion.p>
          </motion.div>

          {/* Projects Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <TiltProjectCard
                key={project.id}
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            ))}
            {otherProjects.map((project) => (
              <TiltProjectCard
                key={project.id}
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        open={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
