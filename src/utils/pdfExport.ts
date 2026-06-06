/**
 * Triggers the browser's print interface.
 * When combined with Tailwind's `print:` modifiers on the DOM,
 * this will format the profile into a clean, professional,
 * corporate matchmaking dossier, automatically hiding CRM interfaces, sidebars, and actions.
 */
export function exportProfileToPdf(profileName: string): void {
  if (typeof window !== "undefined") {
    // Temporarily change page title so the printed PDF has a clean name
    const originalTitle = document.title;
    const formattedName = profileName.replace(/\s+/g, "_");
    document.title = `TheDateCrew_Profile_${formattedName}`;
    
    window.print();
    
    // Restore title
    setTimeout(() => {
      document.title = originalTitle;
    }, 100);
  }
}
