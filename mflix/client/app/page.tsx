/**
 * MFlix Home Page
 * Updated: 2026-04-20 (copier test)
 */
import styles from './home.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>MFlix</h1>
      <p>Welcome to MFlix - a sample movie browsing application.</p>
      <p>Browse movies, view details, and explore aggregation examples.</p>
      <nav>
        <a href="/movies">Browse Movies</a>
        <a href="/aggregations">Aggregation Examples</a>
      </nav>
    </main>
  );
}
