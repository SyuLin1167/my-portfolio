export type Work = {
  title: string;
  image: string;
  description: string;
  tags: string[];
  skills: string[];
  link: string;
  date: string;
};

export type HistoryItem = {
  year: string;
  badge: string;
  badgeTitle: string;
  descriptions: string[];
};

export type SkillItem = {
  label: string;
  percent: number;
  experience: string;
};

export type SkillCategory = {
  title: string;
  twoColumn?: boolean;
  items: SkillItem[];
};

export const worksData: Work[] = [
  {
    title: 'COMCOM',
    image: '/assets/COMCOM/COMCOM.png',
    description: '2Dジャンプアクションゲーム',
    tags: ['Game', '2D', 'Action'],
    skills: ['c', 'cplusplus', 'photoshop', 'visualstudio'],
    link: '/works/comcom',
    date: '2022.02',
  },
  {
    title: 'HAGE(ヘッジ)',
    image: '/assets/Hage/Hage.png',
    description: '2Dホラーゲーム',
    tags: ['Game', '2D', 'Horror'],
    skills: ['c', 'cplusplus', 'photoshop', 'illustrator', 'visualstudio'],
    link: '/works/hage',
    date: '2022.09',
  },
  {
    title: '怖徘(フハイ)',
    image: '/assets/Huhai/Huhai.png',
    description: '3Dホラーゲーム',
    tags: ['Game', '3D', 'Horror'],
    skills: ['c', 'cplusplus', 'json', 'photoshop', 'illustrator', 'blender', 'github', 'visualstudio'],
    link: '/works/huhai',
    date: '2023.06',
  },
  {
    title: 'AnotherSuffer',
    image: '/assets/AnotherSuffer/AnotherSuffer.png',
    description: '3Dホラーゲーム',
    tags: ['Game', '3D', 'Horror'],
    skills: ['c', 'cplusplus', 'json', 'photoshop', 'illustrator', 'blender', 'github', 'visualstudio'],
    link: '/works/anothersuffer',
    date: '2024.11',
  },
  {
    title: '2DJumpActionSample',
    image: '/assets/2DJumpActionSample/2DJumpActionSample.png',
    description: '2D横スクロールジャンプアクションのサンプル',
    tags: ['Game', '2D', 'Action'],
    skills: ['c', 'cplusplus', 'json', 'bat', 'github', 'visualstudio', 'visualstudiocode'],
    link: '/works/2djumpactionsample',
    date: '2025.07~now',
  },
];

export const historyData: HistoryItem[] = [
  {
    year: '2021',
    badge: '🎓',
    badgeTitle: '学生[1年目]',
    descriptions: [
      '福岡チェイン&テクノロジー専門学校に入学。未経験からC/C++を学び、プログラミングの基礎を習得。',
      'プログラミングに苦戦しつつも自身の自主制作ゲームを完成させ、学内作品投票で1位を獲得。',
    ],
  },
  {
    year: '2022',
    badge: '🎓',
    badgeTitle: '学生[2年目]',
    descriptions: [
      '個人制作ではホラーゲーム開発を通してC++および3D表現への理解を深め、Blender・Photoshopなどでのアセット制作も独学で習得。',
      '自主学習によりプログラミングスキルを向上させながら、後輩への技術指導も行う。',
    ],
  },
  {
    year: '2023',
    badge: '🎓',
    badgeTitle: '学生[3年目]',
    descriptions: [
      '自習や後輩への指導を継続しながら一人称視点の3Dホラーゲームを個人で制作、C++を用いた高度な実装に挑戦。',
      '卒業制作として作品を展示し、来場者から好評を得る。',
    ],
  },
  {
    year: '2024',
    badge: '💼',
    badgeTitle: '新卒',
    descriptions: [
      '新卒としてSES事業部に入社。研修ではWebアプリケーション開発の基礎を学び、良好な評価を得る。',
      '研修後は、サーバー監視業務の案件に配属。現場での実務を通じてITインフラの知識とスキルを習得。',
    ],
  },
  {
    year: '2025〜現在',
    badge: '📌',
    badgeTitle: '現在',
    descriptions: [
      'SES事業部でサーバー監視業務に従事しています。',
      '個人ではホラーゲーム制作を継続しつつ、学生向け教材制作も行っています。',
    ],
  },
];

export const skillCategories: SkillCategory[] = [
  {
    title: '言語・エンジン',
    twoColumn: true,
    items: [
      { label: 'Visual Studio', percent: 90, experience: '5年' },
      { label: 'Visual Studio Code', percent: 20, experience: '1年' },
      { label: 'Unity', percent: 4, experience: '3ヶ月' },
      { label: 'C++', percent: 90, experience: '5年' },
      { label: 'C#', percent: 4, experience: '3ヶ月' },
      { label: 'C', percent: 55, experience: '3年' },
      { label: 'HTML/CSS', percent: 12, experience: '8ヶ月' },
      { label: 'JavaScript', percent: 4, experience: '3ヶ月' },
      { label: 'PHP', percent: 4, experience: '3ヶ月' },
    ],
  },
  {
    title: 'クリエイティブツール',
    items: [
      { label: 'Blender', percent: 35, experience: '2年' },
      { label: 'Photoshop', percent: 55, experience: '3年' },
    ],
  },
  {
    title: 'バージョン管理・クライアント',
    items: [
      { label: 'GitHub', percent: 90, experience: '5年' },
      { label: 'GitLab', percent: 20, experience: '1年' },
      { label: 'Fork', percent: 70, experience: '4年' },
      { label: 'SourceTree', percent: 20, experience: '1年' },
    ],
  },
  {
    title: 'OS',
    items: [
      { label: 'Windows', percent: 90, experience: '5年' },
      { label: 'macOS', percent: 20, experience: '1年' },
      { label: 'Linux', percent: 2, experience: '1ヶ月' },
    ],
  },
];

export const skillIconMap: Record<string, string> = {
  c: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg',
  cplusplus:
    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg',
  photoshop:
    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-original.svg',
  illustrator:
    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/illustrator/illustrator-original.svg',
  blender:
    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/blender/blender-original.svg',
  github:
    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',
  gitlab:
    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gitlab/gitlab-original.svg',
  visualstudiocode:
    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg',
  visualstudio:
    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/visualstudio/visualstudio-original.svg',
  json:
    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/json/json-original.svg',
  bat:
    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/windows8/windows8-original.svg',
};
