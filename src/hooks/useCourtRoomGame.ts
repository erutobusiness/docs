import type { Case } from "@/types/gyakusai";
import { useCallback, useState } from "react";

export interface GameState {
  currentSceneId: string;
  currentDialogueIndex: number;
  showObjection: boolean;
  showEvidence: boolean;
  soundToPlay: string | null;
  isTyping: boolean;
  skipTypingTrigger: number;
}

export function useCourtRoomGame(caseData: Case) {
  const [gameState, setGameState] = useState<GameState>({
    currentSceneId: caseData.initialSceneId,
    currentDialogueIndex: 0,
    showObjection: false,
    showEvidence: false,
    soundToPlay: null,
    isTyping: true,
    skipTypingTrigger: 0,
  });

  const updateGameState = useCallback((updates: Partial<GameState>) => {
    setGameState((prev) => ({ ...prev, ...updates }));
  }, []);

  const advanceDialogue = useCallback(() => {
    const currentScene = caseData.scenes.find(
      (scene) => scene.id === gameState.currentSceneId
    );
    if (!currentScene) return;

    // 証拠チェックが必要な場合
    if (
      currentScene.evidenceCheck &&
      gameState.currentDialogueIndex === currentScene.dialogues.length - 1
    ) {
      updateGameState({ showEvidence: true });
      return;
    }

    // 選択肢がある場合
    if (
      currentScene.choices &&
      gameState.currentDialogueIndex === currentScene.dialogues.length - 1
    ) {
      // 選択肢表示ロジックは別途実装
      return;
    }

    // 次のダイアログがある場合
    if (gameState.currentDialogueIndex < currentScene.dialogues.length - 1) {
      updateGameState({
        currentDialogueIndex: gameState.currentDialogueIndex + 1,
      });
    }
    // 現在のシーンの最後のダイアログの場合
    else {
      const nextSceneIndex =
        caseData.scenes.findIndex(
          (scene) => scene.id === gameState.currentSceneId
        ) + 1;
      if (nextSceneIndex < caseData.scenes.length) {
        updateGameState({
          currentSceneId: caseData.scenes[nextSceneIndex].id,
          currentDialogueIndex: 0,
        });
      } else {
        // ケース終了
        // biome-ignore lint/suspicious/noConsoleLog: ゲーム終了のログ
        console.log("ケース終了");
      }
    }
  }, [
    caseData.scenes,
    gameState.currentSceneId,
    gameState.currentDialogueIndex,
    updateGameState,
  ]);

  const handleEvidenceSelection = useCallback(
    (evidenceId: string) => {
      const currentScene = caseData.scenes.find(
        (scene) => scene.id === gameState.currentSceneId
      );

      updateGameState({ showEvidence: false });

      if (!currentScene?.evidenceCheck) return;

      // 証拠が正しいかどうかチェック
      if (evidenceId === currentScene.evidenceCheck.correctEvidenceId) {
        updateGameState({
          currentSceneId: currentScene.evidenceCheck.correctNextSceneId,
          currentDialogueIndex: 0,
        });
      } else {
        updateGameState({
          currentSceneId: currentScene.evidenceCheck.wrongNextSceneId,
          currentDialogueIndex: 0,
        });
      }
    },
    [caseData.scenes, gameState.currentSceneId, updateGameState]
  );

  const skipTyping = useCallback(() => {
    updateGameState({ skipTypingTrigger: gameState.skipTypingTrigger + 1 });
  }, [gameState.skipTypingTrigger, updateGameState]);

  return {
    gameState,
    updateGameState,
    advanceDialogue,
    handleEvidenceSelection,
    skipTyping,
  };
}
