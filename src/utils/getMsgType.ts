const isEmoji = (char: string): boolean => {
    const emojiRegex = /\p{Extended_Pictographic}/u;
    return emojiRegex.test(char);
};

export const getTextType = (text: string): 'text' | 'emoji' | 'message' => {
    const chars = Array.from(text);
    let hasText = false;
    let hasEmoji = false;

    for (const char of chars) {
        if (isEmoji(char)) {
            hasEmoji = true;
        } else if (/\S/.test(char)) {
            hasText = true;
        }

        if (hasText && hasEmoji) {
            return 'message';
        }
    }

    if (hasEmoji) return 'emoji';
    if (hasText) return 'text';

    return 'text';
};