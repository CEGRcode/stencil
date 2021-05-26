import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">STENCIL</h1>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/install">
            Getting Started
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <Layout
      title={`STENCIL`}
      description="STENCIL Home page <head />">
        <HomepageHeader />
        <main>
          <div style={{ padding: "4rem 0", width: 500, textAlign: "left", margin: "0 auto" }}>
            <strong>Motivation:</strong> The ability to compile sample data
            analysis and results into a concise and interpretable format is a
            key step in determining the success of an experiment. This is
            crucial in determining baselines for reproducibility and are often
            a key requirement for data dissemination. However, in practice it
            can be difficult to consolidate data and analyses in a way that
            can encapsulate and adapt to the plethora of datatypes available
            in the life sciences. <br /> <br />
            <strong>Results:</strong> We present STENCIL, a web templating
            engine designed to organize, visualize, and en-able sharing of
            interactive visualization of analyses. STENCIL provides a
            framework for creating a template to display highly customizable
            visual frontends, leveraging REST API based backends, that
            provides programmatic data access and supports easy data
            dissemination.
          </div>
        </main>
    </Layout>
  );
}
