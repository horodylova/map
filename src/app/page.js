
import EuMapContainer from "@/components/EuMapContainer/EuMapContainer"
import Sources from '@/components/Sources/Sources';


export default function Home() {
  return (
    <div>
      <main>
       <EuMapContainer/>
      </main>
      <footer>
        <div className="footerContent">
          <Sources />
        </div>
      </footer>
    </div>
  );
}
