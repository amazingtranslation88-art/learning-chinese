import React, { useState } from 'react';
import {
  BookOpen,
  Volume2,
  Sparkles,
  Play,
  RotateCcw,
  CheckCircle2,
  HelpCircle,
  Pause,
  Award,
  ChevronRight,
  ChevronLeft,
  X,
  Languages,
  Flame,
  Search,
  BookMarked
} from 'lucide-react';
import { sound, speakChinese, speakVietnamese, stopAllSpeech } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

interface StoryParagraph {
  zh: string;
  pinyin: string;
  vi: string;
}

interface StoryItem {
  id: string;
  titleVi: string;
  titleZh: string;
  pinyin: string;
  category: 'ngu_ngon' | 'co_tich' | 'thieu_nhi';
  categoryLabel: string;
  coverImage: string;
  emoji: string;
  moral: string;
  level: string; // "Cơ bản", "Trung cấp", "Nâng cao"
  paragraphs: StoryParagraph[];
  vocabulary: {
    zh: string;
    pinyin: string;
    vi: string;
  }[];
  quiz: {
    question: string;
    options: string[];
    answer: string;
    explanation: string;
  };
}

export const STORIES_DATA: StoryItem[] = [
  {
    id: 'story-blind-men-elephant',
    titleVi: 'Thầy Bói Xem Voi',
    titleZh: '盲人摸象',
    pinyin: 'Mángrén Mō Xiàng',
    category: 'ngu_ngon',
    categoryLabel: 'Truyện Ngụ Ngôn',
    coverImage: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=800&auto=format&fit=crop&q=80',
    emoji: '🐘',
    level: 'Cơ bản',
    moral: 'Bài học: Khi xem xét một sự việc, cần phải nhìn nhận toàn diện, nhiều góc độ, không nên chỉ dựa vào một phần phiến diện mà vội vàng kết luận.',
    paragraphs: [
      {
        zh: '从前，有四个盲人，他们从来没有见过大象。',
        pinyin: 'Cóngqián, yǒu sì gè mángrén, tāmen cónglái méiyǒu jiànguo dàxiàng.',
        vi: 'Ngày xưa, có bốn người khiếm thị chưa từng nhìn thấy con voi bao giờ.'
      },
      {
        zh: '一天，国王牵来一头大象，让他们用手去摸。',
        pinyin: 'Yītiān, guówáng qiān lái yītóu dàxiàng, ràng tāmen yòng shǒu qù mō.',
        vi: 'Một ngày nọ, nhà vua dắt tới một con voi lớn và cho họ dùng tay sờ thử.'
      },
      {
        zh: '第一个人摸到了大象的牙齿，他说：“大象就像一根大萝卜！”',
        pinyin: 'Dì-yī gè rén mō dào le dàxiàng de yáchǐ, tā shuō: “Dàxiàng jiù xiàng yī gēn dà luóbo!”',
        vi: 'Người thứ nhất sờ vào ngà voi, liền nói: "Con voi giống hệt một củ cải to!"'
      },
      {
        zh: '第二个人摸到了大象的耳朵，他说：“不对，大象像一把大扇子！”',
        pinyin: 'Dì-èr gè rén mō dào le dàxiàng de ěrduo, tā shuō: “Bù duì, dàxiàng xiàng yī bǎ dà shànzi!”',
        vi: 'Người thứ hai sờ vào tai voi, liền cãi: "Không đúng, con voi giống như chiếc quạt lớn!"'
      },
      {
        zh: '第三个人摸到了大象的腿，大喊：“你们都错了，大象明明像一根粗柱子！”',
        pinyin: 'Dì-sān gè rén mō dào le dàxiàng de tuǐ, dà hǎn: “Nǐmen dōu cuò le, dàxiàng míngmíng xiàng yī gēn cū zhùzi!”',
        vi: 'Người thứ ba sờ vào chân voi, hét lớn: "Mọi người sai hết rồi, con voi rõ ràng giống cái cột nhà to tướng!"'
      },
      {
        zh: '第四个人摸到了尾巴，笑起来：“大象明明就是一根细绳子嘛！”',
        pinyin: 'Dì-sì gè rén mō dào le wěiba, xiào qǐlái: “Dàxiàng míngmíng jiù shì yī gēn xì shéngzi ma!”',
        vi: 'Người thứ tư sờ vào đuôi voi, cười nói: "Con voi rõ ràng chỉ là một sợi dây thừng mảnh mai thôi mà!"'
      },
      {
        zh: '大家争吵不休，谁也不服谁。国王笑着说：“你们每个人只摸到了一部分，都不是大象的全貌啊。”',
        pinyin: 'Dàjiā zhēngchǎo bùxiū, shuí yě bù fú shuí. Guówáng xiào zhe shuō: “Nǐmen měi gè rén zhǐ mō dào le yībùfen, dōu bù shì dàxiàng de quánmào a.”',
        vi: 'Họ tranh cãi mãi không thôi, chẳng ai chịu ai. Nhà vua mỉm cười nói: "Mỗi người các khanh chỉ mới sờ vào một bộ phận nhỏ, không ai nhìn thấy toàn bộ hình hài con voi cả."'
      }
    ],
    vocabulary: [
      { zh: '从前', pinyin: 'cóngqián', vi: 'ngày xưa, trước đây' },
      { zh: '盲人', pinyin: 'mángrén', vi: 'người mù, người khiếm thị' },
      { zh: '大象', pinyin: 'dàxiàng', vi: 'con voi' },
      { zh: '扇子', pinyin: 'shànzi', vi: 'cái quạt' },
      { zh: '柱子', pinyin: 'zhùzi', vi: 'cột nhà' },
      { zh: '全貌', pinyin: 'quánmào', vi: 'toàn cảnh, bức tranh toàn diện' }
    ],
    quiz: {
      question: 'Người thứ hai sờ vào bộ phận nào của con voi và bảo voi giống cây quạt?',
      options: ['Tai voi (耳朵)', 'Chân voi (腿)', 'Đuôi voi (尾巴)', 'Ngà voi (牙齿)'],
      answer: 'Tai voi (耳朵)',
      explanation: 'Người thứ hai sờ vào tai voi (耳朵) to bản phe phẩy nên tưởng voi là cái quạt.'
    }
  },
  {
    id: 'story-waiting-for-rabbit',
    titleVi: 'Ôm Cây Đợi Thỏ',
    titleZh: '守株待兔',
    pinyin: 'Shǒu Zhū Dài Tù',
    category: 'ngu_ngon',
    categoryLabel: 'Truyện Ngụ Ngôn',
    coverImage: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=800&auto=format&fit=crop&q=80',
    emoji: '🐇',
    level: 'Cơ bản',
    moral: 'Bài học: Không thể trông chờ vào vận may ngẫu nhiên mà không chịu lao động. Thành quả chỉ đến với những ai chăm chỉ và cố gắng.',
    paragraphs: [
      {
        zh: '宋国有一个农夫，他每天都在田里辛勤地耕作。',
        pinyin: 'Sòng guó yǒu yī gè nóngfū, tā měitiān dōu zài tián lǐ xīnqín de gēngzuò.',
        vi: 'Ở nước Tống có một người nông dân nọ, ngày nào cũng chăm chỉ cày cấy trên ruộng.'
      },
      {
        zh: '有一天，一只奔跑的野兔不小心撞在了田边的一棵大树桩上，折断了脖子死掉了。',
        pinyin: 'Yǒu yītiān, yī zhī bēnpǎo de yětù bù xiǎoxīn zhuàng zài le tiánbiān de yī kē dà shùzhuāng shàng, zhéduàn le bózi sǐ diào le.',
        vi: 'Một ngày kia, có một con thỏ rừng đang chạy thục mạng bất cẩn đâm sầm vào gốc cây to ven bờ ruộng, gãy cổ chết.'
      },
      {
        zh: '农夫白白捡到了一只肥美的野兔，心里高兴极了。',
        pinyin: 'Nóngfū báibái jiǎn dào le yī zhī féiměi de yětù, xīn lǐ gāoxìng jí le.',
        vi: 'Người nông dân chẳng tốn chút công sức nào mà nhặt được một con thỏ béo tốt, trong lòng mừng rỡ vô cùng.'
      },
      {
        zh: '从此，他放下了锄头，不再干活，每天坐在树桩旁等待下一只撞树的兔子。',
        pinyin: 'Cóngcǐ, tā fàng xià le chútou, bù zài gàn huó, měitiān zuò zài shùzhuāng páng děngdài xià yī zhī zhuàng shù de tùzi.',
        vi: 'Kể từ đó, anh ta vứt bỏ cả cuốc cày, chẳng chịu làm lụng gì nữa, tối ngày ra ngồi bên gốc cây đợi con thỏ tiếp theo đến đâm vào cây.'
      },
      {
        zh: '日子一天天过去，他再也没有等到第二只兔子，而他的田地里全长满了野草。',
        pinyin: 'Rìzi yītiān tiān guòqù, tā zài yě méiyǒu děng dào dì-èr zhī tùzi, ér tā de tiándì lǐ quán zhǎng mǎn le yěcǎo.',
        vi: 'Ngày tháng thoi đưa, anh ta chẳng bao giờ đợi được con thỏ thứ hai, còn mảnh ruộng của anh thì cỏ dại mọc um tùm.'
      }
    ],
    vocabulary: [
      { zh: '农夫', pinyin: 'nóngfū', vi: 'người nông dân' },
      { zh: '辛勤', pinyin: 'xīnqín', vi: 'chăm chỉ, cần cù' },
      { zh: '野兔', pinyin: 'yětù', vi: 'thỏ rừng' },
      { zh: '树桩', pinyin: 'shùzhuāng', vi: 'gốc cây đốn cọc' },
      { zh: '等待', pinyin: 'děngdài', vi: 'chờ đợi' },
      { zh: '野草', pinyin: 'yěcǎo', vi: 'cỏ dại' }
    ],
    quiz: {
      question: 'Sau khi nhặt được con thỏ, người nông dân đã làm gì?',
      options: ['Bỏ cuốc ra gốc cây ngồi đợi (坐在树桩旁等待)', 'Chăm chỉ cày cấy hơn', 'Đem thỏ đi tặng nhà vua', 'Đi bẫy thêm thỏ'],
      answer: 'Bỏ cuốc ra gốc cây ngồi đợi (坐在树桩旁等待)',
      explanation: 'Anh ta ôm mộng may mắn viển vông, bỏ bê đồng áng để rồi chuốc lấy mùa màng thất bát.'
    }
  },
  {
    id: 'story-fox-tiger',
    titleVi: 'Cáo Mượn Oai Hùm',
    titleZh: '狐假虎威',
    pinyin: 'Hú Jiǎ Hǔ Wēi',
    category: 'ngu_ngon',
    categoryLabel: 'Truyện Ngụ Ngôn',
    coverImage: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=800&auto=format&fit=crop&q=80',
    emoji: '🦊',
    level: 'Trung cấp',
    moral: 'Bài học: Phê phán những kẻ không có thực tài nhưng lại dựa dẫm vào thế lực của người khác để ức hiếp, lừa gạt mọi người.',
    paragraphs: [
      {
        zh: '在茂密的森林里，一只凶猛的老虎抓住了一只狡猾的狐狸。',
        pinyin: 'Zài màomì de sēnlín lǐ, yī zhī xiōngměng de lǎohǔ zhuāzhù le yī zhī jiǎohuá de húli.',
        vi: 'Trong khu rừng rậm rạp nọ, một con hổ hung dữ đã tóm gọn một con cáo xảo quyệt.'
      },
      {
        zh: '狐狸眼珠子一转，对老虎说：“你敢吃我吗？上天派我来当百兽之王，你吃我就违背了天意！”',
        pinyin: 'Húli yǎnzhūzi yī zhuàn, duì lǎohǔ shuō: “Nǐ gǎn chī wǒ ma? Shàngtiān pài wǒ lái dāng bǎi shòu zhī wáng, nǐ chī wǒ jiù wéibèi le tiānyì!”',
        vi: 'Cáo đảo tròn con ngươi một cái, liền bảo hổ: "Ngươi dám ăn ta sao? Trời phái ta xuống làm chúa sơn lâm, ngươi ăn ta là trái lệnh trời đấy!"'
      },
      {
        zh: '老虎半信半疑。狐狸说：“不信你跟我身后走，看百兽看到我有谁敢不逃跑！”',
        pinyin: 'Lǎohǔ bànxìn-bànyí. Húli shuō: “Bù xìn nǐ gēn wǒ shēnhòu zǒu, kàn bǎi shòu kàndào wǒ yǒu shuí gǎn bù táopǎo!”',
        vi: 'Hổ nửa tin nửa ngờ. Cáo nói: "Không tin ngươi cứ đi sau lưng ta, xem muôn thú thấy ta có kẻ nào dám không bỏ chạy!"'
      },
      {
        zh: '老虎跟着狐狸往林子里走。森林里的小鹿、野猪、兔子看到大老虎来了，吓得四处逃命。',
        pinyin: 'Lǎohǔ gēnzhe húli wǎng línzi lǐ zǒu. Sēnlín lǐ de xiǎolù, yězhū, tùzi kàndào dà lǎohǔ lái le, xià de sìchù táomìng.',
        vi: 'Hổ đi sau cáo tiến vào rừng. Bầy hươu, lợn rừng, thỏ con nhìn thấy hổ dữ tới thì sợ hãi bỏ chạy tán loạn.'
      },
      {
        zh: '老虎以为百兽真的害怕狐狸，便把它给放了。其实动物们害怕的是老虎，而不是狐狸。',
        pinyin: 'Lǎohǔ yǐwéi bǎi shòu zhēnde hàipà húli, biàn bǎ tā gěi fàng le. Qíshí dòngwùmen hàipà de shì lǎohǔ, ér bù shì húli.',
        vi: 'Hổ tưởng muôn thú thực sự sợ hãi cáo, bèn thả nó đi. Thực ra, muôn thú sợ hãi là sợ con hổ chứ đâu phải sợ con cáo.'
      }
    ],
    vocabulary: [
      { zh: '狡猾', pinyin: 'jiǎohuá', vi: 'xảo quyệt, ranh mãnh' },
      { zh: '凶猛', pinyin: 'xiōngměng', vi: 'hung dữ, dũng mãnh' },
      { zh: '百兽之王', pinyin: 'bǎi shòu zhī wáng', vi: 'vua của muôn thú' },
      { zh: '半信半疑', pinyin: 'bànxìn-bànyí', vi: 'bán tín bán nghi' },
      { zh: '逃跑', pinyin: 'táopǎo', vi: 'bỏ trốn, chạy thoát' }
    ],
    quiz: {
      question: 'Tại sao các con vật trong rừng lại sợ hãi bỏ chạy?',
      options: ['Vì nhìn thấy con hổ đi phía sau (看到大老虎)', 'Vì con cáo quá to lớn', 'Vì nghe thấy tiếng sấm', 'Vì con cáo biết làm phép'],
      answer: 'Vì nhìn thấy con hổ đi phía sau (看到大老虎)',
      explanation: 'Muôn thú khiếp sợ trước oai phong của chúa sơn lâm là con hổ, nhưng hổ lại bị cáo lừa.'
    }
  },
  {
    id: 'story-draw-snake',
    titleVi: 'Vẽ Rắn Thêm Chân',
    titleZh: '画蛇添足',
    pinyin: 'Huà Shé Tiān Zú',
    category: 'ngu_ngon',
    categoryLabel: 'Truyện Ngụ Ngôn',
    coverImage: 'https://images.unsplash.com/photo-1531386151447-fd76ad50012f?w=800&auto=format&fit=crop&q=80',
    emoji: '🐍',
    level: 'Cơ bản',
    moral: 'Bài học: Làm việc gì cũng cần biết điểm dừng hợp lý, làm việc thừa thãi không những không có ích mà còn tự rước họa làm hỏng đại sự.',
    paragraphs: [
      {
        zh: '古时候，楚国有一家人祭祀祖先，赏赐给门客一壶美酒。',
        pinyin: 'Gǔ shíhòu, Chǔ guó yǒu yī jiā rén jìsì zǔxiān, shǎngcì gěi ménkè yī hú měijiǔ.',
        vi: 'Thời cổ đại, ở nước Sở có một gia đình cúng tế tổ tiên xong, thưởng cho các môn khách một bình rượu ngon.'
      },
      {
        zh: '门客们商量：“几个人喝这一壶酒不够，一个人喝刚好。不如大家在地上画蛇，谁先画好谁喝！”',
        pinyin: 'Ménkèmen shāngliang: “Jǐ gè rén hē zhè yī hú jiǔ bù gòu, yī gè rén hē gānghǎo. Bùrú dàjiā zài dì shang huà shé, shuí xiān huà hǎo shuí hē!”',
        vi: 'Các môn khách bàn nhau: "Mấy người cùng uống bình này thì không đủ, một người uống thì vừa khéo. Chi bằng chúng ta thi nhau vẽ rắn dưới đất, ai vẽ xong trước thì người đó được uống!"'
      },
      {
        zh: '一个人画得飞快，很快就把蛇画好了。他拿起酒壶正准备喝。',
        pinyin: 'Yī gè rén huà de fēikuài, hěn kuài jiù bǎ shé huà hǎo le. Tā ná qǐ jiǔhú zhèng zhǔnbèi hē.',
        vi: 'Có một người vẽ nhanh thoăn thoắt, chẳng mấy chốc đã vẽ xong con rắn. Anh ta cầm bình rượu lên toan uống.'
      },
      {
        zh: '他看到别人还没画好，得意地说：“我还能给蛇添上四只脚呢！”',
        pinyin: 'Tā kàndào biérén hái méi huà hǎo, déyì de shuō: “Wǒ hái néng gěi shé tiān shàng sì zhī jiǎo ne!”',
        vi: 'Thấy những người khác còn chưa vẽ xong, anh ta đắc chí bảo: "Ta còn thừa thời gian vẽ thêm cho rắn 4 cái chân nữa kìa!"'
      },
      {
        zh: '正在他画脚的时候，另一个人也画好了，一把抢过酒壶说：“蛇本来就没有脚，你怎么能给它画脚呢？”',
        pinyin: 'Zhèngzài tā huà jiǎo de shíhòu, lìng yī gè rén yě huà hǎo le, yī bǎ qiǎng guò jiǔhú shuō: “Shé běnlái jiù méiyǒu jiǎo, nǐ zěnme néng gěi tā huà jiǎo ne?”',
        vi: 'Đang lúc anh ta cặm cụi vẽ chân cho rắn, người khác đã vẽ xong, liền giật lấy bình rượu bảo: "Rắn vốn làm gì có chân, cớ sao ngươi lại vẽ chân cho nó?"'
      },
      {
        zh: '说完，那个人仰头把美酒喝了个精光。',
        pinyin: 'Shuō wán, nà gè rén yǎngtóu bǎ měijiǔ hē le gè jīngguāng.',
        vi: 'Nói đoạn, người kia ngửa cổ uống cạn sạch bình rượu ngon.'
      }
    ],
    vocabulary: [
      { zh: '美酒', pinyin: 'měijiǔ', vi: 'rượu ngon' },
      { zh: '画蛇', pinyin: 'huà shé', vi: 'vẽ con rắn' },
      { zh: '得意', pinyin: 'déyì', vi: 'đắc ý, tự mãn' },
      { zh: '本来', pinyin: 'běnlái', vi: 'vốn dĩ, ban đầu' },
      { zh: '抢过', pinyin: 'qiǎng guò', vi: 'giật lấy' }
    ],
    quiz: {
      question: 'Tại sao người vẽ rắn xong đầu tiên lại bị mất phần thưởng uống rượu?',
      options: ['Vì vẽ thừa chân cho con rắn (画蛇添足)', 'Vì vẽ con rắn quá ngắn', 'Vì vẽ con rồng thay vì con rắn', 'Vì bị làm đổ rượu'],
      answer: 'Vì vẽ thừa chân cho con rắn (画蛇添足)',
      explanation: 'Rắn vốn không có chân, anh ta tự phụ vẽ thêm chân thành ra bức tranh bị sai và mất phần thắng.'
    }
  },
  {
    id: 'story-change-moon',
    titleVi: 'Hằng Nga Bôn Nguyệt',
    titleZh: '嫦娥奔月',
    pinyin: 'Cháng’é Bēn Yuè',
    category: 'co_tich',
    categoryLabel: 'Cổ Tích & Truyền Thuyết',
    coverImage: 'https://images.unsplash.com/photo-1532767153582-b1a0e5145009?w=800&auto=format&fit=crop&q=80',
    emoji: '🌕',
    level: 'Trung cấp',
    moral: 'Bài học: Tôn vinh tình yêu trong sáng, sự hy sinh vì người khác và nguồn gốc của phong tục ngắm trăng rằm sum họp Tết Trung Thu.',
    paragraphs: [
      {
        zh: '远古时代，天空中同时出现了十个太阳，大地被烤得滚烫，庄稼枯萎，百姓苦不堪言。',
        pinyin: 'Yuǎngǔ shídài, tiānkōng zhōng tóngshí chūxiàn le shí gè tàiyáng, dàdì bèi kǎo de gǔntàng, zhuāngjia kūwěi, bǎixìng kǔ bù kān yán.',
        vi: 'Thời xa xưa, trên bầu trời bỗng xuất hiện cùng lúc mười mặt trời, thiêu đốt mặt đất nóng bỏng, mùa màng héo úa, muôn dân lầm than.'
      },
      {
        zh: '神箭手后羿登上昆仑山顶，拉开神弓，一口气射下了九个太阳，挽救了人间。',
        pinyin: 'Shénjiànshǒu Hòuyì dēng shàng Kūnlún shāndǐng, lā kāi shéngōng, yī kǒuqì shè xià le jiǔ gè tàiyáng, wǎnjiù le rénjiān.',
        vi: 'Dũng sĩ thần tiễn Hậu Nghệ trèo lên đỉnh núi Côn Lôn, giương thần cung bắn rơi chín mặt trời, cứu vớt nhân gian.'
      },
      {
        zh: '西王母赐给后羿一颗长生不老仙药。后羿舍不得撇下美丽的妻子嫦娥，便把仙药交给嫦娥保管。',
        pinyin: 'Xīwángmǔ cì gěi Hòuyì yī kē chángshēng-bùlǎo xiānyào. Hòuyì shěbude piē xià měilì de qīzi Cháng’é, biàn bǎ xiānyào jiāo gěi Cháng’é bǎoguǎn.',
        vi: 'Tây Vương Mẫu ban cho Hậu Nghệ một viên thuốc tiên trường sinh bất lão. Hậu Nghệ không nỡ rời xa người vợ xinh đẹp là Hằng Nga, bèn đưa thuốc cho nàng cất giữ.'
      },
      {
        zh: '恶徒逢蒙乘后羿外出，持剑逼迫嫦娥交出仙药。危急之中，嫦娥吞下了仙药。',
        pinyin: 'Ètú Féngméng chéng Hòuyì wàichū, chí jiàn bīpò Cháng’é jiāo chū xiānyào. Wēijí zhīzhōng, Cháng’é tūn xià le xiānyào.',
        vi: 'Kẻ xấu Phùng Mông nhân lúc Hậu Nghệ vắng nhà mang kiếm uy hiếp ép Hằng Nga giao thuốc tiên. Trong cơn nguy khốn, Hằng Nga đã nuốt trọn viên thuốc.'
      },
      {
        zh: '嫦娥身体立刻飞离地面，飘向了月亮上的广寒宫。后羿思念妻子，便在八月十五摆上桂花酒和月饼遥望月亮。',
        pinyin: 'Cháng’é shēntǐ lìkè fēi lí dìmìan, piāo xiàng le yuèliang shàng de Guǎnghán gōng. Hòuyì sīniàn qīzi, biàn zài bā yuè shíwǔ bǎi shàng guìhuā jiǔ hé yuèbǐng yáowàng yuèliang.',
        vi: 'Thân thể Hằng Nga nhẹ nhàng bay khỏi mặt đất, bay thẳng tới cung Quảng Hàn trên mặt trăng. Hậu Nghệ nhớ thương vợ khôn nguôi, cứ đến ngày rằm tháng tám lại bày rượu hoa quế và bánh trung thu hướng về mặt trăng ngắm nhìn nàng.'
      }
    ],
    vocabulary: [
      { zh: '太阳', pinyin: 'tàiyáng', vi: 'mặt trời' },
      { zh: '神箭手', pinyin: 'shénjiànshǒu', vi: 'tay bắn cung thần tài ba' },
      { zh: '仙药', pinyin: 'xiānyào', vi: 'thuốc tiên' },
      { zh: '月亮', pinyin: 'yuèliang', vi: 'mặt trăng' },
      { zh: '月饼', pinyin: 'yuèbǐng', vi: 'bánh trung thu' }
    ],
    quiz: {
      question: 'Hằng Nga sau khi uống thuốc tiên đã bay đến nơi nào?',
      options: ['Cung Quảng Hàn trên mặt trăng (广寒宫)', 'Cung điện mặt trời', 'Đỉnh núi tuyết', 'Dưới đáy đại dương'],
      answer: 'Cung Quảng Hàn trên mặt trăng (广寒宫)',
      explanation: 'Hằng Nga bay lên cung trăng (Quảng Hàn Cung), bầu bạn cùng chú Thỏ Ngọc giã thuốc.'
    }
  },
  {
    id: 'story-little-panda',
    titleVi: 'Gấu Trúc Tiểu Hoa Đi Tìm Bạn',
    titleZh: '小熊猫找朋友',
    pinyin: 'Xiǎo Xióngmāo Zhǎo Péngyou',
    category: 'thieu_nhi',
    categoryLabel: 'Truyện Thiếu Nhi',
    coverImage: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef6?w=800&auto=format&fit=crop&q=80',
    emoji: '🐼',
    level: 'Cơ bản',
    moral: 'Bài học: Muốn có bạn tốt, chúng ta phải mở lòng, chào hỏi lễ phép, biết quan tâm, sẻ chia và giúp đỡ mọi người xung quanh.',
    paragraphs: [
      {
        zh: '大森林里住着一只可爱的小熊猫，它的名字叫小花。',
        pinyin: 'Dà sēnlín lǐ zhù zhe yī zhī kě’ài de xiǎo xióngmāo, tā de míngzi jiào Xiǎohuā.',
        vi: 'Trong khu rừng lớn có một chú gấu trúc nhỏ đáng yêu, tên chú là Tiểu Hoa.'
      },
      {
        zh: '小花很想交朋友。今天它穿上漂亮的衣服，高高兴兴出门去。',
        pinyin: 'Xiǎohuā hěn xiǎng jiāo péngyou. Jīntiān tā chuān shàng piàoliang de yīfu, gāogāo-xìngxìng chūmén qù.',
        vi: 'Tiểu Hoa rất muốn kết bạn mới. Hôm nay chú mặc quần áo đẹp, vui vẻ tung tăng ra khỏi nhà.'
      },
      {
        zh: '它遇到了小猴子，礼貌地打招呼：“你好！我们可以一起玩吗？”小猴子开心地跳过来说：“好呀好呀！”',
        pinyin: 'Tā yùdào le xiǎo hóuzi, lǐmào de dǎ zhāohu: “Nǐ hǎo! Wǒmen kěyǐ yīqǐ wán ma?” Xiǎo hóuzi kāixīn de tiào guòlái shuō: “Hǎo ya hǎo ya!”',
        vi: 'Chú gặp một chú khỉ con, liền lễ phép chào hỏi: "Xin chào bạn! Chúng mình chơi cùng nhau nhé?" Khỉ con nhảy tưng tưng vui sướng: "Được chứ, được chứ!"'
      },
      {
        zh: '小花把自己最喜欢的新鲜竹笋分给小兔子和小猴子吃，大家都夸小花是一个懂得分享的好孩子。',
        pinyin: 'Xiǎohuā bǎ zìjǐ zuì xǐhuan de xīnxiān zhúsǔn fēn gěi xiǎo tùzi hé xiǎo hóuzi chī, dàjiā dōu kuā Xiǎohuā shì yī gè dǒngde fēnxiǎng de hǎo háizi.',
        vi: 'Tiểu Hoa chia những măng tre tươi non nhất mà mình thích cho thỏ con và khỉ con cùng ăn, ai nấy đều khen ngợi chú là đứa trẻ ngoan biết sẻ chia.'
      },
      {
        zh: '夕阳西下，三个好朋友手拉着手唱歌跳舞，度过了快乐的一天。',
        pinyin: 'Xīyáng xī xià, sān gè hǎo péngyou shǒu lā zhe shǒu chànggē tiàowǔ, dùguò le kuàilè de yītiān.',
        vi: 'Hoàng hôn buông xuống, ba người bạn nắm tay nhau vừa hát vừa múa, trải qua một ngày thật ngập tràn niềm vui.'
      }
    ],
    vocabulary: [
      { zh: '熊猫', pinyin: 'xióngmāo', vi: 'gấu trúc' },
      { zh: '朋友', pinyin: 'péngyou', vi: 'bạn bè' },
      { zh: '礼貌', pinyin: 'lǐmào', vi: 'lễ phép, lịch thiệp' },
      { zh: '竹笋', pinyin: 'zhúsǔn', vi: 'măng tre' },
      { zh: '分享', pinyin: 'fēnxiǎng', vi: 'chia sẻ' }
    ],
    quiz: {
      question: 'Khi gặp bạn mới, chú gấu trúc Tiểu Hoa đã nói câu gì đầu tiên?',
      options: ['你好！我们可以一起玩吗？', '再见！明天见。', '我不喜欢你。', '你叫什么名字？'],
      answer: '你好！我们可以一起玩吗？',
      explanation: 'Tiểu Hoa chào hỏi lễ phép: "Xin chào! Chúng mình cùng chơi nhé?"'
    }
  }
];

export const StorytellingView: React.FC = () => {
  const [selectedStory, setSelectedStory] = useState<StoryItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'ngu_ngon' | 'co_tich' | 'thieu_nhi'>('all');
  const [displayMode, setDisplayMode] = useState<'bilingual' | 'zh_only' | 'zh_pinyin' | 'vi_only'>('bilingual');
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const [searchWord, setSearchWord] = useState('');
  
  // Interactive quiz
  const [quizSelected, setQuizSelected] = useState<string | null>(null);
  const [quizAnswered, setQuizAnswered] = useState(false);

  const filteredStories = STORIES_DATA.filter((s) => {
    const matchCat = activeCategory === 'all' || s.category === activeCategory;
    const matchSearch =
      searchWord.trim() === '' ||
      s.titleVi.toLowerCase().includes(searchWord.toLowerCase()) ||
      s.titleZh.toLowerCase().includes(searchWord.toLowerCase()) ||
      s.pinyin.toLowerCase().includes(searchWord.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleOpenStory = (story: StoryItem) => {
    sound.playClick();
    setSelectedStory(story);
    setQuizSelected(null);
    setQuizAnswered(false);
    setIsPlayingAll(false);
  };

  // Play entire story text sequentially
  const handlePlayEntireStory = () => {
    if (!selectedStory) return;
    sound.playClick();
    setIsPlayingAll(true);

    const fullZh = selectedStory.paragraphs.map((p) => p.zh).join('。 ');
    speakChinese(fullZh);
  };

  const handleStopAudio = () => {
    stopAllSpeech();
    setIsPlayingAll(false);
  };

  return (
    <div className="space-y-8 pb-14 animate-in fade-in duration-300">
      
      {/* Top Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-pink-600 via-rose-600 to-amber-600 text-white p-6 sm:p-9 shadow-2xl border-2 border-pink-300/40 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-amber-200 text-xs font-black uppercase mb-3">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Kho Tàng Văn Học Thiếu Nhi & Ngụ Ngôn Song Ngữ</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            KỂ CHUYỆN BẰNG TIẾNG TRUNG (讲故事)
          </h2>
          <p className="text-xs sm:text-base text-pink-100 mt-2 leading-relaxed">
            Học tiếng Trung tự nhiên qua từng câu chuyện ngụ ngôn, thần thoại cổ tích và truyện đồng thoại giàu tính giáo dục. Nghe giọng đọc chuẩn Bắc Kinh, theo dõi Pinyin và học từ vựng nhớ lâu!
          </p>
        </div>

        <div className="absolute -bottom-6 -right-6 text-8xl sm:text-9xl opacity-20 select-none pointer-events-none">
          📖
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm truyện ngụ ngôn, cổ tích..."
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-xs"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {[
              { id: 'all', label: 'Tất cả câu chuyện' },
              { id: 'ngu_ngon', label: 'Truyện Ngụ Ngôn' },
              { id: 'co_tich', label: 'Cổ Tích & Thần Thoại' },
              { id: 'thieu_nhi', label: 'Truyện Thiếu Nhi' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => { sound.playClick(); setActiveCategory(cat.id as any); }}
                className={`px-3.5 py-2 rounded-xl text-xs font-black transition whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md scale-102'
                    : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700 hover:border-pink-400'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredStories.map((story) => (
          <div
            key={story.id}
            onClick={() => handleOpenStory(story)}
            className="group bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-gray-200 dark:border-slate-700 hover:border-pink-400 dark:hover:border-pink-500 hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-700">
                <img
                  src={story.coverImage}
                  alt={story.titleVi}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-pink-300 border border-pink-300/40 text-[10px] font-black uppercase">
                  {story.categoryLabel}
                </span>

                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-amber-400 text-amber-950 text-[10px] font-black uppercase">
                  {story.level}
                </span>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="text-xl font-black font-serif text-amber-200 drop-shadow">
                    {story.titleZh}
                  </div>
                  <div className="text-xs font-semibold text-gray-200">
                    {story.pinyin}
                  </div>
                </div>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="text-base font-black text-gray-900 dark:text-gray-100 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition">
                  {story.titleVi}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">
                  {story.moral}
                </p>
                <div className="text-[11px] text-pink-600 dark:text-pink-400 font-bold pt-1">
                  • {story.paragraphs.length} đoạn văn • {story.vocabulary.length} từ vựng mới
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <div className="w-full py-2.5 rounded-2xl bg-pink-50 dark:bg-slate-700/60 group-hover:bg-gradient-to-r group-hover:from-pink-600 group-hover:to-rose-600 group-hover:text-white font-black text-xs text-pink-700 dark:text-pink-300 text-center transition flex items-center justify-center gap-1.5 border border-pink-100 dark:border-slate-700">
                <BookOpen className="w-4 h-4" />
                <span>Đọc & Nghe Kể Chuyện</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* STORY READER MODAL (GIAO DIỆN ĐỌC & NGHE TRUYỆN CHI TIẾT) */}
      {selectedStory && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in zoom-in-95 duration-200">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border-2 border-pink-500/50 overflow-hidden">
            
            {/* Story Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-pink-600 via-rose-600 to-amber-600 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedStory.emoji}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg sm:text-xl font-black font-serif text-amber-200">
                      {selectedStory.titleZh}
                    </h3>
                    <span className="text-xs font-semibold text-rose-100">
                      ({selectedStory.titleVi})
                    </span>
                  </div>
                  <p className="text-xs text-pink-100">{selectedStory.pinyin}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => { sound.playClick(); setSelectedStory(null); handleStopAudio(); }}
                  className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition"
                  title="Đóng truyện"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Controls Bar: Audio & Language Modes */}
            <div className="px-5 py-3 bg-gray-50 dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3 shrink-0">
              {/* Audio Controls */}
              <div className="flex items-center gap-2">
                {!isPlayingAll ? (
                  <button
                    onClick={handlePlayEntireStory}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-black text-xs shadow-md transition active:scale-95"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Nghe Đọc Toàn Bài</span>
                  </button>
                ) : (
                  <button
                    onClick={handleStopAudio}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 text-amber-950 font-black text-xs shadow-md transition active:scale-95"
                  >
                    <Pause className="w-4 h-4" />
                    <span>Dừng Đọc</span>
                  </button>
                )}
                <span className="text-[11px] text-gray-500 hidden sm:inline">
                  (Hoặc bấm vào từng câu để nghe phát âm)
                </span>
              </div>

              {/* Display Mode Selector */}
              <div className="flex items-center gap-1 bg-white dark:bg-slate-800 p-1 rounded-xl border border-gray-200 dark:border-slate-700 text-xs font-bold">
                {[
                  { id: 'bilingual', label: 'Song ngữ' },
                  { id: 'zh_pinyin', label: 'Hán + Pinyin' },
                  { id: 'zh_only', label: 'Chỉ chữ Hán' },
                  { id: 'vi_only', label: 'Chỉ tiếng Việt' },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => { sound.playClick(); setDisplayMode(m.id as any); }}
                    className={`px-2.5 py-1 rounded-lg transition ${
                      displayMode === m.id
                        ? 'bg-pink-600 text-white shadow-xs'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Story Content Reader */}
            <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1">
              
              {/* Paragraphs list */}
              <div className="space-y-4">
                {selectedStory.paragraphs.map((p, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-gray-50/80 dark:bg-slate-700/40 border border-gray-200/80 dark:border-slate-600 hover:border-pink-300 transition group space-y-1.5"
                  >
                    {/* Chinese + Audio trigger */}
                    {(displayMode === 'bilingual' || displayMode === 'zh_pinyin' || displayMode === 'zh_only') && (
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-base sm:text-lg font-black text-gray-900 dark:text-gray-100 font-serif leading-relaxed">
                          {p.zh}
                        </p>
                        <button
                          onClick={() => { sound.playClick(); speakChinese(p.zh); }}
                          className="p-1.5 rounded-full bg-pink-100 dark:bg-pink-950/60 text-pink-600 dark:text-pink-300 hover:scale-110 transition shrink-0"
                          title="Nghe câu này"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    {/* Pinyin */}
                    {(displayMode === 'bilingual' || displayMode === 'zh_pinyin') && (
                      <p className="text-xs sm:text-sm font-semibold text-pink-700 dark:text-pink-300">
                        {p.pinyin}
                      </p>
                    )}

                    {/* Vietnamese */}
                    {(displayMode === 'bilingual' || displayMode === 'vi_only') && (
                      <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed pt-1 border-t border-gray-100 dark:border-slate-700/80">
                        {p.vi}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Moral Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-rose-500/15 to-pink-500/15 border border-amber-300 dark:border-amber-700">
                <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300 font-black text-xs uppercase mb-1">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Ý Nghĩa Giáo Dục & Bài Học Nhân Văn</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 font-medium leading-relaxed">
                  {selectedStory.moral}
                </p>
              </div>

              {/* Vocabulary Table */}
              <div className="space-y-3">
                <h4 className="text-sm font-black text-gray-900 dark:text-gray-100 uppercase tracking-wider flex items-center gap-2">
                  <BookMarked className="w-4 h-4 text-pink-600" />
                  <span>Từ Vựng Trọng Tâm Trong Bài</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedStory.vocabulary.map((vocab, vIdx) => (
                    <div
                      key={vIdx}
                      className="p-3 rounded-xl bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 flex items-center justify-between gap-3 shadow-2xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg font-black font-serif text-pink-700 dark:text-pink-300">
                          {vocab.zh}
                        </span>
                        <div>
                          <span className="text-xs font-bold text-gray-500 dark:text-gray-400 block">
                            {vocab.pinyin}
                          </span>
                          <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 block">
                            {vocab.vi}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => { sound.playClick(); speakChinese(vocab.zh); }}
                        className="p-1 rounded-full bg-gray-100 dark:bg-slate-600 text-gray-600 dark:text-gray-200 hover:text-pink-600"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comprehension Quiz */}
              <div className="p-5 rounded-2xl bg-pink-50 dark:bg-pink-950/30 border border-pink-200 dark:border-pink-800 space-y-3">
                <div className="flex items-center gap-2 text-pink-800 dark:text-pink-300 font-black text-xs uppercase">
                  <Award className="w-4 h-4" />
                  <span>Đố Vui Đọc Hiểu (Thử Thách Trí Nhớ)</span>
                </div>
                <h5 className="text-sm font-black text-gray-900 dark:text-gray-100">
                  {selectedStory.quiz.question}
                </h5>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedStory.quiz.options.map((opt, i) => {
                    const isCorrect = opt === selectedStory.quiz.answer;
                    let btnCls = 'bg-white dark:bg-slate-700 border-gray-200 dark:border-slate-600 text-gray-800 dark:text-gray-200 hover:border-pink-400';
                    if (quizAnswered) {
                      if (isCorrect) {
                        btnCls = 'bg-emerald-500 text-white border-emerald-600 font-black shadow-sm';
                      } else if (quizSelected === opt) {
                        btnCls = 'bg-rose-500 text-white border-rose-600 line-through';
                      } else {
                        btnCls = 'opacity-40';
                      }
                    }

                    return (
                      <button
                        key={i}
                        onClick={() => {
                          if (quizAnswered) return;
                          setQuizSelected(opt);
                          setQuizAnswered(true);
                          if (isCorrect) {
                            sound.playVictory();
                            confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
                          } else {
                            sound.playWrong();
                          }
                        }}
                        disabled={quizAnswered}
                        className={`p-3 rounded-xl border text-xs font-bold text-left transition ${btnCls}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {quizAnswered && (
                  <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 text-xs font-medium">
                    🎉 <strong>Giải thích:</strong> {selectedStory.quiz.explanation}
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
