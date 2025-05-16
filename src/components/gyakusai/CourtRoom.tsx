'use client';

import { type Case, type Character, Dialogue, type Evidence, Scene } from '@/types/gyakusai';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import CharacterView from './CharacterView';
import DialogueBox from './DialogueBox';
import EvidencePresentation from './EvidencePresentation';
import ObjectionAnimation from './ObjectionAnimation';
import SoundEffects from './SoundEffects';
import styles from './styles/CourtRoom.module.css';

interface CourtRoomProps {
  caseData: Case;
}

export default function CourtRoom({ caseData }: CourtRoomProps) {
  const [currentSceneId, setCurrentSceneId] = useState<string>(caseData.initialSceneId);
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState<number>(0);
  const [skipTyping, setSkipTyping] = useState<boolean>(false); // スキップフラグをステート化して制御可能に
  const [showObjection, setShowObjection] = useState<boolean>(false);
  const [showEvidence, setShowEvidence] = useState<boolean>(false);
  const [soundToPlay, setSoundToPlay] = useState<string | null>(null);

  // 現在のシーンを取得
  const currentScene = caseData.scenes.find((scene) => scene.id === currentSceneId);

  // キャラクターマップを作成（ID -> Character）
  const characterMap = caseData.characters.reduce(
    (map, character) => {
      map[character.id] = character;
      return map;
    },
    {} as Record<string, Character>
  );

  // 証拠品マップを作成（ID -> Evidence）
  // const evidenceMap = caseData.evidences.reduce(
  //   (map, evidence) => {
  //     map[evidence.id] = evidence;
  //     return map;
  //   },
  //   {} as Record<string, Evidence>
  // );

  // 現在のダイアログを取得
  const currentDialogue = currentScene?.dialogues[currentDialogueIndex];
  const currentCharacter = currentDialogue ? characterMap[currentDialogue.characterId] : null;

  useEffect(() => {
    if (currentDialogue?.sound) {
      setSoundToPlay(currentDialogue.sound);
    }

    if (currentDialogue?.isObjection) {
      setShowObjection(true);
    }

    if (currentDialogue?.showEvidence) {
      setShowEvidence(true);
    }
  }, [currentDialogue]);

  const handleDialogueComplete = () => {
    if (!currentScene) return;

    // 証拠チェックが必要な場合
    if (currentScene.evidenceCheck && currentDialogueIndex === currentScene.dialogues.length - 1) {
      setShowEvidence(true);
      return;
    }

    // 選択肢がある場合
    if (currentScene.choices && currentDialogueIndex === currentScene.dialogues.length - 1) {
      // 選択肢表示ロジックは別途実装
      return;
    }

    // 次のダイアログがある場合
    if (currentDialogueIndex < currentScene.dialogues.length - 1) {
      setCurrentDialogueIndex(currentDialogueIndex + 1);
    }
    // 現在のシーンの最後のダイアログの場合
    else {
      // 次のシーンを決定するロジック（仮）
      // 実際にはストーリーの分岐などがある場合は別の処理が必要
      const nextSceneIndex = caseData.scenes.findIndex((scene) => scene.id === currentSceneId) + 1;
      if (nextSceneIndex < caseData.scenes.length) {
        setCurrentSceneId(caseData.scenes[nextSceneIndex].id);
        setCurrentDialogueIndex(0);
      } else {
        // ケース終了
        // biome-ignore lint/suspicious/noConsoleLog: <explanation>
        console.log('ケース終了');
      }
    }
  };

  const handleObjectionComplete = () => {
    setShowObjection(false);
  };

  const handleEvidenceSelection = (evidenceId: string) => {
    setShowEvidence(false);

    if (!currentScene?.evidenceCheck) return;

    // 証拠が正しいかどうかチェック
    if (evidenceId === currentScene.evidenceCheck.correctEvidenceId) {
      setCurrentSceneId(currentScene.evidenceCheck.correctNextSceneId);
    } else {
      setCurrentSceneId(currentScene.evidenceCheck.wrongNextSceneId);
    }
    setCurrentDialogueIndex(0);
  };

  // テキスト表示スピードの切替
  const toggleSkipTyping = () => {
    setSkipTyping(!skipTyping);
  };

  if (!currentScene || !currentDialogue) {
    return <div>シーンが見つかりません</div>;
  }

  return (
    <div className={styles.courtRoomContainer}>
      {/* 背景 */}
      <div className={styles.background}>
        <Image
          src={currentScene.background}
          alt="法廷の背景"
          fill
          quality={100}
          priority
          className={styles.backgroundImage}
        />
      </div>
      {/* 効果音 */}
      <SoundEffects sound={soundToPlay} onComplete={() => setSoundToPlay(null)} />
      {/* 「異議あり！」アニメーション */}
      {showObjection && <ObjectionAnimation onComplete={handleObjectionComplete} />}
      {/* キャラクター */}
      {currentCharacter && (
        <div className={styles.charactersContainer}>
          <CharacterView
            character={currentCharacter}
            emotion={currentDialogue.emotion || 'normal'}
            isShaking={!!currentDialogue.shake}
          />
        </div>
      )}
      {/* 証拠提示 */}
      {showEvidence && currentScene.evidenceCheck && (
        <div className={styles.evidenceContainer}>
          <EvidencePresentation
            evidences={caseData.evidences}
            onSelectEvidence={handleEvidenceSelection}
            prompt={currentScene.evidenceCheck.question}
          />
        </div>
      )}{' '}
      {/* テキスト速度切替ボタン */}
      <div className={styles.controls}>
        <button type="button" onClick={toggleSkipTyping} className={styles.speedToggle}>
          {skipTyping ? '通常速度' : '高速表示'}
        </button>
      </div>
      {/* ダイアログボックス */}
      {!showEvidence && (
        <div className={styles.dialogueContainer}>
          <DialogueBox
            text={currentDialogue.text}
            onComplete={handleDialogueComplete}
            skipTyping={skipTyping}
          />
        </div>
      )}
    </div>
  );
}
