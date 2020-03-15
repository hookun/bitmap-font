import {filledArray} from './util/filledArray';

export const defaultMatrix = {
    matrix: filledArray(81, false),
    width: 9,
    height: 9,
};
export const ExportFormat = {
    None: '',
    SVG: 'SVG',
    PathJS: 'Path JS',
    PathJSON: 'Path JSON',
    MatrixJS: 'Matrix JS',
    MatrixJSON: 'Matrix JSON',
};
export const pages = {
    'かな': [
        'あかさたなはまやらわぁゃ…',
        'いきしちにひみ　りをぃゅ。',
        'うくすつぬふむゆるんぅょ、',
        'えけせてねへめ　れ　ぇっ～',
        'おこそとのほもよろ　ぉー／',
        '・‥（）『』「」♂♀！？　',
    ],
    'が': [
        'あがざだなばまやらわぁゃ　',
        'いぎじぢにびみ　りをぃゅ　',
        'ゔぐずづぬぶむゆるんぅょ　',
        'えげぜでねべめ　れ　ぇっ　',
        'おごぞどのぼもよろ　ぉー／',
        '・‥（）『』「」♂♀！？　',
    ],
    'ぱ': [
        'あかさたなぱまやらわぁゃ　',
        'いきしちにぴみ　りをぃゅ　',
        'うくすつぬぷむゆるんぅょ　',
        'えけせてねぺめ　れ　ぇっ　',
        'おこそとのぽもよろ　ぉー／',
        '・‥（）『』「」♂♀！？　',
    ],
    'カナ': [
        'アカサタナハマヤラワァャ　',
        'イキシチニヒミ　リヲィュ　',
        'ウクスツヌフムユルンゥョヵ',
        'エケセテネヘメ　レ　ェッヶ',
        'オコソトノホモヨロ　ォー／',
        '・‥（）『』「」♂♀！？　',
    ],
    'ガ': [
        'アガザダナバマヤラワァャ　',
        'イギジヂニビミ　リヲィュ　',
        'ヴグズヅヌブムユルンゥョヵ',
        'エゲゼデネベメ　レ　ェッヶ',
        'オゴゾドノボモヨロ　ォー／',
        '・‥（）『』「」♂♀！？　',
    ],
    'パ': [
        'アカサタナパマヤラワァャ　',
        'イキシチニピミ　リヲィュ　',
        'ウクスツヌプムユルンゥョヵ',
        'エケセテネペメ　レ　ェッヶ',
        'オコソトノポモヨロ　ォー／',
        '・‥（）『』「」♂♀！？　',
    ],
    'ABC': [
        'abcdefghijklm',
        'nopqrstuvwxyz',
        'ABCDEFGHIJKLM',
        'NOPQRSTUVWXYZ',
        '0123456789@.&',
        '-_#$%:;*+<=> ',
    ],
};
export const defaultMatixData: {[character: string]: string} = {
    'あ': '9x9|43_41YlkFCcxoM',
    'か': '9x9|814_h9998h28C0',
    'さ': '9x9|27_108vA4w40vw',
    'た': '9x9|87Y81ug20i4wzM',
    'な': '9x9|87K8a4gysAQB30',
    'は': '9x9|wA4DY4wAsAQBz0',
    'ま': '9x9|13_17+11Uhyae0',
    'や': '9x9|i2mdf989e40w40',
    'ら': '9x9|62cg5UMA20g4f0',
    'わ': '9x9|81sYh1od1E929w',
    'ぁ': '9x9|00wv0wfyGCkypw',
    'ゃ': '9x9|02gnDi8h25ww40',
    '…': '9x9|00002iig000000',
    'い': '9x9|044wk2wc1Aaxo0',
    'き': '9x9|23_17+0x_gi0fw',
    'し': '9x9|g20g20g22gi4f0',
    'ち': '9x9|47_810vy20g2fw',
    'に': '9x9|w4+w40w4gA4wzU',
    'ひ': '9x9|Z18gA7wA4wy8e0',
    'み': '9x9|u0g2hWiQzAj410',
    'り': '9x9|23_17+0x_gi0fw',
    'を': '9x9|23_41XhAQ8x07U',
    'ぃ': '9x9|000gy4gi2kiy80',
    'ゅ': '9x9|04gDBiOkiLwgc0',
    '。': '9x9|000000030A4wo0',
    'う': '9x9|f00fC20g20gce0',
    'く': '9x9|0g431wg1w3040g',
    'す': '9x9|17+11Uh28f08e0',
    'つ': '9x9|01YMg1081086f0',
    'ぬ': '9x9|91YplhCcxBJihE',
    'ふ': '9x9|f0g40wiiaxc9e0',
    'む': '9x9|812_90o52Ej2fw',
    'ゆ': '9x9|14_Fe9Fd9DM860',
    'る': '9x9|vM861Ygk169a7w',
    'ん': '9x9|40w810k3hicixw',
    'ぅ': '9x9|01U01Ygg20gce0',
    'ょ': '9x9|00g20u23Mz4ksg',
    '、': '9x9|000000000o1wc0',
    'え': '9x9|f00+w820M928wU',
    'け': '9x9|wA4LY4wA4wA860',
    'せ': '9x9|gy4+W4gyog20fM',
    'て': '9x9|07+10g40w40g1M',
    'ね': '9x9|87sch1od1FFi9E',
    'へ': '9x9|00wa28h44wg100',
    'め': '9x9|91Ypl9GcNAb21w',
    'れ': '9x9|81oYx48z4EF680',
    'ぇ': '9x9|01U03Y10g518gM',
    'っ': '9x9|000fC20g20xU00',
    '～': '9x9|00003wy8e00000',
    'お': '9x9|4DW49YkkxAcxoM',
    'こ': '9x9|03Y000020w40vM',
    'そ': '9x9|vwg47+20w40w3w',
    'と': '9x9|g26b1wg40w20fM',
    'の': '9x9|01YikhychAcypw',
    'ほ': '9x9|DY4DY4wAsAQBz0',
    'も': '9x9|87U810+128h27w',
    'よ': '9x9|20g3Mg23Mz4ksg',
    'ろ': '9x9|vwg41Ygk1082fw',
    'ぉ': '9x9|00wvgxfyyAkypw',
    'ー': '9x9|000000+M000000',
    '／': '9x9|0820w820w820w0',
    '・': '9x9|00000o30000000',
    '‥': '9x9|0000128g000000',
    '（': '9x9|20w81081080w20',
    '）': '9x9|2080w40w40w820',
    '『': '9x9|7wA5wE50E70000',
    '』': '9x9|0003wk2wk6wA7w',
    '「': '9x9|7ww40w40w40000',
    '」': '9x9|0000w40w40w47w',
    '♂': '9x9|20Uawg7148x470',
    '♀': '9x9|e28h28e0wv0w40',
    '！': '9x9|20g20g20g20020',
    '？': '9x9|7x28g20w810010',
    'が': '9x9|8p4_h9998h28y0',
    'ざ': '9x9|2LZ108vA4w40vw',
    'だ': '9x9|8LR81ug20i4wzM',
    'ば': '9x9|wI5LY4wAsAQBz0',
    'ぎ': '9x9|2HZ17+0x_gi0fw',
    'じ': '9x9|g2ahi0g22gi4f0',
    'ぢ': '9x9|4LZ810vy20g2fw',
    'び': '9x9|YF5h46wI4wy8e0',
    'ゔ': '9x9|eE5fC20g20gce0',
    'ぐ': '9x9|0w86H5w306080w',
    'ず': '9x9|1L+11Uh28f08e0',
    'づ': '9x9|0FZMg1081086f0',
    'ぶ': '9x9|f0l4Ewiiaxc9e0',
    'げ': '9x9|wI5LQ4wA4wA860',
    'ぜ': '9x9|gG5+W4gyog20fM',
    'で': '9x9|07_20B8F080w3w',
    'べ': '9x9|0EBa28h44wg100',
    'ご': '9x9|0HR000020w40vM',
    'ぞ': '9x9|vEl47+20w40w3w',
    'ど': '9x9|gG5b1wg40w20fM',
    'ぼ': '9x9|LI9LQ8x4UFBaD0',
    'ぱ': '9x9|xkdLk8x4UFBaC0',
    'ぴ': '9x9|Yh5hk6wI4wy8e0',
    'ぷ': '9x9|fgl4gwiiaxc9e0',
    'ぺ': '9x9|0gBai8h44wg100',
    'ぽ': '9x9|LkdLk8x4UFBaC0',
    'ア': '9x9|+M24gy4wE410g0',
    'カ': '9x9|40w+Ux4918a1xM',
    'サ': '9x9|8x4+V48x40w8e0',
    'タ': '9x9|81+gd14gi1wos0',
    'ナ': '9x9|20g+Ug20g20wo0',
    'ハ': '9x9|8x48x4gi2gk1w8',
    'マ': '9x9|07+0820z860g10',
    'ヤ': '9x9|g1fef14gA40g20',
    'ラ': '9x9|vw007_0g40woc0',
    'ワ': '9x9|+Q2wk20g20w8e0',
    'ァ': '9x9|07_0gy4wE410g0',
    'ャ': '9x9|020bTy8gA40g20',
    'イ': '9x9|0g410Up0810810',
    'キ': '9x9|40w+Mg27_10810',
    'シ': '9x9|o0w0628g40woY0',
    'チ': '9x9|0jY20g+Ug20wo0',
    'ニ': '9x9|03Y00000007_00',
    'ヒ': '9x9|g20gXUg20g20fU',
    'ミ': '9x9|s0s0jw3w2Y0s0g',
    'リ': '9x9|gi2gi2gg20g470',
    'ヲ': '9x9|+M20n_0g20w8e0',
    'ィ': '9x9|0020wot0810810',
    'ュ': '9x9|000vw40w4108+M',
    'ウ': '9x9|47_wk2wg20w860',
    'ク': '9x9|81_8i2wg40wos0',
    'ス': '9x9|+w40w410o4x2M8',
    'ツ': '9x9|04xiah0g20woc0',
    'ヌ': '9x9|vM20hA2w82xyM0',
    'フ': '9x9|07_0g20g20w8e0',
    'ム': '9x9|40w4108x2gTV08',
    'ユ': '9x9|03_0g20g40w4+U',
    'ル': '9x9|918918999haaxw',
    'ン': '9x9|0608810g20wos0',
    'ゥ': '9x9|00gvO2gg20w860',
    'ョ': '9x9|000fM20h_0g2fM',
    'ヵ': '9x9|00w43_4gy4h2hw',
    'エ': '9x9|03_20g20g27+00',
    'ケ': '9x9|810fW4ww410gc0',
    'セ': '9x9|810b+x8h48107M',
    'テ': '9x9|vM007+10810gc0',
    'ネ': '9x9|23_0g431QOog20',
    'ヘ': '9x9|00wa28h44wg100',
    'メ': '9x9|0w48wE30o4x2M0',
    'レ': '9x9|g20g20gi2gyos0',
    'ェ': '9x9|000fwg20g23_00',
    'ッ': '9x9|000Aiiig40woc0',
    'ヶ': '9x9|01081_h4810gc0',
    'オ': '9x9|0w4+Uk4x4gA430',
    'コ': '9x9|07_0g20g20g2+M',
    'ソ': '9x9|wa1g820g410gc0',
    'ト': '9x9|81081M9x281080',
    'ノ': '9x9|0g20g20w410Mo0',
    'ホ': '9x9|20g+Ugiiiych20',
    'モ': '9x9|vMw47+40w40w3M',
    'ヨ': '9x9|vM20g2vM20g2vM',
    'ロ': '9x9|+Q2wk2wk2wn_00',
    'ォ': '9x9|00813_30E92830',
    'ガ': '9x9|4EB+My4h28i2xw',
    'ザ': '9x9|8F5+V48x40w8e0',
    'ダ': '9x9|8FZgl24gk1wos0',
    'バ': '9x9|8F58x4gi2gk1w8',
    'ギ': '9x9|4EB+wg27_10810',
    'ジ': '9x9|oEB0618820wos0',
    'ヂ': '9x9|0HZ20g+Ug20wo0',
    'ビ': '9x9|gG5gPUg20g20fU',
    'ヴ': '9x9|4L_wk20g20w860',
    'グ': '9x9|8FZ8i2wg40wos0',
    'ズ': '9x9|+E50w810o4x2M8',
    'ヅ': '9x9|0IBi2h0820woc0',
    'ブ': '9x9|0LZ0g20g20w860',
    'ゲ': '9x9|8F5fW4ww410gc0',
    'ゼ': '9x9|8F5b+x8h48107M',
    'デ': '9x9|vE507+10810gc0',
    'ベ': '9x9|0EBa28h44wg100',
    'ゴ': '9x9|0LZ0w40w40w4+w',
    'ゾ': '9x9|0I5gi20w410gc0',
    'ド': '9x9|8F581M9x281080',
    'ボ': '9x9|2El+Ugiiiych20',
    'パ': '9x9|8N58N4gi2gk1w8',
    'ピ': '9x9|gi5gPUg20g20fU',
    'プ': '9x9|0nZ0g20g20w860',
    'ペ': '9x9|0gBai8h44wg100',
    'ポ': '9x9|2gl+Ugiiiych20',
    'a': '9x9|000fy20h_gi2fM',
    'b': '9x9|g20n34gi2gj4n0',
    'c': '9x9|0007x2g20g127w',
    'd': '9x9|0g27h6gi2gh67g',
    'e': '9x9|000714gj_g127w',
    'f': '9x9|1wg21Y20g20g20',
    'g': '9x9|000fO2gh_0i2fw',
    'h': '9x9|g20nz2gi2gi2gg',
    'i': '9x9|20020g20g20g20',
    'j': '9x9|0w00w40w40wA30',
    'k': '9x9|8108h491gd148g',
    'l': '9x9|30810810810810',
    'm': '9x9|000ZQhychychy8',
    'n': '9x9|000nz2gi2gi2gg',
    'o': '9x9|000f24wk2wi4f0',
    'p': '9x9|000fx28h2fx080',
    'q': '9x9|0007N28h27M20g',
    'r': '9x9|0005wM40w40w40',
    's': '9x9|000fy2g1Y0i2fw',
    't': '9x9|20gfwg20g20g1w',
    'u': '9x9|000gi2gi2gi6fg',
    'v': '9x9|000gi28x450E20',
    'w': '9x9|000ychBaGlh48w',
    'x': '9x9|000gh450g514gg',
    'y': '9x9|0008h24wA30860',
    'z': '9x9|000fM410g410fM',
    'A': '9x9|20g50E8x4fy2gg',
    'B': '9x9|vy2gi2vy2gi2vw',
    'C': '9x9|714gi0g20gh470',
    'D': '9x9|v24gi2gi2gi4v0',
    'E': '9x9|vO0g20vy0g20vM',
    'F': '9x9|vO0g20vy0g20g0',
    'G': '9x9|714gi0hO2gh470',
    'H': '9x9|gi2gi2vO2gi2gg',
    'I': '9x9|20g20g20g20g20',
    'J': '9x9|0g20g20i2gh470',
    'K': '9x9|gi4h2gk3gh24gg',
    'L': '9x9|g20g20g20g20vM',
    'M': '9x9|we3Mt5EIFBchy8',
    'N': '9x9|gj2kiyiiahi6gg',
    'O': '9x9|714gi2gi2gh470',
    'P': '9x9|vy2gi2vy0g20g0',
    'Q': '9x9|714gi2gi2hh47g',
    'R': '9x9|vy2gi2vy4gi2gg',
    'S': '9x9|fy2gi0fw2gi2fw',
    'T': '9x9|vMg20g20g20g20',
    'U': '9x9|gi2gi2gi2gh470',
    'V': '9x9|gi2gh48wE50g20',
    'W': '9x9|ychyaGliG8x48w',
    'X': '9x9|gi28wE20E8y2gg',
    'Y': '9x9|wa28wE20g20g20',
    'Z': '9x9|vM20w820w820vM',
    '0': '9x9|7N18918918917M',
    '1': '9x9|10o10810810810',
    '2': '9x9|7x28g20w820wfM',
    '3': '9x9|7x28g23w28h27w',
    '4': '9x9|0wc2wA8y4vM40w',
    '5': '9x9|fN081Y8g20h27w',
    '6': '9x9|7x281Y8h28h27w',
    '7': '9x9|fM20w410820g20',
    '8': '9x9|7x28h27x28h27w',
    '9': '9x9|7x28h28g_0h27w',
    '@': '9x9|fy2Dd5EJdCG2e0',
    '.': '9x9|00000000000M60',
    '&': '9x9|61890Ma2ahiceg',
    '-': '9x9|000000vM000000',
    '_': '9x9|000000000000+U',
    '#': '9x9|4gyvV48D_h28h0',
    '$': '9x9|21YiigfwiihY20',
    '%': '9x9|ocyAz820C9a9wM',
    ':': '9x9|00o30000o30000',
    ';': '9x9|00o30000o30820',
    '*': '9x9|00gihk71kigg00',
    '+': '9x9|00g20gvMg20g00',
    '<': '9x9|0gc630w3060c0g',
    '=': '9x9|00003_03_00000',
    '>': '9x9|w3060c0gc630w0',
};
