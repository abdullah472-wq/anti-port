export const CV_FILE_NAME = "Abdullah-Frontend-Developer-CV.html";

export function downloadCv(): void {
  const link = document.createElement("a");
  link.href = `/${CV_FILE_NAME}`;
  link.download = CV_FILE_NAME;
  document.body.appendChild(link);
  link.click();
  link.remove();
}
