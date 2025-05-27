import type { Case, Testimony } from '@/types/gyakusai';

// サンプルケース：「消えた証拠品の謎」
export const sampleCase: Case = {
  id: 'missing-evidence',
  title: '消えた証拠品の謎',
  description: '重要な証拠品が法廷から消えた事件の真相に迫る',
  characters: [
    {
      id: 'defense',
      name: 'エルホド',
      role: '弁護士',
      images: {
        normal: '/gyakusai/eruto-normal.png',
        surprised: '/gyakusai/eruto-surprised.png',
        angry: '/gyakusai/eruto-angry.png',
        thinking: '/gyakusai/eruto-thinking.png',
        confident: '/gyakusai/eruto-confident.png',
        nervous: '/gyakusai/eruto-nervous.png',
        breakdown: '/gyakusai/eruto-breakdown.png',
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
      name: 'ンチョ',
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
  ],
  evidences: [
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
  ],
  testimonies: [ // <--- この testimonies プロパティを追加
    {
      id: 'yamada-testimony-1',
      title: '事件当日の目撃証言',
      witnessCharacterId: 'witness', // 証人・山田太郎のID
      statements: [
        { id: 's1', text: 'あの日、私は確かに見ました。被告人が被害者ともめているのを。' },
        { id: 's2', text: '時間は、そうですね… 夜の8時頃だったと思います。公園の入り口あたりで。' },
        { id: 's3', text: '被告人は何か黒いものを持っていて、それで被害者を…！' },
        { id: 's4', text: 'その後、被告人は慌てた様子で走り去りました。' },
      ],
      pressActions: {
        's2': { // 「夜の8時頃だったと思います」に対して「待った！」
          reactionDialogues: [
            { characterId: 'witness', text: 'う、うーん、確かに8時頃だったはずですが…少し自信がなくなってきました。' },
            { characterId: 'defense', text: '（時刻について、さらに詳しく聞く必要がありそうだ）' }
          ],
          // updatedStatement: { id: 's2', text: '夜の8時…いや、もしかしたら7時半くらいだったかもしれません。公園の入り口です。'} // 証言更新の例 (今回はコメントアウト)
        },
        's3': { // 「被告人は何か黒いものを持っていて…」に対して「待った！」
          reactionDialogues: [
            { characterId: 'witness', text: '黒いもの…ええ、確か棒のようなものだったかと。' },
            { characterId: 'defense', text: '（凶器はハンマーだったはずだが…本当に見間違いではないのか？）' }
          ],
        }
      },
      presentConditions: {
        's2': { // 「夜の8時頃だったと思います」に対して
          correctEvidenceId: 'security-camera', // 防犯カメラ映像 (午後7時30分の記録) をつきつけると矛盾
          correctNextSceneId: 'testimony-s2-correct', // 正解時に遷移する新しいシーンID
        },
        's3': { // 「被告人は何か黒いものを持っていて…」に対して
          correctEvidenceId: 'bloody-hammer',    // 血染めのハンマーをつきつける
          correctNextSceneId: 'testimony-s3-correct', // 正解時に遷移する新しいシーンID
        }
      },
      defaultWrongPresentSceneId: 'testimony-generic-wrong', // 間違い証拠提示時の共通シーンID
    }
  ] as Testimony[], // <--- 型アサーションを追加
  scenes: [
    {
      id: 'intro',
      background: '/gyakusai/houtei_zentai.jpg',
      characters: ['judge', 'defense', 'prosecutor'],
      dialogues: [
        {
          characterId: 'judge',
          text: '法廷を始めます。本日は「消えた証拠品事件」の審議を行います。',
          emotion: 'normal',
        },
        {
          characterId: 'prosecutor',
          text: '検察側の準備は整っています。被告人の犯行は明白です。決定的な証拠と証人の証言があります。',
          emotion: 'confident',
        },
        {
          characterId: 'defense',
          text: '（この事件、不可解な点が多すぎる…。何が真実なのか、突き止めなければ！）',
          emotion: 'thinking',
        },
        {
          characterId: 'judge',
          text: 'では最初の証人を呼んでください。',
          emotion: 'normal',
        },
      ],
    },
    {
      id: 'witness-testimony',
      background: '/gyakusai/houtei_zentai.jpg',
      characters: ['witness', 'judge', 'defense', 'prosecutor'],
      dialogues: [
        {
          characterId: 'judge',
          text: '証人、事件当日の状況について証言をお願いします。',
        },
        {
          characterId: 'witness',
          text: 'はい、わかりました。私が見たままをお話しします。',
          emotion: 'normal',
        }
      ],
      testimonyId: 'yamada-testimony-1' // <--- この行を追加して証言パートへ
    },
    {
      id: 'cross-examination',
      background: '/gyakusai/houtei_zentai.jpg',
      characters: ['defense', 'witness', 'prosecutor', 'judge'],
      dialogues: [
        {
          characterId: 'defense',
          text: '証人。あなたは午後8時15分頃に被告人と被害者を目撃したと証言しましたね？',
          emotion: 'normal',
        },
        {
          characterId: 'witness',
          text: 'ええ、その通りです。時間は正確です。腕時計を見ましたから。',
          emotion: 'normal',
        },
        {
          characterId: 'defense',
          text: 'しかし、そんなことはあり得ません！なぜなら…',
          emotion: 'confident',
          isObjection: true,
          sound: 'objection.mp3',
        },
        {
          characterId: 'witness',
          text: 'な、何だって？',
          emotion: 'nervous',
          shake: true,
        },
        {
          characterId: 'defense',
          text: '決定的な証拠があります。この証拠が証人の証言を覆します！',
          emotion: 'confident',
          showEvidence: 'idid',
        },
      ],
      evidenceCheck: {
        question: 'どの証拠が証人の証言と矛盾していますか？',
        correctEvidenceId: 'alibi-document',
        correctNextSceneId: 'correct-evidence',
        wrongNextSceneId: 'wrong-evidence',
      },
    },
    {
      id: 'correct-evidence',
      background: '/gyakusai/houtei_zentai.jpg',
      characters: ['defense', 'witness', 'prosecutor', 'judge'],
      dialogues: [
        {
          characterId: 'defense',
          text: 'このアリバイ証明書を見てください！被告人は事件発生時刻の午後8時から9時までレストランにいたことが証明されています！',
          emotion: 'confident',
        },
        {
          characterId: 'prosecutor',
          text: 'なっ！？',
          emotion: 'surprised',
          shake: true,
        },
        {
          characterId: 'witness',
          text: 'そ、そんなバカな…',
          emotion: 'nervous',
          shake: true,
        },
        {
          characterId: 'defense',
          text: '証人、あなたは嘘の証言をしたのではありませんか？',
          emotion: 'confident',
        },
        {
          characterId: 'witness',
          text: 'ち、違う…私は…ただ…',
          emotion: 'nervous',
        },
        {
          characterId: 'witness',
          text: 'あああああ！！',
          emotion: 'breakdown',
          shake: true,
          sound: 'breakdown.mp3',
        },
        {
          characterId: 'judge',
          text: '法廷騒然！この新事実を踏まえ、審議を続行します！',
          emotion: 'surprised',
        },
      ],
    },
    {
      id: 'wrong-evidence',
      background: '/gyakusai/houtei_zentai.jpg',
      characters: ['prosecutor', 'defense', 'judge'],
      dialogues: [
        {
          characterId: 'prosecutor',
          text: '異議あり！その証拠は証人の証言と何の矛盾もありません！',
          emotion: 'confident',
          isObjection: true,
          sound: 'objection.mp3',
        },
        {
          characterId: 'defense',
          text: 'くっ…！',
          emotion: 'surprised',
          shake: true,
        },
        {
          characterId: 'judge',
          text: '弁護人、証拠の提示は的確に行ってください。証言の矛盾点を指摘できる証拠を改めて提示してください。',
          emotion: 'normal',
        },
        {
          characterId: 'defense',
          text: '（もう一度考えよう…どの証拠が証人の証言を覆せるか…）',
          emotion: 'thinking',
        },
      ],
    },
    // ... (既存のシーン定義の最後に追加)
    {
      id: 'testimony-s2-correct', // s2への正しい証拠提示後
      background: '/gyakusai/houtei_zentai.jpg',
      characters: ['defense', 'witness', 'prosecutor', 'judge'],
      dialogues: [
        { characterId: 'defense', text: '証人！あなたが見たという時刻は8時頃とのことですが、この防犯カメラ映像には午後7時30分に被害者が映っています！あなたの記憶違いではありませんか？', emotion: 'confident', showEvidence: 'security-camera'},
        { characterId: 'witness', text: 'な、なんですと！？確かに…時間が経って記憶が曖昧になっていたのかもしれません…！', emotion: 'nervous', shake: true },
        { characterId: 'prosecutor', text: '（証言の時刻が曖昧になったか…だが、まだ致命的ではない）', emotion: 'thinking' },
        { characterId: 'judge', text: '証人、時刻については再度記憶を整理してください。弁護人は尋問を続けてください。', nextSceneId: 'continue-testimony-yamada-1' } // testimonyId に戻る (仮)
      ],
    },
    {
      id: 'testimony-s3-correct', // s3への正しい証拠提示後
      background: '/gyakusai/houtei_zentai.jpg',
      characters: ['defense', 'witness', 'prosecutor', 'judge'],
      dialogues: [
        { characterId: 'defense', text: '証人が見たという「黒いもの」…それはこのハンマーのことではないのですか！？', emotion: 'confident', showEvidence: 'bloody-hammer' },
        { characterId: 'witness', text: 'ひっ！そ、それは…！ま、間違いありません、それです！', emotion: 'breakdown', shake: true, sound: 'breakdown.mp3' },
        { characterId: 'prosecutor', text: 'くっ…！', emotion: 'angry' },
        { characterId: 'judge', text: 'なんと！証人は凶器を特定しました！これは重要な証言です！', nextSceneId: 'case-solved-dummy' } // 仮の事件解決シーンへ
      ],
    },
    {
      id: 'testimony-generic-wrong', // 間違い証拠提示時の共通シーン
      background: '/gyakusai/houtei_zentai.jpg',
      characters: ['prosecutor', 'defense', 'judge'],
      dialogues: [
        { characterId: 'prosecutor', text: '異議あり！そんなものは、今の証言とは何の関係もありませんな！', emotion: 'confident', isObjection: true, sound: 'objection.mp3' },
        { characterId: 'defense', text: '（しまった…！ペナルティだ…）', emotion: 'nervous', shake: true },
        { characterId: 'judge', text: '弁護人、的確な証拠提出を心がけるように。尋問を続けたまえ。', nextSceneId: 'continue-testimony-yamada-1' } // testimonyId に戻る (仮)
      ],
    },
    {
      id: 'continue-testimony-yamada-1', // 証言に戻るための一時的なシーン
      background: '/gyakusai/houtei_zentai.jpg',
      characters: ['defense', 'judge'],
      dialogues: [
          { characterId: 'judge', text: '証言の続きをお願いします。'}
      ],
      testimonyId: 'yamada-testimony-1' // 再度同じ証言パートへ
    },
    {
        id: 'case-solved-dummy', // 仮の事件解決シーン
        background: '/gyakusai/houtei_zentai.jpg',
        characters: ['judge', 'defense'],
        dialogues: [
            { characterId: 'judge', text: '素晴らしい！事件は解決です！', emotion: 'confident'},
            { characterId: 'defense', text: 'やりました！', emotion: 'confident'}
        ]
    }
  ],
  initialSceneId: 'intro',
};

// ケースのリストを取得する関数
export function getAllCases() {
  return [
    {
      id: sampleCase.id,
      title: sampleCase.title,
      description: sampleCase.description,
      image: '/gyakusai/images/cases/missing-evidence.jpg',
    },
  ];
}

// IDでケースを取得する関数
export function getCaseById(id: string): Case | undefined {
  if (id === sampleCase.id) {
    return sampleCase;
  }
  return undefined;
}
