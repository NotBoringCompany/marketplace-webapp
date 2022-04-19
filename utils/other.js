export function getRarityNumber(rarityName) {
    const rarity = ['common', 'uncommon', 'rare', 'epic', 'legendary', 'mythical']

    return rarity.indexOf(rarityName)
}