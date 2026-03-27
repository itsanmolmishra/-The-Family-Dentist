// Shared doctor profiles – used across HomePage, AboutPage, GalleryPage, and DoctorDetailPage

export type DoctorProfile = {
  id: string;
  name: string;
  title: string; // e.g. "Prof. Dr. Balram Garg"
  shortName?: string;
  roleLabel?: string; // e.g. "Founder & Lead Expert"
  qualification: string;
  qualificationLine2?: string;
  specialty: string;
  specialtyFull?: string;
  spl: string;
  experience: string;
  description: string;
  image: string;
  bioParagraphs: string[];
  philosophy?: string;
};

const imgBalram = "/doctors/dr-balram-garg.png";
const imgRadhika = "/doctors/dr-radhika-garg.png";
const imgKarishma = "/doctors/dr-karishma-gautam.png";

export const doctors: DoctorProfile[] = [
  {
    id: "balram-garg",
    name: "Prof. Dr. Balram Garg",
    title: "Prof. Dr. Balram Garg",
    shortName: "Dr. Balram",
    roleLabel: "Founder & Lead Dental Expert",
    qualification: "B.D.S, M.D.S (Gold Medalist) (Civil Hospital, Ahmedabad)",
    qualificationLine2:
      "MS, Oral Health Sciences (School of Dentistry, Michigan, USA) · Research Fellowship in Implant (University of Michigan, USA) · Fellow of Aesthetic Medicine (Germany)",
    specialty: "Consultant Oral & Maxillofacial Surgeon and Implantologist",
    specialtyFull: "Consultant Oral & Maxillofacial Surgeon and Implantologist",
    spl: "Impactions, Implants, Facial Surgery, and Trauma",
    experience: "19+ years experience",
    description:
      "Prof. Dr. Balram Garg is a senior dental practitioner with associations including AIIMS, PGIMS, and Government Dental College. MS and research fellowship in implantology from the USA.",
    image: imgBalram,
    bioParagraphs: [
      "Prof. Dr. Balram Garg (BDS, MDS, MS) is a senior dental practitioner with a past association with prestigious institutes, including AIIMS, PGIMS, and the Government Dental College.",
      "After completing his bachelor's degree (BDS) in 2007, he did his specialization (MDS) in Oral and Maxillofacial Surgery. Dr. Balram has more than 19 years in his field, both academically and clinically. In 2017, he completed a Fellowship in Facial Aesthetics (FAM) to expand his expertise in the maxillofacial region. More recently, he earned a Master of Science (MS) in Dentistry and implantology from the USA, gaining further expertise in implants and bone regeneration alongside global experts.",
      "He has expertise in all types of facial injuries, children's injuries, all types of dental implants, wisdom teeth removal, minor and major oral surgery, TM joint disorders, and bone grafts, with overall experience of more than 18 years.",
      "He is the only dental and maxillofacial surgeon in the area with a Master of Science (MS) and research fellowship in implantology from the United States (USA).",
    ],
    philosophy:
      "Dr. Balram Garg is known for his hardworking nature, strong ethics, and deep dedication to his profession. His honest approach and focus on precision ensure that every patient receives comfortable and high-quality treatment. He believes in educating patients about their oral health so they feel confident and well-informed about every procedure.",
  },
  {
    id: "radhika-garg",
    name: "Dr. Radhika Garg",
    title: "Dr. Radhika Garg",
    shortName: "Dr. Radhika",
    roleLabel: "Founder & Lead Dental Expert",
    qualification: "B.D.S, M.D.S",
    specialty: "Conservative Dentist and Endodontist (Root Canal Specialist)",
    specialtyFull: "Conservative Dentist and Endodontist (Root Canal Specialist)",
    spl: "Single Sitting RCT, Cosmetic Dentistry, Smile Design",
    experience: "18+ years experience",
    description:
      "Dr. Radhika Garg is a Root Canal Specialist with over 18 years in aesthetic and modern dentistry and more than 10,000 RCTs performed.",
    image: imgRadhika,
    bioParagraphs: [
      "Dr. Radhika Garg is a senior dental practitioner with more than 18 years in the field of aesthetic and modern dentistry. After completing her bachelor's degree (BDS) in 2008, she completed her specialization (MDS) in Conservative Dentistry and Endodontics.",
      "Over her clinical career, she has gained expertise in smile designing and aesthetic dentistry. She is skilled in single-sitting RCT, smile design, veneers, and all types of restorative work. She is the only RCT specialist in the area, having completed more than 10,000 RCTs, excluding other restorative work.",
    ],
    philosophy:
      "Dr. Radhika Garg believes in treating every patient the way she would want to be treated herself. Her philosophy is rooted in empathy—always placing herself in the patient's position to understand their concerns and fears. She ensures a gentle, caring, and transparent treatment experience built on trust.",
  },
  {
    id: "karishma-gautam",
    name: "Dr. Karishma Gautam",
    title: "Dr. Karishma Gautam",
    shortName: "Dr. Karishma",
    roleLabel: "Associate Dentist",
    qualification: "B.D.S",
    qualificationLine2: "Fellow of Endodontics (FOE), Mumbai",
    specialty: "General Dentistry & Endodontics",
    specialtyFull: "General Dental Practitioner with a special interest in aesthetic dentistry",
    spl: "Single Sitting RCT, Cosmetic Dentistry",
    experience: "4+ years experience",
    description:
      "Dr. Karishma Gautam completed her BDS in 2020 and her Fellowship in Endodontics from DY Patil University, Mumbai.",
    image: imgKarishma,
    bioParagraphs: [
      "Dr. Karishma Gautam is a general dental practitioner with a special interest in aesthetic dentistry. After completing her bachelor's degree (BDS) in 2020, she completed her Fellowship in Endodontics from the prestigious DY Patil University, Mumbai.",
    ],
  },
];

export function getDoctorById(id: string): DoctorProfile | undefined {
  return doctors.find((d) => d.id === id);
}

/** Resolve slug, API id, or name fragment to a full profile for the detail page. */
export function getDoctorProfileForPage(rawId: string | null | undefined): DoctorProfile | undefined {
  if (!rawId) return undefined;
  const direct = getDoctorById(rawId);
  if (direct) return direct;
  const mapped = resolveDoctorPageId({ id: rawId, name: rawId, title: rawId });
  return mapped ? getDoctorById(mapped) : undefined;
}

/** Map API or loose entries to our static profile ids for routing. */
export function resolveDoctorPageId(entry: { id?: string; name?: string; title?: string }): string | undefined {
  if (entry.id && getDoctorById(entry.id)) return entry.id;
  const label = `${entry.title ?? ""} ${entry.name ?? ""}`.toLowerCase();
  if (label.includes("balram")) return "balram-garg";
  if (label.includes("radhika")) return "radhika-garg";
  if (label.includes("karishma")) return "karishma-gautam";
  return undefined;
}

// For HomePage: minimal fields + id for linking
export function getDoctorsForHome() {
  return doctors.map((d) => ({
    id: d.id,
    name: d.title,
    specialty: d.specialty,
    experience: d.experience,
    image: d.image,
  }));
}
