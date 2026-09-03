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
import { fetchCandidates } from './data/sheets';
import { fetchPetitionStats, type PetitionStats } from './data/petition';

export default function App() {
  const candidates = useSheetData(fetchCandidates);
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
    candidates.state === 'ready' || candidates.state === 'empty'
      ? candidates.data.filter((c) => c.status === 'signed' || c.status === 'partial').length
      : null;

  const groupsState = statsFailed
    ? 'error'
    : petitionStats === null
      ? 'loading'
      : petitionStats.groupNames.length === 0
        ? 'empty'
        : 'ready';

  return (
    <>
      <Nav />
      <main>
        <Hero signedCount={signedCount} groupCount={petitionStats?.groupCount ?? null} />
        <DataStory />
        <Demands />
        <Timeline />
        <SignBoard state={candidates.state} candidates={candidates.data} onRetry={candidates.retry} />
        <About />
        <Endorsements
          groupsState={groupsState}
          groupNames={petitionStats?.groupNames ?? []}
          individualCount={petitionStats?.individualCount ?? null}
          messages={petitionStats?.publicMessages ?? []}
        />
        <PetitionForm />
      </main>
      <Footer />
    </>
  );
}
