import AnalysisPage from "../pages/AnalysisPage";

export default function BodyAnalysis() {
  return (
    <AnalysisPage
      pageTitle="Body Analysis"
      eyebrow="AI-Powered · Beta"
      description="Upload a full-body photo and our model will analyze posture, physique, and proportions to tailor your fitness plan."
      icon="🏋️"
      uploadHint="Upload a Full-Body Photo"
      tips={[
        "Stand straight, facing the camera, full body visible",
        "Wear fitted clothing for accurate results",
        "Use good, even lighting",
      ]}
    />
  );
}