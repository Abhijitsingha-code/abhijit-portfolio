import { useState, useRef } from 'react';
import * as LucideIcons from 'lucide-react';
import {
  Send,
  Loader2,
  Mail,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Clock,
  Globe,
  Link2,
  BookOpen,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import type { ContactPageData } from '../../types';

interface ContactProps {
  email?: string;
  pageData?: ContactPageData;
}

// Local brand icons not available in Lucide or version 1.8.0 of lucide-react
const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg role="img" viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const LinkedinIcon = ({ size = 18 }: { size?: number }) => (
  <svg role="img" viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
  </svg>
);

const TwitterIcon = ({ size = 18 }: { size?: number }) => (
  <svg role="img" viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg role="img" viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M12 0C8.74 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.74 0 12s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.978 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.26-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.26 0 12 0zm0 5.838a6.162 6.162 0 1 1 0 12.324 6.162 6.162 0 0 1 0-12.324zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

const YoutubeIcon = ({ size = 18 }: { size?: number }) => (
  <svg role="img" viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.107C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.388.511a3.002 3.002 0 0 0-2.11 2.107C0 8.053 0 12 0 12s0 3.947.502 5.837a3.003 3.003 0 0 0 2.11 2.107c1.883.511 9.388.511 9.388.511s7.505 0 9.388-.511a3.003 3.003 0 0 0 2.11-2.107c.502-1.89.502-5.837.502-5.837s0-3.947-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const FacebookIcon = ({ size = 18 }: { size?: number }) => (
  <svg role="img" viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const DribbbleIcon = ({ size = 18 }: { size?: number }) => (
  <svg role="img" viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-12.523c-.242-.427-2.617-4.58-7.3-6.147-.208-.073-.414-.143-.623-.21a28.06 28.06 0 0 0-2.286 4.646c3.072 1.05 4.318 3.013 4.417 3.178.1.168.082.38-.043.53a.473.473 0 0 1-.378.188c-.046 0-.092-.006-.137-.02-2.18-.868-4.707-1.127-7.513-.77a21.436 21.436 0 0 0-4.008 5.76c2.477 1.373 5.4 2.112 8.448 2.05a11.583 11.583 0 0 0 8.01-3.2c.238-.255.45-.526.653-.807.037-.053.284-.4.81-2.905.024-.112.012-.23-.035-.333zM1.866 12.54a10.233 10.233 0 0 0 2.215 5.565 19.346 19.346 0 0 1 3.518-5.3c-.042-.09-.082-.18-.124-.268C5.234 11.234 2.502 11.968 2 12.116a.458.458 0 0 0-.256.17c-.07.073-.105.166-.105.254zm17.91-4.883a26.117 26.117 0 0 0-1.89-3.79 10.3 10.3 0 0 0-5.334-1.928 29.878 29.878 0 0 1 2.373 4.966c1.644.258 3.59.855 4.85 2.752zm-12.72-4.01C8.242 2.383 9.68 2.008 11.196 2c-.173 1.258-.5 3.3-.96 5.86-2.196-1.077-3.136-3.415-3.18-3.523a.473.473 0 0 1 .054-.482.474.474 0 0 1 .446-.205zm-4.733 4.825a.475.475 0 0 1 .124-.46c.15-.145.367-.2.576-.145 2.748.717 5.09.07 6.993-.32a29.845 29.845 0 0 0 .9-5.11 10.224 10.224 0 0 0-8.593 6.035zM12 22.06c-1.96 0-3.812-.55-5.394-1.503a20.088 20.088 0 0 1 3.507-5.12 28.51 28.51 0 0 0 7.234.827c-.208.835-.49 1.637-.84 2.39a10.22 10.22 0 0 1-4.507 3.407z" />
  </svg>
);

const ChromeIcon = ({ size = 18 }: { size?: number }) => (
  <svg role="img" viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M12 0C8.21 0 4.89 1.77 2.77 4.5L7.84 13.27C8.1 11.49 9.07 9.93 10.5 9c1.43-.93 3.16-1.12 4.74-.53l4.31-7.46C17.43.68 14.82 0 12 0zm0 24c5.07 0 9.47-3.14 11.3-7.58l-5.07-8.77c.43 1.74.07 3.59-.97 5.06-1.04 1.48-2.67 2.4-4.47 2.5l-2.73 7.82c.62.06 1.27.09 1.94.09l9.36-.08-9.36.08zm-9.3-5.28c1.55 2.68 4.14 4.54 7.15 5.11l5.07-8.78c-1.39.45-2.92.29-4.2-.45-1.28-.74-2.18-1.97-2.48-3.41l-7.84 2.27c.46 2.11 1.25 3.99 2.3 5.26zM12 8.25c2.07 0 3.75 1.68 3.75 3.75S14.07 15.75 12 15.75 8.25 14.07 8.25 12 9.93 8.25 12 8.25z" />
  </svg>
);

// Custom brand icons not available in Lucide
const LeetCodeIcon = ({ size = 18 }: { size?: number }) => (
  <svg role="img" viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414 0-1.954l-2.396-2.392c-2.21-2.207-5.815-2.239-8.063-.074l-.039.038-4.277-4.193a5.938 5.938 0 0 1-1.271-1.818 5.83 5.83 0 0 1-.349-1.017 5.527 5.527 0 0 1-.062-2.362 5.35 5.35 0 0 1 .125-.513 5.266 5.266 0 0 1 1.209-2.104l3.854-4.126 6.367-5.788a1.374 1.374 0 0 0 .961-.438h6.242l-2.28 2.28c-1.573 1.571-1.573 4.118 0 5.688l2.28 2.28H13.483z" />
  </svg>
);

const CodeforcesIcon = ({ size = 18 }: { size?: number }) => (
  <svg role="img" viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M4.5 7.5A1.5 1.5 0 0 1 6 9v10.5A1.5 1.5 0 0 1 4.5 21h-3C.673 21 0 20.328 0 19.5V9c0-.828.673-1.5 1.5-1.5h3zm9-4.5A1.5 1.5 0 0 1 15 4.5v15a1.5 1.5 0 0 1-1.5 1.5h-3c-.827 0-1.5-.672-1.5-1.5v-15c0-.828.673-1.5 1.5-1.5h3zm9 7.5A1.5 1.5 0 0 1 24 12v7.5a1.5 1.5 0 0 1-1.5 1.5h-3c-.827 0-1.5-.672-1.5-1.5V12c0-.828.673-1.5 1.5-1.5h3z" />
  </svg>
);

const HackerRankIcon = ({ size = 18 }: { size?: number }) => (
  <svg role="img" viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M0 0v24h24V0zm9.95 8.002h1.805c.061 0 .111.05.111.111v7.767c0 .061-.05.111-.11.111H9.95c-.061 0-.111-.05-.111-.11v-2.87H7.894v2.87c0 .06-.05.11-.11.11H5.976a.11.11 0 01-.11-.11V8.112c0-.06.05-.11.11-.11h1.806c.061 0 .11.05.11.11v2.869H9.84v-2.87c0-.06.05-.11.11-.11zm2.999 0h5.778c.061 0 .111.05.111.11v7.767a.11.11 0 01-.11.112h-5.78a.11.11 0 01-.11-.11V8.111c0-.06.05-.11.11-.11z" />
  </svg>
);

const CodeChefIcon = ({ size = 18 }: { size?: number }) => (
  <svg role="img" viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M11.2574.0039c-.37.0101-.7353.041-1.1003.095C9.6164.153 9.0766.4236 8.482.694c-.757.3244-1.5147.6486-2.2176.7027-1.1896.3785-1.568.919-1.8925 1.3516 0 .054-.054.1079-.054.1079-.4325.865-.4873 1.73-.325 2.5952.1621.5407.3786 1.0282.5408 1.5148.3785 1.0274.7578 2.0007.92 3.1362.1622.3244.3235.7571.4316 1.1897.2704.8651.542 1.8383 1.353 2.5952l.0057-.0028c.0175.0183.0301.0387.0482.0568.0072-.0036.0141-.0063.0213-.0099l-.0213-.5849c.6489-.9733 1.5673-1.6221 2.865-1.8925.5195-.1093 1.081-.1497 1.6625-.1278a8.7733 8.7733 0 0 1 1.7988.2357c1.4599.3785 2.595 1.1358 2.6492 1.7846.0273.3549.0398.6952.0326 1.0364-.001.064-.0046.1285-.007.193l.1362.0682c.075-.0375.1424-.107.2059-.1902.0008-.001.002-.002.0028-.0028.0018-.0023.0039-.0061.0057-.0085.0396-.0536.0747-.1236.1107-.1931.0188-.0377.0372-.0866.0554-.1292.2048-.4622.362-1.1536.538-1.9635.0541-.2703.1092-.4864.1633-.7027.4326-.9733 1.0266-1.8382 1.6213-2.6492.9733-1.3518 1.8928-2.5962 1.7846-4.0561-1.784-3.4608-4.2718-4.0017-5.5695-4.272-.2163-.0541-.3233-.0539-.4856-.108-1.3382-.2433-2.4945-.3953-3.6046-.3648zm5.0428 14.3788a9.8602 9.8602 0 0 0-.0326-.9824c-.0541-.703-1.1892-1.46-2.7032-1.8386-.588-.1336-1.1764-.2142-1.7448-.2356-.539-.0137-1.0657.0248-1.5546.1277-1.2436.2704-2.2162.9193-2.811 1.8925l.0511 1.431c.6672-.3558 1.7326-.8747 3.139-.9994.0662-.0059.1368-.0059.2044-.0099.1177-.013.2667-.044.4444-.044 1.6075 0 3.2682.5336 4.8767 1.6483.039-.2744.0611-.549.071-.8234l.044.0227c.0028-.0622.0143-.1268.0156-.1888zM11.256.0578c.1239-.0034.2538.01.379.0114-.23-.0022-.4588.0026-.6871.0156.103-.0061.2046-.0242.308-.027zm.4983.0156c.6552.014 1.3255.0711 2.0387.1803-.6834-.0987-1.3646-.1671-2.0387-.1803zm-1.3147.0554c-.076.0087-.1527.0133-.2285.0241-.8168.1167-1.7742.7015-2.75 1.045.3545-.1323.7143-.2957 1.0747-.4501C9.0765.4774 9.6705.207 10.1571.1529c.0939-.0139.1886-.0133.2825-.0241zm-.2285.24c.1622 0 .3787-.0002.5409.0539-.1425-.0357-.2595-.026-.3706-.0142a1.174 1.174 0 0 1 .3166.0681c.5796 1.0012-.4264 5.2791-.6786 8.1492.1559 1.0276.3138 1.9963.4628 2.7201-.7029-1.7843-1.4067-4.921-1.5148-7.354-.054-.9733.001-1.8386.2172-2.4874C9.401.8557 9.7244.4228 10.2111.3687zm3.1361.271c-.811 2.1088-.9184 6.1092-.9725 7.3528-.054.5407-.0001 1.73.054 2.5952 0 .2163.054.4325.054.6488 0-.2163-.054-.3786-.054-.5948-.4326-3.2442-.974-7.1362.9185-10.002zm3.352.3777c-.2704 2.1628-1.4047 3.191-1.7832 5.2998-.1081 1.6762-.325 3.6222-.379 5.2984-.0541-1.6762-.0007-3.4601.2697-5.2444.2703-1.8384.8651-3.6776 1.8925-5.3538zm-10.381.433c-.3581.1194-.632.248-.8575.3805.2317-.1358.4996-.2666.8575-.3805zm.2101.1974c.2155.0025.4384.0734.6006.2357-.0067-.004-.0078-.0033-.0142-.0071.1331.0929.2666.2093.3932.3847-.2036.9673.2553 3.0317.0398 4.6694.0763 1.5485.0717 3.1804.849 4.4594-.9796-1.5107-1.176-3.4375-1.3218-5.236-.1128-1.0907-.2035-2.0969-.4642-2.9033-.144-.3047-.2684-.5745-.3833-.822-.0247-.0369-.0447-.0784-.071-.1135-.1082-.1082-.1619-.2696-.1619-.3777 0-.054.0539-.1618.108-.1618.054-.0541.1616-.0553.2157-.1094a1.013 1.013 0 0 1 .2101-.0184zm-1.3459.6133c-.0604.0201-.0923.041-.1405.061.1768-.034.3617.0339.5196.318-.1877.8916.4364 3.3685.4288 5.104.3124 1.8478.5496 3.8498 1.5716 5.1152C6.3723 11.5076 5.886 9.1286 5.5076 7.128 5.183 5.56 4.9125 4.2086 4.3718 3.776c-.054-.1081-.1079-.163-.1079-.2711 0-.1622-.0002-.3786.1079-.5949-.2772.6337-.4047 1.2673-.3706 1.901-.0445-.6487.0857-1.2905.3706-1.901 0-.054.054-.0538.054-.1079.012-.016.0314-.0349.044-.0511.0618-.0983.1308-.189.2257-.257.0557-.0615.0965-.1191.159-.1817-.0526.0555-.0872.1092-.1335.1647.0273-.018.0523-.0368.0838-.0525.1081-.1082.2154-.1633.3776-.1633zm-.3776.1633c-.0038.0075-.0076.0111-.0114.0184.0125-.0099.0242-.0208.037-.0298-.0074.0037-.0182.0077-.0256.0114zm14.7608 1.1343c-.0017.0052-.004.0104-.0057.0156.0378-.005.0751-.0173.1135-.0156-.0378-.0022-.0763.0103-.115.0199-.8634 2.6418-1.8874 5.2844-2.9118 7.9262a.0184.0184 0 0 1-.0015.0028c-.0874.4652-.234.8842-.5395 1.1898.4326-.4867.4854-1.1907.5395-2.0558.054-.811.0544-1.6761.487-2.5413 0-.0531.0012-.1058.0525-.159.0003-.0009.0012-.0019.0015-.0028.0973-.3524.202-.6885.3166-1.018.4183-1.2896 1.1396-3.1653 2.0131-3.3405.0163-.0052.034-.018.0497-.0213zM8.3726 16.2113l-.3238.1079c.1623.2163.2696.379.3777.433.1081.054.2168.108.379.108.0541 0 .1618 0 .2159-.054l.812-.2698c.0541 0 .1078-.054.1619-.054.1081 0 .1616 0 .2697.054l.2712.2698.2697-.054c-.1081-.1622-.2695-.3236-.3776-.3776-.1082-.0541-.2169-.1094-.379-.1094h-.108l-.866.3252h-.1618c-.1082 0-.2157 0-.2698-.054-.054-.054-.163-.1629-.2712-.3251zm-2.5953.541c-.2703.1621-.649.4324-1.1897.6487-.5407.2163-.9734.4325-1.1897.6488-.2163.2163-.3237.4326-.3237.6488 0 .1082.0537.1632.1618.2172.054.0541.1632.0539.2172.108.757.3244 1.5133.7019 2.2162 1.0803.1082.0541.2171.1632.2712.2173.054.054.1078.054.1618.054.1082 0 .2695-.0538.3777-.162.1081-.108.1632-.217.1632-.325 0-.1082-.055-.1618-.1632-.2158 0 0-.4328-.2165-1.1898-.541-.4866-.2162-.9179-.4326-1.1883-.5948.1623-.2704.486-.4865.9726-.7028.5407-.2163.9196-.4326 1.0818-.5948.054-.0541.054-.1078.054-.1619 0-.054-.0539-.1631-.108-.2172-.054-.054-.163-.1079-.2711-.1079zm11.247 0c-.054 0-.1618.0537-.2158.1078-.0541.1081-.1093.1632-.1093.2172v.054c.1622.1622.3797.2695.7041.3776.2704.054.5403.1632.8107.2172.3244.1082.5407.2693.6488.4856v.0553c0 .0541-.1088.1616-.3251.2698-.1082.054-.3245.2167-.5949.433-.2703.1622-.4326.3236-.5948.3776-.2163.1082-.3776.217-.4316.3252-.0541.054-.054.1077-.054.1618 0 .1081.0539.1077.108.2158.054.1081.1616.1093.2157.1093.054 0 .1078-.0554.1619-.0554.2703-.1622.6492-.3782 1.0818-.7567.4866-.3784.8655-.6484 1.0818-.8106.2163-.1082.3237-.2169.3237-.379 0-.0541.0002-.1618-.1079-.2159-.3785-.4325-.9185-.7022-1.5674-.9185-.1081-.0541-.2704-.1092-.5948-.1633-.1622-.054-.3249-.1079-.433-.1079zm-2.9743.8106c-.2704 0-.4866.055-.6488.2172-.2163.1622-.2699.4323-.2158.7567 0 .2703.1075.4865.2697.7027.1622.2163.3786.3252.5949.3252.1622 0 .2708-.0553.433-.1094.2703-.1622.379-.4319.379-.9185 0-.3785-.109-.6485-.2711-.8107-.1622-.1081-.3246-.1632-.541-.1632zm-4.4877.054c-.2704 0-.4866.055-.6488.2171-.2163.1622-.27.4323-.2158.7567 0 .2704.1075.4865.2697.7028s.3786.3251.5949.3251c.1622 0 .2708-.0552.433-.1093.2703-.1622.3776-.432.3776-.9186 0-.4325-.1075-.7025-.2697-.8106-.1622-.1082-.3247-.1633-.541-.1633zm0 .6501c.1622 0 .2711.1076.2711.2698 0 .1622-.163.2697-.2711.2697-.1622 0-.2698-.1075-.2698-.2697s.1076-.2698.2698-.2698zm4.3798.054c.1622 0 .2711.1075.2711.2697 0 .1082-.109.2698-.2711.2698-.1622 0-.2698-.1076-.2698-.2698 0-.1622.1076-.2697.2698-.2697zm-2.7032 2.1083l.1619.3237c.054.1081.1076.163.2158.2711.054.054.163.1619.2712.1619h.1078c.1082 0 .1618 0 .2158-.054.0541-.054.1632-.0538.2173-.1079l.1618-.1618c.054-.054.108-.1092.108-.1633.054-.054.0537-.1078.1078-.1618 0-.0541.054-.108.054-.108-.0541.1082-.1618.2156-.2158.3238-.1082.054-.1636.1632-.2698.1632-.1081.0541-.217.054-.3251.054s-.2157.0001-.2697-.054c-.1082 0-.1632-.0538-.2173-.1079l-.1618-.1632c-.054-.0541-.1078-.1618-.1619-.2158zm-.866 1.0278c-1.1355 0-1.8377 1.5136-3.4598.1619-.4326 2.6494 2.7583 2.866 4.11 1.7306.9192-.811.6475-1.9465-.6502-1.8925zm2.8664 0c-1.2977-.054-1.568 1.0815-.6488 1.8925 1.3518 1.1355 4.5412.9188 4.1087-1.7306-1.6221 1.3517-2.2703-.1619-3.4599-.1619z" />
  </svg>
);

const GeeksforGeeksIcon = ({ size = 18 }: { size?: number }) => (
  <svg role="img" viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M21.45 14.315c-.143.28-.334.532-.565.745a3.691 3.691 0 0 1-1.104.695 4.51 4.51 0 0 1-3.116-.016 3.79 3.79 0 0 1-2.135-2.078 3.571 3.571 0 0 1-.13-.353h7.418a4.26 4.26 0 0 1-.368 1.008zm-11.99-.654a3.793 3.793 0 0 1-2.134 2.078 4.51 4.51 0 0 1-3.117.016 3.7 3.7 0 0 1-1.104-.695 2.652 2.652 0 0 1-.564-.745 4.221 4.221 0 0 1-.368-1.006H9.59c-.038.12-.08.238-.13.352zm14.501-1.758a3.849 3.849 0 0 0-.082-.475l-9.634-.008a3.932 3.932 0 0 1 1.143-2.348c.363-.35.79-.625 1.26-.809a3.97 3.97 0 0 1 4.484.957l1.521-1.49a5.7 5.7 0 0 0-1.922-1.357 6.283 6.283 0 0 0-2.544-.49 6.35 6.35 0 0 0-2.405.457 6.007 6.007 0 0 0-1.963 1.276 6.142 6.142 0 0 0-1.325 1.94 5.862 5.862 0 0 0-.466 1.864h-.063a5.857 5.857 0 0 0-.467-1.865 6.13 6.13 0 0 0-1.325-1.939A6 6 0 0 0 8.21 6.34a6.698 6.698 0 0 0-4.949.031A5.708 5.708 0 0 0 1.34 7.73l1.52 1.49a4.166 4.166 0 0 1 4.484-.958c.47.184.898.46 1.26.81.368.36.66.792.859 1.268.146.344.242.708.285 1.08l-9.635.008A4.714 4.714 0 0 0 0 12.457a6.493 6.493 0 0 0 .345 2.127 4.927 4.927 0 0 0 1.08 1.783c.528.56 1.17 1 1.88 1.293a6.454 6.454 0 0 0 2.504.457c.824.005 1.64-.15 2.404-.457a5.986 5.986 0 0 0 1.964-1.277 6.116 6.116 0 0 0 1.686-3.076h.273a6.13 6.13 0 0 0 1.686 3.077 5.99 5.99 0 0 0 1.964 1.276 6.345 6.345 0 0 0 2.405.457 6.45 6.45 0 0 0 2.502-.457 5.42 5.42 0 0 0 1.882-1.293 4.928 4.928 0 0 0 1.08-1.783A6.52 6.52 0 0 0 24 12.457a4.757 4.757 0 0 0-.039-.554z" />
  </svg>
);

const HackerEarthIcon = ({ size = 18 }: { size?: number }) => (
  <svg role="img" viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M18.447 20.936H5.553V19.66h12.894zM20.973 0H9.511v6.51h.104c.986-1.276 2.206-1.4 3.538-1.306 1.967.117 3.89 1.346 4.017 5.169v7.322c0 .089-.05.177-.138.177h-2.29c-.09 0-.253-.082-.253-.177V10.6c0-1.783-.58-3.115-2.341-3.115-1.282 0-2.637.892-2.637 2.77v7.417c0 .089-.008.072-.102.072h-2.29c-.09 0-.29.022-.29-.072V0H3.178c-.843 0-1.581.673-1.581 1.515v20.996c0 .843.738 1.489 1.58 1.489h17.797c.843 0 1.431-.646 1.431-1.489V1.515c0-.842-.588-1.515-1.43-1.515" />
  </svg>
);

const CustomSvgIcon = ({ svgContent, size = 18 }: { svgContent: string; size?: number }) => (
  <div
    style={{
      width: `${size}px`,
      height: `${size}px`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'currentColor'
    }}
    className="custom-svg-icon"
    dangerouslySetInnerHTML={{ __html: svgContent }}
  />
);

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  twitter: TwitterIcon,
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
  facebook: FacebookIcon,
  mail: Mail,
  email: Mail,
  globe: Globe,
  website: Globe,
  link: Link2,
  link2: Link2,
  dribbble: DribbbleIcon,
  chrome: ChromeIcon,
  blog: BookOpen,
  medium: BookOpen,
  resume: FileText,
  cv: FileText,
  leetcode: LeetCodeIcon,
  codeforces: CodeforcesIcon,
  hackerrank: HackerRankIcon,
  codechef: CodeChefIcon,
  geeksforgeeks: GeeksforGeeksIcon,
  hackerearth: HackerEarthIcon,
};

const getIcon = (name?: string) => {
  if (!name) return Link2;
  const lower = name.toLowerCase();

  if (ICON_MAP[lower]) {
    return ICON_MAP[lower];
  }

  // Fallback to namespace if we didn't statically map it
  const lucideAny = LucideIcons as any;
  if (lucideAny[name]) {
    return lucideAny[name];
  }

  // Try case-insensitive lookup in namespace
  const matchedKey = Object.keys(LucideIcons).find(
    (k) => k.toLowerCase() === lower
  );
  if (matchedKey && lucideAny[matchedKey]) {
    return lucideAny[matchedKey];
  }

  return Link2;
};

export function Contact({ email, pageData }: ContactProps) {
  const form = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error('EmailJS configuration is missing.');
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formState.name,
          from_email: formState.email,
          user_name: formState.name,
          user_email: formState.email,
          message: formState.message,
          to_name: 'Abhijit',
          reply_to: formState.email,
        },
        publicKey
      );
      setSubmitStatus('success');
      setFormState({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const eyebrow = pageData?.eyebrow || 'Contact';
  const title = pageData?.title || "Let's <span class=\"text-gradient-primary\">Build</span> Something";
  const description = pageData?.description || "Have a project in mind, or just want to say hi? I'm always open to new opportunities and conversations.";
  const location = pageData?.location || 'India · Remote';
  const responseTime = pageData?.responseTime || 'Within 24 hours';
  const socialLinks = pageData?.socialLinks;

  return (
    <section id="contact" className="section container">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        style={{ minWidth: '850px', maxWidth: '850px', margin: '0 auto 3rem' }}
      >
        <div className="section-eyebrow">{eyebrow}</div>
        <h2
          style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', marginBottom: '0.8rem', fontFamily: 'var(--font-display)' }}
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '540px', lineHeight: 1.7 }}>
          {description}
        </p>
      </motion.div>

      <div
        style={{
          maxWidth: '820px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.6fr)',
          gap: '2rem',
          alignItems: 'start',
        }}
      >
        {/* ---- Left Panel: Info ---- */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          {/* Contact info cards */}
          {[
            {
              icon: Mail,
              label: 'Email',
              value: email || 'hi@abhijitsingha.dev',
              href: `mailto:${email || 'hi@abhijitsingha.dev'}`,
              color: '#60a5fa',
              bg: 'rgba(96, 165, 250, 0.08)',
            },
            {
              icon: MapPin,
              label: 'Location',
              value: location,
              color: '#f472b6',
              bg: 'rgba(244, 114, 182, 0.08)',
            },
            {
              icon: Clock,
              label: 'Response Time',
              value: responseTime,
              color: '#34d399',
              bg: 'rgba(52, 211, 153, 0.08)',
            },
          ].map(({ icon: Icon, label, value, href, color, bg }) => (
            <div
              key={label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem 1.2rem',
                background: bg,
                border: `1px solid ${color}22`,
                borderRadius: '14px',
                cursor: href ? 'pointer' : 'default',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              {...(href ? { as: 'a', onClick: () => window.open(href) } : {})}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: `${color}18`,
                  border: `1px solid ${color}30`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color,
                  flexShrink: 0,
                }}
              >
                <Icon size={17} />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '2px' }}>
                  {label}
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 500 }}>{value}</div>
              </div>
            </div>
          ))}

          {/* Social links */}
          <div style={{ marginTop: '0.5rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Find me on
            </div>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              {socialLinks?.map(({ label, iconName, iconSvg, href, color }) => {
                const Icon = getIcon(iconName);
                return (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '11px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: 'var(--text-muted)',
                      textDecoration: 'none',
                      transition: 'all 0.22s ease',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = color || 'var(--primary)';
                      (e.currentTarget as HTMLElement).style.background = `${color || 'var(--primary)'}14`;
                      (e.currentTarget as HTMLElement).style.borderColor = `${color || 'var(--primary)'}35`;
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)';
                      (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                    }}
                  >
                    {iconSvg ? (
                      <CustomSvgIcon svgContent={iconSvg} size={18} />
                    ) : (
                      <Icon size={18} />
                    )}
                  </a>
                );
              })}
            </div>
          </div>
        </motion.aside>

        {/* ---- Right Panel: Form ---- */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '20px',
            padding: '2rem',
          }}
        >
          <AnimatePresence mode="wait">
            {submitStatus === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                style={{ textAlign: 'center', padding: '2rem 0' }}
              >
                <div
                  style={{
                    width: '68px',
                    height: '68px',
                    background: 'rgba(16, 217, 160, 0.1)',
                    border: '1px solid rgba(16, 217, 160, 0.25)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                    color: 'var(--accent-green)',
                  }}
                >
                  <CheckCircle2 size={34} />
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', fontFamily: 'var(--font-display)' }}>
                  Message Sent! 🎉
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                  Thanks for reaching out. I'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className="btn btn-secondary"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleContactSubmit}
                ref={form}
                style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.85rem', letterSpacing: '0.01em' }}
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="user_name"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.85rem', letterSpacing: '0.01em' }}
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="user_email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.85rem', letterSpacing: '0.01em' }}
                  >
                    Your Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell me about your project, idea, or just say hi…"
                    style={{ resize: 'vertical' }}
                  />
                </div>

                {/* Error state */}
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      padding: '0.9rem 1.1rem',
                      background: 'rgba(239, 68, 68, 0.08)',
                      color: '#f87171',
                      borderRadius: '10px',
                      border: '1px solid rgba(239, 68, 68, 0.2)',
                      fontSize: '0.9rem',
                    }}
                  >
                    <AlertCircle size={16} />
                    Failed to send. Please check your EmailJS config or try again.
                  </motion.div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', padding: '13px', fontSize: '0.95rem', marginTop: '0.25rem' }}
                >
                  {isSubmitting ? (
                    <><Loader2 size={18} className="animate-spin" /> Sending…</>
                  ) : (
                    <><Send size={18} /> Send Message</>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
