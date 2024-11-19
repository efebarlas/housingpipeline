import React from 'react';
import { HousingStage } from '../data/housingStages';

interface PipelineViewProps {
  stages: HousingStage[];
}

const PipelineView: React.FC<PipelineViewProps> = ({ stages }) => {
  return (
    <div className="flex flex-wrap justify-between items-center p-5">
      {stages.map((stage, index) => (
        <React.Fragment key={index}>
          <div className="flex-1 min-w-[150px] m-2 p-4 bg-blue-100 rounded-lg text-center relative">
            <h3 className="mb-2 text-lg font-semibold text-blue-800">{stage.name}</h3>
            <p className="text-sm text-blue-600">{stage.description}</p>
            {index < stages.length - 1 && (
              <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 w-8 h-8 bg-blue-500 rotate-45 z-10"></div>
            )}
          </div>
          {index < stages.length - 1 && (
            <div className="w-8 h-1 bg-blue-500 hidden md:block"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default PipelineView;
