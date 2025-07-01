import type { Evidence } from '@/types/gyakusai';

export const missingEvidenceEvidences: Evidence[] = [
  {
    id: 'autopsy-report',
    name: '検死報告書',
    description:
      '被害者は鈍器による頭部打撲で死亡したことが記されている。死亡推定時刻は7月7日午後8時から10時の間。',
    image: '/gyakusai/images/evidence/autopsy-report.png',
  },
  {
    id: 'bloody-hammer',
    name: '血染めのハンマー',
    description: '犯行に使われたと思われる証拠品。被害者の血液と一致する血痕が付着している。',
    image: '/gyakusai/images/evidence/bloody-hammer.png',
  },
  {
    id: 'security-camera',
    name: '防犯カメラ映像',
    description: '事件当日、被害者が最後に目撃された商店街の防犯カメラ映像。午後7時30分の記録。',
    image: '/gyakusai/images/evidence/security-camera.png',
  },
  {
    id: 'witness-testimony',
    name: '目撃証言書',
    description:
      '証人・山田太郎による証言記録。被告人が被害者と口論している様子を目撃したとされている。',
    image: '/gyakusai/images/evidence/witness-testimony.png',
  },
  {
    id: 'alibi-document',
    name: 'アリバイ証明書',
    description:
      '被告人が事件発生時刻に別の場所にいたことを証明する書類。レストランの領収書と防犯カメラ映像が含まれている。',
    image: '/gyakusai/images/evidence/alibi-document.png',
  },
];
