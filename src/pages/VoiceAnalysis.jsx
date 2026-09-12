import AnalysisPage from "../pages/AnalysisPage";

export default function VoiceAnalysis() {
  return (
    <AnalysisPage
      pageTitle="Voice Analysis"
      eyebrow="AI-Powered · Beta"
      description="Upload a short voice recording and our model will analyze your tone, clarity, and vocal presence to help you sound more confident."
      icon="🎙️"
      uploadHint="Upload Audio"
      tips={[
        "Record in a quiet room, away from echo",
        "Speak naturally for at least 15 seconds",
        "Avoid background music or noise",
      ]}
    />
  );
}