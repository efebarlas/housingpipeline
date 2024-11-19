import PipelineView from "./components/PipelineView";
import SeattleHousingData from "./components/SeattleHousingData";
import { housingStages } from "./data/housingStages";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Housing Project Stages in Seattle</h1>
      <PipelineView stages={housingStages} />
      <SeattleHousingData />
    </main>
  );
}
