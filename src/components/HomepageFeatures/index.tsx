import type { ReactNode } from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: "One platform, three profiles",
    description: (
      <>
        Application architecture, testing, and conventions stay the same
        across static, lean, and enterprise deployments. Only the
        infrastructure changes.
      </>
    ),
  },
  {
    title: "Standards you can apply",
    description: (
      <>
        Backend, frontend, testing, and Git conventions written as rules
        with a reason, ready to copy into templates and AGENTS.md files.
      </>
    ),
  },
  {
    title: "Decisions on record",
    description: (
      <>
        Architecture decisions live in ADRs, so tooling choices such as
        Alembic or the coverage gate are explained, not just stated.
      </>
    ),
  },
];

function Feature({ title, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
