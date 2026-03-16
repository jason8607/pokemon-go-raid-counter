export interface PokemonRaidData {
  id: string;
  name: string;
  nameEn: string;
  types: string[];
  maxCP20: number;
  maxCP25: number;
  imageUrl: string;
  category: 'legendary' | 'primal' | 'shadow';
}

export const RAID_BOSSES: PokemonRaidData[] = [
  // --- Legendary Raids (傳說團體戰) ---
  {
    id: 'mewtwo',
    name: '超夢',
    nameEn: 'Mewtwo',
    types: ['Psychic'],
    maxCP20: 2387,
    maxCP25: 2984,
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png',
    category: 'legendary'
  },
  {
    id: 'articuno',
    name: '急凍鳥',
    nameEn: 'Articuno',
    types: ['Ice', 'Flying'],
    maxCP20: 1743,
    maxCP25: 2179,
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/144.png',
    category: 'legendary'
  },
  {
    id: 'suicune',
    name: '水君',
    nameEn: 'Suicune',
    types: ['Water'],
    maxCP20: 1704,
    maxCP25: 2130,
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/245.png',
    category: 'legendary'
  },

  // --- Primal Raids (原始團體戰) ---
  {
    id: 'kyogre-primal',
    name: '原始蓋歐卡',
    nameEn: 'Primal Kyogre',
    types: ['Water'],
    maxCP20: 2351,
    maxCP25: 2939,
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/382.png',
    category: 'primal'
  },
  {
    id: 'groudon-primal',
    name: '原始固拉多',
    nameEn: 'Primal Groudon',
    types: ['Ground', 'Fire'],
    maxCP20: 2351,
    maxCP25: 2939,
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/383.png',
    category: 'primal'
  },

  // --- Shadow Legendary Raids (傳說暗影團體戰) ---
  {
    id: 'shadow-articuno',
    name: '暗影急凍鳥',
    nameEn: 'Shadow Articuno',
    types: ['Ice', 'Flying'],
    maxCP20: 1743,
    maxCP25: 2179,
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/144.png',
    category: 'shadow'
  },
  {
    id: 'shadow-suicune',
    name: '暗影水君',
    nameEn: 'Shadow Suicune',
    types: ['Water'],
    maxCP20: 1704,
    maxCP25: 2130,
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/245.png',
    category: 'shadow'
  },
  {
    id: 'shadow-kyogre',
    name: '暗影蓋歐卡',
    nameEn: 'Shadow Kyogre',
    types: ['Water'],
    maxCP20: 2351,
    maxCP25: 2939,
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/382.png',
    category: 'shadow'
  },
  {
    id: 'shadow-groudon',
    name: '暗影固拉多',
    nameEn: 'Shadow Groudon',
    types: ['Ground'],
    maxCP20: 2351,
    maxCP25: 2939,
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/383.png',
    category: 'shadow'
  }
];
