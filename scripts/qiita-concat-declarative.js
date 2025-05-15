import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { concatMd } from './qiita-concat.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const declarativeMdDir = path.join(__dirname, '..', 'declarative', 'md');
const qiitaPublicDir = path.join(__dirname, '..', 'qiita', 'public');
const outputFileName = 'declarative-combined.md';
const outputFile = path.join(qiitaPublicDir, outputFileName);
const excludeFiles = ['00-rules.md', '99-reference.md'];

const config = {
  title: '宣言的UIとWeb技術の進化（仮）',
  tags: ['Next.js', 'React', 'TypeScript', 'JavaScript', 'declarative'],
  private: true,
  updated_at: `'${(() => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}+09:00`;
  })()}'`, // 現在の日時を YYYY-MM-DDTHH:mm:ss+09:00 形式で設定
  id: '', // 新規投稿の場合は空のまま
  organization_url_name: null,
  slide: false,
  ignorePublish: false,
};

concatMd(declarativeMdDir, excludeFiles, outputFile, config);
