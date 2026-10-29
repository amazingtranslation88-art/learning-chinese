import {
  LearningUnit,
  LectureMaterial,
  VideoLesson,
  FreeDocument,
  StudentRank,
  TeacherRank,
  ExerciseQuestion,
} from '../types';
import { YCT1_FOUNDATION_VOCABULARY, YCT1_WORD_VOCAB_ITEMS } from './yct1Vocabulary';

export const PRIMARY_UNITS: LearningUnit[] = [
  {
    id: 'pri-u1',
    grade: 'primary',
    unitNumber: 1,
    titleVi: 'Bài 1: Chào hỏi thân yêu (Xin chào!)',
    titleZh: '第一课：你好！',
    pinyin: 'Dì yī kè: Nǐ hǎo!',
    description: 'Bé học cách chào hỏi bạn bè, thầy cô, người lớn bằng tiếng Trung chuẩn YCT 1.',
    coverImage: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=500&auto=format&fit=crop&q=60',
    vocabulary: [
      { id: 'v1', hanzi: '你', pinyin: 'nǐ', meaningVi: 'Bạn, em, cậu', exampleZh: '你好！', exampleVi: 'Chào bạn!' },
      { id: 'v2', hanzi: '好', pinyin: 'hǎo', meaningVi: 'Tốt, khỏe, đẹp', exampleZh: '老师好！', exampleVi: 'Em chào cô giáo!' },
      { id: 'v3', hanzi: '您', pinyin: 'nín', meaningVi: 'Ngài, thầy/cô (kính trọng)', exampleZh: '您好！', exampleVi: 'Cháu chào bác ạ!' },
      { id: 'v4', hanzi: '再见', pinyin: 'zàijiàn', meaningVi: 'Tạm biệt', exampleZh: '明天再见！', exampleVi: 'Ngày mai gặp lại nhé!' },
      { id: 'v5', hanzi: '谢谢', pinyin: 'xièxie', meaningVi: 'Cảm ơn', exampleZh: '谢谢你！', exampleVi: 'Cảm ơn bạn nhé!' },
      { id: 'v6', hanzi: '不客气', pinyin: 'bú kèqi', meaningVi: 'Đừng khách sáo, không có gì', exampleZh: '不客气！', exampleVi: 'Không có chi đâu!' },
    ],
    grammar: [
      {
        id: 'g1',
        title: 'Mẫu câu chào hỏi cơ bản: [Đại từ / Danh xưng] + 好 (hǎo)',
        structure: 'A + 好 (hǎo)!',
        explanation: 'Khi muốn chào ai đó, các em chỉ cần lấy tên hoặc danh xưng người đó cộng với chữ "好" nhé!',
        examples: [
          { zh: '你好！', pinyin: 'Nǐ hǎo!', vi: 'Chào bạn!' },
          { zh: '老师好！', pinyin: 'Lǎoshī hǎo!', vi: 'Em chào cô/thầy giáo!' },
          { zh: '同学们好！', pinyin: 'Tóngxuémen hǎo!', vi: 'Thầy chào cả lớp!' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'Minh Minh (Tiểu học)', hanzi: '老师好！', pinyin: 'Lǎoshī hǎo!', vi: 'Em chào cô Liên ạ!', avatar: '👦' },
      { speaker: 'Cô Liên', hanzi: '你好，明明！', pinyin: 'Nǐ hǎo, Míngming!', vi: 'Cô chào Minh Minh nhé!', avatar: '👩‍🏫' },
      { speaker: 'Minh Minh', hanzi: '老师，再见！', pinyin: 'Lǎoshī, zàijiàn!', vi: 'Em chào tạm biệt cô ạ!', avatar: '👦' },
      { speaker: 'Cô Liên', hanzi: '再见！', pinyin: 'Zàijiàn!', vi: 'Tạm biệt em!', avatar: '👩‍🏫' }
    ],
    exercises: [
      {
        id: 'e1',
        type: 'quiz',
        question: 'Từ "你好" (Nǐ hǎo) trong tiếng Việt có nghĩa là gì?',
        hanzi: '你好',
        pinyin: 'Nǐ hǎo',
        options: ['Tạm biệt', 'Xin chào', 'Cảm ơn', 'Xin lỗi'],
        answer: 'Xin chào',
        explanation: '“你好” là lời chào thông dụng nhất trong tiếng Trung, gồm “你” (bạn) và “好” (tốt/khỏe).',
        hint: 'Lời chào khi gặp nhau vào buổi sáng.'
      },
      {
        id: 'e2',
        type: 'quiz',
        question: 'Khi cô giáo giúp đỡ em, em cần nói câu nào sau đây?',
        hanzi: '谢谢',
        pinyin: 'Xièxie',
        options: ['再见 (Zàijiàn)', '不客气 (Bú kèqi)', '谢谢 (Xièxie)', '对不起 (Duìbuqǐ)'],
        answer: '谢谢 (Xièxie)',
        explanation: 'Xièxie nghĩa là “Cảm ơn”, dùng khi nhận được sự giúp đỡ.',
        hint: 'Nghĩa là Cảm ơn.'
      },
      {
        id: 'e3',
        type: 'quiz',
        question: 'Chọn cách chào kính trọng lễ phép với thầy cô giáo hoặc người lớn tuổi:',
        hanzi: '您好',
        pinyin: 'Nín hǎo',
        options: ['你好 (Nǐ hǎo)', '您好 (Nín hǎo)', '再见 (Zàijiàn)', '我是 (Wǒ shì)'],
        answer: '您好 (Nín hǎo)',
        explanation: 'Chữ “您” (Nín) có bộ Tâm ở dưới, thể hiện sự kính trọng với thầy cô, ông bà.',
        hint: 'Có bộ Tâm (心) ở dưới chữ 你.'
      },
      {
        id: 'e4',
        type: 'quiz',
        question: 'Từ "再见" (Zàijiàn) có ý nghĩa là gì?',
        hanzi: '再见',
        pinyin: 'Zàijiàn',
        options: ['Xin chào', 'Hẹn gặp lại / Tạm biệt', 'Chúc ngủ ngon', 'Không sao cả'],
        answer: 'Hẹn gặp lại / Tạm biệt',
        explanation: '再 (lại) + 见 (gặp) = Tạm biệt, hẹn gặp lại!',
        hint: 'Nói khi chia tay tan học.'
      },
      {
        id: 'e5',
        type: 'quiz',
        question: 'Khi bạn nói "谢谢" (Cảm ơn), em đáp lại lịch sự bằng câu gì?',
        hanzi: '不客气',
        pinyin: 'Bú kèqi',
        options: ['不客气 (Bú kèqi)', '你好 (Nǐ hǎo)', '再见 (Zàijiàn)', '没关系 (Méi guānxi)'],
        answer: '不客气 (Bú kèqi)',
        explanation: '不客气 nghĩa là không có gì, đừng khách sáo.',
        hint: 'Không có chi / Không khách sáo.'
      }
    ],
    pdfDownloadUrl: 'https://example.com/tai-lieu-lop1-unit1.pdf'
  },
  {
    id: 'pri-u2',
    grade: 'primary',
    unitNumber: 2,
    titleVi: 'Bài 2: Số đếm diệu kỳ (1 đến 10)',
    titleZh: '第二课：数字歌',
    pinyin: 'Dì èr kè: Shùzì gē',
    description: 'Bé làm quen với các con số từ 1 đến 10 bằng các ngón tay và bài đồng dao vui tươi.',
    coverImage: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=500&auto=format&fit=crop&q=60',
    vocabulary: [
      { id: 'v21', hanzi: '一', pinyin: 'yī', meaningVi: 'Số 1', exampleZh: '一个苹果', exampleVi: 'Một quả táo' },
      { id: 'v22', hanzi: '二', pinyin: 'èr', meaningVi: 'Số 2', exampleZh: '二本书', exampleVi: 'Hai quyển sách' },
      { id: 'v23', hanzi: '三', pinyin: 'sān', meaningVi: 'Số 3', exampleZh: '三个朋友', exampleVi: 'Ba người bạn' },
      { id: 'v24', hanzi: '四', pinyin: 'sì', meaningVi: 'Số 4', exampleZh: '四只小鸟', exampleVi: 'Bốn chú chim non' },
      { id: 'v25', hanzi: '五', pinyin: 'wǔ', meaningVi: 'Số 5', exampleZh: '五角星', exampleVi: 'Ngôi sao 5 cánh' },
      { id: 'v26', hanzi: '六', pinyin: 'liù', meaningVi: 'Số 6', exampleZh: '六点钟', exampleVi: 'Sáu giờ' },
      { id: 'v27', hanzi: '七', pinyin: 'qī', meaningVi: 'Số 7', exampleZh: '七天', exampleVi: 'Bảy ngày' },
      { id: 'v28', hanzi: '八', pinyin: 'bā', meaningVi: 'Số 8', exampleZh: '八月', exampleVi: 'Tháng 8' },
      { id: 'v29', hanzi: '九', pinyin: 'jiǔ', meaningVi: 'Số 9', exampleZh: '九条鱼', exampleVi: 'Chín con cá' },
      { id: 'v30', hanzi: '十', pinyin: 'shí', meaningVi: 'Số 10', exampleZh: '十分好', exampleVi: 'Rất tốt, mười điểm' },
    ],
    grammar: [
      {
        id: 'g2',
        title: 'Đếm số lượng đồ vật: [Số đếm] + 个 (gè) + Danh từ',
        structure: 'Số + 个 (gè) + Danh từ',
        explanation: 'Chữ “个” (gè) là lượng từ phổ biến nhất trong tiếng Trung.',
        examples: [
          { zh: '三个学生', pinyin: 'Sān gè xuésheng', vi: 'Ba bạn học sinh' },
          { zh: '五个苹果', pinyin: 'Wǔ gè píngguǒ', vi: 'Năm quả táo' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'Lan Lan', hanzi: '你几岁？', pinyin: 'Nǐ jǐ suì?', vi: 'Bạn mấy tuổi rồi?', avatar: '👧' },
      { speaker: 'Bảo Bảo', hanzi: '我七岁。', pinyin: 'Wǒ qī suì.', vi: 'Mình 7 tuổi rồi nè.', avatar: '👦' }
    ],
    exercises: [
      {
        id: 'e21',
        type: 'quiz',
        question: 'Chữ Hán nào dưới đây đại diện cho số 8?',
        hanzi: '八',
        pinyin: 'bā',
        options: ['六 (liù)', '八 (bā)', '十 (shí)', '四 (sì)'],
        answer: '八 (bā)',
        explanation: '八 đọc là “bā”, nghĩa là số 8.',
        hint: 'Hai nét xoè ra như số 8 phát tài.'
      },
      {
        id: 'e22',
        type: 'quiz',
        question: 'Kết quả của phép tính: 三 (3) + 五 (5) = ?',
        hanzi: '三 + 五 = ?',
        pinyin: 'sān + wǔ = ?',
        options: ['七 (7)', '八 (8)', '九 (9)', '六 (6)'],
        answer: '八 (8)',
        explanation: '3 + 5 = 8 (八 - bā)',
        hint: 'Ba cộng năm bằng mấy?'
      },
      {
        id: 'e23',
        type: 'quiz',
        question: 'Chữ "十" biểu thị con số nào?',
        hanzi: '十',
        pinyin: 'shí',
        options: ['1', '4', '7', '10'],
        answer: '10',
        explanation: 'Chữ 十 giống dấu cộng, là số 10.',
        hint: 'Số lớn nhất trong bàn tay đôi.'
      },
      {
        id: 'e24',
        type: 'quiz',
        question: 'Phiên âm của số 4 (四) là gì?',
        hanzi: '四',
        pinyin: 'sì',
        options: ['shí', 'sì', 'sān', 'qī'],
        answer: 'sì',
        explanation: '四 đọc là sì (thanh 4).',
        hint: 'Phát âm là sì.'
      },
      {
        id: 'e25',
        type: 'quiz',
        question: 'Đoán từ: "五个苹果" nghĩa là gì?',
        hanzi: '五个苹果',
        pinyin: 'wǔ gè píngguǒ',
        options: ['3 quả táo', '5 quả táo', '7 quả táo', '10 quả cam'],
        answer: '5 quả táo',
        explanation: '五 là số 5, 苹果 là quả táo.',
        hint: '五 = 5.'
      }
    ]
  },
  {
    id: 'pri-u3',
    grade: 'primary',
    unitNumber: 3,
    titleVi: 'Bài 3: Gia đình ấm áp của em',
    titleZh: '第三课：我的家',
    pinyin: 'Dì sān kè: Wǒ de jiā',
    description: 'Học cách gọi tên các thành viên yêu quý: Bố, Mẹ, Anh, Chị, Em...',
    coverImage: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=500&auto=format&fit=crop&q=60',
    vocabulary: [
      { id: 'v31', hanzi: '爸爸', pinyin: 'bàba', meaningVi: 'Bố, ba', exampleZh: '我爸爸很高。', exampleVi: 'Bố mình rất cao.' },
      { id: 'v32', hanzi: '妈妈', pinyin: 'māma', meaningVi: 'Mẹ, má', exampleZh: '我爱妈妈。', exampleVi: 'Con yêu mẹ.' },
      { id: 'v33', hanzi: '哥哥', pinyin: 'gēge', meaningVi: 'Anh trai', exampleZh: '哥哥在看书。', exampleVi: 'Anh trai đang đọc sách.' },
      { id: 'v34', hanzi: '姐姐', pinyin: 'jiějie', meaningVi: 'Chị gái', exampleZh: '姐姐很漂亮。', exampleVi: 'Chị gái rất xinh đẹp.' },
      { id: 'v35', hanzi: '弟弟', pinyin: 'dìdi', meaningVi: 'Em trai', exampleZh: '弟弟很可爱。', exampleVi: 'Em trai rất đáng yêu.' },
      { id: 'v36', hanzi: '妹妹', pinyin: 'mèimei', meaningVi: 'Em gái', exampleZh: '妹妹爱唱歌。', exampleVi: 'Em gái thích hát.' },
    ],
    grammar: [
      {
        id: 'g3',
        title: 'Mẫu câu biểu thị sở hữu: [Chủ ngữ] + 的 (de) + Danh từ',
        structure: 'A + 的 + B',
        explanation: 'Chữ “的” tương đương chữ “của” trong tiếng Việt.',
        examples: [
          { zh: '我的妈妈', pinyin: 'Wǒ de māma', vi: 'Mẹ của tôi' },
          { zh: '他的哥哥', pinyin: 'Tā de gēge', vi: 'Anh trai của bạn ấy' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'Bạn Hoa', hanzi: '这是谁？', pinyin: 'Zhè shì shéi?', vi: 'Đây là ai thế bạn?', avatar: '👧' },
      { speaker: 'Bạn Nam', hanzi: '这是我爸爸，这是我妈妈。', pinyin: 'Zhè shì wǒ bàba, zhè shì wǒ māma.', vi: 'Đây là bố mình, còn đây là mẹ mình.', avatar: '👦' }
    ],
    exercises: [
      {
        id: 'e31',
        type: 'quiz',
        question: 'Từ "妈妈" (māma) trong tiếng Việt là ai?',
        hanzi: '妈妈',
        pinyin: 'māma',
        options: ['Bà nội', 'Mẹ', 'Chị gái', 'Cô giáo'],
        answer: 'Mẹ',
        explanation: '妈妈 nghĩa là Mẹ, có bộ Nữ (女) đứng trước.',
        hint: 'Người sinh ra em.'
      },
      {
        id: 'e32',
        type: 'quiz',
        question: 'Để nói "Anh trai của tôi", em chọn câu nào?',
        hanzi: '我的哥哥',
        pinyin: 'wǒ de gēge',
        options: ['我的哥哥', '我的弟弟', '我的姐姐', '我的爸爸'],
        answer: '我的哥哥',
        explanation: '哥哥 là anh trai, 我的哥哥 là anh trai của tôi.',
        hint: '哥哥 = anh trai.'
      },
      {
        id: 'e33',
        type: 'quiz',
        question: 'Từ "妹妹" (mèimei) chỉ người thân nào?',
        hanzi: '妹妹',
        pinyin: 'mèimei',
        options: ['Em gái', 'Chị gái', 'Em trai', 'Bác gái'],
        answer: 'Em gái',
        explanation: '妹妹 là em gái nhỏ trong nhà.',
        hint: 'Bé gái nhỏ hơn mình.'
      },
      {
        id: 'e34',
        type: 'quiz',
        question: 'Dịch câu: "我爱爸爸妈妈。"',
        hanzi: '我爱爸爸妈妈。',
        pinyin: 'Wǒ ài bàba māma.',
        options: ['Bố mẹ yêu tôi.', 'Tôi yêu bố mẹ.', 'Bố yêu mẹ.', 'Tôi nhớ bố mẹ.'],
        answer: 'Tôi yêu bố mẹ.',
        explanation: '我 (Tôi) + 爱 (yêu) + 爸爸妈妈 (bố mẹ).',
        hint: '爱 nghĩa là Yêu thương.'
      },
      {
        id: 'e35',
        type: 'quiz',
        question: 'Chữ "家" trong "我的家" có nghĩa là gì?',
        hanzi: '家',
        pinyin: 'jiā',
        options: ['Trường học', 'Gia đình / Ngôi nhà', 'Bệnh viện', 'Công viên'],
        answer: 'Gia đình / Ngôi nhà',
        explanation: '家 (jiā) nghĩa là gia đình hoặc tổ ấm ngôi nhà.',
        hint: 'Tổ ấm của chúng ta.'
      }
    ]
  }
];

export const GRADE_6_UNITS: LearningUnit[] = [
  {
    id: 'g6-u1',
    grade: 'grade6',
    unitNumber: 1,
    titleVi: 'Unit 1: Xin chào & Làm quen bạn mới',
    titleZh: '第一单元：你好，新朋友！',
    pinyin: 'Dì yī dānyuán: Nǐ hǎo, xīn péngyou!',
    description: 'Chương trình GDPT 2018: Giới thiệu họ tên, quốc tịch, làm quen bạn mới trong lớp học.',
    coverImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&auto=format&fit=crop&q=60',
    vocabulary: [
      { id: 'g6v1', hanzi: '叫', pinyin: 'jiào', meaningVi: 'Tên là, gọi là', exampleZh: '我叫李明。', exampleVi: 'Tôi tên là Lý Minh.' },
      { id: 'g6v2', hanzi: '名字', pinyin: 'míngzi', meaningVi: 'Tên', exampleZh: '你叫什么名字？', exampleVi: 'Bạn tên là gì?' },
      { id: 'g6v3', hanzi: '什么', pinyin: 'shénme', meaningVi: 'Cái gì', exampleZh: '这是什么？', exampleVi: 'Đây là cái gì thế?' },
      { id: 'g6v4', hanzi: '是', pinyin: 'shì', meaningVi: 'Là, đúng', exampleZh: '我是学生。', exampleVi: 'Tôi là học sinh.' },
      { id: 'g6v5', hanzi: '学生', pinyin: 'xuésheng', meaningVi: 'Học sinh', exampleZh: '我们都是好学生。', exampleVi: 'Chúng tôi đều là học sinh chăm ngoan.' },
      { id: 'g6v6', hanzi: '老师', pinyin: 'lǎoshī', meaningVi: 'Thầy / Cô giáo', exampleZh: 'Liên 老师是我的中文老师。', exampleVi: 'Cô Liên là giáo viên tiếng Trung của tôi.' },
      { id: 'g6v7', hanzi: '越南', pinyin: 'Yuènán', meaningVi: 'Việt Nam', exampleZh: '我是越南人。', exampleVi: 'Tôi là người Việt Nam.' },
      { id: 'g6v8', hanzi: '中国', pinyin: 'Zhōngguó', meaningVi: 'Trung Quốc', exampleZh: '我想去中国旅游。', exampleVi: 'Tôi muốn đi Trung Quốc du lịch.' },
    ],
    grammar: [
      {
        id: 'g6g1',
        title: 'Mẫu câu hỏi tên: 你叫什么名字？(Nǐ jiào shénme míngzi?)',
        structure: 'Chủ ngữ + 叫 + gì?',
        explanation: 'Dùng đại từ nghi vấn 什么 (shénme) đặt trước danh từ để hỏi.',
        examples: [
          { zh: '你叫什么名字？', pinyin: 'Nǐ jiào shénme míngzi?', vi: 'Bạn tên là gì?' },
          { zh: '我叫阮文南。', pinyin: 'Wǒ jiào Ruǎn Wénnán.', vi: 'Tôi tên là Nguyễn Văn Nam.' }
        ]
      },
      {
        id: 'g6g2',
        title: 'Câu phán đoán với 是: A 是 B',
        structure: 'Chủ ngữ + 是 + Tân ngữ',
        explanation: 'Khẳng định A là B. Dạng phủ định dùng “不是” (bú shì).',
        examples: [
          { zh: '我是越南人。', pinyin: 'Wǒ shì Yuènán rén.', vi: 'Tôi là người Việt Nam.' },
          { zh: '他不是老师，他是学生。', pinyin: 'Tā bú shì lǎoshī, tā shì xuésheng.', vi: 'Bạn ấy không phải là giáo viên, bạn ấy là học sinh.' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'Học sinh mới (Lý Minh)', hanzi: '你好！请问你叫什么名字？', pinyin: 'Nǐ hǎo! Qǐngwèn nǐ jiào shénme míngzi?', vi: 'Xin chào! Xin hỏi bạn tên là gì?', avatar: '👦' },
      { speaker: 'Lan Hương (Lớp 6A)', hanzi: '你好！我叫兰香。你是哪国人？', pinyin: 'Nǐ hǎo! Wǒ jiào Lánxiāng. Nǐ shì nǎ guó rén?', vi: 'Chào bạn! Mình tên là Lan Hương. Bạn là người nước nào?', avatar: '👧' },
      { speaker: 'Lý Minh', hanzi: '我是中国人。我是新同学。很高兴认识你！', pinyin: 'Wǒ shì Zhōngguó rén. Wǒ shì xīn tóngxué. Hěn gāoxìng rènshi nǐ!', vi: 'Mình là người Trung Quốc. Mình là bạn mới chuyển đến. Rất vui được quen bạn!', avatar: '👦' },
      { speaker: 'Lan Hương', hanzi: '我也很高兴认识你！欢迎来到我们班！', pinyin: 'Wǒ yě hěn gāoxìng rènshi nǐ! Huānyíng lái dào wǒmen bān!', vi: 'Mình cũng rất vui được làm quen bạn! Chào mừng bạn đến lớp 6 của chúng mình!', avatar: '👧' }
    ],
    exercises: [
      {
        id: 'g6e1',
        type: 'quiz',
        question: 'Để hỏi tên người khác bằng tiếng Trung, câu chuẩn xác là gì?',
        hanzi: '你叫什么名字？',
        pinyin: 'Nǐ jiào shénme míngzi?',
        options: ['你叫什么名字？', '你是哪国人？', '你在做什么？', '你去哪里？'],
        answer: '你叫什么名字？',
        explanation: '“你叫什么名字？” là mẫu câu giao tiếp cơ bản hỏi tên.',
        hint: 'Có từ 名字 (tên).'
      },
      {
        id: 'g6e2',
        type: 'quiz',
        question: 'Dịch câu "Tôi là người Việt Nam" sang tiếng Trung:',
        hanzi: '我是越南人。',
        pinyin: 'Wǒ shì Yuènán rén.',
        options: ['我是中国人。', '我是越南人。', '我是英国人。', '我是日本人。'],
        answer: '我是越南人。',
        explanation: '越南 (Yuènán) là Việt Nam, 越南人 là người Việt Nam.',
        hint: 'Việt Nam đọc là Yuènán.'
      },
      {
        id: 'g6e3',
        type: 'quiz',
        question: 'Điền từ còn thiếu vào chỗ trống: "很高兴____你！" (Rất vui được quen biết bạn)',
        hanzi: '很高兴____你！',
        pinyin: 'Hěn gāoxìng ____ nǐ!',
        options: ['认识 (rènshi)', '名字 (míngzi)', '再见 (zàijiàn)', '学习 (xuéxí)'],
        answer: '认识 (rènshi)',
        explanation: '认识 (rènshi) nghĩa là quen biết, nhận biết.',
        hint: 'Quen biết bạn.'
      },
      {
        id: 'g6e4',
        type: 'quiz',
        question: 'Phủ định của "是" (shì - là) trong tiếng Trung là gì?',
        hanzi: '不是',
        pinyin: 'bú shì',
        options: ['没是', '不是', '不有', '莫是'],
        answer: '不是',
        explanation: 'Dùng phó từ “不” trước “是” tạo thành “不是” (bú shì - không phải).',
        hint: 'Chữ 不 biến điệu thành bú.'
      },
      {
        id: 'g6e5',
        type: 'quiz',
        question: 'Khi một bạn nói: "很高兴认识你！", bạn nên đáp lại như thế nào?',
        hanzi: '我也很高兴认识你！',
        pinyin: 'Wǒ yě hěn gāoxìng rènshi nǐ!',
        options: ['我也很高兴认识你！', '对不起！', '谢谢你！', '不用谢！'],
        answer: '我也很高兴认识你！',
        explanation: 'Chữ “也” (yě) nghĩa là “cũng”. “Tôi cũng rất vui được quen bạn!”',
        hint: 'Có chữ 也 (cũng).'
      }
    ]
  },
  {
    id: 'g6-u2',
    grade: 'grade6',
    unitNumber: 2,
    titleVi: 'Unit 2: Trường học & Đồ dùng học tập',
    titleZh: '第二单元：我的学校与文具',
    pinyin: 'Dì èr dānyuán: Wǒ de xuéxiào yǔ wénjù',
    description: 'Miêu tả trường lớp thân yêu, sách vở, bút chì, thước kẻ và phòng học.',
    coverImage: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=500&auto=format&fit=crop&q=60',
    vocabulary: [
      { id: 'g6v21', hanzi: '学校', pinyin: 'xuéxiào', meaningVi: 'Trường học', exampleZh: '我们的学校很大。', exampleVi: 'Trường học của chúng tôi rất to.' },
      { id: 'g6v22', hanzi: '教室', pinyin: 'jiàoshì', meaningVi: 'Phòng học, lớp học', exampleZh: '教室里很干净。', exampleVi: 'Trong lớp học rất sạch sẽ.' },
      { id: 'g6v23', hanzi: '书包', pinyin: 'shūbāo', meaningVi: 'Cặp sách', exampleZh: '我的书包是蓝色的。', exampleVi: 'Cặp sách của tôi màu xanh dương.' },
      { id: 'g6v24', hanzi: '笔', pinyin: 'bǐ', meaningVi: 'Bút viết', exampleZh: '这支笔很好写。', exampleVi: 'Chiếc bút này viết rất êm.' },
      { id: 'g6v25', hanzi: '本子', pinyin: 'běnzi', meaningVi: 'Vở, cuốn tập', exampleZh: '我有五个本子。', exampleVi: 'Tôi có 5 quyển vở.' },
      { id: 'g6v26', hanzi: '尺子', pinyin: 'chǐzi', meaningVi: 'Thước kẻ', exampleZh: '借我一把尺子好吗？', exampleVi: 'Cho mình mượn cây thước kẻ nhé?' },
    ],
    grammar: [
      {
        id: 'g6g3',
        title: 'Mẫu câu tồn tại biểu thị sở hữu: 有 (yǒu) / 没有 (méiyǒu)',
        structure: 'Chủ ngữ + 有 / 没有 + Danh từ',
        explanation: 'Biểu thị ai đó có hoặc không có cái gì.',
        examples: [
          { zh: '我有一只可爱的猫。', pinyin: 'Wǒ yǒu yī zhī kě’ài de māo.', vi: 'Tôi có một chú mèo đáng yêu.' },
          { zh: '我没有铅笔。', pinyin: 'Wǒ méiyǒu qiānbǐ.', vi: 'Mình không có bút chì.' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'Nam', hanzi: '你的书包里有什么？', pinyin: 'Nǐ de shūbāo lǐ yǒu shénme?', vi: 'Trong cặp sách của bạn có gì thế?', avatar: '👦' },
      { speaker: 'Mai', hanzi: '我的书包里有两本书、三个本子和一支笔。', pinyin: 'Wǒ de shūbāo lǐ yǒu liǎng běn shū, sān gè běnzi hé yī zhī bǐ.', vi: 'Trong cặp của mình có 2 quyển sách, 3 cuốn vở và 1 cây bút.', avatar: '👧' }
    ],
    exercises: [
      {
        id: 'g6e21',
        type: 'quiz',
        question: 'Từ "书包" (shūbāo) có nghĩa là gì?',
        hanzi: '书包',
        pinyin: 'shūbāo',
        options: ['Quyển sách', 'Cặp sách', 'Bút chì', 'Bàn học'],
        answer: 'Cặp sách',
        explanation: '书 (sách) + 包 (túi, bọc) = Cặp sách.',
        hint: 'Túi đựng sách vở đi học.'
      },
      {
        id: 'g6e22',
        type: 'quiz',
        question: 'Phủ định của động từ "有" (yǒu - có) là gì?',
        hanzi: '没有',
        pinyin: 'méiyǒu',
        options: ['不有', '没有', '没是', '无有'],
        answer: '没有',
        explanation: 'Động từ “有” phủ định bằng “没”, tạo thành “没有” (méiyǒu - không có). Không bao giờ dùng “不有”.',
        hint: 'Không có = méiyǒu.'
      },
      {
        id: 'g6e23',
        type: 'quiz',
        question: 'Chọn lượng từ đúng cho cuốn sách: "一____书"',
        hanzi: '一____书',
        pinyin: 'yī ____ shū',
        options: ['本 (běn)', '个 (gè)', '只 (zhī)', '张 (zhāng)'],
        answer: '本 (běn)',
        explanation: 'Lượng từ của sách báo, vở là “本” (běn).',
        hint: 'Bản, quyển.'
      },
      {
        id: 'g6e24',
        type: 'quiz',
        question: 'Từ nào chỉ "Phòng học / Lớp học"?',
        hanzi: '教室',
        pinyin: 'jiàoshì',
        options: ['学校 (xuéxiào)', '教室 (jiàoshì)', '食堂 (shítáng)', '操场 (cāochǎng)'],
        answer: '教室 (jiàoshì)',
        explanation: '教室 (jiàoshì) nghĩa là phòng học.',
        hint: 'Nơi cô giảng bài.'
      },
      {
        id: 'g6e25',
        type: 'quiz',
        question: 'Hoàn thành câu: "我____一把尺子。" (Mình có một chiếc thước kẻ)',
        hanzi: '我____一把尺子。',
        pinyin: 'Wǒ ____ yī bǎ chǐzi.',
        options: ['有', '是', '叫', '去'],
        answer: '有',
        explanation: '“有” nghĩa là sở hữu, có.',
        hint: 'Có = yǒu.'
      }
    ]
  }
];

export const GRADE_7_UNITS: LearningUnit[] = [
  {
    id: 'g7-u1',
    grade: 'grade7',
    unitNumber: 1,
    titleVi: 'Unit 1: Thời tiết & Bốn mùa yêu thương',
    titleZh: '第一单元：天气与四季',
    pinyin: 'Dì yī dānyuán: Tiānqì yǔ sìjì',
    description: 'Chương trình Lớp 7 GDPT: Hỏi thời tiết hôm nay thế nào, miêu tả xuân hạ thu đông tại Việt Nam & Trung Quốc.',
    coverImage: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=500&auto=format&fit=crop&q=60',
    vocabulary: [
      { id: 'g7v1', hanzi: '天气', pinyin: 'tiānqì', meaningVi: 'Thời tiết', exampleZh: '今天天气怎么样？', exampleVi: 'Hôm nay thời tiết thế nào?' },
      { id: 'g7v2', hanzi: '晴天', pinyin: 'qíngtiān', meaningVi: 'Trời nắng đẹp', exampleZh: '今天是晴天，很舒服。', exampleVi: 'Hôm nay trời nắng đẹp, rất dễ chịu.' },
      { id: 'g7v3', hanzi: '下雨', pinyin: 'xià yǔ', meaningVi: 'Trời mưa', exampleZh: '外面下大雨了。', exampleVi: 'Bên ngoài đang mưa to rồi.' },
      { id: 'g7v4', hanzi: '冷', pinyin: 'lěng', meaningVi: 'Lạnh', exampleZh: '冬天很冷。', exampleVi: 'Mùa đông rất lạnh.' },
      { id: 'g7v5', hanzi: '热', pinyin: 'rè', meaningVi: 'Nóng', exampleZh: '夏天太热了！', exampleVi: 'Mùa hè nóng quá!' },
      { id: 'g7v6', hanzi: '春季 / 春天', pinyin: 'chūntiān', meaningVi: 'Mùa xuân', exampleZh: '春天花开了。', exampleVi: 'Mùa xuân hoa nở rồi.' },
      { id: 'g7v7', hanzi: '秋天', pinyin: 'qiūtiān', meaningVi: 'Mùa thu', exampleZh: '河内的秋天很美。', exampleVi: 'Mùa thu Hà Nội rất đẹp.' },
    ],
    grammar: [
      {
        id: 'g7g1',
        title: 'Hỏi tính chất / tình trạng: ... 怎么样？(zěnmeyàng?)',
        structure: 'Chủ ngữ + 怎么样？',
        explanation: 'Dùng để hỏi tình trạng của sự vật, sự việc (như thời tiết, sức khỏe, cảm nhận).',
        examples: [
          { zh: '今天天气怎么样？', pinyin: 'Jīntiān tiānqì zěnmeyàng?', vi: 'Hôm nay thời tiết thế nào?' },
          { zh: '这件衣服怎么样？', pinyin: 'Zhè jiàn yīfu zěnmeyàng?', vi: 'Bộ quần áo này thế nào?' }
        ]
      },
      {
        id: 'g7g2',
        title: 'Phó từ mức độ: 太 ... 了 (tài ... le)',
        structure: '太 + Tính từ + 了',
        explanation: 'Biểu thị mức độ cao (quá, lắm, cực kỳ).',
        examples: [
          { zh: '太好了！', pinyin: 'Tài hǎo le!', vi: 'Tốt quá rồi!' },
          { zh: '今天太热了！', pinyin: 'Jīntiān tài rè le!', vi: 'Hôm nay nóng quá!' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'Hoàng', hanzi: '河内今天天气怎么样？', pinyin: 'Hénèi jīntiān tiānqì zěnmeyàng?', vi: 'Thời tiết Hà Nội hôm nay thế nào hả cậu?', avatar: '👦' },
      { speaker: 'Thu Hà', hanzi: '今天天气很好，不太热，也不冷。是晴天！', pinyin: 'Jīntiān tiānqì hěn hǎo, bú tài rè, yě bù lěng. Shì qíngtiān!', vi: 'Hôm nay thời tiết rất đẹp, không quá nóng, cũng không lạnh. Trời nắng đẹp!', avatar: '👧' },
      { speaker: 'Hoàng', hanzi: '太好了，我们一起去公园踢足球吧！', pinyin: 'Tài hǎo le, wǒmen yìqǐ qù gōngyuán tī zúqiú ba!', vi: 'Tuyệt quá, chúng mình cùng nhau ra công viên đá bóng đi!', avatar: '👦' }
    ],
    exercises: [
      {
        id: 'g7e1',
        type: 'quiz',
        question: 'Mẫu câu chuẩn hỏi "Hôm nay thời tiết thế nào?" là:',
        hanzi: '今天天气怎么样？',
        pinyin: 'Jīntiān tiānqì zěnmeyàng?',
        options: ['今天天气怎么样？', '今天星期几？', '几点了？', '今天去哪儿？'],
        answer: '今天天气怎么样？',
        explanation: '天气 là thời tiết, 怎么样 nghĩa là thế nào.',
        hint: 'Có chữ 天气 (tiānqì).'
      },
      {
        id: 'g7e2',
        type: 'quiz',
        question: 'Từ "下雨" (xià yǔ) diễn tả hiện tượng thời tiết nào?',
        hanzi: '下雨',
        pinyin: 'xià yǔ',
        options: ['Trời mưa', 'Trời nắng', 'Có tuyết rơi', 'Nhiều sương mù'],
        answer: 'Trời mưa',
        explanation: '雨 là mưa, 下雨 là trời đổ mưa.',
        hint: 'Có giọt nước rơi.'
      },
      {
        id: 'g7e3',
        type: 'quiz',
        question: 'Dịch câu cảm thán "Nóng quá đi mất!":',
        hanzi: '太热了！',
        pinyin: 'Tài rè le!',
        options: ['太冷了！', '太热了！', '太好了！', '太累了！'],
        answer: '太热了！',
        explanation: '热 (rè) là nóng, 太 ... 了 biểu thị mức độ quá.',
        hint: '热 = Nóng.'
      },
      {
        id: 'g7e4',
        type: 'quiz',
        question: 'Bốn mùa "Xuân, Hạ, Thu, Đông" trong tiếng Trung viết theo thứ tự là:',
        hanzi: '春夏秋冬',
        pinyin: 'chūn xià qiū dōng',
        options: ['春夏秋冬', '秋冬春夏', '夏春冬秋', '春秋冬夏'],
        answer: '春夏秋冬',
        explanation: 'Chūn (Xuân) - Xià (Hạ) - Qiū (Thu) - Dōng (Đông).',
        hint: 'Chữ đầu tiên là 春.'
      },
      {
        id: 'g7e5',
        type: 'quiz',
        question: 'Điền từ thích hợp: "今天天气很好，是____。" (Hôm nay thời tiết rất đẹp, là ngày nắng trong)',
        hanzi: '晴天',
        pinyin: 'qíngtiān',
        options: ['晴天 (qíngtiān)', '下雨 (xià yǔ)', '刮大风 (guā dà fēng)', '阴天 (yīntiān)'],
        answer: '晴天 (qíngtiān)',
        explanation: '晴天 nghĩa là ngày trời nắng ráo, trong xanh.',
        hint: 'Trời nắng đẹp.'
      }
    ]
  }
];

export const GRADE_8_UNITS: LearningUnit[] = [
  {
    id: 'g8-u1',
    grade: 'grade8',
    unitNumber: 1,
    titleVi: 'Bài 1: Phương tiện giao thông & Đi du lịch',
    titleZh: '第一单元：交通方式与旅行',
    pinyin: 'Dì yī dānyuán: Jiāotōng fāngshì yǔ lǚxíng',
    description: 'Chương trình GDPT mới Lớp 8 Bộ GD&ĐT: Hỏi đường, cách đi bằng tàu hỏa, máy bay, xe buýt và kế hoạch kỳ nghỉ hè.',
    coverImage: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=500&auto=format&fit=crop&q=60',
    vocabulary: [
      { id: 'g8v1', hanzi: '飞机', pinyin: 'fēijī', meaningVi: 'Máy bay', exampleZh: '我们坐飞机去北京。', exampleVi: 'Chúng tôi đi máy bay đến Bắc Kinh.' },
      { id: 'g8v2', hanzi: '火车', pinyin: 'huǒchē', meaningVi: 'Tàu hỏa, xe lửa', exampleZh: '坐火车很舒服。', exampleVi: 'Đi tàu hỏa rất thoải mái.' },
      { id: 'g8v3', hanzi: '公共汽车', pinyin: 'gōnggòng qìchē', meaningVi: 'Xe buýt công cộng', exampleZh: '我每天坐公共汽车上学。', exampleVi: 'Tôi đi xe buýt đến trường mỗi ngày.' },
      { id: 'g8v4', hanzi: '旅游 / 旅行', pinyin: 'lǚyóu', meaningVi: 'Du lịch', exampleZh: '暑假你打算去哪儿旅游？', exampleVi: 'Nghỉ hè bạn dự định đi đâu du lịch?' },
      { id: 'g8v5', hanzi: '怎么走', pinyin: 'zěnme zǒu', meaningVi: 'Đi như thế nào (hỏi đường)', exampleZh: '请问去故宫怎么走？', exampleVi: 'Xin hỏi đi Cố Cung đi đường nào?' },
    ],
    grammar: [
      {
        id: 'g8g1',
        title: 'Cấu trúc phương tiện: 坐 / 骑 + Phương tiện + 去 + Địa điểm',
        structure: 'Chủ ngữ + 坐 (ngồi) / 骑 (cưỡi, lái) + Phương tiện + 去 + Nơi đến',
        explanation: 'Dùng “坐” (zuò) cho máy bay, tàu hỏa, ô tô, xe buýt. Dùng “骑” (qí) cho xe đạp, xe máy.',
        examples: [
          { zh: '我坐飞机去上海。', pinyin: 'Wǒ zuò fēijī qù Shànghǎi.', vi: 'Tôi đi máy bay đến Thượng Hải.' },
          { zh: '他骑自行车去图书馆。', pinyin: 'Tā qí zìxíngchē qù túshūguǎn.', vi: 'Bạn ấy đi xe đạp đến thư viện.' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'Minh Tuấn (Lớp 8)', hanzi: '假期你想去哪儿旅游？', pinyin: 'Jiàqī nǐ xiǎng qù nǎr lǚyóu?', vi: 'Kỳ nghỉ bạn muốn đi đâu du lịch?', avatar: '👦' },
      { speaker: 'Thanh Hà', hanzi: '我想去岘港旅游。我们坐高铁或者飞机去。', pinyin: 'Wǒ xiǎng qù Xiàngǎng lǚyóu. Wǒmen zuò gāotiě huòzhě fēijī qù.', vi: 'Mình muốn đi Đà Nẵng du lịch. Chúng mình có thể đi tàu cao tốc hoặc máy bay.', avatar: '👧' }
    ],
    exercises: [
      {
        id: 'g8e1',
        type: 'quiz',
        question: 'Để nói "đi xe đạp", trong tiếng Trung dùng động từ nào?',
        hanzi: '骑自行车',
        pinyin: 'qí zìxíngchē',
        options: ['骑 (qí)', '坐 (zuò)', '开 (kāi)', '飞 (fēi)'],
        answer: '骑 (qí)',
        explanation: 'Đi xe hai bánh (xe đạp, xe máy) dùng động từ “骑” (qí).',
        hint: 'Nghĩa là cưỡi, lái xe đạp.'
      },
      {
        id: 'g8e2',
        type: 'quiz',
        question: 'Dịch câu: "Xin hỏi đến viện bảo tàng đi như thế nào?"',
        hanzi: '请问去博物馆怎么走？',
        pinyin: 'Qǐngwèn qù bówùguǎn zěnme zǒu?',
        options: ['请问去博物馆怎么走？', '请问博物馆几点关门？', '你在博物馆做什么？', '博物馆门票多少钱？'],
        answer: '请问去博物馆怎么走？',
        explanation: '怎么走 dùng để hỏi đường đi.',
        hint: 'Hỏi cách đi: 怎么走.'
      },
      {
        id: 'g8e3',
        type: 'quiz',
        question: 'Từ "公共汽车" (gōnggòng qìchē) là phương tiện nào?',
        hanzi: '公共汽车',
        pinyin: 'gōnggòng qìchē',
        options: ['Xe buýt công cộng', 'Máy bay', 'Tàu ngầm', 'Tàu hỏa'],
        answer: 'Xe buýt công cộng',
        explanation: '公共 (công cộng) + 汽车 (ô tô) = xe buýt công cộng.',
        hint: 'Xe chở nhiều người đi vé rẻ.'
      },
      {
        id: 'g8e4',
        type: 'quiz',
        question: 'Từ chỉ "Máy bay" trong tiếng Trung là:',
        hanzi: '飞机',
        pinyin: 'fēijī',
        options: ['飞机 (fēijī)', '火车 (huǒchē)', '轮船 (lúnchuán)', '出租车 (chūzūchē)'],
        answer: '飞机 (fēijī)',
        explanation: '飞 (bay) + 机 (máy móc) = máy bay.',
        hint: 'Máy móc biết bay trên trời.'
      },
      {
        id: 'g8e5',
        type: 'quiz',
        question: 'Điền từ: "暑假我们打算去中国____。" (Nghỉ hè chúng tôi dự định đi Trung Quốc du lịch)',
        hanzi: '旅游',
        pinyin: 'lǚyóu',
        options: ['旅游 (lǚyóu)', '睡觉 (shuìjiào)', '生病 (shēngbìng)', '买菜 (mǎi cài)'],
        answer: '旅游 (lǚyóu)',
        explanation: '旅游 nghĩa là đi du lịch tham quan.',
        hint: 'Du lịch danh lam thắng cảnh.'
      }
    ]
  },
  {
    id: 'g8-u2',
    grade: 'grade8',
    unitNumber: 2,
    titleVi: 'Bài 2: Mua sắm & Thanh toán thông minh',
    titleZh: '第二单元：购物与智慧支付',
    pinyin: 'Dì èr dānyuán: Gòuwù yǔ zhìhuì zhīfù',
    description: 'Chương trình GDPT mới Lớp 8: Mua sắm, hỏi giá cả, trả giá, quét mã QR thanh toán WeChat/Alipay.',
    coverImage: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=500&auto=format&fit=crop&q=60',
    vocabulary: [
      { id: 'g8v6', hanzi: '多少钱', pinyin: 'duōshao qián', meaningVi: 'Bao nhiêu tiền', exampleZh: '这件衣服多少钱？', exampleVi: 'Bộ quần áo này bao nhiêu tiền?' },
      { id: 'g8v7', hanzi: '元 / 块', pinyin: 'yuán / kuài', meaningVi: 'Đồng tệ (đơn vị tiền)', exampleZh: '一共五十块钱。', exampleVi: 'Tổng cộng 50 tệ.' },
      { id: 'g8v8', hanzi: '便宜', pinyin: 'piányi', meaningVi: 'Rẻ', exampleZh: '可以便宜一点儿吗？', exampleVi: 'Có thể bớt rẻ hơn một chút được không?' },
      { id: 'g8v9', hanzi: '扫码', pinyin: 'sǎomǎ', meaningVi: 'Quét mã QR', exampleZh: '请扫码付款。', exampleVi: 'Xin mời quét mã thanh toán.' },
      { id: 'g8v10', hanzi: '买', pinyin: 'mǎi', meaningVi: 'Mua', exampleZh: '我想买两本书。', exampleVi: 'Tôi muốn mua 2 quyển sách.' }
    ],
    grammar: [
      {
        id: 'g8g2',
        title: 'Hỏi giá tiền: [Đồ vật] + 多少钱？',
        structure: 'Chủ ngữ + 多少钱？',
        explanation: 'Dùng “多少钱” (duōshao qián) để hỏi giá cả bất kỳ đồ vật hay dịch vụ nào.',
        examples: [
          { zh: '苹果一斤多少钱？', pinyin: 'Píngguǒ yī jīn duōshao qián?', vi: 'Táo một cân bao nhiêu tiền?' },
          { zh: '一共多少钱？', pinyin: 'Yígòng duōshao qián?', vi: 'Tổng cộng hết bao nhiêu tiền?' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'Khách hàng', hanzi: '你好，这件外套多少钱？', pinyin: 'Nǐ hǎo, zhè jiàn wàitào duōshao qián?', vi: 'Chào bạn, chiếc áo khoác này bao nhiêu tiền vậy?', avatar: '👦' },
      { speaker: 'Người bán hàng', hanzi: '一百二十块。可以微信或者支付宝扫码付款。', pinyin: 'Yì bǎi èrshí kuài. Kěyǐ Wēixìn huòzhě Zhīfùbǎo sǎomǎ fùkuǎn.', vi: 'Một trăm hai mươi tệ ạ. Bạn có thể quét mã WeChat hoặc Alipay để thanh toán.', avatar: '👩‍💼' }
    ],
    exercises: [
      { id: 'g8e6', type: 'quiz', question: 'Mẫu câu hỏi "Cái này bao nhiêu tiền?" là:', hanzi: '这个多少钱？', pinyin: 'Zhège duōshao qián?', options: ['这个多少钱？', '这个叫什么？', '这个在哪儿？', '这个是谁的？'], answer: '这个多少钱？', explanation: '多少钱 là hỏi bao nhiêu tiền.' },
      { id: 'g8e7', type: 'quiz', question: 'Từ "便宜" (piányi) có nghĩa là gì?', hanzi: '便宜', pinyin: 'piányi', options: ['Rẻ, giá cả phải chăng', 'Đắt đỏ', 'Khó khăn', 'Đẹp đẽ'], answer: 'Rẻ, giá cả phải chăng', explanation: '便宜 nghĩa là rẻ tiền.' },
      { id: 'g8e8', type: 'quiz', question: 'Cụm từ "扫码" (sǎomǎ) nghĩa là gì trong thời đại số?', hanzi: '扫码', pinyin: 'sǎomǎ', options: ['Quét mã QR thanh toán', 'Gửi thư', 'Chụp ảnh', 'Đọc sách'], answer: 'Quét mã QR thanh toán', explanation: '扫码 là quét mã QR Code.' },
      { id: 'g8e9', type: 'quiz', question: 'Đơn vị tiền tệ chính thức của Trung Quốc là:', hanzi: '人民币 (元)', pinyin: 'Rénmínbì (yuán)', options: ['Nhân dân tệ (元/块)', 'Đô la (USD)', 'Euro (EUR)', 'Yên Nhật (JPY)'], answer: 'Nhân dân tệ (元/块)', explanation: 'Đơn vị tiền tệ là 元 (yuán) hoặc gọi khẩu ngữ là 块 (kuài).' },
      { id: 'g8e10', type: 'quiz', question: 'Dịch câu "Rẻ hơn một chút được không?":', hanzi: '可以便宜一点儿吗？', pinyin: 'Kěyǐ piányi yìdiǎnr ma?', options: ['可以便宜一点儿吗？', '太贵了我不买！', '你想买什么？', '这里没有卖。'], answer: '可以便宜一点儿吗？', explanation: 'Câu mặc cả lịch sự trong tiếng Trung.' }
    ]
  },
  {
    id: 'g8-u3',
    grade: 'grade8',
    unitNumber: 3,
    titleVi: 'Bài 3: Ẩm thực & Món ăn truyền thống',
    titleZh: '第三单元：美食与饮食文化',
    pinyin: 'Dì sān dānyuán: Měishí yǔ yǐnshí wénhuà',
    description: 'Chương trình GDPT mới Lớp 8: Món ăn Trung Hoa & Việt Nam, hương vị chua cay mặn ngọt, gọi món tại nhà hàng.',
    coverImage: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=500&auto=format&fit=crop&q=60',
    vocabulary: [
      { id: 'g8v11', hanzi: '饺子', pinyin: 'jiǎozi', meaningVi: 'Bánh chẻo, sủi cảo', exampleZh: '过年我们吃饺子。', exampleVi: 'Năm mới chúng tôi ăn bánh sủi cảo.' },
      { id: 'g8v12', hanzi: '好喝', pinyin: 'hǎohē', meaningVi: 'Ngon (đồ uống)', exampleZh: '中国茶很好喝。', exampleVi: 'Trà Trung Quốc rất ngon.' },
      { id: 'g8v13', hanzi: '点菜', pinyin: 'diǎn cài', meaningVi: 'Gọi món ăn', exampleZh: '服务员，我们要点菜。', exampleVi: 'Phục vụ ơi, chúng tôi muốn gọi món.' },
      { id: 'g8v14', hanzi: '味道', pinyin: 'wèidào', meaningVi: 'Hương vị', exampleZh: '这道菜的味道怎么样？', exampleVi: 'Hương vị món ăn này thế nào?' },
      { id: 'g8v15', hanzi: '甜', pinyin: 'tián', meaningVi: 'Ngọt ngào', exampleZh: '西瓜很甜。', exampleVi: 'Dưa hấu rất ngọt.' }
    ],
    grammar: [
      {
        id: 'g8g3',
        title: 'Mẫu câu khen ngợi món ăn: 好吃 / 好喝 (Ngon)',
        structure: 'Tên món ăn + 很好吃 / 很好喝',
        explanation: 'Dùng “好吃” cho đồ ăn nhai được, “好喝” cho đồ uống dạng lỏng.',
        examples: [
          { zh: '北京烤鸭真好吃！', pinyin: 'Běijīng kǎoyā zhēn hǎochī!', vi: 'Vịt quay Bắc Kinh thật là ngon!' },
          { zh: '珍珠奶茶很好喝。', pinyin: 'Zhēnzhū nǎichá hěn hǎohē.', vi: 'Trà sữa trân châu rất ngon.' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'Bồi bàn', hanzi: '请问二位想点什么菜？', pinyin: 'Qǐngwèn èr wèi xiǎng diǎn shénme cài?', vi: 'Xin hỏi hai bạn muốn gọi món gì ạ?', avatar: '👨‍🍳' },
      { speaker: 'Khách', hanzi: '给我们来一份水饺和两杯绿茶。', pinyin: 'Gěi wǒmen lái yí fèn shuǐjiǎo hé liǎng bēi lǜchá.', vi: 'Cho chúng tôi một phần sủi cảo và hai cốc trà xanh nhé.', avatar: '👧' }
    ],
    exercises: [
      { id: 'g8e11', type: 'quiz', question: 'Món ăn truyền thống Tết Nguyên đán của Trung Quốc là:', hanzi: '饺子', pinyin: 'jiǎozi', options: ['饺子 (Sủi cảo)', '披萨 (Pizza)', '汉堡 (Burger)', '面包 (Bánh mì)'], answer: '饺子 (Sủi cảo)', explanation: '饺子 hình thỏi vàng tượng trưng cho may mắn.' },
      { id: 'g8e12', type: 'quiz', question: 'Khen đồ uống ngon dùng từ nào?', hanzi: '好喝', pinyin: 'hǎohē', options: ['好喝', '好看', '好玩', '好吃'], answer: '好喝', explanation: '好喝 dùng cho đồ uống.' },
      { id: 'g8e13', type: 'quiz', question: 'Từ "点菜" (diǎn cài) nghĩa là gì?', hanzi: '点菜', pinyin: 'diǎn cài', options: ['Gọi món ăn', 'Nấu ăn', 'Rửa bát', 'Dọn bàn'], answer: 'Gọi món ăn', explanation: '点菜: Chọn món trong thực đơn.' },
      { id: 'g8e14', type: 'quiz', question: '"Vị ngọt" trong tiếng Trung là:', hanzi: '甜', pinyin: 'tián', options: ['甜 (tián)', '酸 (suān)', '苦 (kǔ)', '辣 (là)'], answer: '甜 (tián)', explanation: '甜 là ngọt.' },
      { id: 'g8e15', type: 'quiz', question: 'Từ xưng hô với người phục vụ nhà hàng:', hanzi: '服务员', pinyin: 'fúwùyuán', options: ['服务员 (fúwùyuán)', '老师 (lǎoshī)', '医生 (yīshēng)', '司机 (sījī)'], answer: '服务员 (fúwùyuán)', explanation: 'Nhân viên phục vụ là 服务员.' }
    ]
  }
];

export const GRADE_9_UNITS: LearningUnit[] = [
  {
    id: 'g9-u1',
    grade: 'grade9',
    unitNumber: 1,
    titleVi: 'Bài 1: Ước mơ & Nghề nghiệp tương lai',
    titleZh: '第一单元：梦想与未来的职业',
    pinyin: 'Dì yī dānyuán: Mèngxiǎng yǔ wèilái de zhíyè',
    description: 'Chương trình GDPT mới Lớp 9 Bộ GD&ĐT: Thảo luận về nghề nghiệp mong muốn, phỏng vấn, kế hoạch học tập cấp THPT và định hướng tương lai.',
    coverImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500&auto=format&fit=crop&q=60',
    vocabulary: [
      { id: 'g9v1', hanzi: '梦想', pinyin: 'mèngxiǎng', meaningVi: 'Ước mơ, hoài bão', exampleZh: '我的梦想是当一名外交官。', exampleVi: 'Ước mơ của tôi là trở thành một nhà ngoại giao.' },
      { id: 'g9v2', hanzi: '工程师', pinyin: 'gōngchéngshī', meaningVi: 'Kỹ sư', exampleZh: '他想成为一名软件工程师。', exampleVi: 'Bạn ấy muốn trở thành một kỹ sư phần mềm.' },
      { id: 'g9v3', hanzi: '翻译', pinyin: 'fānyì', meaningVi: 'Phiên dịch viên, dịch thuật', exampleZh: '学好中文可以当中文翻译。', exampleVi: 'Học tốt tiếng Trung có thể làm phiên dịch viên tiếng Trung.' },
      { id: 'g9v4', hanzi: '努力', pinyin: 'nǔlì', meaningVi: 'Nỗ lực, chăm chỉ', exampleZh: '只要努力，梦想就能实现。', exampleVi: 'Chỉ cần nỗ lực, ước mơ nhất định sẽ thành hiện thực.' },
      { id: 'g9v5', hanzi: '将来', pinyin: 'jiānglái', meaningVi: 'Tương lai, mai sau', exampleZh: '你将来想做什么工作？', exampleVi: 'Tương lai bạn muốn làm công việc gì?' },
    ],
    grammar: [
      {
        id: 'g9g1',
        title: 'Mẫu câu biểu đạt ước muốn: 想 / 希望 + 当 (trở thành) + Nghề nghiệp',
        structure: 'Chủ ngữ + 想 / 希望 + 当 / 成为 + Nghề nghiệp',
        explanation: 'Động từ “当” (dāng) hoặc “成为” (chéngwéi) mang nghĩa là làm, đảm nhận chức vụ hay nghề nghiệp nào đó.',
        examples: [
          { zh: '我将来想当一名优秀的中文老师。', pinyin: 'Wǒ jiānglái xiǎng dāng yī míng yōuxiù de zhōngwén lǎoshī.', vi: 'Tương lai tôi muốn làm một giáo viên tiếng Trung xuất sắc.' },
          { zh: '他希望成为一名医生。', pinyin: 'Tā xīwàng chéngwéi yī míng yīshēng.', vi: 'Anh ấy hy vọng trở thành một bác sĩ.' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'Hoàng Long (Lớp 9)', hanzi: '初中毕业后，你打算考哪所高中？', pinyin: 'Chūzhōng bìyè hòu, nǐ dǎsuàn kǎo nǎ suǒ gāozhōng?', vi: 'Sau khi tốt nghiệp THCS, bạn dự định thi vào trường THPT nào?', avatar: '👦' },
      { speaker: 'Phương Linh', hanzi: '我想考外语专高中，深入学习中文。我的梦想是当一名专业翻译！', pinyin: 'Wǒ xiǎng kǎo wàiyǔ zhuāngāozhōng, shēnrù xuéxí zhōngwén. Wǒ de mèngxiǎng shì dāng yī míng zhuānyè fānyì!', vi: 'Mình muốn thi vào trường THPT Chuyên Ngoại ngữ để học chuyên sâu tiếng Trung. Ước mơ của mình là làm biên phiên dịch viên chuyên nghiệp!', avatar: '👧' }
    ],
    exercises: [
      {
        id: 'g9e1',
        type: 'quiz',
        question: 'Từ "翻译" (fānyì) chỉ nghề nghiệp nào?',
        hanzi: '翻译',
        pinyin: 'fānyì',
        options: ['Biên phiên dịch viên', 'Lập trình viên', 'Bác sĩ', 'Luật sư'],
        answer: 'Biên phiên dịch viên',
        explanation: '翻译 là nghề phiên dịch viên chuyển ngữ.',
        hint: 'Chuyển đổi ngôn ngữ.'
      },
      {
        id: 'g9e2',
        type: 'quiz',
        question: 'Dịch câu: "Chỉ cần cố gắng, ước mơ sẽ thành hiện thực."',
        hanzi: '只要努力，梦想就会实现。',
        pinyin: 'Zhǐyào nǔlì, mèngxiǎng jiù huì shíxiàn.',
        options: ['只要努力，梦想就会实现。', '我们不需要努力。', '梦想很难实现。', '他不想要梦想。'],
        answer: '只要努力，梦想就会实现。',
        explanation: '努力 là nỗ lực, 梦想 là ước mơ, 实现 là thành hiện thực.',
        hint: 'Có từ 只要...就...'
      },
      {
        id: 'g9e3',
        type: 'quiz',
        question: 'Từ "将来" (jiānglái) có nghĩa là gì?',
        hanzi: '将来',
        pinyin: 'jiānglái',
        options: ['Tương lai / Mai sau', 'Quá khứ', 'Hôm qua', 'Hiện tại bây giờ'],
        answer: 'Tương lai / Mai sau',
        explanation: '将来 nghĩa là tương lai, những ngày tháng phía trước.',
        hint: 'Thời gian sau này.'
      },
      {
        id: 'g9e4',
        type: 'quiz',
        question: 'Chữ "当" trong "当老师" có nghĩa là gì?',
        hanzi: '当',
        pinyin: 'dāng',
        options: ['Làm / Đảm nhận vai trò', 'Nhìn thấy', 'Nghe thấy', 'Hỏi thăm'],
        answer: 'Làm / Đảm nhận vai trò',
        explanation: '当 + nghề nghiệp = Làm nghề đó (VD: 当医生: làm bác sĩ).',
        hint: 'Đảm nhận công việc.'
      },
      {
        id: 'g9e5',
        type: 'quiz',
        question: 'Chọn từ: "我的____是成为一名优秀的工程师。"',
        hanzi: '梦想',
        pinyin: 'mèngxiǎng',
        options: ['梦想 (mèngxiǎng)', '天气 (tiānqì)', '时间 (shíjiān)', '书包 (shūbāo)'],
        answer: '梦想 (mèngxiǎng)',
        explanation: '梦想 là ước mơ, hoài bão của tuổi trẻ.',
        hint: 'Khát khao, ước mơ.'
      }
    ]
  },
  {
    id: 'g9-u2',
    grade: 'grade9',
    unitNumber: 2,
    titleVi: 'Bài 2: Khoa học công nghệ & Đời sống số',
    titleZh: '第二单元：科技与数字生活',
    pinyin: 'Dì èr dānyuán: Kējì yǔ shùzì shēnghuó',
    description: 'Chương trình GDPT mới Lớp 9: Trí tuệ nhân tạo (AI), internet, smartphone và thói quen công nghệ.',
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=60',
    vocabulary: [
      { id: 'g9v6', hanzi: '人工智能', pinyin: 'réngōng zhìnéng', meaningVi: 'Trí tuệ nhân tạo (AI)', exampleZh: '人工智能改变了世界。', exampleVi: 'Trí tuệ nhân tạo đã làm thay đổi thế giới.' },
      { id: 'g9v7', hanzi: '互联网', pinyin: 'hùliánwǎng', meaningVi: 'Mạng internet', exampleZh: '我们在互联网上查资料。', exampleVi: 'Chúng tôi tra cứu tài liệu trên internet.' },
      { id: 'g9v8', hanzi: '智能手机', pinyin: 'zhìnéng shǒujī', meaningVi: 'Điện thoại thông minh', exampleZh: '现在的智能手机功能很多。', exampleVi: 'Điện thoại thông minh ngày nay có rất nhiều tính năng.' },
      { id: 'g9v9', hanzi: '方便', pinyin: 'fāngbiàn', meaningVi: 'Thuận tiện, tiện lợi', exampleZh: '网上购物非常方便。', exampleVi: 'Mua sắm qua mạng vô cùng thuận tiện.' },
      { id: 'g9v10', hanzi: '发信息', pinyin: 'fā xìnxī', meaningVi: 'Gửi tin nhắn', exampleZh: '我常常给朋友发信息。', exampleVi: 'Tôi thường xuyên gửi tin nhắn cho bạn bè.' }
    ],
    grammar: [
      {
        id: 'g9g2',
        title: 'Cấu trúc so sánh: A 比 B + Tính từ (A hơn B)',
        structure: 'A + 比 + B + Tính từ',
        explanation: 'Dùng “比” (bǐ) để so sánh thuộc tính hơn kém giữa hai sự vật.',
        examples: [
          { zh: '坐高铁比坐汽车快得多。', pinyin: 'Zuò gāotiě bǐ zuò qìchē kuài de duō.', vi: 'Đi tàu cao tốc nhanh hơn đi ô tô rất nhiều.' },
          { zh: '现在的电脑比以前小巧。', pinyin: 'Xiànzài de diànnǎo bǐ yǐqián xiǎoqiǎo.', vi: 'Máy tính bây giờ nhỏ gọn hơn ngày xưa.' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'Quang Anh', hanzi: '你觉得人工智能会代替老师吗？', pinyin: 'Nǐ juéde réngōng zhìnéng huì dàitì lǎoshī ma?', vi: 'Cậu nghĩ trí tuệ nhân tạo có thay thế được giáo viên không?', avatar: '👦' },
      { speaker: 'Bảo Trân', hanzi: '我觉得不会。AI虽然很聪明，但老师有温暖的爱心和鼓励！', pinyin: 'Wǒ juéde bú huì. AI suīrán hěn cōngming, dàn lǎoshī yǒu wēnnuǎn de àixīn hé gǔlì!', vi: 'Mình nghĩ là không. Dù AI rất thông minh, nhưng giáo viên có tình yêu thương và sự động viên ấm áp!', avatar: '👧' }
    ],
    exercises: [
      { id: 'g9e6', type: 'quiz', question: 'Từ "人工智能" (réngōng zhìnéng) nghĩa là gì?', hanzi: '人工智能', pinyin: 'réngōng zhìnéng', options: ['Trí tuệ nhân tạo (AI)', 'Robot thợ lặn', 'Vệ tinh nhân tạo', 'Tên lửa vũ trụ'], answer: 'Trí tuệ nhân tạo (AI)', explanation: '人工智能 là Trí tuệ nhân tạo (AI).' },
      { id: 'g9e7', type: 'quiz', question: 'Từ "方便" (fāngbiàn) có nghĩa là:', hanzi: '方便', pinyin: 'fāngbiàn', options: ['Thuận tiện, tiện lợi', 'Khó khăn', 'Phiền phức', 'Chậm chạp'], answer: 'Thuận tiện, tiện lợi', explanation: '方便 là tiện lợi.' },
      { id: 'g9e8', type: 'quiz', question: 'Cấu trúc so sánh hơn "A 比 B 快" nghĩa là:', hanzi: 'A 比 B 快', pinyin: 'A bǐ B kuài', options: ['A nhanh hơn B', 'A chậm hơn B', 'A bằng B', 'B nhanh nhất'], answer: 'A nhanh hơn B', explanation: '比 biểu thị so sánh hơn.' },
      { id: 'g9e9', type: 'quiz', question: 'Cụm từ "上网" (shàngwǎng) nghĩa là gì?', hanzi: '上网', pinyin: 'shàngwǎng', options: ['Lên mạng internet', 'Đi bơi', 'Xem phim rạp', 'Đi dạo phố'], answer: 'Lên mạng internet', explanation: '上网: Lên mạng lướt web.' },
      { id: 'g9e10', type: 'quiz', question: 'Điền từ: "智能手机让生活更____。" (Smartphone làm cho cuộc sống thêm thuận tiện)', hanzi: '方便', pinyin: 'fāngbiàn', options: ['方便 (fāngbiàn)', '难过 (nánguò)', '累 (lèi)', '生病 (shēngbìng)'], answer: '方便 (fāngbiàn)', explanation: 'Tiện lợi, thuận tiện.' }
    ]
  },
  {
    id: 'g9-u3',
    grade: 'grade9',
    unitNumber: 3,
    titleVi: 'Bài 3: Ôn luyện vào 10 & Giao lưu văn hóa',
    titleZh: '第三单元：中考备考与文化交流',
    pinyin: 'Dì sān dānyuán: Zhōngkǎo bèikǎo yǔ wénhuà jiāoliú',
    description: 'Chương trình GDPT mới Lớp 9: Tổng ôn ngữ pháp thi vào lớp 10 THPT môn Tiếng Trung, đọc hiểu bài văn ngắn, phong tục tập quán.',
    coverImage: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=500&auto=format&fit=crop&q=60',
    vocabulary: [
      { id: 'g9v11', hanzi: '复习', pinyin: 'fùxí', meaningVi: 'Ôn tập', exampleZh: '认真复习准备考试。', exampleVi: 'Chăm chỉ ôn tập chuẩn bị thi cử.' },
      { id: 'g9v12', hanzi: '考试', pinyin: 'kǎoshì', meaningVi: 'Thi cử, kiểm tra', exampleZh: '明天有中文考试。', exampleVi: 'Ngày mai có bài thi tiếng Trung.' },
      { id: 'g9v13', hanzi: '成绩', pinyin: 'chéngjì', meaningVi: 'Thành tích, điểm số', exampleZh: '祝你取得优异成绩！', exampleVi: 'Chúc bạn đạt được thành tích xuất sắc!' },
      { id: 'g9v14', hanzi: '文化', pinyin: 'wénhuà', meaningVi: 'Văn hóa', exampleZh: '两国文化交流。', exampleVi: 'Giao lưu văn hóa hai nước.' },
      { id: 'g9v15', hanzi: '成功', pinyin: 'chénggōng', meaningVi: 'Thành công', exampleZh: '坚持就是成功！', exampleVi: 'Kiên trì chính là thành công!' }
    ],
    grammar: [
      {
        id: 'g9g3',
        title: 'Mẫu câu câu chữ 把: Chủ ngữ + 把 + Tân ngữ + Động từ + Thành phần khác',
        structure: 'Chủ ngữ + 把 + Tân ngữ + Động từ + 了 / 到...',
        explanation: 'Dùng câu chữ 把 để nhấn mạnh sự xử lý, tác động làm biến đổi tân ngữ.',
        examples: [
          { zh: '请把书本打开。', pinyin: 'Qǐng bǎ shūběn dǎkāi.', vi: 'Xin mời mở sách giáo khoa ra.' },
          { zh: '他把作业做完了。', pinyin: 'Tā bǎ zuòyè zuò wán le.', vi: 'Bạn ấy đã làm xong bài tập rồi.' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'Cô Liên', hanzi: '同学们，中考快到了，大家要有信心，查漏补缺！', pinyin: 'Tóngxuémen, zhōngkǎo kuài dào le, dàjiā yào yǒu xìnxīn, chá lòu bǔ quē!', vi: 'Các em học sinh ơi, kỳ thi chuyển cấp sắp đến rồi, các em hãy tự tin và rà soát kỹ kiến thức nhé!', avatar: '👩‍🏫' },
      { speaker: 'Học sinh', hanzi: '谢谢莲老师的悉心教导，我们一定全力以赴！', pinyin: 'Xièxie Lián lǎoshī de xīxīn jiàodǎo, wǒmen yídìng quánlì yǐ fù!', vi: 'Cảm ơn sự chỉ bảo tận tình của cô Liên, chúng em nhất định sẽ nỗ lực hết mình!', avatar: '👦' }
    ],
    exercises: [
      { id: 'g9e11', type: 'quiz', question: 'Từ "复习" (fùxí) nghĩa là gì?', hanzi: '复习', pinyin: 'fùxí', options: ['Ôn tập bài vở', 'Đi chơi', 'Xem tivi', 'Nghỉ giải lao'], answer: 'Ôn tập bài vở', explanation: '复习 là ôn tập lại kiến thức.' },
      { id: 'g9e12', type: 'quiz', question: 'Đặc trưng ngữ pháp của câu chữ "把" là:', hanzi: '把字句', pinyin: 'bǎ zì jù', options: ['Nhấn mạnh sự xử lý tác động', 'Chỉ câu hỏi thời gian', 'Chỉ câu cảm thán', 'Chỉ câu phủ định tuyệt đối'], answer: 'Nhấn mạnh sự xử lý tác động', explanation: 'Câu chữ 把 là điểm ngữ pháp trọng tâm thi vào 10.' },
      { id: 'g9e13', type: 'quiz', question: 'Lời chúc thi cử "祝你考试顺利" có nghĩa là:', hanzi: '祝你考试顺利！', pinyin: 'Zhù nǐ kǎoshì shùnlì!', options: ['Chúc bạn thi cử thuận lợi, làm bài tốt!', 'Chúc bạn ngủ ngon!', 'Chúc mừng sinh nhật!', 'Hẹn gặp lại ngày mai!'], answer: 'Chúc bạn thi cử thuận lợi, làm bài tốt!', explanation: 'Lời chúc thi cử suôn sẻ, đạt điểm cao.' },
      { id: 'g9e14', type: 'quiz', question: 'Từ "成绩" (chéngjì) có nghĩa là:', hanzi: '成绩', pinyin: 'chéngjì', options: ['Thành tích / Điểm số thi', 'Bài tập về nhà', 'Thời khóa biểu', 'Đồng phục học sinh'], answer: 'Thành tích / Điểm số thi', explanation: 'Thành tích, kết quả học tập.' },
      { id: 'g9e15', type: 'quiz', question: 'Điền từ: "只要坚持努力，你就一定会____！" (Chỉ cần kiên trì nỗ lực, bạn nhất định sẽ thành công)', hanzi: '成功', pinyin: 'chénggōng', options: ['成功 (chénggōng)', '生病 (shēngbìng)', '迟到 (chídào)', '哭 (kū)'], answer: '成功 (chénggōng)', explanation: '成功 nghĩa là gặt hái thành công.' }
    ]
  }
];

export const YCT_ALL_LEVELS_UNITS: LearningUnit[] = [
  {
    id: 'yct-l1',
    grade: 'yct',
    unitNumber: 1,
    yctLevel: 1,
    titleVi: 'Các từ vựng nền tảng & câu giao tiếp cơ bản',
    titleZh: 'YCT 一级：基础词汇与日常交际',
    pinyin: 'YCT Yī jí: Jīchǔ cíhuì',
    description: '103 từ vựng nền tảng trọng tâm, kèm câu giao tiếp ngắn gọn ứng dụng thực tế, phiên âm Pinyin, nghĩa tiếng Việt và phát âm chuẩn bản địa.',
    coverImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&auto=format&fit=crop&q=60',
    vocabulary: YCT1_FOUNDATION_VOCABULARY,
    grammar: [
      {
        id: 'y1g1',
        title: 'Mẫu câu YCT 1: [Đại từ] + [Động từ] + [Danh từ]',
        structure: 'Chủ ngữ + Động từ + Tân ngữ',
        explanation: 'Diễn đạt hành động đơn giản hàng ngày của bé.',
        examples: [
          { zh: '我喝水。', pinyin: 'Wǒ hē shuǐ.', vi: 'Em uống nước.' },
          { zh: '他吃苹果。', pinyin: 'Tā chī píngguǒ.', vi: 'Bạn ấy ăn táo.' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'Bé Na', hanzi: '你喝什么？', pinyin: 'Nǐ hē shénme?', vi: 'Bạn uống gì nào?', avatar: '👧' },
      { speaker: 'Bé Bo', hanzi: '我喝水，谢谢！', pinyin: 'Wǒ hē shuǐ, xièxie!', vi: 'Mình uống nước, cảm ơn bạn nhé!', avatar: '👦' }
    ],
    exercises: [
      { id: 'y1e1', type: 'quiz', question: 'YCT 1: Từ "喝水" (hē shuǐ) nghĩa là gì?', hanzi: '喝水', pinyin: 'hē shuǐ', options: ['Uống nước', 'Ăn cơm', 'Đi ngủ', 'Đọc sách'], answer: 'Uống nước', explanation: '喝 là uống, 水 là nước.' },
      { id: 'y1e2', type: 'quiz', question: 'YCT 1: Chữ nào là "Tôi / Mình"?', hanzi: '我', pinyin: 'wǒ', options: ['我', '你', '他', '她'], answer: '我', explanation: '我 nghĩa là Tôi.' },
      { id: 'y1e3', type: 'quiz', question: 'YCT 1: "Số 5" viết là gì?', hanzi: '五', pinyin: 'wǔ', options: ['五', '四', '六', '七'], answer: '五', explanation: '五 là số 5.' },
      { id: 'y1e4', type: 'quiz', question: 'YCT 1: Chọn đáp án cho câu chào buổi sáng:', hanzi: '早上好', pinyin: 'Zǎoshang hǎo', options: ['早上好', '再见', '谢谢', '对不起'], answer: '早上好', explanation: '早上好: Chào buổi sáng.' },
      { id: 'y1e5', type: 'quiz', question: 'YCT 1: Lời đáp của "谢谢" là:', hanzi: '不客气', pinyin: 'Bú kèqi', options: ['不客气', '对不起', '没关系', '你好'], answer: '不客气', explanation: 'Không có chi.' }
    ]
  },
  {
    id: 'yct-l2',
    grade: 'yct',
    unitNumber: 2,
    yctLevel: 2,
    titleVi: 'YCT Cấp độ 2: 150 Từ vựng & Hỏi đáp trường lớp, màu sắc',
    titleZh: 'YCT 二级：校园与色彩',
    pinyin: 'YCT Èr jí: Xiàoyuán yǔ sècǎi',
    description: 'Chuẩn quốc tế YCT 2: Màu sắc, đồ vật trong lớp học, các bộ môn sở thích và hỏi số lượng con vật.',
    coverImage: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=500&auto=format&fit=crop&q=60',
    vocabulary: [
      { id: 'y2v1', hanzi: '颜色', pinyin: 'yánsè', meaningVi: 'Màu sắc', exampleZh: '你喜欢什么颜色？', exampleVi: 'Bạn thích màu gì?' },
      { id: 'y2v2', hanzi: '红色', pinyin: 'hóngsè', meaningVi: 'Màu đỏ', exampleZh: '这是红色的苹果。', exampleVi: 'Đây là quả táo màu đỏ.' },
      { id: 'y2v3', hanzi: '黄色', pinyin: 'huángsè', meaningVi: 'Màu vàng', exampleZh: '香蕉是黄色的。', exampleVi: 'Quả chuối có màu vàng.' },
      { id: 'y2v4', hanzi: '画画', pinyin: 'huàhuà', meaningVi: 'Vẽ tranh', exampleZh: '我喜欢画画。', exampleVi: 'Em rất thích vẽ tranh.' },
      { id: 'y2v5', hanzi: '书包', pinyin: 'shūbāo', meaningVi: 'Cặp sách', exampleZh: '我的书包很漂亮。', exampleVi: 'Cặp sách của em rất đẹp.' }
    ],
    grammar: [
      {
        id: 'y2g1',
        title: 'Mẫu câu hỏi sở thích: 你喜欢 ... 吗？',
        structure: 'Chủ ngữ + 喜欢 + Tân ngữ + 吗？',
        explanation: 'Dùng trợ từ 吗 ở cuối câu để hỏi đối phương có thích cái gì đó không.',
        examples: [
          { zh: '你喜欢黄色吗？', pinyin: 'Nǐ xǐhuan huángsè ma?', vi: 'Bạn có thích màu vàng không?' },
          { zh: '我喜欢画画。', pinyin: 'Wǒ xǐhuan huàhuà.', vi: 'Mình thích vẽ tranh.' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'Bạn Mai', hanzi: '你喜欢什么颜色？', pinyin: 'Nǐ xǐhuan shénme yánsè?', vi: 'Bạn thích màu gì thế?', avatar: '👧' },
      { speaker: 'Bạn Huy', hanzi: '我喜欢红色和蓝色。', pinyin: 'Wǒ xǐhuan hóngsè hé lánsè.', vi: 'Mình thích màu đỏ và màu xanh dương.', avatar: '👦' }
    ],
    exercises: [
      { id: 'y2e1', type: 'quiz', question: 'YCT 2: "红色" (hóngsè) là màu gì?', hanzi: '红色', pinyin: 'hóngsè', options: ['Màu đỏ', 'Màu xanh', 'Màu trắng', 'Màu đen'], answer: 'Màu đỏ', explanation: 'Hóngsè là màu đỏ.' },
      { id: 'y2e2', type: 'quiz', question: 'YCT 2: Từ nào có nghĩa là "Vẽ tranh"?', hanzi: '画画', pinyin: 'huàhuà', options: ['画画', '唱歌', '跳舞', '看书'], answer: '画画', explanation: '画画 là vẽ tranh.' },
      { id: 'y2e3', type: 'quiz', question: 'YCT 2: "Quả chuối có màu vàng":', hanzi: '香蕉是黄色的', pinyin: 'Xiāngjiāo shì huángsè de', options: ['香蕉是黄色的', '香蕉是红色的', '香蕉是绿色的', '香蕉是黑色的'], answer: '香蕉是黄色的', explanation: 'Chuối màu vàng.' },
      { id: 'y2e4', type: 'quiz', question: 'YCT 2: Lượng từ cho con mèo là:', hanzi: '一只猫', pinyin: 'yī zhī māo', options: ['只 (zhī)', '个 (gè)', '本 (běn)', '张 (zhāng)'], answer: '只 (zhī)', explanation: 'Lượng từ con vật nhỏ là 只.' },
      { id: 'y2e5', type: 'quiz', question: 'YCT 2: Hoàn thành câu: "我____书包很漂亮。"', hanzi: '的', pinyin: 'de', options: ['的', '是', '在', '有'], answer: '的', explanation: 'Cặp sách của tôi = 我的书包.' }
    ]
  },
  {
    id: 'yct-l3',
    grade: 'yct',
    unitNumber: 3,
    yctLevel: 3,
    titleVi: 'YCT Cấp độ 3: 300 Từ vựng & Giao tiếp thường nhật, thời gian, giá cả',
    titleZh: 'YCT 三级：日常生活与时间',
    pinyin: 'YCT Sān jí: Rìcháng shēnghuó',
    description: 'Chuẩn quốc tế YCT 3: Hỏi giờ, ngày trong tuần, mua đồ ăn, hỏi giá tiền và phương hướng đơn giản.',
    coverImage: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=500&auto=format&fit=crop&q=60',
    vocabulary: [
      { id: 'y3v1', hanzi: '点钟', pinyin: 'diǎnzhōng', meaningVi: 'Giờ (thời gian)', exampleZh: '现在几点？八点钟。', exampleVi: 'Bây giờ mấy giờ? Tám giờ.' },
      { id: 'y3v2', hanzi: '多少钱', pinyin: 'duōshao qián', meaningVi: 'Bao nhiêu tiền', exampleZh: '这个面包多少钱？', exampleVi: 'Cái bánh mì này bao nhiêu tiền?' },
      { id: 'y3v3', hanzi: '昨天', pinyin: 'zuótiān', meaningVi: 'Hôm qua', exampleZh: '昨天星期日。', exampleVi: 'Hôm qua là Chủ nhật.' },
      { id: 'y3v4', hanzi: '买', pinyin: 'mǎi', meaningVi: 'Mua', exampleZh: '我想买两支铅笔。', exampleVi: 'Mình muốn mua 2 cây bút chì.' },
      { id: 'y3v5', hanzi: '商店', pinyin: 'shāngdiàn', meaningVi: 'Cửa hàng', exampleZh: '我去商店买东西。', exampleVi: 'Tôi đi cửa hàng mua đồ.' }
    ],
    grammar: [
      {
        id: 'y3g1',
        title: 'Mẫu câu hỏi giá tiền: [Đồ vật] + 多少钱？',
        structure: 'Danh từ + 多少钱？',
        explanation: 'Hỏi giá tiền của món hàng khi đi siêu thị hay cửa hàng tạp hóa.',
        examples: [
          { zh: '这个苹果多少钱？', pinyin: 'Zhè ge píngguǒ duōshao qián?', vi: 'Quả táo này bao nhiêu tiền?' },
          { zh: '三块钱一个。', pinyin: 'Sān kuài qián yī gè.', vi: 'Ba tệ một quả.' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'Khách mua', hanzi: '请问这本漫画书多少钱？', pinyin: 'Qǐngwèn zhè běn mànhuà shū duōshao qián?', vi: 'Xin hỏi cuốn truyện tranh này bao nhiêu tiền ạ?', avatar: '👦' },
      { speaker: 'Người bán', hanzi: '十块钱一本。', pinyin: 'Shí kuài qián yī běn.', vi: 'Mười tệ một cuốn em nhé.', avatar: '👩‍💼' }
    ],
    exercises: [
      { id: 'y3e1', type: 'quiz', question: 'YCT 3: Để hỏi "Bao nhiêu tiền?", câu chuẩn là:', hanzi: '多少钱？', pinyin: 'Duōshao qián?', options: ['多少钱？', '多少人？', '去哪里？', '什么时候？'], answer: '多少钱？', explanation: '多少钱 dùng để hỏi giá tiền.' },
      { id: 'y3e2', type: 'quiz', question: 'YCT 3: "Hôm qua" trong tiếng Trung là gì?', hanzi: '昨天', pinyin: 'zuótiān', options: ['昨天 (zuótiān)', '今天 (jīntiān)', '明天 (míngtiān)', '后天 (hòutiān)'], answer: '昨天 (zuótiān)', explanation: '昨天 là ngày hôm qua.' },
      { id: 'y3e3', type: 'quiz', question: 'YCT 3: "8 giờ sáng" diễn đạt là:', hanzi: '早上八点', pinyin: 'zǎoshang bā diǎn', options: ['早上八点', '晚上八点', '中午八点', '下午八点'], answer: '早上八点', explanation: 'Sáng là 早上.' },
      { id: 'y3e4', type: 'quiz', question: 'YCT 3: Động từ "Mua" trái nghĩa với động từ "Bán" là:', hanzi: '买 <-> 卖', pinyin: 'mǎi <-> mài', options: ['买 (mǎi)', '看 (kàn)', '写 (xiě)', '吃 (chī)'], answer: '买 (mǎi)', explanation: '买 là mua hàng.' },
      { id: 'y3e5', type: 'quiz', question: 'YCT 3: "商店" (shāngdiàn) nghĩa là nơi nào?', hanzi: '商店', pinyin: 'shāngdiàn', options: ['Cửa hàng / Tiệm tạp hóa', 'Bệnh viện', 'Sân bay', 'Nhà ga'], answer: 'Cửa hàng / Tiệm tạp hóa', explanation: '商店 là cửa hàng.' }
    ]
  },
  {
    id: 'yct-l4',
    grade: 'yct',
    unitNumber: 4,
    yctLevel: 4,
    titleVi: 'YCT Cấp độ 4: 600 Từ vựng & Giao tiếp thành thạo, miêu tả cảm xúc',
    titleZh: 'YCT 四级：情感与综合表达',
    pinyin: 'YCT Sì jí: Qínggǎn yǔ biǎodá',
    description: 'Chuẩn quốc tế YCT 4: Diễn đạt cảm xúc, kể lại hoạt động trong kỳ nghỉ, thể thao và khám phá các mùa.',
    coverImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&auto=format&fit=crop&q=60',
    vocabulary: [
      { id: 'y4v1', hanzi: '高兴', pinyin: 'gāoxìng', meaningVi: 'Vui vẻ', exampleZh: '今天大家都很高兴。', exampleVi: 'Hôm nay mọi người đều rất vui.' },
      { id: 'y4v2', hanzi: '跑步', pinyin: 'pǎobù', meaningVi: 'Chạy bộ', exampleZh: '他每天早上都跑步。', exampleVi: 'Cậu ấy chạy bộ mỗi sáng.' },
      { id: 'y4v3', hanzi: '踢足球', pinyin: 'tī zúqiú', meaningVi: 'Đá bóng', exampleZh: '放学后我们去踢足球。', exampleVi: 'Sau giờ học chúng mình đi đá bóng.' },
      { id: 'y4v4', hanzi: '健康', pinyin: 'jiànkāng', meaningVi: 'Khỏe mạnh, sức khỏe', exampleZh: '祝你身体健康！', exampleVi: 'Chúc bạn dồi dào sức khỏe!' }
    ],
    grammar: [
      {
        id: 'y4g1',
        title: 'Mẫu câu so sánh: A 比 B + Tính từ',
        structure: 'A + 比 + B + Tính từ',
        explanation: 'Dùng chữ 比 để so sánh mức độ giữa hai đối tượng.',
        examples: [
          { zh: '哥哥比我高。', pinyin: 'Gēge bǐ wǒ gāo.', vi: 'Anh trai cao hơn em.' },
          { zh: '今天比昨天冷。', pinyin: 'Jīntiān bǐ zuótiān lěng.', vi: 'Hôm nay lạnh hơn hôm qua.' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'Bạn Long', hanzi: '周末你喜欢做什么运动？', pinyin: 'Zhōumò nǐ xǐhuan zuò shénme yùndòng?', vi: 'Cuối tuần bạn thích chơi môn thể thao nào?', avatar: '👦' },
      { speaker: 'Bạn Hùng', hanzi: '我喜欢踢足球和游泳，运动让我更健康！', pinyin: 'Wǒ xǐhuan tī zúqiú hé yóuyǒng, yùndòng ràng wǒ gèng jiànkāng!', vi: 'Mình thích đá bóng và bơi lội, thể thao giúp mình khỏe mạnh hơn!', avatar: '🏃' }
    ],
    exercises: [
      { id: 'y4e1', type: 'quiz', question: 'YCT 4: "踢足球" nghĩa là môn thể thao nào?', hanzi: '踢足球', pinyin: 'tī zúqiú', options: ['Đá bóng', 'Bóng rổ', 'Cầu lông', 'Bơi lội'], answer: 'Đá bóng', explanation: '踢足球 là đá bóng.' },
      { id: 'y4e2', type: 'quiz', question: 'YCT 4: Chọn câu so sánh đúng: "Anh trai cao hơn tôi":', hanzi: '哥哥比我高', pinyin: 'Gēge bǐ wǒ gāo', options: ['哥哥比我高。', '哥哥我有高。', '哥哥和我高。', '哥哥太我高。'], answer: '哥哥比我高。', explanation: 'A 比 B + Tính từ.' },
      { id: 'y4e3', type: 'quiz', question: 'YCT 4: Từ "健康" (jiànkāng) có nghĩa là gì?', hanzi: '健康', pinyin: 'jiànkāng', options: ['Khỏe mạnh', 'Mệt mỏi', 'Đói bụng', 'Khát nước'], answer: 'Khỏe mạnh', explanation: 'Sức khỏe dồi dào.' },
      { id: 'y4e4', type: 'quiz', question: 'YCT 4: "游泳" (yóuyǒng) là hoạt động gì?', hanzi: '游泳', pinyin: 'yóuyǒng', options: ['Bơi lội', 'Leo núi', 'Nhảy múa', 'Hát ca'], answer: 'Bơi lội', explanation: 'Bơi dưới làn nước mát.' },
      { id: 'y4e5', type: 'quiz', question: 'YCT 4: Dịch "Chúc bạn sức khỏe dồi dào!":', hanzi: '祝你身体健康！', pinyin: 'Zhù nǐ shēntǐ jiànkāng!', options: ['祝你身体健康！', '祝你生日快乐！', '祝你一路顺风！', '祝你新年快乐！'], answer: '祝你身体健康！', explanation: 'Lời chúc sức khỏe.' }
    ]
  },
  {
    id: 'yct-l5',
    grade: 'yct',
    unitNumber: 5,
    yctLevel: 5,
    titleVi: 'YCT Cấp độ 5: 1000 Từ vựng & Thuyết trình, viết đoạn văn ngắn',
    titleZh: 'YCT 五级：短文写作与演讲',
    pinyin: 'YCT Wǔ jí: Yǎnjiǎng yǔ xiězuò',
    description: 'Chuẩn quốc tế YCT 5: Thuyết trình về sở thích, viết thư cho bạn bè quốc tế, kể chuyện truyền thuyết Trung Hoa.',
    coverImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500&auto=format&fit=crop&q=60',
    vocabulary: [
      { id: 'y5v1', hanzi: '环境', pinyin: 'huánjìng', meaningVi: 'Môi trường', exampleZh: '我们要保护环境。', exampleVi: 'Chúng ta phải bảo vệ môi trường.' },
      { id: 'y5v2', hanzi: '文化', pinyin: 'wénhuà', meaningVi: 'Văn hóa', exampleZh: '中国传统文化很有意思。', exampleVi: 'Văn hóa truyền thống Trung Hoa rất thú vị.' },
      { id: 'y5v3', hanzi: '节日', pinyin: 'jiérì', meaningVi: 'Lễ hội, ngày lễ', exampleZh: '春节是中国最重要的节日。', exampleVi: 'Tết Nguyên Đán là lễ hội quan trọng nhất.' }
    ],
    grammar: [
      {
        id: 'y5g1',
        title: 'Mẫu câu nguyên nhân - kết quả: 因为 ... 所以 ...',
        structure: '因为 + Nguyên nhân, 所以 + Kết quả',
        explanation: 'Bởi vì... cho nên...',
        examples: [
          { zh: '因为下大雨，所以我们没去公园。', pinyin: 'Yīnwèi xià dàyǔ, suǒyǐ wǒmen méi qù gōngyuán.', vi: 'Vì trời mưa to nên chúng mình không ra công viên.' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'Bạn An', hanzi: '你最喜欢的中国传统节日是什么？', pinyin: 'Nǐ zuì xǐhuan de Zhōngguó chuántǒng jiérì shì shénme?', vi: 'Bạn thích lễ hội truyền thống nào nhất?', avatar: '👦' },
      { speaker: 'Bạn Mai', hanzi: '我最喜欢中秋节，因为可以吃月饼、看月亮！', pinyin: 'Wǒ zuì xǐhuan Zhōngqiūjié, yīnwèi kěyǐ chī yuèbǐng, kàn yuèliang!', vi: 'Mình thích nhất Tết Trung Thu, vì được ăn bánh trung thu và ngắm trăng rằm!', avatar: '👧' }
    ],
    exercises: [
      { id: 'y5e1', type: 'quiz', question: 'YCT 5: "中秋节" là ngày lễ gì?', hanzi: '中秋节', pinyin: 'Zhōngqiūjié', options: ['Tết Trung Thu', 'Tết Nguyên Đán', 'Tết Đoan Ngọ', 'Tết Thanh Minh'], answer: 'Tết Trung Thu', explanation: 'Tết Trung thu rước đèn ngắm trăng.' },
      { id: 'y5e2', type: 'quiz', question: 'YCT 5: Bánh trung thu trong tiếng Trung là:', hanzi: '月饼', pinyin: 'yuèbǐng', options: ['月饼 (yuèbǐng)', '饺子 (jiǎozi)', '粽子 (zòngzi)', '汤圆 (tāngyuán)'], answer: '月饼 (yuèbǐng)', explanation: 'Bánh hình vầng trăng tròn.' },
      { id: 'y5e3', type: 'quiz', question: 'YCT 5: Cặp liên từ "Bởi vì... Cho nên...":', hanzi: '因为...所以...', pinyin: 'Yīnwèi... suǒyǐ...', options: ['因为...所以...', '虽然...但是...', '不但...而且...', '如果...就...'], answer: '因为...所以...', explanation: 'Chỉ nguyên nhân kết quả.' },
      { id: 'y5e4', type: 'quiz', question: 'YCT 5: Từ "保护环境" có ý nghĩa:', hanzi: '保护环境', pinyin: 'bǎohù huánjìng', options: ['Bảo vệ môi trường', 'Bảo vệ trường học', 'Dọn dẹp phòng ngủ', 'Trồng cây xanh'], answer: 'Bảo vệ môi trường', explanation: 'Bảo vệ môi trường sống.' },
      { id: 'y5e5', type: 'quiz', question: 'YCT 5: Từ "文化" (wénhuà) nghĩa là gì?', hanzi: '文化', pinyin: 'wénhuà', options: ['Văn hóa', 'Văn học', 'Lịch sử', 'Toán học'], answer: 'Văn hóa', explanation: 'Văn hóa dân tộc.' }
    ]
  },
  {
    id: 'yct-l6',
    grade: 'yct',
    unitNumber: 6,
    yctLevel: 6,
    titleVi: 'YCT Cấp độ 6: 1500+ Từ vựng & Đọc hiểu chuyên sâu, tranh luận',
    titleZh: 'YCT 六级：高级阅读与辩论',
    pinyin: 'YCT Liù jí: Gāojí yuèdú',
    description: 'Chuẩn quốc tế YCT 6: Cấp độ cao nhất dành cho thiếu nhi và học sinh THCS, tự tin giao tiếp như người bản xứ.',
    coverImage: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=500&auto=format&fit=crop&q=60',
    vocabulary: [
      { id: 'y6v1', hanzi: '交流', pinyin: 'jiāoliú', meaningVi: 'Giao lưu, trao đổi', exampleZh: '文化交流增进两国的友谊。', exampleVi: 'Giao lưu văn hóa thắt chặt tình hữu nghị hai nước.' },
      { id: 'y6v2', hanzi: '丰富', pinyin: 'fēngfù', meaningVi: 'Phong phú, đa dạng', exampleZh: '他的课外活动很丰富。', exampleVi: 'Hoạt động ngoại khóa của bạn ấy rất phong phú.' },
      { id: 'y6v3', hanzi: '坚持', pinyin: 'jiānchí', meaningVi: 'Kiên trì', exampleZh: '坚持每天练习中文。', exampleVi: 'Kiên trì luyện tập tiếng Trung mỗi ngày.' }
    ],
    grammar: [
      {
        id: 'y6g1',
        title: 'Mẫu câu nhượng bộ: 无论 ... 都 ... (Cho dù ... cũng đều ...)',
        structure: '无论 + Điều kiện, 主语 + 都 + Kết quả',
        explanation: 'Biểu đạt sự kiên định không thay đổi dù hoàn cảnh thế nào.',
        examples: [
          { zh: '无论遇到什么困难，我们都要坚持努力。', pinyin: 'Wúlùn yù dào shénme kùnnan, wǒmen dōu yào jiānchí nǔlì.', vi: 'Cho dù gặp bất kỳ khó khăn nào, chúng ta đều phải kiên trì nỗ lực.' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'Giám khảo YCT', hanzi: '祝贺你通过了YCT六级考试！你有什么学习秘诀吗？', pinyin: 'Zhùhè nǐ tōngguò le YCT liù jí kǎoshì! Nǐ yǒu shénme xuéxí mìjué ma?', vi: 'Chúc mừng em đã thi đỗ YCT Cấp 6! Em có bí quyết học tập nào không?', avatar: '👩‍🏫' },
      { speaker: 'Thí sinh', hanzi: '我的秘诀就是每天坚持10分钟，多听多说，永不放弃！', pinyin: 'Wǒ de mìjué jiù shì měitiān jiānchí shí fēnzhōng, duō tīng duō shuō, yǒng bù fàngqì!', vi: 'Bí quyết của em là mỗi ngày kiên trì 10 phút, nghe nhiều nói nhiều và không bao giờ từ bỏ!', avatar: '👦' }
    ],
    exercises: [
      { id: 'y6e1', type: 'quiz', question: 'YCT 6: "坚持" (jiānchí) có nghĩa là gì?', hanzi: '坚持', pinyin: 'jiānchí', options: ['Kiên trì, bền chí', 'Từ bỏ', 'Nghỉ ngơi', 'Lười biếng'], answer: 'Kiên trì, bền chí', explanation: 'Kiên trì vượt qua khó khăn.' },
      { id: 'y6e2', type: 'quiz', question: 'YCT 6: Cấu trúc "无论...都...":', hanzi: '无论...都...', pinyin: 'Wúlùn... dōu...', options: ['Cho dù... cũng đều...', 'Bởi vì... cho nên...', 'Nếu như... thì...', 'Không những... mà còn...'], answer: 'Cho dù... cũng đều...', explanation: 'Biểu thị sự kiên định.' },
      { id: 'y6e3', type: 'quiz', question: 'YCT 6: "友谊" (yǒuyì) là gì?', hanzi: '友谊', pinyin: 'yǒuyì', options: ['Tình bạn, tình hữu nghị', 'Tình yêu', 'Gia đình', 'Trường học'], answer: 'Tình bạn, tình hữu nghị', explanation: 'Tình hữu nghị bang giao.' },
      { id: 'y6e4', type: 'quiz', question: 'YCT 6: Dịch "Hoạt động ngoại khóa rất phong phú":', hanzi: '课外活动很丰富', pinyin: 'kèwài huódòng hěn fēngfù', options: ['课外活动很丰富', '课外活动很少', '我不喜欢课外活动', '课外活动很累'], answer: '课外活动很丰富', explanation: 'Phong phú = 丰富.' },
      { id: 'y6e5', type: 'quiz', question: 'YCT 6: Cấp độ cao nhất của kỳ thi YCT là cấp mấy?', hanzi: 'YCT 6', pinyin: 'YCT liù jí', options: ['Cấp 6 (YCT 6)', 'Cấp 4', 'Cấp 5', 'Cấp 3'], answer: 'Cấp 6 (YCT 6)', explanation: 'YCT có 6 cấp độ (YCT 1 đến 6).' }
    ]
  }
];

export const HSK_ALL_LEVELS_UNITS: LearningUnit[] = [
  // ==========================================
  // HSK 1 (PHIÊN BẢN 3.0 - 500 TỪ VỰNG CỐT LÕI)
  // ==========================================
  {
    id: 'hsk-l1-u1',
    grade: 'hsk',
    unitNumber: 1,
    hskLevel: 1,
    titleVi: 'HSK 1 (3.0) - Bài 1: Chào hỏi, Danh xưng & Giới thiệu bản thân',
    titleZh: 'HSK 1级：打招呼与自我介绍',
    pinyin: 'HSK Yī jí: Dǎ zhāohu yǔ zìwǒ jièshào',
    description: 'Chuẩn HSK 3.0 mới nhất: 500 từ vựng nền tảng, chào hỏi trang trọng, xưng hô, câu phán đoán 是 và đại từ nhân xưng.',
    coverImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=500&auto=format&fit=crop&q=60',
    vocabulary: [
      { id: 'h1v1', hanzi: '你好', pinyin: 'nǐ hǎo', meaningVi: 'Xin chào', exampleZh: '老师，你好！', exampleVi: 'Em chào cô giáo ạ!' },
      { id: 'h1v2', hanzi: '叫', pinyin: 'jiào', meaningVi: 'Tên là, gọi là', exampleZh: '我叫李明。', exampleVi: 'Tôi tên là Lý Minh.' },
      { id: 'h1v3', hanzi: '什么', pinyin: 'shénme', meaningVi: 'Cái gì', exampleZh: '你叫什么名字？', exampleVi: 'Bạn tên là gì?' },
      { id: 'h1v4', hanzi: '名字', pinyin: 'míngzi', meaningVi: 'Tên họ', exampleZh: '这是我的名字。', exampleVi: 'Đây là tên của tôi.' },
      { id: 'h1v5', hanzi: '是', pinyin: 'shì', meaningVi: 'Là (đúng)', exampleZh: '我是越南人。', exampleVi: 'Tôi là người Việt Nam.' },
      { id: 'h1v6', hanzi: '学生', pinyin: 'xuésheng', meaningVi: 'Học sinh, sinh viên', exampleZh: '我们都是好学生。', exampleVi: 'Chúng tôi đều là học sinh chăm ngoan.' },
      { id: 'h1v7', hanzi: '老师', pinyin: 'lǎoshī', meaningVi: 'Thầy / Cô giáo', exampleZh: '她是我的中文老师。', exampleVi: 'Cô ấy là giáo viên tiếng Trung của tôi.' },
      { id: 'h1v8', hanzi: '国籍', pinyin: 'guójí', meaningVi: 'Quốc tịch (HSK 3.0)', exampleZh: '你的国籍是什么？', exampleVi: 'Quốc tịch của bạn là gì?' },
      { id: 'h1v9', hanzi: '认识', pinyin: 'rènshi', meaningVi: 'Quen biết, nhận biết', exampleZh: '认识你很高兴！', exampleVi: 'Rất vui được làm quen với bạn!' },
    ],
    grammar: [
      {
        id: 'h1g1',
        title: 'Câu phán đoán khẳng định & phủ định: 是 (shì) / 不是 (bú shì)',
        structure: 'Chủ ngữ + 是 / 不是 + Danh từ',
        explanation: 'Dùng “是” để khẳng định danh tính hoặc quốc tịch, thêm “不” (bù) phía trước để phủ định.',
        examples: [
          { zh: '我是学生，不是老师。', pinyin: 'Wǒ shì xuésheng, bú shì lǎoshī.', vi: 'Tôi là học sinh, không phải giáo viên.' },
          { zh: '他是中国人。', pinyin: 'Tā shì Zhōngguó rén.', vi: 'Anh ấy là người Trung Quốc.' }
        ]
      },
      {
        id: 'h1g2',
        title: 'Hỏi tên họ với đại từ nghi vấn: 什么 (shénme)',
        structure: '你 + 叫 + 什么 + 名字？',
        explanation: 'Mẫu câu hỏi tên cơ bản và lịch sự nhất trong giao tiếp tiếng Trung chuẩn HSK 1.',
        examples: [
          { zh: '你叫什么名字？', pinyin: 'Nǐ jiào shénme míngzi?', vi: 'Bạn tên là gì?' },
          { zh: '我叫阮文安。', pinyin: 'Wǒ jiào Ruǎn Wén\'ān.', vi: 'Tôi tên là Nguyễn Văn An.' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'Lý Hoa', hanzi: '你好！请问你叫什么名字？', pinyin: 'Nǐ hǎo! Qǐngwèn nǐ jiào shénme míngzi?', vi: 'Xin chào! Xin hỏi bạn tên là gì vậy?', avatar: '👧' },
      { speaker: 'Minh Hoàng', hanzi: '你好！我叫明黄。你是老师吗？', pinyin: 'Nǐ hǎo! Wǒ jiào Mínghuáng. Nǐ shì lǎoshī ma?', vi: 'Chào bạn! Mình tên là Minh Hoàng. Bạn có phải là giáo viên không?', avatar: '👦' },
      { speaker: 'Lý Hoa', hanzi: '不是，我也是学生。认识你很高兴！', pinyin: 'Bú shì, wǒ yě shì xuésheng. Rènshi nǐ hěn gāoxìng!', vi: 'Không phải đâu, mình cũng là học sinh. Rất vui được quen biết bạn!', avatar: '👧' },
      { speaker: 'Minh Hoàng', hanzi: '认识你我也很高兴！', pinyin: 'Rènshi nǐ wǒ yě hěn gāoxìng!', vi: 'Mình cũng rất vui được làm quen với bạn!', avatar: '👦' }
    ],
    exercises: [
      { id: 'h1e1', type: 'quiz', question: 'HSK 1 (3.0): Từ "认识" (rènshi) có nghĩa là gì?', hanzi: '认识', pinyin: 'rènshi', options: ['Quen biết / Nhận biết', 'Tạm biệt', 'Cảm ơn', 'Ăn uống'], answer: 'Quen biết / Nhận biết', explanation: '认识: Quen biết (VD: 认识你很高兴).' },
      { id: 'h1e2', type: 'quiz', question: 'HSK 1 (3.0): Điền từ vào chỗ trống: "我____越南人，不是中国人。"', hanzi: '是', pinyin: 'shì', options: ['是 (shì)', '叫 (jiào)', '喝 (hē)', '吃 (chī)'], answer: '是 (shì)', explanation: 'Tôi là người Việt Nam (我是越南人).' },
      { id: 'h1e3', type: 'quiz', question: 'HSK 1 (3.0): Câu hỏi chuẩn: "Bạn tên là gì?":', hanzi: '你叫什么名字？', pinyin: 'Nǐ jiào shénme míngzi?', options: ['你叫什么名字？', '你是哪国人？', '你多大了？', '你在哪儿？'], answer: '你叫什么名字？', explanation: '你叫什么名字 là mẫu câu hỏi tên.' },
      { id: 'h1e4', type: 'quiz', question: 'HSK 1 (3.0): Câu trả lời lịch sự cho "认识你很高兴！" là:', hanzi: '认识你我也很高兴！', pinyin: 'Rènshi nǐ wǒ yě hěn gāoxìng!', options: ['认识你我也很高兴！', '对不起！', '没关系！', '不用谢！'], answer: '认识你我也很高兴！', explanation: 'Mình cũng rất vui được làm quen với bạn!' },
      { id: 'h1e5', type: 'quiz', question: 'HSK 1 (3.0): Từ nào mang nghĩa "Học sinh"?', hanzi: '学生', pinyin: 'xuésheng', options: ['学生 (xuésheng)', '老师 (lǎoshī)', '医生 (yīshēng)', '爸爸 (bàba)'], answer: '学生 (xuésheng)', explanation: '学生 là học sinh / sinh viên.' }
    ]
  },
  {
    id: 'hsk-l1-u2',
    grade: 'hsk',
    unitNumber: 2,
    hskLevel: 1,
    titleVi: 'HSK 1 (3.0) - Bài 2: Gia đình, Thời gian & Lịch sinh hoạt',
    titleZh: 'HSK 1级：家庭成员与时间表达',
    pinyin: 'HSK Yī jí: Jiātíng chéngyuán yǔ shíjiān biǎodá',
    description: 'Chuẩn HSK 3.0: Hỏi số thành viên gia đình (几口人), nói giờ phút, thứ ngày tháng và lượng từ 个, 口.',
    coverImage: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=500&auto=format&fit=crop&q=60',
    vocabulary: [
      { id: 'h1v10', hanzi: '家', pinyin: 'jiā', meaningVi: 'Nhà, gia đình', exampleZh: '我家在北京。', exampleVi: 'Nhà tôi ở Bắc Kinh.' },
      { id: 'h1v11', hanzi: '口', pinyin: 'kǒu', meaningVi: 'Lượng từ (người trong nhà)', exampleZh: '我家有四口人。', exampleVi: 'Nhà tôi có 4 người.' },
      { id: 'h1v12', hanzi: '爸爸', pinyin: 'bàba', meaningVi: 'Bố, cha', exampleZh: '我爸爸是医生。', exampleVi: 'Bố tôi là bác sĩ.' },
      { id: 'h1v13', hanzi: '妈妈', pinyin: 'māma', meaningVi: 'Mẹ, má', exampleZh: '我爱我妈妈。', exampleVi: 'Tôi yêu mẹ của tôi.' },
      { id: 'h1v14', hanzi: '现在', pinyin: 'xiànzài', meaningVi: 'Bây giờ, hiện tại', exampleZh: '现在几点？', exampleVi: 'Bây giờ là mấy giờ?' },
      { id: 'h1v15', hanzi: '点', pinyin: 'diǎn', meaningVi: 'Giờ (thời gian)', exampleZh: '现在八点了。', exampleVi: 'Bây giờ là 8 giờ rồi.' },
      { id: 'h1v16', hanzi: '星期', pinyin: 'xīngqī', meaningVi: 'Thứ, tuần', exampleZh: '今天星期几？', exampleVi: 'Hôm nay là thứ mấy?' },
    ],
    grammar: [
      {
        id: 'h1g3',
        title: 'Hỏi số lượng người trong nhà: 你家有几口人？',
        structure: 'Chủ ngữ + 有 + Số từ + 口 + 人',
        explanation: '“口” (kǒu) là lượng từ chuyên dùng để đếm số nhân khẩu trong một gia đình.',
        examples: [
          { zh: '你家有几口人？', pinyin: 'Nǐ jiā yǒu jǐ kǒu rén?', vi: 'Nhà bạn có mấy người?' },
          { zh: '我家有四口人：爸爸、妈妈、哥哥和我。', pinyin: 'Wǒ jiā yǒu sì kǒu rén: bàba, māma, gēge hé wǒ.', vi: 'Nhà tôi có 4 người: bố, mẹ, anh trai và tôi.' }
        ]
      },
      {
        id: 'h1g4',
        title: 'Hỏi và nói thời gian: 现在几点？(Xiànzài jǐ diǎn?)',
        structure: '现在 + [Số từ] + 点 + [Số từ] + 分',
        explanation: 'Dùng “几点” để hỏi mấy giờ. Thứ tự nói: Giờ trước, phút sau.',
        examples: [
          { zh: '现在几点？', pinyin: 'Xiànzài jǐ diǎn?', vi: 'Bây giờ là mấy giờ rồi?' },
          { zh: '现在九点三十分。', pinyin: 'Xiànzài jiǔ diǎn sānshí fēn.', vi: 'Bây giờ là 9 giờ 30 phút.' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'Tiểu Vũ', hanzi: '大卫，你家有几口人？', pinyin: 'Dàwèi, nǐ jiā yǒu jǐ kǒu rén?', vi: 'David ơi, nhà cậu có mấy người thế?', avatar: '👦' },
      { speaker: 'David', hanzi: '我家有五口人：爸爸、妈妈、姐姐、弟弟和我。', pinyin: 'Wǒ jiā yǒu wǔ kǒu rén: bàba, māma, jiějie, dìdi hé wǒ.', vi: 'Nhà mình có 5 người: bố, mẹ, chị gái, em trai và mình.', avatar: '🧑' },
      { speaker: 'Tiểu Vũ', hanzi: '现在几点了？我们该去上课了吗？', pinyin: 'Xiànzài jǐ diǎn le? Wǒmen gāi qù shàngkè le ma?', vi: 'Bây giờ mấy giờ rồi nhỉ? Chúng mình phải vào lớp chưa?', avatar: '👦' },
      { speaker: 'David', hanzi: '现在八点一刻，我们走吧！', pinyin: 'Xiànzài bā diǎn yí kè, wǒmen zǒu ba!', vi: 'Bây giờ là 8 giờ 15 phút rồi, chúng mình đi thôi!', avatar: '🧑' }
    ],
    exercises: [
      { id: 'h1e6', type: 'quiz', question: 'HSK 1 (3.0): Lượng từ nào dùng để đếm nhân khẩu gia đình?', hanzi: '口', pinyin: 'kǒu', options: ['口 (kǒu)', '只 (zhī)', '本 (běn)', '支 (zhī)'], answer: '口 (kǒu)', explanation: 'Dùng 口 trong "几口人".' },
      { id: 'h1e7', type: 'quiz', question: 'HSK 1 (3.0): "现在八点半" nghĩa là mấy giờ?', hanzi: '现在八点半', pinyin: 'Xiànzài bā diǎn bàn', options: ['Bây giờ là 8 giờ 30 phút', 'Bây giờ là 7 giờ 30 phút', 'Bây giờ là 8 giờ đúng', 'Bây giờ là 9 giờ 30 phút'], answer: 'Bây giờ là 8 giờ 30 phút', explanation: '八 là 8, 半 là rưỡi/nửa (30 phút).' },
      { id: 'h1e8', type: 'quiz', question: 'HSK 1 (3.0): Hỏi "Hôm nay là thứ mấy?":', hanzi: '今天星期几？', pinyin: 'Jīntiān xīngqī jǐ?', options: ['今天星期几？', '今天几号？', '今年多大？', '几点了？'], answer: '今天星期几？', explanation: '星期几: Thứ mấy trong tuần.' },
      { id: 'h1e9', type: 'quiz', question: 'HSK 1 (3.0): Từ "妈妈" (māma) là ai trong gia đình?', hanzi: '妈妈', pinyin: 'māma', options: ['Mẹ', 'Bố', 'Chị gái', 'Bà ngoại'], answer: 'Mẹ', explanation: '妈妈: Người mẹ.' },
      { id: 'h1e10', type: 'quiz', question: 'HSK 1 (3.0): "Một khắc" (一刻 - yí kè) tương đương bao nhiêu phút?', hanzi: '一刻', pinyin: 'yí kè', options: ['15 phút', '30 phút', '45 phút', '60 phút'], answer: '15 phút', explanation: '一刻 = 15 phút trong tiếng Trung.' }
    ]
  },

  // ==========================================
  // HSK 2 (PHIÊN BẢN 3.0 - 772 TỪ VỰNG TÍCH LŨY)
  // ==========================================
  {
    id: 'hsk-l2-u1',
    grade: 'hsk',
    unitNumber: 1,
    hskLevel: 2,
    titleVi: 'HSK 2 (3.0) - Bài 1: Mua sắm hàng quán, Giá cả & Vị trí',
    titleZh: 'HSK 2级：超市购物、价格与方位',
    pinyin: 'HSK Èr jí: Chāoshì gòuwù, jiàgé yǔ fāngwèi',
    description: 'Chuẩn HSK 3.0 Cấp 2: Tích lũy 772 từ vựng, mua sắm hoa quả, hỏi giá tiền (多少钱, 便宜点), vị trí khoảng cách (离...远/近).',
    coverImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=60',
    vocabulary: [
      { id: 'h2v1', hanzi: '买', pinyin: 'mǎi', meaningVi: 'Mua', exampleZh: '我想买苹果。', exampleVi: 'Tôi muốn mua táo.' },
      { id: 'h2v2', hanzi: '多少', pinyin: 'duōshao', meaningVi: 'Bao nhiêu', exampleZh: '这个多少钱？', exampleVi: 'Cái này bao nhiêu tiền?' },
      { id: 'h2v3', hanzi: '块', pinyin: 'kuài', meaningVi: 'Đồng, tệ (khẩu ngữ)', exampleZh: '一斤苹果五块钱。', exampleVi: 'Một cân táo giá 5 tệ.' },
      { id: 'h2v4', hanzi: '贵', pinyin: 'guì', meaningVi: 'Đắt', exampleZh: '太贵了，便宜点吧！', exampleVi: 'Đắt quá, bớt chút đi bạn ơi!' },
      { id: 'h2v5', hanzi: '便宜', pinyin: 'piányi', meaningVi: 'Rẻ, phải chăng', exampleZh: '这件衣服很便宜。', exampleVi: 'Bộ quần áo này rất rẻ.' },
      { id: 'h2v6', hanzi: '离', pinyin: 'lí', meaningVi: 'Cách (khoảng cách)', exampleZh: '学校离我家很近。', exampleVi: 'Trường học cách nhà tôi rất gần.' },
      { id: 'h2v7', hanzi: '远', pinyin: 'yuǎn', meaningVi: 'Xa', exampleZh: '那里离这儿太远了。', exampleVi: 'Chỗ đó cách đây xa quá.' },
      { id: 'h2v8', hanzi: '近', pinyin: 'jìn', meaningVi: 'Gần', exampleZh: '超市离医院很近。', exampleVi: 'Siêu thị cách bệnh viện rất gần.' }
    ],
    grammar: [
      {
        id: 'h2g1',
        title: 'Cấu trúc chỉ khoảng cách: A 离 B + [很远 / 很近 / Bao nhiêu mét]',
        structure: 'Địa điểm A + 离 + Địa điểm B + 很远 / 近',
        explanation: 'Dùng “离” (lí) để diễn tả khoảng cách địa lý giữa hai địa điểm.',
        examples: [
          { zh: '我家离学校不远。', pinyin: 'Wǒ jiā lí xuéxiào bù yuǎn.', vi: 'Nhà tôi cách trường không xa.' },
          { zh: '医院离这儿有多远？', pinyin: 'Yīyuàn lí zhèr yǒu duō yuǎn?', vi: 'Bệnh viện cách đây bao xa?' }
        ]
      },
      {
        id: 'h2g2',
        title: 'Mặc cả và hỏi giá: 太 ... 了，便宜点吧！',
        structure: '太 + Tính từ + 了，便宜点吧！',
        explanation: 'Mẫu câu đàm phán mua hàng cực kỳ phổ biến trong đề thi HSK 2.',
        examples: [
          { zh: '太贵了，十块钱可以吗？', pinyin: 'Tài guì le, shí kuài qián kěyǐ ma?', vi: 'Đắt quá rồi, 10 tệ được không?' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'Khách hàng', hanzi: '老板，这种西瓜一斤多少钱？', pinyin: 'Lǎobǎn, zhè zhǒng xīguā yì jīn duōshao qián?', vi: 'Bác chủ ơi, loại dưa hấu này bao nhiêu tiền một cân?', avatar: '👩' },
      { speaker: 'Chủ quán', hanzi: '三块五一斤，非常甜！你要几个？', pinyin: 'Sān kuài wǔ yì jīn, fēicháng tián! Nǐ yào jǐ gè?', vi: '3 tệ 5 một cân, ngọt lịm luôn! Cháu muốn lấy mấy quả?', avatar: '👨' },
      { speaker: 'Khách hàng', hanzi: '给我一个大西瓜。请问超市离这儿远不远？', pinyin: 'Gěi wǒ yí gè dà xīguā. Qǐngwèn chāoshì lí zhèr yuǎn bù yuǎn?', vi: 'Cho cháu một quả to nhé ạ. Cho cháu hỏi siêu thị cách đây có xa không ạ?', avatar: '👩' },
      { speaker: 'Chủ quán', hanzi: '不远，往前走两百米就到了。', pinyin: 'Bù yuǎn, wǎng qián zǒu liǎng bǎi mǐ jiù dào le.', vi: 'Không xa đâu, đi thẳng về phía trước 200 mét là tới rồi.', avatar: '👨' }
    ],
    exercises: [
      { id: 'h2e1', type: 'quiz', question: 'HSK 2 (3.0): Hỏi "Cái này bao nhiêu tiền?":', hanzi: '这个多少钱？', pinyin: 'Zhège duōshao qián?', options: ['这个多少钱？', '这个怎么样？', '这是什么？', '你在哪里？'], answer: '这个多少钱？', explanation: '多少钱 là bao nhiêu tiền.' },
      { id: 'h2e2', type: 'quiz', question: 'HSK 2 (3.0): Điền từ: "我家____学校很近，每天走路去。"', hanzi: '离', pinyin: 'lí', options: ['离 (lí)', '往 (wǎng)', '在 (zài)', '到 (dào)'], answer: '离 (lí)', explanation: 'A 离 B 很近: A cách B rất gần.' },
      { id: 'h2e3', type: 'quiz', question: 'HSK 2 (3.0): Trái nghĩa với "贵" (đắt) là từ nào?', hanzi: '便宜', pinyin: 'piányi', options: ['便宜 (piányi)', '好 (hǎo)', '大 (dà)', '高 (gāo)'], answer: '便宜 (piányi)', explanation: '便宜 nghĩa là rẻ, vừa túi tiền.' },
      { id: 'h2e4', type: 'quiz', question: 'HSK 2 (3.0): Cụm từ "三块五" có nghĩa là:', hanzi: '三块五', pinyin: 'sān kuài wǔ', options: ['3 tệ 5 hào (3.5 tệ)', '35 tệ', '3 tệ', '5 tệ'], answer: '3 tệ 5 hào (3.5 tệ)', explanation: 'Trong khẩu ngữ, 三块五 là 3 tệ 5 hào.' },
      { id: 'h2e5', type: 'quiz', question: 'HSK 2 (3.0): Dịch câu "Đi về phía trước":', hanzi: '往前走', pinyin: 'wǎng qián zǒu', options: ['往前走', '往后看', '往左转', '往右拐'], answer: '往前走', explanation: '往 + Phương vị + Động từ (往前走: đi về phía trước).' }
    ]
  },
  {
    id: 'hsk-l2-u2',
    grade: 'hsk',
    unitNumber: 2,
    hskLevel: 2,
    titleVi: 'HSK 2 (3.0) - Bài 2: Phương tiện giao thông & Trợ từ động thái 了',
    titleZh: 'HSK 2级：交通方式与动态助词“了”',
    pinyin: 'HSK Èr jí: Jiāotōng fāngshì yǔ dòngtài zhùcí "le"',
    description: 'Chuẩn HSK 3.0: Di chuyển bằng máy bay, tàu hỏa, xe bus, taxi; sử dụng câu liên động và trợ từ 了 diễn đạt sự việc đã hoàn tất.',
    coverImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=500&auto=format&fit=crop&q=60',
    vocabulary: [
      { id: 'h2v9', hanzi: '飞机', pinyin: 'fēijī', meaningVi: 'Máy bay', exampleZh: '坐飞机去上海。', exampleVi: 'Đi Thượng Hải bằng máy bay.' },
      { id: 'h2v10', hanzi: '出租车', pinyin: 'chūzūchē', meaningVi: 'Xe taxi', exampleZh: '我们打出租车吧。', exampleVi: 'Chúng mình gọi taxi đi.' },
      { id: 'h2v11', hanzi: '车站', pinyin: 'chēzhàn', meaningVi: 'Bến xe, nhà ga', exampleZh: '我在公共汽车站等你。', exampleVi: 'Mình đợi bạn ở trạm xe bus.' },
      { id: 'h2v12', hanzi: '准备', pinyin: 'zhǔnbèi', meaningVi: 'Chuẩn bị', exampleZh: '你准备好了吗？', exampleVi: 'Bạn đã chuẩn bị xong chưa?' },
      { id: 'h2v13', hanzi: '已经', pinyin: 'yǐjīng', meaningVi: 'Đã (rồi)', exampleZh: '我已经吃过饭了。', exampleVi: 'Tôi đã ăn cơm xong rồi.' },
      { id: 'h2v14', hanzi: '了', pinyin: 'le', meaningVi: 'Rồi (trợ từ hoàn thành)', exampleZh: '下雨了。', exampleVi: 'Trời mưa rồi.' },
    ],
    grammar: [
      {
        id: 'h2g3',
        title: 'Câu liên động chỉ cách thức đi lại: 坐 / 骑 / 开 + Phương tiện + 去 + Địa điểm',
        structure: 'Chủ ngữ + 坐/开/骑 + Xe + 去 + Nơi đến',
        explanation: 'Động từ 1 diễn đạt phương tiện di chuyển, Động từ 2 chỉ hành động mục đích.',
        examples: [
          { zh: '他每天坐公共汽车去上班。', pinyin: 'Tā měitiān zuò gōnggòng qìchē qù shàngbān.', vi: 'Anh ấy đi xe buýt đi làm mỗi ngày.' },
          { zh: '我们坐飞机去北京。', pinyin: 'Wǒmen zuò fēijī qù Běijīng.', vi: 'Chúng tôi đi máy bay tới Bắc Kinh.' }
        ]
      },
      {
        id: 'h2g4',
        title: 'Cấu trúc hoàn thành: 已经 ... 了 (Đã ... rồi)',
        structure: 'Chủ ngữ + 已经 + Động từ + 了',
        explanation: 'Nhấn mạnh hành động đã xảy ra xong trước thời điểm nói.',
        examples: [
          { zh: '飞机已经起飞了。', pinyin: 'Fēijī yǐjīng qǐfēi le.', vi: 'Máy bay đã cất cánh rồi.' },
          { zh: '我已经做好准备了。', pinyin: 'Wǒ yǐjīng zuò hǎo zhǔnbèi le.', vi: 'Tôi đã chuẩn bị sẵn sàng rồi.' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'Lâm Lâm', hanzi: '小明，你的行李准备好了吗？', pinyin: 'Xiǎomíng, nǐ de xíngli zhǔnbèi hǎo le ma?', vi: 'Tiểu Minh ơi, hành lý của cậu đã chuẩn bị xong xuôi chưa?', avatar: '👧' },
      { speaker: 'Tiểu Minh', hanzi: '我已经准备好了！我们怎么去机场？', pinyin: 'Wǒ yǐjīng zhǔnbèi hǎo le! Wǒmen zěnme qù jīchǎng?', vi: 'Mình đã chuẩn bị xong hết rồi! Chúng mình đi đến sân bay bằng gì thế?', avatar: '👦' },
      { speaker: 'Lâm Lâm', hanzi: '坐地铁很快，不会堵车。', pinyin: 'Zuò dìtiě hěn kuài, bú huì dǔchē.', vi: 'Đi tàu điện ngầm rất nhanh, sẽ không lo bị tắc đường.', avatar: '👧' },
      { speaker: 'Tiểu Minh', hanzi: '太好了，那我们现在就出发吧！', pinyin: 'Tài hǎo le, nà wǒmen xiànzài jiù chūfā ba!', vi: 'Tuyệt quá, vậy bây giờ chúng mình xuất phát luôn thôi!', avatar: '👦' }
    ],
    exercises: [
      { id: 'h2e6', type: 'quiz', question: 'HSK 2 (3.0): Từ "出租车" (chūzūchē) nghĩa là xe gì?', hanzi: '出租车', pinyin: 'chūzūchē', options: ['Xe taxi', 'Xe đạp', 'Xe buýt', 'Máy bay'], answer: 'Xe taxi', explanation: '出租车: Xe taxi chở khách.' },
      { id: 'h2e7', type: 'quiz', question: 'HSK 2 (3.0): Điền cặp từ: "我____做完作业____。"', hanzi: '已经...了', pinyin: 'yǐjīng... le', options: ['已经...了', '虽然...但是', '因为...所以', '不仅...而且'], answer: '已经...了', explanation: 'Đã hoàn thành xong rồi.' },
      { id: 'h2e8', type: 'quiz', question: 'HSK 2 (3.0): Động từ đi kèm với "飞机" (máy bay) khi làm hành khách:', hanzi: '坐', pinyin: 'zuò', options: ['坐 (zuò)', '骑 (qí)', '跑 (pǎo)', '踢 (tī)'], answer: '坐 (zuò)', explanation: 'Ngồi máy bay: 坐飞机.' },
      { id: 'h2e9', type: 'quiz', question: 'HSK 2 (3.0): "机场" (jīchǎng) có nghĩa là gì?', hanzi: '机场', pinyin: 'jīchǎng', options: ['Sân bay, phi trường', 'Nhà ga tàu', 'Bến xe khách', 'Cảng biển'], answer: 'Sân bay, phi trường', explanation: '机场: Sân bay máy bay.' },
      { id: 'h2e10', type: 'quiz', question: 'HSK 2 (3.0): Từ "准备" (zhǔnbèi) có nghĩa là:', hanzi: '准备', pinyin: 'zhǔnbèi', options: ['Chuẩn bị', 'Bắt đầu', 'Kết thúc', 'Học tập'], answer: 'Chuẩn bị', explanation: '准备: Chuẩn bị chu đáo.' }
    ]
  },

  // ==========================================
  // HSK 3 (PHIÊN BẢN 3.0 - 973 TỪ VỰNG TÍCH LŨY)
  // ==========================================
  {
    id: 'hsk-l3-u1',
    grade: 'hsk',
    unitNumber: 1,
    hskLevel: 3,
    titleVi: 'HSK 3 (3.0) - Bài 1: Bổ ngữ kết quả, Bổ ngữ xu hướng & So sánh 比',
    titleZh: 'HSK 3级：结果补语、趋向补语与比较句',
    pinyin: 'HSK Sān jí: Jiéguǒ bǔyǔ, qūxiàng bǔyǔ yǔ bǐjiàojù',
    description: 'Chuẩn HSK 3.0 Cấp 3: Tích lũy 973 từ vựng mới, bổ ngữ kết quả (懂, 完, 错, 见), bổ ngữ xu hướng kép (出来, 过去), câu so sánh 比 và 一样.',
    coverImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500&auto=format&fit=crop&q=60',
    vocabulary: [
      { id: 'h3v1', hanzi: '清楚', pinyin: 'qīngchu', meaningVi: 'Rõ ràng', exampleZh: '老师讲得很清楚。', exampleVi: 'Cô giáo giảng rất rõ ràng.' },
      { id: 'h3v2', hanzi: '明白', pinyin: 'míngbai', meaningVi: 'Hiểu, rõ', exampleZh: '我听明白了。', exampleVi: 'Tôi nghe hiểu rồi.' },
      { id: 'h3v3', hanzi: '完成', pinyin: 'wánchéng', meaningVi: 'Hoàn thành', exampleZh: '按时完成任务。', exampleVi: 'Hoàn thành nhiệm vụ đúng hạn.' },
      { id: 'h3v4', hanzi: '提高', pinyin: 'tígāo', meaningVi: 'Nâng cao, cải thiện', exampleZh: '提高听力水平。', exampleVi: 'Nâng cao trình độ nghe hiểu.' },
      { id: 'h3v5', hanzi: '比较', pinyin: 'bǐjiào', meaningVi: 'Khá là, so sánh', exampleZh: '这篇阅读比较难。', exampleVi: 'Bài đọc này tương đối khó.' },
      { id: 'h3v6', hanzi: '越来越', pinyin: 'yuè lái yuè', meaningVi: 'Càng ngày càng', exampleZh: '汉语越来越有意思。', exampleVi: 'Tiếng Trung càng ngày càng thú vị.' },
      { id: 'h3v7', hanzi: '相信', pinyin: 'xiāngxìn', meaningVi: 'Tin tưởng', exampleZh: '我相信你能考过！', exampleVi: 'Tôi tin bạn chắc chắn sẽ thi đỗ!' },
    ],
    grammar: [
      {
        id: 'h3g1',
        title: 'Bổ ngữ kết quả: Động từ + 懂 / 完 / 好 / 到 / 错',
        structure: 'Động từ + Bổ ngữ kết quả (懂/完/好/错...) + (Tân ngữ)',
        explanation: 'Diễn tả kết quả tất yếu phát sinh sau khi thực hiện hành động.',
        examples: [
          { zh: '你听懂老师说的话了吗？', pinyin: 'Nǐ tīng dǒng lǎoshī shuō de huà le ma?', vi: 'Em đã nghe hiểu lời thầy cô nói chưa?' },
          { zh: '我已经做完今天的HSK练习题了。', pinyin: 'Wǒ yǐjīng zuò wán jīntiān de HSK liànxí tí le.', vi: 'Mình đã làm xong đề luyện tập HSK hôm nay rồi.' }
        ]
      },
      {
        id: 'h3g2',
        title: 'Cấu trúc tăng tiến: 越来越 + Tính từ / Tâm lý động từ',
        structure: 'Chủ ngữ + 越来越 + Tính từ',
        explanation: 'Biểu thị mức độ của tính chất tăng dần theo dòng thời gian.',
        examples: [
          { zh: '他的中文说得越来越流利了。', pinyin: 'Tā de zhōngwén shuō de yuè lái yuè liúlì le.', vi: 'Tiếng Trung của anh ấy nói ngày càng lưu loát.' },
          { zh: '天气越来越冷了。', pinyin: 'Tiānqì yuè lái yuè lěng le.', vi: 'Thời tiết càng ngày càng lạnh.' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'Hoàng Lan', hanzi: '王老师，新版HSK 3.0考题比以前难吗？', pinyin: 'Wáng lǎoshī, xīn bǎn HSK 3.0 kǎotí bǐ yǐqián nán ma?', vi: 'Thầy Vương ơi, đề thi HSK 3.0 bản mới có khó hơn trước không ạ?', avatar: '👧' },
      { speaker: 'Thầy Vương', hanzi: '词汇量增加了，但只要每天多听多练，你一定能考好！刚才的听力你听懂了吗？', pinyin: 'Cíhuì liàng zēngjiā le, dàn zhǐyào měitiān duō tīng duō liàn, nǐ yídìng néng kǎo hǎo! Gāngcái de tīnglì nǐ tīng dǒng le ma?', vi: 'Lượng từ vựng có tăng thêm, nhưng chỉ cần mỗi ngày chăm nghe và luyện tập, em nhất định thi tốt! Bài nghe ban nãy em đã nghe hiểu hết chưa?', avatar: '👨‍🏫' },
      { speaker: 'Hoàng Lan', hanzi: '老师讲得非常清楚，我都听懂了！', pinyin: 'Lǎoshī jiǎng de fēicháng qīngchu, wǒ dōu tīng dǒng le!', vi: 'Thầy giảng vô cùng rõ ràng, em đều đã nghe hiểu hết rồi ạ!', avatar: '👧' }
    ],
    exercises: [
      { id: 'h3e1', type: 'quiz', question: 'HSK 3 (3.0): Bổ ngữ kết quả trong câu "我听懂了" là chữ nào?', hanzi: '懂', pinyin: 'dǒng', options: ['懂 (dǒng)', '听 (tīng)', '我 (wǒ)', '了 (le)'], answer: '懂 (dǒng)', explanation: '懂 (hiểu) là bổ ngữ kết quả đứng sau động từ 听.' },
      { id: 'h3e2', type: 'quiz', question: 'HSK 3 (3.0): Cấu trúc "越来越好" có nghĩa là gì?', hanzi: '越来越好', pinyin: 'yuè lái yuè hǎo', options: ['Càng ngày càng tốt đẹp hơn', 'Rất kém cỏi', 'Không có gì thay đổi', 'Tốt nhất từ trước đến nay'], answer: 'Càng ngày càng tốt đẹp hơn', explanation: '越来越...: Càng ngày càng...' },
      { id: 'h3e3', type: 'quiz', question: 'HSK 3 (3.0): Từ "提高" (tígāo) thường đi với cụm từ nào?', hanzi: '提高水平', pinyin: 'tígāo shuǐpíng', options: ['提高水平 (Nâng cao trình độ)', '提高天气', '提高吃饭', '提高昨天'], answer: '提高水平 (Nâng cao trình độ)', explanation: '提高水平 là cụm từ chuẩn.' },
      { id: 'h3e4', type: 'quiz', question: 'HSK 3 (3.0): So sánh hơn: "高铁____汽车快得多。"', hanzi: '比', pinyin: 'bǐ', options: ['比 (bǐ)', '跟 (gēn)', '对 (duì)', '往 (wǎng)'], answer: '比 (bǐ)', explanation: 'A 比 B + Tính từ (Tàu cao tốc nhanh hơn ô tô nhiều).' },
      { id: 'h3e5', type: 'quiz', question: 'HSK 3 (3.0): Từ "清楚" (qīngchu) mang ý nghĩa gì?', hanzi: '清楚', pinyin: 'qīngchu', options: ['Rõ ràng, rành mạch', 'Mơ hồ', 'Buồn ngủ', 'Vội vã'], answer: 'Rõ ràng, rành mạch', explanation: '清楚: Rõ ràng, dễ hiểu.' }
    ]
  },
  {
    id: 'hsk-l3-u2',
    grade: 'hsk',
    unitNumber: 2,
    hskLevel: 3,
    titleVi: 'HSK 3 (3.0) - Bài 2: Câu chữ 把 sơ cấp & Cặp liên từ phức hợp',
    titleZh: 'HSK 3级：把字句与复句关联词',
    pinyin: 'HSK Sān jí: Bǎ zì jù yǔ fùjù guānliáncí',
    description: 'Chuẩn HSK 3.0: Cấu trúc câu chữ 把 (xử lý sự vật), liên từ 虽然...但是... (Tuy... nhưng), 不仅...而且... (Không những... mà còn), Nếu... thì (如果...就).',
    coverImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&auto=format&fit=crop&q=60',
    vocabulary: [
      { id: 'h3v8', hanzi: '把', pinyin: 'bǎ', meaningVi: 'Lấy, đem (giới từ câu chữ 把)', exampleZh: '请把门关上。', exampleVi: 'Xin hãy đóng cửa lại.' },
      { id: 'h3v9', hanzi: '放', pinyin: 'fàng', meaningVi: 'Đặt, để', exampleZh: '把书放在桌子上。', exampleVi: 'Đặt quyển sách lên mặt bàn.' },
      { id: 'h3v10', hanzi: '解决', pinyin: 'jiějué', meaningVi: 'Giải quyết', exampleZh: '解决这个问题。', exampleVi: 'Giải quyết vấn đề này.' },
      { id: 'h3v11', hanzi: '虽然...但是...', pinyin: 'suīrán... dànshì...', meaningVi: 'Tuy... nhưng...', exampleZh: '虽然很累，但是很开心。', exampleVi: 'Tuy mệt nhưng rất vui.' },
      { id: 'h3v12', hanzi: '环境', pinyin: 'huánjìng', meaningVi: 'Môi trường', exampleZh: '保护生活环境。', exampleVi: 'Bảo vệ môi trường sống.' },
      { id: 'h3v13', hanzi: '坚持', pinyin: 'jiānchí', meaningVi: 'Kiên trì', exampleZh: '坚持每天学中文。', exampleVi: 'Kiên trì học tiếng Trung mỗi ngày.' },
    ],
    grammar: [
      {
        id: 'h3g3',
        title: 'Mẫu câu chữ 把 sơ cấp: Chủ ngữ + 把 + Tân ngữ + Động từ + Thành phần khác',
        structure: 'Chủ ngữ + 把 + Tân ngữ + Động từ + 在/到/给/了',
        explanation: 'Nhấn mạnh sự chủ động xử lý, tác động làm biến đổi hoặc thay đổi vị trí của tân ngữ.',
        examples: [
          { zh: '请把手机收起来。', pinyin: 'Qǐng bǎ shǒujī shōu qǐlái.', vi: 'Xin hãy cất điện thoại đi.' },
          { zh: '他把作业交给了老师。', pinyin: 'Tā bǎ zuòyè jiāo gěi le lǎoshī.', vi: 'Bạn ấy đã nộp bài tập cho thầy giáo rồi.' }
        ]
      },
      {
        id: 'h3g4',
        title: 'Cặp liên từ chuyển ngoặt: 虽然 ... 但是 ... (Tuy ... nhưng ...)',
        structure: '虽然 + Phân câu 1, 但是 + Phân câu 2',
        explanation: 'Nối hai mệnh đề có ý nghĩa đối lập, chuyển ngoặt nhẹ nhàng và tự nhiên.',
        examples: [
          { zh: '虽然学汉字有点难，但是我觉得很有意思。', pinyin: 'Suīrán xué hànzì yǒudiǎn nán, dànshì wǒ juéde hěn yǒu yìsi.', vi: 'Tuy học chữ Hán hơi khó nhưng mình thấy rất thú vị.' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'Thầy Hùng', hanzi: '李华，请把这份HSK 3.0模拟试卷发给大家。', pinyin: 'Lǐ Huá, qǐng bǎ zhè fèn HSK 3.0 mónǐ shìjuàn fā gěi dàjiā.', vi: 'Lý Hoa ơi, em hãy đem tập đề thi thử HSK 3.0 này phát cho các bạn nhé.', avatar: '👨‍🏫' },
      { speaker: 'Lý Hoa', hanzi: '好的老师。大家虽然时间紧，但是都非常努力！', pinyin: 'Hǎo de lǎoshī. Dàjiā suīrán shíjiān jǐn, dànshì dōu fēicháng nǔlì!', vi: 'Vâng ạ thầy. Mọi người tuy thời gian gấp gáp nhưng đều rất nỗ lực!', avatar: '👧' },
      { speaker: 'Thầy Hùng', hanzi: '很好！坚持到最后，大家一定能取得优异的成绩！', pinyin: 'Hěn hǎo! Jiānchí dào zuìhòu, dàjiā yídìng néng qǔdé yōuyì de chéngjì!', vi: 'Rất tốt! Kiên trì đến cùng, các em nhất định sẽ đạt được thành tích xuất sắc!', avatar: '👨‍🏫' }
    ],
    exercises: [
      { id: 'h3e6', type: 'quiz', question: 'HSK 3 (3.0): Điền liên từ: "____下雨，____他依然去学校。"', hanzi: '虽然...但是', pinyin: 'suīrán... dànshì', options: ['虽然...但是 (Tuy... nhưng)', '因为...所以', '只要...就', '不但...而且'], answer: '虽然...但是 (Tuy... nhưng)', explanation: 'Mối quan hệ chuyển ý tương phản.' },
      { id: 'h3e7', type: 'quiz', question: 'HSK 3 (3.0): Sắp xếp câu chữ 把: "把 / 请 / 窗户 / 打开"', hanzi: '请把窗户打开', pinyin: 'Qǐng bǎ chuānghu dǎkāi', options: ['请把窗户打开', '打开请把窗户', '窗户请把打开', '请打开把窗户'], answer: '请把窗户打开', explanation: 'Chủ ngữ + 把 + Tân ngữ + Động từ (请把窗户打开).' },
      { id: 'h3e8', type: 'quiz', question: 'HSK 3 (3.0): Từ "解决" (jiějué) có nghĩa là gì?', hanzi: '解决', pinyin: 'jiějué', options: ['Giải quyết (khó khăn, vấn đề)', 'Bỏ cuộc', 'Kéo dài', 'Bắt đầu'], answer: 'Giải quyết (khó khăn, vấn đề)', explanation: '解决问题: Giải quyết vấn đề.' },
      { id: 'h3e9', type: 'quiz', question: 'HSK 3 (3.0): Từ "坚持" (jiānchí) mang thông điệp gì?', hanzi: '坚持', pinyin: 'jiānchí', options: ['Kiên trì bền bỉ', 'Lười biếng', 'Chán nản', 'Bỏ dở giữa chừng'], answer: 'Kiên trì bền bỉ', explanation: '坚持: Kiên trì, không từ bỏ.' },
      { id: 'h3e10', type: 'quiz', question: 'HSK 3 (3.0): Câu "把书放在桌子上" nghĩa là gì?', hanzi: '把书放在桌子上', pinyin: 'Bǎ shū fàng zài zhuōzi shang', options: ['Đặt sách lên mặt bàn', 'Đọc sách dưới bàn', 'Cất sách vào cặp', 'Mua sách ở hiệu sách'], answer: 'Đặt sách lên mặt bàn', explanation: '把书放...: Đem sách đặt lên trên bàn.' }
    ]
  }
];

export const MOCK_STUDENTS: StudentRank[] = [
  { rank: 1, name: 'Nguyễn Minh Anh', school: 'TH Dịch Vọng A, Cầu Giấy', className: 'Lớp 4A1', avatar: '👧', xp: 5820, level: 18, streak: 35, badge: '🌟 Quán Quân YCT' },
  { rank: 2, name: 'Trần Gia Bảo', school: 'THCS Giảng Võ, Ba Đình', className: 'Lớp 6A3', avatar: '👦', xp: 5460, level: 17, streak: 31, badge: '⚡ Siêu Trí Tuệ' },
  { rank: 3, name: 'Lê Hoàng Yến Nhi', school: 'TH Thăng Long, Hoàn Kiếm', className: 'Lớp 5B', avatar: '🌸', xp: 5210, level: 16, streak: 28, badge: '🎯 Xạ Thủ Hán Tự' },
  { rank: 4, name: 'Phạm Đức Minh', school: 'THCS Cầu Giấy', className: 'Lớp 7A2', avatar: '🚀', xp: 4980, level: 15, streak: 26, badge: '🔥 Thần Tốc Độ' },
  { rank: 5, name: 'Vũ Ngọc Diệp', school: 'TH Nam Từ Liêm', className: 'Lớp 3C', avatar: '🎀', xp: 4750, level: 15, streak: 24, badge: '🐼 Panda Chăm Chỉ' },
  { rank: 6, name: 'Hoàng Tuấn Kiệt', school: 'THCS Archimedes', className: 'Lớp 6C', avatar: '🦁', xp: 4520, level: 14, streak: 22, badge: '💎 Chiến Binh Học Tập' },
  { rank: 7, name: 'Đỗ Quỳnh Chi', school: 'TH Chu Văn An', className: 'Lớp 4B', avatar: '🦄', xp: 4310, level: 14, streak: 20, badge: '⭐ Sao Sáng' },
  { rank: 8, name: 'Bùi Quang Khải', school: 'THCS Đoàn Thị Điểm', className: 'Lớp 7B1', avatar: '🐯', xp: 4180, level: 13, streak: 19, badge: '🥇 Dũng Sĩ Ngữ Pháp' },
  { rank: 9, name: 'Dương Thảo My', school: 'TH Lê Quý Đôn', className: 'Lớp 5A', avatar: '🌺', xp: 3950, level: 13, streak: 18, badge: '🎨 Nghệ Sĩ Pinyin' },
  { rank: 10, name: 'Ngô Hải Đăng', school: 'THCS Ngô Sĩ Liên', className: 'Lớp 6B4', avatar: '🦊', xp: 3820, level: 12, streak: 17, badge: '🏆 Top Thủ Lĩnh' },
  { rank: 11, name: 'Lương Bảo Trâm', school: 'TH Kim Đồng', className: 'Lớp 3A', avatar: '🐰', xp: 3670, level: 12, streak: 16, badge: '🌟 Hoa Học Trò' },
  { rank: 12, name: 'Trịnh Tiến Dũng', school: 'THCS Trưng Vương', className: 'Lớp 7A5', avatar: '🐻', xp: 3510, level: 11, streak: 15, badge: '⚡ Siêu Tốc' },
  { rank: 13, name: 'Phan Khánh Linh', school: 'TH Tây Sơn', className: 'Lớp 4C', avatar: '🐱', xp: 3380, level: 11, streak: 14, badge: '🎯 Chuẩn Ngữ Âm' },
  { rank: 14, name: 'Tạ Minh Khang', school: 'THCS Nguyễn Du', className: 'Lớp 6A2', avatar: '🐶', xp: 3220, level: 10, streak: 13, badge: '📘 Mọt Sách Tiếng Trung' },
  { rank: 15, name: 'Võ Mai Phương', school: 'TH Thực Nghiệm', className: 'Lớp 5D', avatar: '🦋', xp: 3090, level: 10, streak: 12, badge: '✨ Tỏa Sáng' },
  { rank: 16, name: 'Đặng Tuấn Anh', school: 'THCS Lê Lợi', className: 'Lớp 7C3', avatar: '🐼', xp: 2940, level: 9, streak: 11, badge: '🔥 Nỗ Lực Không Ngừng' },
  { rank: 17, name: 'Hà Phương Uyên', school: 'TH Cát Linh', className: 'Lớp 3B', avatar: '🌻', xp: 2810, level: 9, streak: 10, badge: '🌱 Mầm Non Trí Tuệ' },
  { rank: 18, name: 'Lê Quốc Bảo', school: 'THCS Lương Thế Vinh', className: 'Lớp 6A4', avatar: '🦅', xp: 2680, level: 8, streak: 9, badge: '⚡ Siêu Sao' },
  { rank: 19, name: 'Nguyễn Tường Vy', school: 'TH Vinschool', className: 'Lớp 4E', avatar: '🌷', xp: 2540, level: 8, streak: 8, badge: '🌟 Chăm Ngoan' },
  { rank: 20, name: 'Trần Đình Trọng', school: 'THCS Nghĩa Tân', className: 'Lớp 7B2', avatar: '🐺', xp: 2420, level: 8, streak: 8, badge: '🛡️ Kiên Cường' },
  { rank: 21, name: 'Mai Thu Trang', school: 'TH Hoàng Hoa Thám', className: 'Lớp 5A1', avatar: '🐬', xp: 2290, level: 7, streak: 7, badge: '💎 Cố Gắng' },
  { rank: 22, name: 'Vương Gia Huy', school: 'THCS Tân Định', className: 'Lớp 6D', avatar: '🐨', xp: 2150, level: 7, streak: 6, badge: '🎯 Bắn Trúng' },
  { rank: 23, name: 'Đinh Lan Anh', school: 'TH Tràng An', className: 'Lớp 3D', avatar: '🐣', xp: 2010, level: 6, streak: 6, badge: '🌼 Đáng Yêu' },
  { rank: 24, name: 'Phạm Hữu Phước', school: 'THCS Marie Curie', className: 'Lớp 7A1', avatar: '🦉', xp: 1890, level: 6, streak: 5, badge: '📚 Cần Cù' },
  { rank: 25, name: 'Cao Bảo Ngọc', school: 'TH Bà Triệu', className: 'Lớp 4A', avatar: '🍀', xp: 1760, level: 5, streak: 5, badge: '🎈 Vui Vẻ' },
  { rank: 26, name: 'Trần Nhật Nam', school: 'THCS Khương Thượng', className: 'Lớp 6A', avatar: '🦊', xp: 1620, level: 5, streak: 4, badge: '⚡ Tích Cực' },
  { rank: 27, name: 'Lê Thùy Dung', school: 'TH Quang Trung', className: 'Lớp 5B2', avatar: '🌸', xp: 1480, level: 4, streak: 4, badge: '⭐ Thăng Tiến' },
  { rank: 28, name: 'Nguyễn Đăng Khoa', school: 'THCS Yên Hòa', className: 'Lớp 7B', avatar: '🐯', xp: 1350, level: 4, streak: 3, badge: '🏆 Vượt Trội' },
  { rank: 29, name: 'Tạ Thảo Linh', school: 'TH Dịch Vọng B', className: 'Lớp 3A2', avatar: '🐰', xp: 1210, level: 3, streak: 3, badge: '🌱 Khởi Động' },
  { rank: 30, name: 'Vũ Hoàng Long', school: 'THCS Thăng Long', className: 'Lớp 6B1', avatar: '🚀', xp: 1080, level: 3, streak: 2, badge: '🔥 Tân Binh' },
];

export const MOCK_TEACHERS: TeacherRank[] = [
  { rank: 1, name: 'Cô giáo Bùi Ngọc Liên', school: 'Giáo viên Tiếng Trung Tiểu học & THCS', avatar: '👩‍🏫', visits: 2450, materialsCount: 45, gamesContributed: 32, badge: '👑 Tác giả sáng lập' },
  { rank: 2, name: 'Cô giáo Nguyễn Hải Yến', school: 'Giáo viên Tiếng Trung - Thiết kế E-Learning', avatar: '👩‍🏫', visits: 1620, materialsCount: 32, gamesContributed: 22, badge: '🌟 Chuyên gia Giáo trình' },
  { rank: 3, name: 'Cô Minh Thư', school: 'CLB Tiếng Trung Thiếu nhi Ánh Dương', avatar: '👩‍🏫', visits: 1280, materialsCount: 24, gamesContributed: 18, badge: '💎 Giáo viên Ưu tú' },
  { rank: 4, name: 'Thầy Quang Huy', school: 'THCS Cầu Giấy - Tổ Ngoại ngữ 2', avatar: '👨‍🏫', visits: 980, materialsCount: 19, gamesContributed: 14, badge: '🚀 Đóng góp tích cực' },
  { rank: 5, name: 'Cô Hoàng Yến', school: 'Hệ thống Giáo dục Ngôi Sao Hà Nội', avatar: '👩‍🏫', visits: 860, materialsCount: 16, gamesContributed: 11, badge: '🎨 Thiết kế sáng tạo' },
];

export const INITIAL_MATERIALS: LectureMaterial[] = [
  {
    id: 'mat-yct1-textbook',
    title: 'Giáo trình YCT1 tiếng việt',
    grade: 'YCT1',
    unit: 'YCT1',
    authorName: 'Cô Bùi Ngọc Liên',
    authorEmail: 'amazingtranslation88@gmail.com',
    type: 'word',
    url: 'https://docs.google.com/document/d/1giao-trinh-yct1-tieng-viet-ms-lien',
    thumbnail: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60',
    description: 'Trọn bộ Giáo trình YCT1 tiếng Việt có đầy đủ bài khóa, 103 từ vựng nền tảng, câu giao tiếp thực tế và giải nghĩa chuẩn xác.',
    views: 2840,
    downloads: 950,
    ratings: [5, 5, 5, 5, 5, 5],
    createdAt: '2026-10-01',
    isOfficial: true,
    vocabularyItems: YCT1_WORD_VOCAB_ITEMS,
    wordContent: 'Giáo trình YCT1 tiếng Việt chuẩn quốc tế: Tích hợp 103 từ vựng nền tảng, bài khóa đàm thoại mẫu, ngữ pháp và bài tập hoạt động ứng dụng.',
    comments: [
      { id: 'cyct1-1', authorName: 'Cô Bùi Ngọc Liên', authorAvatar: '👩‍🏫', authorEmail: 'amazingtranslation88@gmail.com', content: 'Giáo trình YCT1 tiếng Việt kèm 103 từ vựng nền tảng và bài tập thực hành. Chúc các em học tập thật tốt!', createdAt: '2026-10-01', rating: 5 }
    ]
  },
  {
    id: 'mat-yct1-activity',
    title: 'Bài tập hoạt động YCT1',
    grade: 'YCT1',
    unit: 'YCT1',
    authorName: 'Cô Bùi Ngọc Liên',
    authorEmail: 'amazingtranslation88@gmail.com',
    type: 'pdf',
    url: 'https://drive.google.com/file/d/1bai-tap-hoat-dong-yct1-lien/view',
    thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&auto=format&fit=crop&q=60',
    description: 'Tập bài tập hoạt động YCT1 gồm các hoạt động ghép từ, nối tranh, viết chữ Hán và thực hành giao tiếp tương tác trực quan.',
    views: 2150,
    downloads: 780,
    ratings: [5, 5, 5, 5, 5],
    createdAt: '2026-10-05',
    isOfficial: true,
    vocabularyItems: YCT1_WORD_VOCAB_ITEMS,
    comments: [
      { id: 'cyct1-2', authorName: 'Cô Minh Thư', authorAvatar: '👩‍🏫', content: 'Các bài tập hoạt động rất hấp dẫn và bổ ích cho học sinh!', createdAt: '2026-10-06', rating: 5 }
    ]
  },
  {
    id: 'mat-yct1-foundation-vocab',
    title: 'Các từ vựng nền tảng & câu giao tiếp cơ bản',
    grade: 'YCT1',
    unit: 'YCT1',
    authorName: 'Cô Bùi Ngọc Liên',
    authorEmail: 'amazingtranslation88@gmail.com',
    type: 'word',
    url: 'https://docs.google.com/document/d/1cac-tu-vung-nen-tang-cau-giao-tiep-yct1',
    thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=500&auto=format&fit=crop&q=60',
    description: '103 từ vựng nền tảng trọng tâm YCT1, kèm câu giao tiếp ngắn gọn ứng dụng thực tế, phiên âm Pinyin, nghĩa tiếng Việt và loa đọc chuẩn bản địa.',
    views: 3420,
    downloads: 1250,
    ratings: [5, 5, 5, 5, 5, 5, 5],
    createdAt: '2026-10-10',
    isOfficial: true,
    vocabularyItems: YCT1_WORD_VOCAB_ITEMS,
    wordContent: 'Trọn bộ 103 từ vựng nền tảng YCT1 từ 爱 đến 中国人, kèm câu giao tiếp thực tế ngắn gọn, chuẩn bản địa.',
    comments: [
      { id: 'cyct1-3', authorName: 'Học viên Hoàng Long', authorAvatar: '👦', content: 'Bảng từ vựng và câu giao tiếp có loa phát âm rất hay và chuẩn ạ!', createdAt: '2026-10-11', rating: 5 }
    ]
  },
  {
    id: 'mat-1',
    title: 'Giáo án điện tử 3D: Bài 1 - Chào hỏi & Pinyin sinh động cho Tiểu học (YCT 1)',
    grade: 'Tiểu học',
    unit: 'Bài 1',
    authorName: 'Cô Bùi Ngọc Liên',
    authorEmail: 'amazingtranslation88@gmail.com',
    type: 'pptx',
    url: 'https://docs.google.com/presentation/d/1demo-chinese-kids-yct1',
    thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&auto=format&fit=crop&q=60',
    description: 'File PowerPoint tương tác cao với trò chơi khởi động, âm thanh hiệu ứng chuyển cảnh, tranh vẽ 3D sinh động cho học sinh lớp 1-3.',
    views: 1420,
    downloads: 385,
    ratings: [5, 5, 5, 5, 4, 5, 5],
    createdAt: '2026-09-15',
    isOfficial: true,
    comments: [
      { id: 'c1', authorName: 'Cô Hải Yến', authorAvatar: '👩‍🏫', authorEmail: 'haiyen.edu@gmail.com', content: 'Bài giảng thiết kế rất chuẩn sư phạm và thu hút các bé, hiệu ứng hoạt hình rất mượt mà!', createdAt: '2026-09-16', rating: 5 },
      { id: 'c2', authorName: 'Cô Minh Thư', authorAvatar: '👩‍🏫', content: 'Các con lớp em rất thích trò chơi bắn bóng ở slide 12 cô Liên ạ!', createdAt: '2026-09-18', rating: 5 }
    ]
  },
  {
    id: 'mat-2',
    title: 'Slide PPTX Tiếng Trung Lớp 6: Unit 1 - Bạn là người nước nào? (GDPT 2018)',
    grade: 'Lớp 6',
    unit: 'Unit 1',
    authorName: 'Cô Bùi Ngọc Liên',
    authorEmail: 'amazingtranslation88@gmail.com',
    type: 'pptx',
    url: 'https://docs.google.com/presentation/d/1demo-grade6-unit1-lien',
    thumbnail: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&auto=format&fit=crop&q=60',
    description: 'Trọn bộ giáo án điện tử có đầy đủ hệ thống bài tập trắc nghiệm, audio phát âm giọng chuẩn Bắc Kinh và video hội thoại mẫu.',
    views: 1180,
    downloads: 310,
    ratings: [5, 5, 5, 4, 5],
    createdAt: '2026-09-20',
    isOfficial: true,
    comments: [
      { id: 'c3', authorName: 'Thầy Quang Huy', authorAvatar: '👨‍🏫', content: 'Cảm ơn cô Liên đã chia sẻ tài liệu bài giảng tuyệt vời!', createdAt: '2026-09-21', rating: 5 }
    ]
  },
  {
    id: 'mat-3',
    title: 'Bộ phiếu bài tập trắc nghiệm & điền chữ Hán Lớp 7 Unit 1: Thời tiết & Bốn mùa (PDF)',
    grade: 'Lớp 7',
    unit: 'Unit 1',
    authorName: 'Cô Bùi Ngọc Liên',
    authorEmail: 'amazingtranslation88@gmail.com',
    type: 'pdf',
    url: 'https://drive.google.com/file/d/1demo-weather-grade7-lien/view',
    thumbnail: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=500&auto=format&fit=crop&q=60',
    description: 'Phiếu học tập in màu 12 trang gồm bảng tra từ vựng, bài tập nối câu, ô chữ chữ Hán và đáp án chi tiết dành cho giáo viên và phụ huynh.',
    views: 940,
    downloads: 275,
    ratings: [5, 5, 4, 5, 5],
    createdAt: '2026-09-25',
    isOfficial: true,
    comments: []
  },
  {
    id: 'mat-4',
    title: 'Kho học liệu số Google Drive: Trọn bộ Flashcard 150 chữ Hán YCT Cấp 1 & 2',
    grade: 'Tiểu học',
    unit: 'Chung',
    authorName: 'Cô Bùi Ngọc Liên',
    authorEmail: 'amazingtranslation88@gmail.com',
    type: 'drive',
    url: 'https://drive.google.com/drive/folders/1demo-yct-flashcards-lien',
    thumbnail: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60',
    description: 'Bộ thẻ từ vựng in màu chuẩn khổ A5 gồm chữ Hán, phiên âm pinyin, nghĩa tiếng Việt và ví dụ minh họa dễ nhớ cho trẻ mầm non & tiểu học.',
    views: 1650,
    downloads: 512,
    ratings: [5, 5, 5, 5, 5],
    createdAt: '2026-09-10',
    isOfficial: true,
    comments: []
  },
  {
    id: 'mat-5',
    title: 'Video minh họa & Hội thoại trực quan: Mua sắm hoa quả & Hỏi giá tiền (Lớp 6 & 7)',
    grade: 'Lớp 6',
    unit: 'Unit 5',
    authorName: 'Cô Minh Thư',
    authorEmail: 'minhthu.chinese@gmail.com',
    type: 'youtube',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=500&auto=format&fit=crop&q=60',
    description: 'Video quay tình huống thực tế tại siêu thị giúp học sinh ghi nhớ từ vựng số đếm và cách hỏi "Bao nhiêu tiền một cân?".',
    views: 890,
    downloads: 140,
    ratings: [5, 4, 5, 5],
    createdAt: '2026-10-01',
    comments: []
  },
  {
    id: 'mat-6',
    title: 'Slide PPTX Lớp 8: Phương tiện giao thông & Kế hoạch du lịch hè (GDPT mới)',
    grade: 'Lớp 8',
    unit: 'Bài 1',
    authorName: 'Cô Bùi Ngọc Liên',
    authorEmail: 'amazingtranslation88@gmail.com',
    type: 'pptx',
    url: 'https://docs.google.com/presentation/d/1demo-grade8-transport-lien',
    thumbnail: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=500&auto=format&fit=crop&q=60',
    description: 'Bộ slide bài giảng điện tử chuẩn GDPT Lớp 8: hình ảnh 3D về máy bay, tàu cao tốc, bản đồ hỏi đường và bài tập phản xạ giao tiếp.',
    views: 780,
    downloads: 215,
    ratings: [5, 5, 5, 5],
    createdAt: '2026-10-03',
    isOfficial: true,
    comments: []
  },
  {
    id: 'mat-7',
    title: 'Giáo án điện tử Lớp 9: Chuyên đề Ước mơ & Định hướng thi vào 10 THPT môn Tiếng Trung',
    grade: 'Lớp 9',
    unit: 'Bài 1',
    authorName: 'Cô Bùi Ngọc Liên',
    authorEmail: 'amazingtranslation88@gmail.com',
    type: 'pptx',
    url: 'https://docs.google.com/presentation/d/1demo-grade9-dream-lien',
    thumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500&auto=format&fit=crop&q=60',
    description: 'Tài liệu ôn luyện nâng cao cho học sinh lớp 9: cấu trúc câu chữ 把, phân tích nghề nghiệp tương lai, rèn luyện kỹ năng viết đoạn văn ngắn.',
    views: 920,
    downloads: 290,
    ratings: [5, 5, 5, 5, 5],
    createdAt: '2026-10-05',
    isOfficial: true,
    comments: []
  },
  {
    id: 'mat-8',
    title: 'Trọn bộ đề thi thử YCT từ Cấp 1 đến Cấp 6 có File Audio MP3 & Đáp án (Hanban chuẩn)',
    grade: 'YCT',
    unit: 'YCT 1-6',
    authorName: 'Cô Bùi Ngọc Liên',
    authorEmail: 'amazingtranslation88@gmail.com',
    type: 'pdf',
    url: 'https://drive.google.com/file/d/1demo-yct1-6-mocktests-lien/view',
    thumbnail: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=500&auto=format&fit=crop&q=60',
    description: 'Kho đề thi thử chuẩn quốc tế YCT 1, 2, 3, 4, 5, 6 kèm mã QR nghe audio phát âm giọng chuẩn Bắc Kinh, lời giải thích chi tiết cho từng câu hỏi.',
    views: 1890,
    downloads: 640,
    ratings: [5, 5, 5, 5, 5],
    createdAt: '2026-10-06',
    isOfficial: true,
    comments: []
  }
];

export const INITIAL_VIDEOS: VideoLesson[] = [
  {
    id: 'vid-1',
    title: 'Học phát âm bảng chữ cái Pinyin chuẩn giọng Bắc Kinh cho người mới bắt đầu',
    grade: 'primary',
    unitNumber: 1,
    youtubeId: '7Q3eO-gZ6n8',
    duration: '14:20',
    teacherName: 'Cô Bùi Ngọc Liên',
    thumbnail: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=500&auto=format&fit=crop&q=60',
    description: 'Bài giảng hướng dẫn khẩu hình miệng thanh mẫu b, p, m, f, d, t, n, l và 4 thanh điệu tiếng Trung bằng hình ảnh hoạt hình vui nhộn.',
    views: 2350
  },
  {
    id: 'vid-2',
    title: 'Bài hát số đếm tiếng Trung 1-10 vui nhộn cho học sinh tiểu học (YCT Song)',
    grade: 'primary',
    unitNumber: 2,
    youtubeId: 'f5dM_PqQj4g',
    duration: '03:45',
    teacherName: 'Cô Bùi Ngọc Liên',
    thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=500&auto=format&fit=crop&q=60',
    description: 'Vừa hát vừa nhún nhảy ghi nhớ các con số từ 一 (1) đến 十 (10) kèm bài tập đếm ngón tay tương tác.',
    views: 3120
  },
  {
    id: 'vid-3',
    title: 'Lớp 6 - Bài 1: Chào hỏi, giới thiệu bản thân & quốc tịch',
    grade: 'grade6',
    unitNumber: 1,
    youtubeId: 'kJQP7kiw5Fk',
    duration: '18:50',
    teacherName: 'Cô Bùi Ngọc Liên',
    thumbnail: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&auto=format&fit=crop&q=60',
    description: 'Giảng dạy theo chương trình GDPT mới, luyện kỹ năng nghe - nói phản xạ tự nhiên trong 10 phút.',
    views: 1840
  },
  {
    id: 'vid-4',
    title: 'Lớp 7 - Bài 1: Miêu tả thời tiết bốn mùa & cảm nhận',
    grade: 'grade7',
    unitNumber: 1,
    youtubeId: 'e-ORhEE9VVg',
    duration: '16:30',
    teacherName: 'Thầy Quang Huy',
    thumbnail: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=500&auto=format&fit=crop&q=60',
    description: 'Tổng hợp từ vựng mùa màng, cấu trúc hỏi thời tiết 怎么样 và bài tập giao tiếp thực tế.',
    views: 1420
  },
  {
    id: 'vid-5',
    title: 'Lớp 8 - Bài 1: Phương tiện giao thông & Đi du lịch khám phá (GDPT 2018)',
    grade: 'grade8',
    unitNumber: 1,
    youtubeId: 'dQw4w9WgXcQ',
    duration: '17:40',
    teacherName: 'Cô Bùi Ngọc Liên',
    thumbnail: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=500&auto=format&fit=crop&q=60',
    description: 'Video trực quan hướng dẫn cách phân biệt động từ 坐 và 骑, tình huống hỏi đường tại nhà ga và sân bay quốc tế.',
    views: 1250
  },
  {
    id: 'vid-6',
    title: 'Lớp 9 - Bài 1: Ước mơ & Định hướng nghề nghiệp tương lai',
    grade: 'grade9',
    unitNumber: 1,
    youtubeId: 'kJQP7kiw5Fk',
    duration: '19:15',
    teacherName: 'Cô Bùi Ngọc Liên',
    thumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500&auto=format&fit=crop&q=60',
    description: 'Bài giảng chuyên sâu rèn luyện kỹ năng phỏng vấn, giới thiệu ước mơ và chiến lược ôn thi vào lớp 10 THPT.',
    views: 1380
  },
  {
    id: 'vid-7',
    title: 'Bí quyết luyện thi đạt điểm tuyệt đối chứng chỉ quốc tế YCT từ Cấp 1 đến Cấp 6',
    grade: 'yct',
    unitNumber: 1,
    youtubeId: '7Q3eO-gZ6n8',
    duration: '22:10',
    teacherName: 'Cô Bùi Ngọc Liên',
    thumbnail: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=500&auto=format&fit=crop&q=60',
    description: 'Cô Liên hướng dẫn cấu trúc đề thi YCT, mẹo làm phần nghe hiểu Listening và phần đọc hiểu Reading cho học sinh tiểu học và THCS.',
    views: 2680
  }
];

export const INITIAL_FREE_DOCUMENTS: FreeDocument[] = [
  {
    id: 'doc-1',
    title: 'Giáo trình chuẩn YCT Cấp độ 1 - Bản Song ngữ Việt - Trung (Đầy đủ 12 bài)',
    category: 'PDF Giáo trình',
    grade: 'Tiểu học',
    pages: 84,
    size: '15.8 MB',
    downloadUrl: '#',
    thumbnail: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500&auto=format&fit=crop&q=60',
    downloads: 1240,
    description: 'Giáo trình YCT 1 chuẩn quốc tế có hình vẽ đẹp mắt, bài tập tô màu và phiên âm pinyin chuẩn cho học sinh lớp 1-5.'
  },
  {
    id: 'doc-2',
    title: 'Bộ tập tô 100 chữ Hán cơ bản nhất có thứ tự từng nét bút thuận',
    category: 'Luyện viết chữ Hán',
    grade: 'Tiểu học & THCS',
    pages: 45,
    size: '8.4 MB',
    downloadUrl: '#',
    thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500&auto=format&fit=crop&q=60',
    downloads: 1820,
    description: 'Bao gồm ô chữ mễ (米字格), chỉ dẫn từng nét: Ngang trước sổ sau, phẩy trước mác sau, trong trước ngoài sau.'
  },
  {
    id: 'doc-3',
    title: 'Phiếu ôn tập kiểm tra học kì 1 môn Tiếng Trung Lớp 6 (Theo CT GDPT 2018)',
    category: 'Phiếu ôn tập',
    grade: 'Lớp 6',
    pages: 20,
    size: '4.2 MB',
    downloadUrl: '#',
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&auto=format&fit=crop&q=60',
    downloads: 890,
    description: 'Đề cương ôn tập kèm 5 đề thi thử học kì 1 có đáp án và giải thích chi tiết.'
  },
  {
    id: 'doc-4',
    title: 'Bộ Flashcards in màu 80 từ vựng chủ đề Động vật & Hoa quả cho bé',
    category: 'Flashcards',
    grade: 'Tiểu học',
    pages: 32,
    size: '12.0 MB',
    downloadUrl: '#',
    thumbnail: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60',
    downloads: 1150,
    description: 'Thẻ bài in sẵn hai mặt tiện lợi cắt dán, hỗ trợ bố mẹ chơi đố từ vựng mỗi tối cùng con.'
  },
  {
    id: 'doc-5',
    title: 'Đề cương ôn tập & Phiếu bài tập chuyên đề Lớp 8 (Chương trình GDPT mới)',
    category: 'Phiếu ôn tập',
    grade: 'Lớp 8',
    pages: 28,
    size: '5.6 MB',
    downloadUrl: '#',
    thumbnail: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=500&auto=format&fit=crop&q=60',
    downloads: 780,
    description: 'Tổng hợp từ vựng và bài tập trắc nghiệm giao thông, du lịch, mua sắm và thanh toán điện tử.'
  },
  {
    id: 'doc-6',
    title: 'Cẩm nang ôn thi vào lớp 10 THPT môn Tiếng Trung & Ngữ pháp trọng điểm Lớp 9',
    category: 'Luyện thi vào 10',
    grade: 'Lớp 9',
    pages: 60,
    size: '9.8 MB',
    downloadUrl: '#',
    thumbnail: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=500&auto=format&fit=crop&q=60',
    downloads: 1450,
    description: 'Bộ đề thi thử chuyển cấp vào lớp 10 THPT các trường chuyên ngoại ngữ có đáp án và bảng tra câu chữ 把, câu chữ 被.'
  },
  {
    id: 'doc-7',
    title: 'Trọn bộ cẩm nang từ vựng & cấu trúc ngữ pháp thi YCT từ Cấp 1 đến Cấp 6',
    category: 'Sách YCT',
    grade: 'YCT (1-6)',
    pages: 112,
    size: '18.4 MB',
    downloadUrl: '#',
    thumbnail: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=500&auto=format&fit=crop&q=60',
    downloads: 2100,
    description: 'Toàn bộ 1500+ từ vựng và các dạng đề chuẩn chứng chỉ quốc tế YCT 1, 2, 3, 4, 5, 6 do Cô Bùi Ngọc Liên biên soạn.'
  }
];
