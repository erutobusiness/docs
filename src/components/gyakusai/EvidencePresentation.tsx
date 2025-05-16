'use client';

import type { Evidence } from '@/types/gyakusai';
import Image from 'next/image';
import { useState } from 'react';
import styles from './styles/EvidencePresentation.module.css';

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
    <div className={styles.evidencePresentation}>
      <h2 className={styles.prompt}>{prompt}</h2>

      <div className={styles.evidenceList}>
        {evidences.map((evidence) => (
          <button
            type="button"
            key={evidence.id}
            className={`${styles.evidenceItem} ${selectedEvidenceId === evidence.id ? styles.selected : ''}`}
            onClick={() => handleSelectEvidence(evidence.id)}
          >
            <div className={styles.evidenceImageContainer}>
              <Image
                src={evidence.image}
                alt={evidence.name}
                width={80}
                height={80}
                className={styles.evidenceImage}
              />
            </div>
            <p className={styles.evidenceName}>{evidence.name}</p>
          </button>
        ))}
      </div>

      {showDetails && selectedEvidence && (
        <div className={styles.evidenceDetails}>
          <div className={styles.detailsHeader}>
            <h3>{selectedEvidence.name}</h3>
            <button type="button" className={styles.closeButton} onClick={handleCloseDetails}>
              ×
            </button>
          </div>
          <div className={styles.detailsContent}>
            <div className={styles.detailsImageContainer}>
              <Image
                src={selectedEvidence.image}
                alt={selectedEvidence.name}
                width={200}
                height={200}
                className={styles.detailsImage}
              />
            </div>
            <p className={styles.detailsDescription}>{selectedEvidence.description}</p>
          </div>
        </div>
      )}

      <button
        type="button"
        className={styles.submitButton}
        onClick={handleSubmit}
        disabled={!selectedEvidenceId}
      >
        提示する
      </button>
    </div>
  );
}
