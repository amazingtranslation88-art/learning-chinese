import React, { useState } from 'react';
import {
  Compass,
  Landmark,
  Palette,
  Film,
  Cpu,
  BookMarked,
  UserCheck,
  Search,
  Volume2,
  Sparkles,
  Award,
  ChevronRight,
  X,
  ExternalLink,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { sound, speakChinese } from '../utils/soundEffects';

export type ExploreCategory =
  | 'landmarks'
  | 'culture_art'
  | 'music_cinema'
  | 'science_tech'
  | 'literature'
  | 'notable_people';

interface ExploreItem {
  id: string;
  titleVi: string;
  titleZh: string;
  pinyin: string;
  category: ExploreCategory;
  categoryLabel: string;
  thumbnail: string;
  summary: string;
  details: string[];
  funFact: string;
  tags: string[];
  quiz?: {
    question: string;
    options: string[];
    answer: string;
    explanation: string;
  };
}

export const EXPLORE_CHINA_DATA: ExploreItem[] = [
  // 1. Danh lam thắng cảnh nổi tiếng
  {
    id: 'lm-greatwall',
    titleVi: 'Vạn Lý Trường Thành',
    titleZh: '万里长城',
    pinyin: 'Wànlǐ Chángchéng',
    category: 'landmarks',
    categoryLabel: 'Danh lam thắng cảnh',
    thumbnail: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&auto=format&fit=crop&q=80',
    summary: 'Kỳ quan kiến trúc phòng thủ quân sự vĩ đại dài hơn 21.196 km, uốn lượn qua các dãy núi hùng vĩ miền Bắc Trung Quốc.',
    details: [
      'Bắt đầu được xây dựng từ thời kỳ Xuân Thu Chiến Quốc (thế kỷ thứ 7 TCN) và được Tần Thủy Hoàng nối liền sau khi thống nhất Trung Hoa.',
      'Được gia cố kiên cố nhất dưới thời nhà Minh bằng gạch đá, tháp canh và cửa ải hiểm trở như Bát Đạt Lĩnh (八达岭), Sơn Hải Quan (山海关), Gia Dục Quan (嘉峪关).',
      'Được UNESCO công nhận là Di sản Thế giới vào năm 1987 và là biểu tượng cho ý chí kiên cường, sức lao động phi thường của nhân dân Trung Hoa.'
    ],
    funFact: 'Người xưa dùng vữa gạo nếp kết hợp với vôi tôi để xây thành, giúp các khối đá liên kết siêu bền vững qua hàng nghìn năm phong ba bão táp!',
    tags: ['Di sản thế giới', 'Bắc Kinh', 'Kỳ quan kiến trúc'],
    quiz: {
      question: 'Vị hoàng đế nào đã có công nối liền các đoạn thành thời Chiến Quốc thành Vạn Lý Trường Thành?',
      options: ['Tần Thủy Hoàng', 'Hán Cao Tổ', 'Đường Thái Tông', 'Khang Hy'],
      answer: 'Tần Thủy Hoàng',
      explanation: 'Tần Thủy Hoàng sau khi thống nhất năm 221 TCN đã cho nối các đoạn thành phía bắc để chống quân Hung Nô.'
    }
  },
  {
    id: 'lm-forbidden-city',
    titleVi: 'Cố Cung Tử Cấm Thành',
    titleZh: '北京故宫 (紫禁城)',
    pinyin: 'Běijīng Gùgōng',
    category: 'landmarks',
    categoryLabel: 'Danh lam thắng cảnh',
    thumbnail: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800&auto=format&fit=crop&q=80',
    summary: 'Quần thể cung điện bằng gỗ lớn nhất thế giới tại trung tâm thủ đô Bắc Kinh, nơi ở của 24 vị hoàng đế triều Minh và Thanh.',
    details: [
      'Được xây dựng từ năm 1406 đến năm 1420 dưới thời Minh Thành Tổ Chu Đệ, gồm 980 tòa nhà với hơn 8.700 gian phòng lộng lẫy.',
      'Bố cục đối xứng nghiêm ngặt theo trục Bắc - Nam, mái ngói lưu ly màu vàng (tượng trưng cho hoàng quyền) và tường sơn đỏ son (tượng trưng cho sự may mắn, cát tường).',
      'Hiện là Bảo tàng Cố Cung lưu giữ hơn 1,8 triệu cổ vật trân quý bậc nhất thế giới.'
    ],
    funFact: 'Tên gọi "Tử Cấm Thành" bắt nguồn từ chòm sao Tử Vi Viên (ngôi sao của Thiên Đế trên trời), hoàng đế là Thiên Tử nên nơi ở cũng là cấm địa bất khả xâm phạm.',
    tags: ['Bắc Kinh', 'Cung điện cổ đại', 'Bảo tàng quốc gia'],
    quiz: {
      question: 'Màu ngói chủ đạo của Tử Cấm Thành mang màu gì tượng trưng cho hoàng quyền?',
      options: ['Màu vàng lưu ly', 'Màu đỏ son', 'Màu xanh ngọc', 'Màu tím'],
      answer: 'Màu vàng lưu ly',
      explanation: 'Màu vàng (hoàng sắc) là màu độc quyền của Hoàng đế Trung Hoa.'
    }
  },
  {
    id: 'lm-zhangjiajie',
    titleVi: 'Công Viên Rừng Quốc Gia Trương Gia Giới',
    titleZh: '张家界国家森林公园',
    pinyin: 'Zhāngjiājiè',
    category: 'landmarks',
    categoryLabel: 'Danh lam thắng cảnh',
    thumbnail: 'https://images.unsplash.com/photo-1513415756790-2ac1db1297d0?w=800&auto=format&fit=crop&q=80',
    summary: 'Thiên nhiên kỳ vĩ với hơn 3.000 cột đá thạch anh sa thạch vút thẳng lên tầng mây tại tỉnh Hồ Nam, nguồn cảm hứng quay phim bom tấn Avatar.',
    details: [
      'Được UNESCO công nhận là Công viên địa chất thế giới với hiện tượng xói mòn tự nhiên qua hàng triệu năm.',
      'Cột trụ "Nam Thiên Nhất Trụ" cao 1.080m tại đây đã được đổi tên thành "Avatar Hallelujah Mountain" sau thành công của bộ phim Avatar.',
      'Nổi tiếng với thang máy Bách Long (Bailong Elevator) bằng kính ngoài trời cao nhất thế giới và cầu kính Trương Gia Giới đáy trong suốt bắc qua hẻm núi sâu.'
    ],
    funFact: 'Khi mây mù giăng phủ, các ngọn núi trông như đang lơ lửng giữa không trung hệt như thế giới thần tiên!',
    tags: ['Hồ Nam', 'Kỳ quan thiên nhiên', 'Phim trường Avatar']
  },

  // 2. Văn hóa & Nghệ thuật
  {
    id: 'ca-peking-opera',
    titleVi: 'Nghệ Thuật Kinh Kịch Bắc Kinh',
    titleZh: '京剧艺术',
    pinyin: 'Jīngjù Yìshù',
    category: 'culture_art',
    categoryLabel: 'Văn hóa & Nghệ thuật',
    thumbnail: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&auto=format&fit=crop&q=80',
    summary: 'Quốc bảo nghệ thuật sân khấu cổ điển kết hợp điêu luyện giữa Ca (Hát), Niệm (Nói), Tác (Diễn), Đả (Võ thuật) và nghệ thuật vẽ mặt nạ độc đáo.',
    details: [
      'Hình thành vào cuối thế kỷ 18 dưới triều Thanh khi 4 đoàn kịch lớn vùng Huy Châu tiến kinh chúc thọ Hoàng đế Càn Long.',
      'Bốn loại hình nhân vật chính gồm: Sinh (nam chính), Đán (nữ chính), Tịnh (mặt vẽ hoa văn, tính cách mạnh mẽ hoặc gian hùng), Sửu (vai hề thông minh, dí dỏm).',
      'Mặt nạ Kinh kịch (脸谱 - Liǎnpǔ) dùng màu sắc để biểu đạt tính cách nhân vật: Đỏ (trung nghĩa như Quan Công), Trắng (xảo quyệt như Tào Tháo), Đen (chính trực như Bao Công).'
    ],
    funFact: 'Trang phục Kinh kịch có ống tay áo dài màu trắng gọi là "Thủy tụ" (tay áo nước), diễn viên dùng để biểu đạt các cảm xúc hỷ nộ ái ố vô cùng uyển chuyển.',
    tags: ['Quốc bảo', 'Sân khấu cổ điển', 'Di sản phi vật thể'],
    quiz: {
      question: 'Mặt nạ màu ĐEN trong Kinh kịch biểu trưng cho tính cách gì?',
      options: ['Chính trực, liêm minh, cương trực', 'Gian ác, xảo quyệt', 'Nhút nhát, sợ hãi', 'Hài hước, vui tính'],
      answer: 'Chính trực, liêm minh, cương trực',
      explanation: 'Mặt nạ đen tiêu biểu là Bao Thanh Thiên, thể hiện sự công minh liêm chính.'
    }
  },
  {
    id: 'ca-tea-culture',
    titleVi: 'Văn Hóa Trà Đạo Trung Hoa',
    titleZh: '中国茶文化',
    pinyin: 'Zhōngguó Chá Wénhuà',
    category: 'culture_art',
    categoryLabel: 'Văn hóa & Nghệ thuật',
    thumbnail: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=80',
    summary: 'Trung Quốc là cái nôi của trà thế giới, nghệ thuật thưởng trà kết tinh tinh thần triết học "Thanh - Nhã - Tĩnh - Kính".',
    details: [
      'Truyền thuyết Thần Nông nếm bách thảo đã phát hiện ra lá trà giúp giải độc từ hơn 4.000 năm trước.',
      'Sáu dòng trà lớn: Lục trà (trà xanh Long Tỉnh), Hồng trà, Bạch trà, Hoàng trà, Ô Long trà (Thiết Quan Âm) và Hắc trà (Phổ Nhĩ Vân Nam).',
      'Nghệ thuật pha trà Công Phu (工夫茶) với ấm chén tử sa Nghi Hưng chú trọng nhiệt độ nước, thời gian ủ và phong thái tao nhã của người thưởng trà.'
    ],
    funFact: 'Cuốn sách "Trà Kinh" do Lục Vũ (Thời nhà Đường) viết là cuốn chuyên khảo về cây trà và nghệ thuật pha trà đầu tiên trên toàn thế giới!',
    tags: ['Trà đạo', 'Ấm Tử Sa', 'Dưỡng tâm']
  },

  // 3. Âm nhạc và Phim ảnh
  {
    id: 'mc-guzheng',
    titleVi: 'Đàn Cổ Tranh & Nhạc Cụ Dân Tộc',
    titleZh: '古筝与民族乐器',
    pinyin: 'Gǔzhēng',
    category: 'music_cinema',
    categoryLabel: 'Âm nhạc & Phim ảnh',
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80',
    summary: 'Âm thanh thánh thót như nước chảy mây trôi của Đàn Cổ Tranh, Nhị Hồ và Tỳ Bà đưa người nghe vào cõi thơ phương Đông.',
    details: [
      'Đàn Cổ Tranh có lịch sử hơn 2.500 năm từ thời nhà Tần, hiện đại thường có 21 dây với âm vực rộng và truyền cảm sâu sắc.',
      'Khúc nhạc cổ điển nổi tiếng: "Cao Sơn Lưu Thủy" (núi cao nước chảy - kể về tình tri âm giữa Bá Nha và Tử Kỳ), "Chiến Đài Phong", "Hương Cảng Ngư Chu".',
      'Ngoài ra còn có Nhị Hồ (đàn 2 dây ai oán da diết với kiệt tác "Nhị Tuyền Ánh Nguyệt") và Đàn Tỳ Bà (tiếng gảy dồn dập như mưa rơi trong "Thập Diện Mai Phục").'
    ],
    funFact: 'Năm 1977, bản nhạc Cổ Cầm (Guqin) "Lưu Thủy" của nghệ sĩ Quản Bình Hồ đã được NASA thu vào đĩa vàng Voyager đưa vào vũ trụ bao la để đại diện cho âm nhạc nhân loại!',
    tags: ['Cổ Tranh', 'Bá Nha Tử Kỳ', 'Âm nhạc truyền thống']
  },
  {
    id: 'mc-journey-to-the-west',
    titleVi: 'Phim Kinh Điển Tây Du Ký (1986)',
    titleZh: '电视剧《西游记》(1986版)',
    pinyin: 'Xīyóujì',
    category: 'music_cinema',
    categoryLabel: 'Âm nhạc & Phim ảnh',
    thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80',
    summary: 'Bộ phim truyền hình gắn liền với tuổi thơ của hàng triệu khán giả châu Á, do đạo diễn Dương Khiết thực hiện với diễn xuất huyền thoại của Lục Tiểu Linh Đồng.',
    details: [
      'Quay trong suốt 6 năm (1982 - 1988) vượt qua vô vàn gian khổ thiếu thốn về kỹ xảo và kinh phí, đi khắp danh lam thắng cảnh Trung Quốc.',
      'Lục Tiểu Linh Đồng hóa thân thành Tôn Ngộ Không với đôi mắt rực lửa và thần thái loài khỉ đạt tới đỉnh cao nghệ thuật không ai thay thế được.',
      'Các bài hát trong phim như "Đường Chúng Ta Đi" (敢问路在何方), "Tình Nhi Nữ" (女儿情) đã trở thành bất hủ trong lòng công chúng yêu nhạc.'
    ],
    funFact: 'Phim đã được chiếu lại hơn 3.000 lần trên các đài truyền hình Trung Quốc và quốc tế, giữ kỷ lục Guiness là phim truyền hình được phát lại nhiều nhất lịch sử!',
    tags: ['Phim kinh điển', 'Tôn Ngộ Không', 'Tuổi thơ']
  },

  // 4. Khoa học & Công nghệ
  {
    id: 'st-highspeed-rail',
    titleVi: 'Mạng Lưới Tàu Cao Tốc Phục Hưng (Fuxing)',
    titleZh: '中国复兴号高速铁路 (高铁)',
    pinyin: 'Gāotiě',
    category: 'science_tech',
    categoryLabel: 'Khoa học công nghệ',
    thumbnail: 'https://images.unsplash.com/photo-1532105956626-9569c03602f6?w=800&auto=format&fit=crop&q=80',
    summary: 'Mạng lưới đường sắt cao tốc lớn nhất hành tinh với tổng chiều dài hơn 45.000 km, tàu Phục Hưng chạy êm ru với tốc độ 350 km/h.',
    details: [
      'Tuyến cao tốc Bắc Kinh - Thượng Hải dài 1.318 km chạy bằng tàu Fuxing chỉ mất 4 giờ 18 phút.',
      'Sở hữu công nghệ tự chủ 100%, có khả năng vận hành ổn định trên mọi địa hình hiểm trở từ sa mạc cát nóng Tân Cương đến vùng băng tuyết Cáp Nhĩ Tân (-40°C).',
      'Độ êm ái đạt mức kỷ lục thế giới: đồng xu dựng đứng trên bậu cửa sổ cạnh ghế ngồi không hề bị đổ khi tàu đang lao vút 350 km/h!'
    ],
    funFact: 'Tàu cao tốc Trung Quốc cùng với thanh toán di động, mua sắm online và xe đạp công cộng được giới trẻ quốc tế bình chọn là "Tân Tứ Đại Phát Minh" của thời hiện đại.',
    tags: ['Tốc độ 350km/h', 'Giao thông tương lai', 'Kỳ tích công nghệ'],
    quiz: {
      question: 'Tàu cao tốc thế hệ mới nhất của Trung Quốc mang tên gọi là gì?',
      options: ['Phục Hưng (Fuxing)', 'Hòa Bình', 'Đông Phong', 'Thần Châu'],
      answer: 'Phục Hưng (Fuxing)',
      explanation: 'Tàu thế hệ mới "Phục Hưng" (复兴号) đạt tốc độ thương mại 350 km/h.'
    }
  },
  {
    id: 'st-space-station',
    titleVi: 'Trạm Vũ Trụ Không Gian Thiên Cung',
    titleZh: '中国天宫空间站',
    pinyin: 'Tiāngōng Kōngjiānzhàn',
    category: 'science_tech',
    categoryLabel: 'Khoa học công nghệ',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
    summary: 'Trạm không gian vũ trụ độc lập trên quỹ đạo Trái Đất, biểu tượng cho bước tiến thần kỳ của ngành hàng không vũ trụ hiện đại.',
    details: [
      'Gồm module lõi Thiên Hòa (Tianhe) cùng hai module thí nghiệm Vấn Thiên (Wentian) và Mộng Thiên (Mengtian) tạo thành cấu trúc chữ T.',
      'Các phi hành gia (Taikonauts) luân phiên sinh sống và thực hiện hàng trăm thí nghiệm khoa học sinh học, vi trọng lực, vật lý lượng tử.',
      'Mở cửa cho các nhà khoa học và phi hành gia quốc tế cùng tham gia nghiên cứu vì lợi ích chung của toàn nhân loại.'
    ],
    funFact: 'Các phi hành gia đã tổ chức nhiều "Lớp học không gian Thiên Cung" phát sóng trực tiếp cho hàng chục triệu học sinh trên Trái Đất theo dõi các hiện tượng vật lý kỳ thú!',
    tags: ['Vũ trụ', 'Thiên Cung', 'Chinh phục không gian']
  },

  // 5. Văn học kinh điển
  {
    id: 'lit-four-classics',
    titleVi: 'Tứ Đại Danh Tác Văn Học Trung Hoa',
    titleZh: '中国四大古典名著',
    pinyin: 'Sì Dà Míngzhù',
    category: 'literature',
    categoryLabel: 'Văn học kinh điển',
    thumbnail: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80',
    summary: 'Bốn viên ngọc sáng chói lọi của văn học thế giới: Tây Du Ký, Tam Quốc Diễn Nghĩa, Thủy Hử và Hồng Lâu Mộng.',
    details: [
      '1. Tây Du Ký (Ngô Thừa Ân): Cuộc hành trình thỉnh kinh vượt 81 kiếp nạn của 4 thầy trò Đường Tăng, ẩn chứa triết lý rèn luyện tâm tính.',
      '2. Tam Quốc Diễn Nghĩa (La Quán Trung): Bản hùng ca tranh hùng đoạt thiên hạ giữa Ngụy - Thục - Ngô với trí tuệ mưu lược của Gia Cát Lượng.',
      '3. Thủy Hử (Thi Nại Am): Tinh thần nghĩa khí và lòng trượng nghĩa của 108 vị anh hùng Lương Sơn Bạc.',
      '4. Hồng Lâu Mộng (Tào Tuyết Cần): Bức tranh hiện thực tráng lệ và bi kịch tình yêu giữa Giả Bảo Ngọc và Lâm Đại Ngọc trong bối cảnh phong kiến suy tàn.'
    ],
    funFact: 'Mỗi tác phẩm đều được chuyển thể thành các bộ phim truyền hình kinh điển và được dịch ra hơn 50 thứ tiếng trên thế giới.',
    tags: ['Tam Quốc', 'Tây Du Ký', 'Thủy Hử', 'Hồng Lâu Mộng'],
    quiz: {
      question: 'Tác giả của bộ tiểu thuyết sử thi "Tam Quốc Diễn Nghĩa" là ai?',
      options: ['La Quán Trung', 'Ngô Thừa Ân', 'Thi Nại Am', 'Tào Tuyết Cần'],
      answer: 'La Quán Trung',
      explanation: 'La Quán Trung sống vào thời cuối Nguyên đầu Minh là tác giả của Tam Quốc Diễn Nghĩa.'
    }
  },

  // 6. Nhân vật nổi tiếng
  {
    id: 'per-confucius',
    titleVi: 'Khổng Tử – Vạn Thế Sư Biểu',
    titleZh: '孔子 (至圣先师)',
    pinyin: 'Kǒngzǐ',
    category: 'notable_people',
    categoryLabel: 'Nhân vật nổi tiếng',
    thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
    summary: 'Nhà tư tưởng, nhà giáo dục vĩ đại nhất lịch sử Trung Hoa, người sáng lập Nho giáo định hình chuẩn mực đạo đức Á Đông.',
    details: [
      'Sinh năm 551 TCN tại nước Lỗ (nay là Khúc Phụ, tỉnh Sơn Đông). Ông đề xướng tư tưởng cốt lõi "Nhân" (仁 - yêu thương con người) và "Lễ" (礼 - quy tắc đạo đức).',
      'Tiên phong mở trường tư thục, thực hiện nguyên tắc "Hữu giáo vô loại" (có dạy thì không phân biệt giàu nghèo, ai cũng có quyền được học tập).',
      'Tập hợp lời dạy trong cuốn "Luận Ngữ" (论语) với những danh ngôn bất hủ như: "Học nhi thời tập chi, bất diệc duyệt hồ?" (Học mà thường xuyên ôn tập, chẳng phải vui lắm sao?).'
    ],
    funFact: 'Hiện nay trên khắp thế giới có hàng trăm Viện Khổng Tử được đặt theo tên ông để giảng dạy tiếng Trung và giao lưu văn hóa quốc tế.',
    tags: ['Vạn thế sư biểu', 'Nho giáo', 'Giáo dục khai phóng'],
    quiz: {
      question: 'Tư tưởng đạo đức trung tâm hàng đầu của Khổng Tử là chữ gì?',
      options: ['Chữ Nhân (仁)', 'Chữ Dũng (勇)', 'Chữ Phú (富)', 'Chữ Danh (名)'],
      answer: 'Chữ Nhân (仁)',
      explanation: 'Chữ Nhân (仁) là lòng nhân ái, gốc rễ của mọi đạo đức trong Nho gia.'
    }
  },
  {
    id: 'per-li-bai',
    titleVi: 'Thi Tiên Lý Bạch',
    titleZh: '诗仙李白',
    pinyin: 'Lǐ Bái',
    category: 'notable_people',
    categoryLabel: 'Nhân vật nổi tiếng',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    summary: 'Đại thi hào lãng mạn vĩ đại nhất thời nhà Đường, được hậu thế tôn vinh là "Thi Tiên" với những vần thơ ngút trời khí phách.',
    details: [
      'Sống vào thời Thịnh Đường (701 - 762), say mê du ngoạn sơn hà, thích múa kiếm, ngâm thơ và uống rượu.',
      'Thơ của ông mang trí tưởng tượng bay bổng vô song, ngôn ngữ tự nhiên như dòng suối tuôn trào: "Nước sông Hoàng Hà từ trời chảy xuống, chảy ra biển không bao giờ trở lại".',
      'Các bài thơ quen thuộc với học sinh Việt Nam: "Tĩnh Dạ Tứ" (Cảm nghĩ trong đêm thanh tĩnh - Đầu giường ánh trăng rọi, Ngỡ mặt đất phủ sương...), "Vọng Lư Sơn Bộc Bố".'
    ],
    funFact: 'Dân gian lưu truyền huyền thoại lãng mạn rằng ông say rượu nhảy xuống sông ôm lấy bóng vầng trăng sáng rồi cưỡi cá kình bay về trời!',
    tags: ['Thi Tiên', 'Thơ Đường', 'Tĩnh Dạ Tứ']
  }
];

export const ExploreChinaView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ExploreCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<ExploreItem | null>(null);
  
  // Interactive quiz state inside detail view
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const categories = [
    { id: 'all', label: 'Tất Cả', icon: Compass },
    { id: 'landmarks', label: 'Danh Lam Thắng Cảnh', icon: Landmark },
    { id: 'culture_art', label: 'Văn Hóa & Nghệ Thuật', icon: Palette },
    { id: 'music_cinema', label: 'Âm Nhạc & Phim', icon: Film },
    { id: 'science_tech', label: 'Khoa Học Công Nghệ', icon: Cpu },
    { id: 'literature', label: 'Văn Học Kinh Điển', icon: BookMarked },
    { id: 'notable_people', label: 'Nhân Vật Lịch Sử', icon: UserCheck },
  ];

  const filteredItems = EXPLORE_CHINA_DATA.filter((item) => {
    const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchSearch =
      searchQuery.trim() === '' ||
      item.titleVi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.titleZh.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.pinyin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleOpenDetail = (item: ExploreItem) => {
    sound.playClick();
    setSelectedItem(item);
    setQuizAnswer(null);
    setQuizSubmitted(false);
  };

  return (
    <div className="space-y-8 pb-14 animate-in fade-in duration-300">
      
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-700 via-rose-700 to-amber-700 text-white p-6 sm:p-10 shadow-2xl border-2 border-amber-400/40">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-amber-200 text-xs font-black uppercase mb-3 tracking-wider">
            <Compass className="w-4 h-4 animate-spin" style={{ animationDuration: '15s' }} />
            <span>Chuyên Trang Văn Hóa & Tri Thức Trung Hoa</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-amber-100">
            CÙNG KHÁM PHÁ TRUNG QUỐC
          </h2>
          <p className="text-xs sm:text-base text-rose-100 mt-2 leading-relaxed">
            Hành trình vạn dặm khám phá danh lam thắng cảnh kỳ vĩ, chiều sâu văn hóa nghìn năm, âm nhạc điện ảnh bất hủ, bước tiến công nghệ vũ trụ và các bậc danh nhân kiệt xuất!
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-6 -right-6 text-8xl sm:text-9xl opacity-20 select-none pointer-events-none">
          🏮
        </div>
      </div>

      {/* Filter Categories Bar */}
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative max-w-md mx-auto sm:mx-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm danh thắng, văn hóa, thơ ca, nhân vật..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-xs"
          />
        </div>

        {/* Categories Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => { sound.playClick(); setSelectedCategory(cat.id as any); }}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black transition whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-md scale-102'
                    : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700 hover:border-amber-400'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-200' : 'text-gray-400'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleOpenDetail(item)}
            className="group bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-gray-200 dark:border-slate-700 hover:border-amber-400 dark:hover:border-amber-500 hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div>
              {/* Image with Tag */}
              <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-700">
                <img
                  src={item.thumbnail}
                  alt={item.titleVi}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-amber-300 border border-amber-300/40 text-[10px] font-black uppercase">
                  {item.categoryLabel}
                </span>

                {/* Pronounce quick button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    sound.playClick();
                    speakChinese(item.titleZh);
                  }}
                  className="absolute bottom-3 right-3 p-2 rounded-full bg-white/25 hover:bg-white/40 text-white backdrop-blur-md transition"
                  title="Nghe phát âm tiếng Trung"
                >
                  <Volume2 className="w-4 h-4" />
                </button>

                <div className="absolute bottom-3 left-3 text-white">
                  <div className="text-xl font-black font-serif tracking-wide text-amber-200 drop-shadow">
                    {item.titleZh}
                  </div>
                  <div className="text-[11px] font-bold text-gray-200 drop-shadow">
                    {item.pinyin}
                  </div>
                </div>
              </div>

              {/* Text content */}
              <div className="p-5">
                <h3 className="text-base font-black text-gray-900 dark:text-gray-100 group-hover:text-red-600 dark:group-hover:text-amber-400 transition leading-snug">
                  {item.titleVi}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-2 line-clamp-3 leading-relaxed">
                  {item.summary}
                </p>

                {/* Tags */}
                <div className="flex items-center gap-1.5 flex-wrap mt-3">
                  {item.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <div className="w-full py-2.5 rounded-2xl bg-gray-50 dark:bg-slate-700/60 group-hover:bg-amber-500 group-hover:text-amber-950 font-black text-xs text-center transition flex items-center justify-center gap-1.5 border border-gray-100 dark:border-slate-700">
                <span>Khám Phá Chi Tiết</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-3xl border border-dashed border-gray-300 dark:border-slate-700 p-8">
          <Compass className="w-12 h-12 text-gray-400 mx-auto mb-2 opacity-50" />
          <p className="text-sm font-bold text-gray-600 dark:text-gray-300">
            Không tìm thấy thông tin nào phù hợp với từ khóa của bạn.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
            className="mt-3 px-4 py-2 rounded-xl bg-amber-500 text-amber-950 font-black text-xs"
          >
            Xem toàn bộ chuyên mục
          </button>
        </div>
      )}

      {/* DETAIL MODAL (BÀI KHÁM PHÁ CHI TIẾT) */}
      {selectedItem && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-in zoom-in-95 duration-200">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-amber-400/50 overflow-hidden">
            
            {/* Modal Image Header */}
            <div className="relative h-56 sm:h-64 shrink-0 bg-slate-900">
              <img
                src={selectedItem.thumbnail}
                alt={selectedItem.titleVi}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
              
              <button
                onClick={() => { sound.playClick(); setSelectedItem(null); }}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition"
                title="Đóng"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-5 right-5 text-white">
                <span className="px-2.5 py-1 rounded-full bg-red-600 text-white text-[10px] font-black uppercase">
                  {selectedItem.categoryLabel}
                </span>
                <div className="flex items-center gap-3 mt-1.5">
                  <h3 className="text-2xl sm:text-3xl font-black font-serif text-amber-200">
                    {selectedItem.titleZh}
                  </h3>
                  <button
                    onClick={() => { sound.playClick(); speakChinese(selectedItem.titleZh); }}
                    className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition"
                    title="Nghe phát âm chuẩn"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-xs sm:text-sm font-semibold text-gray-200">
                  {selectedItem.pinyin} • {selectedItem.titleVi}
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5 flex-1">
              
              <div>
                <h4 className="text-sm font-black text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-2">
                  Tổng quan nổi bật
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                  {selectedItem.summary}
                </p>
              </div>

              {/* Detailed Points */}
              <div className="space-y-2.5">
                <h4 className="text-sm font-black text-gray-900 dark:text-gray-100 uppercase tracking-wider">
                  Chi tiết văn hóa & lịch sử
                </h4>
                {selectedItem.details.map((point, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-2xl bg-gray-50 dark:bg-slate-700/50 border border-gray-100 dark:border-slate-700 text-xs sm:text-sm text-gray-700 dark:text-gray-300"
                  >
                    <span className="text-amber-500 font-black mt-0.5">•</span>
                    <span className="leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>

              {/* Fun Fact */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 to-orange-500/15 border border-amber-300 dark:border-amber-700">
                <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-black text-xs uppercase mb-1">
                  <Sparkles className="w-4 h-4" />
                  <span>Bạn có biết? (冷知识)</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 font-medium leading-relaxed">
                  {selectedItem.funFact}
                </p>
              </div>

              {/* Mini Quiz Checkpoint */}
              {selectedItem.quiz && (
                <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 space-y-3">
                  <div className="flex items-center gap-2 text-rose-800 dark:text-rose-300 font-black text-xs uppercase">
                    <Award className="w-4 h-4" />
                    <span>Thử thách ghi nhớ (Nhận +10 XP)</span>
                  </div>
                  <h5 className="text-xs sm:text-sm font-black text-gray-900 dark:text-gray-100">
                    {selectedItem.quiz.question}
                  </h5>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedItem.quiz.options.map((opt, i) => {
                      const isCorrect = opt === selectedItem.quiz?.answer;
                      let btnCls = 'bg-white dark:bg-slate-700 border-gray-200 dark:border-slate-600 text-gray-800 dark:text-gray-200 hover:border-rose-400';
                      if (quizSubmitted) {
                        if (isCorrect) {
                          btnCls = 'bg-emerald-500 text-white border-emerald-600 font-black';
                        } else if (quizAnswer === opt) {
                          btnCls = 'bg-rose-500 text-white border-rose-600 line-through';
                        } else {
                          btnCls = 'opacity-40';
                        }
                      }

                      return (
                        <button
                          key={i}
                          onClick={() => {
                            if (quizSubmitted) return;
                            setQuizAnswer(opt);
                            setQuizSubmitted(true);
                            if (isCorrect) {
                              sound.playCorrect();
                            } else {
                              sound.playWrong();
                            }
                          }}
                          disabled={quizSubmitted}
                          className={`p-3 rounded-xl border text-xs font-bold text-left transition ${btnCls}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 text-xs font-medium">
                      💡 {selectedItem.quiz.explanation}
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
