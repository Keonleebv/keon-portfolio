// Which resume the Resume button on /work serves.
//
// To switch: change ACTIVE to "pm" or "apm". That's the only edit needed.
// Both files stay hosted either way, so you can also link a specific one
// directly in an application: keonlee.ca/resume-pm.pdf or /resume-apm.pdf
export const ACTIVE = "apm";

export const RESUMES = {
  apm: "/resume-apm.pdf",
  pm: "/resume-pm.pdf",
};

export const RESUME_URL = RESUMES[ACTIVE];

// Filename the visitor's browser saves it as, so nobody ends up with
// "resume-apm.pdf" sitting in their Downloads folder.
export const RESUME_FILENAME = "Keon_Lee_Resume.pdf";
