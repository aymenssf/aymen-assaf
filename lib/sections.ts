/** Registre des sections one-page — indexé façon adresses mémoire. */
export const SECTIONS = [
  { id: "index", index: "0x00", key: "index" },
  { id: "profile", index: "0x01", key: "profile" },
  { id: "experience", index: "0x02", key: "experience" },
  { id: "projects", index: "0x03", key: "projects" },
  { id: "skills", index: "0x04", key: "skills" },
  { id: "contact", index: "0x05", key: "contact" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];
