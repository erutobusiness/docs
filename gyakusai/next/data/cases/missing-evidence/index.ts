import type { Case } from '@/types/gyakusai';
import { missingEvidenceCharacters } from './characters';
import { missingEvidenceEvidences } from './evidences';
import { missingEvidenceScenes } from './scenes';

export const missingEvidenceCase: Case = {
  id: 'missing-evidence',
  title: '消えた証拠品の謎',
  description: '重要な証拠品が法廷から消えた事件の真相に迫る',
  characters: missingEvidenceCharacters,
  evidences: missingEvidenceEvidences,
  scenes: missingEvidenceScenes,
  initialSceneId: 'intro',
};

// デフォルトエクスポートも追加
export default missingEvidenceCase;
