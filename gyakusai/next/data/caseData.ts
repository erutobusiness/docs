import type { Case } from '@/types/gyakusai';
import { missingEvidenceCase } from './cases/missing-evidence';

// すべてのケースをここにまとめる
const allCases = [
  missingEvidenceCase,
  // 今後新しいケースを追加する場合はここに追加
];

// 下位互換性のため、sampleCaseとして既存のケースを保持
export const sampleCase = missingEvidenceCase;

// ケースのリストを取得する関数
export function getAllCases() {
  return allCases.map((caseData) => ({
    id: caseData.id,
    title: caseData.title,
    description: caseData.description,
    image: `/gyakusai/images/cases/${caseData.id}.jpg`,
  }));
}

// IDでケースを取得する関数
export function getCaseById(id: string): Case | undefined {
  return allCases.find((caseData) => caseData.id === id);
}
