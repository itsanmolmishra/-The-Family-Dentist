// Shared doctor profiles – used across HomePage, AboutPage, and TestimonialsPage

export type DoctorProfile = {
  id: string;
  name: string;
  title: string; // e.g. "Prof. Dr. Balram Garg"
  qualification: string; // e.g. "B.D.S, M.D.S (Gold Medalist)"
  qualificationLine2?: string; // e.g. "MS (Oral Health Sciences), USA"
  specialty: string; // short label for cards
  specialtyFull?: string; // longer label if needed
  spl: string; // Spl: ... for display
  experience: string;
  description: string;
  image: string;
};

const placeholderImageMale =
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
const placeholderImageFemale1 =
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
const placeholderImageFemale2 =
  "https://images.unsplash.com/photo-1594824476967-48c8b964273f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";

export const doctors: DoctorProfile[] = [
  {
    id: "balram-garg",
    name: "Prof. Dr. Balram Garg",
    title: "Prof. Dr. Balram Garg",
    qualification: "B.D.S, M.D.S (Civil Hospital, Ahmedabad)",
    qualificationLine2: "MS, Oral Health Sciences (School of Dentistry, Michigan, USA) | Research Fellowship in Implant (University of Michigan, USA) | Fellow of Aesthetic Medicine (Germany)",
    specialty: "Consultant Oral & Maxillofacial Surgeon and Implantologist",
    specialtyFull: "Consultant Oral & Maxillofacial Surgeon and Implantologist",
    spl: "Dental Implants, Maxillofacial Trauma & Injuries, TM Joint & Oro-Facial Pain, Wisdom Teeth Surgery, Facial Pathology, Facial Aesthetic",
    experience: "18+ years experience",
    description:
      "Prof. Dr. Balram Garg is a senior dental practitioner. Ex-PGIMS (Rohtak), Ex-AIIMS (New Delhi). Registration No. A-8554. Specialist in: Dental Implants, All Types of Maxillofacial Trauma & Injuries, Treatment of TM Joint & Oro-Facial Pain, Wisdom Teeth Surgery, Facial Pathology (Cysts/Tumors), Facial Aesthetic. He holds MDS from Civil Hospital Ahmedabad, MS in Oral Health Sciences from School of Dentistry, Michigan, USA, Research Fellowship in Implant from University of Michigan, USA, and Fellow of Aesthetic Medicine (Germany).",
    image: placeholderImageMale,
  },
  {
    id: "radhika-garg",
    name: "Dr. Radhika Garg",
    title: "Dr. Radhika Garg",
    qualification: "B.D.S, M.D.S (Endodontist)",
    specialty: "Root Canal Specialist",
    specialtyFull: "Root Canal Specialist",
    spl: "Single Sitting RCT, Smile Design, Cosmetic Dentistry",
    experience: "17+ years experience",
    description:
      "Dr. Radhika Garg is a Root Canal Specialist. Ex-Resident, Civil Hospital, Ahmedabad. Registration No. A-4771. Specialist in: Single Sitting RCT, Smile Design, Cosmetic Dentistry. She has over 17 years of experience in aesthetic and modern dentistry and has performed more than 10,000 RCTs.",
    image: placeholderImageFemale1,
  },
  {
    id: "karishma-gautam",
    name: "Dr. Karishma Gautam",
    title: "Dr. Karishma Gautam",
    qualification: "B.D.S",
    qualificationLine2: "Fellow of Endodontics (FOE), Mumbai",
    specialty: "General Dentistry & Endodontics",
    specialtyFull: "General Dental Practitioner with special interest in Aesthetic Dentistry",
    spl: "Single Sitting RCT, Cosmetic Dentistry",
    experience: "4+ years experience",
    description:
      "Dr. Karishma Gautam is a general dental practitioner with a special interest in aesthetic dentistry. After completing her bachelor's degree (BDS) in 2020, she did her Fellowship in Endodontics from the prestigious DY Patil University, Mumbai.",
    image: placeholderImageFemale2,
  },
];

// For HomePage: minimal fields
export function getDoctorsForHome() {
  return doctors.map((d) => ({
    name: d.title,
    specialty: d.specialty,
    experience: d.experience,
    image: d.image,
  }));
}
