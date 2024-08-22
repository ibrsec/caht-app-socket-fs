const emojiArray = [
    "🌍", "🌕", "🌟", "🌈", "⚡", "🔥", "💧", "❄️", "🍁", "🌻",
    "🌊", "🍀", "🍂", "🌿", "🍃", "🍄", "🌼", "🌺", "🌹", "🌵",
    "🐾", "🦋", "🐞", "🐝", "🐛", "🐚", "🐠", "🐬", "🦈", "🐢",
    "🎨", "🎵", "🎻", "🎺", "🎷", "🎸", "🏅", "🎯", "🎲", "🎮",
    "🧩", "🧵", "🧶", "📚", "✏️", "📌", "📎", "📐", "📏", "🖇️"
  ];
export const getRandomemoji = (idx) => {
    return emojiArray[idx < emojiArray.length ? idx : (idx % emojiArray.length)]
}  