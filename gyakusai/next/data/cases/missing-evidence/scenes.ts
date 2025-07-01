import type { Scene } from '@/types/gyakusai';

export const missingEvidenceScenes: Scene[] = [
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
        text: '証人、証言をお聞かせください。',
        emotion: 'normal',
      },
      {
        characterId: 'witness',
        text: '承知いたしました。事件当日の様子について証言いたします。',
        emotion: 'normal',
      },
    ],
    testimony: {
      id: 'incident-testimony',
      title: '事件当日の行動について',
      characterId: 'witness',
      introDialogue: [
        {
          characterId: 'witness',
          text: 'では、事件当日の私の行動について詳しく証言いたします。',
          emotion: 'normal',
        },
      ],
      statements: [
        {
          id: 'statement-1',
          text: 'あの日、私は商店街を歩いていました。午後8時15分頃のことです。',
          emotion: 'normal',
          canPress: true,
          pressDialogue: [
            {
              characterId: 'defense',
              text: '午後8時15分と断言されていますが、なぜそんなに正確な時間が分かるのですか？',
              emotion: 'normal',
            },
            {
              characterId: 'witness',
              text: 'その時、腕時計を見ていたからです。商店街の時計台の音も聞こえました。',
              emotion: 'confident',
            },
          ],
        },
        {
          id: 'statement-2',
          text: 'すると、路地裏から大きな物音が聞こえてきたんです。',
          emotion: 'normal',
          canPress: true,
          pressDialogue: [
            {
              characterId: 'defense',
              text: 'どのような物音でしたか？',
              emotion: 'normal',
            },
            {
              characterId: 'witness',
              text: 'ガラスが割れるような音と、何かが倒れる音でした。',
              emotion: 'nervous',
            },
          ],
        },
        {
          id: 'statement-3',
          text: 'のぞいてみると、被告人が被害者と激しく口論していました。',
          emotion: 'normal',
          canPress: true,
          evidenceId: 'security-camera',
          pressDialogue: [
            {
              characterId: 'defense',
              text: '被告人だと確信できたのは何故ですか？',
              emotion: 'normal',
            },
            {
              characterId: 'witness',
              text: '街灯の明かりでよく見えました。間違いありません。',
              emotion: 'confident',
            },
          ],
          evidenceDialogue: [
            {
              characterId: 'defense',
              text: '異議あり！この防犯カメラ映像を見てください！',
              emotion: 'confident',
              isObjection: true,
              sound: 'objection.mp3',
            },
            {
              characterId: 'defense',
              text: '被害者が最後に目撃されたのは午後7時30分。証人の証言する8時15分には既に現場にいなかったのです！',
              emotion: 'confident',
            },
            {
              characterId: 'witness',
              text: 'そ、そんな…確かに見たんです！',
              emotion: 'nervous',
              shake: true,
            },
          ],
        },
        {
          id: 'statement-4',
          text: '被告人は「お前なんか消えてしまえ！」と叫び、その後大きな音がしました。',
          emotion: 'confident',
          canPress: true,
          evidenceId: 'alibi-document',
          pressDialogue: [
            {
              characterId: 'defense',
              text: 'その声は本当に被告人の声だったのですか？',
              emotion: 'normal',
            },
            {
              characterId: 'witness',
              text: 'はい、間違いありません。何度か話したことがありますから。',
              emotion: 'confident',
            },
          ],
          evidenceDialogue: [
            {
              characterId: 'defense',
              text: 'しかし、このアリバイ証明書によれば…',
              emotion: 'confident',
            },
            {
              characterId: 'defense',
              text: '被告人は午後8時から9時まで、別の場所のレストランにいたことが証明されています！',
              emotion: 'confident',
              sound: 'objection.mp3',
            },
            {
              characterId: 'witness',
              text: 'う、嘘です！そんなはず…',
              emotion: 'breakdown',
              shake: true,
            },
            {
              characterId: 'prosecutor',
              text: 'くっ…証人の証言に矛盾が生じている…',
              emotion: 'nervous',
            },
          ],
        },
      ],
      conclusionDialogue: [
        {
          characterId: 'judge',
          text: '証人の証言は以上ですね。弁護側、クロス尋問をどうぞ。',
          emotion: 'normal',
        },
      ],
    },
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
];
