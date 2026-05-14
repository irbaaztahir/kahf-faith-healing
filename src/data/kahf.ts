import therapist1 from "@/assets/therapist-1.jpg";
import therapist2 from "@/assets/therapist-2.jpg";
import therapist3 from "@/assets/therapist-3.jpg";
import therapist4 from "@/assets/therapist-4.jpg";
import therapist5 from "@/assets/therapist-5.jpg";
import therapist6 from "@/assets/therapist-6.jpg";

export type Therapist = {
  id: string;
  name: string;
  credentials: string;
  photo: string;
  specialties: string[];
  languages: string[];
  rating: number;
  reviews: number;
  nextSlot: string;
  price: number;
  gender: "female" | "male";
  bio: string;
  approach: string;
  formats: string[];
  kahfPick?: boolean;
  experience?: string;
  availability?: string;
};

export const therapists: Therapist[] = [
  {
    id: "amina-yusuf",
    name: "Dr. Amina Yusuf",
    credentials: "PsyD, Licensed Clinical Psychologist",
    photo: therapist1,
    specialties: ["Anxiety", "Identity", "Young adults"],
    languages: ["English", "Arabic"],
    rating: 4.9,
    reviews: 142,
    nextSlot: "Tomorrow, 10:00",
    price: 85,
    gender: "female",
    bio: "I work gently with women navigating anxiety, identity, and the in-between spaces of faith and modern life.",
    approach: "Integrative, trauma-informed CBT with Islamic psychology grounding.",
    formats: ["Video", "Chat"],
    kahfPick: true,
  },
  {
    id: "omar-rahman",
    name: "Omar Rahman, LMFT",
    credentials: "Licensed Marriage & Family Therapist",
    photo: therapist2,
    specialties: ["Relationships", "Family conflict", "Men's wellness"],
    languages: ["English", "Urdu"],
    rating: 4.8,
    reviews: 98,
    nextSlot: "Thu, 18:30",
    price: 95,
    gender: "male",
    bio: "I help couples and individuals untangle the patterns that quietly run our closest relationships.",
    approach: "Emotionally Focused Therapy with a values-based, faith-sensitive lens.",
    formats: ["Video", "Voice"],
  },
  {
    id: "leila-haddad",
    name: "Leila Haddad, MA",
    credentials: "Counselling Psychologist",
    photo: therapist3,
    specialties: ["Grief", "Depression", "Motherhood"],
    languages: ["English", "French", "Arabic"],
    rating: 5.0,
    reviews: 211,
    nextSlot: "Today, 20:00",
    price: 110,
    gender: "female",
    bio: "Grief reshapes us. I sit with women in seasons of loss, depression, and quiet motherhood weariness.",
    approach: "Person-centered, somatic, and rooted in Islamic spiritual care.",
    formats: ["Video", "Chat", "Voice"],
  },
  {
    id: "amina-khalid",
    name: "Dr. Amina Khalid",
    credentials: "PhD, Clinical Psychologist",
    photo: therapist4,
    specialties: ["Anxiety", "Depression", "Postpartum"],
    languages: ["English", "Arabic", "Urdu"],
    rating: 4.9,
    reviews: 87,
    nextSlot: "Mon, 09:00",
    price: 95,
    gender: "female",
    experience: "9 years",
    availability: "Mon–Thu, mornings & evenings (GMT)",
    bio: "Dr. Amina brings warmth, patience, and deep cultural understanding to every session. Having grown up between two cultures, she deeply understands the unique pressures faced by Muslim women navigating modern life and faith simultaneously.",
    approach: "Cognitive Behavioural Therapy (CBT) integrated with Islamic mindfulness and tawakkul-based reframing.",
    formats: ["Video", "Chat"],
  },
  {
    id: "tariq-hussain",
    name: "Ustadh Tariq Hussain",
    credentials: "MA Marriage & Family Therapy",
    photo: therapist2,
    specialties: ["Marriage", "Family", "Co-parenting"],
    languages: ["English", "Urdu", "Punjabi"],
    rating: 5.0,
    reviews: 134,
    nextSlot: "Tue, 19:00",
    price: 110,
    gender: "male",
    experience: "12 years",
    availability: "Tue, Wed, Fri, evenings (GMT+5)",
    bio: "Ustadh Tariq combines clinical training with deep Islamic scholarship, bringing a rare duality to marriage and family therapy. He has supported hundreds of Muslim couples in navigating conflict, rebuilding trust, and strengthening their bonds through both therapeutic and Islamic frameworks.",
    approach: "Systemic family therapy integrated with Islamic marital guidance and conflict resolution.",
    formats: ["Video", "Voice"],
  },
  {
    id: "fatima-alrashid",
    name: "Dr. Fatima Al-Rashid",
    credentials: "PsyD, EMDR Certified",
    photo: therapist3,
    specialties: ["Grief", "Trauma", "Bereavement"],
    languages: ["English", "Arabic", "French"],
    rating: 4.9,
    reviews: 76,
    nextSlot: "Wed, 14:00",
    price: 85,
    gender: "female",
    experience: "7 years",
    availability: "Mon, Wed, Thu, flexible (GMT)",
    bio: "Dr. Fatima specialises in walking with people through the darkest seasons of life. She believes deeply that grief is not weakness — in Islam, it is a form of love. Her sessions create a space where sorrow is honoured, faith is strengthened, and healing is possible.",
    approach: "Trauma-informed therapy (EMDR) integrated with Islamic grief frameworks — sabr, tawakkul, and the Islamic understanding of loss.",
    formats: ["Video", "Chat", "Voice"],
  },
];

export const concerns = [
  "Anxiety",
  "Relationship issues",
  "Grief",
  "Identity",
  "Depression",
  "Family conflict",
  "Work stress",
  "Other",
];

export const languages = ["English", "Arabic", "Urdu", "French", "Turkish", "Other"];

export const moodScale = [
  { value: 1, label: "Heavy", emoji: "🌧️" },
  { value: 2, label: "Tender", emoji: "🌫️" },
  { value: 3, label: "Steady", emoji: "🌿" },
  { value: 4, label: "Open", emoji: "☀️" },
  { value: 5, label: "Light", emoji: "✨" },
];
