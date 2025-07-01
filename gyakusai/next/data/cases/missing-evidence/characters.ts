import type { Character } from '@/types/gyakusai';

export const missingEvidenceCharacters: Character[] = [
  {
    id: 'defense',
    name: 'エルホド',
    role: '弁護士',
    images: {
      normal: '/gyakusai/eruto_normal.webp',
      surprised: '/gyakusai/eruto_surprised.webp',
      angry: '/gyakusai/eruto_angry.webp',
      thinking: '/gyakusai/eruto_confident.webp',
      confident: '/gyakusai/eruto_confident.webp',
      nervous: '/gyakusai/eruto_nervous.webp',
      breakdown: '/gyakusai/eruto_breakdown.webp',
    },
  },
  {
    id: 'prosecutor',
    name: 'カルマ',
    role: '検事',
    images: {
      normal: '/gyakusai/prosecutor-normal.png',
      surprised: '/gyakusai/prosecutor-surprised.png',
      angry: '/gyakusai/prosecutor-angry.png',
      thinking: '/gyakusai/prosecutor-thinking.png',
      confident: '/gyakusai/prosecutor-confident.png',
      nervous: '/gyakusai/prosecutor-nervous.png',
      breakdown: '/gyakusai/prosecutor-breakdown.png',
    },
  },
  {
    id: 'judge',
    name: 'サイバンチョ',
    role: '裁判長',
    images: {
      normal: '/gyakusai/saibanchou_no_gavel.png',
      surprised: '/gyakusai/saibanchou_no_gavel.png',
      angry: '/gyakusai/saibanchou.png',
      thinking: '/gyakusai/saibanchou_no_gavel.png',
      confident: '/gyakusai/saibanchou_no_gavel.png',
      nervous: '/gyakusai/saibanchou_no_gavel.png',
      breakdown: '/gyakusai/saibanchou_no_gavel.png',
    },
  },
  {
    id: 'witness',
    name: '山田 太郎',
    role: '証人',
    images: {
      normal: '/gyakusai/witness-normal.png',
      surprised: '/gyakusai/witness-surprised.png',
      angry: '/gyakusai/witness-angry.png',
      thinking: '/gyakusai/witness-thinking.png',
      confident: '/gyakusai/witness-confident.png',
      nervous: '/gyakusai/witness-nervous.png',
      breakdown: '/gyakusai/witness-breakdown.png',
    },
  },
];
