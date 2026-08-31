import { useEffect, useState } from 'react';
import Nav from './components/Nav';
import Hero from './sections/Hero';
import DataStory from './sections/DataStory';
import Demands from './sections/Demands';
import Timeline from './sections/Timeline';
import SignBoard from './sections/SignBoard';
import Endorsements from './sections/Endorsements';
import PetitionForm from './sections/PetitionForm';
import About from './sections/About';
import Footer from './sections/Footer';
import { useSheetData } from './hooks/useSheetData';
import { fetchCandidates, fetchEndorsingOrgs } from './data/sheets';
import { fetchPetitionStats, type PetitionStats } from './data/petition';

export default function App() {
  const candidates = useSheetData(fetchCandidates);
  const endorsingOrgs = useSheetData(fetchEndorsingOrgs);
  const [petitionStats, setPetitionStats] = useState<PetitionStats | null>(null);
  const [statsFailed, setStatsFailed] = useState(false);

  useEffect(() => {
    fetchPetitionStats()
      .then((stats) => {
        setPetitionStats(stats);
        setStatsFailed(false);
      })
      .catch(() => setStatsFailed(true));
  }, []);

  const signedCount =
    candidates.state === 'ready'
      ? candidates.data.filter((c) => c.status === 'signed' || c.status === 'partial').length
      : null;

  return (
    <>
      <Nav />
      <main>
        <Hero
          signedCount={signedCount}
          groupCount={endorsingOrgs.state === 'ready' ? petitionStats?.groupCount ?? null : null}
          groupNames={endorsingOrgs.data.map((org) => org.name)}
          groupState={endorsingOrgs.state}
        />
        <DataStory />
        <Demands />
        <Timeline />
        <SignBoard state={candidates.state} candidates={candidates.data} onRetry={candidates.retry} />
        <Endorsements
          orgsState={endorsingOrgs.state}
          orgs={endorsingOrgs.data}
          stats={petitionStats}
          statsFailed={statsFailed}
        />
        <PetitionForm />
        <About />
      </main>
      <Footer />
    </>
  );
}
