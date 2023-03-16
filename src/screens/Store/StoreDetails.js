import React, {useState} from 'react';
import {useEffect} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {COLORS} from '../../constants/Colors';
import images from '../../constants/images';
import {STRING} from '../../constants/String';
import {FONTS} from '../../constants/themes';
import ApiCall from '../../network/ApiCall';
import {API_END_POINTS} from '../../network/ApiEndPoints';
import GlobalStyle1 from '../../styles/GlobalStyle1';
import BunchDealCommonBtn from '../../utils/BunchDealCommonBtn';
import BunchDealProgressBar from '../../utils/BunchDealProgressBar';
import BunchDealEditText from '../../utils/EditText/BunchDealEditText';
import {ShowToastMessage} from '../../utils/Utility';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypofrom from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// import {ShowToastMessage} from '../../../utils/Utility';

const StoreDetails = ({navigation}) => {
  const [data, setData] = useState([
    {
      name: 'Samsung Helpline',
      phone: [{id: '2', label: 'mobile', number: '1800407267864'}],
    },
    {
      name: 'Gungunfrnd',
      phone: [
        {id: '4448', label: 'mobile', number: '7879358804'},
        {id: '44969', label: 'mobile', number: '7879358804'},
      ],
    },
    {
      name: 'Uncle',
      phone: [
        {id: '6084', label: 'mobile', number: '9425091077'},
        {id: '44439', label: 'mobile', number: '9425091077'},
      ],
    },
    {
      name: 'Ayushi Solanki',
      phone: [
        {id: '6103', label: 'mobile', number: '6268444158'},
        {id: '44754', label: 'mobile', number: '6268444158'},
      ],
    },
    {
      name: 'Aayu Kaushl',
      phone: [{id: '6105', label: 'mobile', number: '7987604697'}],
    },
    {
      name: 'Dr Malik',
      phone: [
        {id: '7385', label: 'mobile', number: '9229265003'},
        {id: '44704', label: 'mobile', number: '9229265003'},
      ],
    },
    {
      name: 'Pandit',
      phone: [
        {id: '7417', label: 'mobile', number: '9826455209'},
        {id: '49464', label: 'mobile', number: '9826455209'},
      ],
    },
    {
      name: 'Ayushi Mom',
      phone: [
        {id: '7428', label: 'mobile', number: '8269817976'},
        {id: '45149', label: 'mobile', number: '8269817976'},
      ],
    },
    {
      name: 'Laksh 2',
      phone: [{id: '8572', label: 'other', number: '9340867086'}],
    },
    {
      name: 'Kalyani',
      phone: [
        {id: '8574', label: 'mobile', number: '8889912468'},
        {id: '44669', label: 'mobile', number: '8889912468'},
      ],
    },
    {
      name: 'Pandy Sir Mit',
      phone: [{id: '8585', label: 'mobile', number: '+918989448709'}],
    },
    {
      name: 'Mosi Indore',
      phone: [{id: '8591', label: 'mobile', number: '+919200250506'}],
    },
    {
      name: 'Mahakl',
      phone: [
        {id: '8612', label: 'mobile', number: '9617633851'},
        {id: '44949', label: 'mobile', number: '9617633851'},
      ],
    },
    {
      name: 'Account Section',
      phone: [{id: '8623', label: 'mobile', number: '4050698'}],
    },
    {
      name: 'Uma Panchal',
      phone: [
        {id: '8653', label: 'mobile', number: '8770713200'},
        {id: '44804', label: 'mobile', number: '8770713200'},
      ],
    },
    {
      name: 'paradise',
      phone: [{id: '8671', label: 'other', number: '+91 79998 67153'}],
    },
    {
      name: 'Ayush',
      phone: [
        {id: '8677', label: 'other', number: '+91 70002 59677'},
        {id: '44809', label: 'other', number: '+917000259677'},
      ],
    },
    {
      name: 'Ayushi',
      phone: [
        {id: '8689', label: 'mobile', number: '+91 87700 45113'},
        {id: '45044', label: 'mobile', number: '+918770045113'},
      ],
    },
    {
      name: 'Chetan Mehara',
      phone: [
        {id: '10853', label: 'other', number: '+919109553279'},
        {id: '44629', label: 'other', number: '+919109553279'},
      ],
    },
    {
      name: 'Pummy Neha D',
      phone: [
        {id: '10869', label: 'mobile', number: '+916267499402'},
        {id: '43939', label: 'mobile', number: '+916267499402'},
      ],
    },
    {
      name: 'Paradise Watsapp',
      phone: [
        {id: '10881', label: 'mobile', number: '7828624963'},
        {id: '44384', label: 'mobile', number: '7828624963'},
      ],
    },
    {
      name: 'Bakery',
      phone: [
        {id: '10892', label: 'mobile', number: '7000537560'},
        {id: '44604', label: 'mobile', number: '7000537560'},
      ],
    },
    {
      name: 'Home Jio',
      phone: [{id: '10903', label: 'mobile', number: '07343556297'}],
    },
    {
      name: 'Dr Nagvansi',
      phone: [
        {id: '10905', label: 'mobile', number: '9424511864'},
        {id: '45019', label: 'mobile', number: '9424511864'},
      ],
    },
    {
      name: 'Payal',
      phone: [{id: '13925', label: 'mobile', number: '7470911967'}],
    },
    {
      name: 'Hr Nehq',
      phone: [
        {id: '14957', label: 'mobile', number: '9835340618'},
        {id: '44059', label: 'mobile', number: '9835340618'},
      ],
    },
    {
      name: 'Ramji Lal',
      phone: [{id: '14997', label: 'mobile', number: '8815099290'}],
    },
    {
      name: 'Sir',
      phone: [
        {id: '18076', label: 'mobile', number: '+918299114768'},
        {id: '45064', label: 'mobile', number: '+918299114768'},
      ],
    },
    {
      name: 'Unknown',
      phone: [
        {id: '18098', label: 'mobile', number: '6378207113'},
        {id: '48081', label: 'mobile', number: '6378207113'},
      ],
    },
    {
      name: 'Tulsi',
      phone: [
        {id: '24429', label: 'other', number: '+91 88279 66923'},
        {id: '44839', label: 'other', number: '+918827966923'},
      ],
    },
    {
      name: 'Arna Softech',
      phone: [
        {id: '27467', label: 'mobile', number: '+917987179587'},
        {id: '44364', label: 'mobile', number: '+917987179587'},
      ],
    },
    {
      name: 'Bhawan',
      phone: [
        {id: '27491', label: 'other', number: '+91 77489 90179'},
        {id: '44799', label: 'other', number: '+917748990179'},
      ],
    },
    {
      name: 'Mp',
      phone: [
        {id: '28473', label: 'mobile', number: '9340952309'},
        {id: '44819', label: 'mobile', number: '9340952309'},
      ],
    },
    {
      name: 'Backoffice',
      phone: [{id: '28493', label: 'mobile', number: '+917314853574'}],
    },
    {
      name: 'Backofficr222',
      phone: [{id: '28495', label: 'mobile', number: '9893335600'}],
    },
    {
      name: 'Genesis Technologies Job',
      phone: [
        {id: '28515', label: 'other', number: '+91 99773 16292'},
        {id: '44744', label: 'other', number: '+919977316292'},
      ],
    },
    {
      name: 'Ixora Technologies Job',
      phone: [{id: '28531', label: 'other', number: '+91 91315 59335'}],
    },
    {
      name: 'Sudarshan Digigrain JOB',
      phone: [
        {id: '28537', label: 'other', number: '+91 99264 45000'},
        {id: '44224', label: 'other', number: '+919926445000'},
      ],
    },
    {
      name: 'AMIT IT TECHNO',
      phone: [
        {id: '28544', label: 'mobile', number: '+91 99930 49572'},
        {id: '44844', label: 'mobile', number: '+919993049572'},
      ],
    },
    {
      name: 'HR CDN Mam',
      phone: [
        {id: '31238', label: 'other', number: '+91 98272 32017'},
        {id: '44974', label: 'other', number: '+919827232017'},
      ],
    },
    {
      name: 'Witmat Technology JOB',
      phone: [{id: '31250', label: 'other', number: '+91 731 498 9377'}],
    },
    {
      name: 'Wangoes Tech Job',
      phone: [{id: '31252', label: 'other', number: '+91 731 496 8757'}],
    },
    {
      name: 'THOUGHTWIN IT SOLUTIONS Job',
      phone: [
        {id: '31254', label: 'other', number: '+91 99770 69348'},
        {id: '45224', label: 'other', number: '+919977069348'},
      ],
    },
    {
      name: 'Techno I. T Solution Job',
      phone: [
        {id: '31266', label: 'other', number: '+91 95225 55491'},
        {id: '44134', label: 'other', number: '+919522555491'},
      ],
    },
    {
      name: 'Madhuri Yberry Infosystem Job',
      phone: [{id: '31273', label: 'other', number: '+91 731 407 4459'}],
    },
    {
      name: 'Dr Jatwa',
      phone: [
        {id: '31285', label: 'mobile', number: '9685659990'},
        {id: '44319', label: 'mobile', number: '9685659990'},
      ],
    },
    {
      name: 'Bhavna Sen',
      phone: [
        {id: '32434', label: 'other', number: '+91 95160 46018'},
        {id: '45074', label: 'other', number: '+919516046018'},
      ],
    },
    {
      name: 'India Websoft',
      phone: [
        {id: '32450', label: 'mobile', number: '9755900560'},
        {id: '44404', label: 'mobile', number: '9755900560'},
      ],
    },
    {
      name: 'Mahalaxmi',
      phone: [
        {id: '32497', label: 'mobile', number: '8963918369'},
        {id: '44774', label: 'mobile', number: '8963918369'},
      ],
    },
    {
      name: 'It',
      phone: [
        {id: '32513', label: 'mobile', number: '9977255575'},
        {id: '45129', label: 'mobile', number: '9977255575'},
      ],
    },
    {
      name: 'Neha Di Mom',
      phone: [
        {id: '32519', label: 'mobile', number: '9131061824'},
        {id: '44994', label: 'mobile', number: '9131061824'},
      ],
    },
    {
      name: 'Jatim',
      phone: [
        {id: '32548', label: 'mobile', number: '9755536165'},
        {id: '43994', label: 'mobile', number: '9755536165'},
      ],
    },
    {
      name: 'Nexon It',
      phone: [{id: '32587', label: 'mobile', number: '+917947416334'}],
    },
    {
      name: 'Nexon It Solution',
      phone: [
        {id: '32594', label: 'mobile', number: '8120422945'},
        {id: '44394', label: 'mobile', number: '8120422945'},
      ],
    },
    {
      name: 'Eway It',
      phone: [
        {id: '32605', label: 'mobile', number: '09302366003'},
        {id: '44434', label: 'mobile', number: '09302366003'},
      ],
    },
    {
      name: 'Sharash Sir',
      phone: [
        {id: '32616', label: 'other', number: '+91 78285 81071'},
        {id: '44489', label: 'other', number: '+917828581071'},
      ],
    },
    {
      name: 'Mamta',
      phone: [{id: '32651', label: 'mobile', number: '+91 74407 50905'}],
    },
    {
      name: 'Satyam Sir',
      phone: [{id: '32658', label: 'mobile', number: '9131026991'}],
    },
    {
      name: 'Harshita Owlok',
      phone: [
        {id: '33877', label: 'mobile', number: '+91 93407 14745'},
        {id: '45114', label: 'mobile', number: '+919340714745'},
      ],
    },
    {
      name: 'Sagar M',
      phone: [
        {id: '33903', label: 'mobile', number: '8839430521'},
        {id: '44204', label: 'mobile', number: '8839430521'},
      ],
    },
    {
      name: 'Hr Khusboo',
      phone: [
        {id: '33917', label: 'mobile', number: '9974379536'},
        {id: '43974', label: 'mobile', number: '9974379536'},
      ],
    },
    {
      name: 'Deepak Jio',
      phone: [
        {id: '38570', label: 'mobile', number: '6265280906'},
        {id: '44834', label: 'mobile', number: '6265280906'},
      ],
    },
    {
      name: 'Vishal Gupta Sir',
      phone: [
        {id: '38572', label: 'other', number: '+91 94066 49976'},
        {id: '44099', label: 'other', number: '+919406649976'},
      ],
    },
    {
      name: 'Zuber Sir',
      phone: [
        {id: '38611', label: 'mobile', number: '9827399379'},
        {id: '45084', label: 'mobile', number: '9827399379'},
      ],
    },
    {
      name: 'Saloni Owlok',
      phone: [
        {id: '38628', label: 'mobile', number: '+917905177046'},
        {id: '44344', label: 'mobile', number: '+917905177046'},
      ],
    },
    {
      name: 'Manoj',
      phone: [
        {id: '38651', label: 'mobile', number: '9131522919'},
        {id: '44999', label: 'mobile', number: '9131522919'},
      ],
    },
    {
      name: 'Neha Gupta',
      phone: [
        {id: '38663', label: 'mobile', number: '+91 93405 96295'},
        {id: '44639', label: 'mobile', number: '+919340596295'},
      ],
    },
    {
      name: 'Laxmi Di Parlour',
      phone: [
        {id: '38709', label: 'mobile', number: '7828094888'},
        {id: '44959', label: 'mobile', number: '7828094888'},
      ],
    },
    {
      name: 'Gothwal',
      phone: [
        {id: '38718', label: 'mobile', number: '+919399808367'},
        {id: '45119', label: 'mobile', number: '+919399808367'},
      ],
    },
    {
      name: 'Sunita Stitch Aunty',
      phone: [
        {id: '38741', label: 'mobile', number: '9753024845'},
        {id: '45164', label: 'mobile', number: '9753024845'},
      ],
    },
    {
      name: 'Damini Sharma',
      phone: [
        {id: '38759', label: 'mobile', number: '+91 95168 17715'},
        {id: '44714', label: 'mobile', number: '+919516817715'},
      ],
    },
    {
      name: 'Deepak',
      phone: [
        {id: '38766', label: 'mobile', number: '8435924052'},
        {id: '44579', label: 'mobile', number: '8435924052'},
      ],
    },
    {
      name: 'Papa',
      phone: [{id: '38800', label: 'mobile', number: '+917869941768'}],
    },
    {
      name: 'Shop',
      phone: [
        {id: '38802', label: 'mobile', number: '9826501389'},
        {id: '44664', label: 'mobile', number: '9826501389'},
      ],
    },
    {
      name: 'Payal Boutiqueo',
      phone: [{id: '40030', label: 'other', number: '+91 79996 39188'}],
    },
    {
      name: 'Varsha Owlok',
      phone: [
        {id: '40037', label: 'mobile', number: '+919755020494'},
        {id: '45104', label: 'mobile', number: '+919755020494'},
      ],
    },
    {
      name: 'Anishq',
      phone: [
        {id: '40083', label: 'mobile', number: '+917974926456'},
        {id: '43969', label: 'mobile', number: '+917974926456'},
      ],
    },
    {
      name: 'Sheetal',
      phone: [
        {id: '40095', label: 'other', number: '+91 89591 67151'},
        {id: '44079', label: 'other', number: '+918959167151'},
      ],
    },
    {
      name: 'Bagpurq Parlour',
      phone: [
        {id: '40111', label: 'mobile', number: '7803866944'},
        {id: '44559', label: 'mobile', number: '7803866944'},
      ],
    },
    {
      name: 'Rashmi Bhabhi 2',
      phone: [
        {id: '40167', label: 'other', number: '+91 6264 140 983'},
        {id: '49435', label: 'other', number: '+916264140983'},
      ],
    },
    {
      name: 'Rashmi bahbhi',
      phone: [
        {id: '40169', label: 'other', number: '+91 82692 73818'},
        {id: '44979', label: 'other', number: '+918269273818'},
      ],
    },
    {
      name: 'Mansi Recrute',
      phone: [
        {id: '40181', label: 'mobile', number: '8510813252'},
        {id: '44539', label: 'mobile', number: '8510813252'},
      ],
    },
    {
      name: 'Arpit Sir Owlok',
      phone: [
        {id: '40248', label: 'mobile', number: '+91 98066 23446'},
        {id: '44589', label: 'mobile', number: '+919806623446'},
      ],
    },
    {
      name: 'Sona Di',
      phone: [
        {id: '40255', label: 'mobile', number: '8817235485'},
        {id: '45194', label: 'mobile', number: '8817235485'},
      ],
    },
    {
      name: 'Durgesh Jiju',
      phone: [
        {id: '40322', label: 'mobile', number: '+91 94258 69194'},
        {id: '44699', label: 'mobile', number: '+919425869194'},
      ],
    },
    {
      name: 'Mona Di',
      phone: [
        {id: '40337', label: 'mobile', number: '+919601185931'},
        {id: '45054', label: 'mobile', number: '+919601185931'},
      ],
    },
    {
      name: 'Photographer',
      phone: [
        {id: '40498', label: 'mobile', number: '+91 91119 77623'},
        {id: '45014', label: 'mobile', number: '+919111977623'},
      ],
    },
    {
      name: 'Sagar Bhaiya',
      phone: [
        {id: '40506', label: 'mobile', number: '+918305277516'},
        {id: '45004', label: 'mobile', number: '+918305277516'},
      ],
    },
    {
      name: 'Simran Di',
      phone: [
        {id: '40522', label: 'mobile', number: '+919024354374'},
        {id: '44444', label: 'mobile', number: '+919024354374'},
      ],
    },
    {
      name: 'Vedant Bhaiya',
      phone: [
        {id: '40533', label: 'mobile', number: '+91 95848 88322'},
        {id: '45199', label: 'mobile', number: '+919584888322'},
      ],
    },
    {
      name: 'Pooja Owlok',
      phone: [
        {id: '40540', label: 'mobile', number: '+91 82694 22002'},
        {id: '44259', label: 'mobile', number: '+918269422002'},
      ],
    },
    {
      name: 'Rajesh Uncle',
      phone: [
        {id: '40552', label: 'mobile', number: '7354079949'},
        {id: '44304', label: 'mobile', number: '7354079949'},
      ],
    },
    {
      name: 'anjali Frnd',
      phone: [
        {id: '40587', label: 'other', number: '+91 88273 81476'},
        {id: '45099', label: 'other', number: '+918827381476'},
      ],
    },
    {
      name: 'Khushi Jarwal',
      phone: [
        {id: '40598', label: 'mobile', number: '+91 74158 59113'},
        {id: '44239', label: 'mobile', number: '+917415859113'},
      ],
    },
    {
      name: 'GomE',
      phone: [
        {id: '40609', label: 'mobile', number: '9977027203'},
        {id: '44389', label: 'mobile', number: '9977027203'},
      ],
    },
    {
      name: 'Pahal Mit',
      phone: [
        {id: '40616', label: 'other', number: '+91 90092 86384'},
        {id: '44849', label: 'other', number: '+919009286384'},
      ],
    },
    {
      name: 'Kala Mosi',
      phone: [{id: '40628', label: 'other', number: '+91 92002 50506'}],
    },
    {
      name: 'Pratyush Gaur',
      phone: [
        {id: '40630', label: 'mobile', number: '+91 96301 36688'},
        {id: '44429', label: 'mobile', number: '+919630136688'},
      ],
    },
    {
      name: 'Ayushi Systematix QA',
      phone: [
        {id: '40773', label: 'other', number: '+91 96698 54341'},
        {id: '44769', label: 'other', number: '+919669854341'},
      ],
    },
    {
      name: 'Idea',
      phone: [{id: '40788', label: 'mobile', number: '9977097479'}],
    },
    {
      name: 'Chandan Jalebi Sir',
      phone: [{id: '40879', label: 'other', number: '+91 78285 81071'}],
    },
    {
      name: 'Technotoil',
      phone: [
        {id: '40885', label: 'mobile', number: '+919309296677'},
        {id: '44724', label: 'mobile', number: '+919309296677'},
      ],
    },
    {
      name: 'Cake Monika Ahuja',
      phone: [
        {id: '40916', label: 'other', number: '+91 99933 68986'},
        {id: '44644', label: 'other', number: '+919993368986'},
      ],
    },
    {
      name: 'Shree Ganga',
      phone: [
        {id: '40924', label: 'mobile', number: '9826071210'},
        {id: '44234', label: 'mobile', number: '9826071210'},
      ],
    },
    {
      name: 'Satyam Sir Whatsapp',
      phone: [
        {id: '40935', label: 'mobile', number: '+91 99078 65257'},
        {id: '45024', label: 'mobile', number: '+919907865257'},
      ],
    },
    {
      name: 'Seema Owlok',
      phone: [
        {id: '40947', label: 'other', number: '+91 97522 88164'},
        {id: '40948', label: 'other', number: '+91 83192 11173'},
        {id: '44934', label: 'other', number: '+919752288164'},
      ],
    },
    {
      name: 'Company',
      phone: [
        {id: '40976', label: 'mobile', number: '9606623245'},
        {id: '44194', label: 'mobile', number: '9606623245'},
      ],
    },
    {
      name: 'Jk Hospital',
      phone: [
        {id: '41006', label: 'mobile', number: '7697712300'},
        {id: '43949', label: 'mobile', number: '7697712300'},
      ],
    },
    {
      name: 'Anju Mosi',
      phone: [
        {id: '41013', label: 'mobile', number: '+91 98934 89284'},
        {id: '44684', label: 'mobile', number: '+919893489284'},
      ],
    },
    {
      name: 'Dr. G D',
      phone: [
        {id: '41037', label: 'mobile', number: '+91 89559 07203'},
        {id: '48093', label: 'mobile', number: '+918955907203'},
      ],
    },
    {
      name: 'New Company',
      phone: [{id: '41066', label: 'mobile', number: '+918071965649'}],
    },
    {
      name: 'harsh lakwal',
      phone: [
        {id: '41087', label: 'mobile', number: '+91 78698 50072'},
        {id: '44899', label: 'mobile', number: '+917869850072'},
      ],
    },
    {
      name: 'Whatsapp',
      phone: [
        {id: '41094', label: 'mobile', number: '9340971376'},
        {id: '44544', label: 'mobile', number: '9340971376'},
      ],
    },
    {
      name: 'Aayu2',
      phone: [{id: '41101', label: 'mobile', number: '+91 95224 13847'}],
    },
    {
      name: 'Sir Rishabh Systematix',
      phone: [
        {id: '41128', label: 'other', number: '+91 89626 39369'},
        {id: '44619', label: 'other', number: '+918962639369'},
      ],
    },
    {
      name: 'Cubexo',
      phone: [
        {id: '41154', label: 'mobile', number: '+916268499885'},
        {id: '44469', label: 'mobile', number: '+916268499885'},
      ],
    },
    {
      name: 'Company 2',
      phone: [
        {id: '41161', label: 'mobile', number: '+916268873048'},
        {id: '44109', label: 'mobile', number: '+916268873048'},
      ],
    },
    {name: 'shekhabdul2208@gmail.com', phone: []},
    {
      name: 'Vikas Laravel',
      phone: [
        {id: '41174', label: 'other', number: '+91 82697 08389'},
        {id: '44479', label: 'other', number: '+918269708389'},
      ],
    },
    {
      name: 'Mundrq',
      phone: [
        {id: '42016', label: 'mobile', number: '9826242882'},
        {id: '44229', label: 'mobile', number: '9826242882'},
      ],
    },
    {
      name: 'Mohit Sir Cubexo',
      phone: [
        {id: '42040', label: 'mobile', number: '+919981189901'},
        {id: '44519', label: 'mobile', number: '+919981189901'},
      ],
    },
    {
      name: 'Pooja Verma Cubexo',
      phone: [
        {id: '42051', label: 'mobile', number: '6263401937'},
        {id: '44569', label: 'mobile', number: '6263401937'},
      ],
    },
    {
      name: 'Lalit',
      phone: [
        {id: '42088', label: 'mobile', number: '+91 77738 86141'},
        {id: '47961', label: 'mobile', number: '+917773886141'},
      ],
    },
    {
      name: 'Shipra Mam Cubexo',
      phone: [
        {id: '42712', label: 'mobile', number: '7999397126'},
        {id: '44659', label: 'mobile', number: '7999397126'},
      ],
    },
    {
      name: 'Raveena Mam Cubexo',
      phone: [
        {id: '46413', label: 'mobile', number: '+91 99260 90652'},
        {id: '46423', label: 'mobile', number: '+919926090652'},
      ],
    },
    {
      name: 'Avni Verma Hr',
      phone: [
        {id: '46458', label: 'mobile', number: '+91 79747 10127'},
        {id: '46468', label: 'mobile', number: '+917974710127'},
      ],
    },
    {
      name: 'Pragya Singh',
      phone: [
        {id: '46469', label: 'other', number: '+91 99813 84882'},
        {id: '46476', label: 'other', number: '+919981384882'},
      ],
    },
    {
      name: 'Deeksha Nayak Cubexo',
      phone: [
        {id: '46487', label: 'mobile', number: '+91 82695 24633'},
        {id: '46495', label: 'mobile', number: '+918269524633'},
      ],
    },
    {
      name: 'Pooja Akhand',
      phone: [{id: '46999', label: 'mobile', number: '+919399235972'}],
    },
    {
      name: 'Kaushal Sir',
      phone: [
        {id: '47010', label: 'mobile', number: '8878882199'},
        {id: '47016', label: 'mobile', number: '8878882199'},
      ],
    },
    {name: 'Police', phone: [{id: '47046', label: 'mobile', number: '100'}]},
    {name: 'Fire', phone: [{id: '47048', label: 'mobile', number: '101'}]},
    {name: 'Ambulance', phone: [{id: '47050', label: 'mobile', number: '102'}]},
    {name: 'Railways', phone: [{id: '47052', label: 'mobile', number: '139'}]},
    {
      name: 'JioHelpline',
      phone: [{id: '47054', label: 'mobile', number: '1991'}],
    },
    {
      name: 'Jio-Tele-verification Helpline',
      phone: [{id: '47056', label: 'mobile', number: '1977'}],
    },
    {
      name: 'Solitire',
      phone: [{id: '47062', label: 'other', number: '+91 6265 430 948'}],
    },
    {
      name: 'Shree Ganga2',
      phone: [
        {id: '47069', label: 'mobile', number: '06262408899'},
        {id: '47075', label: 'mobile', number: '06262408899'},
      ],
    },
    {
      name: 'Urmi Nihore2',
      phone: [
        {id: '47076', label: 'mobile', number: '+91 93024 30770'},
        {id: '47082', label: 'mobile', number: '+919302430770'},
      ],
    },
    {
      name: 'JAy',
      phone: [
        {id: '47083', label: 'mobile', number: '+91 6266 565 401'},
        {id: '47089', label: 'mobile', number: '+916266565401'},
      ],
    },
    {
      name: 'Neha Di',
      phone: [
        {id: '47090', label: 'mobile', number: '+91 77230 71757'},
        {id: '47096', label: 'mobile', number: '+917723071757'},
      ],
    },
    {
      name: 'Mami2',
      phone: [
        {id: '47097', label: 'mobile', number: '+91 70243 39988'},
        {id: '47103', label: 'mobile', number: '+917024339988'},
      ],
    },
    {
      name: 'Solitire',
      phone: [{id: '47104', label: 'mobile', number: '9111626261'}],
    },
    {
      name: 'Neha Mit',
      phone: [
        {id: '47106', label: 'mobile', number: '+919340375755'},
        {id: '47112', label: 'mobile', number: '+919340375755'},
      ],
    },
    {
      name: 'Bhumi2',
      phone: [
        {id: '47113', label: 'mobile', number: '+919294732743'},
        {id: '47119', label: 'mobile', number: '+919294732743'},
      ],
    },
    {
      name: 'Vikrant Cubexo',
      phone: [{id: '47138', label: 'mobile', number: '+91 74770 76304'}],
    },
    {
      name: 'Vikrant Sir Cubexo',
      phone: [{id: '47144', label: 'mobile', number: '+917477076304'}],
    },
    {
      name: 'Ashish Bhalray Cubexo',
      phone: [
        {id: '47145', label: 'mobile', number: '+91 86021 19284'},
        {id: '47151', label: 'mobile', number: '+918602119284'},
      ],
    },
    {
      name: 'Manoj Cubexo',
      phone: [
        {id: '47152', label: 'mobile', number: '+91 89822 69890'},
        {id: '47158', label: 'mobile', number: '+918982269890'},
      ],
    },
    {
      name: 'Dady',
      phone: [
        {id: '47159', label: 'mobile', number: '+919406839399'},
        {id: '47165', label: 'mobile', number: '+919406839399'},
      ],
    },
    {
      name: 'Manali',
      phone: [
        {id: '47173', label: 'mobile', number: '+91 91096 69415'},
        {id: '47179', label: 'mobile', number: '+919109669415'},
      ],
    },
    {
      name: 'Gungun',
      phone: [
        {id: '47180', label: 'mobile', number: '+918319371861'},
        {id: '47186', label: 'mobile', number: '+918319371861'},
      ],
    },
    {
      name: 'Bade Papa',
      phone: [
        {id: '47187', label: 'mobile', number: '+919406878886'},
        {id: '47193', label: 'mobile', number: '+919406878886'},
      ],
    },
    {
      name: 'Pooja Akhand',
      phone: [
        {id: '47194', label: 'mobile', number: '+91 92299 97074'},
        {id: '47200', label: 'mobile', number: '+919229997074'},
      ],
    },
    {
      name: 'Bhaiyu Bhaiya',
      phone: [
        {id: '47201', label: 'mobile', number: '+91 78988 74559'},
        {id: '47207', label: 'mobile', number: '+917898874559'},
      ],
    },
    {
      name: 'Bhupendra Sir Cubexo',
      phone: [
        {id: '47208', label: 'mobile', number: '8871350002'},
        {id: '47214', label: 'mobile', number: '8871350002'},
      ],
    },
    {
      name: 'Dada Ji',
      phone: [
        {id: '47223', label: 'mobile', number: '+919479625733'},
        {id: '47229', label: 'mobile', number: '+919479625733'},
      ],
    },
    {
      name: 'Jyoti',
      phone: [
        {id: '47241', label: 'mobile', number: '+919340332664'},
        {id: '47247', label: 'mobile', number: '+919340332664'},
      ],
    },
    {
      name: 'Bittu Bhaiya',
      phone: [
        {id: '47249', label: 'mobile', number: '8962715033'},
        {id: '47255', label: 'mobile', number: '8962715033'},
      ],
    },
    {
      name: 'Anmol',
      phone: [{id: '47256', label: 'mobile', number: '7999740230'}],
    },
    {
      name: 'Ashis Sir',
      phone: [{id: '47260', label: 'mobile', number: '+91 74707 39948'}],
    },
    {
      name: 'Shivam Davv',
      phone: [
        {id: '47266', label: 'mobile', number: '+917470739948'},
        {id: '48103', label: 'other', number: '+91 74707 39948'},
      ],
    },
    {
      name: 'Aashis',
      phone: [
        {id: '47267', label: 'mobile', number: '+91 81097 58597'},
        {id: '47273', label: 'mobile', number: '+918109758597'},
      ],
    },
    {
      name: 'Himanshi',
      phone: [
        {id: '47296', label: 'mobile', number: '+917470681679'},
        {id: '47302', label: 'mobile', number: '+917470681679'},
      ],
    },
    {
      name: 'Ishu Bhai',
      phone: [
        {id: '47303', label: 'mobile', number: '+91 74704 46970'},
        {id: '47309', label: 'mobile', number: '+917470446970'},
      ],
    },
    {
      name: 'Sanket Sanglikar Cubexo',
      phone: [
        {id: '47317', label: 'mobile', number: '6264427880'},
        {id: '47323', label: 'mobile', number: '6264427880'},
      ],
    },
    {
      name: 'Kaushal Sir Cubexo',
      phone: [{id: '47324', label: 'mobile', number: '9111620002'}],
    },
    {
      name: 'Shailendra Sir Cubexo',
      phone: [
        {id: '47331', label: 'mobile', number: '+91 96444 49487'},
        {id: '47337', label: 'mobile', number: '+919644449487'},
      ],
    },
    {
      name: 'Bable Di',
      phone: [
        {id: '47344', label: 'mobile', number: '+919685300127'},
        {id: '47350', label: 'mobile', number: '+919685300127'},
      ],
    },
    {
      name: 'Bhupendra Sir2 Cubexo',
      phone: [
        {id: '47351', label: 'mobile', number: '+919340408146'},
        {id: '47357', label: 'mobile', number: '+919340408146'},
      ],
    },
    {
      name: 'Pooja QA Cubexo',
      phone: [
        {id: '47362', label: 'mobile', number: '+91 70185 26053'},
        {id: '47372', label: 'mobile', number: '+917018526053'},
      ],
    },
    {
      name: 'Badi Maa',
      phone: [
        {id: '47373', label: 'mobile', number: '+918085545156'},
        {id: '47379', label: 'mobile', number: '+918085545156'},
      ],
    },
    {
      name: 'Gregory Bro Cubexo',
      phone: [
        {id: '47384', label: 'mobile', number: '7828814229'},
        {id: '47390', label: 'mobile', number: '7828814229'},
      ],
    },
    {
      name: 'Seema Bhua',
      phone: [
        {id: '47402', label: 'mobile', number: '8319069016'},
        {id: '47408', label: 'mobile', number: '8319069016'},
      ],
    },
    {
      name: 'Aunty Padosan',
      phone: [
        {id: '47409', label: 'mobile', number: '8827949906'},
        {id: '47415', label: 'mobile', number: '8827949906'},
      ],
    },
    {
      name: 'Shiv Fashion',
      phone: [
        {id: '47416', label: 'mobile', number: '9039802072'},
        {id: '47426', label: 'mobile', number: '9039802072'},
      ],
    },
    {
      name: 'Ayush Chouksey Cubexo',
      phone: [
        {id: '47427', label: 'mobile', number: '+91 86022 76537'},
        {id: '47433', label: 'mobile', number: '+918602276537'},
      ],
    },
    {
      name: 'Payal Porwal Bhawar Kua',
      phone: [
        {id: '47450', label: 'mobile', number: '7440808389'},
        {id: '47456', label: 'mobile', number: '7440808389'},
      ],
    },
    {
      name: 'Manvi Cubexo',
      phone: [
        {id: '47459', label: 'mobile', number: '+91 75090 33794'},
        {id: '47465', label: 'mobile', number: '+917509033794'},
      ],
    },
    {
      name: 'Shubham Owlok',
      phone: [
        {id: '47472', label: 'mobile', number: '+91 99260 46820'},
        {id: '47478', label: 'mobile', number: '+919926046820'},
      ],
    },
    {
      name: 'anamika HR Cubexo',
      phone: [
        {id: '47483', label: 'mobile', number: '+91 6265 473 066'},
        {id: '47489', label: 'mobile', number: '+916265473066'},
      ],
    },
    {
      name: 'Reena',
      phone: [
        {id: '47490', label: 'other', number: '+91 82694 58361'},
        {id: '47982', label: 'other', number: '+918269458361'},
      ],
    },
    {
      name: 'Priyanka (gregory)',
      phone: [
        {id: '47529', label: 'mobile', number: '8109368207'},
        {id: '47535', label: 'mobile', number: '8109368207'},
      ],
    },
    {
      name: 'Muskan Trivedi Cubexo',
      phone: [
        {id: '47564', label: 'mobile', number: '+91 80853 98589'},
        {id: '47570', label: 'mobile', number: '+918085398589'},
      ],
    },
    {
      name: 'Prateek Sir Cubexo',
      phone: [
        {id: '47590', label: 'mobile', number: '+91 91114 10001'},
        {id: '47596', label: 'mobile', number: '+919111410001'},
      ],
    },
    {
      name: 'Kavi',
      phone: [
        {id: '47607', label: 'mobile', number: '+917879375968'},
        {id: '47613', label: 'mobile', number: '+917879375968'},
      ],
    },
    {
      name: 'Manshaman Aunty',
      phone: [
        {id: '47627', label: 'other', number: '+91 96851 46607'},
        {id: '48015', label: 'other', number: '+919685146607'},
      ],
    },
    {
      name: 'Vishal Owlok',
      phone: [
        {id: '47629', label: 'mobile', number: '+91 97522 33056'},
        {id: '47635', label: 'mobile', number: '+919752233056'},
      ],
    },
    {
      name: 'Nidhi IT Park',
      phone: [
        {id: '47648', label: 'mobile', number: '7828826710'},
        {id: '47658', label: 'mobile', number: '7828826710'},
      ],
    },
    {
      name: 'Payal Mam Alpn',
      phone: [
        {id: '47669', label: 'other', number: '+91 77710 14090'},
        {id: '47675', label: 'other', number: '+917771014090'},
      ],
    },
    {
      name: 'Himanshu Sharma Owlok',
      phone: [
        {id: '47680', label: 'mobile', number: '+91 97530 31236'},
        {id: '47690', label: 'mobile', number: '+919753031236'},
      ],
    },
    {
      name: 'Harsh Sir Cubexo',
      phone: [
        {id: '47706', label: 'mobile', number: '+91 79743 57402'},
        {id: '47712', label: 'mobile', number: '+917974357402'},
      ],
    },
    {
      name: 'jagratipanchal',
      phone: [
        {id: '47717', label: 'mobile', number: '+91 75808 03140'},
        {id: '47723', label: 'mobile', number: '+917580803140'},
      ],
    },
    {
      name: 'Chandu Bhaiya',
      phone: [
        {id: '47728', label: 'other', number: '+91 94247 43110'},
        {id: '47738', label: 'other', number: '+919424743110'},
      ],
    },
    {
      name: 'Nikhil jarwal',
      phone: [
        {id: '47739', label: 'mobile', number: '+91 93018 19879'},
        {id: '49459', label: 'mobile', number: '+919301819879'},
      ],
    },
    {
      name: 'Ashu',
      phone: [
        {id: '47758', label: 'mobile', number: '6264560828'},
        {id: '47764', label: 'mobile', number: '6264560828'},
      ],
    },
    {
      name: 'Arpit Mittal',
      phone: [
        {id: '47773', label: 'mobile', number: '+919826370020'},
        {id: '47779', label: 'mobile', number: '+919826370020'},
      ],
    },
    {
      name: 'Jaanhavieee',
      phone: [
        {id: '47808', label: 'mobile', number: '+91 91111 84588'},
        {id: '47814', label: 'mobile', number: '+919111184588'},
      ],
    },
    {
      name: 'Jayaswini Dwivedi 🦋',
      phone: [
        {id: '47819', label: 'mobile', number: '+91 82250 73931'},
        {id: '47825', label: 'mobile', number: '+918225073931'},
      ],
    },
    {
      name: 'Bhumi',
      phone: [
        {id: '47826', label: 'mobile', number: '7224079771'},
        {id: '47832', label: 'mobile', number: '7224079771'},
      ],
    },
    {
      name: 'MS chouhan',
      phone: [
        {id: '47837', label: 'mobile', number: '+91 6266 643 412'},
        {id: '47843', label: 'mobile', number: '+916266643412'},
      ],
    },
    {
      name: 'Deelip Sir Slpine',
      phone: [
        {id: '47848', label: 'mobile', number: '+91 92002 60427'},
        {id: '47854', label: 'mobile', number: '+919200260427'},
      ],
    },
    {
      name: 'Muskan Jio',
      phone: [
        {id: '47859', label: 'mobile', number: '7999125021'},
        {id: '48002', label: 'mobile', number: '7999125021'},
      ],
    },
    {
      name: 'Mantasha Khan',
      phone: [
        {id: '47873', label: 'mobile', number: '+91 6265 415 124'},
        {id: '47879', label: 'mobile', number: '+916265415124'},
      ],
    },
    {
      name: 'Aayu',
      phone: [
        {id: '47880', label: 'mobile', number: '7049295611'},
        {id: '47966', label: 'mobile', number: '7049295611'},
      ],
    },
    {
      name: 'Palak',
      phone: [
        {id: '47892', label: 'mobile', number: '7999880325'},
        {id: '47898', label: 'mobile', number: '7999880325'},
      ],
    },
    {
      name: 'Bdi Maa',
      phone: [{id: '47918', label: 'mobile', number: '+918962040886'}],
    },
    {
      name: 'Vijay Mama',
      phone: [
        {id: '47920', label: 'mobile', number: '+91 98272 83773'},
        {id: '47926', label: 'mobile', number: '+919827283773'},
      ],
    },
    {
      name: 'Yash Bhati',
      phone: [
        {id: '47927', label: 'mobile', number: '+919179458723'},
        {id: '47933', label: 'mobile', number: '+919179458723'},
      ],
    },
    {
      name: 'Rani Patidar',
      phone: [
        {id: '47942', label: 'mobile', number: '+91 90093 13705'},
        {id: '47948', label: 'mobile', number: '+919009313705'},
      ],
    },
    {
      name: 'Amrita Di',
      phone: [
        {id: '47971', label: 'mobile', number: '+918817305959'},
        {id: '47977', label: 'mobile', number: '+918817305959'},
      ],
    },
    {
      name: 'Narendra Parmar',
      phone: [
        {id: '47991', label: 'mobile', number: '+91 75660 01435'},
        {id: '47997', label: 'mobile', number: '+917566001435'},
      ],
    },
    {
      name: 'Anmol Akhand',
      phone: [
        {id: '48016', label: 'other', number: '+91 90397 57723'},
        {id: '48022', label: 'other', number: '+919039757723'},
      ],
    },
    {
      name: 'Anmol Akhand',
      phone: [{id: '48023', label: 'other', number: '+91 90397 57723'}],
    },
    {
      name: 'Ashwini Cubexo',
      phone: [
        {id: '48025', label: 'mobile', number: '+918390484781'},
        {id: '48031', label: 'mobile', number: '+918390484781'},
      ],
    },
    {
      name: 'Mp13',
      phone: [
        {id: '48032', label: 'mobile', number: '8815177444'},
        {id: '48038', label: 'mobile', number: '8815177444'},
      ],
    },
    {
      name: 'Chidkuu',
      phone: [
        {id: '48039', label: 'mobile', number: '+91 89896 26014'},
        {id: '48045', label: 'mobile', number: '+918989626014'},
      ],
    },
    {
      name: 'Pranjal Website',
      phone: [
        {id: '48051', label: 'other', number: '+91 91312 51818'},
        {id: '48057', label: 'other', number: '+919131251818'},
      ],
    },
    {
      name: 'Balram Dangi',
      phone: [
        {id: '48058', label: 'mobile', number: '+91 90014 48429'},
        {id: '48064', label: 'mobile', number: '+919001448429'},
      ],
    },
    {
      name: 'Pradeep Ujjain Yug',
      phone: [
        {id: '48070', label: 'other', number: '+91 92003 67317'},
        {id: '48076', label: 'other', number: '+919200367317'},
      ],
    },
    {
      name: 'Rakhi yadav Cubexo',
      phone: [
        {id: '48082', label: 'mobile', number: '+91 93027 36008'},
        {id: '48088', label: 'mobile', number: '+919302736008'},
      ],
    },
    {
      name: 'Papa',
      phone: [{id: '48094', label: 'mobile', number: '8989089353'}],
    },
    {
      name: 'Lalit Bhaiya',
      phone: [
        {id: '48096', label: 'mobile', number: '7999445236'},
        {id: '48102', label: 'mobile', number: '7999445236'},
      ],
    },
    {
      name: 'Shivam Davv',
      phone: [{id: '48105', label: 'other', number: '+91 74707 39948'}],
    },
    {
      name: 'Gourav Carpenter Owlok',
      phone: [
        {id: '48107', label: 'mobile', number: '+91 88279 15701'},
        {id: '48113', label: 'mobile', number: '+918827915701'},
      ],
    },
    {
      name: 'Adarsh Owlok',
      phone: [
        {id: '48114', label: 'mobile', number: '+91 84589 37930'},
        {id: '48120', label: 'mobile', number: '+918458937930'},
      ],
    },
    {
      name: 'Online',
      phone: [
        {id: '48121', label: 'mobile', number: '9009601644'},
        {id: '48127', label: 'mobile', number: '9009601644'},
      ],
    },
    {
      name: 'Khandanakq',
      phone: [
        {id: '48128', label: 'mobile', number: '8269313536'},
        {id: '48134', label: 'mobile', number: '8269313536'},
      ],
    },
    {
      name: 'Bhavna Rajput',
      phone: [
        {id: '48135', label: 'other', number: '+91 97705 47691'},
        {id: '48146', label: 'other', number: '+919770547691'},
      ],
    },
    {
      name: 'Guddu Mama',
      phone: [
        {id: '48147', label: 'mobile', number: '9893857048'},
        {id: '48153', label: 'mobile', number: '9893857048'},
      ],
    },
    {
      name: 'Ujjain Book Depo',
      phone: [
        {id: '48154', label: 'mobile', number: '8878647884'},
        {id: '48160', label: 'mobile', number: '8878647884'},
      ],
    },
    {
      name: 'Agrawal',
      phone: [{id: '48161', label: 'mobile', number: '9479815315'}],
    },
    {name: '8269509548', phone: []},
    {
      name: 'Karan',
      phone: [
        {id: '49331', label: 'mobile', number: '7898793550'},
        {id: '49341', label: 'mobile', number: '7898793550'},
      ],
    },
    {
      name: 'Shubhra Cubexo',
      phone: [
        {id: '49350', label: 'mobile', number: '7879908594'},
        {id: '49360', label: 'mobile', number: '7879908594'},
      ],
    },
    {
      name: 'Shubhra Cubexo1',
      phone: [{id: '49361', label: 'mobile', number: '8109609575'}],
    },
    {
      name: 'Ashwini Alpine',
      phone: [
        {id: '49367', label: 'mobile', number: '+918103102324'},
        {id: '49373', label: 'mobile', number: '+918103102324'},
      ],
    },
    {
      name: 'Kumrawat Sir',
      phone: [{id: '49378', label: 'other', number: '+91 6261 465 937'}],
    },
    {name: 'Abhay Cubexo', phone: []},
    {
      name: 'Priyanka Mdm Alpine Hod',
      phone: [
        {id: '49384', label: 'other', number: '+91 88393 85107'},
        {id: '49390', label: 'other', number: '+918839385107'},
      ],
    },
    {name: 'Nupur 2', phone: []},
    {
      name: 'Jatin Gothwal',
      phone: [
        {id: '49395', label: 'mobile', number: '8109486171'},
        {id: '49401', label: 'mobile', number: '8109486171'},
      ],
    },
    {
      name: 'Jyoti Mam Mtech',
      phone: [
        {id: '49406', label: 'mobile', number: '6262569266'},
        {id: '49414', label: 'mobile', number: '6262569266'},
      ],
    },
    {
      name: 'Deepika Mam Mtech',
      phone: [
        {id: '49408', label: 'mobile', number: '9893796088'},
        {id: '49419', label: 'mobile', number: '9893796088'},
      ],
    },
    {
      name: 'Amrata Mam Mtech',
      phone: [
        {id: '49420', label: 'mobile', number: '8719087211'},
        {id: '49430', label: 'mobile', number: '8719087211'},
      ],
    },
    {
      name: 'Archna Sigh Mdm',
      phone: [
        {id: '49443', label: 'other', number: '+91 98272 99536'},
        {id: '49454', label: 'other', number: '+919827299536'},
      ],
    },
    {
      name: 'Mr👉Abhay',
      phone: [
        {id: '49473', label: 'mobile', number: '+91 95164 90729'},
        {id: '49488', label: 'mobile', number: '+919516490729'},
      ],
    },
  ]);

  useEffect(() => {
    console.log(data.length);

    let a = data.map(i => {
      return {
        displayName: i.name + ' PJ',
        phoneNumbers: i.phone,
      };
    });
    // console.log(JSON.stringify(a));
  }, []);

  return (
    <ScrollView
      style={GlobalStyle1.mainContainerBgColor}
      showsVerticalScrollIndicator={false}>
      <SafeAreaView style={GlobalStyle1.mainContainerBgColor}>
        <View>
          <ImageBackground
            source={{
              uri: 'https://aalamsalon.com/wp-content/uploads/2015/10/Dallas-Hair-salon-Best-Plano-Hair-Salon-Best-Frisco-Hair-Salon-Top-Allen-Hair-salon-Best-McKinney-Addison-TX-DFW-Hair-Colorist-Hair-Stylist-Men-Haircut-Mens-Hair-Cut-Hair-Salons-Best-Salons-A-.jpg',
            }}
            style={GlobalStyle1.store_image}>
            <View style={GlobalStyle1.Fonticon}>
              <FontAwesome
                name="arrow-left"
                size={20}
                color={COLORS.colorAccent}
                style={{
                  marginEnd: 200,
                  marginBottom: 10,
                }}
              />
              <Entypofrom
                name="share"
                size={20}
                color={COLORS.colorAccent}
                style={{
                  marginStart: 10,
                  marginBottom: 10,
                }}
              />
              <MaterialCommunityIcons
                name="thumb-up-outline"
                size={20}
                color={COLORS.colorAccent}
                style={{
                  marginBottom: 10,
                }}
              />
            </View>
            <View
              style={[
                GlobalStyle1.storeprice,
                {
                  marginVertical: 205,
                  alignSelf: 'flex-end',
                },
              ]}>
              <Text style={[FONTS.body5, GlobalStyle1.storetext]}>+100 km</Text>
            </View>
          </ImageBackground>
        </View>
        <View>
          <ImageBackground
            source={{
              uri: 'https://thumbs.dreamstime.com/b/nail-salon-interior-as-creative-abstract-blur-background-pedicure-armchairs-modern-inside-beauty-studio-white-blue-140835941.jpg',
            }}
            style={GlobalStyle1.storeimage}>
            <Text
              style={[
                FONTS.h2,
                {
                  textAlign: 'center',
                  color: COLORS.black,
                },
              ]}>
              Salon and Message
            </Text>
          </ImageBackground>
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View
            style={[
              GlobalStyle1.OfferBOX,
              {
                marginTop: 10,
                marginStart: 10,
              },
            ]}>
            <AntDesign
              name="tags"
              size={18}
              color={COLORS.colorAccent}
              style={{
                position: 'absolute',
                marginStart: 15,
                marginVertical: 12,
              }}
            />
            <Text style={[FONTS.body5, GlobalStyle1.Offertext]}>OFFERS</Text>
          </View>
          <View
            style={[
              GlobalStyle1.ReviewsBox,
              {
                marginTop: 10,
              },
            ]}>
            <Feather
              name="message-square"
              size={18}
              color={COLORS.white}
              style={{
                position: 'absolute',
                marginStart: 15,
                marginVertical: 12,
              }}
            />
            <Text style={[FONTS.body5, GlobalStyle1.Reviewstext]}>REVIEWS</Text>
          </View>
          <View
            style={[
              GlobalStyle1.GalleryBOX,
              {
                marginTop: 10,
              },
            ]}>
            <MaterialCommunityIcons
              name="view-gallery-outline"
              size={18}
              color={COLORS.white}
              style={{
                position: 'absolute',
                marginStart: 15,
                marginVertical: 12,
              }}
            />
            <Text style={[FONTS.body5, GlobalStyle1.Gallerytext]}>GALLERY</Text>
          </View>
        </View>
        <View style={[GlobalStyle1.StoreBOX]}>
          <Image
            source={{
              uri: 'https://thumbs.dreamstime.com/b/nail-salon-interior-as-creative-abstract-blur-background-pedicure-armchairs-modern-inside-beauty-studio-white-blue-140835941.jpg',
            }}
            style={GlobalStyle1.Storeimages}
          />
          <Text
            style={[
              FONTS.body4,
              {
                marginStart: 85,
                color: COLORS.black,
                marginTop: -55,
              },
            ]}>
            MENS's HAIR CUT - $15
          </Text>
          <Text
            style={[
              FONTS.body5,
              {
                marginStart: 85,
                color: COLORS.darkgray,
                maxWidth: 255,
              },
            ]}>
            THIS IS A DUMMY DEALmen's hair cut..
          </Text>
          <View
            style={[
              GlobalStyle1.price_BOX,
              {
                marginTop: 10,
                marginRight: 10,
              },
            ]}>
            <Text style={[FONTS.body5, GlobalStyle1.priceText]}>AU$15.0</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View
            style={[
              GlobalStyle1.iconBOX,
              {
                marginTop: 10,
                marginStart: 10,
              },
            ]}>
            <FontAwesome
              name="phone"
              size={18}
              color={COLORS.white}
              style={{
                marginVertical: 12,
                alignSelf: 'center',
              }}
            />
          </View>
          <View
            style={[
              GlobalStyle1.iconBOX1,
              {
                marginTop: 10,
                marginHorizontal: 5,
              },
            ]}>
            <MaterialCommunityIcons
              name="directions"
              size={18}
              color={COLORS.white}
              style={{
                marginVertical: 10,
                alignSelf: 'center',
              }}
            />
          </View>
          <View
            style={[
              GlobalStyle1.iconBOX2,
              {
                marginTop: 10,
              },
            ]}>
            <FontAwesome
              name="heart-o"
              size={18}
              color={COLORS.white}
              style={{
                marginVertical: 10,
                alignSelf: 'center',
              }}
            />
          </View>
        </View>
        <View style={[GlobalStyle1.StoreBOX1]}>
          <Text
            style={[
              FONTS.h5,
              {
                marginStart: 20,
                color: COLORS.black,
                marginTop: 10,
              },
            ]}>
            HAIRSMITH UNISEX SALON
          </Text>
          <Text
            style={[
              FONTS.body5,
              {
                marginStart: 20,
                color: COLORS.darkgray,
              },
            ]}>
            HAIR SMITH HAIR AND BEAUTY SALON UNISEX SALON
          </Text>
        </View>
        <View
          style={[
            GlobalStyle1.StoreBOX2,
            {
              flexDirection: 'row',
            },
          ]}>
          <Ionicons
            name="md-location-sharp"
            size={18}
            color={COLORS.colorAccent}
            style={{
              marginTop: 20,
              marginStart: 22,
            }}
          />
          <Text
            style={[
              FONTS.body4,
              {
                marginStart: 10,
                color: COLORS.darkgray,
                marginTop: 15,
                maxWidth: 270,
              },
            ]}>
            11 Ascot Vale Rd, Flegmington VIC 3031, Australia
          </Text>
        </View>
        <ImageBackground
          source={{
            uri: 'https://png.pngtree.com/background/20221109/original/pngtree-city-map-gps-navigation-with-location-pin-markers-picture-image_1953527.jpg',
          }}
          style={GlobalStyle1.Locationimage}></ImageBackground>
      </SafeAreaView>
    </ScrollView>
  );
};

export default StoreDetails;
