import therapist1 from "@/assets/therapist-1.jpg";
import therapist2 from "@/assets/therapist-2.jpg";
import therapist3 from "@/assets/therapist-3.jpg";

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
    price: 95,
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
    price: 110,
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
    price: 85,
    gender: "female",
    bio: "Grief reshapes us. I sit with women in seasons of loss, depression, and quiet motherhood weariness.",
    approach: "Person-centered, somatic, and rooted in Islamic spiritual care.",
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
