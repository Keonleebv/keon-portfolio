import { notFound } from "next/navigation";
import { CASES } from "@/lib/cases";
import CaseStudyView from "@/components/CaseStudyView";

export async function generateStaticParams() {
  return Object.keys(CASES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const caseData = CASES[slug];
  if (!caseData) return {};
  return {
    title: caseData.title,
    description: caseData.dek,
    openGraph: {
      title: caseData.title,
      description: caseData.dek,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const caseData = CASES[slug];
  if (!caseData) notFound();
  return <CaseStudyView caseData={caseData} />;
}
