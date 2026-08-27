import { useCallback, useEffect, useState } from 'react';
import Nav from './components/Nav';
import Hero from './sections/Hero';
import DataStory from './sections/DataStory';
import Demands from './sections/Demands';
import Timeline from './sections/Timeline';
import { useSheetData } from './hooks/useSheetData';
import { fetchCandidates } from './data/sheets';
import { fetchPetitionStats, type PetitionStats } from './data/petition';

export default function App() {
  const candidates = useSheetData(fetchCandidates);
  const [petitionStats, setPetitionStats] = useState<PetitionStats | null>(null);

  const loadStats = useCallback(() => {
    fetchPetitionStats()
      .then(setPetitionStats)
      .catch(() => setPetitionStats(null));
  }, []);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  const signedCount =
    candidates.state === 'ready'
      ? candidates.data.filter((c) => c.status === 'signed' || c.status === 'partial').length
      : null;

  return (
    <>
      <Nav />
      <main>
        <Hero signedCount={signedCount} petitionCount={petitionStats?.individualCount ?? null} />
        <DataStory />
        <Demands />
        <Timeline />
      </main>
    </>
  );
}
