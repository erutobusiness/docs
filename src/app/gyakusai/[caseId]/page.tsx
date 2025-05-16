import IconButton from '@/components/IconButton';
import CourtRoom from '@/components/gyakusai/CourtRoom';
import { getAllCases, getCaseById } from '@gyakusai/data/caseData';
import { HomeIcon } from '@heroicons/react/24/outline';
import { notFound } from 'next/navigation';

interface Case {
  id: string;
}

type CasePageProps = {
  params: Promise<{
    caseId: string;
  }>;
};

export async function generateStaticParams() {
  const cases = getAllCases();

  return cases.map((caseItem: Case) => ({
    caseId: caseItem.id,
  }));
}

export default async function CasePage({ params }: CasePageProps) {
  const { caseId } = await params;
  const decodedCaseId = decodeURIComponent(caseId);

  // ケースIDからケース情報を取得
  const caseData = getCaseById(decodedCaseId);

  if (!caseData) {
    return notFound();
  }

  return (
    <main className="bg-black min-h-screen overflow-hidden">
      <div className="fixed top-4 left-4 z-50">
        <IconButton
          href="/gyakusai"
          icon={<HomeIcon className="w-6 h-6 text-white" />}
          ariaLabel="ケース一覧へ戻る"
        />
      </div>

      <CourtRoom caseData={caseData} />
    </main>
  );
}
