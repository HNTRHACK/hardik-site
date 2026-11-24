// The six project pages. Facts come from MY PORTFOLIO/src/data/content.ts,
// hardik-world/src/content/projects.ts and the project READMEs.
import type { ImageMetadata } from 'astro';
import omenCover from '../assets/work/omen/multiplayer.png';
import omenDialogue from '../assets/work/omen/4-dialogue.png';
import omenQuote from '../assets/work/omen/pay-2-quote.png';
import omenLedger from '../assets/work/omen/merchant-ledger-fork.png';
import omenReceipt from '../assets/work/omen/pay-8-gasless-receipt-fork.png';
import chaiTitle from '../assets/work/chaipay/chai-nagar-title.png';
import chaiPaid from '../assets/work/chaipay/chai-nagar-paid.png';
import umangHome from '../assets/work/umang/home.png';
import umangOnboarding from '../assets/work/umang/onboarding.webp';
import umangEmployer from '../assets/work/umang/employer.webp';
import umangJobs from '../assets/work/umang/jobs.png';
import umangMobile from '../assets/work/umang/mobile-demo.png';

export interface Shot {
  src: ImageMetadata;
  alt: string;
  caption: string;
}

export interface Project {
  slug: string;
  title: string;
  headline: string;
  oneLiner: string;
  event: string;
  team: 'Solo' | 'Team';
  /** Short role for cards. */
  role: string;
  /** Who did what, for team projects. */
  credit?: string;
  stack: string[];
  year: string;
  links: { live?: string; github?: string };
  /** Real screenshot used on the card. Projects without one get a designed cover. */
  cover?: Shot;
  gallery: Shot[];
  problem: string[];
  built: string[];
  hard: string[];
  result: string[];
  /** What is demo or not real. */
  note?: string;
}

export const projects: Project[] = [
  {
    slug: 'omen',
    title: 'OMEN',
    headline: 'OMEN: The Last Block',
    oneLiner: 'A multiplayer story game with a real, gasless stablecoin checkout built in.',
    event: 'ETHGlobal Mumbai 2026',
    team: 'Solo',
    role: 'Solo: game, contracts, payment gateway, multiplayer',
    stack: ['JavaScript', 'Solidity', 'Node.js', 'Python', 'WebSockets', 'Whitechain (EVM)'],
    year: '2026',
    links: { live: 'https://omen-mauve.vercel.app', github: 'https://github.com/HNTRHACK/OMEN' },
    cover: { src: omenCover, alt: 'Two couriers standing in front of Maya’s tea stall in the village of Blockhaven, with a UPI QR sign beside the counter', caption: '' },
    gallery: [
      { src: omenDialogue, alt: 'KAI talking to Maya at her tea stall in Blockhaven', caption: 'Maya’s tea stall: a festival order has been “pending” since dawn.' },
      { src: omenQuote, alt: 'Checkout quote showing the INR amount, fee, rate and a safety check', caption: 'The quote: INR the merchant receives, the 0.75% fee, the live rate and a ₹0 network fee for the payer.' },
      { src: omenReceipt, alt: 'Paid receipt for ₹60 to Maya’s Chai Stall, showing the USDT paid, zero gas for the payer, the Whitechain transaction and a demo INR settlement label', caption: 'The receipt reads the payer’s USDT balance back from the chain and labels the INR side as a demo (local fork).' },
      { src: omenLedger, alt: 'Merchant ledger listing a confirmed payment with an explorer link', caption: 'Maya’s ledger on a second device chimes when the gateway verifies the payment (local fork).' },
    ],
    problem: [
      'You are KAI, a courier on a tiny planet. In the village of Blockhaven, Maya’s tea stall has a problem: a customer’s payment for forty cups of festival chai has been pending since dawn. You follow the receipt to Orin, the relay engineer, relight the plaza’s network lantern and carry his findings back to Maya.',
      'Inside that story sits a real checkout: scan the UPI QR on Maya’s sign and pay in Whitechain Sepolia test USDT with one wallet signature and no gas.',
    ],
    built: [
      'Everything, solo, at ETHGlobal Mumbai 2026: the three.js game, the Solidity checkout contract, the Node payment gateway and relayer, the Socket.IO multiplayer layer and the merchant ledger.',
      'The payer never sends a transaction. They sign one EIP-3009 ReceiveWithAuthorization for exactly the quoted USDT, made out to the checkout contract, with a nonce derived from the order itself. That signature can only settle that one order.',
      'Multiplayer runs on Socket.IO rooms joined by invite link. Remote couriers are interpolated 120 ms behind real time, and others see what you do (“Ravi paid Maya”) but never balances, amounts or addresses.',
    ],
    hard: [
      'Making a payment count exactly once. After the relayer submits the signature and pays the gas, the gateway reads the receipt back from Whitechain and checks the contract and the Paid event’s order, merchant, payer and amount before it calls anything paid.',
      'Being honest on screen. A UPI QR alone can’t put rupees into a bank account, so every screen that shows rupees says they are a quoted equivalent.',
    ],
    result: [
      '68 Node tests and 18 Solidity tests cover UPI attacks, money maths, every payment state and the gasless relay with real signatures.',
      'Gasless checkout and refunds were tested against the real test-USDT contract on a fork of live Whitechain Sepolia.',
    ],
    note: 'Payments use Whitechain Sepolia test USDT, which has no monetary value. The INR amount is a quoted demo: no rupees move, and OMEN never generates a bank receipt or payout reference.',
  },
  {
    slug: 'chaipay',
    title: 'ChaiPay',
    headline: 'ChaiPay',
    oneLiner: 'Scan any UPI QR, pay in USDT. The chai wala gets rupees.',
    event: 'ETHGlobal Mumbai 2026 · Whitechain + Chainlink CRE tracks',
    team: 'Solo',
    role: 'Solo: escrow, relayer, app, CRE workflow, 3D world',
    stack: ['Solidity', 'EIP-712', 'Node.js', 'Chainlink CRE', 'JavaScript', 'three.js'],
    year: '2026',
    links: { github: 'https://github.com/HNTRHACK/chaipay' },
    cover: { src: chaiTitle, alt: 'Chai Nagar title screen: a small hand-inked planet of stalls with a Start button', caption: '' },
    gallery: [
      { src: chaiTitle, alt: 'Chai Nagar title screen: a small hand-inked planet of stalls with a Start button', caption: 'Chai Nagar: walk around, buy chai, pay in USDT. The shop gets rupees.' },
      { src: chaiPaid, alt: 'A payment envelope flying between stalls in the Chai Nagar 3D world', caption: 'Each payment travels as an envelope from you to the escrow tower, the cash partner, then Raju’s stall.' },
    ],
    problem: [
      'India has 600M+ UPI users and every tea stall has a QR on the counter, yet people holding stablecoins still can’t buy a ₹20 chai with them.',
      'ChaiPay lets you scan the same UPI QR everyone already uses and approve the payment with no gas and no seed phrase. The shop receives rupees like any other UPI payment, and never needs to know crypto exists.',
    ],
    built: [
      'Built at ETHGlobal Mumbai 2026 for the Whitechain “Payments Nobody Notices” and Chainlink “Best workflow with CRE” tracks: the Solidity escrow contract, the gasless relayer, the phone app, the CRE verifier and the Chai Nagar 3D world.',
      'The payer signs an EIP-712 Pay intent and the relayer submits it, paying the gas. The USDT moves into escrow. A cash partner claims the order within a ten-minute window, pays the chai wala ₹20 over UPI and reports the payout reference.',
      'A Chainlink CRE workflow re-checks that payout on every DON node, reaches consensus on the order and the payout hash, and writes a signed report to the contract. Only then is the partner paid back, minus a 0.5% fee.',
    ],
    hard: [
      'Deciding who is allowed to be wrong. The relayer can’t move funds: amounts and payees are bound to the signature, replays revert, and every transaction is simulated first.',
      'Making sure nobody gets stuck. USDT reaches the partner only after a verified payout. If nobody claims in time, anyone can trigger a refund to the payer.',
    ],
    result: [
      'The contract is deployed and verified on Whitechain Sepolia, with its first USDT payment settled in the main flow.',
      '22 contract tests including a fuzz test, plus 6 CRE workflow tests on Chainlink’s own test runtime.',
    ],
    note: 'A prototype, not a licensed payment service. The stage demo trusts an allowlisted partner’s attested payout reference, and Whitechain isn’t a CRE network yet, so the verifier role is an oracle key running the same check.',
  },
  {
    slug: 'federated-clinical',
    title: 'Federated Clinical',
    headline: 'Federated Clinical Platform',
    oneLiner: 'Hospitals train models together, while patient data never leaves the hospital.',
    event: 'Team project',
    team: 'Team',
    role: 'Team · my part: the FL + differential privacy pipeline',
    credit: 'A team build with SohaKhare and teammates. I built the federated learning and differential privacy pipeline. The backend and dashboards are the team’s work.',
    stack: ['Python', 'PyTorch', 'Opacus', 'Node.js', 'Next.js', 'PostgreSQL'],
    year: '2026',
    links: { github: 'https://github.com/SohaKhare/federated-clinical-platform' },
    gallery: [],
    problem: [
      'Hospitals have the data to train useful clinical models but can’t pool patient records.',
      'In this platform each hospital runs a local node and keeps its data on-premise. A global node coordinates training rounds and only ever sees model parameters and aggregate metrics, never a patient row.',
    ],
    built: [
      'My part was the machine-learning side: FedAvg and DP-FedAvg aggregation with Opacus, the COVID-19 admission-time mortality model, per-hospital data partitioning and the pipeline’s tests.',
      'Each hospital trains locally with Opacus wrapping the PyTorch optimiser, so every sample’s gradient is clipped and noised before it can influence the shared model. The server averages the updates into the next global model and tracks the privacy budget each round.',
      'The COVID cohort is split per hospital, simulating 41 hospital nodes, so the federation sees the uneven, small local datasets real hospitals would have.',
    ],
    hard: [
      'The first DP-FedAvg runs looked fine on accuracy and were useless clinically: 90.6% accurate, and the model predicted no deaths at all.',
      'The audit traced it to Opacus clipping each sample’s gradient, which silently cancelled the class weighting meant to counter how rare deaths are in the data. Fixing that meant re-thinking the weighting and calibrating the decision threshold.',
    ],
    result: [
      'A working FedAvg and DP-FedAvg pipeline with per-hospital partitioning and tests for the COVID pipeline.',
      'A written root-cause analysis of why a 90.6%-accurate model was missing every death, and what it takes to fix it under differential privacy.',
    ],
  },
  {
    slug: 'umang',
    title: 'UMANG',
    headline: 'UMANG: Beyond the Waiting Line',
    oneLiner: 'A multilingual, audio-assisted job platform that brings work to skilled workers in Mumbai.',
    event: 'Hackathon prototype',
    team: 'Solo',
    role: 'Solo: product, design and build',
    stack: ['Next.js', 'TypeScript', 'PWA', 'GSAP', 'Lenis'],
    year: '2026',
    links: { live: 'https://umang-roan.vercel.app', github: 'https://github.com/HNTRHACK/Artemis26' },
    cover: { src: umangHome, alt: 'UMANG homepage reading “Beyond the waiting line” with Find work and Hire workers buttons', caption: '' },
    gallery: [
      { src: umangOnboarding, alt: 'Worker app onboarding: choose your language from English, Hindi and Marathi', caption: 'Worker onboarding starts with language, with read-aloud guidance.' },
      { src: umangJobs, alt: 'Jobs near you list with trade filters and read-aloud controls', caption: 'Jobs near you, sorted by distance, with read-aloud for every listing.' },
      { src: umangEmployer, alt: 'Employer app form asking who is hiring', caption: 'The employer side: post work with clear terms.' },
      { src: umangMobile, alt: 'UMANG presentation page with the live app inside a phone frame', caption: 'The live app runs inside a phone frame on the presentation page.' },
    ],
    problem: [
      'Skilled workers in Mumbai often find work by waiting at a naka, a street corner where contractors pick people up. UMANG flips that: work should find you.',
      'It’s a multilingual (English, हिन्दी, मराठी), audio-assisted job platform that connects masons, electricians and plumbers with nearby employers.',
    ],
    built: [
      'I designed and built the prototype: the homepage, the worker and employer apps, the hiring lifecycle, the PWA and the voice guidance.',
      'Every hire moves through an explicit lifecycle, from available through offered, accepted and confirmed to completed, with clear exits for declines and cancellations. Accepting is idempotent: one confirmed hire produces exactly one ticket, and the ticket keeps the accepted terms even if the listing changes later.',
      'Contact happens over channels people already use: WhatsApp, SMS and calls, with Indian numbers normalised. A hand-written service worker caches the app shell, with an offline fallback page.',
    ],
    hard: [
      'Making it usable for people who may not read English. Every screen has recorded guidance in three languages, clips play one at a time and never autoplay, and missing recordings fall back to a clearly labelled device voice.',
    ],
    result: ['A live, installable prototype covering the whole hiring flow from both sides.'],
    note: 'UMANG is an independent hackathon prototype. It is not affiliated with the Government of India’s UMANG app or any government agency. Data is stored only in your browser; there is no login or verification.',
  },
  {
    slug: 'orion',
    title: 'ORION',
    headline: 'ORION',
    oneLiner: 'AI traffic forecasting for Mumbai, with a map you actually want to look at.',
    event: 'BigD Datathon 2026',
    team: 'Team',
    role: 'Team · my part: the frontend',
    credit: 'A team entry at the BigD Datathon (repository by parthpalav). I led the frontend. The ML service is the team’s work.',
    stack: ['React', 'TypeScript', 'Three.js', 'Framer Motion', 'Mapbox', 'Python ML service'],
    year: '2026',
    links: { github: 'https://github.com/parthpalav/TrafficAnalyser_-Datathon_BigD' },
    gallery: [],
    problem: [
      'Mumbai’s traffic is predictable in hindsight. ORION forecasts it ahead of time and puts the prediction on a map.',
    ],
    built: [
      'As frontend lead I built the Three.js landing, the Mapbox map view, the client for the prediction service, the insights and timeline panels and search history.',
      'The landing sets the tone with a Three.js scene, then hands off to a Mapbox map where forecasts from the team’s Python ML service are drawn over the city.',
    ],
    hard: [
      'Making a forecast readable at a glance. Insights and timeline panels sit beside the map so a prediction is always read in context, and search history makes it easy to compare routes.',
    ],
    result: ['The frontend for the team’s datathon entry: landing, map view, prediction client and insight panels.'],
  },
  {
    slug: 'cobra-kai',
    title: 'COBRA KAI',
    headline: 'COBRA KAI: Quantitative Trading Intelligence',
    oneLiner: 'A quant trading dashboard where every metric traces back to real data.',
    event: 'Quant competition',
    team: 'Solo',
    role: 'Solo: data pipeline, build checks, dashboard',
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Recharts', 'Lightweight Charts'],
    year: '2026',
    links: { github: 'https://github.com/HNTRHACK/cobra-kai-dashboard' },
    gallery: [],
    problem: [
      'This dashboard tells the story of the GLACIER_GAS competition: market analysis, leakage-safe validation, a flash-crash regime, Round 3 signals, hypothetical backtests and public leaderboard results.',
      'The rule was that nothing on screen could be typed in by hand.',
    ],
    built: [
      'The data pipeline from the quant project’s files, the build-time integrity checks and the fully static Next.js dashboard.',
      'A Python script exports sanitised data, and the dashboard reads and schema-validates it at build time. Counts, exposure and turnover are recomputed from the submission CSVs on every build.',
      'Backtests run on historical, out-of-sample days only and are labelled hypothetical, with assumed costs.',
    ],
    hard: [
      'Keeping the numbers honest. Hidden-window values must be null or the build fails, and the TypeScript backtest engine has to match the Python one before the build passes.',
      'Each number carries a tag naming its source, and reported scores are marked unverified.',
    ],
    result: ['A fully static dashboard where every metric is either recomputed from data or labelled by source.'],
  },
];
