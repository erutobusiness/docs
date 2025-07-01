import type { Case } from '@/types/gyakusai';

export class GameManager {
  private case: Case;
  private onGameEnd?: (result: GameEndResult) => void;

  constructor(caseData: Case, onGameEnd?: (result: GameEndResult) => void) {
    this.case = caseData;
    this.onGameEnd = onGameEnd;
  }

  public endGame(result: GameEndResult) {
    // ゲーム終了時の処理
    this.saveGameResult(result);
    this.onGameEnd?.(result);
  }

  private saveGameResult(result: GameEndResult) {
    // ローカルストレージに結果を保存
    const gameHistory = this.getGameHistory();
    gameHistory.push({
      caseId: this.case.id,
      result,
      completedAt: new Date().toISOString(),
    });

    localStorage.setItem('gyakusai_game_history', JSON.stringify(gameHistory));
  }

  private getGameHistory(): GameHistory[] {
    try {
      const history = localStorage.getItem('gyakusai_game_history');
      return history ? JSON.parse(history) : [];
    } catch {
      return [];
    }
  }

  public static getGameStats(caseId?: string): GameStats {
    try {
      const history = localStorage.getItem('gyakusai_game_history');
      const gameHistory: GameHistory[] = history ? JSON.parse(history) : [];

      const filteredHistory = caseId ? gameHistory.filter((h) => h.caseId === caseId) : gameHistory;

      const totalGames = filteredHistory.length;
      const victories = filteredHistory.filter((h) => h.result === 'victory').length;
      const defeats = filteredHistory.filter((h) => h.result === 'defeat').length;

      return {
        totalGames,
        victories,
        defeats,
        winRate: totalGames > 0 ? (victories / totalGames) * 100 : 0,
      };
    } catch {
      return {
        totalGames: 0,
        victories: 0,
        defeats: 0,
        winRate: 0,
      };
    }
  }
}

export type GameEndResult = 'victory' | 'defeat' | 'incomplete';

export interface GameHistory {
  caseId: string;
  result: GameEndResult;
  completedAt: string;
}

export interface GameStats {
  totalGames: number;
  victories: number;
  defeats: number;
  winRate: number;
}
