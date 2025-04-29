import EuMapContainer from "@/components/EuMapContainer/EuMapContainer"
import Sources from '@/components/Sources/Sources';
import euData from '../../data/euData.json';

export default function Home() {
  const lastUpdated = euData.metadata.lastUpdated;

  return (
    <div>
      <main>
        <EuMapContainer/>
        <div className="container">
          <Sources />
        </div>
      </main>
      <footer>
        <div className="eyetalkFooterBadge">
          <img
            src="/logo.png"
            alt="Eyetalk logo"
            style={{ height: "44px", width: "auto" }}
          />
          <span
            style={{
              fontSize: "1rem",
              color: "var(--color-primary)",
              fontWeight: 500
            }}
          >
            Last update: {lastUpdated}
          </span>
        </div>
      </footer>
    </div>
  );
}
