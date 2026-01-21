"use client";

import { motion } from "motion/react";
import { ArrowLeft, Download, Mail, MapPin, Globe, Calendar, Briefcase, GraduationCap, Award, Code2, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { profile, experience, skills, certificates, socialLinks } from "@/config/profile";

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
    },
  },
};

function SectionHeader({ icon: Icon, title }: { icon: React.ComponentType<{ className?: string }>; title: string }) {
  return (
    <motion.div
      variants={itemVariants}
      className="flex items-center gap-3 mb-6"
    >
      <div className="p-2 rounded-lg bg-primary/10">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent" />
    </motion.div>
  );
}

export function ResumeContent() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 glass-strong border-b border-border"
      >
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Portfolio</span>
          </Link>
          <Button asChild className="gap-2 glow-primary">
            <a href={profile.resumeUrl} download>
              <Download className="w-4 h-4" />
              Download PDF
            </a>
          </Button>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {/* Profile Header */}
          <motion.section variants={itemVariants} className="glass-strong rounded-2xl p-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Avatar */}
              <motion.div
                className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-3xl shadow-lg"
                whileHover={{ scale: 1.05, rotate: 3 }}
              >
                {profile.name.split(" ").map(n => n[0]).join("")}
              </motion.div>

              {/* Info */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-foreground mb-1">{profile.name}</h1>
                <p className="text-xl text-primary font-medium mb-3">{profile.role}</p>
                <p className="text-muted-foreground mb-4 max-w-2xl">{profile.tagline}</p>

                {/* Contact Info */}
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" />
                    <a href={`mailto:${profile.email}`} className="hover:text-primary transition-colors">
                      {profile.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{profile.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-primary" />
                    <a href="https://qureshidev.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                      qureshidev.com
                    </a>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-2 mt-4">
                  {socialLinks.slice(0, 4).map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-secondary/50 hover:bg-primary/10 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon className="w-4 h-4 text-muted-foreground hover:text-primary" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* Summary */}
          <motion.section variants={itemVariants}>
            <SectionHeader icon={Briefcase} title="Professional Summary" />
            <div className="glass rounded-xl p-6">
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {profile.bio}
              </p>
            </div>
          </motion.section>

          {/* Experience */}
          <motion.section variants={itemVariants}>
            <SectionHeader icon={Briefcase} title="Work Experience" />
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  variants={itemVariants}
                  className="glass rounded-xl p-6 relative overflow-hidden group"
                  whileHover={{ scale: 1.01 }}
                >
                  {/* Timeline connector */}
                  {index < experience.length - 1 && (
                    <div className="absolute left-8 top-full w-0.5 h-6 bg-gradient-to-b from-primary/50 to-transparent" />
                  )}

                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    {/* Date */}
                    <div className="md:w-32 flex-shrink-0">
                      <div className="flex items-center gap-2 text-sm text-primary font-medium">
                        <Calendar className="w-4 h-4" />
                        <span>{exp.duration}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground">{exp.role}</h3>
                      <p className="text-primary mb-3">{exp.company}</p>
                      <p className="text-muted-foreground text-sm mb-4">{exp.description}</p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2">
                        {exp.techUsed.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary border border-primary/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Skills */}
          <motion.section variants={itemVariants}>
            <SectionHeader icon={Code2} title="Technical Skills" />
            <div className="grid md:grid-cols-2 gap-6">
              {skills.map((category, index) => (
                <motion.div
                  key={category.category}
                  variants={itemVariants}
                  className="glass rounded-xl p-6"
                  whileHover={{ scale: 1.02 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    {category.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <motion.span
                        key={skill}
                        className="text-xs px-2.5 py-1.5 rounded-full bg-secondary/50 text-muted-foreground border border-transparent hover:border-primary/30 hover:text-primary transition-all"
                        whileHover={{ scale: 1.05 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Certifications */}
          <motion.section variants={itemVariants}>
            <SectionHeader icon={Award} title="Certifications" />
            <div className="grid md:grid-cols-2 gap-4">
              {certificates.map((cert) => (
                <motion.div
                  key={cert.id}
                  variants={itemVariants}
                  className="glass rounded-xl p-5 flex items-start gap-4 group"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                    <GraduationCap className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground text-sm line-clamp-1">{cert.title}</h3>
                    <p className="text-xs text-muted-foreground">{cert.issuingOrg}</p>
                    <p className="text-xs text-primary mt-1">{cert.issueDate}</p>
                  </div>
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg hover:bg-primary/10 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-primary" />
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Footer */}
          <motion.footer
            variants={itemVariants}
            className="text-center py-8 border-t border-border"
          >
            <p className="text-muted-foreground text-sm">
              Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </p>
            <p className="text-muted-foreground text-sm mt-2">
              View the full interactive portfolio at{" "}
              <a href="https://qureshidev.com" className="text-primary hover:underline">
                qureshidev.com
              </a>
            </p>
          </motion.footer>
        </motion.div>
      </main>
    </div>
  );
}
