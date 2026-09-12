import AnalysisPage from "./AnalysisPage";

export default function FaceAnalysis() {
  return (
    <AnalysisPage
      pageTitle="Face Analysis"
      eyebrow="AI-Powered · Beta"
      description="Upload a clear front-facing photo and our model will analyze your facial symmetry, skin, and jawline to generate a personalized LooksMaxing plan."
      icon="🧑"
      uploadHint="Upload a Photo"
      tips={[
        "Use a well-lit, front-facing photo",
        "Avoid sunglasses, hats, or heavy filters",
        "Neutral expression works best",
      ]}
    />
  );
}