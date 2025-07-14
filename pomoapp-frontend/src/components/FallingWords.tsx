import React, { useEffect, useState } from 'react';
import './FallingWords.css';

interface FallingWordsProps {
  words: string;
  maxInstances?: number;
}

// アニメーションのスタイル変数をランダム生成する関数
const generateWordStyle = () => {
  const left = Math.random() * 100; // 横位置は0%〜100%の間でランダム

  // 縦位置は上部（-80%〜20%）の間でランダム
  // 画面外や画面上部から様々な高さで出現するように
  const top = Math.random() * 100 - 80;

  // アニメーション遅延も短くして、より早く出現するものを混ぜる
  const delay = Math.random() * 8; // 最大8秒の遅延

  // 落下速度にもバリエーションを持たせる
  const duration = 5 + Math.random() * 10; // 5〜15秒かけて落下

  // 透明度
  const opacity = 0.6 + Math.random() * 0.4;

  // 軽い回転もランダムに
  const rotate = Math.random() > 0.5 ? '3deg' : '-3deg';

  return {
    left: `${left}%`,
    top: `${top}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
    opacity,
    transform: `rotate(${rotate})`,
  };
};

const FallingWords: React.FC<FallingWordsProps> = ({
  words,
  maxInstances = 30,
}) => {
  const [fallingWords, setFallingWords] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    if (!words) return;

    // 単語を分割（スペース、句読点などで区切る）
    const wordArray = words
      .split(/[\s、。．,、]+/)
      .filter((w) => w.trim() !== '');
    const instances = Math.min(maxInstances, 100); // インスタンス数の上限を設定
    const wordsToShow: React.ReactNode[] = [];

    // 最後に使用した単語のインデックスを追跡
    let lastWordIndex = -1;

    // より分散させた位置と遅延でアニメーションを作成
    for (let i = 0; i < instances; i++) {
      // ランダムな単語を選択（直前と同じ単語を避ける）
      let wordIndex = Math.floor(Math.random() * wordArray.length);

      // 直前の単語と同じなら、別の単語を選ぶ
      if (wordIndex === lastWordIndex && wordArray.length > 1) {
        wordIndex = (wordIndex + 1) % wordArray.length;
      }

      lastWordIndex = wordIndex;
      const randomWord = wordArray[wordIndex];
      if (!randomWord) continue;

      // スタイルを生成
      const style = generateWordStyle();

      // ランダムなクラスを割り当て（サイズ変更）
      const rand = Math.random();
      let sizeClass = 'falling-word-normal';
      if (rand > 0.7) {
        sizeClass = 'falling-word-large';
      } else if (rand < 0.3) {
        sizeClass = 'falling-word-small';
      }

      wordsToShow.push(
        <div
          key={`${i}-${randomWord}-${Date.now()}-${Math.random()}`}
          className={`falling-word ${sizeClass}`}
          style={style}
        >
          {randomWord}
        </div>
      );
    }

    setFallingWords(wordsToShow);
  }, [words, maxInstances]);

  if (!words || fallingWords.length === 0) {
    return null;
  }

  return <div className="falling-layer">{fallingWords}</div>;
};

export default FallingWords;
