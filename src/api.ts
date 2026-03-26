import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:4000",
});

export async function fetchSettings() {
  const { data } = await API.get("/api/settings/get");
  return data.success ? data.settings : null;
}

export async function fetchServices() {
  const { data } = await API.get("/api/service/list");
  return data.success ? data.services : [];
}

export async function fetchDoctors() {
  const { data } = await API.get("/api/doctor/list");
  return data.success ? data.doctors : [];
}

export async function fetchTestimonials() {
  const { data } = await API.get("/api/testimonial/list");
  return data.success ? data.testimonials : [];
}

export async function fetchGallery() {
  const { data } = await API.get("/api/gallery/list");
  return data.success ? data.gallery : [];
}

export async function fetchBanners() {
  const { data } = await API.get("/api/banner/list");
  return data.success ? data.banners : [];
}

export async function fetchBlogs() {
  const { data } = await API.get("/api/blog/list");
  return data.success ? data.blogs : [];
}

export async function fetchFaqs() {
  const { data } = await API.get("/api/faq/list");
  return data.success ? data.faqs : [];
}

export async function submitAppointment(formData: {
  name: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  time: string;
  message: string;
}) {
  const { data } = await API.post("/api/appointment/create", formData);
  return data;
}

export async function submitContactMessage(formData: {
  name: string;
  phone: string;
  email: string;
  message: string;
}) {
  const { data } = await API.post("/api/contact/create", formData);
  return data;
}

export default API;
