'use client';

import type { Evidence } from '@/types/gyakusai';
import Image from 'next/image';
import { useState } from 'react';

interface EvidencePresentationProps {
  evidences: Evidence[];
  onSelectEvidence: (evidenceId: string) => void;
  prompt?: string;
}

export default function EvidencePresentation({
  evidences,
  onSelectEvidence,
  prompt = 'どの証拠を提示しますか？',
}: EvidencePresentationProps) {
  const [selectedEvidenceId, setSelectedEvidenceId] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const handleSelectEvidence = (id: string) => {
    setSelectedEvidenceId(id);
    setShowDetails(true);
  };

  const handleSubmit = () => {
    if (selectedEvidenceId) {
      onSelectEvidence(selectedEvidenceId);
    }
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  const selectedEvidence = selectedEvidenceId
    ? evidences.find((evidence) => evidence.id === selectedEvidenceId)
    : null;
  return (
    <div className="bg-[rgba(15,23,42,0.9)] rounded-xl border-2 border-[#6c9bd0] p-5 w-[90%] max-w-[800px] mx-auto shadow-lg">
      <h2 className="text-white text-2xl text-center mt-0 mb-5 font-bold">{prompt}</h2>

      <div className="flex flex-wrap justify-center gap-4 mb-5">
        {evidences.map((evidence) => (
          <button
            type="button"
            key={evidence.id}
            className={`w-[100px] text-center ${
              selectedEvidenceId === evidence.id
                ? 'bg-[#334d74] border-2 border-[#ffd700]'
                : 'bg-[rgba(30,41,59,0.7)]'
            } rounded-lg p-2.5 cursor-pointer transition-all duration-200 hover:translate-y-[-5px] hover:shadow-md`}
            onClick={() => handleSelectEvidence(evidence.id)}
          >
            <div className="relative w-[80px] h-[80px] mx-auto">
              <Image
                src={evidence.image}
                alt={evidence.name}
                width={80}
                height={80}
                className="object-contain rounded"
              />
            </div>
            <p className="text-white text-sm mt-2 mb-0 break-words">{evidence.name}</p>
          </button>
        ))}
      </div>

      {showDetails && selectedEvidence && (
        <div className="bg-[#1e293b] rounded-lg p-4 mb-5 border border-[#475569]">
          <div className="flex justify-between items-center mb-2.5">
            <h3 className="text-white m-0 text-xl">{selectedEvidence.name}</h3>
            <button
              type="button"
              className="bg-transparent border-0 text-white text-2xl cursor-pointer p-0 flex items-center justify-center w-[30px] h-[30px]"
              onClick={handleCloseDetails}
            >
              ×
            </button>
          </div>{' '}
          <div className="flex gap-5 items-center sm:flex-row flex-col">
            <div className="flex-shrink-0 relative sm:w-[200px] sm:h-[200px] w-[150px] h-[150px]">
              <Image
                src={selectedEvidence.image}
                alt={selectedEvidence.name}
                width={200}
                height={200}
                className="object-contain rounded"
              />
            </div>
            <p className="text-[#e2e8f0] m-0 text-base leading-relaxed">
              {selectedEvidence.description}
            </p>
          </div>
        </div>
      )}

      <button
        type="button"
        className={`bg-[#2563eb] text-white border-0 rounded-lg py-2.5 px-5 text-base font-bold cursor-pointer transition-colors duration-200 block mx-auto
          ${!selectedEvidenceId ? 'bg-[#64748b] cursor-not-allowed' : 'hover:bg-[#1d4ed8]'}`}
        onClick={handleSubmit}
        disabled={!selectedEvidenceId}
      >
        提示する
      </button>
    </div>
  );
}
