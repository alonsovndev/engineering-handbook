import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Heading from "@theme/Heading";

import styles from "./index.module.css";

const deploymentProfiles = [
  {
    name: "Static",
    description: "A fast home for your ideas.",
    applications: "Documentation, portfolios, and marketing sites.",
    tools: "Cloudflare · Static assets",
    anchor: "static",
  },
  {
    name: "Lean",
    description: "Small footprint. Room to grow.",
    applications: "MVPs, freelance projects, and early-stage products.",
    tools: "Cloudflare · Lambda · PostgreSQL",
    anchor: "lean",
  },
  {
    name: "Enterprise",
    description: "Built for bigger requirements.",
    applications: "Services that need dedicated infrastructure and scale.",
    tools: "AWS · ECS Fargate · RDS",
    anchor: "enterprise",
  },
];

function HomepageHeader(): ReactNode {
  const illustrationUrl = useBaseUrl("/img/handbook-map.svg");

  return (
    <header className={styles.hero}>
      <div className={`container ${styles.heroLayout}`}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>The engineering field guide</p>
          <Heading as="h1" className={styles.title}>
            A practical reference for <span>engineering decisions.</span>
          </Heading>
          <p className={styles.introduction}>
            A personal approach to software engineering, built on practical
            experience and lessons learned. Explore the practices and reasoning, then
            adapt them to your own context.
          </p>
          <div className={styles.actions}>
            <Link className={styles.primaryAction} to="/docs/intro/">
              Explore the handbook <span aria-hidden="true">↗</span>
            </Link>
            <Link className={styles.secondaryAction} to="/docs/adr/">
              Read the decisions <span aria-hidden="true">→</span>
            </Link>
          </div>
          <p className={styles.heroNote}>
            For the first commit. And everything after it.
          </p>
        </div>
        <figure className={styles.illustration}>
          <img
            src={illustrationUrl}
            width="560"
            height="456"
            alt="An engineering blueprint connecting architecture, implementation, verification, and decisions around a field guide."
            fetchPriority="high"
          />
          <figcaption>
            Clear intent → consistent practice → better software
          </figcaption>
        </figure>
      </div>
      <div className={`container ${styles.principles}`}>
        <span className={styles.principlesLabel}>Working principles</span>
        <span>Understand first.</span>
        <span>Keep it simple.</span>
        <span>Verify before done.</span>
      </div>
    </header>
  );
}

function DeploymentProfiles(): ReactNode {
  return (
    <section className={styles.profiles} aria-labelledby="profiles-title">
      <div className="container">
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.eyebrow}>One platform, three profiles</p>
            <Heading as="h2" id="profiles-title">
              Same principles. Different scale.
            </Heading>
          </div>
          <Link
            to="/docs/architecture/deployment-profiles/"
            className={styles.textLink}
          >
            Compare the profiles <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className={styles.profileGrid}>
          {deploymentProfiles.map((profile) => (
            <Link
              key={profile.name}
              className={styles.profile}
              to={`/docs/architecture/deployment-profiles/#${profile.anchor}`}
            >
              <div className={styles.profileTitle}>
                <Heading as="h3">{profile.name}</Heading>
                <span aria-hidden="true">↗</span>
              </div>
              <p className={styles.profileDescription}>{profile.description}</p>
              <p className={styles.profileApplications}>
                {profile.applications}
              </p>
              <p className={styles.profileTools}>{profile.tools}</p>
            </Link>
          ))}
        </div>
        <p className={styles.profileNote}>
          <span>Reference architectures</span> The shared Terraform profiles are
          validated offline; live deployments and costs remain unverified.
        </p>
      </div>
    </section>
  );
}

function Contribute(): ReactNode {
  return (
    <section
      className={`container ${styles.contribute}`}
      aria-labelledby="contribute-title"
    >
      <div>
        <p className={styles.eyebrow}>A handbook, not a stone tablet</p>
        <Heading as="h2" id="contribute-title">
          Better with every good question.
        </Heading>
        <p>
          Found a gap? Have a different perspective? Share your experience to help
          improve this reference.
        </p>
      </div>
      <Link
        className={styles.contributeLink}
        href="https://github.com/alonsovndev/engineering-handbook/blob/main/CONTRIBUTING.md"
      >
        Contribute to the handbook <span aria-hidden="true">↗</span>
      </Link>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Your engineering field guide"
      description="A personal engineering reference built on practical experience and lessons learned, with practices and decisions others can learn from and adapt."
    >
      <main className={styles.home}>
        <HomepageHeader />
        <HomepageFeatures />
        <DeploymentProfiles />
        <Contribute />
      </main>
    </Layout>
  );
}
