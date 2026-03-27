/** Shared with App and pages that call `onNavigate` — avoids importing App in page modules. */
export type NavigateOptions = {
  gallerySection?: string;
  doctorId?: string;
};
