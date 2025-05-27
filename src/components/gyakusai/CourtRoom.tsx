'use client';

import type { Case, Character, Dialogue, Evidence, Testimony, TestimonyStatement } from '@/types/gyakusai'; // Testimony, TestimonyStatement を追加
import Image from 'next/image';
import { useEffect, useState } from 'react';
import CharacterView from './CharacterView';
import DialogueBox from './DialogueBox';
import EvidencePresentation from './EvidencePresentation';
import ObjectionAnimation from './ObjectionAnimation';
import SoundEffects from './SoundEffects';
import TestimonyView from './TestimonyView'; // 新しく作成したコンポーネントをインポート

interface CourtRoomProps {
  caseData: Case;
}

export default function CourtRoom({ caseData }: CourtRoomProps) {
  const [currentSceneId, setCurrentSceneId] = useState<string>(caseData.initialSceneId);
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState<number>(0);
  const [showObjection, setShowObjection] = useState<boolean>(false);
  const [showEvidence, setShowEvidence] = useState<boolean>(false);
  const [soundToPlay, setSoundToPlay] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(true);
  const [skipTypingTrigger, setSkipTypingTrigger] = useState(0);

  // Testimony states
  const [isTestimonyPhase, setIsTestimonyPhase] = useState<boolean>(false);
  const [currentTestimony, setCurrentTestimony] = useState<Testimony | null>(null);
  const [currentTestimonyStatementId, setCurrentTestimonyStatementId] = useState<string | null>(null);
  const [pendingEvidencePresentationForTestimony, setPendingEvidencePresentationForTestimony] = useState<boolean>(false);
  const [dialogueQueue, setDialogueQueue] = useState<Dialogue[]>([]);
  const [queuedDialogueToShow, setQueuedDialogueToShow] = useState<Dialogue | null>(null);
  const [isDisplayingQueuedDialogue, setIsDisplayingQueuedDialogue] = useState<boolean>(false);

  const currentScene = caseData.scenes.find((scene) => scene.id === currentSceneId);

  const characterMap = caseData.characters.reduce(
    (map, character) => {
      map[character.id] = character;
      return map;
    },
    {} as Record<string, Character>
  );

  const testimonyMap = caseData.testimonies?.reduce(
    (map, testimony) => {
      map[testimony.id] = testimony;
      return map;
    },
    {} as Record<string, Testimony>
  );

  useEffect(() => {
    if (currentScene?.testimonyId && testimonyMap?.[currentScene.testimonyId]) {
      setCurrentTestimony(testimonyMap[currentScene.testimonyId]);
      setIsTestimonyPhase(true);
      // setCurrentDialogueIndex(0); // Resetting dialogue index might not be needed if testimony handles its own flow
    } else {
      setIsTestimonyPhase(false);
      setCurrentTestimony(null);
    }
  }, [currentScene, testimonyMap]);

  const currentDialogue = currentScene?.dialogues[currentDialogueIndex];
  const currentCharacter = currentDialogue ? characterMap[currentDialogue.characterId] : null;

  useEffect(() => {
    // This effect handles sound, objection, and evidence for the *primary* dialogue stream.
    // Dialogue queue items might need their own handling or a unified system.
    if (dialogueQueue.length > 0) {
        const firstInQueue = dialogueQueue[0];
        if (firstInQueue?.sound) setSoundToPlay(firstInQueue.sound);
        if (firstInQueue?.isObjection) setShowObjection(true);
        // showEvidence for queued dialogues might need specific handling if it implies interaction.
    } else if (currentDialogue) {
        if (currentDialogue.sound) setSoundToPlay(currentDialogue.sound);
        if (currentDialogue.isObjection) setShowObjection(true);
        // if (currentDialogue.showEvidence) setShowEvidence(true); // This might be handled by evidenceCheck
    }
  }, [currentDialogue, dialogueQueue]);


  const handleDialogueComplete = () => {
    // キューされたダイアログがあればそれを表示
    if (dialogueQueue.length > 0) {
      const nextDialogueFromQueue = dialogueQueue[0];
      setDialogueQueue(prev => prev.slice(1));
      setQueuedDialogueToShow(nextDialogueFromQueue);
      setIsDisplayingQueuedDialogue(true);
      setIsTyping(true); // 新しいダイアログなのでタイピング開始
      // skipTypingTrigger はここではリセットしない（ユーザーが連続クリックした場合のため）
      return; 
    }

    // キュー表示が終わったらリセット
    if (isDisplayingQueuedDialogue) {
      setIsDisplayingQueuedDialogue(false);
      setQueuedDialogueToShow(null);
    }

    if (!currentScene) return;

    // 証言パートへの移行 (変更なし)
    if (currentScene.testimonyId && testimonyMap?.[currentScene.testimonyId] && !isTestimonyPhase) {
      setIsTestimonyPhase(true);
      setCurrentTestimony(testimonyMap[currentScene.testimonyId]);
      // 最初の証言ステートメントIDを設定
      if (testimonyMap[currentScene.testimonyId].statements.length > 0) {
        setCurrentTestimonyStatementId(testimonyMap[currentScene.testimonyId].statements[0].id);
      }
      return; 
    }
    
    // 通常のダイアログ進行 (既存のロジックを活用)
    const currentDialogues = currentScene.dialogues;
    if (currentDialogueIndex < currentDialogues.length - 1) {
      setCurrentDialogueIndex(currentDialogueIndex + 1);
    } else {
      // シーン末尾の処理 (既存のロジックを活用)
      let nextSceneIdToTransition = currentDialogues[currentDialogues.length - 1]?.nextSceneId;
      if (!nextSceneIdToTransition) {
        const currentSceneGlobalIndex = caseData.scenes.findIndex((scene) => scene.id === currentSceneId);
        if (currentSceneGlobalIndex !== -1 && currentSceneGlobalIndex + 1 < caseData.scenes.length) {
          nextSceneIdToTransition = caseData.scenes[currentSceneGlobalIndex + 1].id;
        }
      }

      if (nextSceneIdToTransition) {
        setIsTestimonyPhase(false); // 通常シーン遷移なので証言フェーズは確実にOFF
        setCurrentSceneId(nextSceneIdToTransition);
        setCurrentDialogueIndex(0);
      } else {
        // biome-ignore lint/suspicious/noConsoleLog: <explanation>
        console.log('ケース終了または次のシーンが定義されていません');
      }
    }
    setIsTyping(true); // 次のダイアログのためにタイピング開始
  };

  const navigateTestimony = (direction: 'next' | 'previous') => {
    console.log('[CourtRoom] navigateTestimony called with direction:', direction);
    if (!currentTestimony || !currentTestimonyStatementId) {
      console.log('[CourtRoom] navigateTestimony: currentTestimony or currentTestimonyStatementId is null. Bailing out.');
      return;
    }

    const statements = currentTestimony.statements;
    const currentIndex = statements.findIndex(s => s.id === currentTestimonyStatementId);
    console.log(`[CourtRoom] navigateTestimony: current statementId: ${currentTestimonyStatementId}, currentIndex: ${currentIndex}`);

    if (currentIndex === -1) {
      console.log('[CourtRoom] navigateTestimony: currentIndex is -1. Bailing out.');
      return;
    }

    let nextIndex;
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % statements.length;
    } else {
      nextIndex = (currentIndex - 1 + statements.length) % statements.length;
    }
    console.log(`[CourtRoom] navigateTestimony: nextIndex calculated: ${nextIndex}`);
    setCurrentTestimonyStatementId(statements[nextIndex].id);
  };

  const handlePreviousTestimonyStatement = () => {
    console.log('[CourtRoom] handlePreviousTestimonyStatement called. isTestimonyPhase:', isTestimonyPhase, 'isDisplayingQueuedDialogue:', isDisplayingQueuedDialogue, 'dialogueQueue.length:', dialogueQueue.length);
    if (isTestimonyPhase && !isDisplayingQueuedDialogue && dialogueQueue.length === 0 && !showEvidence && !showObjection) {
      navigateTestimony('previous');
    }
  };


  const handleObjectionComplete = () => {
    setShowObjection(false);
  };

  const handleTestimonyPress = (statementId: string) => {
    if (!currentTestimony || !currentTestimony.pressActions?.[statementId]) {
      setSoundToPlay('mutter.mp3'); // 仮の効果音
      return;
    }
    const action = currentTestimony.pressActions[statementId];

    if (action.reactionDialogues && action.reactionDialogues.length > 0) {
      setDialogueQueue(prev => [...prev, ...action.reactionDialogues!]);
      // すぐに最初のリアクションダイアログを表示開始
      const firstReaction = action.reactionDialogues[0];
      setQueuedDialogueToShow(firstReaction);
      setIsDisplayingQueuedDialogue(true);
      setIsTyping(true); 
    } else if (action.nextSceneId) { // reactionDialogues がなく、nextSceneId がある場合
      setIsTestimonyPhase(false);
      setCurrentSceneId(action.nextSceneId);
      setCurrentDialogueIndex(0);
      setQueuedDialogueToShow(null); // 念のためリセット
      setIsDisplayingQueuedDialogue(false);
    }
    // 証言更新ロジックは引き続き未実装
    if (action.updatedStatement && currentTestimony) { // この部分は元のコードにもあったので残します
      // biome-ignore lint/suspicious/noConsoleLog: <explanation>
      console.log("Updating statement (not implemented yet):", action.updatedStatement);
      // Proper state update for currentTestimony would be needed here.
    }
  };

  const handleTestimonyPresent = (statementId: string) => {
    if (!currentTestimony) return;
    setCurrentTestimonyStatementId(statementId);
    setPendingEvidencePresentationForTestimony(true);
    setShowEvidence(true); // Show evidence selection screen
    setIsTestimonyPhase(false); // Temporarily exit testimony UI for evidence presentation
  };

  const handleTestimonyStatementChange = (statementId: string) => {
    setCurrentTestimonyStatementId(statementId);
  };

  const handleEvidenceSelection = (evidenceId: string) => {
    setShowEvidence(false);

    if (pendingEvidencePresentationForTestimony && currentTestimony && currentTestimonyStatementId) {
      setPendingEvidencePresentationForTestimony(false);
      const condition = currentTestimony.presentConditions?.[currentTestimonyStatementId];
      let nextScene: string | undefined;
      if (condition && evidenceId === condition.correctEvidenceId) {
        nextScene = condition.correctNextSceneId;
      } else {
        nextScene = currentTestimony.defaultWrongPresentSceneId;
      }
      setCurrentSceneId(nextScene);
      setCurrentDialogueIndex(0);
      setCurrentTestimonyStatementId(null);
      // setIsTestimonyPhase(false); // Scene will determine if it's testimony or not
      return;
    }

    if (!currentScene?.evidenceCheck) return;
    if (evidenceId === currentScene.evidenceCheck.correctEvidenceId) {
      setCurrentSceneId(currentScene.evidenceCheck.correctNextSceneId);
    } else {
      setCurrentSceneId(currentScene.evidenceCheck.wrongNextSceneId);
    }
    setCurrentDialogueIndex(0);
    // setIsTestimonyPhase(false); // Scene change will re-evaluate
  };


  // Global click/input handler
  const handleGlobalAdvance = (
    _: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>
  ) => {
    console.log('[CourtRoom] handleGlobalAdvance called. isTestimonyPhase:', isTestimonyPhase, 'isDisplayingQueuedDialogue:', isDisplayingQueuedDialogue, 'dialogueQueue.length:', dialogueQueue.length, 'showEvidence:', showEvidence, 'showObjection:', showObjection, 'isTyping:', isTyping);
    // isTestimonyPhaseで、リアクションダイアログ表示中でもなく、キューも空の場合に証言を進める
    if (isTestimonyPhase && !isDisplayingQueuedDialogue && dialogueQueue.length === 0 && !showEvidence && !showObjection) {
      if (isTyping) { // これは TestimonyView 内のテキストではなく、CourtRoom が管理する DialogueBox の isTyping を想定しているが、証言中は DialogueBox は表示されないはず。
                     // この条件は証言中は実質的に常にfalseになるはずだが、念のため。
        console.log('[CourtRoom] handleGlobalAdvance: In testimony phase, isTyping is true. Calling setSkipTypingTrigger.');
        setSkipTypingTrigger((prev) => prev + 1);
      } else {
        console.log('[CourtRoom] handleGlobalAdvance: In testimony phase, isTyping is false. Calling navigateTestimony("next").');
        navigateTestimony('next');
      }
      return;
    }

    // 証拠表示中、または異議あり中は進行しない
    if (showEvidence || showObjection) {
      console.log('[CourtRoom] handleGlobalAdvance: showEvidence or showObjection is true. Returning.');
      return;
    }

    if (isTyping) {
      console.log('[CourtRoom] handleGlobalAdvance: isTyping is true. Calling setSkipTypingTrigger.');
      setSkipTypingTrigger((prev) => prev + 1);
    } else {
      console.log('[CourtRoom] handleGlobalAdvance: isTyping is false. Proceeding to dialogue completion logic.');
      // 証言フェーズ中で、かつキューから表示するダイアログがある場合もこちら
      if (dialogueQueue.length > 0 || isDisplayingQueuedDialogue) { // isTestimonyPhaseのチェックは不要、キューがあればフェーズ問わず処理
        console.log('[CourtRoom] handleGlobalAdvance: dialogueQueue has items or isDisplayingQueuedDialogue is true. Calling handleDialogueComplete.');
        handleDialogueComplete(); // キューを進める、またはキュー表示後の通常フローへ
      } else if (!isTestimonyPhase) {
        console.log('[CourtRoom] handleGlobalAdvance: Not in testimony phase. Calling handleDialogueComplete.');
        handleDialogueComplete(); // 通常のダイアログ進行
      }
    }
  };
  
  // Determine which dialogue text and character to display
  // This part is now simplified as DialogueBox props are determined directly in JSX
  const activeDialogue = isDisplayingQueuedDialogue ? queuedDialogueToShow : currentDialogue;
  const activeCharacter = activeDialogue ? characterMap[activeDialogue.characterId] : null;


  if (!currentScene && !activeDialogue && !isTestimonyPhase) {
    // Only if truly nothing to display and not in testimony (which has its own view)
    return <div>シーンまたは表示すべきダイアログが見つかりません</div>;
  }


  return (
    <button
      type="button"
      onClick={handleGlobalAdvance}
      tabIndex={0}
      className="relative w-full min-h-screen max-h-screen overflow-hidden cursor-pointer flex flex-col justify-between focus:outline-none appearance-none border-none p-0 bg-transparent"
      aria-label="画面をクリックまたはEnter/Spaceで進行"
    >
      {/* Background - ensure currentScene is available or use a default */}
      <div className="absolute top-0 left-0 w-full h-full">
        <Image
          src={currentScene?.background || '/gyakusai/houtei_zentai.jpg'} // Fallback background
          alt="法廷の背景"
          fill
          quality={100}
          priority
          className="object-cover"
        />
      </div>
      
      <SoundEffects sound={soundToPlay} onComplete={() => setSoundToPlay(null)} />
      {showObjection && <ObjectionAnimation onComplete={handleObjectionComplete} />}

      {/* Character Display Logic */}
      {/* Priority: Queued dialogue character, then testimony witness, then current scene dialogue character */}
      {isDisplayingQueuedDialogue && queuedDialogueToShow && characterMap[queuedDialogueToShow.characterId] ? (
        <div className="relative flex justify-center mt-auto px-5 min-h-[450px]">
          <CharacterView
            character={characterMap[queuedDialogueToShow.characterId]}
            emotion={queuedDialogueToShow.emotion || 'normal'}
            isShaking={!!queuedDialogueToShow.shake}
          />
        </div>
      ) : isTestimonyPhase && currentTestimony && characterMap[currentTestimony.witnessCharacterId] ? (
        // Testimony phase (no queued dialogue): show witness
        <div className="relative flex justify-center mt-auto px-5 min-h-[450px]">
          <CharacterView
            character={characterMap[currentTestimony.witnessCharacterId]}
            emotion={'normal'} // Witness is generally normal during their testimony
            isShaking={false} // Or based on some state if witness can shake during testimony itself
          />
        </div>
      ) : !isTestimonyPhase && currentDialogue && currentCharacter ? (
        // Regular scene dialogue (no testimony, no queued dialogue)
        <div className="relative flex justify-center mt-auto px-5 min-h-[450px]">
          <CharacterView
            character={currentCharacter}
            emotion={currentDialogue.emotion || 'normal'}
            isShaking={!!currentDialogue.shake}
          />
        </div>
      ) : null }


      {/* Evidence Presentation Modal */}
      {showEvidence && (
        <div
          className="relative p-5 mx-auto my-5 max-w-[900px]"
          onClick={(e) => e.stopPropagation()}
          onKeyUp={(e) => e.stopPropagation()}
        >
          <EvidencePresentation
            evidences={caseData.evidences}
            onSelectEvidence={handleEvidenceSelection}
            prompt={
              pendingEvidencePresentationForTestimony && currentTestimony && currentTestimonyStatementId && currentTestimony.statements.find(s=>s.id === currentTestimonyStatementId)
                ? `「${currentTestimony.statements.find(s=>s.id === currentTestimonyStatementId)!.text.substring(0,20)}...」\nどの証拠をつきつけますか？`
                : currentScene?.evidenceCheck?.question || 'どの証拠を提示しますか？'
            }
          />
        </div>
      )}

      {/* ダイアログボックス または 証言ビュー */}
      {!showEvidence && isTestimonyPhase && currentTestimony && !isDisplayingQueuedDialogue ? (
        <TestimonyView
          testimony={currentTestimony}
          initialStatementId={currentTestimonyStatementId || currentTestimony.statements[0]?.id}
          onPress={handleTestimonyPress}
          onPresent={handleTestimonyPresent}
          onPreviousStatement={handlePreviousTestimonyStatement}
          onStatementChange={handleTestimonyStatementChange}
        />
      ) : !showEvidence && isDisplayingQueuedDialogue && queuedDialogueToShow && characterMap[queuedDialogueToShow.characterId] ? (
        // キューされたダイアログを表示
        <div onClick={(e) => e.stopPropagation()} onKeyUp={(e) => e.stopPropagation()}>
          <DialogueBox
            text={queuedDialogueToShow.text}
            characterName={characterMap[queuedDialogueToShow.characterId]?.name}
            characterRole={characterMap[queuedDialogueToShow.characterId]?.role}
            isTyping={isTyping}
            setIsTyping={setIsTyping}
            skipTypingTrigger={skipTypingTrigger}
          />
        </div>
      ) : !showEvidence && !isTestimonyPhase && currentDialogue && currentCharacter ? (
        // 通常のシーンダイアログを表示
        <div onClick={(e) => e.stopPropagation()} onKeyUp={(e) => e.stopPropagation()}>
          <DialogueBox
            text={currentDialogue.text}
            characterName={currentCharacter?.name}
            characterRole={currentCharacter?.role}
            isTyping={isTyping}
            setIsTyping={setIsTyping}
            skipTypingTrigger={skipTypingTrigger}
          />
        </div>
      ) : null }
    </button>
  );
}
