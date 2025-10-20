export interface TherapistVideo {
  id: string;
  videoLink: string;
  category: string;
  contactLink: string;
}

export const therapistVideos: TherapistVideo[] = [
  // Self-esteem videos
  { id: "SE_10", videoLink: "https://vimeo.com/1128550453", category: "Self-esteem", contactLink: "https://www.shelbywilliamstherapy.com/" },
  { id: "SE_9", videoLink: "https://vimeo.com/1128531271", category: "Self-esteem", contactLink: "https://www.instagram.com/theredheadpsychologist/" },
  { id: "SE_08", videoLink: "https://vimeo.com/1128531280", category: "Self-esteem", contactLink: "https://thehealinghivetherapy.janeapp.com/" },
  { id: "SE_07", videoLink: "https://vimeo.com/1128531286", category: "Self-esteem", contactLink: "https://allisonborstad.as.me/schedule/a5054f5c/?appointmentTypeIds%5B%5D=45253975" },
  { id: "SE_06", videoLink: "https://vimeo.com/1128531290", category: "Self-esteem", contactLink: "https://www.ecmtherapy.co/" },
  { id: "SE_05", videoLink: "https://vimeo.com/1128531294", category: "Self-esteem", contactLink: "https://meg-s-site-7258.thinkific.com/products/courses/are-you-mad-at-me-workshop" },
  { id: "SE_04", videoLink: "https://vimeo.com/1128531305", category: "Self-esteem", contactLink: "https://flynnskidmore.com/self-aware" },
  { id: "SE_03", videoLink: "https://vimeo.com/1128531314", category: "Self-esteem", contactLink: "https://itsryannnicole.com/workshop" },
  { id: "SE_02", videoLink: "https://vimeo.com/1128531318", category: "Self-esteem", contactLink: "https://www.tarynrothstein.com/" },
  { id: "SE_01", videoLink: "https://vimeo.com/1128531321", category: "Self-esteem", contactLink: "tel:707-600-3754" },
  
  // Relationships videos
  { id: "R_10", videoLink: "https://vimeo.com/1128519423", category: "Relationships", contactLink: "https://www.fresh-insight.ca/therapy-kristina" },
  { id: "R_9", videoLink: "https://vimeo.com/1128519453", category: "Relationships", contactLink: "https://linktr.ee/Callinghome" },
  { id: "R_08", videoLink: "https://vimeo.com/1128519461", category: "Relationships", contactLink: "https://www.skool.com/theattachmentacademy/about" },
  { id: "R_07", videoLink: "https://vimeo.com/1128519480", category: "Relationships", contactLink: "https://keyannaross.com/" },
  { id: "R_06", videoLink: "https://vimeo.com/1128519486", category: "Relationships", contactLink: "https://marylandfamilypsychology.com/about-us/" },
  { id: "R_05", videoLink: "https://vimeo.com/1128519502", category: "Relationships", contactLink: "https://kikimccray.com/links" },
  { id: "R_04", videoLink: "https://vimeo.com/1128519512", category: "Relationships", contactLink: "https://www.linkedin.com/in/jamilia-parker-m-s-lmft-4ba36b83/" },
  { id: "R_03", videoLink: "https://vimeo.com/1128519523", category: "Relationships", contactLink: "https://www.alituretzky.com/contact" },
  { id: "R_02", videoLink: "https://vimeo.com/1128519534", category: "Relationships", contactLink: "https://www.adadingpsychotherapy.com/contact" },
  { id: "R_01", videoLink: "https://vimeo.com/1128519539", category: "Relationships", contactLink: "https://sharewithshae.com/" },
  
  // Burnout videos
  { id: "B_10", videoLink: "https://vimeo.com/1128520186", category: "Burnout", contactLink: "https://stan.store/drlaurencook" },
  { id: "B_9", videoLink: "https://vimeo.com/1128520203", category: "Burnout", contactLink: "https://ashaytherapy.ca/" },
  { id: "B_08", videoLink: "https://vimeo.com/1128520209", category: "Burnout", contactLink: "https://savasanacollective.com/therapy-for-burnout-and-anxiety" },
  { id: "B_07", videoLink: "https://vimeo.com/1128520239", category: "Burnout", contactLink: "https://www.amenclinics.com/" },
  { id: "B_06", videoLink: "https://vimeo.com/1128520262", category: "Burnout", contactLink: "https://steadfastcounseling.com/" },
  { id: "B_05", videoLink: "https://vimeo.com/1128520269", category: "Burnout", contactLink: "https://www.linkedin.com/in/daynasiegel/" },
  { id: "B_04", videoLink: "https://vimeo.com/1128520274", category: "Burnout", contactLink: "https://www.thehumancollectivetherapy.com/" },
  { id: "B_03", videoLink: "https://vimeo.com/1128520291", category: "Burnout", contactLink: "https://www.griffin-healing-center.com/" },
  { id: "B_02", videoLink: "https://vimeo.com/1128520312", category: "Burnout", contactLink: "https://www.myautistictherapist.com/contact" },
  { id: "B_01", videoLink: "https://vimeo.com/1128520312", category: "Burnout", contactLink: "https://www.drmelissashepard.com/" },
  
  // Anxiety videos
  { id: "A_10", videoLink: "https://vimeo.com/1128530528", category: "Anxiety", contactLink: "https://www.ovingtontherapy.com/" },
  { id: "A_9", videoLink: "https://vimeo.com/1128515980", category: "Anxiety", contactLink: "https://www.elevatementalwellnessllc.com/" },
  { id: "A_08", videoLink: "https://vimeo.com/1128515984", category: "Anxiety", contactLink: "https://www.kristen-mcclure-therapist.com/" },
  { id: "A_07", videoLink: "https://vimeo.com/1128516009", category: "Anxiety", contactLink: "https://manhattanpsychotherapy.co/contact" },
  { id: "A_06", videoLink: "https://vimeo.com/1128516028", category: "Anxiety", contactLink: "https://beacons.ai/therapyjessaofficial" },
  { id: "A_05", videoLink: "https://vimeo.com/1128516286", category: "Anxiety", contactLink: "https://www.realtherapyandcoaching.co.uk/" },
  { id: "A_04", videoLink: "https://vimeo.com/1128517026", category: "Anxiety", contactLink: "https://calendly.com/adad/intro?month=2025-09" },
  { id: "A_03", videoLink: "https://vimeo.com/1128515927", category: "Anxiety", contactLink: "https://calendly.com/sereincounseling" },
  { id: "A_02", videoLink: "https://vimeo.com/1128515934", category: "Anxiety", contactLink: "https://manhattanpsychotherapy.co/contact" },
  { id: "A_01", videoLink: "https://vimeo.com/1128515942", category: "Anxiety", contactLink: "https://leltherapy.com/contact" },
];

// Helper function to get videos by category
export const getVideosByCategory = (category: string): TherapistVideo[] => {
  return therapistVideos.filter(video => 
    video.category.toLowerCase() === category.toLowerCase()
  );
};

// Helper function to get videos by multiple categories
export const getVideosByCategories = (categories: string[]): TherapistVideo[] => {
  if (categories.length === 0) return [];
  
  const normalizedCategories = categories.map(cat => cat.toLowerCase());
  return therapistVideos.filter(video => 
    normalizedCategories.includes(video.category.toLowerCase())
  );
};

// Helper function to get random videos from categories
export const getRandomVideosByCategories = (categories: string[], count: number = 3): TherapistVideo[] => {
  const filtered = getVideosByCategories(categories);
  const shuffled = [...filtered].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

