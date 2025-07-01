'use client';

import type {
  Case,
  Character,
  Dialogue,
  Evidence,
  GameStatus,
  TestimonyStatement,
} from '@/types/gyakusai';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';
import CharacterView from './CharacterView';
import DialogueBox from './DialogueBox';
import EvidencePresentation from './EvidencePresentation';
import ObjectionAnimation from './ObjectionAnimation';
import SoundEffects from './SoundEffects';

interface CourtRoomProps {
  caseData: Case;
}

export default function CourtRoom({ caseData }: CourtRoomProps) {
  const [currentSceneId, setCurrentSceneId] = useState<string>(caseData.initialSceneId);
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState<number>(0);
  const [showObjection, setShowObjection] = useState<boolean>(false);
  const [showEvidence, setShowEvidence] = useState<boolean>(false);
  const [soundToPlay, setSoundToPlay] = useState<string | null>(null); // 証言関連の状態
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
  const [currentTestimonyDialogues, setCurrentTestimonyDialogues] = useState<Dialogue[]>([]);
  const [currentTestimonyDialogueIndex, setCurrentTestimonyDialogueIndex] = useState<number>(0);
  // タイピング状態と全文表示用の関数を管理
  const [isTyping, setIsTyping] = useState(true);
  const [skipTypingTrigger, setSkipTypingTrigger] = useState(0); // DialogueBoxに全文表示を指示するためのトリガー

  // TestimonyPresentation の機能を統合
  const [currentStatementIndex, setCurrentStatementIndex] = useState<number>(0);
  const [showStatementList, setShowStatementList] = useState<boolean>(false);
  const [showEvidenceSelection, setShowEvidenceSelection] = useState<boolean>(false);
  const [selectedStatementId, setSelectedStatementId] = useState<string | null>(null);
  // 現在のシーンを取得
  const currentScene = caseData.scenes.find((scene) => scene.id === currentSceneId);
  // キャラクターマップを作成（ID -> Character）
  const characterMap = useMemo(
    () =>
      caseData.characters.reduce(
        (map, character) => {
          map[character.id] = character;
          return map;
        },
        {} as Record<string, Character>
      ),
    [caseData.characters]
  );

  // 現在のダイアログを取得
  const currentDialogue = currentScene?.dialogues[currentDialogueIndex];

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

  // 証言関連のハンドラー
  const handleTestimonyStart = useCallback(() => {
    if (currentScene?.testimony) {
      setGameStatus('testimony');
      if (currentScene.testimony.introDialogue) {
        setCurrentTestimonyDialogues(currentScene.testimony.introDialogue);
        setCurrentTestimonyDialogueIndex(0);
      }
    }
  }, [currentScene]);

  const handleStatementPress = useCallback(
    (statementId: string) => {
      const statement = currentScene?.testimony?.statements.find((s) => s.id === statementId);
      if (statement?.pressDialogue) {
        setGameStatus('cross_examination');
        setCurrentTestimonyDialogues(statement.pressDialogue);
        setCurrentTestimonyDialogueIndex(0);
      }
    },
    [currentScene]
  );

  const handleEvidencePresent = useCallback(
    (statementId: string, evidenceId: string) => {
      const statement = currentScene?.testimony?.statements.find((s) => s.id === statementId);
      if (statement?.evidenceId === evidenceId && statement.evidenceDialogue) {
        setGameStatus('cross_examination');
        setCurrentTestimonyDialogues(statement.evidenceDialogue);
        setCurrentTestimonyDialogueIndex(0);
      } else {
        // 間違った証拠を提示した場合のダイアログ
        setGameStatus('cross_examination');
        setCurrentTestimonyDialogues([
          {
            characterId: 'judge',
            text: 'その証拠は関係ないようですね。もう一度考えてください。',
            emotion: 'normal',
          },
        ]);
        setCurrentTestimonyDialogueIndex(0);
      }
    },
    [currentScene]
  );

  const handleTestimonyComplete = useCallback(() => {
    if (currentScene?.testimony?.conclusionDialogue) {
      setGameStatus('cross_examination');
      setCurrentTestimonyDialogues(currentScene.testimony.conclusionDialogue);
      setCurrentTestimonyDialogueIndex(0);
    } else {
      setGameStatus('playing');
    }
  }, [currentScene]);
  const handleWaitPressed = useCallback(() => {
    setSoundToPlay('objection.mp3');
    setShowStatementList(true);
  }, []);

  // TestimonyPresentation の機能を統合
  const currentStatement = currentScene?.testimony?.statements[currentStatementIndex];
  // 証言の手動進行
  const handleStatementNext = useCallback(() => {
    if (gameStatus !== 'testimony' || !currentScene?.testimony) return;

    if (isTyping) {
      // タイピング中なら全文表示を指示（次には進まない）
      setSkipTypingTrigger((prev) => prev + 1);
      return;
    }

    if (currentStatementIndex < currentScene.testimony.statements.length - 1) {
      setCurrentStatementIndex(currentStatementIndex + 1);
      setIsTyping(true); // 次のステートメントでタイピングを開始
    } else {
      handleTestimonyComplete();
    }
  }, [
    gameStatus,
    currentScene?.testimony,
    currentStatementIndex,
    isTyping,
    handleTestimonyComplete,
  ]);

  // 証言の前に戻る
  const handleStatementPrev = useCallback(() => {
    if (gameStatus !== 'testimony' || currentStatementIndex <= 0) return;
    setCurrentStatementIndex(currentStatementIndex - 1);
    setIsTyping(true);
  }, [gameStatus, currentStatementIndex]);

  const handleStatementSelect = useCallback(
    (statement: TestimonyStatement) => {
      if (!currentScene?.testimony) return;
      setCurrentStatementIndex(
        currentScene.testimony.statements.findIndex((s) => s.id === statement.id)
      );
      setShowStatementList(false);
    },
    [currentScene?.testimony]
  );

  const handlePressStatement = useCallback(
    (statement: TestimonyStatement) => {
      if (statement.canPress) {
        handleStatementPress(statement.id);
        setShowStatementList(false);
      }
    },
    [handleStatementPress]
  );

  const handlePresentEvidence = useCallback((statement: TestimonyStatement) => {
    setSelectedStatementId(statement.id);
    setShowEvidenceSelection(true);
    setShowStatementList(false);
  }, []);

  const handleEvidenceSelect = useCallback(
    (evidenceId: string) => {
      if (selectedStatementId) {
        handleEvidencePresent(selectedStatementId, evidenceId);
        setShowEvidenceSelection(false);
        setSelectedStatementId(null);
      }
    },
    [selectedStatementId, handleEvidencePresent]
  );
  const handleDialogueComplete = useCallback(() => {
    if (!currentScene) return;

    // 証言シーンの場合、証言を開始
    if (
      currentScene.testimony &&
      currentDialogueIndex === currentScene.dialogues.length - 1 &&
      gameStatus === 'playing'
    ) {
      handleTestimonyStart();
      return;
    }

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
  }, [
    currentScene,
    currentDialogueIndex,
    caseData.scenes,
    currentSceneId,
    gameStatus,
    handleTestimonyStart,
  ]);

  // 証言ダイアログの進行処理
  const handleTestimonyDialogueComplete = useCallback(() => {
    if (currentTestimonyDialogueIndex < currentTestimonyDialogues.length - 1) {
      setCurrentTestimonyDialogueIndex(currentTestimonyDialogueIndex + 1);
    } else {
      // 証言ダイアログ終了後の処理
      setGameStatus('playing');
      setCurrentTestimonyDialogues([]);
      setCurrentTestimonyDialogueIndex(0);
    }
  }, [currentTestimonyDialogueIndex, currentTestimonyDialogues.length]);
  const handleObjectionComplete = useCallback(() => {
    setShowObjection(false);
  }, []);

  const handleEvidenceSelection = useCallback(
    (evidenceId: string) => {
      setShowEvidence(false);

      if (!currentScene?.evidenceCheck) return;

      // 証拠が正しいかどうかチェック
      if (evidenceId === currentScene.evidenceCheck.correctEvidenceId) {
        setCurrentSceneId(currentScene.evidenceCheck.correctNextSceneId);
      } else {
        setCurrentSceneId(currentScene.evidenceCheck.wrongNextSceneId);
      }
      setCurrentDialogueIndex(0);
    },
    [currentScene]
  );
  // 証言ダイアログまたは通常ダイアログを取得
  const displayDialogue =
    gameStatus === 'cross_examination' && currentTestimonyDialogues.length > 0
      ? currentTestimonyDialogues[currentTestimonyDialogueIndex]
      : currentDialogue;

  const displayCharacter = displayDialogue ? characterMap[displayDialogue.characterId] : null;

  if (!currentScene || (!currentDialogue && gameStatus === 'playing')) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">エラー</h2>
          <p>シーンまたはダイアログが見つかりません。</p>
          <p className="text-sm text-gray-400 mt-2">
            シーンID: {currentSceneId}, ダイアログ番号: {currentDialogueIndex}
          </p>
        </div>
      </div>
    );
  } // グローバルクリック・Enter/Spaceで進行する関数
  const handleGlobalAdvance = useCallback(
    (event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) => {
      // キーボードイベントの場合、Enter/Spaceのみ反応
      if (event.type === 'keydown') {
        const keyEvent = event as React.KeyboardEvent<HTMLButtonElement>;
        if (keyEvent.key !== 'Enter' && keyEvent.key !== ' ') {
          return;
        }
      }

      if (showEvidence || showObjection) return;

      // 証言モードの場合は証言専用の処理
      if (gameStatus === 'testimony') {
        if (isTyping) {
          // タイピング中なら全文表示を指示
          setSkipTypingTrigger((prev) => prev + 1);
        } else {
          handleStatementNext();
        }
        return;
      }

      if (isTyping) {
        // タイピング中なら全文表示を指示
        setSkipTypingTrigger((prev) => prev + 1);
      } else {
        if (gameStatus === 'cross_examination') {
          handleTestimonyDialogueComplete();
        } else {
          handleDialogueComplete();
        }
      }
    },
    [
      showEvidence,
      showObjection,
      gameStatus,
      isTyping,
      handleDialogueComplete,
      handleTestimonyDialogueComplete,
      handleStatementNext,
    ]
  );

  // 右クリックで戻る処理
  const handleRightClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (showEvidence || showObjection || showStatementList || showEvidenceSelection) return;

      if (gameStatus === 'testimony') {
        handleStatementPrev();
      }
    },
    [
      showEvidence,
      showObjection,
      showStatementList,
      showEvidenceSelection,
      gameStatus,
      handleStatementPrev,
    ]
  );
  // キーボードイベント
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleGlobalAdvance(e);
      } else if ((e.key === 'Backspace' || e.key === 'ArrowLeft') && gameStatus === 'testimony') {
        e.preventDefault();
        handleStatementPrev();
      }
    },
    [handleGlobalAdvance, handleStatementPrev, gameStatus]
  );
  return (
    <div className="relative w-full min-h-screen max-h-screen overflow-hidden flex flex-col justify-between">
      {/* 背景 */}
      <div className="absolute top-0 left-0 w-full h-full">
        <Image
          src={currentScene.background}
          alt="法廷の背景"
          fill
          quality={100}
          priority
          className="object-cover"
        />
      </div>
      {/* 全体を覆うクリック可能なボタン */}
      <button
        type="button"
        onClick={handleGlobalAdvance}
        onKeyDown={handleKeyDown}
        onContextMenu={handleRightClick}
        tabIndex={0}
        className="absolute inset-0 w-full h-full cursor-pointer focus:outline-none appearance-none border-none p-0 bg-transparent focus:ring-2 focus:ring-blue-500 focus:ring-inset"
        aria-label="画面をクリックまたはEnter/Spaceで進行"
        aria-describedby="game-instructions"
      />
      {/* 効果音 */}
      <SoundEffects sound={soundToPlay} onComplete={() => setSoundToPlay(null)} />
      {/* 「異議あり！」アニメーション */}
      {showObjection && <ObjectionAnimation onComplete={handleObjectionComplete} />}
      {/* 証言表示 */}
      {gameStatus === 'testimony' && currentScene.testimony && (
        <div className="absolute inset-0">
          {/* 証拠選択モーダル */}
          {showEvidenceSelection && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
                <h3 className="text-xl font-bold mb-4 text-black">証拠を選択してください</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {caseData.evidences.map((evidence) => (
                    <button
                      key={evidence.id}
                      type="button"
                      onClick={() => handleEvidenceSelect(evidence.id)}
                      className="border-2 border-gray-300 rounded-lg p-4 hover:border-blue-500 transition-colors"
                    >
                      <Image
                        src={evidence.image}
                        alt={evidence.name}
                        width={150}
                        height={150}
                        className="w-full h-36 object-cover rounded mb-3"
                      />
                      <p className="text-base font-semibold text-black">{evidence.name}</p>
                    </button>
                  ))}
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowEvidenceSelection(false)}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                  >
                    キャンセル
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 証言リストモーダル */}
          {showStatementList && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
                <h3 className="text-xl font-bold mb-4 text-black">
                  {currentScene.testimony.title} - クロス尋問
                </h3>
                <div className="space-y-4">
                  {currentScene.testimony.statements.map((statement, index) => (
                    <div
                      key={statement.id}
                      className={`border-2 rounded-lg p-4 ${
                        index === currentStatementIndex
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-300'
                      }`}
                    >
                      <p className="mb-3 text-black">{statement.text}</p>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleStatementSelect(statement)}
                          className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
                        >
                          聞く
                        </button>
                        {statement.canPress && (
                          <button
                            type="button"
                            onClick={() => handlePressStatement(statement)}
                            className="px-3 py-1 bg-orange-500 text-white rounded text-sm hover:bg-orange-600 transition-colors"
                          >
                            プレス
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handlePresentEvidence(statement)}
                          className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
                        >
                          つきつける
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowStatementList(false)}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                  >
                    証言を続ける
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 証言表示メイン */}
          {!showEvidenceSelection && !showStatementList && (
            <>
              {/* キャラクター表示 */}
              <div className="relative flex justify-center mt-auto px-5 min-h-[500px]">
                <div className="relative">
                  <Image
                    src={
                      characterMap[currentScene.testimony.characterId].images[
                        currentStatement?.emotion || 'normal'
                      ]
                    }
                    alt={characterMap[currentScene.testimony.characterId].name}
                    width={400}
                    height={500}
                    className="object-contain"
                  />
                </div>
              </div>
              {/* 証言タイトル */}
              <div className="absolute top-4 left-4 bg-black bg-opacity-75 text-white px-4 py-2 rounded">
                <h3 className="text-lg font-bold">{currentScene.testimony.title}</h3>
                <p className="text-sm">
                  {characterMap[currentScene.testimony.characterId].name}の証言
                </p>
              </div>
              {/* DialogueBoxを使用した証言表示 */}
              <div
                className="absolute bottom-0 w-full"
                onClick={(e) => e.stopPropagation()}
                onKeyUp={(e) => e.stopPropagation()}
              >
                <DialogueBox
                  text={currentStatement?.text || ''}
                  characterName={characterMap[currentScene.testimony.characterId].name}
                  characterRole={characterMap[currentScene.testimony.characterId].role}
                  isTyping={isTyping}
                  setIsTyping={setIsTyping}
                  skipTypingTrigger={skipTypingTrigger}
                  testimonyMode={true}
                />
              </div>
              {/* 待った！ボタン */}
              <div className="absolute bottom-[170px] right-4">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWaitPressed();
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-3"
                >
                  <Image src="/gyakusai/wait.webp" alt="待った！" width={32} height={32} />
                  <span className="text-lg">待った！</span>
                </button>
              </div>
              {/* ナビゲーションヒント */}
              <div className="absolute bottom-[170px] left-4 bg-black bg-opacity-50 text-white px-3 py-2 rounded text-sm">
                <p>左クリック: 次へ | 右クリック: 戻る</p>
              </div>
              {/* プログレスバー */}
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-300">
                <div
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{
                    width: `${((currentStatementIndex + 1) / currentScene.testimony.statements.length) * 100}%`,
                  }}
                />
              </div>
            </>
          )}
        </div>
      )}
      {/* キャラクター（証言モード以外） */}
      {gameStatus !== 'testimony' && displayCharacter && (
        <div className="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 max-h-[80vh] w-[80vw] pointer-events-none">
          <CharacterView
            character={displayCharacter}
            emotion={displayDialogue?.emotion || 'normal'}
            isShaking={!!displayDialogue?.shake}
          />
        </div>
      )}
      {/* 証拠提示 */}
      {showEvidence && currentScene.evidenceCheck && (
        <div
          className="relative p-5 mx-auto my-5 max-w-[900px]"
          onClick={(e) => e.stopPropagation()}
          onKeyUp={(e) => e.stopPropagation()}
        >
          <EvidencePresentation
            evidences={caseData.evidences}
            onSelectEvidence={handleEvidenceSelection}
            prompt={currentScene.evidenceCheck.question}
          />
        </div>
      )}
      {/* ダイアログボックス（証言モード以外） */}
      {!showEvidence && gameStatus !== 'testimony' && displayDialogue && (
        <div
          className="absolute bottom-0 left-0 right-0 z-10"
          onClick={(e) => e.stopPropagation()}
          onKeyUp={(e) => e.stopPropagation()}
        >
          <DialogueBox
            text={displayDialogue.text}
            characterName={displayCharacter?.name}
            characterRole={displayCharacter?.role}
            isTyping={isTyping}
            setIsTyping={setIsTyping}
            skipTypingTrigger={skipTypingTrigger}
          />
        </div>
      )}
    </div>
  );
}
