import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

const handbookSections = [
  {
    title: "Architecture",
    description:
      "Give every piece a place. Define boundaries that make change easier.",
    topics: "Layers · Boundaries · Deployment",
    route: "architecture",
    icon: "M4 4h6v6H4z M14 4h6v6h-6z M9 16h6v6H9z M7 10v3h10v-3 M12 13v3",
  },
  {
    title: "Backend",
    description:
      "Build services with clear contracts, predictable data, and useful logs.",
    topics: "Python · FastAPI · PostgreSQL",
    route: "backend",
    icon: "M4 4h16v6H4z M4 14h16v6H4z M7 7h.01 M7 17h.01 M15 7h2 M15 17h2",
  },
  {
    title: "Frontend",
    description: "Make interfaces easier to use, reason about, and maintain.",
    topics: "TypeScript · React · State",
    route: "frontend",
    icon: "M3 4h18v16H3z M3 9h18 M8 9v11 M6 6.5h.01 M9 6.5h.01",
  },
  {
    title: "Testing",
    description:
      "Turn assumptions into evidence. Know what to test and what done means.",
    topics: "Strategy · Integration · Coverage",
    route: "testing",
    icon: "M9 3h6 M10 3v6L4 19a1 1 0 0 0 1 2h14a1 1 0 0 0 1-2L14 9V3 M7 15h10 M10 18l1.5 1.5L15 16",
  },
  {
    title: "Git & pull requests",
    description:
      "Keep changes focused, reviews useful, and releases intentional.",
    topics: "Branches · Commits · Releases",
    route: "git",
    icon: "M8 6v12 M16 6v3a4 4 0 0 1-4 4H8 M8 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6 M8 16a3 3 0 1 0 0 6 3 3 0 0 0 0-6 M16 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6",
  },
  {
    title: "AI development",
    description:
      "Give agents the right context. Keep human judgment in the loop.",
    topics: "AGENTS.md · Workflow · Review",
    route: "ai-development",
    icon: "M5 6h14v14H5z M9 11h.01 M15 11h.01 M9 16h6 M12 3v3 M2 11h3 M19 11h3",
  },
];

export default function HomepageFeatures(): ReactNode {
  return (
    <section
      className={`container ${styles.section}`}
      aria-labelledby="handbook-sections-title"
    >
      <div className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>Find your next step</p>
          <Heading as="h2" id="handbook-sections-title">
            Less guesswork.
            <br />
            More good engineering.
          </Heading>
        </div>
        <p className={styles.sectionIntroduction}>
          From an architecture sketch to a reviewed pull request. Practical
          guidance for the work in front of you.
        </p>
      </div>
      <div className={styles.grid}>
        {handbookSections.map((section) => (
          <Link
            className={styles.card}
            to={`/docs/${section.route}/`}
            key={section.route}
          >
            <svg
              className={styles.icon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d={section.icon} />
            </svg>
            <Heading as="h3">{section.title}</Heading>
            <p className={styles.description}>{section.description}</p>
            <div className={styles.cardFooter}>
              <span>{section.topics}</span>
              <span className={styles.arrow} aria-hidden="true">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
