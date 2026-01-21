import type { Metadata } from "next";
import { ResumeContent } from "./resume-content";

export const metadata: Metadata = {
  title: "Resume",
  description: "Interactive resume and CV of Asad Ur Rehman - AI & Agentic Engineer specializing in LLM integrations, multi-agent systems, and full-stack development.",
  openGraph: {
    title: "Resume | Asad Ur Rehman - AI & Agentic Engineer",
    description: "Interactive resume and CV of Asad Ur Rehman",
  },
};

export default function ResumePage() {
  return <ResumeContent />;
}
